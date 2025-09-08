import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { horizontalScale, verticalScale, moderateScale } from '../../utils/dimensions';
import ClubDocket from '../../../assets/ClubDocket.svg';
import { SafeAreaView } from 'react-native-safe-area-context';



export default function SignUpScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
  <ClubDocket width={horizontalScale(93.75)} height={verticalScale(93.75)} />
        <Text style={styles.title}>Golf Docket</Text>
        <Text style={styles.subtitle}>Create an account</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter full name"
            placeholderTextColor="#B7B7B7"
          />
        </View>
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
          <TextInput
            style={styles.input}
            placeholder="Enter password"
            placeholderTextColor="#B7B7B7"
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          style={styles.signupButton}
          onPress={() => navigation.navigate('Credential')}
        >
          <Text style={styles.signupButtonText}>Sign up</Text>
        </TouchableOpacity>

        <View style={styles.loginRow}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLink}>Login</Text>
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
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: horizontalScale(30),
  },
  logo: {
    width: horizontalScale(93.75),
    height: verticalScale(93.75),
    marginBottom: verticalScale(24.36),
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
    marginBottom: verticalScale(24.36),
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
  signupButton: {
    backgroundColor: '#8B5C2A',
    borderRadius: moderateScale(8),
    paddingVertical: verticalScale(14.616),
    alignItems: 'center',
    width: '100%',
    marginTop: verticalScale(9.744),
    marginBottom: verticalScale(17.864),
  },
  signupButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: moderateScale(16.875),
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: verticalScale(8.12),
  },
  loginText: {
    color: '#888',
    fontSize: moderateScale(13.125),
  },
  loginLink: {
    color: '#8B5C2A',
    fontWeight: '600',
    fontSize: moderateScale(13.125),
  },
});