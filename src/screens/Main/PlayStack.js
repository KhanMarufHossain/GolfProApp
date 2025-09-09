import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PlayScreen from './PlayScreen';
import CourseScreen from './CourseScreen';
import AddPlayerScreen from './AddPlayerScreen';
import CoursePreviewScreen from './CoursePreviewScreen';
import MapScreen from './MapScreen';
import NotificationsScreen from './NotificationsScreen';
import SettingsScreen from './SettingsScreen';
import LeaderboardScreen from './LeaderboardScreen';
import TrophyRoomScreen from './TrophyRoomScreen';
import StartRoundScreen from './StartRoundScreen';

const Stack = createStackNavigator();

export default function PlayStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PlayHome" component={PlayScreen} />
      <Stack.Screen name="Course" component={CourseScreen} />
  <Stack.Screen name="StartRound" component={StartRoundScreen} />
      <Stack.Screen name="AddPlayer" component={AddPlayerScreen} />
      <Stack.Screen name="CoursePreview" component={CoursePreviewScreen} />
      <Stack.Screen name="Map" component={MapScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Leaderboard" component={LeaderboardScreen} />
      <Stack.Screen name="TrophyRoom" component={TrophyRoomScreen} />
    </Stack.Navigator>
  );
}
