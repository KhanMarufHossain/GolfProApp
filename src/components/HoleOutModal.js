import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { horizontalScale, verticalScale, moderateScale } from '../utils/dimensions';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HoleOutModal({ visible, onClose, onSave }) {
  const insets = useSafeAreaInsets();
  const [par, setPar] = useState(1);
  const [score, setScore] = useState(4);
  const [shot, setShot] = useState(4);
  const [putt, setPutt] = useState('-');
  const [penalty, setPenalty] = useState(1);

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={[styles.sheet, { paddingBottom: insets.bottom + verticalScale(16) }]}>
          <Text style={styles.title}>Hole Out With</Text>

          <View style={styles.tableRow}>
            <View style={styles.tableCol}><Text style={styles.colHeader}>Par</Text><Text style={styles.colVal}>{par}</Text></View>
            <View style={styles.tableCol}><Text style={styles.colHeader}>Score</Text><Text style={styles.colVal}>{score}</Text></View>
            <View style={styles.tableCol}><Text style={styles.colHeader}>Shot</Text><Text style={styles.colVal}>{shot}</Text></View>
            <View style={styles.tableCol}><Text style={styles.colHeader}>Putt</Text><Text style={styles.colVal}>{putt}</Text></View>
            <View style={styles.tableCol}><Text style={styles.colHeader}>Penalty</Text><Text style={styles.colVal}>{penalty}</Text></View>
          </View>

          <View style={styles.footerRow}>
            <TouchableOpacity style={styles.ghostBtn} onPress={onClose}><Text style={styles.ghostTxt}>{'<'}</Text></TouchableOpacity>
            <TouchableOpacity style={styles.primaryAction} onPress={() => { onSave && onSave({ type: 'holeout', par, score, shot, putt, penalty }); onClose(); }}>
              <Text style={styles.primaryActionTxt}>Save</Text>
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
  tableRow: { flexDirection: 'row', backgroundColor: '#F5EDE8', borderRadius: moderateScale(10), padding: horizontalScale(10), justifyContent: 'space-between' },
  tableCol: { alignItems: 'center', paddingHorizontal: horizontalScale(6) },
  colHeader: { fontSize: moderateScale(12), color: '#888' },
  colVal: { fontWeight: '800', marginTop: verticalScale(6) },
  footerRow: { flexDirection: 'row', alignItems: 'center', marginTop: verticalScale(18), justifyContent: 'space-between' },
  ghostBtn: { width: horizontalScale(44), height: horizontalScale(44), borderRadius: horizontalScale(22), backgroundColor: '#F3EDE8', alignItems: 'center', justifyContent: 'center' },
  ghostTxt: { fontSize: moderateScale(20), color: '#8B5C2A', fontWeight: '700' },
  primaryAction: { backgroundColor: '#8B5C2A', paddingHorizontal: horizontalScale(20), paddingVertical: verticalScale(12), borderRadius: moderateScale(10) },
  primaryActionTxt: { color: '#fff', fontWeight: '800' },
});
