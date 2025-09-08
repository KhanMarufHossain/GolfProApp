import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Dimensions } from 'react-native';
import ClubDocket from '../../../assets/ClubDocket.svg';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

export default function ForgotPasswordScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
  <ClubDocket width={width * 0.18} height={width * 0.18} />
        <Text style={styles.title}>Golf Docket</Text>
        <Text style={styles.subtitle}>Forgot Password</Text>
        <Text style={styles.desc}>Enter your email to reset password</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter email"
            placeholderTextColor="#B7B7B7"
          />
        </View>

        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('VerifyCode')}
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.backToLogin}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.backToLoginText}>← Back to Login</Text>
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
  nextButton: {
    backgroundColor: '#8B5C2A',
    borderRadius: 8,
    paddingVertical: height * 0.018,
    alignItems: 'center',
    width: '100%',
    marginTop: height * 0.012,
    marginBottom: height * 0.022,
  },
  nextButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: width * 0.045,
  },
  backToLogin: {
    marginTop: 2,
  },
  backToLoginText: {
    color: '#8B5C2A',
    fontSize: width * 0.035,
    fontWeight: '500',
  },
});