import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { horizontalScale, verticalScale, moderateScale } from '../../../utils/dimensions';
// Note: we'll use the same back button style used in AddPlayerScreen for pixel match

export default function CoursePreviewScreen({ route, navigation }) {
  const routeCourse = route?.params?.course;
  const initialIndex = route?.params?.initialHoleIndex || 0;

  const mockCourse = {
    id: 'mock-1',
    name: 'Mock Golf Club',
    image: require('../../../../assets/golfField.png'),
    holes: [
      {
        number: 1,
        par: 3,
        handicap: 9,
        length: 156,
        tee: { x: 0.5, y: 0.92 },
        layup: { x: 0.5, y: 0.55 },
        pin: { x: 0.58, y: 0.08 },
        markers: [
          { id: 'm1', label: '115y', pos: { x: 0.42, y: 0.62 } },
          { id: 'm2', label: '67y', pos: { x: 0.65, y: 0.2 } },
        ],
      },
    ],
  };

  const course = routeCourse || mockCourse;
  const holes = course.holes || [];
  const [holeIndex, setHoleIndex] = useState(Math.max(0, Math.min(initialIndex, holes.length - 1)));
  const hole = holes[holeIndex] || {};

  // layout of the image container to convert percentage positions to pixel coordinates
  const [containerLayout, setContainerLayout] = useState({ width: 1, height: 1, x: 0, y: 0 });

  function onContainerLayout(e) {
    setContainerLayout(e.nativeEvent.layout);
  }

  // compute pixel position for a relative point
  function pixelPos(rel) {
    const { width, height } = containerLayout;
    return {
      x: rel?.x != null ? rel.x * width : 0,
      y: rel?.y != null ? rel.y * height : 0,
    };
  }

  // helpers for previous / next
  function prevHole() {
    setHoleIndex((i) => Math.max(0, i - 1));
  }
  function nextHole() {
    setHoleIndex((i) => Math.min(holes.length - 1, i + 1));
  }

  const imageSource = course.image || require('../../../../assets/golfField.png');

  const teePx = pixelPos(hole.tee);
  const pinPx = pixelPos(hole.pin);

  // simple line style calculations (distance and angle)
  function lineStyle(a, b) {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const length = Math.sqrt(dx * dx + dy * dy) || 0;
    const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
    return { width: length, transform: [{ rotate: `${angle}deg` }] };
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.screen}>
        <View style={styles.previewWrap} onLayout={onContainerLayout}>
          <View style={styles.rotatedFrame} pointerEvents="none" />
          <Image source={imageSource} style={styles.field} resizeMode="cover" />

          {hole.tee && hole.pin && (
            <View
              style={[styles.routeLine, lineStyle(teePx, pinPx)]}
              pointerEvents="none"
            />
          )}

          <View style={styles.crosshair} pointerEvents="none">
            <View style={styles.crossCircle}>
              <View style={styles.crosshairDot} />
            </View>
          </View>

          {(hole.markers || []).map((m) => {
            const px = pixelPos(m.pos || { x: 0.5, y: 0.5 });
            return (
              <View key={m.id} style={[styles.markerCircle, { left: px.x - 22, top: px.y - 22 }]}>
                <Text style={styles.markerLabelText}>{m.label}</Text>
              </View>
            );
          })}
        </View>

        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBackBtn}>
          <Text style={styles.headerBackTxt}>{'<'}</Text>
        </TouchableOpacity>

        <View style={styles.topPillWrap} pointerEvents="box-none">
          <View style={styles.topPill}>
            <Text style={styles.holeNumberText}>{hole.number || 1}</Text>
            <View style={styles.topInnerDark}>
              <View style={styles.detailGrid}>
                <View style={styles.detailCol}>
                  <Text style={styles.detailHeader}>Mid Green</Text>
                  <Text style={styles.detailValue}>{hole.length}yds</Text>
                </View>
                <View style={styles.detailCol}>
                  <Text style={styles.detailHeader}>Par</Text>
                  <Text style={styles.detailValue}>{hole.par}</Text>
                </View>
                <View style={styles.detailCol}>
                  <Text style={styles.detailHeader}>Handicap</Text>
                  <Text style={styles.detailValue}>{hole.handicap}</Text>
                </View>
              </View>
              <Text style={styles.downArrow}>▼</Text>
            </View>
          </View>
        </View>

        <View style={styles.bottomPillWrap}>
          <View style={styles.bottomRow}>
            <TouchableOpacity onPress={prevHole} style={styles.smallBtn}><Text style={styles.smallBtnTxt}>{'<'}</Text></TouchableOpacity>
            <View style={styles.centerBtn}><Text style={styles.centerBtnTxt}>Hole {hole.number || 1}</Text></View>
            <TouchableOpacity onPress={nextHole} style={styles.smallBtn}><Text style={styles.smallBtnTxt}>{'>'}</Text></TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  screen: { flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' },
  headerBackBtn: {
    position: 'absolute',
    top: verticalScale(50),
    left: horizontalScale(20),
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  headerBackTxt: { fontSize: moderateScale(24), color: '#fff', fontWeight: 'bold' },

  topPillWrap: {
    position: 'absolute',
    top: verticalScale(50),
    left: horizontalScale(75),
    zIndex: 90,
  },
  topPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(229, 229, 231, 0.75)',
    borderRadius: moderateScale(12),
    paddingLeft: horizontalScale(15),
    paddingRight: horizontalScale(5),
    paddingVertical: verticalScale(5),
    height: verticalScale(55),
  },
  holeNumberText: {
    fontSize: moderateScale(32),
    fontWeight: 'bold',
    color: '#000',
    marginRight: horizontalScale(10),
  },
  topInnerDark: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(60, 60, 61, 0.75)',
    borderRadius: moderateScale(10),
    paddingVertical: verticalScale(5),
    paddingHorizontal: horizontalScale(12),
    height: '100%',
  },
  detailGrid: {
    flexDirection: 'row',
  },
  detailCol: {
    alignItems: 'center',
    marginHorizontal: horizontalScale(8),
  },
  detailHeader: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: moderateScale(11),
    marginBottom: verticalScale(2),
  },
  detailValue: {
    color: '#fff',
    fontSize: moderateScale(14),
    fontWeight: 'bold',
  },
  downArrow: {
    color: '#fff',
    fontSize: moderateScale(10),
    marginLeft: horizontalScale(5),
    transform: [{ scaleY: 0.6 }],
  },

  previewWrap: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rotatedFrame: {
    position: 'absolute',
    width: '88%',
    height: '80%',
    borderWidth: 2,
    borderColor: '#007AFF',
    transform: [{ rotate: '-12deg' }],
    borderRadius: moderateScale(20),
  },
  field: {
    width: '86%',
    height: '78%',
    transform: [{ rotate: '-12deg' }],
    borderRadius: moderateScale(20),
  },

  crosshair: {
    position: 'absolute',
    left: '50%',
    top: '40%',
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 20,
  },
  crossCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  crosshairDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.9)',
  },

  routeLine: {
    position: 'absolute',
    height: 1.6,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    zIndex: 15,
    borderStyle: 'dashed',
    borderColor: 'transparent',
    borderWidth: 1,
    borderRadius: 1,
  },

  markerCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 30,
  },
  markerLabelText: { color: '#fff', fontWeight: 'bold', fontSize: moderateScale(12) },

  bottomPillWrap: { position: 'absolute', bottom: verticalScale(40), zIndex: 40 },
  bottomRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  smallBtn: {
    backgroundColor: 'rgba(60, 60, 61, 0.75)',
    width: horizontalScale(50),
    height: horizontalScale(40),
    borderRadius: moderateScale(10),
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: horizontalScale(5),
  },
  smallBtnTxt: { fontSize: moderateScale(20), color: '#fff', fontWeight: 'bold' },
  centerBtn: {
    backgroundColor: 'rgba(229, 229, 231, 0.75)',
    minWidth: horizontalScale(120),
    paddingHorizontal: horizontalScale(15),
    height: horizontalScale(40),
    borderRadius: moderateScale(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerBtnTxt: { fontWeight: 'bold', color: '#000', fontSize: moderateScale(14) },
});
