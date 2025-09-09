import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { getMyScorecards } from '../../../services/profileService';

export default function ScorecardsScreen({ navigation }) {
  const [rows, setRows] = useState([]);

  useEffect(() => { (async () => { const r = await getMyScorecards(); if (r.ok) setRows(r.data); })(); }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}><TouchableOpacity onPress={() => navigation.goBack()}><Text>{'<'}</Text></TouchableOpacity><Text style={styles.title}>Scorecards</Text><View style={{ width: 20 }} /></View>
      <FlatList
        data={rows}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.course}>{item.course}</Text>
            <Text style={styles.meta}>{new Date(item.date).toLocaleDateString()}</Text>
            <View style={{ flex: 1 }} />
            <Text style={styles.gross}>G {item.gross}</Text>
            <Text style={styles.net}>N {item.net}</Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: '#EFE7E1' }} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  header: { height: 48, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 12 },
  title: { fontWeight: '700', fontSize: 18 },
  row: { flexDirection: 'row', alignItems: 'center', padding: 12 },
  course: { fontWeight: '700', color: '#222' },
  meta: { marginLeft: 8, color: '#6E6E6E' },
  gross: { marginHorizontal: 8, fontWeight: '700', color: '#8B5C2A' },
  net: { fontWeight: '700', color: '#8B5C2A' },
});
