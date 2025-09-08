import React from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet, Dimensions } from 'react-native';
import ClubDocket from '../../../assets/ClubDocket.svg';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

export default function LoginScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
  <ClubDocket width={width * 0.18} height={width * 0.18} />
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
              <Ionicons name="eye-outline" size={width * 0.055} color="#B7B7B7" />
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
            onPress={() => navigation.navigate('ChooseRole')}
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
    paddingHorizontal: width * 0.08,
    alignItems: 'center',
    justifyContent: 'center',
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
  forgotLink: {
    alignSelf: 'flex-end',
    marginBottom: height * 0.02,
  },
  forgotText: {
    color: '#8B5C2A',
    fontSize: width * 0.035,
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: '#8B5C2A',
    borderRadius: 8,
    paddingVertical: height * 0.018,
    alignItems: 'center',
    width: '100%',
    marginBottom: height * 0.02,
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: width * 0.045,
  },
  orRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.02,
    width: '100%',
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#EFE7E1',
  },
  orText: {
    marginHorizontal: 10,
    color: '#B7B7B7',
    fontWeight: '500',
    fontSize: width * 0.035,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: height * 0.02,
  },
  socialButton: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#EFE7E1',
    padding: width * 0.025,
    marginHorizontal: 8,
  },
  socialIcon: {
    width: width * 0.08,
    height: width * 0.08,
  },
  signupRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: height * 0.01,
  },
  signupText: {
    color: '#888',
    fontSize: width * 0.035,
  },
  signupLink: {
    color: '#8B5C2A',
    fontWeight: '600',
    fontSize: width * 0.035,
  },
});