import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Image } from 'react-native';
import PostCard from '../../../components/PostCard';
import { fetchFeed, likePost, addComment } from '../../../services/communityService';
import { horizontalScale, verticalScale, moderateScale } from '../../../utils/dimensions';
import { colors } from '../../../utils/theme';

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
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
          <Text style={styles.backTxt}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Comments</Text>
        <View style={styles.headerRight} />
      </View>
      
      <FlatList
        ListHeaderComponent={
          <View>
            <PostCard 
              post={post} 
              onLike={async () => { 
                const r = await likePost(post.id); 
                if (r.ok) setPost(r.data); 
              }} 
              style={styles.postCard}
            />
            <View style={styles.commentsHeader}>
              <Text style={styles.commentsTitle}>Comments</Text>
              <Text style={styles.commentsCount}>{post.comments?.length || 0}</Text>
            </View>
          </View>
        }
        data={post.comments || []}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View style={styles.commentItem}>
            <Image source={item.user?.avatar || require('../../../../assets/man.png')} style={styles.commentAvatar} />
            <View style={styles.commentContent}>
              <View style={styles.commentBubble}>
                <Text style={styles.commentName}>{item.user?.name || 'User'}</Text>
                <Text style={styles.commentText}>{item.text}</Text>
              </View>
              <View style={styles.commentMeta}>
                <Text style={styles.commentTime}>2h</Text>
                <TouchableOpacity style={styles.replyButton}>
                  <Text style={styles.replyText}>Reply</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        contentContainerStyle={styles.list}
      />
      
      <KeyboardAvoidingView behavior={Platform.select({ ios: 'padding', android: undefined })}>
        <View style={styles.inputContainer}>
          <Image source={require('../../../../assets/man.png')} style={styles.inputAvatar} />
          <View style={styles.inputWrapper}>
            <TextInput 
              value={comment} 
              onChangeText={setComment} 
              style={styles.input} 
              placeholder="Write a comment..." 
              multiline
            />
            <TouchableOpacity onPress={submit} style={styles.sendButton}>
              <Text style={styles.sendText}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { backgroundColor: '#F5EDE8' },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',
    paddingHorizontal: horizontalScale(16), 
    paddingVertical: verticalScale(12),
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#EFE7E1'
  },
  back: { 
    width: moderateScale(36), 
    height: moderateScale(36), 
    borderRadius: moderateScale(18), 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  backTxt: { fontSize: moderateScale(22), color: '#222', fontWeight: '700' },
  title: { 
    fontSize: moderateScale(18), 
    fontWeight: '700', 
    color: '#222',
    textAlign: 'center'
  },
  headerRight: { width: moderateScale(36) },
  
  list: { paddingBottom: verticalScale(20) },
  postCard: { 
    marginHorizontal: horizontalScale(16),
    marginTop: verticalScale(16),
    marginBottom: verticalScale(20)
  },
  
  commentsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(0),
    backgroundColor: '#fff',
    marginHorizontal: horizontalScale(16),
    borderRadius: moderateScale(12),
    marginBottom: verticalScale(16)
  },
  commentsTitle: { 
    fontSize: moderateScale(16), 
    fontWeight: '700', 
    color: '#222' 
  },
  commentsCount: { 
    fontSize: moderateScale(14), 
    color: colors.textMute,
    backgroundColor: '#F5EDE8',
    paddingHorizontal: horizontalScale(8),
    paddingVertical: verticalScale(4),
    borderRadius: moderateScale(12)
  },
  
  commentItem: {
    flexDirection: 'row',
    paddingHorizontal: horizontalScale(16),
    marginBottom: verticalScale(16),
    alignItems: 'flex-start'
  },
  commentAvatar: {
    width: moderateScale(36),
    height: moderateScale(36),
    borderRadius: moderateScale(18),
    marginRight: horizontalScale(12)
  },
  commentContent: { flex: 1 },
  commentBubble: {
    backgroundColor: '#fff',
    paddingHorizontal: horizontalScale(14),
    paddingVertical: verticalScale(10),
    borderRadius: moderateScale(16),
    borderTopLeftRadius: moderateScale(4)
  },
  commentName: { 
    fontWeight: '700', 
    color: '#222',
    fontSize: moderateScale(14),
    marginBottom: verticalScale(4)
  },
  commentText: { 
    color: '#333', 
    fontSize: moderateScale(14),
    lineHeight: moderateScale(18)
  },
  commentMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(8),
    paddingHorizontal: horizontalScale(14)
  },
  commentTime: {
    fontSize: moderateScale(12),
    color: colors.textMute,
    marginRight: horizontalScale(16)
  },
  replyButton: {
    paddingVertical: verticalScale(4)
  },
  replyText: {
    fontSize: moderateScale(12),
    color: '#8B5C2A',
    fontWeight: '600'
  },
  
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(12),
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#EFE7E1'
  },
  inputAvatar: {
    width: moderateScale(36),
    height: moderateScale(36),
    borderRadius: moderateScale(18),
    marginRight: horizontalScale(12)
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#F5EDE8',
    borderRadius: moderateScale(20),
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(8),
    minHeight: moderateScale(40)
  },
  input: {
    flex: 1,
    fontSize: moderateScale(14),
    color: '#222',
    maxHeight: moderateScale(100),
    paddingVertical: 0
  },
  sendButton: {
    marginLeft: horizontalScale(8),
    paddingVertical: verticalScale(4)
  },
  sendText: {
    color: '#8B5C2A',
    fontWeight: '700',
    fontSize: moderateScale(14)
  }
});
