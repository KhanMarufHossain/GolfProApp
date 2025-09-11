import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { colors, radius } from '../../utils/theme';
import { horizontalScale as hs, verticalScale as vs, moderateScale as ms, verticalScale } from '../../utils/dimensions';

export default function SettingsPrivacyPolicyScreen({ navigation }) {
  const Row = ({ title, onPress }) => (
    <TouchableOpacity onPress={onPress} style={styles.row}>
      <Text style={styles.rowTitle}>{title}</Text>
      <Text style={styles.chev}>›</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}><Text style={styles.backTxt}>{'<'}</Text></TouchableOpacity>
        <Text style={styles.headerTitle}>Privacy & Policy</Text>
        <View style={{ width: ms(36) }} />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.box}>
          <Row title="Edit Avatar" onPress={() => navigation.navigate('SettingsEditAvatar')} />
          <View style={styles.divider} />
          <Row title="Edit Cover" onPress={() => navigation.navigate('SettingsEditCover')} />
          <View style={styles.divider} />
          <Row title="Personal Information" onPress={() => navigation.navigate('SettingsPersonalInfo')} />
          <View style={styles.divider} />
          <Row title="Edit Profile" onPress={() => navigation.navigate('SettingsEditProfile')} />
          <View style={styles.divider} />
          <Row title="Change Password" onPress={() => navigation.navigate('SettingsChangePassword')} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  header: { height: vs(56), marginTop: verticalScale(50), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: hs(16), backgroundColor: colors.surface, borderBottomWidth: 1, borderBottomColor: colors.border },
  backBtn: { width: ms(36), height: ms(36), alignItems: 'center', justifyContent: 'center', borderRadius: ms(18), backgroundColor: '#F3E3D6' },
  backTxt: { fontSize: ms(18), color: colors.accent, fontWeight: '800' },
  headerTitle: { fontSize: ms(18), fontWeight: '700', color: colors.text },
  content: { padding: hs(16) },
  box: { backgroundColor: colors.surface, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: hs(16), paddingVertical: vs(14) },
  rowTitle: { color: colors.text, fontWeight: '600', fontSize: ms(14) },
  chev: { color: colors.textMute, fontSize: ms(20), fontWeight: '700' },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: colors.border },
});
