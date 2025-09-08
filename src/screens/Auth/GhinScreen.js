import React from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

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
          onPress={() => navigation.navigate('Credential')}
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
    paddingHorizontal: width * 0.08,
  },
  usgaLogo: {
    width: width * 0.35,
    height: width * 0.16,
    marginBottom: height * 0.03,
  },
  ghinTitle: {
    fontSize: width * 0.038,
    color: '#5B3926',
    textAlign: 'center',
    marginBottom: height * 0.03,
    fontWeight: '500',
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
  loginButton: {
    backgroundColor: '#8B5C2A',
    borderRadius: 8,
    paddingVertical: height * 0.018,
    alignItems: 'center',
    width: '100%',
    marginTop: height * 0.012,
    marginBottom: height * 0.012,
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: width * 0.045,
  },
  backToMain: {
    marginBottom: height * 0.012,
  },
  backToMainText: {
    color: '#8B5C2A',
    fontSize: width * 0.035,
    fontWeight: '500',
  },
  forgotLink: {
    marginTop: 2,
  },
  forgotText: {
    color: '#B7B7B7',
    fontSize: width * 0.035,
    textDecorationLine: 'underline',
  },
});