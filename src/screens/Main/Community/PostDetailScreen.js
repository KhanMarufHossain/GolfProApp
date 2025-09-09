import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import PostCard from '../../../components/PostCard';
import { fetchFeed, likePost, addComment } from '../../../services/communityService';

export default function PostDetailScreen({ route, navigation }) {
  const { postId } = route.params || {};
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState('');

  useEffect(() => {
    const load = async () => {
      const res = await fetchFeed();
      if (res.ok) setPost(res.data.find((p) => p.id === postId) || res.data[0]);
    };
    load();
  }, [postId]);

  const submit = async () => {
    if (!comment.trim()) return;
    const res = await addComment(post.id, { text: comment });
    if (res.ok) setPost(res.data.post);
    setComment('');
  };

  if (!post) return null;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}><Text style={styles.backTxt}>{'<'}</Text></TouchableOpacity>
        <Text style={styles.title}>Post</Text>
      </View>
      <FlatList
        ListHeaderComponent={<PostCard post={post} onLike={async () => { const r = await likePost(post.id); if (r.ok) setPost(r.data); }} />}
        data={post.comments || []}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.comment}>
            <Text style={styles.commentName}>{item.user?.name}</Text>
            <Text style={styles.commentTxt}>{item.text}</Text>
          </View>
        )}
        contentContainerStyle={styles.list}
      />
      <KeyboardAvoidingView behavior={Platform.select({ ios: 'padding', android: undefined })}>
        <View style={styles.inputRow}>
          <TextInput value={comment} onChangeText={setComment} style={styles.input} placeholder="Write a comment" />
          <TouchableOpacity onPress={submit} style={styles.send}><Text style={styles.sendTxt}>Send</Text></TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 12 },
  back: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  backTxt: { fontSize: 18 },
  title: { flex: 1, textAlign: 'center', fontWeight: '700', fontSize: 18, marginRight: 36 },
  list: { padding: 16 },
  comment: { paddingVertical: 10, borderBottomWidth: 1, borderColor: '#EFE7E1' },
  commentName: { fontWeight: '700', color: '#222' },
  commentTxt: { color: '#333', marginTop: 2 },
  inputRow: { flexDirection: 'row', alignItems: 'center', padding: 8, borderTopWidth: 1, borderColor: '#EFE7E1', backgroundColor: '#fff' },
  input: { flex: 1, height: 44, borderRadius: 8, borderWidth: 1, borderColor: '#EFE7E1', paddingHorizontal: 10 },
  send: { marginLeft: 8, height: 44, paddingHorizontal: 14, borderRadius: 8, backgroundColor: '#8B5C2A', alignItems: 'center', justifyContent: 'center' },
  sendTxt: { color: '#fff', fontWeight: '700' },
});
