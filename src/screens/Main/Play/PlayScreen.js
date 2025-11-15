import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, SafeAreaView, StyleSheet, Image, Text, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import CourseCard from '../../../components/CourseCard';
import { horizontalScale, verticalScale, moderateScale } from '../../../utils/dimensions';
import { colors } from '../../../utils/theme'; // Add this import if not already present
import { getProfile } from '../../../services/profileService';

const data = new Array(6).fill(0).map((_, i) => ({
  id: i,
  name: `Course ${i + 1}`,
  title: `Course ${i + 1}`,
  image: require('../../../../assets/golffield1.jpg'),
  holes: 9,
  distance: `${(1 + i * 0.5).toFixed(1)} miles`,
  location: 'Local Club',
  clubName: 'Local Club',
  lengthYards: 6599 + i * 100,
  rating: 70.4,
  slope: 115,
  isPublic: true,
  rank: i + 1
}));

export default function PlayScreen({ navigation }) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = useCallback(async () => {
    try {
      console.log('🔵 [PlayScreen] Loading profile');
      const response = await getProfile();
      if (response.ok && response.data) {
        console.log('✅ [PlayScreen] Profile loaded:', response.data.fullName);
        setProfile(response.data);
      }
    } catch (error) {
      console.error('🔴 [PlayScreen] Error loading profile:', error);
    }
  }, []);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const navigateTo = (screen) => {
    setMenuVisible(false);
    // Use push to ensure we stay within PlayStack and preserve back to Play
    navigation.push(screen);
  };

  const handleSearch = () => {
    // Handle search functionality - can be expanded based on requirements
    console.log('Search pressed');
  };

  const handleFilter = () => {
    // Handle filter functionality - can be expanded based on requirements
    console.log('Filter pressed');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <View style={styles.headerLeftRow}>
          <View style={styles.avatarWrap}>
            <Image 
              source={profile?.profileImage 
                ? (typeof profile.profileImage === 'string' ? { uri: profile.profileImage } : profile.profileImage)
                : require('../../../../assets/man.png')
              } 
              style={styles.avatar} 
            />
          </View>
          <View style={styles.headerTexts}>
            <Text style={styles.greeting}>Hey, {profile?.fullName || 'Player'} 👋</Text>
            <Text style={styles.sub}>Choose your playground</Text>
          </View>
        </View>

        <View style={styles.headerRightRow}>
          <TouchableOpacity onPress={() => navigation.navigate('Notifications')} style={styles.iconButton}>
            <Image source={require('../../../../assets/bell.png')} style={styles.headerIcon} />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleMenu} style={styles.iconButton}>
            <Image source={require('../../../../assets/dots-icon.png')} style={styles.headerIcon} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search row */}
      <View style={styles.searchRow}>
        <TouchableOpacity style={styles.searchBox} activeOpacity={0.8} onPress={handleSearch}>
          <Text style={styles.searchText}>🔍  Search Courses</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterBtn} activeOpacity={0.8} onPress={handleFilter}>
          <Image source={require('../../../../assets/filter.png')} style={styles.filterIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <FlatList
          data={data}
          keyExtractor={(i) => String(i.id)}
          contentContainerStyle={{ paddingHorizontal: horizontalScale(20), paddingTop: verticalScale(12) }}
          renderItem={({ item }) => (
            <CourseCard onPress={() => navigation.navigate('Course', { course: item })} course={item} />
          )}
        />
      </View>

      <Modal animationType="fade" transparent visible={menuVisible} onRequestClose={toggleMenu}>
        <TouchableWithoutFeedback onPress={toggleMenu}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.menuContainer}>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('Settings')}>
              <Image source={require('../../../../assets/settings-icon.png')} style={styles.menuIcon} />
              <Text style={styles.menuText}>Settings</Text>
            </TouchableOpacity>
            <View style={styles.menuDivider} />
            <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('Map')}>
              <Image source={require('../../../../assets/map-icon.png')} style={styles.menuIcon} />
              <Text style={styles.menuText}>Map</Text>
            </TouchableOpacity>
            <View style={styles.menuDivider} />
            <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('Leaderboard')}>
              <Image source={require('../../../../assets/leaderboard-icon.png')} style={styles.menuIcon} />
              <Text style={styles.menuText}>Leaderboard</Text>
            </TouchableOpacity>
            <View style={styles.menuDivider} />
            <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('TrophyRoom')}>
              <Image source={require('../../../../assets/trophy-icon.png')} style={styles.menuIcon} />
              <Text style={styles.menuText}>Trophy Room</Text>
            </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: horizontalScale(20),
    paddingTop: verticalScale(53),
    paddingBottom: verticalScale(12),
  },
  headerLeftRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatarWrap: {
    width: horizontalScale(48),
    height: verticalScale(48),
    borderRadius: moderateScale(24),
    overflow: "hidden",
    marginRight: horizontalScale(12),
  },
  avatar: { width: "100%", height: "100%" },
  headerTexts: { flex: 1 },
  greeting: { fontSize: moderateScale(18), fontWeight: "600", color: "#222" },
  greet: { fontSize: moderateScale(16), fontWeight: "700", color: colors.text },
  sub: { color: colors.textMute, marginTop: verticalScale(4) },
  headerRightRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    marginLeft: horizontalScale(16),
    padding: 5,
  },
  headerIcon: {
    width: moderateScale(24),
    height: moderateScale(24),
  },
  notificationDot: {
    position: "absolute",
    top: 3,
    right: 3,
    width: moderateScale(10),
    height: moderateScale(10),
    borderRadius: moderateScale(5),
    backgroundColor: "#FF4444",
    borderWidth: 2,
    borderColor: '#fff',
  },
  searchRow: {
    paddingHorizontal: horizontalScale(20),
    marginTop: verticalScale(16),
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBox: {
    flex: 1,
    backgroundColor: '#F6EFEA',
    borderRadius: moderateScale(12),
    paddingVertical: verticalScale(12),
    paddingHorizontal: horizontalScale(14),
    marginRight: horizontalScale(12),
  },
  searchText: { color: '#999' },
  filterBtn: {
    width: horizontalScale(44),
    height: verticalScale(44),
    borderRadius: moderateScale(12),
    backgroundColor: '#8B5C2A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterIcon: { 
    width: moderateScale(24),
    height: moderateScale(24),
    tintColor: '#fff'
  },
  container: { flex: 1 },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: verticalScale(100), // Position below header
    paddingRight: horizontalScale(20), // Align with right edge
  },
  menuContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(14),
    paddingVertical: verticalScale(6),
    width: horizontalScale(200),
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: verticalScale(14),
    paddingHorizontal: horizontalScale(16),
  },
  menuIcon: {
    width: moderateScale(18),
    height: moderateScale(18),
    marginRight: horizontalScale(12),
    tintColor: '#1E2250',
  },
  menuText: {
    fontSize: moderateScale(15),
    color: '#1E2250',
    fontWeight: '600',
  },
  menuDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#EFE7E1',
    marginHorizontal: 0,
  },
});
