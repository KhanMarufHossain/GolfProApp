import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

export default function VerifySuccessScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Image
          source={require('../../../assets/verify_success.png')}
          style={styles.illustration}
          resizeMode="contain"
        />
        <Text style={styles.title}>Verify success</Text>
        <Text style={styles.desc}>
          Please set new password to continue
        </Text>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => navigation.navigate('PasswordChanged')}
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
    backgroundColor: '#fff',
    paddingHorizontal: width * 0.08,
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustration: {
    width: width * 0.32,
    height: width * 0.32,
    marginBottom: height * 0.03,
  },
  title: {
    fontSize: width * 0.07,
    fontWeight: '600',
    color: '#5B3926',
    marginBottom: height * 0.01,
    fontFamily: 'System',
  },
  desc: {
    fontSize: width * 0.035,
    color: '#888',
    marginBottom: height * 0.03,
    fontFamily: 'System',
    textAlign: 'center',
  },
  continueButton: {
    backgroundColor: '#8B5C2A',
    borderRadius: 8,
    paddingVertical: height * 0.018,
    alignItems: 'center',
    width: '100%',
    marginTop: height * 0.012,
    marginBottom: height * 0.022,
  },
  continueButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: width * 0.045,
  },
});