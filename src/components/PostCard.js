import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, radius } from '../utils/theme';
import { moderateScale } from '../utils/dimensions';

export default function PostCard({ post, onPress, onLike, onComment, style }) {
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress} style={[styles.card, style]}>
      <View style={styles.header}>
        <Image source={post.user?.avatar} style={styles.avatar} />
        <View style={{ marginLeft: 10, flex: 1 }}>
          <Text style={styles.name}>{post.user?.name}</Text>
          <Text style={styles.meta}>Club Name</Text>
        </View>
        <TouchableOpacity style={styles.menuBtn}>
          <Text style={styles.menuDots}>⋯</Text>
        </TouchableOpacity>
      </View>
      {post.image ? <Image source={post.image} style={styles.image} /> : null}
      {!!post.text && <Text style={styles.text}>{post.text}</Text>}
      <View style={styles.footerRow}>
        <View style={styles.actionRow}>
          <TouchableOpacity onPress={onLike} style={styles.actionBtn}><Text style={[styles.actionTxt, post.liked && styles.likeActive]}>♡ {post.likes}</Text></TouchableOpacity>
          <TouchableOpacity onPress={onComment} style={styles.actionBtn}><Text style={styles.actionTxt}>💬 {post.comments?.length || 0}</Text></TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}><Text style={styles.actionTxt}>↗</Text></TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surface, borderRadius: radius.lg, padding: moderateScale(14), marginBottom: moderateScale(14), borderWidth: 1, borderColor: colors.border },
  header: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: moderateScale(40), height: moderateScale(40), borderRadius: moderateScale(20) },
  name: { fontWeight: '700', color: colors.text, fontSize: moderateScale(14) },
  meta: { color: colors.textMute, fontSize: moderateScale(11), marginTop: 2 },
  menuBtn: { padding: 4 },
  menuDots: { fontSize: moderateScale(20), color: colors.textMute, marginTop: -6 },
  image: { width: '100%', height: moderateScale(170), borderRadius: radius.md, marginTop: moderateScale(12) },
  text: { marginTop: moderateScale(10), color: colors.text, lineHeight: moderateScale(18) },
  footerRow: { flexDirection: 'row', marginTop: moderateScale(10), alignItems: 'center' },
  actionRow: { flexDirection: 'row', alignItems: 'center' },
  actionBtn: { marginRight: moderateScale(18) },
  actionTxt: { color: colors.textMute, fontSize: moderateScale(12), fontWeight: '600' },
  likeActive: { color: colors.accent },
});

