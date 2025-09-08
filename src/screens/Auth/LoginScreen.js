import React from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { horizontalScale, verticalScale, moderateScale } from '../../utils/dimensions';
import ClubDocket from '../../../assets/ClubDocket.svg';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';



export default function LoginScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
  <ClubDocket width={horizontalScale(67.5)} height={verticalScale(67.5)} />
        <Text style={styles.title}>Club Docket</Text>
        <Text style={styles.subtitle}>Welcome Back!</Text>
        <Text style={styles.desc}>To login, enter your email address</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter email"
            placeholderTextColor="#B7B7B7"
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Password</Text>
          <View style={styles.passwordRow}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="Enter password"
              placeholderTextColor="#B7B7B7"
              secureTextEntry
            />
            <TouchableOpacity style={styles.eyeButton}>
              <Ionicons name="eye-outline" size={moderateScale(20.625)} color="#B7B7B7" />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          style={styles.forgotLink}
          onPress={() => navigation.navigate('ForgotPassword')}
        >
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate('ChooseRole')}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.orRow}>
          <View style={styles.orLine} />
          <Text style={styles.orText}>OR</Text>
          <View style={styles.orLine} />
        </View>

        <View style={styles.socialRow}>
          <TouchableOpacity style={styles.socialButton}>
            <Image
              source={require('../../../assets/google.png')}
              style={styles.socialIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.socialButton}
            onPress={() => navigation.navigate('Ghin')}
          >
            <Image
              source={require('../../../assets/USGA_Logo.png')}
              style={styles.socialIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.signupRow}>
          <Text style={styles.signupText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signupLink}>Create an account</Text>
          </TouchableOpacity>
        </View>
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
    paddingHorizontal: horizontalScale(30),
    alignItems: 'center',
    justifyContent: 'center',
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
  forgotLink: {
    alignSelf: 'flex-end',
    marginBottom: verticalScale(16.24),
  },
  forgotText: {
    color: '#8B5C2A',
    fontSize: moderateScale(13.125),
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: '#8B5C2A',
    borderRadius: moderateScale(8),
    paddingVertical: verticalScale(14.616),
    alignItems: 'center',
    width: '100%',
    marginBottom: verticalScale(16.24),
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: moderateScale(16.875),
  },
  orRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(16.24),
    width: '100%',
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#EFE7E1',
  },
  orText: {
    marginHorizontal: horizontalScale(10),
    color: '#B7B7B7',
    fontWeight: '500',
    fontSize: moderateScale(13.125),
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: verticalScale(16.24),
  },
  socialButton: {
    backgroundColor: '#fff',
    borderRadius: moderateScale(8),
    borderWidth: 1,
    borderColor: '#EFE7E1',
    padding: moderateScale(9.375),
    marginHorizontal: horizontalScale(8),
  },
  socialIcon: {
    width: horizontalScale(30),
    height: verticalScale(30),
  },
  signupRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: verticalScale(8.12),
  },
  signupText: {
    color: '#888',
    fontSize: moderateScale(13.125),
  },
  signupLink: {
    color: '#8B5C2A',
    fontWeight: '600',
    fontSize: moderateScale(13.125),
  },
});