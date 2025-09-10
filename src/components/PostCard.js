import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, radius } from '../utils/theme';
import { moderateScale } from '../utils/dimensions';

export default function PostCard({ post, onPress, onLike, onComment, style }) {
  return (
    <TouchableOpacity activeOpacity={0.95} onPress={onPress} style={[styles.card, style]}>
      <View style={styles.header}>
        <Image source={post.user?.avatar} style={styles.avatar} />
        <View style={{ marginLeft: 12, flex: 1 }}>
          <Text style={styles.name}>{post.user?.name}</Text>
          <Text style={styles.meta}>Club Name</Text>
        </View>
        <TouchableOpacity style={styles.menuBtn}>
          <Image source={require('../../assets/rectangle.png')} style={styles.menuIconPlaceholder} />
        </TouchableOpacity>
      </View>
      {post.image ? <Image source={post.image} style={styles.image} /> : null}
      {!!post.text && <Text style={styles.text}>{post.text}</Text>}
      <View style={styles.footerRow}>
        <View style={styles.actionRow}>
          <TouchableOpacity onPress={onLike} style={styles.actionBtn}>
            <Text style={[styles.actionTxt, post.liked && styles.likeActive]}>Like</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onComment} style={styles.actionBtn}>
            <Text style={styles.actionTxt}>Comment</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.actionRight}>
          <TouchableOpacity style={styles.iconBtn}><Text style={styles.iconTxt}>↗</Text></TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}><Text style={styles.iconTxt}>⚑</Text></TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surface, borderRadius: radius.lg, padding: moderateScale(16), marginBottom: moderateScale(18), borderWidth: 1, borderColor: colors.border },
  header: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: moderateScale(44), height: moderateScale(44), borderRadius: moderateScale(22) },
  name: { fontWeight: '700', color: colors.text, fontSize: moderateScale(16) },
  meta: { color: colors.textMute, fontSize: moderateScale(12), marginTop: 2 },
  menuBtn: { padding: 6 },
  menuIconPlaceholder: { width: 22, height: 22, tintColor: colors.textMute },
  image: { width: '100%', height: moderateScale(180), borderRadius: radius.md, marginTop: moderateScale(12) },
  text: { marginTop: moderateScale(10), color: colors.text, lineHeight: moderateScale(20), fontSize: moderateScale(14) },
  footerRow: { flexDirection: 'row', marginTop: moderateScale(14), alignItems: 'center', justifyContent: 'space-between' },
  actionRow: { flexDirection: 'row', alignItems: 'center' },
  actionBtn: { marginRight: moderateScale(18) },
  actionTxt: { color: colors.textMute, fontSize: moderateScale(12), fontWeight: '600' },
  likeActive: { color: colors.accent },
  actionRight: { flexDirection: 'row', alignItems: 'center' },
  iconBtn: { marginLeft: moderateScale(6) },
  iconTxt: { color: colors.textMute, fontSize: moderateScale(12) },
});

