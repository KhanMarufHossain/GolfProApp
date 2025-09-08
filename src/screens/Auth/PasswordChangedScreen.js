import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

export default function PasswordChangedScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Image
          source={require('../../../assets/correct.png')}
          style={styles.icon}
          resizeMode="contain"
        />
        <Text style={styles.title}>Password Changed!</Text>
        <Text style={styles.desc}>
          Return to the login page to enter your account with your new password!
        </Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.backButtonText}>← Back To Login</Text>
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
  icon: {
    width: width * 0.18,
    height: width * 0.18,
    marginBottom: height * 0.04,
  },
  title: {
    fontSize: width * 0.06,
    fontWeight: '700',
    color: '#5B3926',
    marginBottom: height * 0.01,
    fontFamily: 'System',
    textAlign: 'center',
  },
  desc: {
    fontSize: width * 0.035,
    color: '#888',
    marginBottom: height * 0.03,
    fontFamily: 'System',
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: '#8B5C2A',
    borderRadius: 8,
    paddingVertical: height * 0.018,
    alignItems: 'center',
    width: '100%',
    marginTop: height * 0.012,
    marginBottom: height * 0.022,
  },
  backButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: width * 0.045,
  },
});