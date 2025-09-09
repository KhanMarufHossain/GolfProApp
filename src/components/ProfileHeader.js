import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function ProfileHeader({ profile, onEdit }) {
  return (
    <View style={styles.wrap}>
      <Image source={profile.cover} style={styles.cover} />
      <View style={styles.avatarRow}>
        <Image source={profile.avatar} style={styles.avatar} />
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.name}>{profile.name}</Text>
          <Text style={styles.meta}>HCP {profile.handicap} · {profile.location}</Text>
        </View>
        <TouchableOpacity style={styles.edit} onPress={onEdit}><Text style={styles.editTxt}>Edit</Text></TouchableOpacity>
      </View>
      <View style={styles.stats}>
        <View style={styles.stat}><Text style={styles.statVal}>{profile.rounds}</Text><Text style={styles.statLbl}>Rounds</Text></View>
        <View style={styles.stat}><Text style={styles.statVal}>{profile.followers}</Text><Text style={styles.statLbl}>Followers</Text></View>
        <View style={styles.stat}><Text style={styles.statVal}>{profile.following}</Text><Text style={styles.statLbl}>Following</Text></View>
      </View>
      {!!profile.bio && <Text style={styles.bio}>{profile.bio}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { backgroundColor: '#fff', paddingBottom: 12, borderBottomWidth: 1, borderColor: '#EFE7E1' },
  cover: { width: '100%', height: 120 },
  avatarRow: { flexDirection: 'row', alignItems: 'center', marginTop: -30, paddingHorizontal: 16 },
  avatar: { width: 60, height: 60, borderRadius: 30, borderWidth: 3, borderColor: '#fff' },
  name: { fontWeight: '700', fontSize: 18, color: '#222' },
  meta: { color: '#6E6E6E', marginTop: 2 },
  edit: { paddingHorizontal: 12, height: 34, borderRadius: 8, backgroundColor: '#8B5C2A', alignItems: 'center', justifyContent: 'center' },
  editTxt: { color: '#fff', fontWeight: '700' },
  stats: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 12 },
  stat: { alignItems: 'center' },
  statVal: { fontWeight: '700', color: '#222' },
  statLbl: { color: '#6E6E6E' },
  bio: { marginTop: 12, paddingHorizontal: 16, color: '#333' },
});
