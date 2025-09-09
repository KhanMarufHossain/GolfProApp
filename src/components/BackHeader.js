import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { horizontalScale, verticalScale, moderateScale } from '../utils/dimensions';
import { useNavigation } from '@react-navigation/native';

// You can swap this for an SVG or vector icon if you prefer
function BackArrow() {
  return (
    <Text style={styles.arrow}>{'\u2039'}</Text> // Unicode single left-pointing angle quotation mark
  );
}

export default function BackHeader({ title, onBack, style }) {
  const navigation = useNavigation();
  return (
    <View style={[styles.header, style]}>
      <TouchableOpacity style={styles.backBtn} onPress={onBack || navigation.goBack}>
        <BackArrow />
      </TouchableOpacity>
      <View style={styles.titleWrap}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.rightSpace} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: horizontalScale(16),
    paddingTop: verticalScale(12),
    paddingBottom: verticalScale(12),
    backgroundColor: '#fff',
  },
  backBtn: {
    width: horizontalScale(32),
    height: horizontalScale(32),
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrow: {
    fontSize: moderateScale(22),
    color: '#222',
    fontWeight: '400',
  },
  titleWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: moderateScale(18),
    fontWeight: '700',
    color: '#222',
  },
  rightSpace: {
    width: horizontalScale(32), // to balance the backBtn
  },
});
