import React, { useEffect, useState, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import PostCard from '../../../components/PostCard';
import { fetchFeed, likePost } from '../../../services/communityService';

export default function CommunityFeedScreen({ navigation }) {
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetchFeed();
    if (res.ok) setFeed(res.data);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const onLike = async (id) => {
    const res = await likePost(id);
    if (res.ok) {
      setFeed((prev) => prev.map((p) => (p.id === id ? res.data : p)));
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.title}>Community</Text>
        <TouchableOpacity style={styles.compose} onPress={() => navigation.navigate('ComposePost')}>
          <Text style={styles.composeTxt}>＋</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={feed}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={load} />}
        renderItem={({ item }) => (
          <PostCard
            post={item}
            onPress={() => navigation.navigate('PostDetail', { postId: item.id })}
            onLike={() => onLike(item.id)}
            onComment={() => navigation.navigate('PostDetail', { postId: item.id, focus: 'comment' })}
          />
        )}
      />
      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('ComposePost')}>
        <Text style={styles.fabTxt}>＋</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F5EDE8' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 12 },
  title: { fontWeight: '700', fontSize: 18, color: '#222' },
  compose: { position: 'absolute', right: 16, top: 10, width: 36, height: 36, borderRadius: 18, backgroundColor: '#8B5C2A', alignItems: 'center', justifyContent: 'center' },
  composeTxt: { color: '#fff', fontSize: 22, marginTop: -2 },
  list: { padding: 16 },
  fab: { position: 'absolute', right: 16, bottom: 24, width: 56, height: 56, borderRadius: 28, backgroundColor: '#8B5C2A', alignItems: 'center', justifyContent: 'center' },
  fabTxt: { color: '#fff', fontSize: 30, marginTop: -2 },
});
