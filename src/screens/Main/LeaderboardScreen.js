import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { colors } from '../../utils/theme';
import { horizontalScale, verticalScale, moderateScale } from '../../utils/dimensions';

const players = [
  { id: 'p1', name: 'Nick Blake', avatar: require('../../../assets/man.png'), score: '-11 (61)', tier: 'T1' },
  { id: 'p2', name: 'Dianne Russell', avatar: require('../../../assets/man.png'), score: '-7 (65)', tier: 'T2' },
  { id: 'p3', name: 'Annette Black', avatar: require('../../../assets/man.png'), score: '-6 (66)', tier: 'T3' },
  { id: 'p4', name: 'Jane Cooper', avatar: require('../../../assets/man.png'), score: '-5 (67)', tier: 'T4' },
];

export default function LeaderboardScreen({ navigation }) {
  const TierBadge = ({ tier }) => {
    const bg = tier === 'T1' ? '#FFD700' : tier === 'T2' ? '#C0C0C0' : tier === 'T3' ? '#CD7F32' : '#E6E6E6';
    return (
      <View style={[styles.tierBadge, { backgroundColor: bg }]}>
        <Text style={styles.tierText}>{tier}</Text>
      </View>
    );
  };

  const Row = ({ p }) => (
    <View style={styles.row}>
      <View style={styles.rowLeft}>
        <TierBadge tier={p.tier} />
        <Image source={p.avatar} style={styles.avatar} />
        <Text style={styles.name}>{p.name}</Text>
      </View>
      <Text style={styles.score}>{p.score}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation && navigation.goBack && navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backTxt}>{'←'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Leaderboard</Text>
        <View style={{ width: moderateScale(36) }} />
      </View>

      <View style={styles.card}>
        {players.map((p) => (
          <Row key={p.id} p={p} />
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
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
  backBtn: {
    width: moderateScale(36),
    height: moderateScale(36),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(18),
    backgroundColor: '#F3E3D6',
  },
  backTxt: { fontSize: moderateScale(18), color: colors.accent, fontWeight: '800' },
  headerTitle: { fontSize: moderateScale(18), fontWeight: '700', color: colors.text },

  card: {
    backgroundColor: colors.surface,
    margin: horizontalScale(16),
    borderRadius: moderateScale(14),
    paddingVertical: verticalScale(6),
    borderWidth: 1,
    borderColor: colors.border,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(12),
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  rowLeft: { flexDirection: 'row', alignItems: 'center' },
  tierBadge: {
    width: moderateScale(24),
    height: moderateScale(24),
    borderRadius: moderateScale(12),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: horizontalScale(10),
  },
  tierText: { fontSize: moderateScale(10), fontWeight: '800', color: '#2A2A2A' },
  avatar: { width: moderateScale(30), height: moderateScale(30), borderRadius: moderateScale(15), marginRight: horizontalScale(10) },
  name: { color: colors.text, fontWeight: '600', fontSize: moderateScale(14) },
  score: { color: colors.text, fontWeight: '700', fontSize: moderateScale(14) },
});
