import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, radius } from '../utils/theme';
import { moderateScale, horizontalScale } from '../utils/dimensions';

export default function PostCard({ post, onPress, onLike, onComment, style, initialAdded = false, onToggleAdd }) {
  const [added, setAdded] = useState(initialAdded);
  const toggleAdded = () => {
    const next = !added;
    setAdded(next);
    onToggleAdd && onToggleAdd(next, post?.userId);
  };

  // Handle both old data structure (post.user) and new API structure (post.userId)
  const userInfo = post.user || (post.userId ? {
    name: post.userId.fullName,
    avatar: typeof post.userId.profileImage === 'string' 
      ? { uri: post.userId.profileImage } 
      : post.userId.profileImage
  } : null);

  // Handle image - could be string URI from API or local require
  const imageSource = post.image 
    ? (typeof post.image === 'string' ? { uri: post.image } : post.image)
    : (post.postImage ? (typeof post.postImage === 'string' ? { uri: post.postImage } : post.postImage) : null);

  // Handle text - could be post.text or post.postTitle from API
  const textContent = post.text || post.postTitle;

  return (
    <View style={[styles.card, style]}>
      <View style={styles.header}>
        <Image 
          source={userInfo?.avatar || require('../../assets/man.png')} 
          style={styles.avatar} 
        />
        <View style={{ marginLeft: 12, flex: 1 }}>
          <Text style={styles.name}>{userInfo?.name || 'User'}</Text>
          <Text style={styles.meta}>{post.location || post.userId?.city || 'Club Name'}</Text>
        </View>
        <TouchableOpacity style={styles.menuBtn} onPress={toggleAdded}>
          <Image
            source={added ? require('../../assets/Added.png') : require('../../assets/addFriend.png')}
            style={styles.friendIcon}
          />
        </TouchableOpacity>
      </View>
      {imageSource ? <Image source={imageSource} style={styles.image} /> : null}
      {!!textContent && <Text style={styles.text}>{textContent}</Text>}
      <View style={styles.footerRow}>
        <View style={styles.actionRow}>
          <TouchableOpacity onPress={onLike} style={styles.actionBtn}>
            <Image source={require('../../assets/Like.png')} style={styles.actionIcon} />
            <Text style={[styles.actionTxt, post.liked && styles.likeActive]}>{post?.likes ?? 0} Like</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onComment} style={styles.actionBtn}>
            <Image source={require('../../assets/Comment.png')} style={styles.actionIcon} />
            <Text style={styles.actionTxt}>{(post?.comments && post.comments.length) || 0} Comments</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.actionRight}>
          <TouchableOpacity style={styles.iconBtn}>
            <Image source={require('../../assets/Share.png')} style={styles.actionIconSmall} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <Image source={require('../../assets/Flag.png')} style={styles.actionIconSmall} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surface, borderRadius: radius.lg, padding: moderateScale(16), marginBottom: moderateScale(18), borderWidth: 1, borderColor: colors.border },
  header: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: moderateScale(44), height: moderateScale(44), borderRadius: moderateScale(22) },
  name: { fontWeight: '700', color: colors.text, fontSize: moderateScale(16) },
  meta: { color: colors.textMute, fontSize: moderateScale(12), marginTop: 2 },
  menuBtn: { padding: 6 },
  friendIcon: { width: moderateScale(32), height: moderateScale(32) },
  image: { width: '100%', height: moderateScale(180), borderRadius: radius.md, marginTop: moderateScale(12) },
  text: { marginTop: moderateScale(10), color: colors.text, lineHeight: moderateScale(20), fontSize: moderateScale(14) },
  footerRow: { flexDirection: 'row', marginTop: moderateScale(14), alignItems: 'center', justifyContent: 'space-between' },
  actionRow: { flexDirection: 'row', alignItems: 'center' },
  actionBtn: { flexDirection: 'row', alignItems: 'center', marginRight: moderateScale(18) },
  actionIcon: { width: moderateScale(24), height: moderateScale(24), marginRight: horizontalScale(8), tintColor: colors.textMute },
  actionIconSmall: { width: moderateScale(22), height: moderateScale(22), tintColor: colors.textMute },
  actionTxt: { color: colors.textMute, fontSize: moderateScale(12), fontWeight: '600' },
  likeActive: { color: colors.accent },
  actionRight: { flexDirection: 'row', alignItems: 'center' },
  iconBtn: { marginLeft: moderateScale(6) },
  iconTxt: { color: colors.textMute, fontSize: moderateScale(12) },
});

