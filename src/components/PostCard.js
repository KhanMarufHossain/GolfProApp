import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function PostCard({ post, onPress, onLike, onComment }) {
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress} style={styles.card}>
      <View style={styles.header}>
        <Image source={post.user?.avatar} style={styles.avatar} />
        <View style={{ marginLeft: 8, flex: 1 }}>
          <Text style={styles.name}>{post.user?.name}</Text>
          <Text style={styles.time}>Just now</Text>
        </View>
      </View>
      {post.image ? <Image source={post.image} style={styles.image} /> : null}
      {!!post.text && <Text style={styles.text}>{post.text}</Text>}
      <View style={styles.actions}>
        <TouchableOpacity onPress={onLike} style={styles.actionBtn}>
          <Text style={[styles.actionTxt, post.liked && { color: '#8B5C2A', fontWeight: '700' }]}>♥ {post.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onComment} style={styles.actionBtn}>
          <Text style={styles.actionTxt}>💬 {post.comments?.length || 0}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 12, marginBottom: 12, borderWidth: 1, borderColor: '#EFE7E1' },
  header: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 36, height: 36, borderRadius: 18 },
  name: { fontWeight: '700', color: '#222' },
  time: { color: '#8A8A8A', fontSize: 12 },
  image: { width: '100%', height: 180, borderRadius: 10, marginTop: 10 },
  text: { marginTop: 10, color: '#333' },
  actions: { flexDirection: 'row', marginTop: 10 },
  actionBtn: { marginRight: 16 },
  actionTxt: { color: '#6E6E6E' },
});
