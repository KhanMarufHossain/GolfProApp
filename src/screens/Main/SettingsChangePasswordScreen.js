import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import { colors, radius } from "../../utils/theme";
import {
  horizontalScale as hs,
  verticalScale as vs,
  moderateScale as ms,
  verticalScale,
} from "../../utils/dimensions";
import { BASE_URL, API_ENDPOINTS } from "../../config/api";
import { tokenStorage } from "../../utils/tokenStorage";
import { useUser } from "../../context/UserContext";

const Field = ({ label, value, onChangeText, isLoading }) => (
  <View style={styles.field}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      value={value}
      onChangeText={onChangeText}
      secureTextEntry
      style={styles.input}
      editable={!isLoading}
      placeholderTextColor={colors.textMute}
    />
  </View>
);

export default function SettingsChangePasswordScreen({ navigation }) {
  const [form, setForm] = useState({n1: "", n2: "" });
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();

  const handleChangePassword = async () => {
    // Validation
    if (!form.n1 || !form.n2) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (form.n1 !== form.n2) {
      Alert.alert("Error", "New passwords do not match");
      return;
    }

    if (form.n1.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long");
      return;
    }

    try {
      setIsLoading(true);
      
      // Get access token
      const accessToken = await tokenStorage.getAccessToken();
      
      if (!accessToken) {
        Alert.alert("Error", "You are not authenticated. Please log in again.");
        return;
      }

      // Get user email
      const userData = await tokenStorage.getUserData();
      const email = userData?.email || user?.email;

      if (!email) {
        Alert.alert("Error", "User email not found. Please log in again.");
        return;
      }

      // Make API request
      const response = await fetch(`${BASE_URL}${API_ENDPOINTS.AUTH.SET_PASSWORD}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          email: email,
          newPassword: form.n1,
          confirmPassword: form.n2,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert(
          "Success", 
          "Password changed successfully",
          [
            {
              text: "OK",
              onPress: () => navigation.goBack(),
            },
          ]
        );
        // Clear form
        setForm({ n1: "", n2: "" });
      } else {
        Alert.alert(
          "Error", 
          data.message || "Failed to change password. Please check your current password."
        );
      }
    } catch (error) {
      console.error("Error changing password:", error);
      Alert.alert("Error", "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const updateField = useCallback((field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  }, []);

  return (
    <View style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <Text style={styles.backTxt}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Change Password</Text>
        <View style={{ width: ms(36) }} />
      </View>
      <ScrollView 
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.box}>
          <Field
            label="New Password"
            value={form.n1}
            onChangeText={(t) => updateField('n1', t)}
            isLoading={isLoading}
          />
          <View style={styles.divider} />
          <Field
            label="Confirm Password"
            value={form.n2}
            onChangeText={(t) => updateField('n2', t)}
            isLoading={isLoading}
          />
        </View>
        <TouchableOpacity 
          style={[styles.primaryBtn, isLoading && styles.primaryBtnDisabled]}
          onPress={handleChangePassword}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.primaryTxt}>Save</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  header: {
    height: vs(56),
    marginTop: verticalScale(50),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: hs(16),
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backBtn: {
    width: ms(36),
    height: ms(36),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: ms(18),
    backgroundColor: "#F3E3D6",
  },
  backTxt: { fontSize: ms(18), color: colors.accent, fontWeight: "800" },
  headerTitle: { fontSize: ms(18), fontWeight: "700", color: colors.text },
  content: { padding: hs(16) },
  box: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
  },
  field: { paddingHorizontal: hs(16), paddingVertical: vs(12) },
  label: { color: colors.textMute, marginBottom: 6 },
  input: { color: colors.text, fontSize: ms(14) },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: colors.border },
  primaryBtn: {
    marginTop: vs(16),
    backgroundColor: colors.accent,
    borderRadius: radius.lg,
    paddingVertical: vs(14),
    alignItems: "center",
  },
  primaryBtnDisabled: {
    opacity: 0.6,
  },
  primaryTxt: { color: "#fff", fontWeight: "700" },
});
