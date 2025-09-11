import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, SafeAreaView, ScrollView } from 'react-native';
import { colors, radius } from '../../utils/theme';
import { horizontalScale as hs, verticalScale as vs, moderateScale as ms } from '../../utils/dimensions';

export default function SettingsProfileDetailsScreen({ navigation }) {
  const [form, setForm] = useState({ firstName: 'Nick', lastName: 'Ribeiro', location: 'Kansas, US', handicap: '12.4' });
  const onChange = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const Field = ({ label, value, onChangeText, keyboardType }) => (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        style={styles.input}
        placeholderTextColor={colors.textMute}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}><Text style={styles.backIcon}>{'<'}</Text></TouchableOpacity>
        <Text style={styles.title}>Profile Details</Text>
        <View style={{ width: hs(40) }} />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.box}>
          <Field label="First Name" value={form.firstName} onChangeText={(t) => onChange('firstName', t)} />
          <View style={styles.divider} />
          <Field label="Last Name" value={form.lastName} onChangeText={(t) => onChange('lastName', t)} />
          <View style={styles.divider} />
          <Field label="Location" value={form.location} onChangeText={(t) => onChange('location', t)} />
          <View style={styles.divider} />
          <Field label="Handicap" value={form.handicap} onChangeText={(t) => onChange('handicap', t)} keyboardType="numeric" />
        </View>
        <TouchableOpacity style={styles.primaryBtn}>
          <Text style={styles.primaryTxt}>Save Changes</Text>
        </TouchableOpacity>
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
  content: { padding: hs(16) },
  box: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md },
  field: { paddingHorizontal: hs(16), paddingVertical: vs(12) },
  label: { color: colors.textMute, marginBottom: 6 },
  input: { color: colors.text, fontSize: ms(14) },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: colors.border },
  primaryBtn: { marginTop: vs(16), backgroundColor: colors.accent, borderRadius: radius.lg, paddingVertical: vs(14), alignItems: 'center' },
  primaryTxt: { color: '#fff', fontWeight: '700' },
});
