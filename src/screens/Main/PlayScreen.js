import React, { useState } from 'react';
import { View, FlatList, SafeAreaView, StyleSheet, Image, Text, TouchableOpacity, Modal } from 'react-native';
import CourseCard from '../../components/CourseCard';
import { horizontalScale, verticalScale, moderateScale } from '../../utils/dimensions';

const data = new Array(6).fill(0).map((_, i) => ({
  id: i,
  title: `Course ${i + 1}`,
  image: require('../../../assets/golffield1.jpg'),
  holes: 9,
  distance: `${(1 + i * 0.5).toFixed(1)} miles`,
  location: 'Local Club',
}));

export default function PlayScreen({ navigation }) {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const navigateTo = (screen) => {
    setMenuVisible(false);
    navigation.navigate(screen);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <View style={styles.headerLeftRow}>
          <View style={styles.avatarWrap}> 
            <Image source={require('../../../assets/man.png')} style={styles.avatar} />
          </View>
          <View style={styles.headerTexts}>
            <Text style={styles.greeting}>Hey, Player 👋</Text>
            <Text style={styles.sub}>Choose your playground</Text>
          </View>
        </View>

        <View style={styles.headerRightRow}>
          <TouchableOpacity onPress={() => navigation.navigate('Notifications')} style={styles.iconButton}>
            <Image source={require('../../../assets/bell.png')} style={styles.headerIcon} />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleMenu} style={styles.iconButton}>
            <Image source={require('../../../assets/dots-icon.png')} style={styles.headerIcon} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search row */}
      <View style={styles.searchRow}>
        <TouchableOpacity style={styles.searchBox} activeOpacity={0.8}>
          <Text style={styles.searchText}>🔍  Search Courses</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterBtn} activeOpacity={0.8}>
          <Image source={require('../../../assets/filter.png')} style={styles.filterIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <FlatList
          data={data}
          keyExtractor={(i) => String(i.id)}
          contentContainerStyle={{ paddingHorizontal: horizontalScale(20), paddingTop: verticalScale(12) }}
          renderItem={({ item }) => (
            <CourseCard onPress={() => navigation.navigate('Course')} course={item} />
          )}
        />
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={menuVisible}
        onRequestClose={toggleMenu}
      >
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPressOut={toggleMenu}>
          <View style={styles.menuContainer}>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('Settings')}>
              <Image source={require('../../../assets/settings-icon.png')} style={styles.menuIcon} />
              <Text style={styles.menuText}>Settings</Text>
            </TouchableOpacity>
            <View style={styles.menuDivider} />
            <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('Map')}>
              <Image source={require('../../../assets/map-icon.png')} style={styles.menuIcon} />
              <Text style={styles.menuText}>Map</Text>
            </TouchableOpacity>
            <View style={styles.menuDivider} />
            <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('Leaderboard')}>
              <Image source={require('../../../assets/leaderboard-icon.png')} style={styles.menuIcon} />
              <Text style={styles.menuText}>Leaderboard</Text>
            </TouchableOpacity>
            <View style={styles.menuDivider} />
            <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('TrophyRoom')}>
              <Image source={require('../../../assets/trophy-icon.png')} style={styles.menuIcon} />
              <Text style={styles.menuText}>Trophy Room</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: horizontalScale(20),
    paddingTop: verticalScale(40),
    paddingBottom: verticalScale(12),
  },
  headerLeftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarWrap: {
    width: horizontalScale(48),
    height: verticalScale(48),
    borderRadius: moderateScale(24),
    overflow: 'hidden',
    marginRight: horizontalScale(12),
  },
  avatar: { width: '100%', height: '100%' },
  headerTexts: { flex: 1 },
  greeting: { fontSize: moderateScale(18), fontWeight: '600', color: '#222' },
  sub: { color: '#888', marginTop: verticalScale(4) },
  headerRightRow: {
    flexDirection: 'row',
    alignItems: 'center',
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
    position: 'absolute',
    top: 5,
    right: 5,
    width: moderateScale(8),
    height: moderateScale(8),
    borderRadius: moderateScale(4),
    backgroundColor: 'red',
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
    paddingTop: verticalScale(56), // reduced for closer alignment
    paddingRight: horizontalScale(6), // reduced for closer alignment
  },
  menuContainer: {
    backgroundColor: 'white',
    borderRadius: moderateScale(12),
    padding: moderateScale(10),
    width: horizontalScale(200),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: verticalScale(12),
    paddingHorizontal: horizontalScale(10),
  },
  menuIcon: {
    width: moderateScale(20),
    height: moderateScale(20),
    marginRight: horizontalScale(15),
    tintColor: '#333'
  },
  menuText: {
    fontSize: moderateScale(16),
    color: '#333',
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#f0f0f0',
  },
});
