import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { colors, radius } from '../../utils/theme';
import { horizontalScale as hs, verticalScale as vs, moderateScale as ms, verticalScale } from '../../utils/dimensions';

const InfoRow = ({ label, value }) => (
  <View style={styles.field}> 
    <Text style={styles.label}>{label}</Text>
    <View style={styles.roInput}><Text style={styles.roText}>{value}</Text></View>
  </View>
);

export default function SettingsPersonalInfoScreen({ navigation }) {
  return (
    <View style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}><Text style={styles.backTxt}>{'<'}</Text></TouchableOpacity>
        <Text style={styles.headerTitle}>Personal information</Text>
        <View style={{ width: ms(36) }} />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.box}>
          <InfoRow label="Full Name" value="Nick Ribeiro" />
          <View style={styles.divider} />
          <InfoRow label="Club Name" value="Fenway Golf club" />
          <View style={styles.divider} />
          <View style={styles.double}>
            <View style={{ flex: 1, marginRight: hs(6) }}>
              <InfoRow label="GHIN Number" value="2618156" />
            </View>
            <View style={{ flex: 1, marginLeft: hs(6) }}>
              <InfoRow label="Handicap Index" value="6.7" />
            </View>
          </View>
          <View style={styles.divider} />
          <InfoRow label="Email" value="nickribeiro@gmail.com" />
          <View style={styles.divider} />
          <View style={styles.double}>
            <View style={{ flex: 1, marginRight: hs(6) }}>
              <InfoRow label="Country" value="USA" />
            </View>
            <View style={{ flex: 1, marginLeft: hs(6) }}>
              <InfoRow label="City" value="Kansas" />
            </View>
          </View>
          <View style={styles.divider} />
          <InfoRow label="Date of Birth" value="" />
          <View style={styles.divider} />
          <View style={styles.genderRow}>
            <Text style={styles.label}>Gender</Text>
            <View style={styles.genderChips}>
              <View style={[styles.chip, styles.chipActive]}><Text style={[styles.chipTxt, styles.chipTxtActive]}>Male</Text></View>
              <View style={styles.chip}><Text style={styles.chipTxt}>Female</Text></View>
            </View>
          </View>
          <View style={styles.divider} />
          <InfoRow label="Address" value="1552 Schuylkill Ave Reading" />
        </View>
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
  roInput: { backgroundColor: '#F5F1ED', borderRadius: radius.md, paddingVertical: vs(10), paddingHorizontal: hs(12) },
  roText: { color: colors.text },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: colors.border },
  double: { paddingHorizontal: hs(16), paddingVertical: vs(12), flexDirection: 'row' },
  genderRow: { paddingHorizontal: hs(16), paddingVertical: vs(12) },
  genderChips: { flexDirection: 'row' },
  chip: { borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, paddingVertical: 6, paddingHorizontal: 12, marginRight: hs(8), backgroundColor: colors.surface },
  chipActive: { backgroundColor: '#F5F1ED', borderColor: '#E1D6CE' },
  chipTxt: { color: colors.text },
  chipTxtActive: { fontWeight: '700', color: colors.text },
});
