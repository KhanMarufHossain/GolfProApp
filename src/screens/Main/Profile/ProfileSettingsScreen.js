import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

const items = [
  { id: 's1', label: 'Edit Profile' },
  { id: 's2', label: 'Privacy' },
  { id: 's3', label: 'Notifications' },
  { id: 's4', label: 'Logout' },
];

export default function ProfileSettingsScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}><TouchableOpacity onPress={() => navigation.goBack()}><Text>{'<'}</Text></TouchableOpacity><Text style={styles.title}>Settings</Text><View style={{ width: 20 }} /></View>
      <FlatList
        data={items}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.row} onPress={() => item.id === 's1' ? navigation.navigate('EditProfile') : null}>
            <Text style={styles.label}>{item.label}</Text>
          </TouchableOpacity>
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
  row: { padding: 16, backgroundColor: '#fff' },
  label: { color: '#222' },
});
