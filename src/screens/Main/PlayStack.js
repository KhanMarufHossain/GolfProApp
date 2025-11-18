import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PlayScreen from './Play/PlayScreen';
import CourseScreen from './Play/CourseScreen';
import AddPlayerScreen from './Play/AddPlayerScreen';
import CoursePreviewScreen from './Play/CoursePreviewScreen';
import MapScreen from './MapScreen';
import NotificationsScreen from './NotificationsScreen';
import SettingsScreen from './SettingsScreen';
import SettingsPrivacyPolicyScreen from './SettingsPrivacyPolicyScreen';
import SettingsEditProfileScreen from './SettingsEditProfileScreen';
import SettingsEditAvatarScreen from './SettingsEditAvatarScreen';
import SettingsEditCoverScreen from './SettingsEditCoverScreen';
import SettingsChangePasswordScreen from './SettingsChangePasswordScreen';
import SettingsPhoneScreen from './SettingsPhoneScreen';
import SettingsPhotosScreen from './SettingsPhotosScreen';
import LeaderboardScreen from './LeaderboardScreen';
import TrophyRoomScreen from './TrophyRoomScreen';
import StartRoundScreen from './Play/StartRoundScreen';
import ActiveRoundScreen from './Play/ActiveRoundScreen';
import ScoreCardScreen from './Play/ScoreCardScreen';
import BracketScreen from './BracketScreen';

const Stack = createStackNavigator();

export default function PlayStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PlayHome" component={PlayScreen} />
      <Stack.Screen name="Course" component={CourseScreen} />
      <Stack.Screen name="StartRound" component={StartRoundScreen} />
      <Stack.Screen name="AddPlayer" component={AddPlayerScreen} />
      <Stack.Screen name="CoursePreview" component={CoursePreviewScreen} />
      <Stack.Screen name="ActiveRound" component={ActiveRoundScreen} />
  <Stack.Screen name="ScoreCard" component={ScoreCardScreen} />
    <Stack.Screen name="Bracket" component={BracketScreen} />
      <Stack.Screen name="Map" component={MapScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
  <Stack.Screen name="SettingsPrivacyPolicy" component={SettingsPrivacyPolicyScreen} />
  <Stack.Screen name="SettingsEditProfile" component={SettingsEditProfileScreen} />
  <Stack.Screen name="SettingsEditAvatar" component={SettingsEditAvatarScreen} />
  <Stack.Screen name="SettingsEditCover" component={SettingsEditCoverScreen} />
  <Stack.Screen name="SettingsChangePassword" component={SettingsChangePasswordScreen} />
  <Stack.Screen name="SettingsPhone" component={SettingsPhoneScreen} />
  <Stack.Screen name="SettingsPhotos" component={SettingsPhotosScreen} />
      <Stack.Screen name="Leaderboard" component={LeaderboardScreen} />
      <Stack.Screen name="TrophyRoom" component={TrophyRoomScreen} />
    </Stack.Navigator>
  );
}
