import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { horizontalScale, verticalScale, moderateScale } from '../utils/dimensions';

export default function CourseCard({ onPress, course = {} }) {
  const imageSource = course.image ? course.image : require('../../assets/icon.png');
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.85} onPress={onPress}>
      <Image source={imageSource} style={styles.image} resizeMode="cover" />
      <View style={styles.body}>
        <Text style={styles.meta}>9 Holes · 1.4 miles</Text>
        <Text style={styles.title}>Course name</Text>
        <Text style={styles.loc}>Location</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: moderateScale(12),
    overflow: 'hidden',
    marginBottom: verticalScale(16.24),
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: moderateScale(6),
    elevation: 2,
  },
  image: {
    width: '100%',
    height: verticalScale(140),
    backgroundColor: '#eee',
  },
  body: {
    padding: horizontalScale(12),
  },
  meta: {
    fontSize: moderateScale(12),
    color: '#888',
    marginBottom: verticalScale(6),
  },
  title: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: '#222',
  },
  loc: {
    color: '#888',
    marginTop: verticalScale(6),
  },
});
