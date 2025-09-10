import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
} from 'react-native';
import { moderateScale } from '../../../utils/dimensions';
import PostCard from '../../../components/PostCard';
import { fetchFeed, likePost } from '../../../services/communityService';

// Temporary mock events – replace with API integration later
const mockEvents = [
  {
    id: '1',
    club: 'Steelwood Country Club',
    location: 'Location',
    date: '4 August, 2025',
    time: '12:00 PM',
    type: 'Stroke Play',
    joined: true,
    status: 'joined', // joined | live | upcoming | finished
  },
  {
    id: '2',
    club: 'Steelwood Country Club',
    location: 'Location',
    date: '4 August, 2025',
    time: '12:00 PM',
    type: 'Stroke Play',
    joined: false,
    status: 'upcoming',
  },
  {
    id: '3',
    club: 'Steelwood Country Club',
    location: 'Location',
    date: '4 August, 2025',
    time: '12:00 PM',
    type: 'Match Play',
    joined: false,
    status: 'upcoming',
  },
  {
    id: '4',
    club: 'Steelwood Country Club',
    location: 'Location',
    date: '4 August, 2025',
    time: '12:00 PM',
    type: 'Stroke Play',
    joined: false,
    status: 'active', // maybe user is playing
  },
  {
    id: '5',
    club: 'Steelwood Country Club',
    location: 'Location',
    date: '4 August, 2025',
    time: '12:00 PM',
    type: 'Stroke Play',
    joined: false,
    status: 'live',
  },
  {
    id: '6',
    club: 'Steelwood Country Club',
    location: 'Location',
    date: '4 August, 2025',
    time: '12:00 PM',
    type: 'Stroke Play',
    joined: false,
    status: 'live',
  },
];

const FILTERS = ['All', 'Match', 'Active', 'Upcoming', 'Finish'];

export default function CommunityHomeScreen({ navigation }) {
  const [segment, setSegment] = useState('feed');
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState(mockEvents);
  const [filter, setFilter] = useState('All');

  const loadFeed = useCallback(async () => {
    setLoading(true);
    const res = await fetchFeed();
    if (res.ok) setFeed(res.data);
    setLoading(false);
  }, []);

  useEffect(() => { loadFeed(); }, [loadFeed]);

  const onLike = async (id) => {
    const res = await likePost(id);
    if (res.ok) setFeed((prev) => prev.map((p) => (p.id === id ? res.data : p)));
  };

  const toggleJoin = (id) => {
    setEvents((prev) => prev.map((e) => (e.id === id ? { ...e, joined: !e.joined, status: !e.joined ? 'joined' : 'upcoming' } : e)));
  };

  const filteredEvents = events.filter((e) => {
    if (filter === 'All') return true;
    if (filter === 'Match') return e.type === 'Match Play';
    if (filter === 'Active') return e.status === 'active' || e.status === 'joined';
    if (filter === 'Upcoming') return e.status === 'upcoming';
    if (filter === 'Finish') return e.status === 'finished';
    return true;
  });

  const compositeFeed = useMemo(() => {
    // Mix demo cards to emulate Figma variety
    let items = [];
    feed.forEach((p, idx) => {
      items.push({ type: 'post', id: p.id, data: p });
      if (idx === 0 && events[0]) items.push({ type: 'inlineEventLive', id: 'inline-event-live', data: events[0] });
      if (idx === 1 && events[1]) items.push({ type: 'inlineEventView', id: 'inline-event-view', data: events[1] });
      if (idx === 2) items.push({ type: 'roundStats', id: 'round-stats' });
    });
    items.push({ type: 'leaderboard', id: 'leaderboard' });
    return items;
  }, [feed, events]);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.topHeader}>
        <View style={styles.profileRow}>
          <Image source={require('../../../../assets/man.png')} style={styles.avatar} />
          <View style={{ flex: 1 }}>
            <Text style={styles.greet}>Hey, Player 👋</Text>
            <Text style={styles.sub}>Choose your playground</Text>
          </View>
        </View>

        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconBtn}>
            <Image source={require('../../../../assets/bell.png')} style={styles.icon} />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <Image source={require('../../../../assets/dots-icon.png')} style={styles.iconDots} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.segmentContainer}>
        <View style={styles.segmentRow}>
          <TouchableOpacity onPress={() => setSegment('feed')} style={styles.segmentItem}>
            <Text style={[styles.segmentTxt, segment === 'feed' && styles.segmentTxtActive]}>News Feed</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSegment('event')} style={styles.segmentItem}>
            <Text style={[styles.segmentTxt, segment === 'event' && styles.segmentTxtActive]}>Event</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.segmentUnderline, segment === 'event' && styles.segmentUnderlineRight]} />
      </View>

      {segment === 'feed' ? (
        <FlatList
          data={compositeFeed}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.feedList}
          refreshControl={<RefreshControl refreshing={loading} onRefresh={loadFeed} />}
          renderItem={({ item }) => {
            if (item.type === 'post') {
              return (
                <PostCard
                  post={item.data}
                  onPress={() => navigation.navigate('PostDetail', { postId: item.data.id })}
                  onLike={() => onLike(item.data.id)}
                  onComment={() => navigation.navigate('PostDetail', { postId: item.data.id, focus: 'comment' })}
                />
              );
            }
            if (item.type === 'inlineEventLive') return <InlineEventCard event={item.data} mode="live" />;
            if (item.type === 'inlineEventView') return <InlineEventCard event={item.data} mode="view" />;
            if (item.type === 'roundStats') return <RoundStatsCard />;
            if (item.type === 'leaderboard') return <LeaderboardCard />;
            return null;
          }}
        />
      ) : (
        <View style={{ flex: 1 }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterBar}>
            {FILTERS.map((f) => (
              <TouchableOpacity key={f} onPress={() => setFilter(f)} style={[styles.filterCard, filter === f && styles.filterCardActive]}>
                <Text style={[styles.filterCardText, filter === f && styles.filterCardTextActive]}>{f}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <FlatList
            data={filteredEvents}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.eventList}
            renderItem={({ item }) => (
              <EventCard event={item} onToggleJoin={() => toggleJoin(item.id)} />
            )}
          />
        </View>
      )}

      {segment === 'feed' && (
        <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('ComposePost')}>
          <Text style={styles.fabTxt}>✎</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

function EventCard({ event, onToggleJoin }) {
  const statusBadge = () => {
    if (event.joined) return <View style={[styles.badge, styles.badgeJoined]}><Text style={styles.badgeTxt}>Joined</Text></View>;
    if (event.status === 'live') return <View style={[styles.badge, styles.badgeLive]}><Text style={styles.badgeTxtSmall}>﹙﹚</Text></View>;
    if (event.status === 'active') return <View style={[styles.badge, styles.badgeActive]}><Text style={styles.badgeTick}>✓</Text></View>;
    return null;
  };

  return (
    <View style={styles.eventCard}>
      {statusBadge()}
      <Text style={styles.club}>{event.club}</Text>
      <Text style={styles.location}>{event.location}</Text>
      <View style={styles.rowMeta}>
        <Text style={styles.metaDate}>{event.date}</Text>
        <Text style={styles.metaDot}>•</Text>
        <Text style={styles.metaTime}>{event.time}</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.typeRow}>
        <Text style={styles.typeTxt}>{event.type}</Text>
      </View>
      <View style={styles.btnRow}>
        <TouchableOpacity style={styles.smallBtn}><Text style={styles.smallBtnTxt}>Course View</Text></TouchableOpacity>
        <TouchableOpacity style={styles.smallBtn}><Text style={styles.smallBtnTxt}>Bracket</Text></TouchableOpacity>
        {!event.joined && event.status !== 'live' && (
          <TouchableOpacity onPress={onToggleJoin} style={styles.joinBtn}><Text style={styles.joinBtnTxt}>+ Join</Text></TouchableOpacity>
        )}
      </View>
    </View>
  );
}

function InlineEventCard({ event, mode }) {
  return (
    <View style={styles.inlineEventCard}>
      <Text style={styles.club}>{event.club}</Text>
      <Text style={styles.location}>{event.location}</Text>
      <View style={styles.rowMeta}>
        <Text style={styles.metaDate}>{event.date}</Text>
        <Text style={styles.metaDot}>•</Text>
        <Text style={styles.metaTime}>{event.time}</Text>
      </View>
      <View style={styles.playerList}>
        {[{ name: 'Nick Blake', score: '-11 (61)' }, { name: 'Jane Cooper', score: '-7 (65)' }, { name: 'Wade Warren', score: '-6 (66)' }].map((p, i) => (
          <View style={styles.playerRow} key={p.name}>
            <View style={[styles.rankCircle, i === 0 && styles.rankGold, i === 1 && styles.rankSilver, i === 2 && styles.rankBronze]}><Text style={styles.rankTxt}>{i + 1}</Text></View>
            <Text style={styles.playerName}>{p.name}</Text>
            <Text style={styles.playerScore}>{p.score}</Text>
          </View>
        ))}
      </View>
      <TouchableOpacity style={styles.inlineBtn}> 
        <Text style={styles.inlineBtnTxt}>{mode === 'live' ? 'Live Score' : 'View Score'}</Text>
      </TouchableOpacity>
    </View>
  );
}

function RoundStatsCard() {
  const stats = [
    { label: 'Score', value: 107 },
    { label: 'Putts', value: 38 },
    { label: 'GIR%', value: 6 },
    { label: 'FIR%', value: 29 },
  ];
  return (
    <View style={styles.roundStatsCard}>
      <View style={styles.statsHeaderRow}>
        <Text style={styles.club}>Nick Ribeiro</Text>
        <Text style={styles.statsSub}>Scorecard</Text>
      </View>
      <View style={styles.statsRowWrap}>
        {stats.map((s) => (
          <View style={styles.statItem} key={s.label}>
            <Text style={styles.statValue}>{s.value}</Text>
            <Text style={styles.statLabel}>{s.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function LeaderboardCard() {
  const players = [
    { name: 'Nick Blake', score: '-11 (61)' },
    { name: 'Dianne Russell', score: '-7 (65)' },
    { name: 'Annette Black', score: '-6 (66)' },
  ];
  return (
    <View style={styles.leaderboardCard}>
      <Text style={styles.club}>Nick Ribeiro</Text>
      <Text style={styles.location}>Club Name</Text>
      <View style={styles.playerList}>
        {players.map((p, i) => (
          <View style={styles.playerRow} key={p.name}>
            <View style={[styles.rankCircle, i === 0 && styles.rankGold, i === 1 && styles.rankSilver, i === 2 && styles.rankBronze]}><Text style={styles.rankTxt}>{i + 1}</Text></View>
            <Text style={styles.playerName}>{p.name}</Text>
            <Text style={styles.playerScore}>{p.score}</Text>
          </View>
        ))}
      </View>
      <TouchableOpacity style={styles.inlineBtn}> 
        <Text style={styles.inlineBtnTxt}>Leaderboard</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F5EDE8' },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(16),
    paddingTop: moderateScale(4),
    paddingBottom: moderateScale(8),
  },
  profileRow: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  avatar: { width: moderateScale(44), height: moderateScale(44), borderRadius: moderateScale(22), marginRight: moderateScale(12) },
  greet: { fontSize: moderateScale(16), fontWeight: '700', color: '#222' },
  sub: { fontSize: moderateScale(12), color: '#6E6E6E', marginTop: 2 },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  iconBtn: { width: moderateScale(34), height: moderateScale(34), borderRadius: moderateScale(17), backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', marginLeft: moderateScale(8), borderWidth: 1, borderColor: '#EFE7E1' },
  icon: { width: moderateScale(18), height: moderateScale(18), resizeMode: 'contain' },
  iconDots: { width: moderateScale(20), height: moderateScale(20), resizeMode: 'contain' },
  notificationDot: { position: 'absolute', top: 6, right: 6, width: 8, height: 8, borderRadius: 4, backgroundColor: '#E33', },
  segmentContainer: { paddingHorizontal: moderateScale(16), paddingTop: moderateScale(12), paddingBottom: moderateScale(8) },
  segmentRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  segmentItem: { flex: 1, alignItems: 'center', paddingVertical: moderateScale(8) },
  segmentTxt: { fontSize: moderateScale(16), fontWeight: '700', color: '#7A6A61' },
  segmentTxtActive: { color: '#1E2250' },
  segmentUnderline: { height: 2, backgroundColor: '#D7A66B', width: '50%', marginTop: moderateScale(8), borderRadius: 2 },
  segmentUnderlineRight: { marginLeft: '50%' },
  feedList: { padding: moderateScale(16), paddingBottom: moderateScale(120) },
  fab: { position: 'absolute', right: moderateScale(18), bottom: moderateScale(28), width: moderateScale(50), height: moderateScale(50), borderRadius: moderateScale(10), backgroundColor: '#8B5C2A', alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.15, shadowOffset: { width: 0, height: 4 }, shadowRadius: 8, elevation: 6 },
  fabTxt: { color: '#fff', fontSize: moderateScale(20), fontWeight: '700' },
  filterBar: { paddingVertical: moderateScale(12), paddingHorizontal: moderateScale(16) },
  filterCard: {
    width: moderateScale(80),
    height: moderateScale(100),
    borderRadius: moderateScale(12),
    backgroundColor: '#E9DFD9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: moderateScale(10),
  },
  filterCardActive: {
    backgroundColor: '#8B5C2A',
  },
  filterCardText: {
    color: '#7A6A61',
    fontWeight: '600',
    fontSize: moderateScale(14),
  },
  filterCardTextActive: {
    color: '#FFFFFF',
  },
  eventList: { paddingHorizontal: moderateScale(16), paddingBottom: moderateScale(40) },
  eventCard: { backgroundColor: '#FFFFFF', borderRadius: 14, padding: moderateScale(16), marginBottom: moderateScale(14), borderWidth: 1, borderColor: '#EFE7E1' },
  club: { fontSize: moderateScale(14), fontWeight: '700', color: '#222' },
  location: { fontSize: moderateScale(12), color: '#6E6E6E', marginTop: 2 },
  rowMeta: { flexDirection: 'row', alignItems: 'center', marginTop: moderateScale(10) },
  metaDate: { fontSize: moderateScale(11), color: '#5A5A5A' },
  metaDot: { marginHorizontal: 6, color: '#5A5A5A' },
  metaTime: { fontSize: moderateScale(11), color: '#5A5A5A' },
  divider: { height: 1, backgroundColor: '#EFE7E1', marginVertical: moderateScale(12) },
  typeRow: { flexDirection: 'row', alignItems: 'center' },
  typeTxt: { fontSize: moderateScale(16), fontWeight: '700', color: '#8B5C2A' },
  btnRow: { flexDirection: 'row', marginTop: moderateScale(14), alignItems: 'center' },
  smallBtn: { backgroundColor: '#E9DFD9', paddingVertical: 8, paddingHorizontal: 14, borderRadius: 10, marginRight: 12 },
  smallBtnTxt: { fontSize: moderateScale(12), fontWeight: '600', color: '#8B5C2A' },
  joinBtn: { marginLeft: 'auto', backgroundColor: '#8B5C2A', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 10 },
  joinBtnTxt: { color: '#FFFFFF', fontSize: moderateScale(12), fontWeight: '600' },
  badge: { position: 'absolute', top: 10, right: 10, paddingVertical: 4, paddingHorizontal: 10, borderRadius: 20, zIndex: 2 },
  badgeJoined: { backgroundColor: '#E9DFD9' },
  badgeLive: { backgroundColor: '#E9DFD9' },
  badgeActive: { backgroundColor: '#E9DFD9' },
  badgeTxt: { fontSize: moderateScale(11), fontWeight: '600', color: '#8B5C2A' },
  badgeTxtSmall: { fontSize: moderateScale(12), fontWeight: '600', color: '#8B5C2A' },
  badgeTick: { fontSize: moderateScale(14), fontWeight: '700', color: '#8B5C2A' },
  inlineEventCard: { backgroundColor: '#fff', borderRadius: 14, padding: moderateScale(14), borderWidth: 1, borderColor: '#EFE7E1', marginBottom: moderateScale(14) },
  playerList: { marginTop: moderateScale(12) },
  playerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  rankCircle: { width: 26, height: 26, borderRadius: 13, backgroundColor: '#E9DFD9', alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  rankGold: { backgroundColor: '#D9B24A33' },
  rankSilver: { backgroundColor: '#C0C0C033' },
  rankBronze: { backgroundColor: '#CD7F3233' },
  rankTxt: { fontSize: 12, fontWeight: '700', color: '#8B5C2A' },
  playerName: { flex: 1, fontSize: 12, fontWeight: '600', color: '#222' },
  playerScore: { fontSize: 12, fontWeight: '600', color: '#222' },
  inlineBtn: { marginTop: moderateScale(10), backgroundColor: '#F5EDE8', paddingVertical: 10, borderRadius: 10, alignItems: 'center' },
  inlineBtnTxt: { color: '#8B5C2A', fontWeight: '600', fontSize: 12 },
  roundStatsCard: { backgroundColor: '#fff', borderRadius: 14, padding: moderateScale(14), borderWidth: 1, borderColor: '#EFE7E1', marginBottom: moderateScale(14) },
  statsHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: moderateScale(12) },
  statsSub: { fontSize: 12, fontWeight: '600', color: '#6E6E6E' },
  statsRowWrap: { flexDirection: 'row', justifyContent: 'space-between' },
  statItem: { alignItems: 'center', flex: 1 },
  statValue: { fontSize: 16, fontWeight: '700', color: '#222' },
  statLabel: { marginTop: 4, fontSize: 11, color: '#6E6E6E' },
  leaderboardCard: { backgroundColor: '#fff', borderRadius: 14, padding: moderateScale(14), borderWidth: 1, borderColor: '#EFE7E1', marginBottom: moderateScale(14) },
});
