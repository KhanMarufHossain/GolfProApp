import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  Image, 
  TouchableOpacity, 
  TextInput,
  ActivityIndicator 
} from 'react-native';
import { colors, radius } from '../../../utils/theme';
import { horizontalScale, verticalScale, moderateScale } from '../../../utils/dimensions';
import { getProfile } from '../../../services/profileService';

export default function FollowersScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('Followers');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      console.log('🔵 [FollowersScreen] Loading profile from backend');
      setLoading(true);
      const response = await getProfile();
      console.log('📊 [FollowersScreen] Profile response:', { ok: response.ok, hasData: !!response.data });
      
      if (response.ok && response.data) {
        console.log('📋 [FollowersScreen] Profile data:', JSON.stringify(response.data, null, 2));
        setProfile(response.data);
        console.log('✅ [FollowersScreen] Profile loaded');
      } else {
        console.log('❌ [FollowersScreen] Failed to load profile');
      }
    } catch (error) {
      console.error('🔴 [FollowersScreen] Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  // Mock data - in real app, this would come from an API
  const mockFollowers = Array.from({ length: 12 }).map((_, i) => ({
    id: 'follower_' + i,
    name: `Golf Player ${i + 1}`,
    username: `@player${i + 1}`,
    avatar: require('../../../../assets/man.png'),
    isFollowing: i % 3 === 0,
    handicap: (Math.random() * 30).toFixed(1),
    location: i % 2 === 0 ? 'San Diego, CA' : 'Los Angeles, CA'
  }));

  const mockFollowing = Array.from({ length: 8 }).map((_, i) => ({
    id: 'following_' + i,
    name: `Pro Golfer ${i + 1}`,
    username: `@pro${i + 1}`,
    avatar: require('../../../../assets/man.png'),
    isFollowing: true,
    handicap: (Math.random() * 10).toFixed(1),
    location: i % 2 === 0 ? 'Pebble Beach, CA' : 'Augusta, GA'
  }));

  const getCurrentData = () => {
    const data = activeTab === 'Followers' ? mockFollowers : mockFollowing;
    if (!searchQuery) return data;
    
    return data.filter(user => 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const handleFollowToggle = (userId) => {
    // In real app, this would call an API
    console.log(`Toggle follow for user: ${userId}`);
  };

  const renderUserItem = ({ item }) => (
    <View style={styles.userCard}>
      <Image source={item.avatar} style={styles.userAvatar} />
      
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.userUsername}>{item.username}</Text>
        <Text style={styles.userMeta}>HCP {item.handicap} • {item.location}</Text>
      </View>

      <TouchableOpacity 
        style={[
          styles.followButton, 
          item.isFollowing && styles.followingButton
        ]}
        onPress={() => handleFollowToggle(item.id)}
      >
        <Text style={[
          styles.followButtonText,
          item.isFollowing && styles.followingButtonText
        ]}>
          {item.isFollowing ? 'Following' : 'Follow'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderHeader = () => (
    <View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search users..."
          placeholderTextColor={colors.textMute}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.tabContainer}>
        {['Followers', 'Following'].map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={[
              styles.tabButton,
              activeTab === tab && styles.activeTabButton
            ]}
          >
            <Text style={[
              styles.tabText,
              activeTab === tab && styles.activeTabText
            ]}>
              {tab}
            </Text>
            <View style={styles.tabBadge}>
              <Text style={styles.tabBadgeText}>
                {tab === 'Followers' ? mockFollowers.length : mockFollowing.length}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {activeTab === 'Followers' ? 'Followers' : 'Following'}
        </Text>
        <View style={styles.headerSpacer} />
      </View>

      <FlatList
        data={getCurrentData()}
        keyExtractor={(item) => item.id}
        renderItem={renderUserItem}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              {searchQuery ? 'No users found' : `No ${activeTab.toLowerCase()} yet`}
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    height: verticalScale(56),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: horizontalScale(16),
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    width: moderateScale(40),
    height: moderateScale(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    fontSize: moderateScale(24),
    color: colors.accent,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: moderateScale(18),
    fontWeight: '700',
    color: colors.text,
  },
  headerSpacer: {
    width: moderateScale(40),
  },
  listContainer: {
    paddingBottom: verticalScale(20),
  },
  searchContainer: {
    backgroundColor: colors.surface,
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(16),
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  searchInput: {
    height: verticalScale(40),
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.md,
    paddingHorizontal: horizontalScale(16),
    fontSize: moderateScale(16),
    color: colors.text,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    paddingHorizontal: horizontalScale(16),
    paddingTop: verticalScale(16),
    marginBottom: verticalScale(8),
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: verticalScale(12),
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    marginHorizontal: horizontalScale(8),
  },
  activeTabButton: {
    borderBottomColor: colors.accent,
  },
  tabText: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: colors.textMute,
    marginRight: horizontalScale(8),
  },
  activeTabText: {
    color: colors.accent,
  },
  tabBadge: {
    backgroundColor: colors.accentSoft,
    borderRadius: radius.sm,
    paddingHorizontal: horizontalScale(8),
    paddingVertical: verticalScale(2),
    minWidth: moderateScale(24),
    alignItems: 'center',
  },
  tabBadgeText: {
    fontSize: moderateScale(12),
    fontWeight: '700',
    color: colors.accent,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(16),
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  userAvatar: {
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: moderateScale(25),
    marginRight: horizontalScale(12),
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: colors.text,
    marginBottom: verticalScale(2),
  },
  userUsername: {
    fontSize: moderateScale(14),
    color: colors.textMute,
    marginBottom: verticalScale(2),
  },
  userMeta: {
    fontSize: moderateScale(12),
    color: colors.textMute,
  },
  followButton: {
    paddingHorizontal: horizontalScale(20),
    paddingVertical: verticalScale(8),
    backgroundColor: colors.accent,
    borderRadius: radius.md,
    minWidth: moderateScale(80),
    alignItems: 'center',
  },
  followingButton: {
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
  },
  followButtonText: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: colors.surface,
  },
  followingButtonText: {
    color: colors.textMute,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: verticalScale(40),
  },
  emptyStateText: {
    fontSize: moderateScale(16),
    color: colors.textMute,
    textAlign: 'center',
  },
});
