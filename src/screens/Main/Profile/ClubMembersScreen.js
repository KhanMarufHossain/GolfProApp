import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Image } from 'react-native';
import { colors, radius } from '../../../utils/theme';
import { horizontalScale as hs, verticalScale as vs, moderateScale as ms } from '../../../utils/dimensions';

const mockMembers = [
  { id: 'm1', name: 'Nick Blake', hcp: 17, avatar: require('../../../../assets/man.png'), club: 'Club Name', status: 'friend' },
  { id: 'm2', name: 'Dianne Russell', hcp: 12, avatar: require('../../../../assets/man.png'), club: 'Club Name', status: 'add' },
  { id: 'm3', name: 'Annette Black', hcp: 21, avatar: require('../../../../assets/man.png'), club: 'Club Name', status: 'add' },
  { id: 'm4', name: 'Jacob Jones', hcp: 9, avatar: require('../../../../assets/man.png'), club: 'Club Name', status: 'pending' },
];

export default function ClubMembersScreen({ navigation }) {
  const [q, setQ] = useState('');
  const [members, setMembers] = useState(mockMembers);

  const onToggle = (id) => {
    setMembers((prev) => prev.map((m) => m.id === id ? { ...m, status: m.status === 'add' ? 'pending' : m.status } : m));
  };

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Image source={item.avatar} style={styles.avatar} />
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.meta}>HCP {item.hcp}</Text>
      </View>
      {item.status === 'friend' && (
        <View style={[styles.badge, styles.badgeFriend]}><Text style={styles.badgeText}>Friend</Text></View>
      )}
      {item.status === 'add' && (
        <TouchableOpacity style={[styles.badge, styles.badgeAdd]} onPress={() => onToggle(item.id)}>
          <Text style={[styles.badgeText, { color: '#fff' }]}>Add</Text>
        </TouchableOpacity>
      )}
      {item.status === 'pending' && (
        <View style={[styles.badge, styles.badgePending]}><Text style={[styles.badgeText, { color: '#8B5C2A' }]}>Pending</Text></View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backIcon}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Club Members</Text>
        <TouchableOpacity style={styles.filterBtn}>
          <Image source={require('../../../../assets/filter.png')} style={styles.filterIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchWrap}>
        <TextInput
          value={q}
          onChangeText={setQ}
          placeholder="Search Name or Club Name"
          placeholderTextColor={colors.textMute}
          style={styles.search}
        />
      </View>

      <FlatList
        data={members.filter(m => m.name.toLowerCase().includes(q.toLowerCase()))}
        keyExtractor={(i) => i.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: hs(16) }}
      />
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
  title: { fontSize: ms(16), fontWeight: '700', color: colors.text },
  filterBtn: {
    width: ms(36), height: ms(36), borderRadius: ms(10), backgroundColor: '#8B5C2A', alignItems: 'center', justifyContent: 'center'
  },
  filterIcon: { width: ms(18), height: ms(18), tintColor: '#fff' },

  searchWrap: { padding: hs(16), backgroundColor: colors.bg },
  search: {
    backgroundColor: '#F6EFEA', borderRadius: radius.lg, paddingVertical: vs(10), paddingHorizontal: hs(14), color: colors.text
  },

  row: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderRadius: radius.md,
    padding: hs(12), borderWidth: 1, borderColor: colors.border, marginBottom: vs(10)
  },
  avatar: { width: ms(44), height: ms(44), borderRadius: ms(22), marginRight: hs(12) },
  name: { color: colors.text, fontWeight: '700', fontSize: ms(14) },
  meta: { color: colors.textMute, fontSize: ms(12), marginTop: 2 },
  badge: { paddingVertical: vs(6), paddingHorizontal: hs(12), borderRadius: radius.md },
  badgeFriend: { backgroundColor: '#EFE7E1' },
  badgeAdd: { backgroundColor: '#8B5C2A' },
  badgePending: { backgroundColor: '#EADBD0' },
  badgeText: { fontSize: ms(12), fontWeight: '700', color: '#8B5C2A' },
});
