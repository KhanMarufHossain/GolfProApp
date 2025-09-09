import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { horizontalScale, verticalScale, moderateScale } from '../../utils/dimensions';

export default function ScoreCardScreen({ route, navigation }) {
  // Backend-ready: accept round data from params, fall back to local mock
  const mockRound = useMemo(() => ({
    date: new Date(),
    course: { name: 'East Potomac Golf Course', location: 'Location' },
    rating: '6.8/7111',
    players: [
      { id: 'p1', name: 'CH N/A', avatar: require('../../../assets/man.png') },
      { id: 'p2', name: 'CH N/A', avatar: require('../../../assets/man.png') },
    ],
    holes: [1, 1, 1], // visual-only as per Figma frame
    par: [4, 4, 4],
    handicap: [16, 16, 16],
    strokes: [5, 5, 5],
  }), []);

  const round = route?.params?.round || mockRound;

  const dateLabel = useMemo(() => {
    const d = round.date ? new Date(round.date) : new Date();
    return d.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
  }, [round.date]);

  const [activeTab, setActiveTab] = useState('Scores');

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
          <Text style={styles.backTxt}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Score Card</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.metaRow}>
          <View style={styles.metaCol}>
            <Text style={styles.metaDate}>{dateLabel}</Text>
            <Text style={styles.metaCourse}>{round?.course?.name || 'Golf Course'}</Text>
            <Text style={styles.metaLocation}>{round?.course?.location || 'Location'}</Text>
            <Text style={styles.metaRating}>{round?.rating || 'Rating/Slope'}</Text>
          </View>
          <View style={styles.grossNetBox}>
            <Text style={styles.gnTitle}>Gross/Net</Text>
            <Text style={styles.gnValue}>0/0</Text>
          </View>
        </View>

        <View style={styles.legendWrap}>
          <View style={styles.legendHeader}><Text style={styles.legendHeaderTxt}>Score Legend</Text></View>
          <View style={styles.legendBody}>
            {[
              { k: 'Ace' }, { k: 'Eagle' }, { k: 'Birdie' }, { k: 'Par' }, { k: 'Bogey' }, { k: 'D. Bogey' },
            ].map((it, idx) => (
              <View key={`legend-${idx}`} style={styles.legendItem}>
                <View style={styles.legendBadge}><Text style={styles.legendBadgeTxt}>2</Text></View>
                <Text style={styles.legendLabel}>{it.k}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.tabsWrap}>
          <View style={styles.tabsBg}>
            <TouchableOpacity onPress={() => setActiveTab('Scores')} style={[styles.tabBtn, activeTab === 'Scores' && styles.tabActive]}>
              <Text style={[styles.tabTxt, activeTab === 'Scores' && styles.tabTxtActive]}>Scores</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActiveTab('Stats')} style={[styles.tabBtn, activeTab === 'Stats' && styles.tabActive]}>
              <Text style={[styles.tabTxt, activeTab === 'Stats' && styles.tabTxtActive]}>Stats</Text>
            </TouchableOpacity>
          </View>
        </View>

        {activeTab === 'Scores' ? (
          <View style={styles.table}>
            {/* Header Row */}
            <View style={[styles.tr, styles.trHeader]}>
              <View style={[styles.tdHole, styles.cellHeader]}><Text style={styles.thTxt}>Hole</Text></View>
              {round.holes?.map((h, i) => (
                <View key={`h-${i}`} style={[styles.td, styles.cellHeader]}><Text style={styles.thTxt}>{h}</Text></View>
              ))}
              <View style={[styles.td, styles.cellHeader]}><Text style={styles.thTxt}>OUT</Text></View>
              <View style={[styles.td, styles.cellHeader]}><Text style={styles.thTxt}>1</Text></View>
              <View style={[styles.tdTotal, styles.cellHeader]}><Text style={styles.thTxt}>Total</Text></View>
            </View>

            {/* Par */}
            <View style={styles.tr}> 
              <View style={[styles.tdHole, styles.cellMuted]}><Text style={styles.cellMutedTxt}>Par</Text></View>
              {round.par?.map((v, i) => (
                <View key={`par-${i}`} style={[styles.td]}><Text style={styles.tdTxt}>{v}</Text></View>
              ))}
              <View style={[styles.td]}><Text style={styles.tdTxt}>4</Text></View>
              <View style={[styles.td]}><Text style={styles.tdTxt}>4</Text></View>
              <View style={[styles.tdTotal]}><Text style={styles.tdTxt}>36</Text></View>
            </View>

            {/* Handicap */}
            <View style={styles.tr}> 
              <View style={[styles.tdHole, styles.cellMuted]}><Text style={styles.cellMutedTxt}>Handicap</Text></View>
              {round.handicap?.map((v, i) => (
                <View key={`hcp-${i}`} style={[styles.td]}><Text style={styles.tdTxt}>{v}</Text></View>
              ))}
              <View style={[styles.td]}><Text style={styles.tdTxt}>16</Text></View>
              <View style={[styles.td]}><Text style={styles.tdTxt}>16</Text></View>
              <View style={[styles.tdTotal]}><Text style={styles.tdTxt}>36</Text></View>
            </View>

            {/* Strokes */}
            <View style={styles.tr}> 
              <View style={[styles.tdHole, styles.cellMuted]}><Text style={styles.cellMutedTxt}>Strokes</Text></View>
              {round.strokes?.map((v, i) => (
                <View key={`st-${i}`} style={[styles.td]}><Text style={styles.tdTxt}>{v}</Text></View>
              ))}
              <View style={[styles.td]}><Text style={styles.tdTxt}>5</Text></View>
              <View style={[styles.td]}><Text style={styles.tdTxt}>5</Text></View>
              <View style={[styles.tdTotal]}><Text style={styles.tdTxt}>5</Text></View>
            </View>

            {/* Player Rows */}
            {round.players?.map((p, idx) => (
              <View key={`pl-${p.id || idx}`} style={styles.playerSection}>
                {/* side labels */}
                <View style={styles.sideLabelWrap}>
                  <Text style={styles.sideLabel}>{idx === 0 ? 'Gross' : idx === 1 ? 'Net' : ''}</Text>
                </View>
                <View style={styles.playerRowHeader}>
                  <Image source={p.avatar} style={styles.playerAvatar} />
                  <View style={{ marginLeft: 8 }}>
                    <Text style={styles.playerTitle}>Player Name</Text>
                    <Text style={styles.playerName}>{p.name}</Text>
                  </View>
                </View>
                {/* one score highlight box matching the Figma sample */}
                <View style={styles.inlineCells}>
                  <View style={[styles.inlineCell, styles.inlineCellEmph]}>
                    <Text style={styles.inlineCellTxt}>2</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <View style={{ paddingVertical: 40, alignItems: 'center' }}>
            <Text style={{ color: '#8B5C2A' }}>Stats tab coming soon</Text>
          </View>
        )}
      </ScrollView>

      {/* Bottom actions */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.bottomIcon}>
          <Image source={require('../../../assets/settings-icon.png')} style={{ width: 22, height: 22 }} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.finishBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.finishTxt}>Finish Round</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomIcon}>
          <Image source={require('../../../assets/dots-icon.png')} style={{ width: 22, height: 22 }} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: horizontalScale(16), paddingTop: verticalScale(4) },
  back: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  backTxt: { fontSize: 20, color: '#333' },
  title: { flex: 1, textAlign: 'center', fontWeight: '700', fontSize: 18, marginRight: 36, color: '#222' },

  content: { paddingBottom: verticalScale(120) },
  metaRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: horizontalScale(16), marginTop: verticalScale(8) },
  metaCol: {},
  metaDate: { color: '#6E6E6E', marginBottom: 4 },
  metaCourse: { fontWeight: '700', color: '#222' },
  metaLocation: { color: '#999', marginTop: 2 },
  metaRating: { color: '#8B5C2A', marginTop: 2 },
  grossNetBox: { backgroundColor: '#F1E7DF', borderRadius: 14, paddingHorizontal: 18, paddingVertical: 12, alignItems: 'center' },
  gnTitle: { color: '#6E6E6E', marginBottom: 6 },
  gnValue: { fontWeight: '700', fontSize: 20, color: '#222' },

  legendWrap: { marginTop: verticalScale(16), marginHorizontal: horizontalScale(16), backgroundColor: '#E5D2C2', borderRadius: 12, padding: 6 },
  legendHeader: { backgroundColor: '#C9A88E', borderRadius: 10, paddingVertical: 8, alignItems: 'center', margin: 8 },
  legendHeaderTxt: { color: '#fff', fontWeight: '700' },
  legendBody: { flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap', paddingBottom: 8 },
  legendItem: { alignItems: 'center', marginHorizontal: 6, marginVertical: 6 },
  legendBadge: { width: 28, height: 28, borderRadius: 6, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#C9A88E' },
  legendBadgeTxt: { fontWeight: '700', color: '#8B5C2A' },
  legendLabel: { color: '#8B5C2A', marginTop: 4, fontSize: 12 },

  tabsWrap: { paddingHorizontal: horizontalScale(16), marginTop: verticalScale(14) },
  tabsBg: { flexDirection: 'row', backgroundColor: '#D8C3B2', borderRadius: 14, padding: 4 },
  tabBtn: { flex: 1, height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  tabActive: { backgroundColor: '#fff' },
  tabTxt: { color: '#6E6E6E', fontWeight: '600' },
  tabTxtActive: { color: '#8B5C2A', fontWeight: '700' },

  table: { marginTop: verticalScale(14), marginHorizontal: horizontalScale(16), borderRadius: 10, overflow: 'hidden', borderWidth: 1, borderColor: '#E5D2C2' },
  tr: { flexDirection: 'row', alignItems: 'stretch' },
  trHeader: { backgroundColor: '#E5D2C2' },
  tdHole: { width: 74, paddingVertical: 10, paddingHorizontal: 10, backgroundColor: '#F6EFE9', borderRightWidth: 1, borderColor: '#E5D2C2' },
  td: { width: 42, paddingVertical: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F6EFE9', borderRightWidth: 1, borderColor: '#E5D2C2' },
  tdTotal: { flex: 1, paddingVertical: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F6EFE9' },
  cellHeader: { alignItems: 'center', justifyContent: 'center' },
  thTxt: { fontWeight: '700', color: '#222' },
  tdTxt: { color: '#222' },
  cellMuted: { backgroundColor: '#EFE5DD' },
  cellMutedTxt: { color: '#6E6E6E', fontWeight: '600' },

  playerSection: { borderTopWidth: 1, borderColor: '#E5D2C2', backgroundColor: '#fff', paddingBottom: 8 },
  sideLabelWrap: { position: 'absolute', left: -22, top: 36, transform: [{ rotate: '-90deg' }], width: 60, alignItems: 'center' },
  sideLabel: { color: '#6E6E6E', fontSize: 12 },
  playerRowHeader: { flexDirection: 'row', alignItems: 'center', padding: 10 },
  playerAvatar: { width: 36, height: 36, borderRadius: 18 },
  playerTitle: { color: '#6E6E6E', fontSize: 12 },
  playerName: { color: '#222', fontWeight: '700' },
  inlineCells: { paddingHorizontal: 10 },
  inlineCell: { width: 36, height: 36, borderRadius: 6, borderWidth: 1, borderColor: '#C9A88E', alignItems: 'center', justifyContent: 'center' },
  inlineCellEmph: { backgroundColor: '#fff' },
  inlineCellTxt: { color: '#8B5C2A', fontWeight: '700' },

  bottomBar: { position: 'absolute', left: 0, right: 0, bottom: 10, paddingHorizontal: horizontalScale(16), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  bottomIcon: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#EFE5DD', alignItems: 'center', justifyContent: 'center' },
  finishBtn: { flex: 1, marginHorizontal: 12, height: 44, borderRadius: 22, backgroundColor: '#8B5C2A', alignItems: 'center', justifyContent: 'center' },
  finishTxt: { color: '#fff', fontWeight: '700' },
});
