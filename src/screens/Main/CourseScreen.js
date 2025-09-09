import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  horizontalScale,
  verticalScale,
  moderateScale,
} from "../../utils/dimensions";

/*
  CourseScreen is backend-ready. It accepts a `route.params.course` object with common keys:
  {
    id,
    name || title,
    image: { uri } | require(...),
    isPublic: boolean,
    rank: number,
    lengthYards: number,
    rating: number,
    slope: number,
    holes: number,
  }

  Falls back to sensible defaults when fields are missing.
*/
export default function CourseScreen({ navigation, route }) {
  const course = route?.params?.course || {};
  const {
    image = require("../../../assets/golfField.png"),
    name = course.title || course.name || "Course Name",
    isPublic = course.isPublic ?? true,
    rank = course.rank || 1,
    lengthYards = course.lengthYards || course.length || 6599,
    rating = course.rating || 70.4,
    slope = course.slope || 115,
    holes = course.holes || 9,
  } = course;

  // Get device width and status bar height for full-bleed hero
  const { width } = Dimensions.get("window");
  const statusBarHeight = Platform.OS === "android" ? StatusBar.currentHeight || 0 : 0;
  const HERO_HEIGHT = verticalScale(260) + statusBarHeight;
  const MASK_HEIGHT = verticalScale(40);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Full-bleed hero image absolutely positioned at top */}
      <View style={[styles.heroAbsoluteWrap, { width, height: HERO_HEIGHT }]}>
        <Image
          source={image}
          style={[styles.heroAbsolute, { width, height: HERO_HEIGHT }]}
          resizeMode="cover"
        />
        {/* Overlays */}
        <TouchableOpacity
          style={styles.backBtnAbs}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backTxt}>{'<'}</Text>
        </TouchableOpacity>
        {isPublic && (
          <View style={styles.publicBadgeAbs}>
            <Text style={styles.publicTxt}>Public</Text>
          </View>
        )}
        <View style={styles.avatarRowAbs}>
          <Image
            source={require("../../../assets/man.png")}
            style={styles.smallAvatar}
          />
          <View style={styles.avatarStack}>
            <View style={[styles.dotAvatar, { backgroundColor: "#F2C94C" }]}>
              <Text style={styles.avatarInitial}>G</Text>
            </View>
            <View
              style={[
                styles.dotAvatar,
                { backgroundColor: "#D17AEE", marginLeft: -8 },
              ]}
            >
              <Text style={styles.avatarInitial}>N</Text>
            </View>
          </View>
        </View>
        {/* Bottom rounded mask */}
        <View style={[styles.heroBottomMask, { width }]} />
      </View>

      {/* Main content below hero - overlap the hero with rounded top */}
      <SafeAreaView style={styles.safe}>
        <View style={[styles.contentCard, { marginTop: HERO_HEIGHT - MASK_HEIGHT }]}> 
          {/* DETAIL HEADER: location, name, rank */}
          <View style={styles.headerRow}>
            <View style={{ flex: 1 }}>
              <View style={styles.locationRow}>
                <Image source={require('../../../assets/location.png')} style={styles.locationIcon} />
                <Text style={styles.locationLabel}>Palm Hill Golf Club</Text>
              </View>
              <Text style={styles.courseName}>{name}</Text>
            </View>
            <View style={styles.rankWrap}>
              <Text style={styles.rankNum}>#{rank}</Text>
              <Text style={styles.rankSub}>Rank by World Record</Text>
            </View>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Length</Text>
              <Text style={styles.statValue}>{lengthYards} yds</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Rating/Slope</Text>
              <Text style={styles.statValue}>
                {rating}/{slope}
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Holes</Text>
              <Text style={styles.statValue}>{holes} Hole</Text>
            </View>
          </View>

          {/* ACTIONS */}
          <View style={styles.actionsRow}>
            <TouchableOpacity
              style={styles.smallAction}
              onPress={() => navigation.navigate('CoursePreview', { course })}
            >
              <Image source={require('../../../assets/coursepreview.png')} style={styles.actionIcon} />
              <Text style={styles.smallActionTxt}>Course Preview</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.smallAction}
              onPress={() => navigation.navigate('AddPlayer', { course })}
            >
              <Image source={require('../../../assets/addplayer.png')} style={styles.actionIcon} />
              <Text style={styles.smallActionTxt}>Add Player</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.startBtn}
            onPress={() => {
              /* TODO: start round flow */
            }}
          >
            <Image source={require('../../../assets/startround.png')} style={styles.startIcon} />
            <Text style={styles.startTxt}>Start Round</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  container: { flex: 1, paddingHorizontal: horizontalScale(20), paddingTop: 0 },
  contentCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: moderateScale(24),
    borderTopRightRadius: moderateScale(24),
    paddingHorizontal: horizontalScale(20),
    paddingTop: verticalScale(18),
    zIndex: 5,
  },
  heroAbsoluteWrap: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 10,
    overflow: "visible",
  },
  heroAbsolute: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  heroBottomMask: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -1,
    backgroundColor: '#fff',
    borderTopLeftRadius: moderateScale(24),
    borderTopRightRadius: moderateScale(24),
    zIndex: 20,
  },
  // overlays for absolute hero
  backBtnAbs: {
    position: 'absolute',
    left: horizontalScale(12),
    top: verticalScale(28),
    width: horizontalScale(36),
    height: horizontalScale(36),
    borderRadius: horizontalScale(18),
    backgroundColor: '#F3E3D6',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 30,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  publicBadgeAbs: {
    position: 'absolute',
    left: horizontalScale(12),
    bottom: verticalScale(20),
    backgroundColor: '#fff',
    paddingHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(6),
    borderRadius: moderateScale(12),
    zIndex: 30,
  },
  avatarRowAbs: {
    position: 'absolute',
    right: horizontalScale(12),
    top: verticalScale(28),
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 30,
  },
  backTxt: { fontSize: moderateScale(26), fontWeight: '900', color: '#8B5C2A', lineHeight: moderateScale(28) },
  publicTxt: { color: "#2B2540", fontWeight: "600" },
  smallAvatar: {
    width: moderateScale(36),
    height: moderateScale(36),
    borderRadius: moderateScale(18),
    borderWidth: 2,
    borderColor: "#fff",
  },
  avatarStack: {
    marginLeft: horizontalScale(8),
    flexDirection: "row",
    alignItems: "center",
  },
  dotAvatar: {
    width: moderateScale(28),
    height: moderateScale(28),
    borderRadius: moderateScale(14),
    justifyContent: "center",
    alignItems: "center",
  },
  avatarInitial: { color: "#fff", fontWeight: "700" },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(8),
  },
  locationRow: { flexDirection: 'row', alignItems: 'center', marginBottom: verticalScale(6) },
  locationIcon: { width: moderateScale(16), height: moderateScale(16), marginRight: horizontalScale(6), tintColor: '#888' },
  locationLabel: { color: '#888' },
  courseName: { fontSize: moderateScale(28), fontWeight: "800", color: "#111" },
  rankWrap: { alignItems: "center", marginLeft: horizontalScale(12) },
  rankNum: { fontSize: moderateScale(28), fontWeight: "800", color: "#B5602E" },
  rankSub: { fontSize: moderateScale(10), color: "#B5602E" },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: verticalScale(16),
  },
  statItem: { flex: 1, alignItems: "flex-start" },
  statLabel: { color: "#888", marginBottom: verticalScale(6) },
  statValue: { fontWeight: "700", fontSize: moderateScale(14) },

  actionsRow: {
    flexDirection: "row",
    marginTop: verticalScale(18),
    justifyContent: "space-between",
  },
  smallAction: {
    flex: 1,
    backgroundColor: "#F5EDE8",
    paddingVertical: verticalScale(12),
    borderRadius: moderateScale(10),
    alignItems: "center",
    marginRight: horizontalScale(10),
  },
  actionIcon: { width: moderateScale(18), height: moderateScale(18), marginBottom: verticalScale(6), tintColor: '#8B5C2A' },
  smallActionTxt: { color: "#8B5C2A", fontWeight: "700" },

  startBtn: {
    marginTop: verticalScale(18),
    backgroundColor: "#8B5C2A",
    paddingVertical: verticalScale(14),
    borderRadius: moderateScale(12),
    alignItems: "center",
  },
  startIcon: { width: moderateScale(18), height: moderateScale(18), marginBottom: verticalScale(6), tintColor: '#fff' },
  startTxt: { color: '#fff', fontWeight: '700' },
});
