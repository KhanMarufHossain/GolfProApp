import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { horizontalScale, verticalScale, moderateScale } from '../../utils/dimensions';
import ClubDocket from '../../../assets/ClubDocket.svg';
import { SafeAreaView } from 'react-native-safe-area-context';



export default function VerifyCodeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
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
          }}
        >
          <Text style={{ fontSize: moderateScale(26), fontWeight: '900', color: '#8B5C2A', lineHeight: moderateScale(28) }}>{'<'}</Text>
        </TouchableOpacity>
        <ClubDocket width={horizontalScale(67.5)} height={verticalScale(67.5)} />
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