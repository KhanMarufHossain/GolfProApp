import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileHomeScreen from './ProfileHomeScreen';
import ClubProfileScreen from './ClubProfileScreen';
import EditProfileScreen from './EditProfileScreen';
import FollowersScreen from './FollowersScreen';
import ScorecardsScreen from './ScorecardsScreen';
import ProfileSettingsScreen from './ProfileSettingsScreen';
import { useUser } from '../../../context/UserContext';
import NotificationsScreen from '../NotificationsScreen';
import MessagesScreen from './MessagesScreen';

const Stack = createStackNavigator();

export default function ProfileStack() {
  const { userType } = useUser();
  const isClub = userType === 'club';

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen 
        name="ProfileHome" 
        component={isClub ? ClubProfileScreen : ProfileHomeScreen} 
      />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="Followers" component={FollowersScreen} />
      <Stack.Screen name="Scorecards" component={ScorecardsScreen} />
      <Stack.Screen name="ProfileSettings" component={ProfileSettingsScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="Messages" component={MessagesScreen} />
    </Stack.Navigator>
  );
}
