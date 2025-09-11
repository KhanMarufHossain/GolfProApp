import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, SafeAreaView } from 'react-native';
import { colors, radius } from '../../utils/theme';
import { horizontalScale as hs, verticalScale as vs, moderateScale as ms } from '../../utils/dimensions';

const DATA = [
  { id: 'p1', name: 'Nick Blake', avatar: require('../../../assets/man.png'), rel: 'global', club: 'Kansas GC', delta: -11, gross: 61 },
  { id: 'p2', name: 'Dianne Russell', avatar: require('../../../assets/man.png'), rel: 'global', club: 'Kansas GC', delta: -7, gross: 65 },
  { id: 'p3', name: 'Annette Black', avatar: require('../../../assets/man.png'), rel: 'club', club: 'Kansas GC', delta: -6, gross: 66 },
  { id: 'p4', name: 'Jane Cooper', avatar: require('../../../assets/man.png'), rel: 'friends', club: 'Pine Valley', delta: -5, gross: 67 },
  { id: 'p5', name: 'Jacob Jones', avatar: require('../../../assets/man.png'), rel: 'global', club: 'Pine Valley', delta: -4, gross: 68 },
  { id: 'p6', name: 'Ralph Edwards', avatar: require('../../../assets/man.png'), rel: 'club', club: 'Pine Valley', delta: -3, gross: 69 },
  { id: 'p7', name: 'Cody Fisher', avatar: require('../../../assets/man.png'), rel: 'friends', club: 'Kansas GC', delta: -2, gross: 70 },
  { id: 'p8', name: 'Eleanor Pena', avatar: require('../../../assets/man.png'), rel: 'global', club: 'Kansas GC', delta: -1, gross: 71 },
];

export default function LeaderboardScreen({ navigation }) {
  const [tab, setTab] = useState('global');
  const [period, setPeriod] = useState('today');

  const items = useMemo(() => DATA.filter((x) => x.rel === tab).sort((a, b) => a.delta - b.delta), [tab]);
  const podium = items.slice(0, 3);
  const rest = items.slice(3);

  const Chip = ({ label, active, onPress }) => (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={[styles.chip, active && styles.chipActive]}>
      <Text style={[styles.chipTxt, active && styles.chipTxtActive]}>{label}</Text>
    </TouchableOpacity>
  );

  const Tier = ({ t }) => {
    const bg = t === 1 ? '#FFD700' : t === 2 ? '#C0C0C0' : '#CD7F32';
    return (
      <View style={[styles.tierBadge, { backgroundColor: bg }]}>
        <Text style={styles.tierText}>{`T${t}`}</Text>
      </View>
    );
  };

  const PodiumCard = ({ rank, p }) => (
    <View style={[styles.podiumCard, rank === 1 && styles.podiumFirst]}>
      <Tier t={rank} />
      <Image source={p.avatar} style={styles.podiumAvatar} />
      <Text style={styles.podiumName} numberOfLines={1}>{p.name}</Text>
      <Text style={styles.podiumScore}>{`${p.delta > 0 ? '+' : ''}${p.delta} (${p.gross})`}</Text>
    </View>
  );

  const Row = ({ idx, p }) => (
    <View style={styles.row}>
      <View style={styles.rowLeft}>
        <View style={styles.rank}><Text style={styles.rankTxt}>{idx}</Text></View>
        <Image source={p.avatar} style={styles.avatar} />
        <View>
          <Text style={styles.name}>{p.name}</Text>
          <Text style={styles.sub}>{p.club}</Text>
        </View>
      </View>
      <Text style={styles.score}>{`${p.delta > 0 ? '+' : ''}${p.delta} (${p.gross})`}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}><Text style={styles.backTxt}>{'<'}</Text></TouchableOpacity>
        <Text style={styles.headerTitle}>Leaderboard</Text>
        <View style={{ width: ms(36) }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Tabs */}
        <View style={styles.tabs}>
          <Chip label="Global" active={tab === 'global'} onPress={() => setTab('global')} />
          <Chip label="Club" active={tab === 'club'} onPress={() => setTab('club')} />
          <Chip label="Friends" active={tab === 'friends'} onPress={() => setTab('friends')} />
        </View>

        {/* Period */}
        <View style={styles.filters}>
          <Chip label="Today" active={period === 'today'} onPress={() => setPeriod('today')} />
          <Chip label="Week" active={period === 'week'} onPress={() => setPeriod('week')} />
          <Chip label="Month" active={period === 'month'} onPress={() => setPeriod('month')} />
          <Chip label="All" active={period === 'all'} onPress={() => setPeriod('all')} />
        </View>

        {/* Podium */}
        <View style={styles.podiumRow}>
          {podium.map((p, i) => (
            <PodiumCard key={p.id} rank={i + 1} p={p} />
          ))}
        </View>

        {/* List */}
        <View style={styles.list}>
          {rest.map((p, i) => (
            <Row key={p.id} idx={i + 4} p={p} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  header: { height: vs(56), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: hs(16), backgroundColor: colors.surface, borderBottomWidth: 1, borderBottomColor: colors.border },
  backBtn: { width: ms(36), height: ms(36), alignItems: 'center', justifyContent: 'center', borderRadius: ms(18), backgroundColor: '#F3E3D6' },
  backTxt: { fontSize: ms(18), color: colors.accent, fontWeight: '800' },
  headerTitle: { fontSize: ms(18), fontWeight: '700', color: colors.text },
  content: { padding: hs(16), paddingBottom: vs(30) },

  tabs: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: vs(12) },
  filters: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: vs(12) },
  chip: { flex: 1, marginHorizontal: hs(4), paddingVertical: vs(10), borderRadius: radius.lg, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, alignItems: 'center' },
  chipActive: { backgroundColor: colors.accent },
  chipTxt: { color: colors.text, fontWeight: '700' },
  chipTxtActive: { color: '#fff' },

  podiumRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: vs(12) },
  podiumCard: { flex: 1, marginHorizontal: hs(4), backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, alignItems: 'center', paddingVertical: vs(16) },
  podiumFirst: { borderColor: '#FFD700' },
  tierBadge: { width: ms(28), height: ms(28), borderRadius: ms(14), alignItems: 'center', justifyContent: 'center', marginBottom: vs(10) },
  tierText: { fontSize: ms(12), fontWeight: '800', color: '#1E2250' },
  podiumAvatar: { width: ms(44), height: ms(44), borderRadius: ms(22), marginBottom: vs(8) },
  podiumName: { color: colors.text, fontWeight: '700', fontSize: ms(13), marginBottom: 2 },
  podiumScore: { color: colors.textMute, fontWeight: '700' },

  list: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: hs(16), paddingVertical: vs(12), borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border },
  rowLeft: { flexDirection: 'row', alignItems: 'center' },
  rank: { width: ms(24), height: ms(24), borderRadius: ms(12), backgroundColor: '#E6E6E6', alignItems: 'center', justifyContent: 'center', marginRight: hs(10) },
  rankTxt: { fontWeight: '800', color: '#2A2A2A' },
  avatar: { width: ms(30), height: ms(30), borderRadius: ms(15), marginRight: hs(10) },
  name: { color: colors.text, fontWeight: '700' },
  sub: { color: colors.textMute, fontSize: ms(12) },
  score: { color: colors.text, fontWeight: '800' },
});
