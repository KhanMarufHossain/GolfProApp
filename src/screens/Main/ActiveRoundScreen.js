import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { horizontalScale, verticalScale, moderateScale } from '../../utils/dimensions';
import Svg, { Path } from 'react-native-svg';

// Placeholder for the target icon, assuming Frame 2147226375.svg is this.
// In a real app, this would be a proper SVG component.
const TargetIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <Path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </Svg>
);

// Placeholder for the list/scorecard icon.
const ListIcon = () => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <Path d="M8 6H21" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <Path d="M8 12H21" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <Path d="M8 18H21" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <Path d="M3 6H3.01" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <Path d="M3 12H3.01" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <Path d="M3 18H3.01" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>
);


export default function ActiveRoundScreen({ route, navigation }) {
  // Backend-ready data structure
  const mockRound = {
    course: {
      name: 'Mock Golf Club',
      image: require('../../../assets/coursePreviewimage.png'),
    },
    hole: {
      number: 1,
      par: 3,
      handicap: 9,
      length: 156,
      featureName: 'Mid Green',
      tee: { x: 0.5, y: 0.92 },
      pin: { x: 0.58, y: 0.08 },
    },
    players: [
      {
        id: 'p1',
        name: 'John Blake',
        avatar: require('../../../assets/man.png'),
        shots: [
          { id: 's1', from: { x: 0.5, y: 0.92 }, to: { x: 0.45, y: 0.4 }, distance: 167 },
          { id: 's2', from: { x: 0.45, y: 0.4 }, to: { x: 0.48, y: 0.25 }, distance: 25 },
        ],
        currentShot: { x: 0.48, y: 0.25 },
      },
    ],
    distanceMarkers: [
      { id: 'm1', label: '115y', pos: { x: 0.42, y: 0.62 } },
      { id: 'm2', label: '67y', pos: { x: 0.65, y: 0.2 } },
      { id: 'm3', label: '167y', pos: { x: 0.4, y: 0.8 } },
      { id: 'm4', label: '25y', pos: { x: 0.4, y: 0.3 } },
    ],
  };

  const round = route?.params?.round || mockRound;
  const { hole = mockRound.hole, players = mockRound.players, distanceMarkers = mockRound.distanceMarkers } = round;

  // Safe image source with fallback
  const imageSource = round?.course?.image || mockRound.course.image;

  const [containerLayout, setContainerLayout] = useState({ width: 1, height: 1, x: 0, y: 0 });

  const onContainerLayout = (e) => setContainerLayout(e.nativeEvent.layout);

  const pixelPos = (rel) => ({
    x: (rel?.x ?? 0) * containerLayout.width,
    y: (rel?.y ?? 0) * containerLayout.height,
  });

  const lineStyle = (a, b) => {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const length = Math.sqrt(dx * dx + dy * dy);
    const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
    return { width: length, transform: [{ rotate: `${angle}deg` }], left: a.x, top: a.y };
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.screen}>
        {/* Map Area */}
        <View style={styles.previewWrap} onLayout={onContainerLayout}>
          <View style={styles.rotatedFrame} />
          <Image source={imageSource} style={styles.field} resizeMode="cover" />

          {/* Player Shots and Markers */}
          {(players || []).map(player =>
            (player.shots || []).map(shot => (
              <View key={shot.id} style={[styles.lineWrapper, lineStyle(pixelPos(shot.from), pixelPos(shot.to))]} >
                 <View style={styles.line} />
              </View>
            ))
          )}

          {(players || []).map(player => (
             <View key={player.id} style={[styles.playerMarker, { left: pixelPos(player.currentShot).x - 25, top: pixelPos(player.currentShot).y - 25 }]}>
                <Image source={player.avatar} style={styles.playerAvatar} />
                <View style={styles.playerNameChip}><Text style={styles.playerName}>{player.name}</Text></View>
             </View>
          ))}
          
          {(distanceMarkers || []).map(m => (
            <View key={m.id} style={[styles.markerCircle, { left: pixelPos(m.pos).x - 22, top: pixelPos(m.pos).y - 22 }]}>
              <Text style={styles.markerLabelText}>{m.label}</Text>
            </View>
          ))}

          <View style={styles.crosshair}>
            <View style={styles.crosshairCircle}><View style={styles.crosshairDot} /></View>
          </View>
        </View>

        {/* Top Bar */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backBtnTxt}>{'<'}</Text>
        </TouchableOpacity>
        <View style={styles.topPillWrap}>
          <View style={styles.topPill}>
            <Text style={styles.holeNumberText}>{hole?.number || 1}</Text>
            <View style={styles.topInnerDark}>
              <View style={styles.detailGrid}>
                <View style={styles.detailCol}><Text style={styles.detailHeader}>Mid Green</Text><Text style={styles.detailValue}>{hole?.length || 156}yds</Text></View>
                <View style={styles.detailCol}><Text style={styles.detailHeader}>Par</Text><Text style={styles.detailValue}>{hole?.par || 3}</Text></View>
                <View style={styles.detailCol}><Text style={styles.detailHeader}>Handicap</Text><Text style={styles.detailValue}>{hole?.handicap || 9}</Text></View>
              </View>
              <Text style={styles.downArrow}>▼</Text>
            </View>
          </View>
        </View>

        {/* Bottom Bar */}
        <View style={styles.bottomBar}>
            <View style={styles.actionBtnRow}>
                <TouchableOpacity style={styles.actionBtn}><Text style={styles.actionBtnText}>+ Stroke 1</Text></TouchableOpacity>
                <TouchableOpacity style={styles.actionBtn}><Text style={styles.actionBtnText}>+ Putt</Text></TouchableOpacity>
                <TouchableOpacity style={styles.actionBtn}><Text style={styles.actionBtnText}>Hole Out</Text></TouchableOpacity>
            </View>
            <View style={styles.navRow}>
                <TouchableOpacity style={styles.iconBtn}><ListIcon /></TouchableOpacity>
                <View style={styles.holeNav}>
                    <TouchableOpacity style={styles.smallBtn}><Text style={styles.smallBtnTxt}>{'<'}</Text></TouchableOpacity>
                    <View style={styles.centerBtn}><Text style={styles.centerBtnTxt}>Hole {hole?.number || 1}</Text></View>
                    <TouchableOpacity style={styles.smallBtn}><Text style={styles.smallBtnTxt}>{'>'}</Text></TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.iconBtn}><TargetIcon /></TouchableOpacity>
            </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  screen: { flex: 1, backgroundColor: '#fff' },
  previewWrap: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  rotatedFrame: { position: 'absolute', width: '88%', height: '80%', borderWidth: 2, borderColor: '#007AFF', transform: [{ rotate: '-12deg' }], borderRadius: 20 },
  field: { width: '86%', height: '78%', transform: [{ rotate: '-12deg' }], borderRadius: 20 },
  
  backBtn: { position: 'absolute', top: verticalScale(50), left: horizontalScale(20), width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center', zIndex: 100 },
  backBtnTxt: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  
  topPillWrap: { position: 'absolute', top: verticalScale(50), left: horizontalScale(75), zIndex: 90 },
  topPill: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(229, 229, 231, 0.8)', borderRadius: 12, paddingLeft: 15, paddingRight: 5, paddingVertical: 5, height: 55 },
  holeNumberText: { fontSize: 32, fontWeight: 'bold', color: '#000', marginRight: 10 },
  topInnerDark: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(60, 60, 61, 0.8)', borderRadius: 10, paddingVertical: 5, paddingHorizontal: 12, height: '100%' },
  detailGrid: { flexDirection: 'row' },
  detailCol: { alignItems: 'center', marginHorizontal: 8 },
  detailHeader: { color: 'rgba(255,255,255,0.7)', fontSize: 11, marginBottom: 2 },
  detailValue: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
  downArrow: { color: '#fff', fontSize: 10, marginLeft: 5, transform: [{ scaleY: 0.6 }] },

  crosshair: { position: 'absolute', left: '50%', top: '40%', width: 80, height: 80, alignItems: 'center', justifyContent: 'center', zIndex: 20 },
  crosshairCircle: { width: 60, height: 60, borderRadius: 30, borderWidth: 1, borderColor: 'rgba(255,255,255,0.9)', justifyContent: 'center', alignItems: 'center' },
  crosshairDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.9)' },
  
  lineWrapper: { position: 'absolute', zIndex: 15, transformOrigin: '0 0' },
  line: { width: '100%', height: 2, backgroundColor: 'rgba(255, 255, 255, 0.8)' },

  markerCircle: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center', position: 'absolute', zIndex: 30 },
  markerLabelText: { color: '#fff', fontWeight: 'bold', fontSize: 12 },

  playerMarker: { position: 'absolute', zIndex: 31, alignItems: 'center' },
  playerAvatar: { width: 40, height: 40, borderRadius: 20, borderWidth: 2, borderColor: '#fff' },
  playerNameChip: { backgroundColor: '#8B5C2A', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, marginTop: 4 },
  playerName: { color: '#fff', fontSize: 12 },

  bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, paddingBottom: verticalScale(20), paddingTop: verticalScale(10), backgroundColor: '#fff' },
  actionBtnRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: verticalScale(15), paddingHorizontal: horizontalScale(20) },
  actionBtn: { backgroundColor: '#8B5C2A', paddingVertical: verticalScale(12), paddingHorizontal: horizontalScale(16), borderRadius: 12 },
  actionBtnText: { color: '#fff', fontWeight: '600', fontSize: 16 },
  navRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: horizontalScale(20) },
  iconBtn: { padding: 8, backgroundColor: '#f0f0f0', borderRadius: 20 },
  holeNav: { flexDirection: 'row', alignItems: 'center' },
  smallBtn: { backgroundColor: '#3C3C3D', width: 50, height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginHorizontal: 5 },
  smallBtnTxt: { fontSize: 20, color: '#fff', fontWeight: 'bold' },
  centerBtn: { backgroundColor: '#E5E5E7', minWidth: 120, paddingHorizontal: 15, height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  centerBtnTxt: { fontWeight: 'bold', color: '#000', fontSize: 14 },
});
