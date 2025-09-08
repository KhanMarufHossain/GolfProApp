import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Dimensions } from 'react-native';
import ClubDocket from '../../../assets/ClubDocket.svg';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

export default function VerifyCodeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
  <ClubDocket width={width * 0.18} height={width * 0.18} />
        <Text style={styles.title}>Golf Docket</Text>
        <Text style={styles.subtitle}>Verify Code</Text>
        <Text style={styles.desc}>
          We sent OTP code to your email{'\n'}
          <Text style={{ fontWeight: 'bold' }}>golfpro@golfs.com</Text>. Enter the code below to verify
        </Text>
        <View style={styles.codeRow}>
          <TextInput style={styles.codeInput} maxLength={1} keyboardType="number-pad" />
          <TextInput style={styles.codeInput} maxLength={1} keyboardType="number-pad" />
          <TextInput style={styles.codeInput} maxLength={1} keyboardType="number-pad" />
          <TextInput style={styles.codeInput} maxLength={1} keyboardType="number-pad" />
        </View>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('SetNewPassword')}
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.resendLink} onPress={() => {}}>
          <Text style={styles.resendText}>Don't receive OTP? Resend again</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.backToLogin} onPress={() => navigation.navigate('Login')}>
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
    textAlign: 'center',
    fontFamily: 'System',
  },
  codeRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: height * 0.02,
    width: '100%',
  },
  codeInput: {
    width: width * 0.12,
    height: width * 0.12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#EFE7E1',
    backgroundColor: '#F5F5F5',
    textAlign: 'center',
    fontSize: width * 0.06,
    color: '#222',
    marginHorizontal: width * 0.015,
  },
  nextButton: {
    backgroundColor: '#8B5C2A',
    borderRadius: 8,
    paddingVertical: height * 0.018,
    alignItems: 'center',
    width: '100%',
    marginBottom: height * 0.012,
  },
  nextButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: width * 0.045,
  },
  resendLink: {
    marginBottom: height * 0.012,
  },
  resendText: {
    color: '#8B5C2A',
    fontSize: width * 0.035,
    textAlign: 'center',
    textDecorationLine: 'underline',
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