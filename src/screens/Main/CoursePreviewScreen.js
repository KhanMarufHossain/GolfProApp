import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { horizontalScale, verticalScale, moderateScale } from '../../utils/dimensions';
// Note: we'll use the same back button style used in AddPlayerScreen for pixel match

/*
  CoursePreviewScreen
  - Designed to be 'backend ready': it accepts a `course` object via `route.params.course`.
  - course.holes is an array of hole objects with optional positional markers as percentages { x: 0..1, y: 0..1 }
  - If route params are missing, the screen falls back to sensible mock data so the UI can be previewed.

  Minimal hole shape expected by UI:
  {
    number: 1,
    par: 3,
    handicap: 9,
    length: 156, // yards
    tee: { x: 0.5, y: 0.95 },
    pin: { x: 0.55, y: 0.06 },
    layup: { x: 0.48, y: 0.45 },
  }
*/

export default function CoursePreviewScreen({ route, navigation }) {
  // backend-ready: accept course and initialHoleIndex via navigation params
  const routeCourse = route?.params?.course;
  const initialIndex = route?.params?.initialHoleIndex || 0;

  const mockCourse = {
    id: 'mock-1',
    name: 'Mock Golf Club',
    image: require('../../../assets/golfField.png'),
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

  const imageSource = course.image || require('../../../assets/golfField.png');

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
      {/* top header: back button + centered title (matched to AddPlayerScreen) */}
      <View style={styles.headerRow}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.headerBackBtn}
        >
          <Text style={styles.headerBackTxt}>{'<'}</Text>
        </TouchableOpacity>
        <View style={styles.headerTitleWrap} pointerEvents="none">
          <Text style={styles.headerTitle}>Course preview</Text>
        </View>
      </View>

      <View style={styles.screen}>
        {/* Top-left pill with hole summary */}
        <View style={styles.topPillWrap} pointerEvents="box-none">
          <View style={styles.topOuterPill}>
            <View style={styles.holeNumber}><Text style={styles.holeNumberText}>{hole.number || 1}</Text></View>
            <View style={styles.topInnerDark}>
              <Text style={styles.innerTitle}>{hole.featureName || 'Mid Green'}</Text>
              <View style={styles.innerRow}>
                <View style={styles.chip}><Text style={styles.chipText}>{hole.length ? `${hole.length} yds` : '— yds'}</Text></View>
                <View style={styles.chip}><Text style={styles.chipText}>Par {hole.par ?? '—'}</Text></View>
                <View style={styles.chip}><Text style={styles.chipText}>Handicap {hole.handicap ?? '—'}</Text></View>
              </View>
            </View>
          </View>
        </View>

        {/* Rotated course image container */}
        <View style={styles.previewWrap} onLayout={onContainerLayout}>
          {/* blue rotated border */}
          <View style={styles.rotatedFrame} pointerEvents="none" />

          <Image source={imageSource} style={styles.field} resizeMode="cover" />

          {/* crosshair at center of image (example) */}
          <View style={styles.crosshair} pointerEvents="none">
            <View style={styles.crossCircle} />
            <View style={styles.crossLineH} />
            <View style={styles.crossLineV} />
          </View>

          {/* line from tee to pin (simple) */}
          {hole.tee && hole.pin && (
            <View
              style={[styles.routeLine, lineStyle(teePx, pinPx), { left: teePx.x, top: teePx.y }]}
              pointerEvents="none"
            />
          )}

          {/* markers */}
          {(hole.markers || []).map((m) => {
            const px = pixelPos(m.pos || { x: 0.5, y: 0.5 });
            return (
              <View key={m.id} style={[styles.markerWrap, { left: px.x - 18, top: px.y - 18 }]}>
                <View style={styles.markerCircle} />
                <View style={styles.markerLabel}><Text style={styles.markerLabelText}>{m.label}</Text></View>
              </View>
            );
          })}
        </View>

        {/* Bottom center pill with hole navigation */}
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
  screen: { flex: 1, backgroundColor: '#fff' },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: horizontalScale(12),
    paddingTop: verticalScale(10),
    paddingBottom: verticalScale(6),
    zIndex: 60,
  },
  headerBackBtn: {
    width: horizontalScale(36),
    height: horizontalScale(36),
    borderRadius: horizontalScale(18),
    backgroundColor: '#ffffffff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#8e8c8cff',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  headerBackTxt: { fontSize: moderateScale(26), fontWeight: '900', color: '#000', lineHeight: moderateScale(28) },
  headerTitleWrap: { flex: 1, alignItems: 'center', position: 'absolute', left: 0, right: 0 },
  headerTitle: { fontSize: moderateScale(18), fontWeight: '700', color: '#222' },
  topPillWrap: { position: 'absolute', left: horizontalScale(14), top: verticalScale(18), zIndex: 40 },
  topOuterPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingHorizontal: horizontalScale(6),
  },
  topInnerDark: {
    backgroundColor: '#3b3f46',
    paddingHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(8),
    borderRadius: moderateScale(10),
    marginLeft: horizontalScale(6),
    minWidth: horizontalScale(160),
  },
  innerTitle: { color: '#fff', fontWeight: '700', marginBottom: verticalScale(6) },
  innerRow: { flexDirection: 'row', alignItems: 'center' },
  chip: { backgroundColor: 'rgba(255,255,255,0.08)', paddingHorizontal: horizontalScale(8), paddingVertical: verticalScale(4), borderRadius: moderateScale(6), marginRight: horizontalScale(8) },
  chipText: { color: '#fff', fontSize: moderateScale(12) },
  holeNumber: {
    width: moderateScale(36),
    height: moderateScale(36),
    borderRadius: moderateScale(18),
    backgroundColor: '#e6e9eb',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: horizontalScale(8),
  },
  holeNumberText: { fontWeight: '700', fontSize: moderateScale(16), color: '#222' },
  holeMeta: { flexDirection: 'row', alignItems: 'center' },
  metaLine: { marginRight: horizontalScale(8), color: '#fff', backgroundColor: '#4b5563', paddingHorizontal: 6, paddingVertical: 4, borderRadius: 6, color: '#fff', fontSize: moderateScale(12) },

  previewWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: verticalScale(6),
  },
  rotatedFrame: {
    position: 'absolute',
    width: '86%',
    height: '86%',
    borderWidth: 2,
    borderColor: '#2b9cff',
    transform: [{ rotate: '-12deg' }],
    zIndex: 2,
    borderRadius: moderateScale(6),
  },
  field: {
    width: '84%',
    height: verticalScale(620),
    transform: [{ rotate: '-12deg' }],
    borderRadius: moderateScale(8),
    zIndex: 1,
  },

  crosshair: {
    position: 'absolute',
    left: '50%',
    top: '40%',
    marginLeft: -40,
    marginTop: -40,
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 20,
  },
  crossCircle: { position: 'absolute', width: 60, height: 60, borderRadius: 30, borderWidth: 2, borderColor: 'rgba(255,255,255,0.9)' },
  crossLineH: { position: 'absolute', width: 2, height: 80, backgroundColor: 'rgba(255,255,255,0.9)' },
  crossLineV: { position: 'absolute', height: 2, width: 80, backgroundColor: 'rgba(255,255,255,0.9)' },

  routeLine: {
    position: 'absolute',
    height: 1.6,
    backgroundColor: '#ffffff',
    opacity: 0.95,
    zIndex: 15,
  },

  markerWrap: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 30,
  },
  markerCircle: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#1f2937', opacity: 0.95 },
  markerLabel: { position: 'absolute', top: 42, backgroundColor: '#fff', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, elevation: 3 },
  markerLabelText: { color: '#111', fontWeight: '600', fontSize: moderateScale(12) },

  bottomPillWrap: { position: 'absolute', left: 0, right: 0, bottom: verticalScale(18), alignItems: 'center', zIndex: 40 },
  bottomRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  smallBtn: { backgroundColor: '#8e8e93', width: horizontalScale(44), height: horizontalScale(36), borderRadius: moderateScale(8), alignItems: 'center', justifyContent: 'center', marginHorizontal: horizontalScale(8) },
  smallBtnTxt: { fontSize: moderateScale(18), color: '#fff', fontWeight: '700' },
  centerBtn: { backgroundColor: '#e9e9eb', minWidth: horizontalScale(120), paddingHorizontal: horizontalScale(12), paddingVertical: verticalScale(8), borderRadius: moderateScale(12), alignItems: 'center', justifyContent: 'center' },
  centerBtnTxt: { fontWeight: '700', color: '#222' },
});
