import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Dimensions } from 'react-native';
import ClubDocket from '../../../assets/ClubDocket.svg';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

export default function SignUpScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
  <ClubDocket width={width * 0.25} height={width * 0.25} />
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
    paddingHorizontal: width * 0.08,
  },
  logo: {
    width: width * 0.25,
    height: width * 0.25,
    marginBottom: height * 0.03,
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
    marginBottom: height * 0.03,
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
  signupButton: {
    backgroundColor: '#8B5C2A',
    borderRadius: 8,
    paddingVertical: height * 0.018,
    alignItems: 'center',
    width: '100%',
    marginTop: height * 0.012,
    marginBottom: height * 0.022,
  },
  signupButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: width * 0.045,
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: height * 0.01,
  },
  loginText: {
    color: '#888',
    fontSize: width * 0.035,
  },
  loginLink: {
    color: '#8B5C2A',
    fontWeight: '600',
    fontSize: width * 0.035,
  },
});