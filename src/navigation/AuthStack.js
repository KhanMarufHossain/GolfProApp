import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Placeholder imports for screens (create these files in src/screens/Auth/)
import CredentialScreen from '../screens/Auth/CredentialScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import GhinScreen from '../screens/Auth/GhinScreen';
import SignUpScreen from '../screens/Auth/SignUpScreen';
import ForgotPasswordScreen from '../screens/Auth/ForgotPasswordScreen';
import VerifyCodeScreen from '../screens/Auth/VerifyCodeScreen';
import SetNewPasswordScreen from '../screens/Auth/SetNewPasswordScreen';
import VerifySuccessScreen from '../screens/Auth/VerifySuccessScreen';
import PasswordChangedScreen from '../screens/Auth/PasswordChangedScreen';
import ChooseRoleScreen from '../screens/Auth/ChooseRoleScreen';
import MainTabs from './MainTabs';
import NotificationsScreen from '../screens/Main/NotificationsScreen';
import SettingsScreen from '../screens/Main/SettingsScreen';
import SettingsPrivacyPolicyScreen from '../screens/Main/SettingsPrivacyPolicyScreen';
import SettingsEditProfileScreen from '../screens/Main/SettingsEditProfileScreen';
import SettingsPersonalInfoScreen from '../screens/Main/SettingsPersonalInfoScreen';
import SettingsEditAvatarScreen from '../screens/Main/SettingsEditAvatarScreen';
import SettingsEditCoverScreen from '../screens/Main/SettingsEditCoverScreen';
import SettingsChangePasswordScreen from '../screens/Main/SettingsChangePasswordScreen';
import SettingsProfileDetailsScreen from '../screens/Main/SettingsProfileDetailsScreen';
import SettingsPhoneScreen from '../screens/Main/SettingsPhoneScreen';
import SettingsPhotosScreen from '../screens/Main/SettingsPhotosScreen';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Credential" component={CredentialScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="ChooseRole" component={ChooseRoleScreen} />
      <Stack.Screen name="Ghin" component={GhinScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="VerifyCode" component={VerifyCodeScreen} />
      <Stack.Screen name="SetNewPassword" component={SetNewPasswordScreen} />
      <Stack.Screen name="VerifySuccess" component={VerifySuccessScreen} />
      <Stack.Screen name="PasswordChanged" component={PasswordChangedScreen} />
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      {/* Settings detail screens so they are reachable from the Settings tab */}
      <Stack.Screen name="SettingsPrivacyPolicy" component={SettingsPrivacyPolicyScreen} />
      <Stack.Screen name="SettingsEditProfile" component={SettingsEditProfileScreen} />
      <Stack.Screen name="SettingsPersonalInfo" component={SettingsPersonalInfoScreen} />
      <Stack.Screen name="SettingsEditAvatar" component={SettingsEditAvatarScreen} />
      <Stack.Screen name="SettingsEditCover" component={SettingsEditCoverScreen} />
      <Stack.Screen name="SettingsChangePassword" component={SettingsChangePasswordScreen} />
      <Stack.Screen name="SettingsProfileDetails" component={SettingsProfileDetailsScreen} />
      <Stack.Screen name="SettingsPhone" component={SettingsPhoneScreen} />
      <Stack.Screen name="SettingsPhotos" component={SettingsPhotosScreen} />
    </Stack.Navigator>
  );
}