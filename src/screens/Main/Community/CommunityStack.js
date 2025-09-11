import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CommunityHomeScreen from './CommunityHomeScreen';
import PostDetailScreen from './PostDetailScreen';
import ComposePostScreen from './ComposePostScreen';
import MapScreen from '../MapScreen';
import LeaderboardScreen from '../LeaderboardScreen';
import TrophyRoomScreen from '../TrophyRoomScreen';
import ScoreCardScreen from '../Play/ScoreCardScreen';

const Stack = createStackNavigator();

export default function CommunityStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
  <Stack.Screen name="CommunityHome" component={CommunityHomeScreen} />
      <Stack.Screen name="PostDetail" component={PostDetailScreen} />
      <Stack.Screen name="ComposePost" component={ComposePostScreen} />
      {/* Shared routes for overflow menu/buttons so back returns to Community correctly */}
      <Stack.Screen name="Map" component={MapScreen} />
      <Stack.Screen name="Leaderboard" component={LeaderboardScreen} />
      <Stack.Screen name="TrophyRoom" component={TrophyRoomScreen} />
      <Stack.Screen name="ScoreCard" component={ScoreCardScreen} />
    </Stack.Navigator>
  );
}
