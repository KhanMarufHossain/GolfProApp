import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CommunityScreen from '../screens/Main/CommunityScreen';
import PlayStack from '../screens/Main/PlayStack';
import CalculatorScreen from '../screens/Main/CalculatorScreen';
import AccountScreen from '../screens/Main/AccountScreen';
import CommunityIcon from '../../assets/community.svg';
import PlayIcon from '../../assets/play.svg';
import CalculatorIcon from '../../assets/calculator.svg';
import AccountIcon from '../../assets/account.svg';
import { moderateScale } from '../utils/dimensions';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarIcon: ({ focused, color, size }) => {
          size = moderateScale(24);
          if (route.name === 'Community') {
            return <CommunityIcon width={size} height={size} fill={color} />;
          } else if (route.name === 'Play') {
            return <PlayIcon width={size} height={size} fill={color} />;
          } else if (route.name === 'HCP Calculator') {
            return <CalculatorIcon width={size} height={size} fill={color} />;
          } else if (route.name === 'Profile') {
            return <AccountIcon width={size} height={size} fill={color} />;
          }
        },
        tabBarActiveTintColor: '#8B5C2A',
        tabBarInactiveTintColor: '#B7B7B7',
        tabBarStyle: {
          height: moderateScale(60) + insets.bottom,
          paddingBottom: insets.bottom > 0 ? insets.bottom - moderateScale(5) : moderateScale(8),
          paddingTop: moderateScale(8),
          borderTopWidth: 1,
          borderTopColor: '#EFE7E1',
          backgroundColor: '#F5EDE8',
        },
        tabBarLabelStyle: {
          fontSize: moderateScale(12),
          fontWeight: '600',
        },
      })}
    >
      <Tab.Screen name="Community" component={CommunityScreen} />
      <Tab.Screen name="Play" component={PlayStack} />
      <Tab.Screen name="HCP Calculator" component={CalculatorScreen} />
  <Tab.Screen name="Profile" component={AccountScreen} />
    </Tab.Navigator>
  );
}
