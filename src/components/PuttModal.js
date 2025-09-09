import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { horizontalScale, verticalScale, moderateScale } from '../utils/dimensions';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function PuttModal({ visible, onClose, onSave }) {
  const insets = useSafeAreaInsets();
  const [flagSet, setFlagSet] = useState(false);
  const [userSet, setUserSet] = useState(false);
  const [distance, setDistance] = useState('159ft');

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={[styles.sheet, { paddingBottom: insets.bottom + verticalScale(16) }]}>
          <Text style={styles.title}>Putt Distance (Ft)</Text>

          <Text style={styles.label}>Set Flag Location</Text>
          <TouchableOpacity style={styles.primaryBtn} onPress={() => setFlagSet(true)}>
            <Text style={styles.primaryBtnTxt}>⚪ Set Location</Text>
          </TouchableOpacity>

          <Text style={[styles.label, { marginTop: verticalScale(12) }]}>Set User Location</Text>
          <TouchableOpacity style={styles.primaryBtn} onPress={() => setUserSet(true)}>
            <Text style={styles.primaryBtnTxt}>⚪ Set Location</Text>
          </TouchableOpacity>

          <Text style={[styles.label, { marginTop: verticalScale(12) }]}>Putt Distance</Text>
          <TextInput style={styles.input} value={distance} onChangeText={setDistance} />

          <View style={styles.footerRow}> 
            <TouchableOpacity style={styles.ghostBtn} onPress={onClose}><Text style={styles.ghostTxt}>{'<'}</Text></TouchableOpacity>
            <TouchableOpacity style={styles.primaryAction} onPress={() => { onSave && onSave({ type: 'putt', flagSet, userSet, distance }); onClose(); }}>
              <Text style={styles.primaryActionTxt}>Continue</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryAction}><Text style={styles.secondaryTxt}>Finish</Text></TouchableOpacity>
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
  input: { backgroundColor: '#F5EDE8', padding: horizontalScale(12), borderRadius: moderateScale(8), marginTop: verticalScale(8) },
  footerRow: { flexDirection: 'row', alignItems: 'center', marginTop: verticalScale(18), justifyContent: 'space-between' },
  ghostBtn: { width: horizontalScale(44), height: horizontalScale(44), borderRadius: horizontalScale(22), backgroundColor: '#F3EDE8', alignItems: 'center', justifyContent: 'center' },
  ghostTxt: { fontSize: moderateScale(20), color: '#8B5C2A', fontWeight: '700' },
  primaryAction: { backgroundColor: '#8B5C2A', paddingHorizontal: horizontalScale(20), paddingVertical: verticalScale(12), borderRadius: moderateScale(10) },
  primaryActionTxt: { color: '#fff', fontWeight: '800' },
  secondaryAction: { backgroundColor: '#F5EDE8', paddingHorizontal: horizontalScale(20), paddingVertical: verticalScale(12), borderRadius: moderateScale(10) },
  secondaryTxt: { color: '#8B5C2A', fontWeight: '700' },
});
