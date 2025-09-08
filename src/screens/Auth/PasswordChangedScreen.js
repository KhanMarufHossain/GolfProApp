import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { horizontalScale, verticalScale, moderateScale } from '../../utils/dimensions';
import { SafeAreaView } from 'react-native-safe-area-context';



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
    paddingHorizontal: horizontalScale(30),
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: horizontalScale(67.5),
    height: verticalScale(67.5),
    marginBottom: verticalScale(32.48),
  },
  title: {
    fontSize: moderateScale(22.5),
    fontWeight: '700',
    color: '#5B3926',
    marginBottom: verticalScale(8.12),
    fontFamily: 'System',
    textAlign: 'center',
  },
  desc: {
    fontSize: moderateScale(13.125),
    color: '#888',
    marginBottom: verticalScale(24.36),
    fontFamily: 'System',
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: '#8B5C2A',
    borderRadius: moderateScale(8),
    paddingVertical: verticalScale(14.616),
    alignItems: 'center',
    width: '100%',
    marginTop: verticalScale(9.744),
    marginBottom: verticalScale(17.864),
  },
  backButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: moderateScale(16.875),
  },
});