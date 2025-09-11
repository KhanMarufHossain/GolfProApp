import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { colors, radius } from '../../utils/theme';
import { horizontalScale as hs, verticalScale as vs, moderateScale as ms, verticalScale } from '../../utils/dimensions';

const UploadBox = () => (
  <View style={styles.boxDashed}>
    <Text style={styles.icon}>📷</Text>
    <Text style={styles.hint}>Tap the camera to take a photo</Text>
    <TouchableOpacity style={styles.cta}><Text style={styles.ctaTxt}>Upload from Gallery</Text></TouchableOpacity>
  </View>
);

export default function SettingsEditAvatarScreen({ navigation }) {
  return (
    <View style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}><Text style={styles.backTxt}>{'<'}</Text></TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Avatar</Text>
        <View style={{ width: ms(36) }} />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <UploadBox />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  header: { marginTop: verticalScale(50),height: vs(56), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: hs(16), backgroundColor: colors.surface, borderBottomWidth: 1, borderBottomColor: colors.border },
  backBtn: { width: ms(36), height: ms(36), alignItems: 'center', justifyContent: 'center', borderRadius: ms(18), backgroundColor: '#F3E3D6' },
  backTxt: { fontSize: ms(18), color: colors.accent, fontWeight: '800' },
  headerTitle: { fontSize: ms(18), fontWeight: '700', color: colors.text },
  content: { padding: hs(16) },
  boxDashed: { borderWidth: 1, borderStyle: 'dashed', borderColor: colors.border, borderRadius: radius.md, height: vs(180), alignItems: 'center', justifyContent: 'center', backgroundColor: colors.surface },
  icon: { fontSize: ms(22), marginBottom: vs(8) },
  hint: { color: colors.textMute, marginBottom: vs(10) },
  cta: { backgroundColor: colors.accent, paddingVertical: vs(10), paddingHorizontal: hs(14), borderRadius: radius.lg },
  ctaTxt: { color: '#fff', fontWeight: '700' },
});
