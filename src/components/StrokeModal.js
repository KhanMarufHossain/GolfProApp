import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { horizontalScale, verticalScale, moderateScale } from '../utils/dimensions';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function StrokeModal({ visible, onClose, onSave }) {
  const insets = useSafeAreaInsets();
  const [userLocationSet, setUserLocationSet] = useState(false);
  const [targetLocationSet, setTargetLocationSet] = useState(false);

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={[styles.sheet, { paddingBottom: insets.bottom + verticalScale(16) }]}>
          <Text style={styles.title}>Stroke 1</Text>

          <Text style={styles.label}>Set User Location</Text>
          <TouchableOpacity style={styles.primaryBtn} onPress={() => setUserLocationSet(true)}>
            <Text style={styles.primaryBtnTxt}>⚪ Set Location</Text>
          </TouchableOpacity>

          <Text style={[styles.label, { marginTop: verticalScale(12) }]}>Set Target Location</Text>
          <TouchableOpacity style={styles.primaryBtn} onPress={() => setTargetLocationSet(true)}>
            <Text style={styles.primaryBtnTxt}>⚪ Set Location</Text>
          </TouchableOpacity>

          <View style={styles.footerRow}>
            <TouchableOpacity style={styles.ghostBtn} onPress={onClose}><Text style={styles.ghostTxt}>{'<'}</Text></TouchableOpacity>
            <TouchableOpacity style={styles.dangerBtn}><Text style={styles.dangerTxt}>Delete</Text></TouchableOpacity>
            <TouchableOpacity style={styles.primaryAction} onPress={() => { onSave && onSave({ type: 'stroke', userLocationSet, targetLocationSet }); onClose(); }}>
              <Text style={styles.primaryActionTxt}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.25)' },
  sheet: { backgroundColor: '#fff', borderTopLeftRadius: moderateScale(18), borderTopRightRadius: moderateScale(18), paddingHorizontal: horizontalScale(20), paddingTop: verticalScale(14) },
  title: { fontSize: moderateScale(18), fontWeight: '800', marginBottom: verticalScale(12) },
  label: { fontWeight: '700', color: '#111', marginBottom: verticalScale(8) },
  primaryBtn: { backgroundColor: '#8B5C2A', paddingVertical: verticalScale(12), borderRadius: moderateScale(10), alignItems: 'center' },
  primaryBtnTxt: { color: '#fff', fontWeight: '700' },
  footerRow: { flexDirection: 'row', alignItems: 'center', marginTop: verticalScale(18), justifyContent: 'space-between' },
  ghostBtn: { width: horizontalScale(44), height: horizontalScale(44), borderRadius: horizontalScale(22), backgroundColor: '#F3EDE8', alignItems: 'center', justifyContent: 'center' },
  ghostTxt: { fontSize: moderateScale(20), color: '#8B5C2A', fontWeight: '700' },
  dangerBtn: { backgroundColor: '#FCE8E8', paddingHorizontal: horizontalScale(18), paddingVertical: verticalScale(12), borderRadius: moderateScale(10) },
  dangerTxt: { color: '#E05A5A', fontWeight: '700' },
  primaryAction: { backgroundColor: '#8B5C2A', paddingHorizontal: horizontalScale(20), paddingVertical: verticalScale(12), borderRadius: moderateScale(10) },
  primaryActionTxt: { color: '#fff', fontWeight: '800' },
});
