import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';

const mock = Array.from({ length: 8 }).map((_, i) => ({ id: 'f' + i, name: 'Follower ' + (i + 1) }));

export default function FollowersScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}><TouchableOpacity onPress={() => navigation.goBack()}><Text>{'<'}</Text></TouchableOpacity><Text style={styles.title}>Followers</Text><View style={{ width: 20 }} /></View>
      <FlatList
        data={mock}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Image source={require('../../../../assets/man.png')} style={styles.avatar} />
            <Text style={styles.name}>{item.name}</Text>
            <TouchableOpacity style={styles.follow}><Text style={styles.followTxt}>Follow</Text></TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  header: { height: 48, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 12 },
  title: { fontWeight: '700', fontSize: 18 },
  row: { flexDirection: 'row', alignItems: 'center', padding: 12, borderBottomWidth: 1, borderColor: '#EFE7E1' },
  avatar: { width: 36, height: 36, borderRadius: 18 },
  name: { flex: 1, marginLeft: 10, color: '#222' },
  follow: { paddingHorizontal: 12, height: 30, borderRadius: 8, backgroundColor: '#8B5C2A', alignItems: 'center', justifyContent: 'center' },
  followTxt: { color: '#fff' },
});
