import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, ScrollView } from 'react-native';
import { colors, radius } from '../../utils/theme';
import { horizontalScale as hs, verticalScale as vs, moderateScale as ms } from '../../utils/dimensions';

const sample = [
  require('../../../assets/golffield1.jpg'),
  require('../../../assets/coursePreviewimage.png'),
  require('../../../assets/map.png'),
  require('../../../assets/golfField.png'),
];

export default function SettingsPhotosScreen({ navigation }) {
  const [photos, setPhotos] = useState(sample);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}><Text style={styles.backIcon}>{'<'}</Text></TouchableOpacity>
        <Text style={styles.title}>Photos</Text>
        <View style={{ width: hs(40) }} />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.actions}>
          <TouchableOpacity style={[styles.actionBtn, { backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1 }]}>
            <Text style={{ color: colors.text, fontWeight: '700' }}>Choose</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionBtn, { backgroundColor: colors.accent }]}>
            <Text style={{ color: '#fff', fontWeight: '700' }}>Upload</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.grid}>
          {photos.map((p, i) => (
            <View key={i} style={styles.tile}>
              <Image source={p} style={styles.img} />
              <TouchableOpacity style={styles.remove}><Text style={styles.removeTxt}>×</Text></TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  header: { height: vs(56), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: hs(16), backgroundColor: colors.surface, borderBottomWidth: 1, borderBottomColor: colors.border },
  backBtn: { width: ms(40), height: ms(40), alignItems: 'center', justifyContent: 'center' },
  backIcon: { fontSize: ms(18), color: colors.text },
  title: { fontSize: ms(18), fontWeight: '700', color: colors.text },
  content: { padding: hs(16), paddingBottom: vs(30) },
  actions: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: vs(12) },
  actionBtn: { flex: 1, paddingVertical: vs(12), borderRadius: radius.lg, alignItems: 'center', marginHorizontal: hs(6) },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  tile: { width: '48.5%', aspectRatio: 1.1, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, overflow: 'hidden', marginBottom: vs(10) },
  img: { width: '100%', height: '100%', resizeMode: 'cover' },
  remove: { position: 'absolute', top: 6, right: 6, width: 24, height: 24, borderRadius: 12, backgroundColor: 'rgba(0,0,0,0.4)', alignItems: 'center', justifyContent: 'center' },
  removeTxt: { color: '#fff', fontSize: 16, fontWeight: '700', lineHeight: 16 },
});
