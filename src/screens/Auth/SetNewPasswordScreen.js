import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { horizontalScale, verticalScale, moderateScale } from '../../utils/dimensions';
import ClubDocket from '../../../assets/ClubDocket.svg';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { authService } from '../../services/authService';

const PasswordField = ({ label, value, onChangeText, isLoading, secureTextEntry, setSecureTextEntry, fieldKey }) => (
  <View style={styles.inputGroup}>
    <Text style={styles.inputLabel}>{label}</Text>
    <View style={styles.passwordRow}>
      <TextInput
        style={[styles.input, { flex: 1 }]}
        placeholder="Type a strong password"
        placeholderTextColor="#B7B7B7"
        secureTextEntry={secureTextEntry[fieldKey]}
        value={value}
        onChangeText={onChangeText}
        editable={!isLoading}
      />
      <TouchableOpacity 
        style={styles.eyeButton}
        onPress={() => setSecureTextEntry({ ...secureTextEntry, [fieldKey]: !secureTextEntry[fieldKey] })}
        disabled={isLoading}
      >
        <Ionicons 
          name={secureTextEntry[fieldKey] ? 'eye-off-outline' : 'eye-outline'} 
          size={moderateScale(20.625)} 
          color="#B7B7B7" 
        />
      </TouchableOpacity>
    </View>
  </View>
);

export default function SetNewPasswordScreen({ navigation, route }) {
  const { email } = route.params || {};
  const [form, setForm] = useState({ newPassword: '', confirmPassword: '' });
  const [secureTextEntry, setSecureTextEntry] = useState({ newPassword: true, confirmPassword: true });
  const [isLoading, setIsLoading] = useState(false);

  const handleSetPassword = useCallback(async () => {
    // Validation
    if (!form.newPassword || !form.confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (form.newPassword.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }

    if (!email) {
      Alert.alert('Error', 'Email not found. Please go back and try again.');
      return;
    }

    try {
      setIsLoading(true);
      const result = await authService.setPassword(email, form.newPassword, form.confirmPassword);

      if (result.success) {
        Alert.alert(
          'Success',
          result.message || 'Password set successfully',
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('PasswordChanged'),
            },
          ]
        );
        setForm({ newPassword: '', confirmPassword: '' });
      } else {
        Alert.alert('Error', result.message || 'Failed to set password');
      }
    } catch (error) {
      console.error('Error setting password:', error);
      Alert.alert('Error', 'An error occurred while setting password');
    } finally {
      setIsLoading(false);
    }
  }, [form, email, navigation]);

  const updateField = useCallback((field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <ClubDocket width={horizontalScale(67.5)} height={verticalScale(67.5)} />
          <Text style={styles.title}>Golf Docket</Text>
          <Text style={styles.subtitle}>Set new password</Text>
          <Text style={styles.desc}>
            Set a new password and continue your journey
          </Text>

          <PasswordField
            label="New Password"
            value={form.newPassword}
            onChangeText={(t) => updateField('newPassword', t)}
            isLoading={isLoading}
            secureTextEntry={secureTextEntry}
            setSecureTextEntry={setSecureTextEntry}
            fieldKey="newPassword"
          />

          <PasswordField
            label="Confirm Password"
            value={form.confirmPassword}
            onChangeText={(t) => updateField('confirmPassword', t)}
            isLoading={isLoading}
            secureTextEntry={secureTextEntry}
            setSecureTextEntry={setSecureTextEntry}
            fieldKey="confirmPassword"
          />

          <TouchableOpacity
            style={[styles.continueButton, isLoading && styles.continueButtonDisabled]}
            onPress={handleSetPassword}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.continueButtonText}>Continue</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: horizontalScale(30),
    paddingVertical: verticalScale(20),
  },
  logo: {
    width: horizontalScale(67.5),
    height: verticalScale(67.5),
    marginBottom: verticalScale(16.24),
  },
  title: {
    fontSize: moderateScale(26.25),
    fontWeight: '600',
    color: '#5B3926',
    marginBottom: verticalScale(8.12),
    fontFamily: 'System',
  },
  subtitle: {
    fontSize: moderateScale(16.875),
    fontWeight: '500',
    color: '#222',
    marginBottom: verticalScale(4.06),
    fontFamily: 'System',
  },
  desc: {
    fontSize: moderateScale(12),
    color: '#888',
    marginBottom: verticalScale(16.24),
    fontFamily: 'System',
    textAlign: 'center',
  },
  inputGroup: {
    width: '100%',
    marginBottom: verticalScale(12.18),
  },
  inputLabel: {
    fontSize: moderateScale(13.125),
    color: '#5B3926',
    marginBottom: 4,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: moderateScale(8),
    paddingHorizontal: horizontalScale(15),
    paddingVertical: verticalScale(14.616),
    fontSize: moderateScale(16.875),
    color: '#222',
    borderWidth: 1,
    borderColor: '#EFE7E1',
  },
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eyeButton: {
    padding: moderateScale(8),
    marginLeft: horizontalScale(-36),
    zIndex: 1,
  },
  continueButton: {
    backgroundColor: '#8B5C2A',
    borderRadius: moderateScale(8),
    paddingVertical: verticalScale(14.616),
    alignItems: 'center',
    width: '100%',
    marginTop: verticalScale(9.744),
    marginBottom: verticalScale(17.864),
  },
  continueButtonDisabled: {
    opacity: 0.6,
  },
  continueButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: moderateScale(16.875),
  },
});