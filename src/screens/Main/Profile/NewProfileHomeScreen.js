import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
} from "react-native";
import { getProfile } from "../../../services/profileService";
import { colors, radius, spacing } from "../../../utils/theme";
import { horizontalScale, verticalScale, moderateScale } from "../../../utils/dimensions";

export default function ProfileHomeScreen({ navigation }) {
  const [profile, setProfile] = useState(null);
  const [selectedTab, setSelectedTab] = useState("Posts");

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    // Mock data for golfer profile
    const mockProfile = {
      name: "John Smith",
      handicap: "15.2",
      location: "San Diego, CA",
      bio: "Golf enthusiast who loves to play and improve every day. Always looking for new courses to explore and connect with fellow golfers!",
      coverImage: require('../../../../assets/golfField.png'),
      avatar: require('../../../../assets/man.png'),
      stats: {
        rounds: "127",
        followers: "234",
        following: "156"
      },
      posts: [
        {
          id: 1,
          content: "Great round at Torrey Pines today! Shot my personal best of 76!",
          image: require('../../../../assets/coursepreview.png'),
          likes: 23,
          comments: 8,
          time: "2 hours ago"
        },
        {
          id: 2,
          content: "Working on my short game at the practice facility.",
          likes: 15,
          comments: 4,
          time: "1 day ago"
        }
      ],
      recentRounds: [
        { id: 1, course: "Torrey Pines", date: "Sept 8, 2024", score: "82", par: 72 },
        { id: 2, course: "Pebble Beach", date: "Sept 5, 2024", score: "76", par: 72 },
        { id: 3, course: "Augusta National", date: "Sept 1, 2024", score: "88", par: 72 },
      ],
      stats_detailed: {
        averageScore: "82.4",
        bestRound: "76",
        totalRounds: "127",
        handicapTrend: "↓ 0.3"
      }
    };
    setProfile(mockProfile);
  };

  if (!profile) return null;

  const renderProfileHeader = () => (
    <View style={styles.profileHeader}>
      <Image source={profile.coverImage} style={styles.coverImage} />
      
      <View style={styles.profileInfo}>
        <View style={styles.avatarContainer}>
          <Image source={profile.avatar} style={styles.avatar} />
          <View style={styles.profileDetails}>
            <Text style={styles.playerName}>{profile.name}</Text>
            <Text style={styles.handicapLocation}>HCP {profile.handicap} • {profile.location}</Text>
          </View>
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => navigation.navigate("EditProfile", { profile })}
          >
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsContainer}>
          <TouchableOpacity style={styles.statItem}>
            <Text style={styles.statNumber}>{profile.stats.rounds}</Text>
            <Text style={styles.statLabel}>Rounds</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.statItem}
            onPress={() => navigation.navigate("Followers")}
          >
            <Text style={styles.statNumber}>{profile.stats.followers}</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.statItem}>
            <Text style={styles.statNumber}>{profile.stats.following}</Text>
            <Text style={styles.statLabel}>Following</Text>
          </TouchableOpacity>
        </View>

        {profile.bio && (
          <Text style={styles.bioText}>{profile.bio}</Text>
        )}
      </View>
    </View>
  );

  const renderQuickActions = () => (
    <View style={styles.quickActionsContainer}>
      <TouchableOpacity 
        style={styles.quickActionButton}
        onPress={() => navigation.navigate("Scorecards")}
      >
        <Text style={styles.quickActionIcon}>📊</Text>
        <Text style={styles.quickActionText}>Scorecards</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.quickActionButton}
        onPress={() => navigation.navigate("Followers")}
      >
        <Text style={styles.quickActionIcon}>👥</Text>
        <Text style={styles.quickActionText}>Friends</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.quickActionButton}
        onPress={() => navigation.navigate("ProfileSettings")}
      >
        <Text style={styles.quickActionIcon}>⚙️</Text>
        <Text style={styles.quickActionText}>Settings</Text>
      </TouchableOpacity>
    </View>
  );

  const renderTabNavigation = () => (
    <View style={styles.tabContainer}>
      {["Posts", "Rounds", "Stats"].map((tab) => (
        <TouchableOpacity
          key={tab}
          onPress={() => setSelectedTab(tab)}
          style={[
            styles.tabButton,
            selectedTab === tab && styles.activeTabButton
          ]}
        >
          <Text style={[
            styles.tabText,
            selectedTab === tab && styles.activeTabText
          ]}>
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderPost = ({ item }) => (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <Image source={profile.avatar} style={styles.postAvatar} />
        <View style={styles.postUserInfo}>
          <Text style={styles.postUserName}>{profile.name}</Text>
          <Text style={styles.postTime}>{item.time}</Text>
        </View>
      </View>
      <Text style={styles.postContent}>{item.content}</Text>
      {item.image && (
        <Image source={item.image} style={styles.postImage} />
      )}
      <View style={styles.postActions}>
        <TouchableOpacity style={styles.postAction}>
          <Text style={styles.postActionText}>👍 {item.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.postAction}>
          <Text style={styles.postActionText}>💬 {item.comments}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.postAction}>
          <Text style={styles.postActionText}>📤</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderRoundCard = ({ item }) => (
    <View style={styles.roundCard}>
      <View style={styles.roundInfo}>
        <Text style={styles.roundCourseName}>{item.course}</Text>
        <Text style={styles.roundDate}>{item.date}</Text>
      </View>
      <View style={styles.roundScore}>
        <Text style={styles.roundScoreText}>{item.score}</Text>
        <Text style={styles.roundPar}>Par {item.par}</Text>
      </View>
    </View>
  );

  const renderTabContent = () => {
    switch (selectedTab) {
      case "Posts":
        return (
          <FlatList
            data={profile.posts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderPost}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
          />
        );
      
      case "Rounds":
        return (
          <FlatList
            data={profile.recentRounds}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderRoundCard}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
          />
        );
      
      case "Stats":
        return (
          <View style={styles.statsSection}>
            <View style={styles.statRow}>
              <View style={styles.statBox}>
                <Text style={styles.statTitle}>Average Score</Text>
                <Text style={styles.statValue}>{profile.stats_detailed.averageScore}</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statTitle}>Best Round</Text>
                <Text style={styles.statValue}>{profile.stats_detailed.bestRound}</Text>
              </View>
            </View>
            <View style={styles.statRow}>
              <View style={styles.statBox}>
                <Text style={styles.statTitle}>Total Rounds</Text>
                <Text style={styles.statValue}>{profile.stats_detailed.totalRounds}</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statTitle}>Handicap Trend</Text>
                <Text style={styles.statValue}>{profile.stats_detailed.handicapTrend}</Text>
              </View>
            </View>
          </View>
        );
      
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => navigation.navigate("Notifications")}
          >
            <Text style={styles.headerButtonText}>🔔</Text>
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => navigation.navigate("ProfileSettings")}
          >
            <Text style={styles.headerButtonText}>⋯</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {renderProfileHeader()}
        {renderQuickActions()}
        {renderTabNavigation()}
        <View style={styles.tabContentContainer}>
          {renderTabContent()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  header: {
    height: verticalScale(56),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: horizontalScale(16),
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: moderateScale(20),
    fontWeight: '700',
    color: colors.text,
  },
  headerActions: {
    flexDirection: 'row',
  },
  headerButton: {
    width: moderateScale(32),
    height: moderateScale(32),
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: horizontalScale(8),
  },
  headerButtonText: {
    fontSize: moderateScale(18),
    color: colors.text,
  },
  notificationBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.like,
  },
  scrollView: {
    flex: 1,
  },
  profileHeader: {
    backgroundColor: colors.surface,
    marginBottom: verticalScale(12),
  },
  coverImage: {
    width: '100%',
    height: verticalScale(160),
    resizeMode: 'cover',
  },
  profileInfo: {
    paddingHorizontal: horizontalScale(16),
    paddingBottom: verticalScale(20),
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(-30),
    marginBottom: verticalScale(16),
  },
  avatar: {
    width: moderateScale(80),
    height: moderateScale(80),
    borderRadius: moderateScale(40),
    borderWidth: 4,
    borderColor: colors.surface,
  },
  profileDetails: {
    flex: 1,
    marginLeft: horizontalScale(16),
    marginTop: verticalScale(20),
  },
  playerName: {
    fontSize: moderateScale(24),
    fontWeight: '700',
    color: colors.text,
    marginBottom: verticalScale(2),
  },
  handicapLocation: {
    fontSize: moderateScale(14),
    color: colors.textMute,
  },
  editButton: {
    paddingHorizontal: horizontalScale(20),
    paddingVertical: verticalScale(8),
    backgroundColor: colors.accent,
    borderRadius: radius.md,
    marginTop: verticalScale(20),
  },
  editButtonText: {
    color: colors.surface,
    fontWeight: '600',
    fontSize: moderateScale(14),
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: verticalScale(16),
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.border,
    marginVertical: verticalScale(16),
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: moderateScale(20),
    fontWeight: '700',
    color: colors.text,
    marginBottom: verticalScale(4),
  },
  statLabel: {
    fontSize: moderateScale(12),
    color: colors.textMute,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  bioText: {
    fontSize: moderateScale(14),
    color: colors.text,
    lineHeight: moderateScale(20),
    marginTop: verticalScale(-8),
  },
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.surface,
    paddingVertical: verticalScale(16),
    marginBottom: verticalScale(12),
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  quickActionButton: {
    alignItems: 'center',
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(12),
    backgroundColor: colors.accentSoft,
    borderRadius: radius.md,
    minWidth: horizontalScale(80),
  },
  quickActionIcon: {
    fontSize: moderateScale(24),
    marginBottom: verticalScale(8),
  },
  quickActionText: {
    fontSize: moderateScale(12),
    color: colors.accent,
    fontWeight: '600',
    textAlign: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    paddingHorizontal: horizontalScale(16),
    paddingTop: verticalScale(16),
    marginBottom: verticalScale(12),
  },
  tabButton: {
    flex: 1,
    paddingVertical: verticalScale(12),
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    marginHorizontal: horizontalScale(4),
  },
  activeTabButton: {
    borderBottomColor: colors.accent,
  },
  tabText: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: colors.textMute,
  },
  activeTabText: {
    color: colors.accent,
  },
  tabContentContainer: {
    backgroundColor: colors.surface,
    minHeight: verticalScale(200),
  },
  postCard: {
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(16),
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(12),
  },
  postAvatar: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    marginRight: horizontalScale(12),
  },
  postUserInfo: {
    flex: 1,
  },
  postUserName: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: colors.text,
  },
  postTime: {
    fontSize: moderateScale(12),
    color: colors.textMute,
  },
  postContent: {
    fontSize: moderateScale(14),
    color: colors.text,
    lineHeight: moderateScale(20),
    marginBottom: verticalScale(12),
  },
  postImage: {
    width: '100%',
    height: verticalScale(180),
    borderRadius: radius.md,
    marginBottom: verticalScale(12),
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  postAction: {
    paddingVertical: verticalScale(8),
    paddingHorizontal: horizontalScale(12),
  },
  postActionText: {
    fontSize: moderateScale(14),
    color: colors.textMute,
  },
  roundCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(16),
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  roundInfo: {
    flex: 1,
  },
  roundCourseName: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: colors.text,
    marginBottom: verticalScale(4),
  },
  roundDate: {
    fontSize: moderateScale(12),
    color: colors.textMute,
  },
  roundScore: {
    alignItems: 'center',
    paddingHorizontal: horizontalScale(16),
  },
  roundScoreText: {
    fontSize: moderateScale(20),
    fontWeight: '700',
    color: colors.accent,
    marginBottom: verticalScale(2),
  },
  roundPar: {
    fontSize: moderateScale(12),
    color: colors.textMute,
  },
  statsSection: {
    padding: horizontalScale(16),
  },
  statRow: {
    flexDirection: 'row',
    marginBottom: verticalScale(16),
  },
  statBox: {
    flex: 1,
    backgroundColor: colors.accentSoft,
    padding: horizontalScale(16),
    borderRadius: radius.md,
    alignItems: 'center',
    marginHorizontal: horizontalScale(4),
  },
  statTitle: {
    fontSize: moderateScale(12),
    color: colors.textMute,
    marginBottom: verticalScale(8),
    textAlign: 'center',
  },
  statValue: {
    fontSize: moderateScale(20),
    fontWeight: '700',
    color: colors.accent,
  },
});
