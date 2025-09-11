import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, TextInput } from 'react-native';
import { colors, radius } from '../../utils/theme';
import { horizontalScale as hs, verticalScale as vs, moderateScale as ms, verticalScale } from '../../utils/dimensions';

export default function SettingsEditProfileScreen({ navigation }) {
  const [form, setForm] = useState({
    fullName: 'Nick Ribeiro',
    email: 'nickribeiro@gmail.com',
    gender: 'Male',
    dob: '',
    country: 'USA',
    city: 'Kansas',
    address: '1552 Schuylkill Ave Reading',
  });

  const Field = ({ label, value, onChangeText, placeholder }) => (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={styles.input} value={value} onChangeText={onChangeText} placeholder={placeholder} placeholderTextColor={colors.textMute} />
    </View>
  );

  return (
    <View style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}><Text style={styles.backTxt}>{'<'}</Text></TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <View style={{ width: ms(36) }} />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.box}>
          <Field label="Full Name" value={form.fullName} onChangeText={(t) => setForm({ ...form, fullName: t })} />
          <View style={styles.divider} />
          <Field label="Email" value={form.email} onChangeText={(t) => setForm({ ...form, email: t })} />
          <View style={styles.divider} />
          <Field label="Gender" value={form.gender} onChangeText={(t) => setForm({ ...form, gender: t })} />
          <View style={styles.divider} />
          <Field label="Date of Birth" value={form.dob} onChangeText={(t) => setForm({ ...form, dob: t })} placeholder="Select Date of Birth" />
          <View style={styles.divider} />
          <Field label="Country" value={form.country} onChangeText={(t) => setForm({ ...form, country: t })} />
          <View style={styles.divider} />
          <Field label="City" value={form.city} onChangeText={(t) => setForm({ ...form, city: t })} />
          <View style={styles.divider} />
          <Field label="Address" value={form.address} onChangeText={(t) => setForm({ ...form, address: t })} />
        </View>
        <TouchableOpacity style={styles.primaryBtn}>
          <Text style={styles.primaryTxt}>Save Change</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  header: {marginTop: verticalScale(50), height: vs(56), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: hs(16), backgroundColor: colors.surface, borderBottomWidth: 1, borderBottomColor: colors.border },
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
