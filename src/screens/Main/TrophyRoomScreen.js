import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { horizontalScale as hs, verticalScale as vs, moderateScale as ms } from '../../utils/dimensions';
import { colors, radius } from '../../utils/theme';

export default function TrophyRoomScreen({ navigation }) {
  const trophies = useMemo(() => ([
    { id: 't1', label: 'Ace', icon: '🏆', count: 2 },
    { id: 't2', label: 'Eagle', icon: '🦅', count: 5 },
    { id: 't3', label: 'Birdie', icon: '🐦', count: 12 },
    { id: 't4', label: 'Par', icon: '⛳', count: 20 },
    { id: 't5', label: 'Bogey', icon: '🥇', count: 8 },
    { id: 't6', label: 'D. Bogey', icon: '🥈', count: 4 },
    { id: 't7', label: 'Fairway Hit', icon: '✅', count: 32 },
    { id: 't8', label: 'GIR', icon: '📈', count: 14 },
    { id: 't9', label: 'Sand Save', icon: '🏖️', count: 3 },
    { id: 't10', label: 'Best Round', icon: '⭐', count: 1 },
  ]), []);

  const openScoreCard = () => navigation.navigate('ScoreCard');

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backIcon}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Trophy Room</Text>
        <View style={{ width: hs(40) }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile strip */}
        <View style={styles.profileStrip}>
          <Image source={require('../../../assets/man.png')} style={styles.profileAvatar} />
          <View style={{ marginLeft: hs(10) }}>
            <Text style={styles.profileName}>Nick Ribeiro</Text>
            <Text style={styles.profileMeta}>Kansas US</Text>
          </View>
          <View style={styles.badgeT1}><Text style={styles.badgeT1Txt}>T1</Text></View>
        </View>

        {/* Counters row (sample) */}
        <View style={styles.countersRow}>
          {[
            { k: '#HP', v: '18.5' },
            { k: 'Friends', v: '1254' },
            { k: 'Club Members', v: '1254' },
            { k: 'Course Played', v: '1254' },
          ].map((it, idx) => (
            <View key={`ctr-${idx}`} style={styles.counterPill}>
              <Text style={styles.counterK}>{it.k}</Text>
              <Text style={styles.counterV}>{it.v}</Text>
            </View>
          ))}
        </View>

        {/* Trophies grid */}
        <Text style={styles.sectionTitle}>Badges</Text>
        <View style={styles.grid}>
          {trophies.map((t) => (
            <TouchableOpacity key={t.id} style={styles.tile} activeOpacity={0.8} onPress={openScoreCard}>
              <View style={styles.tileIconWrap}>
                <Text style={styles.tileIcon}>{t.icon}</Text>
                <View style={styles.countBadge}><Text style={styles.countBadgeTxt}>{t.count}</Text></View>
              </View>
              <Text style={styles.tileLabel}>{t.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recent Rounds (simple sample list -> also navigates to ScoreCard) */}
        <Text style={[styles.sectionTitle, { marginTop: vs(16) }]}>Recent Rounds</Text>
        {[1,2,3].map((i) => (
          <TouchableOpacity key={`rr-${i}`} style={styles.roundRow} onPress={openScoreCard}>
            <View style={styles.roundThumb} />
            <View style={{ flex: 1 }}>
              <Text style={styles.roundTitle}>East Potomac Golf Course</Text>
              <Text style={styles.roundMeta}>12 Jul 2025 • Rating/Slope</Text>
            </View>
            <Text style={styles.roundArrow}>›</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  header: {
    height: vs(56), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: hs(16), backgroundColor: colors.surface, borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  backBtn: { width: ms(40), height: ms(40), alignItems: 'center', justifyContent: 'center' },
  backIcon: { fontSize: ms(18), color: colors.text },
  headerTitle: { fontSize: ms(18), fontWeight: '700', color: colors.text },

  content: { padding: hs(16), paddingBottom: vs(30) },

  profileStrip: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface,
    borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, padding: hs(12),
  },
  profileAvatar: { width: ms(44), height: ms(44), borderRadius: ms(22) },
  profileName: { color: colors.text, fontWeight: '700', fontSize: ms(14) },
  profileMeta: { color: colors.textMute, fontSize: ms(12) },
  badgeT1: { marginLeft: 'auto', backgroundColor: '#FFD700', borderRadius: ms(14), paddingVertical: 4, paddingHorizontal: 10 },
  badgeT1Txt: { fontWeight: '700', color: '#1E2250' },

  countersRow: { flexDirection: 'row', marginTop: vs(12) },
  counterPill: { flex: 1, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radius.lg, paddingVertical: vs(10), alignItems: 'center', marginRight: hs(6) },
  counterK: { color: colors.textMute, fontSize: ms(12), marginBottom: 2, fontWeight: '600' },
  counterV: { color: colors.text, fontWeight: '700' },

  sectionTitle: { marginTop: vs(16), marginBottom: vs(8), color: colors.text, fontWeight: '700', fontSize: ms(14) },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  tile: { width: '32%', marginBottom: vs(12), backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, alignItems: 'center', paddingVertical: vs(12) },
  tileIconWrap: { width: ms(48), height: ms(48), borderRadius: ms(24), backgroundColor: '#F6EFEA', alignItems: 'center', justifyContent: 'center', marginBottom: vs(8), position: 'relative' },
  tileIcon: { fontSize: ms(22) },
  countBadge: { position: 'absolute', right: -6, top: -6, backgroundColor: '#8B5C2A', borderRadius: 10, paddingHorizontal: 6, paddingVertical: 2 },
  countBadgeTxt: { color: '#fff', fontWeight: '700', fontSize: ms(10) },
  tileLabel: { color: colors.text, fontSize: ms(12), fontWeight: '600' },

  roundRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, padding: hs(12), marginBottom: vs(10) },
  roundThumb: { width: ms(44), height: ms(44), borderRadius: ms(8), backgroundColor: '#D8D1CB', marginRight: hs(12) },
  roundTitle: { color: colors.text, fontWeight: '700', fontSize: ms(14) },
  roundMeta: { color: colors.textMute, fontSize: ms(12), marginTop: 2 },
  roundArrow: { fontSize: ms(20), color: colors.textMute, marginLeft: hs(8) },
});
