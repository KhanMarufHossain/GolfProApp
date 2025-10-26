import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './src/navigation/AuthStack';
import { UserProvider, useUser } from './src/context/UserContext';
import { navigationRef } from './src/utils/navigationRef';
import MainTabs from './src/navigation/MainTabs';
import { createStackNavigator } from '@react-navigation/stack';
import NotificationsScreen from './src/screens/Main/NotificationsScreen';
import SettingsScreen from './src/screens/Main/SettingsScreen';
import SettingsPrivacyPolicyScreen from './src/screens/Main/SettingsPrivacyPolicyScreen';
import SettingsEditProfileScreen from './src/screens/Main/SettingsEditProfileScreen';
import SettingsPersonalInfoScreen from './src/screens/Main/SettingsPersonalInfoScreen';
import SettingsEditAvatarScreen from './src/screens/Main/SettingsEditAvatarScreen';
import SettingsEditCoverScreen from './src/screens/Main/SettingsEditCoverScreen';
import SettingsChangePasswordScreen from './src/screens/Main/SettingsChangePasswordScreen';
import SettingsProfileDetailsScreen from './src/screens/Main/SettingsProfileDetailsScreen';
import SettingsPhoneScreen from './src/screens/Main/SettingsPhoneScreen';
import SettingsPhotosScreen from './src/screens/Main/SettingsPhotosScreen';

const Stack = createStackNavigator();

function RootNavigator() {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#8B5C2A" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        // User is signed in
        <>
          <Stack.Screen name="MainTabs" component={MainTabs} />
          <Stack.Screen name="Notifications" component={NotificationsScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="SettingsPrivacyPolicy" component={SettingsPrivacyPolicyScreen} />
          <Stack.Screen name="SettingsEditProfile" component={SettingsEditProfileScreen} />
          <Stack.Screen name="SettingsPersonalInfo" component={SettingsPersonalInfoScreen} />
          <Stack.Screen name="SettingsEditAvatar" component={SettingsEditAvatarScreen} />
          <Stack.Screen name="SettingsEditCover" component={SettingsEditCoverScreen} />
          <Stack.Screen name="SettingsChangePassword" component={SettingsChangePasswordScreen} />
          <Stack.Screen name="SettingsProfileDetails" component={SettingsProfileDetailsScreen} />
          <Stack.Screen name="SettingsPhone" component={SettingsPhoneScreen} />
          <Stack.Screen name="SettingsPhotos" component={SettingsPhotosScreen} />
        </>
      ) : (
        // User is not signed in
        <Stack.Screen name="Auth" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer ref={navigationRef}>
        <RootNavigator />
        <StatusBar style="auto" />
      </NavigationContainer>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
