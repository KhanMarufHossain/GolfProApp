import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { horizontalScale, verticalScale, moderateScale } from '../../utils/dimensions';
import ClubDocket from '../../../assets/ClubDocket.svg';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';



export default function SetNewPasswordScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
  <ClubDocket width={horizontalScale(67.5)} height={verticalScale(67.5)} />
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
              <Ionicons name="eye-outline" size={moderateScale(20.625)} color="#B7B7B7" />
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
              <Ionicons name="eye-outline" size={moderateScale(20.625)} color="#B7B7B7" />
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
              <Ionicons name="eye-outline" size={moderateScale(20.625)} color="#B7B7B7" />
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
  continueButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: moderateScale(16.875),
  },
});