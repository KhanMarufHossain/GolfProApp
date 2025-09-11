import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CommunityScreen from '../screens/Main/CommunityScreen';
import SettingsScreen from '../screens/Main/SettingsScreen';
import ProfileStack from '../screens/Main/Profile/ProfileStack';
import CommunityIcon from '../../assets/community.svg';
import AccountIcon from '../../assets/account.svg';
import SettingsIcon from '../../assets/settings-icon.png';
import { moderateScale } from '../utils/dimensions';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'react-native';

const Tab = createBottomTabNavigator();

export default function ClubTabs() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      initialRouteName="Profile"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarIcon: ({ focused, color, size }) => {
          size = moderateScale(24);
          if (route.name === 'Profile') {
            return <AccountIcon width={size} height={size} fill={color} />;
          } else if (route.name === 'Community') {
            return <CommunityIcon width={size} height={size} fill={color} />;
          } else if (route.name === 'Settings') {
            return <Image source={SettingsIcon} style={{ width: size, height: size, tintColor: color }} />;
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
      <Tab.Screen name="Profile" component={ProfileStack} />
      <Tab.Screen name="Community" component={CommunityScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
