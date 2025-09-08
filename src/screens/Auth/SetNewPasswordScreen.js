import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Dimensions } from 'react-native';
import ClubDocket from '../../../assets/ClubDocket.svg';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

export default function SetNewPasswordScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
  <ClubDocket width={width * 0.18} height={width * 0.18} />
        <Text style={styles.title}>Golf Docket</Text>
        <Text style={styles.subtitle}>Set new password</Text>
        <Text style={styles.desc}>
          Set a new password and continue your journey
        </Text>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Current Password</Text>
          <View style={styles.passwordRow}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="Type a strong password"
              placeholderTextColor="#B7B7B7"
              secureTextEntry
            />
            <TouchableOpacity style={styles.eyeButton}>
              <Ionicons name="eye-outline" size={width * 0.055} color="#B7B7B7" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>New Password</Text>
          <View style={styles.passwordRow}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="Re-type password"
              placeholderTextColor="#B7B7B7"
              secureTextEntry
            />
            <TouchableOpacity style={styles.eyeButton}>
              <Ionicons name="eye-outline" size={width * 0.055} color="#B7B7B7" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Confirm password</Text>
          <View style={styles.passwordRow}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="Re-type password"
              placeholderTextColor="#B7B7B7"
              secureTextEntry
            />
            <TouchableOpacity style={styles.eyeButton}>
              <Ionicons name="eye-outline" size={width * 0.055} color="#B7B7B7" />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => navigation.navigate('VerifySuccess')}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: width * 0.08,
  },
  logo: {
    width: width * 0.18,
    height: width * 0.18,
    marginBottom: height * 0.02,
  },
  title: {
    fontSize: width * 0.07,
    fontWeight: '600',
    color: '#5B3926',
    marginBottom: height * 0.01,
    fontFamily: 'System',
  },
  subtitle: {
    fontSize: width * 0.045,
    fontWeight: '500',
    color: '#222',
    marginBottom: height * 0.005,
    fontFamily: 'System',
  },
  desc: {
    fontSize: width * 0.032,
    color: '#888',
    marginBottom: height * 0.02,
    fontFamily: 'System',
    textAlign: 'center',
  },
  inputGroup: {
    width: '100%',
    marginBottom: height * 0.015,
  },
  inputLabel: {
    fontSize: width * 0.035,
    color: '#5B3926',
    marginBottom: 4,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: width * 0.04,
    paddingVertical: height * 0.018,
    fontSize: width * 0.045,
    color: '#222',
    borderWidth: 1,
    borderColor: '#EFE7E1',
  },
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eyeButton: {
    padding: 8,
    marginLeft: -36,
    zIndex: 1,
  },
  continueButton: {
    backgroundColor: '#8B5C2A',
    borderRadius: 8,
    paddingVertical: height * 0.018,
    alignItems: 'center',
    width: '100%',
    marginTop: height * 0.012,
    marginBottom: height * 0.022,
  },
  continueButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: width * 0.045,
  },
});