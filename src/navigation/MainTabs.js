import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CommunityScreen from '../screens/Main/CommunityScreen';
import PlayStack from '../screens/Main/PlayStack';
import CalculatorScreen from '../screens/Main/CalculatorScreen';
import ProfileStack from '../screens/Main/Profile/ProfileStack';
import SettingsScreen from '../screens/Main/SettingsScreen';
import CommunityIcon from '../../assets/community.svg';
import PlayIcon from '../../assets/play.svg';
import CalculatorIcon from '../../assets/calculator.svg';
import AccountIcon from '../../assets/account.svg';
import SettingsIcon from '../../assets/settings-icon.png';
import { moderateScale } from '../utils/dimensions';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useUser } from '../context/UserContext';
import { Image } from 'react-native';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  const insets = useSafeAreaInsets();
  const { userType } = useUser();

  // Default to golfer if userType is null (shouldn't happen in normal flow)
  const isClub = userType === 'club';

  return (
    <Tab.Navigator
      initialRouteName={isClub ? "Profile" : "Community"}
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
      {isClub ? (
        // Golf Club navigation - Profile, Community, Settings
        <>
          <Tab.Screen name="Profile" component={ProfileStack} />
          <Tab.Screen name="Community" component={CommunityScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </>
      ) : (
        // Golfer navigation - Community, Play, HCP Calculator, Profile
        <>
          <Tab.Screen name="Community" component={CommunityScreen} />
          <Tab.Screen name="Play" component={PlayStack} />
          <Tab.Screen name="HCP Calculator" component={CalculatorScreen} />
          <Tab.Screen name="Profile" component={ProfileStack} />
        </>
      )}
    </Tab.Navigator>
  );
}
