import React, { useState, useRef, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert, ActivityIndicator } from 'react-native';
import { horizontalScale, verticalScale, moderateScale } from '../../utils/dimensions';
import ClubDocket from '../../../assets/ClubDocket.svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import { authService } from '../../services/authService';

export default function VerifyCodeScreen({ navigation, route }) {
  const { email } = route.params || {};
  const [otp, setOtp] = useState(['', '', '', '']); // 4-digit OTP
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef([]);

  const handleOtpInput = useCallback((index, value) => {
    // Only accept numeric input
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input (now up to index 3 for 4-digit OTP)
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  }, [otp]);

  const handleBackspace = useCallback((index) => {
    if (index > 0 && !otp[index]) {
      inputRefs.current[index - 1]?.focus();
    }
  }, [otp]);

  const handleVerifyOtp = useCallback(async () => {
    const otpCode = otp.join('');

    if (otpCode.length !== 4) {
      Alert.alert('Error', 'Please enter a complete 4-digit OTP');
      return;
    }

    if (!email) {
      Alert.alert('Error', 'Email not found. Please go back and try again.');
      return;
    }

    try {
      setIsLoading(true);
      const result = await authService.verifyOtp(email, otpCode);

      if (result.success) {
        Alert.alert('Success', result.message || 'OTP verified successfully', [
          {
            text: 'OK',
            onPress: () => navigation.navigate('SetNewPassword', { email }),
          },
        ]);
      } else {
        Alert.alert('Error', result.message || 'Invalid OTP');
        setOtp(['', '', '', '']);
        inputRefs.current[0]?.focus();
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      Alert.alert('Error', 'An error occurred while verifying OTP');
    } finally {
      setIsLoading(false);
    }
  }, [otp, email, navigation]);

  const handleResendOtp = useCallback(async () => {
    if (!email) {
      Alert.alert('Error', 'Email not found. Please go back and try again.');
      return;
    }

    try {
      setIsLoading(true);
      const result = await authService.sendOtp(email);

      if (result.success) {
        Alert.alert('Success', result.message || 'OTP resent to your email');
        setOtp(['', '', '', '']); // Reset to 4-digit OTP
        inputRefs.current[0]?.focus();
      } else {
        Alert.alert('Error', result.message || 'Failed to resend OTP');
      }
    } catch (error) {
      console.error('Error resending OTP:', error);
      Alert.alert('Error', 'An error occurred while resending OTP');
    } finally {
      setIsLoading(false);
    }
  }, [email]);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          disabled={isLoading}
        >
          <Text style={styles.backButtonText}>{'<'}</Text>
        </TouchableOpacity>
        <ClubDocket width={horizontalScale(67.5)} height={verticalScale(67.5)} />
        <Text style={styles.title}>Golf Docket</Text>
        <Text style={styles.subtitle}>Verify Code</Text>
        <Text style={styles.desc}>
          We sent OTP code to your email{'\n'}
          <Text style={{ fontWeight: 'bold' }}>{email}</Text>. Enter the code below to verify
        </Text>
        <View style={styles.codeRow}>
          {[0, 1, 2, 3].map((index) => (  // 4-digit OTP
            <TextInput
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              style={styles.codeInput}
              maxLength={1}
              keyboardType="number-pad"
              value={otp[index]}
              onChangeText={(value) => handleOtpInput(index, value)}
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === 'Backspace') {
                  handleBackspace(index);
                }
              }}
              editable={!isLoading}
            />
          ))}
        </View>
        <TouchableOpacity
          style={[styles.nextButton, isLoading && styles.nextButtonDisabled]}
          onPress={handleVerifyOtp}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.nextButtonText}>Next</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.resendLink} 
          onPress={handleResendOtp}
          disabled={isLoading}
        >
          <Text style={styles.resendText}>Don't receive OTP? Resend again</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.backToLogin} 
          onPress={() => navigation.navigate('Login')}
          disabled={isLoading}
        >
          <Text style={styles.backToLoginText}>{'<'} Back to Login</Text>
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
    paddingHorizontal: horizontalScale(30),
  },
  backButton: {
    marginBottom: verticalScale(12),
    width: horizontalScale(36),
    height: horizontalScale(36),
    borderRadius: horizontalScale(18),
    backgroundColor: '#F3E3D6',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  backButtonText: {
    fontSize: moderateScale(26),
    fontWeight: '900',
    color: '#8B5C2A',
    lineHeight: moderateScale(28),
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
    textAlign: 'center',
    fontFamily: 'System',
  },
  codeRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: verticalScale(16.24),
    width: '100%',
  },
  codeInput: {
    width: horizontalScale(45),
    height: verticalScale(45),
    borderRadius: moderateScale(8),
    borderWidth: 1,
    borderColor: '#EFE7E1',
    backgroundColor: '#F5F5F5',
    textAlign: 'center',
    fontSize: moderateScale(22.5),
    color: '#222',
    marginHorizontal: horizontalScale(5.625),
  },
  nextButton: {
    backgroundColor: '#8B5C2A',
    borderRadius: moderateScale(8),
    paddingVertical: verticalScale(14.616),
    alignItems: 'center',
    width: '100%',
    marginBottom: verticalScale(9.744),
  },
  nextButtonDisabled: {
    opacity: 0.6,
  },
  nextButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: moderateScale(16.875),
  },
  resendLink: {
    marginBottom: verticalScale(9.744),
  },
  resendText: {
    color: '#8B5C2A',
    fontSize: moderateScale(13.125),
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  backToLogin: {
    marginTop: 2,
  },
  backToLoginText: {
    color: '#8B5C2A',
    fontSize: moderateScale(13.125),
    fontWeight: '500',
  },
});