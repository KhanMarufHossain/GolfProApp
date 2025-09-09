import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileHomeScreen from './ProfileHomeScreen';
import EditProfileScreen from './EditProfileScreen';
import FollowersScreen from './FollowersScreen';
import ScorecardsScreen from './ScorecardsScreen';
import ProfileSettingsScreen from './ProfileSettingsScreen';

const Stack = createStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileHome" component={ProfileHomeScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="Followers" component={FollowersScreen} />
      <Stack.Screen name="Scorecards" component={ScorecardsScreen} />
      <Stack.Screen name="ProfileSettings" component={ProfileSettingsScreen} />
    </Stack.Navigator>
  );
}
