import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, SafeAreaView, Modal } from 'react-native';
import { colors, radius } from '../../utils/theme';
import { horizontalScale as hs, verticalScale as vs, moderateScale as ms, verticalScale } from '../../utils/dimensions';
import OverflowMenu from '../../components/OverflowMenu';

const PLAYERS = [
  { id: 'p1', name: 'Nick Blake', club: 'Club Name', avatar: require('../../../assets/man.png'), delta: -11, gross: 61, hcp: 9.7, putts: 35, gir: 35 },
  { id: 'p2', name: 'Dianne Russell', club: 'Club Name', avatar: require('../../../assets/man.png'), delta: -7, gross: 65, hcp: 7.8, putts: 31, gir: 42 },
  { id: 'p3', name: 'Annette Black', club: 'Club Name', avatar: require('../../../assets/man.png'), delta: -6, gross: 66, hcp: 8.4, putts: 33, gir: 39 },
  { id: 'p4', name: 'Esther Howard', club: 'Club Name', avatar: require('../../../assets/man.png'), delta: -6, gross: 66, hcp: 9.7, putts: 36, gir: 31 },
];

const CARDS = [
  { id: 'c1', title: 'Nick Ribeiro', subtitle: 'Club Name', date: '4 August, 2025', time: '12:00 PM', top3: ['p1','p2','p3'] },
  { id: 'c2', title: 'Steelwood Country Club', subtitle: 'Location', date: '4 August, 2025', time: '12:00 PM', top3: ['p1','p3','p4'], ticked: true },
];

const FILTERS = {
  country: ['None','USA • Kansas','USA • Florida'],
  clubs: ['None','Club Name','Pine Valley'],
  events: ['None','Event name'],
  relation: ['Friends'],
  month: ['January','February','March','April','May','June','July','August','September','October','November','December'],
  year: ['2023','2024','2025'],
};

export default function LeaderboardScreen({ navigation }) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [shareCard, setShareCard] = useState(null);
  const [showMetrics, setShowMetrics] = useState(false);

  const [sel, setSel] = useState({ country: 'Country & State', clubs: 'Clubs', events: 'Events', relation: 'Friends', month: 'Month', year: 'Year' });
  const [dropdown, setDropdown] = useState(null); // { key: 'country', options: [...] }

  const openDD = (key) => setDropdown({ key, options: FILTERS[key] });
  const closeDD = () => setDropdown(null);
  const pickDD = (val) => { setSel((p) => ({ ...p, [dropdown.key]: val })); closeDD(); };

  const getPlayer = (id) => PLAYERS.find((x) => x.id === id);

  // Metrics derived list (e.g., Handicap)
  const metric = 'hcp';
  const metricList = useMemo(() => [...PLAYERS].sort((a,b) => a[metric] - b[metric]), []);

  const Chip = ({ label, onPress, active }) => (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={[styles.chip, active && styles.chipActive]}>
      <Text style={[styles.chipTxt, active && styles.chipTxtActive]}>{label}</Text>
    </TouchableOpacity>
  );

  const DropChip = ({ label, onPress }) => (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={[styles.chip, styles.dropChip]}>
      <Text style={styles.chipTxt}>{label}</Text>
      <Text style={styles.down}>⌄</Text>
    </TouchableOpacity>
  );

  const Medal = ({ t }) => {
    const bg = t === 1 ? '#FFD700' : t === 2 ? '#C0C0C0' : '#CD7F32';
    return <View style={[styles.medal, { backgroundColor: bg }]}><Text style={styles.medalTxt}>{`T${t}`}</Text></View>;
  };

  const MiniRow = ({ idx, id }) => {
    const p = getPlayer(id);
    return (
      <View style={styles.miniRow}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Medal t={idx} />
          <Image source={p.avatar} style={styles.miniAvatar} />
          <Text style={styles.miniName}>{p.name}</Text>
        </View>
        <Text style={styles.miniScore}>{`${p.delta} (${p.gross})`}</Text>
      </View>
    );
  };

  const Card = ({ c }) => (
    <View style={styles.card}>
      <View style={styles.cardHead}>
        <Image source={require('../../../assets/man.png')} style={styles.cardIcon} />
        <View style={{ flex: 1 }}>
          <Text style={styles.cardTitle}>{c.title}</Text>
          <Text style={styles.cardSub}>{c.subtitle}</Text>
          <View style={{ flexDirection: 'row', marginTop: 6 }}>
            <Text style={styles.timeTxt}>{c.date}</Text>
            <Text style={[styles.timeTxt, { marginLeft: hs(10) }]}>{c.time}</Text>
          </View>
        </View>
        {c.ticked ? <Text style={styles.tick}>✓</Text> : null}
      </View>
      <View style={styles.cardListBox}>
        {c.top3.map((pid, i) => (<MiniRow key={pid} idx={i+1} id={pid} />))}
      </View>
      <View style={styles.cardActions}>
        <TouchableOpacity style={styles.shareBtn} onPress={() => setShareCard(c.id)}>
          <Image source={require('../../../assets/Share.png')} style={styles.shareIcon} />
          <Text style={styles.shareTxt}>Share</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.lbBtn}>
          <Text style={styles.lbTxt}>Leaderboard</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const MetricTile = ({ label, place, value }) => (
    <TouchableOpacity activeOpacity={0.85} onPress={() => setShowMetrics(true)} style={styles.metricTile}>
      <Text style={styles.metricLabel}>{label}</Text>
      <View style={styles.metricBadge}><Text style={styles.metricBadgeTxt}>{place}</Text></View>
      <Text style={styles.metricValue}>{value}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}><Text style={styles.backTxt}>{'<'}</Text></TouchableOpacity>
        <View style={{alignSelf: 'center', marginRight: 135,}}><Text style={styles.headerTitle}>Leaderboard</Text></View>
        <TouchableOpacity onPress={() => setMenuVisible(true)} style={styles.headerRight}>
          <Image source={require('../../../assets/dots-icon.png')} style={styles.headerIcon} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Filters row 1 */}
        <View style={styles.filterRow}>
          <DropChip label={sel.country} onPress={() => openDD('country')} />
          <DropChip label={sel.clubs} onPress={() => openDD('clubs')} />
          <DropChip label={sel.events} onPress={() => openDD('events')} />
        </View>

        {/* Filters row 2 */}
        <View style={styles.filterRow}>
          <Chip label={sel.relation} active onPress={() => {}} />
          <DropChip label={sel.month} onPress={() => openDD('month')} />
          <DropChip label={sel.year} onPress={() => openDD('year')} />
          <TouchableOpacity style={styles.smallChip}><Text style={styles.smallChipTxt}>↕</Text></TouchableOpacity>
        </View>

        {/* Metrics quick tiles (tap any to show metrics list) */}
        <View style={styles.metricsRow}>
          <MetricTile label="Handicap" place="3rd" value="9.7" />
          <MetricTile label="Score" place="3rd" value="87.4" />
          <MetricTile label="Putts" place="3rd" value="35.0" />
          <MetricTile label="GIR%" place="3rd" value="35%" />
        </View>

        {showMetrics ? (
          <View>
            <Text style={styles.sectionHeader}>Handicap Leaderboard</Text>
            <View style={styles.list}>
              {metricList.map((p, idx) => (
                <View key={p.id} style={styles.row}>
                  <View style={styles.rowLeft}>
                    <Text style={styles.rankNum}>{idx + 1}</Text>
                    <Image source={p.avatar} style={styles.avatar} />
                    <View>
                      <Text style={styles.name}>{p.name}</Text>
                      <Text style={styles.sub}>{'Location'}</Text>
                    </View>
                  </View>
                  <View style={styles.valuePill}><Text style={styles.valuePillTxt}>{p.hcp}</Text></View>
                </View>
              ))}
            </View>
          </View>
        ) : (
          <View>
            {CARDS.map((c) => (<Card key={c.id} c={c} />))}
          </View>
        )}
      </ScrollView>

      {/* Dropdown overlay */}
      <Modal visible={!!dropdown} transparent animationType="fade" onRequestClose={closeDD}>
        <TouchableOpacity style={styles.modalBg} activeOpacity={1} onPress={closeDD} />
        <View style={styles.dropdownBox}>
          {(dropdown?.options || []).map((opt) => (
            <TouchableOpacity key={opt} style={styles.dropdownRow} onPress={() => pickDD(opt)}>
              <Text style={styles.dropdownTxt}>{opt}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>

      {/* Share confirm */}
      <Modal visible={!!shareCard} transparent animationType="fade" onRequestClose={() => setShareCard(null)}>
        <View style={styles.centerModal}>
          <View style={styles.confirmBox}>
            <Text style={styles.confirmTxt}>Do you want to share your leaderboard to the community</Text>
            <View style={styles.confirmRow}>
              <TouchableOpacity style={styles.confirmYes} onPress={() => setShareCard(null)}><Text style={styles.confirmYesTxt}>Yes</Text></TouchableOpacity>
              <TouchableOpacity style={styles.confirmCancel} onPress={() => setShareCard(null)}><Text style={styles.confirmCancelTxt}>Cancel</Text></TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

  <OverflowMenu visible={menuVisible} onClose={() => setMenuVisible(false)} navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  header: {marginTop: verticalScale(50), height: vs(56), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: hs(16), backgroundColor: colors.surface, borderBottomWidth: 1, borderBottomColor: colors.border },
  backBtn: { width: ms(36), height: ms(36), alignItems: 'center', justifyContent: 'center', borderRadius: ms(18), backgroundColor: '#F3E3D6' },
  backTxt: { fontSize: ms(18), color: colors.accent, fontWeight: '800' },
  headerTitle: { fontSize: ms(18), fontWeight: '700', color: colors.text },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  headerIcon: { width: ms(20), height: ms(20), resizeMode: 'contain' },

  content: { padding: hs(16), paddingBottom: vs(40) },
  filterRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: vs(10) },
  chip: { flex: 1, marginHorizontal: hs(4), paddingVertical: vs(10), borderRadius: radius.lg, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' },
  dropChip: { justifyContent: 'space-between', paddingHorizontal: hs(12) },
  chipActive: { backgroundColor: colors.accent, borderColor: colors.accent },
  chipTxt: { color: colors.text, fontWeight: '700' },
  chipTxtActive: { color: '#fff' },
  down: { marginLeft: hs(8), color: colors.textMute, fontWeight: '800' },
  smallChip: { width: ms(36), alignItems: 'center', justifyContent: 'center', borderRadius: radius.lg, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  smallChipTxt: { color: colors.text, fontWeight: '800' },

  metricsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: vs(6), marginBottom: vs(12) },
  metricTile: { flex: 1, marginHorizontal: hs(4), backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, paddingVertical: vs(10), alignItems: 'center' },
  metricLabel: { color: colors.textMute, marginBottom: 6 },
  metricBadge: { backgroundColor: '#E7D7CC', paddingVertical: 2, paddingHorizontal: 8, borderRadius: radius.lg, marginBottom: 6 },
  metricBadgeTxt: { color: '#6E3D23', fontWeight: '800' },
  metricValue: { color: colors.text, fontWeight: '800' },

  sectionHeader: { color: colors.text, fontWeight: '700', marginBottom: vs(8) },
  list: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: hs(16), paddingVertical: vs(12), borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border },
  rowLeft: { flexDirection: 'row', alignItems: 'center' },
  rankNum: { width: ms(20), textAlign: 'center', marginRight: hs(8), color: colors.text, fontWeight: '800' },
  avatar: { width: ms(30), height: ms(30), borderRadius: ms(15), marginRight: hs(10) },
  name: { color: colors.text, fontWeight: '700' },
  sub: { color: colors.textMute, fontSize: ms(12) },
  valuePill: { borderWidth: 1, borderColor: colors.border, borderRadius: radius.lg, paddingVertical: 6, paddingHorizontal: 10 },
  valuePillTxt: { color: colors.text, fontWeight: '700' },

  card: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, marginBottom: vs(12), padding: hs(12) },
  cardHead: { flexDirection: 'row', alignItems: 'center', marginBottom: vs(8) },
  cardIcon: { width: ms(34), height: ms(34), borderRadius: ms(17), marginRight: hs(10) },
  cardTitle: { color: colors.text, fontWeight: '700' },
  cardSub: { color: colors.textMute, fontSize: ms(12) },
  timeTxt: { color: colors.textMute, fontSize: ms(12) },
  tick: { color: colors.accent, fontSize: ms(18), fontWeight: '800' },
  cardListBox: { backgroundColor: '#FFF', borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, paddingVertical: vs(6) },
  miniRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: hs(10), paddingVertical: vs(8), borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border },
  miniAvatar: { width: ms(24), height: ms(24), borderRadius: ms(12), marginLeft: hs(8), marginRight: hs(8) },
  miniName: { color: colors.text, fontWeight: '600' },
  miniScore: { color: colors.text, fontWeight: '700' },
  medal: { width: ms(22), height: ms(22), borderRadius: ms(11), alignItems: 'center', justifyContent: 'center' },
  medalTxt: { fontSize: ms(10), fontWeight: '800', color: '#1E2250' },
  cardActions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: vs(10) },
  shareBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F3E7DD', borderRadius: radius.lg, paddingVertical: vs(8), paddingHorizontal: hs(12) },
  shareIcon: { width: ms(16), height: ms(16), resizeMode: 'contain', marginRight: hs(6) },
  shareTxt: { color: '#6E3D23', fontWeight: '700' },
  lbBtn: { backgroundColor: '#F3E7DD', borderRadius: radius.lg, paddingVertical: vs(8), paddingHorizontal: hs(12) },
  lbTxt: { color: '#6E3D23', fontWeight: '700' },

  // Dropdown modal styles
  modalBg: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.2)' },
  dropdownBox: { position: 'absolute', top: vs(120), left: hs(16), right: hs(16), backgroundColor: colors.surface, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border, overflow: 'hidden' },
  dropdownRow: { paddingVertical: vs(12), paddingHorizontal: hs(14), borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border },
  dropdownTxt: { color: colors.text },

  centerModal: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.25)' },
  confirmBox: { width: '80%', backgroundColor: colors.surface, borderRadius: radius.md, padding: hs(16), borderWidth: 1, borderColor: colors.border },
  confirmTxt: { color: colors.text, marginBottom: vs(12) },
  confirmRow: { flexDirection: 'row', justifyContent: 'space-between' },
  confirmYes: { backgroundColor: colors.accent, paddingVertical: vs(10), paddingHorizontal: hs(16), borderRadius: radius.lg },
  confirmYesTxt: { color: '#fff', fontWeight: '700' },
  confirmCancel: { backgroundColor: colors.surface, paddingVertical: vs(10), paddingHorizontal: hs(16), borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border },
  confirmCancelTxt: { color: colors.text, fontWeight: '700' },
});
