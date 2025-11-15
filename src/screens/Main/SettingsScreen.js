import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Switch, SafeAreaView, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { colors, radius } from '../../utils/theme';
import { horizontalScale as hs, verticalScale as vs, moderateScale as ms, verticalScale } from '../../utils/dimensions';
import { useUser } from '../../context/UserContext';
import { getProfile } from '../../services/profileService';

export default function SettingsScreen({ navigation }) {
  const [notif, setNotif] = useState(true);
  const [location, setLocation] = useState(false);
  const [profile, setProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const { logout } = useUser();

  const loadProfile = useCallback(async () => {
    try {
      console.log('🔵 [SettingsScreen] Loading profile');
      setProfileLoading(true);
      const response = await getProfile();
      if (response.ok && response.data) {
        console.log('✅ [SettingsScreen] Profile loaded');
        setProfile(response.data);
      }
    } catch (error) {
      console.error('🔴 [SettingsScreen] Error loading profile:', error);
    } finally {
      setProfileLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  useFocusEffect(
    useCallback(() => {
      loadProfile();
    }, [loadProfile])
  );

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await logout();
            // Navigation will happen automatically via App.js when user becomes null
          },
        },
      ]
    );
  };

  return (
    <View style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backIcon}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>
        <View style={{ width: hs(40) }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.centerHeader}>
          {profileLoading ? (
            <ActivityIndicator size="large" color={colors.accent} style={{ marginVertical: vs(20) }} />
          ) : (
            <>
              <Image 
                source={profile?.profileImage 
                  ? (typeof profile.profileImage === 'string' ? { uri: profile.profileImage } : profile.profileImage)
                  : require('../../../assets/man.png')
                } 
                style={styles.bigAvatar} 
              />
              <Text style={styles.bigName}>{profile?.fullName || 'User'}</Text>
              <Text style={styles.ghin}>GHIN Number: {profile?.ghinNumber || 'N/A'}</Text>
            </>
          )}
        </View>

        <View style={styles.cardList}>
          <View style={styles.row}>
            <Text style={styles.rowTitle}>Notifications</Text>
            <Switch value={notif} onValueChange={setNotif} />
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <Text style={styles.rowTitle}>Location</Text>
            <Switch value={location} onValueChange={setLocation} />
          </View>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('SettingsPrivacyPolicy')}>
            <Text style={styles.rowTitle}>Privacy & Policy</Text>
            <Text style={styles.chev}>›</Text>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.row} onPress={() => { /* placeholder for store rating */ }}>
            <Text style={styles.rowTitle}>Rate Golf Docket</Text>
            <Text style={styles.chev}>›</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutTxt}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  header: { height: vs(56), marginTop: verticalScale(50), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: hs(16), backgroundColor: colors.surface, borderBottomWidth: 1, borderBottomColor: colors.border },
  backBtn: { width: ms(40), height: ms(40), alignItems: 'center', justifyContent: 'center' },
  backIcon: { fontSize: ms(18), color: colors.text },
  title: { fontSize: ms(18), fontWeight: '700', color: colors.text },
  content: { padding: hs(16), paddingBottom: vs(30) },

  centerHeader: { alignItems: 'center', marginTop: vs(8), marginBottom: vs(14) },
  bigAvatar: { width: ms(80), height: ms(80), borderRadius: ms(40), marginBottom: vs(8) },
  bigName: { color: colors.text, fontWeight: '700', fontSize: ms(16) },
  ghin: { color: colors.textMute, fontSize: ms(12) },

  cardList: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, overflow: 'hidden' },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: hs(16), paddingVertical: vs(14) },
  rowTitle: { color: colors.text, fontWeight: '600', fontSize: ms(14) },
  chev: { color: colors.textMute, fontSize: ms(20), fontWeight: '700' },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: colors.border },

  logoutBtn: { marginTop: vs(16), alignSelf: 'flex-start', paddingHorizontal: hs(4) },
  logoutTxt: { color: '#C62828', fontWeight: '700' },
});
