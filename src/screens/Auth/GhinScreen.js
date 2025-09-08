import React from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { horizontalScale, verticalScale, moderateScale } from '../../utils/dimensions';
import { SafeAreaView } from 'react-native-safe-area-context';



export default function GhinScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Image
          source={require('../../../assets/USGA_Logo.png')}
          style={styles.usgaLogo}
          resizeMode="contain"
        />
        <Text style={styles.ghinTitle}>To login, enter your USGA Ghin number and password</Text>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>GHIN No</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter GHIN No"
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
          style={styles.loginButton}
          onPress={() => navigation.navigate('ChooseRole')}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.backToMain}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.backToMainText}>← Back to Main</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.forgotLink}
          onPress={() => {}} // No navigation for now
        >
          <Text style={styles.forgotText}>Forgot Login Information?</Text>
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
  usgaLogo: {
    width: horizontalScale(131.25),
    height: verticalScale(60),
    marginBottom: verticalScale(24.36),
  },
  ghinTitle: {
    fontSize: moderateScale(14.25),
    color: '#5B3926',
    textAlign: 'center',
    marginBottom: verticalScale(24.36),
    fontWeight: '500',
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
  loginButton: {
    backgroundColor: '#8B5C2A',
    borderRadius: moderateScale(8),
    paddingVertical: verticalScale(14.616),
    alignItems: 'center',
    width: '100%',
    marginTop: verticalScale(9.744),
    marginBottom: verticalScale(9.744),
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: moderateScale(16.875),
  },
  backToMain: {
    marginBottom: verticalScale(9.744),
  },
  backToMainText: {
    color: '#8B5C2A',
    fontSize: moderateScale(13.125),
    fontWeight: '500',
  },
  forgotLink: {
    marginTop: 2,
  },
  forgotText: {
    color: '#B7B7B7',
    fontSize: moderateScale(13.125),
    textDecorationLine: 'underline',
  },
});