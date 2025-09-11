import React, { useState, useEffect, useCallback, useMemo } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  moderateScale,
  horizontalScale,
  verticalScale,
} from "../../../utils/dimensions";
import { colors } from "../../../utils/theme";
import PostCard from "../../../components/PostCard";
import OverflowMenu from "../../../components/OverflowMenu";
import { fetchFeed, likePost } from "../../../services/communityService";

// Temporary mock events – replace with API integration later
const mockEvents = [
  {
    id: "1",
    club: "Steelwood Country Club",
    location: "Location",
    date: "4 August, 2025",
    time: "12:00 PM",
    type: "Stroke Play",
    joined: true,
    status: "joined",
  },
  {
    id: "2",
    club: "Steelwood Country Club",
    location: "Location",
    date: "4 August, 2025",
    time: "12:00 PM",
    type: "Stroke Play",
    joined: false,
    status: "upcoming",
  },
  {
    id: "3",
    club: "Steelwood Country Club",
    location: "Location",
    date: "4 August, 2025",
    time: "12:00 PM",
    type: "Match Play",
    joined: false,
    status: "upcoming",
  },
  {
    id: "4",
    club: "Steelwood Country Club",
    location: "Location",
    date: "4 August, 2025",
    time: "12:00 PM",
    type: "Stroke Play",
    joined: false,
    status: "active",
  },
  {
    id: "5",
    club: "Steelwood Country Club",
    location: "Location",
    date: "4 August, 2025",
    time: "12:00 PM",
    type: "Stroke Play",
    joined: false,
    status: "live",
  },
  {
    id: "6",
    club: "Steelwood Country Club",
    location: "Location",
    date: "4 August, 2025",
    time: "12:00 PM",
    type: "Stroke Play",
    joined: false,
    status: "live",
  },
];

const FILTERS = ["All", "Match", "Active", "Upcoming", "Finish"];

export default function CommunityHomeScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  const [segment, setSegment] = useState("feed");
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState(mockEvents);
  const [filter, setFilter] = useState("All");
  const [menuVisible, setMenuVisible] = useState(false);

  const loadFeed = useCallback(async () => {
    setLoading(true);
    const res = await fetchFeed();
    if (res.ok) setFeed(res.data);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadFeed();
  }, [loadFeed]);

  const onLike = async (id) => {
    const res = await likePost(id);
    if (res.ok)
      setFeed((prev) => prev.map((p) => (p.id === id ? res.data : p)));
  };

  const toggleJoin = (id) => {
    setEvents((prev) =>
      prev.map((e) =>
        e.id === id
          ? {
              ...e,
              joined: !e.joined,
              status: !e.joined ? "joined" : "upcoming",
            }
          : e
      )
    );
  };

  const filteredEvents = events.filter((e) => {
    if (filter === "All") return true;
    if (filter === "Match") return e.type === "Match Play";
    if (filter === "Active")
      return e.status === "active" || e.status === "joined";
    if (filter === "Upcoming") return e.status === "upcoming";
    if (filter === "Finish") return e.status === "finished";
    return true;
  });

  const compositeFeed = useMemo(() => {
    let items = [];
    feed.forEach((p, idx) => {
      items.push({ type: "post", id: p.id, data: p });
      if (idx === 0 && events[0])
        items.push({
          type: "inlineEventLive",
          id: "inline-event-live",
          data: events[0],
        });
      if (idx === 1 && events[1])
        items.push({
          type: "inlineEventView",
          id: "inline-event-view",
          data: events[1],
        });
      if (idx === 2) items.push({ type: "roundStats", id: "round-stats" });
    });
    items.push({ type: "leaderboard", id: "leaderboard" });
    return items;
  }, [feed, events]);

  return (
    
      <View style={{flex : 1, backgroundColor: colors.bg}}>
      <View style={styles.header}>
        <View style={styles.headerLeftRow}>
          <View style={styles.avatarWrap}>
            <Image
              source={require("../../../../assets/man.png")}
              style={styles.avatar}
            />
          </View>
          <View style={styles.headerTexts}>
            <Text style={styles.greeting}>Hey, Player 👋</Text>
            <Text style={styles.sub}>Choose your playground</Text>
          </View>
        </View>

        <View style={styles.headerRightRow}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Notifications")}
            style={styles.iconButton}
          >
            <Image
              source={require("../../../../assets/bell.png")}
              style={styles.headerIcon}
            />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setMenuVisible(true)}
            style={styles.iconButton}
          >
            <Image
              source={require("../../../../assets/dots-icon.png")}
              style={styles.headerIcon}
            />
          </TouchableOpacity>
        </View>
      </View>

  {/* Segment Tabs */}
      <View style={styles.segmentContainer}>
        <View style={styles.segmentRow}>
          <TouchableOpacity
            onPress={() => setSegment("feed")}
            style={styles.segmentItem}
          >
            <Text
              style={[
                styles.segmentTxt,
                segment === "feed" && styles.segmentTxtActive,
              ]}
            >
              News Feed
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSegment("event")}
            style={styles.segmentItem}
          >
            <Text
              style={[
                styles.segmentTxt,
                segment === "event" && styles.segmentTxtActive,
              ]}
            >
              Event
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={[
            styles.segmentUnderline,
            segment === "event" && styles.segmentUnderlineRight,
          ]}
        />
      </View>

      {/* Content Sections */}
      {segment === "feed" ? (
        // News Feed Section (unchanged)
        <View style={{flex: 1}}><FlatList
          data={compositeFeed}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.feedList}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={loadFeed} />
          }
          renderItem={({ item }) => {
            if (item.type === "post") {
              return (
                <PostCard
                  post={item.data}
                  onPress={() =>
                    navigation.navigate("PostDetail", { postId: item.data.id })
                  }
                  onLike={() => onLike(item.data.id)}
                  onComment={() =>
                    navigation.navigate("PostDetail", {
                      postId: item.data.id,
                      focus: "comment",
                    })
                  }
                />
              );
            }
            if (item.type === "inlineEventLive")
              return <InlineEventCard event={item.data} mode="live" />;
            if (item.type === "inlineEventView")
              return <InlineEventCard event={item.data} mode="view" />;
            if (item.type === "roundStats") return <RoundStatsCard />;
            if (item.type === "leaderboard") return <LeaderboardCard />;
            return null;
          }}
        />
        </View>
      ) : (
        // Event Section (completely separate with own flex container)
        <View style={styles.eventSectionContainer}>
          {/* Filter Pills */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.filterScrollView}
            contentContainerStyle={styles.filterContainer}
          >
            {FILTERS.map((f) => (
              <TouchableOpacity
                key={f}
                onPress={() => setFilter(f)}
                style={[
                  styles.filterPill,
                  filter === f && styles.filterPillActive,
                ]}
              >
                <Text
                  style={[
                    styles.filterPillText,
                    filter === f && styles.filterPillTextActive,
                  ]}
                >
                  {f}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Event List */}
          <FlatList
            data={filteredEvents}
            keyExtractor={(item) => item.id}
            contentContainerStyle={[
              styles.eventList,
              { paddingBottom: insets.bottom + moderateScale(20) },
            ]}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <EventCard
                event={item}
                onToggleJoin={() => toggleJoin(item.id)}
                navigation={navigation}
              />
            )}
          />
        </View>
      )}

      <OverflowMenu
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
        onSelect={(route) => {
          if (["Map","Leaderboard","TrophyRoom","Settings"].includes(route)) {
            navigation.navigate('Play', { screen: route });
          } else {
            navigation.navigate(route);
          }
        }}
      />

      {/* FAB for News Feed only */}
      {segment === "feed" && (
        <TouchableOpacity
          style={[styles.fab, { bottom: insets.bottom + moderateScale(-10) }]}
          onPress={() => navigation.navigate("ComposePost")}
        >
          <Text style={styles.fabTxt}>✎</Text>
        </TouchableOpacity>
      )}</View>
    
  );
}

function EventCard({ event, onToggleJoin, navigation }) {
  const getStatusIcon = () => {
    switch (event.status) {
      case "joined":
        return "✓";
      case "live":
        return "📍";
      default:
        return null;
    }
  };

  const getStatusColor = () => {
    switch (event.status) {
      case "joined":
        return "#4CAF50";
      case "live":
        return "#FF5722";
      default:
        return "#8B5C2A";
    }
  };

  const navigateToCourse = () => {
    const courseData = {
      id: event.id,
      name: event.club,
      title: event.club,
      location: event.location,
      image: require('../../../../assets/golfField.png'),
      holes: 18,
      lengthYards: 6599,
      rating: 70.4,
      slope: 115,
      isPublic: true,
      rank: 1
    };
  // navigate to the Play tab and open the nested Course screen
  navigation.navigate('Play', { screen: 'Course', params: { course: courseData } });
  };

  return (
    <View style={styles.eventCard}>
      {/* Header with club image and status */}
      <View style={styles.eventHeader}>
        <View style={styles.eventHeaderLeft}>
          <Image
            source={require("../../../../assets/golfField.png")}
            style={styles.clubImage}
          />
          <View style={styles.eventHeaderText}>
            <Text style={styles.clubName}>{event.club}</Text>
            <Text style={styles.clubLocation}>{event.location}</Text>
          </View>
        </View>
        {event.status === "joined" && (
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: getStatusColor() },
            ]}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={require('../../../../assets/Tick.png')} style={styles.statusIcon} />
              <Text style={[styles.statusText, { marginLeft: moderateScale(8) }]}>Joined</Text>
            </View>
          </View>
        )}
        {event.status === "live" && (
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: getStatusColor() },
            ]}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={require('../../../../assets/Radio.png')} style={styles.statusIcon} />
              <Text style={[styles.statusText, { marginLeft: moderateScale(8) }]}>Live</Text>
            </View>
          </View>
        )}
      </View>

      {/* Date and Time */}
      <View style={styles.dateTimeRow}>
        <View style={styles.iconTextRow}>
          <Image source={require('../../../../assets/Calendar.png')} style={styles.metaIcon} />
          <Text style={styles.dateText}>{event.date}</Text>
        </View>
        <View style={[styles.iconTextRow, { marginLeft: moderateScale(20) }]}>
          <Image source={require('../../../../assets/Clock.png')} style={styles.metaIcon} />
          <Text style={styles.timeText}>{event.time}</Text>
        </View>
      </View>

      {/* Event Type with Trophy Icons */}
      <View style={styles.eventTypeRow}>
        <Image source={require('../../../../assets/trophy-icon.png')} style={styles.eventTypeIconImg} />
        <Text style={styles.eventTypeText}>{event.type}</Text>
        <Image source={require('../../../../assets/trophy-icon.png')} style={styles.eventTypeIconImg} />
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtonsRow}>
        <TouchableOpacity style={styles.actionButton} onPress={navigateToCourse}>
          <Image source={require('../../../../assets/Flag.png')} style={styles.actionButtonIconImg} />
          <Text style={styles.actionButtonText}>Course View</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Image source={require('../../../../assets/trophy-icon.png')} style={styles.actionButtonIconImg} />
          <Text style={styles.actionButtonText}>Bracket</Text>
        </TouchableOpacity>

        {!event.joined && event.status !== "live" && (
          <TouchableOpacity
            style={styles.joinButton}
            onPress={onToggleJoin}
          >
            <Text style={styles.joinButtonText}>+ Join</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

function InlineEventCard({ event, mode }) {
  return (
    <View style={styles.inlineEventCard}>
      <Text style={styles.club}>{event.club}</Text>
      <Text style={styles.location}>{event.location}</Text>
      <View style={styles.rowMeta}>
        <Image source={require('../../../../assets/Calendar.png')} style={[styles.metaIcon, { width: moderateScale(14), height: moderateScale(14) }]} />
        <Text style={[styles.metaDate, { marginLeft: moderateScale(6) }]}>{event.date}</Text>
        <Text style={styles.metaDot}>•</Text>
        <Image source={require('../../../../assets/Clock.png')} style={[styles.metaIcon, { width: moderateScale(14), height: moderateScale(14) }]} />
        <Text style={[styles.metaTime, { marginLeft: moderateScale(6) }]}>{event.time}</Text>
      </View>
      <View style={styles.playerList}>
        {[
          { name: "Nick Blake", score: "-11 (61)" },
          { name: "Jane Cooper", score: "-7 (65)" },
          { name: "Wade Warren", score: "-6 (66)" },
        ].map((p, i) => (
          <View style={styles.playerRow} key={p.name}>
            <View
              style={[
                styles.rankCircle,
                i === 0 && styles.rankGold,
                i === 1 && styles.rankSilver,
                i === 2 && styles.rankBronze,
              ]}
            >
              <Text style={styles.rankTxt}>{i + 1}</Text>
            </View>
            <Text style={styles.playerName}>{p.name}</Text>
            <Text style={styles.playerScore}>{p.score}</Text>
          </View>
        ))}
      </View>
      <TouchableOpacity style={styles.inlineBtn}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={require('../../../../assets/eye.png')} style={styles.inlineIcon} />
          {mode === 'live' && (
            <Image source={require('../../../../assets/Radio.png')} style={[styles.inlineIcon, { marginLeft: 6 }]} />
          )}
          <Text style={[styles.inlineBtnTxt, { marginLeft: 8 }]}>
            {mode === 'live' ? 'Live Score' : 'View Score'}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

function RoundStatsCard() {
  const stats = [
    { label: "Score", value: 107 },
    { label: "Putts", value: 38 },
    { label: "GIR%", value: 6 },
    { label: "FIR%", value: 29 },
  ];
  return (
    <View style={styles.roundStatsCard}>
      <View style={styles.statsHeaderRow}>
        <Text style={styles.club}>Nick Ribeiro</Text>
        <Text style={styles.statsSub}>Scorecard</Text>
      </View>
      <View style={styles.statsRowWrap}>
        {stats.map((s) => (
          <View style={styles.statItem} key={s.label}>
            <Text style={styles.statValue}>{s.value}</Text>
            <Text style={styles.statLabel}>{s.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function LeaderboardCard() {
  const players = [
    { name: "Nick Blake", score: "-11 (61)" },
    { name: "Dianne Russell", score: "-7 (65)" },
    { name: "Annette Black", score: "-6 (66)" },
  ];
  return (
    <View style={styles.leaderboardCard}>
      <Text style={styles.club}>Nick Ribeiro</Text>
      <Text style={styles.location}>Club Name</Text>
      <View style={styles.playerList}>
        {players.map((p, i) => (
          <View style={styles.playerRow} key={p.name}>
            <View
              style={[
                styles.rankCircle,
                i === 0 && styles.rankGold,
                i === 1 && styles.rankSilver,
                i === 2 && styles.rankBronze,
              ]}
            >
              <Text style={styles.rankTxt}>{i + 1}</Text>
            </View>
            <Text style={styles.playerName}>{p.name}</Text>
            <Text style={styles.playerScore}>{p.score}</Text>
          </View>
        ))}
      </View>
      <TouchableOpacity style={styles.inlineBtn}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={require('../../../../assets/eye.png')} style={styles.inlineIcon} />
          <Text style={[styles.inlineBtnTxt, { marginLeft: 8 }]}>Leaderboard</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({


  // Header styles
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: horizontalScale(20),
    paddingTop: verticalScale(50),
    paddingBottom: verticalScale(12),
  },
  headerLeftRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatarWrap: {
    width: horizontalScale(48),
    height: verticalScale(48),
    borderRadius: moderateScale(24),
    overflow: "hidden",
    marginRight: horizontalScale(12),
  },
  avatar: { width: "100%", height: "100%" },
  headerTexts: { flex: 1 },
  greeting: { fontSize: moderateScale(18), fontWeight: "600", color: "#222" },
  sub: { color: colors.textMute, marginTop: verticalScale(4), fontSize: moderateScale(13) },
  headerRightRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    marginLeft: horizontalScale(16),
    padding: moderateScale(6),
  },
  headerIcon: {
    width: moderateScale(22),
    height: moderateScale(22),
    resizeMode: "contain",
  },
  notificationDot: {
    position: "absolute",
    top: verticalScale(4),
    right: horizontalScale(4),
    width: moderateScale(8),
    height: moderateScale(8),
    borderRadius: moderateScale(4),
    backgroundColor: "red",
  },

  // Segment styles
  segmentContainer: {
    paddingHorizontal: moderateScale(16),
    paddingTop: moderateScale(12),
    paddingBottom: moderateScale(8),
  },
  segmentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  segmentItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: moderateScale(8),
  },
  segmentTxt: {
    fontSize: moderateScale(15),
    fontWeight: "700",
    color: colors.textMute,
  },
  segmentTxtActive: { color: colors.text },
  segmentUnderline: {
    height: verticalScale(2),
    backgroundColor: colors.accent,
    width: "50%",
    marginTop: moderateScale(8),
    borderRadius: moderateScale(2),
  },
  segmentUnderlineRight: { marginLeft: "50%" },

  // News Feed styles (unchanged structure, responsive sizes)
  feedList: { padding: moderateScale(16), paddingBottom: moderateScale(120) },
  fab: {
    position: "absolute",
    right: horizontalScale(18),
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: moderateScale(10),
    backgroundColor: "#8B5C2A",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: moderateScale(4) },
    shadowRadius: moderateScale(8),
    elevation: 6,
  },
  fabTxt: { color: "#fff", fontSize: moderateScale(20), fontWeight: "700" },

  // Event Section Container - NEW: Separate flex container for events
  eventSectionContainer: {
    flex: 1,
    backgroundColor: "#fff", // White background for event section
  },

  // Filter pills
  filterScrollView: {
    maxHeight: moderateScale(72),
  },
  filterContainer: {
    paddingHorizontal: moderateScale(14),
    paddingVertical: moderateScale(6),
    height: verticalScale(50),
    alignItems: "center",
  },
  filterPill: {
  backgroundColor: "#EFE7E1",
    paddingHorizontal: moderateScale(18),
    paddingVertical: verticalScale(8),
    borderRadius: moderateScale(20),
    marginRight: moderateScale(10),
    minWidth: moderateScale(60),
    alignItems: "center",
  },
  filterPillActive: {
  backgroundColor: "#8B5C2A",
  },
  filterPillText: {
  color: "#8B5C2A",
    fontSize: moderateScale(14),
    fontWeight: "600",
  },
  filterPillTextActive: {
    color: "#FFFFFF",
    fontWeight: "700",
  },

  // Event list
  eventList: {
    paddingHorizontal: moderateScale(16),
    paddingTop: moderateScale(8),
  },

  // Event card styles (matching Figma exactly, scaled)
  eventCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: moderateScale(16),
    padding: moderateScale(16),
    marginBottom: moderateScale(16),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: moderateScale(2) },
    shadowOpacity: 0.1,
    shadowRadius: moderateScale(4),
    elevation: 3,
  },

  // Event header
  eventHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: moderateScale(12),
  },
  eventHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  clubImage: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(8),
    marginRight: moderateScale(12),
  },
  eventHeaderText: {
    flex: 1,
  },
  clubName: {
    fontSize: moderateScale(16),
    fontWeight: "700",
    color: "#222",
  },
  clubLocation: {
    fontSize: moderateScale(13),
    color: "#666",
    marginTop: verticalScale(2),
  },
  statusBadge: {
    paddingHorizontal: moderateScale(8),
    paddingVertical: verticalScale(4),
    borderRadius: moderateScale(12),
    minWidth: moderateScale(64),
    alignItems: "center",
  },
  statusText: {
    color: "#FFFFFF",
    fontSize: moderateScale(11),
    fontWeight: "600",
  },
  statusIcon: { width: moderateScale(16), height: moderateScale(16), tintColor: '#FFFFFF' },

  // Date and time row
  dateTimeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: moderateScale(12),
  },
  iconTextRow: { flexDirection: 'row', alignItems: 'center' },
  metaIcon: { width: moderateScale(20), height: moderateScale(20), tintColor: '#8B5C2A', marginRight: moderateScale(8) },
  dateText: {
    fontSize: moderateScale(13),
    color: "#666",
    marginRight: moderateScale(20),
  },
  timeText: {
    fontSize: moderateScale(13),
    color: "#666",
  },

  // Event type row
  eventTypeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: moderateScale(16),
    paddingVertical: moderateScale(8),
  },
  eventTypeIconImg: { width: moderateScale(24), height: moderateScale(24), tintColor: '#8B5C2A', marginHorizontal: moderateScale(12) },
  eventTypeText: {
    fontSize: moderateScale(16),
    fontWeight: "700",
    color: "#8B5C2A",
  },

  // Action buttons
  actionButtonsRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionButton: {
    backgroundColor: "#F5EDE8",
    paddingHorizontal: moderateScale(12),
    paddingVertical: verticalScale(8),
    borderRadius: moderateScale(8),
    marginRight: moderateScale(10),
    flexDirection: "row",
    alignItems: "center",
  },
  actionButtonIconImg: { width: moderateScale(18), height: moderateScale(18), tintColor: '#8B5C2A', marginRight: moderateScale(8) },
  actionButtonText: {
    fontSize: moderateScale(12),
    color: "#8B5C2A",
    fontWeight: "600",
  },
  joinButton: {
    backgroundColor: "#8B5C2A",
    paddingHorizontal: moderateScale(16),
    paddingVertical: verticalScale(8),
    borderRadius: moderateScale(8),
    marginLeft: "auto",
    minWidth: moderateScale(80),
    alignItems: "center",
  },
  joinButtonText: {
    color: "#FFFFFF",
    fontSize: moderateScale(12),
    fontWeight: "700",
  },

  // Legacy styles for inline components (scaled)
  club: { fontSize: moderateScale(14), fontWeight: "700", color: "#222" },
  location: { fontSize: moderateScale(12), color: "#6E6E6E", marginTop: verticalScale(2) },
  rowMeta: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: moderateScale(10),
  },
  metaDate: { fontSize: moderateScale(11), color: "#5A5A5A" },
  metaDot: { marginHorizontal: moderateScale(6), color: "#5A5A5A" },
  metaTime: { fontSize: moderateScale(11), color: "#5A5A5A" },
  inlineEventCard: {
    backgroundColor: "#fff",
    borderRadius: moderateScale(14),
    padding: moderateScale(14),
    borderWidth: 1,
    borderColor: "#EFE7E1",
    marginBottom: moderateScale(14),
  },
  playerList: { marginTop: moderateScale(12) },
  playerRow: { flexDirection: "row", alignItems: "center", marginBottom: moderateScale(6) },
  rankCircle: {
    width: moderateScale(26),
    height: moderateScale(26),
    borderRadius: moderateScale(13),
    backgroundColor: "#E9DFD9",
    alignItems: "center",
    justifyContent: "center",
    marginRight: moderateScale(10),
  },
  rankGold: { backgroundColor: "#D9B24A33" },
  rankSilver: { backgroundColor: "#C0C0C033" },
  rankBronze: { backgroundColor: "#CD7F3233" },
  rankTxt: { fontSize: moderateScale(12), fontWeight: "700", color: "#8B5C2A" },
  playerName: { flex: 1, fontSize: moderateScale(12), fontWeight: "600", color: "#222" },
  playerScore: { fontSize: moderateScale(12), fontWeight: "600", color: "#222" },
  inlineBtn: {
    marginTop: moderateScale(10),
    backgroundColor: "#F5EDE8",
    paddingVertical: verticalScale(10),
    borderRadius: moderateScale(10),
    alignItems: "center",
  },
  inlineBtnTxt: { color: "#8B5C2A", fontWeight: "600", fontSize: moderateScale(12) },
  inlineIcon: {
    width: moderateScale(22),
    height: moderateScale(22),
    tintColor: "#8B5C2A",
  },
  roundStatsCard: {
    backgroundColor: "#fff",
    borderRadius: moderateScale(14),
    padding: moderateScale(14),
    borderWidth: 1,
    borderColor: "#EFE7E1",
    marginBottom: moderateScale(14),
  },
  statsHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: moderateScale(12),
  },
  statsSub: { fontSize: moderateScale(12), fontWeight: "600", color: "#6E6E6E" },
  statsRowWrap: { flexDirection: "row", justifyContent: "space-between" },
  statItem: { alignItems: "center", flex: 1 },
  statValue: { fontSize: moderateScale(16), fontWeight: "700", color: "#222" },
  statLabel: { marginTop: verticalScale(4), fontSize: moderateScale(11), color: "#6E6E6E" },
  leaderboardCard: {
    backgroundColor: "#fff",
    borderRadius: moderateScale(14),
    padding: moderateScale(14),
    borderWidth: 1,
    borderColor: "#EFE7E1",
    marginBottom: moderateScale(14),
  },
});
