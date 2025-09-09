import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CommunityFeedScreen from './CommunityFeedScreen';
import PostDetailScreen from './PostDetailScreen';
import ComposePostScreen from './ComposePostScreen';

const Stack = createStackNavigator();

export default function CommunityStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CommunityFeed" component={CommunityFeedScreen} />
      <Stack.Screen name="PostDetail" component={PostDetailScreen} />
      <Stack.Screen name="ComposePost" component={ComposePostScreen} />
    </Stack.Navigator>
  );
}
