import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import ClubDocket from '../../../assets/ClubDocket.svg';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

export default function CredentialScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
  <ClubDocket width={width * 0.25} height={width * 0.25} />
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
    paddingHorizontal: width * 0.08,
  },
  logo: {
    width: width * 0.25,
    height: width * 0.25,
    marginBottom: height * 0.03,
  },
  title: {
    fontSize: width * 0.07,
    fontWeight: 'bold',
    color: '#5B3926',
    marginBottom: height * 0.06,
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
    paddingVertical: height * 0.018,
    borderRadius: 8,
    marginHorizontal: 6,
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: '#8B5C2A',
  },
  buttonText: {
    color: '#8B5C2A',
    fontWeight: '600',
    fontSize: width * 0.045,
  },
  loginButtonText: {
    color: '#fff',
  },
});