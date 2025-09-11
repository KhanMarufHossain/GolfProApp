import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../utils/dimensions';
import { colors } from '../../../utils/theme';
import PostCard from '../../../components/PostCard';
import { fetchFeed, likePost } from '../../../services/communityService';

const ProfileHomeScreen = ({ navigation }) => {
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadFeed = useCallback(async () => {
    setLoading(true);
    const res = await fetchFeed();
    if (res.ok) setFeed(res.data);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadFeed();
  }, [loadFeed]);

  const onLike = async (id) => {
    const res = await likePost(id);
    if (res.ok) {
      setFeed((prev) => prev.map((p) => (p.id === id ? res.data : p)));
    }
  };

  const profile = {
    name: 'Nick Ribeiro',
    location: 'Kansas US',
    avatar: require('../../../../assets/man.png'),
    coverImage: require('../../../../assets/golffield1.jpg'),
    stats: {
      hp: '18.5',
      friends: '1254',
      clubMembers: '1254',
      coursePlayed: '1254',
    },
  };

  const renderPlayer = (player, index) => (
    <View key={index} style={styles.playerRow}>
      <View style={styles.playerInfo}>
        <View
          style={[
            styles.tierBadge,
            {
              backgroundColor:
                player.tier === 'T1'
                  ? '#FFD700'
                  : player.tier === 'T2'
                  ? '#C0C0C0'
                  : '#CD7F32',
            },
          ]}>
          <Text style={styles.tierText}>{player.tier}</Text>
        </View>
        <Image source={player.avatar} style={styles.playerAvatar} />
        <Text style={styles.playerName}>{player.name}</Text>
      </View>
      <Text style={styles.playerScore}>{player.score}</Text>
    </View>
  );

  const renderFeedItem = ({ item }) => (
    <PostCard
      post={item}
      onPress={() => navigation && navigation.navigate('PostDetail', { postId: item.id })}
      onLike={() => onLike(item.id)}
      onComment={() => navigation && navigation.navigate('PostDetail', { postId: item.id, focus: 'comment' })}
    />
  );

  return (
    <View  style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity onPress={() => navigation && navigation.navigate('Notifications')}>
            <Image
              source={require('../../../../assets/bell.png')}
              style={styles.headerIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation && navigation.navigate('ProfileSettings')}>
            <Image
              source={require('../../../../assets/dots-icon.png')}
              style={styles.headerIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={feed}
        keyExtractor={(item) => item.id}
        renderItem={renderFeedItem}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <>
            <View style={styles.profileHeader}>
              <Image source={profile.coverImage} style={styles.coverImage} />
              <View style={styles.profileInfo}>
                <Image source={profile.avatar} style={styles.avatar} />
                <View>
                  <Text style={styles.profileName}>{profile.name}</Text>
                  <Text style={styles.profileLocation}>{profile.location}</Text>
                </View>
                <View style={styles.t1Badge}>
                  <Text style={styles.t1BadgeText}>T1</Text>
                </View>
              </View>
            </View>

            <View style={styles.statsBar}>
              <View style={styles.statPill}>
                <Text style={styles.statLabel}>#HP</Text>
                <Text style={styles.statValue}>{profile.stats.hp}</Text>
              </View>
              <View style={styles.statPill}>
                <Text style={styles.statLabel}>Friends</Text>
                <Text style={styles.statValue}>{profile.stats.friends}</Text>
              </View>
              <View style={styles.statPill}>
                <Text style={styles.statLabel}>Club Members</Text>
                <Text style={styles.statValue}>{profile.stats.clubMembers}</Text>
              </View>
              <View style={styles.statPill}>
                <Text style={styles.statLabel}>Course Played</Text>
                <Text style={styles.statValue}>{profile.stats.coursePlayed}</Text>
              </View>
            </View>

            <View style={styles.actionsBar}>
              <TouchableOpacity style={[styles.actionPill, styles.actionPillPrimary]} activeOpacity={0.8}>
                <Image source={require('../../../../assets/rectangle.png')} style={[styles.actionIcon, { tintColor: '#fff' }]} />
                <Text style={[styles.actionPillText, styles.actionPillTextPrimary]}>Feed</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionPill} activeOpacity={0.8} onPress={() => navigation && navigation.navigate('Followers')}>
                <Image source={require('../../../../assets/addFriend.png')} style={[styles.actionIcon, { tintColor: colors.accent }]} />
                <Text style={styles.actionPillText}>Friend</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionPill} activeOpacity={0.8} onPress={() => navigation && navigation.navigate('Messages')}>
                <Image source={require('../../../../assets/Comment.png')} style={[styles.actionIcon, { tintColor: colors.accent }]} />
                <Text style={styles.actionPillText}>Messages</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',

  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop:verticalScale(30),
    padding: moderateScale(15),
    backgroundColor: 'white',
  },
  headerTitle: {
    fontSize: moderateScale(20),
    fontWeight: 'bold',
  },
  headerActions: {
    flexDirection: 'row',
  },
  headerIcon: {
    width: moderateScale(20),
    height: moderateScale(20),
    marginLeft: moderateScale(15),
    resizeMode: 'contain',
  },
  profileHeader: {
    backgroundColor: 'white',
  },
  coverImage: {
    width: '100%',
    height: verticalScale(150),
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: moderateScale(15),
    marginTop: verticalScale(-30),
  },
  avatar: {
    width: moderateScale(60),
    height: moderateScale(60),
    borderRadius: moderateScale(30),
    borderWidth: 3,
    borderColor: 'white',
    marginRight: moderateScale(10),
  },
  profileName: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    paddingTop: verticalScale(20),
  },
  profileLocation: {
    fontSize: moderateScale(14),
    color: 'gray',
  },
  t1Badge: {
    backgroundColor: '#FFD700',
    borderRadius: moderateScale(15),
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(5),
    marginLeft: 'auto',
  },
  t1BadgeText: {
    fontWeight: 'bold',
  },
  statsBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: horizontalScale(12),
    paddingVertical: verticalScale(12),
    backgroundColor: 'white',
  },
  statPill: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EFE7E1',
    borderRadius: moderateScale(16),
    paddingVertical: verticalScale(12),
    marginHorizontal: horizontalScale(4),
    alignItems: 'center',
  },
  statLabel: {
    color: '#6E6E6E',
    fontSize: moderateScale(12),
    marginBottom: verticalScale(4),
    fontWeight: '600',
  },
  statValue: {
    color: '#1E2250',
    fontSize: moderateScale(16),
    fontWeight: '700',
  },
  actionsBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: horizontalScale(12),
    paddingBottom: verticalScale(8),
    paddingTop: verticalScale(2),
    backgroundColor: 'white',
    marginBottom: verticalScale(10),
  },
  actionPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EADBD0',
    borderRadius: moderateScale(20),
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(16),
    marginHorizontal: horizontalScale(4),
    width: horizontalScale(100),
  },
  actionPillPrimary: {
    backgroundColor: '#8B5C2A',
  },
  actionPillText: {
    color: '#8B5C2A',
    fontWeight: '700',
    fontSize: moderateScale(12),
    marginLeft: horizontalScale(6),
  },
  actionPillTextPrimary: {
    color: '#FFFFFF',
  },
  actionIcon: {
    width: moderateScale(16),
    height: moderateScale(16),
    resizeMode: 'contain',
  },
});

export default ProfileHomeScreen;
