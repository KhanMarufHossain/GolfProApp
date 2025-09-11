import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileHomeScreen from './ProfileHomeScreen';
import EditProfileScreen from './EditProfileScreen';
import FollowersScreen from './FollowersScreen';
import ScorecardsScreen from './ScorecardsScreen';
import ProfileSettingsScreen from './ProfileSettingsScreen';
import { useUser } from '../../../context/UserContext';
import NotificationsScreen from '../NotificationsScreen';
import MessagesScreen from './MessagesScreen';
import PostDetailScreen from '../Community/PostDetailScreen';
import ClubMembersScreen from './ClubMembersScreen';
import CoursePlayedScreen from './CoursePlayedScreen';
import ChatThreadScreen from './ChatThreadScreen';
import MapScreen from '../MapScreen';
import LeaderboardScreen from '../LeaderboardScreen';
import TrophyRoomScreen from '../TrophyRoomScreen';

const Stack = createStackNavigator();

export default function ProfileStack() {
  const { userType } = useUser();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileHome" component={ProfileHomeScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="Followers" component={FollowersScreen} />
      <Stack.Screen name="Scorecards" component={ScorecardsScreen} />
      <Stack.Screen name="ProfileSettings" component={ProfileSettingsScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="Messages" component={MessagesScreen} />
      <Stack.Screen name="PostDetail" component={PostDetailScreen} />
      <Stack.Screen name="ChatThread" component={ChatThreadScreen} />
      <Stack.Screen name="ClubMembers" component={ClubMembersScreen} />
      <Stack.Screen name="CoursePlayed" component={CoursePlayedScreen} />
      {/* Shared routes for overflow menu so club users can navigate without Play tab */}
      <Stack.Screen name="Map" component={MapScreen} />
      <Stack.Screen name="Leaderboard" component={LeaderboardScreen} />
      <Stack.Screen name="TrophyRoom" component={TrophyRoomScreen} />
    </Stack.Navigator>
  );
}
