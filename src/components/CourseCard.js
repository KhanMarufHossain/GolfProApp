import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { horizontalScale, verticalScale, moderateScale } from '../utils/dimensions';

export default function CourseCard({ onPress, course = {} }) {
  const {
    image = require('../../assets/golfField.png'),
    title = course.name || 'Untitled Course',
    holes = course.holes || course.holesCount || 9,
    distance = course.distance || course.distanceText || '—',
    location = course.location || course.clubName || 'Unknown',
  } = course;

  // image can be a remote uri object { uri } or a local require number
  const imageSource = image;

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.85} onPress={onPress}>
      <View style={styles.imageWrap}>
        <Image source={imageSource} style={styles.image} resizeMode="cover" />
      </View>
      <View style={styles.body}>
        <Text style={styles.meta}>{holes} Holes · {distance}</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.loc}>{location}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: moderateScale(12),
    overflow: 'hidden',
  marginBottom: verticalScale(18),
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: moderateScale(6),
    elevation: 2,
  },
  imageWrap: {
    width: '100%',
    height: verticalScale(140),
    backgroundColor: '#eee',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: moderateScale(12),
    borderTopRightRadius: moderateScale(12),
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
    marginTop: verticalScale(2),
  },
  loc: {
    color: '#888',
    marginTop: verticalScale(6),
  },
});
