import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, SafeAreaView, ScrollView } from 'react-native';
import { colors, radius } from '../../utils/theme';
import { horizontalScale as hs, verticalScale as vs, moderateScale as ms } from '../../utils/dimensions';

export default function SettingsPhoneScreen({ navigation }) {
  const [phone, setPhone] = useState('+1 555 123 4567');
  const [email, setEmail] = useState('nick@example.com');
  const [verified, setVerified] = useState({ phone: true, email: false });

  const Row = ({ label, value, onChangeText, right }) => (
    <View style={styles.row}>
      <View style={{ flex: 1 }}>
        <Text style={styles.label}>{label}</Text>
        <TextInput style={styles.input} value={value} onChangeText={onChangeText} />
      </View>
      {right}
    </View>
  );

  const Badge = ({ ok }) => (
    <View style={[styles.badge, { backgroundColor: ok ? '#E8F5E9' : '#FFF4E5', borderColor: ok ? '#A5D6A7' : '#FFCC80' }]}>
      <Text style={{ color: ok ? '#2E7D32' : '#E65100', fontWeight: '700' }}>{ok ? 'Verified' : 'Pending'}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}><Text style={styles.backIcon}>{'<'}</Text></TouchableOpacity>
        <Text style={styles.title}>Phone & Email</Text>
        <View style={{ width: hs(40) }} />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.box}>
          <Row label="Phone" value={phone} onChangeText={setPhone} right={<Badge ok={verified.phone} />} />
          <View style={styles.divider} />
          <Row label="Email" value={email} onChangeText={setEmail} right={<Badge ok={verified.email} />} />
        </View>
        <View style={{ flexDirection: 'row', marginTop: vs(16) }}>
          <TouchableOpacity style={[styles.button, { backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1 }]}> 
            <Text style={[styles.btnTxt, { color: colors.text }]}>Send Verification</Text>
          </TouchableOpacity>
          <View style={{ width: hs(12) }} />
          <TouchableOpacity style={[styles.button, { backgroundColor: colors.accent }]}>
            <Text style={[styles.btnTxt, { color: '#fff' }]}>Save</Text>
          </TouchableOpacity>
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
  content: { padding: hs(16) },
  box: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: hs(16), paddingVertical: vs(12) },
  label: { color: colors.textMute, marginBottom: 6 },
  input: { color: colors.text, fontSize: ms(14), minWidth: hs(160) },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: colors.border },
  button: { flex: 1, borderRadius: radius.lg, paddingVertical: vs(14), alignItems: 'center' },
  btnTxt: { fontWeight: '700' },
  badge: { paddingVertical: 6, paddingHorizontal: 10, borderRadius: radius.lg, borderWidth: 1 },
});
