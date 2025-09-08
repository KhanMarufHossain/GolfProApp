import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { horizontalScale, verticalScale, moderateScale } from '../../utils/dimensions';
import ClubDocket from '../../../assets/ClubDocket.svg';
import { SafeAreaView } from 'react-native-safe-area-context';



export default function CredentialScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
  <ClubDocket width={horizontalScale(93.75)} height={verticalScale(93.75)} />
        <Text style={styles.title}>Club Docket</Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('SignUp')}
          >
            <Text style={styles.buttonText}>Sign-up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.loginButton]}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={[styles.buttonText, styles.loginButtonText]}>Login</Text>
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
    fontWeight: 'bold',
    color: '#5B3926',
    marginBottom: verticalScale(48.72),
    fontFamily: 'System',
  },
  buttonRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    backgroundColor: '#EFE7E1',
    paddingVertical: verticalScale(14.616),
    borderRadius: moderateScale(8),
    marginHorizontal: horizontalScale(6),
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: '#8B5C2A',
  },
  buttonText: {
    color: '#8B5C2A',
    fontWeight: '600',
    fontSize: moderateScale(16.875),
  },
  loginButtonText: {
    color: '#fff',
  },
});