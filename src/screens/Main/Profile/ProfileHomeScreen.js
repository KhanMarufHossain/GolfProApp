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
import OverflowMenu from '../../../components/OverflowMenu';
import PostCard from '../../../components/PostCard';
import { fetchFeed, likePost } from '../../../services/communityService';
import { useUser } from '../../../context/UserContext';

const ProfileHomeScreen = ({ navigation }) => {
  const { userType } = useUser();
  const isClub = userType === 'club';

  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('feed'); // 'feed' | 'friends' | 'messages' | 'requests' | 'members'
  
  const [friendRequests, setFriendRequests] = useState([
    { id: 'fr1', name: 'Nick Blake', avatar: require('../../../../assets/man.png'), hcp: 17, status: 'pending' },
  ]);
  const [suggestedFriends, setSuggestedFriends] = useState([
    { id: 'sf1', name: 'Nick Blake', avatar: require('../../../../assets/man.png'), hcp: 17, status: 'add' },
    { id: 'sf2', name: 'Nick Blake', avatar: require('../../../../assets/man.png'), hcp: 17, status: 'add' },
  ]);
  const [conversations, setConversations] = useState([
    { id: 'c1', name: 'Steelwood Golf Club', subtitle: 'Ace is typing...', time: null, unread: 2, avatar: require('../../../../assets/golfField.png') },
    { id: 'c2', name: 'Steelwood Golf Club', subtitle: 'Ace is typing...', time: null, unread: 2, avatar: require('../../../../assets/golfField.png') },
    { id: 'c3', name: 'Steelwood Golf Club', subtitle: 'Ace is typing...', time: null, unread: 2, avatar: require('../../../../assets/golfField.png') },
    { id: 'c4', name: 'Steelwood Golf Club', subtitle: 'Ace is typing...', time: '03.06 PM', unread: 0, avatar: require('../../../../assets/golfField.png') },
    { id: 'c5', name: 'Nick Blake', subtitle: 'Ace is typing...', time: '03.06 PM', unread: 0, avatar: require('../../../../assets/man.png') },
  ]);

  // Club-specific state
  const [memberRequests, setMemberRequests] = useState([
    { id: 'mr1', name: 'Nick Blake', avatar: require('../../../../assets/man.png'), hcp: 17 },
    { id: 'mr2', name: 'Dianne Russell', avatar: require('../../../../assets/man.png'), hcp: 12 },
    { id: 'mr3', name: 'Annette Black', avatar: require('../../../../assets/man.png'), hcp: 21 },
  ]);
  const [clubMembers, setClubMembers] = useState([
    { id: 'mb1', name: 'Nick Blake', hcp: 17, avatar: require('../../../../assets/man.png') },
    { id: 'mb2', name: 'Dianne Russell', hcp: 12, avatar: require('../../../../assets/man.png') },
  ]);
  const [confirmRemove, setConfirmRemove] = useState(null);

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

  const profile = isClub
    ? {
        name: 'Steelwood Golf Club',
        location: 'Kansas US',
        avatar: require('../../../../assets/golfField.png'),
        coverImage: require('../../../../assets/golffield1.jpg'),
        stats: { hp: '6.0', friends: null, clubMembers: String(clubMembers.length), coursePlayed: '—' },
        rank: '#1',
      }
    : {
        name: 'Nick Ribeiro',
        location: 'Kansas US',
        avatar: require('../../../../assets/man.png'),
        coverImage: require('../../../../assets/golffield1.jpg'),
        stats: { hp: '18.5', friends: '1254', clubMembers: '1254', coursePlayed: '1254' },
        rank: 'T1',
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
        <Text style={styles.headerTitle}>{isClub ? 'Club Profile' : 'Profile'}</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity onPress={() => navigation && navigation.navigate('Notifications')}>
            <Image
              source={require('../../../../assets/bell.png')}
              style={styles.headerIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setMenuVisible(true)}>
            <Image
              source={require('../../../../assets/dots-icon.png')}
              style={styles.headerIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={activeTab === 'feed' ? feed : []}
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
                {isClub ? (
                  <View style={styles.rankBox}>
                    <Text style={styles.rankText}>{profile.rank}</Text>
                    <Text style={styles.rankSub}>Rank by World Record</Text>
                  </View>
                ) : (
                  <View style={styles.t1Badge}>
                    <Text style={styles.t1BadgeText}>{profile.rank}</Text>
                  </View>
                )}
              </View>
            </View>

            <View style={styles.statsBar}>
              <View style={styles.statPill}>
                <Text style={styles.statLabel}>#HP</Text>
                <Text style={styles.statValue}>{profile.stats.hp}</Text>
              </View>
              {isClub ? (
                <TouchableOpacity style={styles.statPill} activeOpacity={0.8} onPress={() => setActiveTab('members')}>
                  <Text style={styles.statLabel}>Members</Text>
                  <Text style={styles.statValue}>{profile.stats.clubMembers}</Text>
                </TouchableOpacity>
              ) : (
                <>
                  <TouchableOpacity style={styles.statPill} activeOpacity={0.8} onPress={() => setActiveTab('friends')}>
                    <Text style={styles.statLabel}>Friends</Text>
                    <Text style={styles.statValue}>{profile.stats.friends}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.statPill} activeOpacity={0.8} onPress={() => navigation && navigation.navigate('ClubMembers')}>
                    <Text style={styles.statLabel}>Club Members</Text>
                    <Text style={styles.statValue}>{profile.stats.clubMembers}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.statPill} activeOpacity={0.8} onPress={() => navigation && navigation.navigate('CoursePlayed')}>
                    <Text style={styles.statLabel}>Course Played</Text>
                    <Text style={styles.statValue}>{profile.stats.coursePlayed}</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>

            <View style={styles.actionsBar}>
              <TouchableOpacity style={[styles.actionPill, activeTab==='feed' ? styles.actionPillPrimary : null]} activeOpacity={0.8} onPress={() => setActiveTab('feed')}>
                <Image source={require('../../../../assets/rectangle.png')} style={[styles.actionIcon, { tintColor: activeTab==='feed' ? '#fff' : colors.accent }]} />
                <Text style={[styles.actionPillText, activeTab==='feed' ? styles.actionPillTextPrimary : null]}>Feed</Text>
              </TouchableOpacity>
              {isClub ? (
                <>
                  <TouchableOpacity style={[styles.actionPill, activeTab==='requests' ? styles.actionPillPrimary : null]} activeOpacity={0.8} onPress={() => setActiveTab('requests')}>
                    <Image source={require('../../../../assets/addFriend.png')} style={[styles.actionIcon, { tintColor: activeTab==='requests' ? '#fff' : colors.accent }]} />
                    <Text style={[styles.actionPillText, activeTab==='requests' ? styles.actionPillTextPrimary : null]}>Requests</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.actionPill, activeTab==='members' ? styles.actionPillPrimary : null]} activeOpacity={0.8} onPress={() => setActiveTab('members')}>
                    <Image source={require('../../../../assets/addplayer.png')} style={[styles.actionIcon, { tintColor: activeTab==='members' ? '#fff' : colors.accent }]} />
                    <Text style={[styles.actionPillText, activeTab==='members' ? styles.actionPillTextPrimary : null]}>Members</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.actionPill, activeTab==='messages' ? styles.actionPillPrimary : null]} activeOpacity={0.8} onPress={() => setActiveTab('messages')}>
                    <Image source={require('../../../../assets/Comment.png')} style={[styles.actionIcon, { tintColor: activeTab==='messages' ? '#fff' : colors.accent }]} />
                    <Text style={[styles.actionPillText, activeTab==='messages' ? styles.actionPillTextPrimary : null]}>Chat</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <TouchableOpacity style={[styles.actionPill, activeTab==='friends' ? styles.actionPillPrimary : null]} activeOpacity={0.8} onPress={() => setActiveTab('friends')}>
                    <Image source={require('../../../../assets/addFriend.png')} style={[styles.actionIcon, { tintColor: activeTab==='friends' ? '#fff' : colors.accent }]} />
                    <Text style={[styles.actionPillText, activeTab==='friends' ? styles.actionPillTextPrimary : null]}>Friend</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.actionPill, activeTab==='messages' ? styles.actionPillPrimary : null]} activeOpacity={0.8} onPress={() => setActiveTab('messages')}>
                    <Image source={require('../../../../assets/Comment.png')} style={[styles.actionIcon, { tintColor: activeTab==='messages' ? '#fff' : colors.accent }]} />
                    <Text style={[styles.actionPillText, activeTab==='messages' ? styles.actionPillTextPrimary : null, ]}>Message</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>

            {!isClub && activeTab === 'friends' && (
              <View style={{ paddingHorizontal: horizontalScale(12) }}>
                {friendRequests.length > 0 && (
                  <View style={{ marginTop: verticalScale(8) }}>
                    <Text style={styles.sectionTitle}>Friend Requests</Text>
                    {friendRequests.map((u) => (
                      <View key={u.id} style={styles.listRow}>
                        <Image source={u.avatar} style={styles.listAvatar} />
                        <View style={{ flex: 1 }}>
                          <Text style={styles.listName}>{u.name}</Text>
                          <Text style={styles.listMeta}>HCP 17</Text>
                        </View>
                        <View style={[styles.badge, styles.badgePending]}><Text style={[styles.badgeText, { color: '#8B5C2A' }]}>Pending</Text></View>
                      </View>
                    ))}
                  </View>
                )}

                <View style={{ marginTop: verticalScale(10) }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={styles.sectionTitle}>Add Friends</Text>
                    <TouchableOpacity style={styles.searchSmall}><Text style={styles.searchSmallText}>🔍</Text></TouchableOpacity>
                  </View>
                  {suggestedFriends.map((u) => (
                    <View key={u.id} style={styles.listRow}>
                      <Image source={u.avatar} style={styles.listAvatar} />
                      <View style={{ flex: 1 }}>
                        <Text style={styles.listName}>{u.name}</Text>
                        <Text style={styles.listMeta}>HCP 17</Text>
                      </View>
                      {u.status === 'add' && (
                        <TouchableOpacity style={[styles.badge, styles.badgePrimary]} onPress={() => setSuggestedFriends(prev => prev.map(x => x.id===u.id ? { ...x, status: 'pending' } : x))}>
                          <Text style={[styles.badgeText, { color: '#fff' }]}>Add</Text>
                        </TouchableOpacity>
                      )}
                      {u.status === 'pending' && (
                        <View style={[styles.badge, styles.badgePending]}><Text style={[styles.badgeText, { color: '#8B5C2A' }]}>Pending</Text></View>
                      )}
                    </View>
                  ))}
                </View>
              </View>
            )}

            {activeTab === 'messages' && (
              <View style={{ paddingHorizontal: horizontalScale(12) }}>
                <Text style={styles.sectionTitle}>{isClub ? 'Chat' : 'Messages'}</Text>
                {conversations.map((c) => (
                  <TouchableOpacity key={c.id} style={styles.msgRow} activeOpacity={0.8} onPress={() => navigation.navigate('ChatThread', { conversation: { name: c.name, avatar: c.avatar } })}>
                    <Image source={c.avatar} style={styles.msgAvatar} />
                    <View style={{ flex: 1 }}>
                      <Text style={styles.name}>{c.name}</Text>
                      <Text style={styles.last}>{c.subtitle}</Text>
                    </View>
                    {c.unread ? (
                      <View style={styles.unreadBadge}><Text style={styles.unreadText}>{c.unread}</Text></View>
                    ) : (
                      <Text style={styles.time}>{c.time}</Text>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {isClub && activeTab === 'requests' && (
              <View style={{ paddingHorizontal: horizontalScale(12) }}>
                <Text style={styles.sectionTitle}>Member Requests</Text>
                {memberRequests.map((u) => (
                  <View key={u.id} style={styles.listRow}>
                    <Image source={u.avatar} style={styles.listAvatar} />
                    <View style={{ flex: 1 }}>
                      <Text style={styles.listName}>{u.name}</Text>
                      <Text style={styles.listMeta}>HCP {u.hcp}</Text>
                    </View>
                    <TouchableOpacity style={styles.circleApprove} onPress={() => { setClubMembers((m)=>[...m,{ id: `mb_${u.id}`, name: u.name, hcp: u.hcp, avatar: u.avatar }]); setMemberRequests((r)=>r.filter(x=>x.id!==u.id)); }}>
                      <Text style={styles.circleApproveTxt}>✓</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.circleDecline} onPress={() => setMemberRequests((r)=>r.filter(x=>x.id!==u.id))}>
                      <Text style={styles.circleDeclineTxt}>×</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}

            {isClub && activeTab === 'members' && (
              <View style={{ paddingHorizontal: horizontalScale(12) }}>
                <View style={styles.searchBar}><Text style={styles.searchPlaceholder}>Search Name</Text></View>
                <Text style={[styles.sectionTitle, { marginTop: verticalScale(10) }]}>Club Members</Text>
                {clubMembers.map((u) => (
                  <View key={u.id} style={styles.listRow}>
                    <Image source={u.avatar} style={styles.listAvatar} />
                    <View style={{ flex: 1 }}>
                      <Text style={styles.listName}>{u.name}</Text>
                      <Text style={styles.listMeta}>HCP {u.hcp}</Text>
                    </View>
                    <View style={[styles.badge, styles.badgePending]}><Text style={[styles.badgeText, { color: '#8B5C2A' }]}>Member</Text></View>
                    <TouchableOpacity style={styles.circleDecline} onPress={() => setConfirmRemove(u.id)}>
                      <Text style={styles.circleDeclineTxt}>×</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}
          </>
        )}
      />
      {confirmRemove && (
        <View style={styles.centerOverlay}>
          <View style={styles.confirmBox}>
            <Text style={styles.confirmText}>Are you sure you want to remove?</Text>
            <View style={styles.confirmRow}>
              <TouchableOpacity style={styles.confirmYes} onPress={() => { setClubMembers((m)=>m.filter(x=>x.id!==confirmRemove)); setConfirmRemove(null); }}><Text style={styles.confirmYesTxt}>Yes</Text></TouchableOpacity>
              <TouchableOpacity style={styles.confirmCancel} onPress={() => setConfirmRemove(null)}><Text style={styles.confirmCancelTxt}>Cancel</Text></TouchableOpacity>
            </View>
          </View>
        </View>
      )}
      <OverflowMenu
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
        onSelect={(route) => {
          if (['Map','Leaderboard','TrophyRoom','Settings'].includes(route)) {
            navigation?.navigate('Play', { screen: route });
          } else {
            navigation?.navigate(route);
          }
        }}
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
  rankBox: { marginLeft: 'auto', alignItems: 'flex-end' },
  rankText: { color: '#8B5C2A', fontWeight: '800', fontSize: moderateScale(20) },
  rankSub: { color: colors.textMute, fontSize: moderateScale(10) },
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
    justifyContent: 'center',
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
    width: horizontalScale(90),
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
  sectionTitle: { fontWeight: '700', color: '#1E2250', fontSize: moderateScale(14), marginBottom: verticalScale(8) },
  listRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: moderateScale(12), padding: horizontalScale(12), borderWidth: 1, borderColor: '#EFE7E1', marginBottom: verticalScale(10) },
  listAvatar: { width: moderateScale(44), height: moderateScale(44), borderRadius: moderateScale(22), marginRight: horizontalScale(12) },
  listName: { color: '#1E2250', fontWeight: '700', fontSize: moderateScale(14) },
  listMeta: { color: 'gray', fontSize: moderateScale(12), marginTop: 2 },
  badge: { paddingVertical: verticalScale(6), paddingHorizontal: horizontalScale(12), borderRadius: moderateScale(12) },
  badgePrimary: { backgroundColor: '#8B5C2A' },
  badgePending: { backgroundColor: '#EADBD0' },
  badgeText: { fontSize: moderateScale(12), fontWeight: '700' },
  circleApprove: { width: moderateScale(28), height: moderateScale(28), borderRadius: moderateScale(14), backgroundColor: '#8B5C2A', alignItems: 'center', justifyContent: 'center', marginLeft: horizontalScale(8) },
  circleApproveTxt: { color: '#fff', fontWeight: '800' },
  circleDecline: { width: moderateScale(28), height: moderateScale(28), borderRadius: moderateScale(14), backgroundColor: '#EADBD0', alignItems: 'center', justifyContent: 'center', marginLeft: horizontalScale(8) },
  circleDeclineTxt: { color: '#8B5C2A', fontWeight: '800' },

  msgRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: moderateScale(12), padding: horizontalScale(12), borderWidth: 1, borderColor: '#EFE7E1', marginBottom: verticalScale(10) },
  msgAvatar: { width: moderateScale(44), height: moderateScale(44), borderRadius: moderateScale(22), marginRight: horizontalScale(12) },
  name: { color: '#1E2250', fontWeight: '700', fontSize: moderateScale(14) },
  last: { color: colors.textMute, marginTop: 2, fontSize: moderateScale(12) },
  time: { color: colors.textMute, fontSize: moderateScale(11), marginLeft: horizontalScale(6) },
  unreadBadge: { minWidth: moderateScale(22), height: moderateScale(22), paddingHorizontal: horizontalScale(6), borderRadius: moderateScale(11), backgroundColor: '#8B5C2A', alignItems: 'center', justifyContent: 'center' },
  unreadText: { color: '#fff', fontSize: moderateScale(12), fontWeight: '700' },
  searchSmall: { width: moderateScale(28), height: moderateScale(28), borderRadius: moderateScale(6), alignItems: 'center', justifyContent: 'center', backgroundColor: '#EADBD0' },
  searchSmallText: { fontSize: moderateScale(14) },
  searchBar: { backgroundColor: '#F5F1ED', borderRadius: moderateScale(12), paddingVertical: verticalScale(12), paddingHorizontal: horizontalScale(12), borderWidth: 1, borderColor: '#EFE7E1' },
  searchPlaceholder: { color: colors.textMute },

  centerOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.2)' },
  confirmBox: { width: '80%', backgroundColor: '#fff', borderRadius: moderateScale(12), padding: horizontalScale(16), borderWidth: 1, borderColor: '#EFE7E1' },
  confirmText: { color: '#1E2250', marginBottom: verticalScale(12) },
  confirmRow: { flexDirection: 'row', justifyContent: 'space-between' },
  confirmYes: { backgroundColor: '#8B5C2A', paddingVertical: verticalScale(10), paddingHorizontal: horizontalScale(16), borderRadius: moderateScale(20) },
  confirmYesTxt: { color: '#fff', fontWeight: '700' },
  confirmCancel: { backgroundColor: '#F5F1ED', paddingVertical: verticalScale(10), paddingHorizontal: horizontalScale(16), borderRadius: moderateScale(20) },
  confirmCancelTxt: { color: '#1E2250', fontWeight: '700' },
});

export default ProfileHomeScreen;
