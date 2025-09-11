import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, TextInput } from 'react-native';
import { colors, radius } from '../../utils/theme';
import { horizontalScale as hs, verticalScale as vs, moderateScale as ms, verticalScale } from '../../utils/dimensions';

export default function SettingsChangePasswordScreen({ navigation }) {
  const [form, setForm] = useState({ cur: '', n1: '', n2: '' });
  const Field = ({ label, value, onChangeText }) => (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput value={value} onChangeText={onChangeText} secureTextEntry style={styles.input} />
    </View>
  );
  return (
    <View style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}><Text style={styles.backTxt}>{'<'}</Text></TouchableOpacity>
        <Text style={styles.headerTitle}>Change Password</Text>
        <View style={{ width: ms(36) }} />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.box}>
          <Field label="Current Password" value={form.cur} onChangeText={(t) => setForm({ ...form, cur: t })} />
          <View style={styles.divider} />
          <Field label="New Password" value={form.n1} onChangeText={(t) => setForm({ ...form, n1: t })} />
          <View style={styles.divider} />
          <Field label="Confirm Password" value={form.n2} onChangeText={(t) => setForm({ ...form, n2: t })} />
        </View>
        <TouchableOpacity style={styles.primaryBtn}><Text style={styles.primaryTxt}>Save</Text></TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg 
    
  },
  header: { height: vs(56),marginTop: verticalScale(50), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: hs(16), backgroundColor: colors.surface, borderBottomWidth: 1, borderBottomColor: colors.border },
  backBtn: { width: ms(36), height: ms(36), alignItems: 'center', justifyContent: 'center', borderRadius: ms(18), backgroundColor: '#F3E3D6' },
  backTxt: { fontSize: ms(18), color: colors.accent, fontWeight: '800' },
  headerTitle: { fontSize: ms(18), fontWeight: '700', color: colors.text },
  content: { padding: hs(16) },
  box: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md },
  field: { paddingHorizontal: hs(16), paddingVertical: vs(12) },
  label: { color: colors.textMute, marginBottom: 6 },
  input: { color: colors.text, fontSize: ms(14) },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: colors.border },
  primaryBtn: { marginTop: vs(16), backgroundColor: colors.accent, borderRadius: radius.lg, paddingVertical: vs(14), alignItems: 'center' },
  primaryTxt: { color: '#fff', fontWeight: '700' },
});
