import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import { getProfile } from "../../../services/profileService";
import { colors, radius, spacing } from "../../../utils/theme";
import { horizontalScale, verticalScale, moderateScale } from "../../../utils/dimensions";

const { width: screenWidth } = Dimensions.get('window');

export default function ProfileHomeScreen({ navigation }) {
  const [profile, setProfile] = useState(null);
  const [selectedTab, setSelectedTab] = useState("Posts");

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    // Mock data based on Figma design
    const mockProfile = {
      name: "John Smith",
      handicap: "15.2",
      location: "San Diego, CA",
      bio: "Golf enthusiast who loves to play and improve every day. Always looking for new courses to explore!",
      coverImage: require('../../../../assets/golfField.png'),
      avatar: require('../../../../assets/man.png'),
      stats: {
        rounds: "127",
        followers: "234",
        following: "156"
      },
      achievements: [
        { id: 1, title: "First Eagle", icon: "🦅", date: "Aug 2024" },
        { id: 2, title: "Course Record", icon: "🏆", date: "Jul 2024" },
        { id: 3, title: "Hole in One", icon: "⭐", date: "Jun 2024" },
      ],
      recentRounds: [
        { id: 1, course: "Torrey Pines", date: "Sept 8, 2024", score: "82", image: require('../../../../assets/coursepreview.png') },
        { id: 2, course: "Pebble Beach", date: "Sept 5, 2024", score: "76", image: require('../../../../assets/coursepreview.png') },
        { id: 3, course: "Augusta National", date: "Sept 1, 2024", score: "88", image: require('../../../../assets/coursepreview.png') },
      ]
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
        <Image source={require('../../../../assets/ClubDocket.svg')} style={styles.quickActionIcon} />
        <Text style={styles.quickActionText}>Scorecards</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.quickActionButton}>
        <Image source={require('../../../../assets/trophy-icon.png')} style={styles.quickActionIcon} />
        <Text style={styles.quickActionText}>Achievements</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.quickActionButton}>
        <Image source={require('../../../../assets/settings-icon.png')} style={styles.quickActionIcon} />
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

  const renderTabContent = () => {
    switch (selectedTab) {
      case "Posts":
        return (
          <View style={styles.tabContent}>
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No posts yet</Text>
              <Text style={styles.emptyStateSubtext}>Share your golf experiences with the community</Text>
            </View>
          </View>
        );
      
      case "Rounds":
        return (
          <View style={styles.tabContent}>
            {profile.recentRounds.map((round) => (
              <TouchableOpacity key={round.id} style={styles.roundCard}>
                <Image source={round.image} style={styles.roundImage} />
                <View style={styles.roundInfo}>
                  <Text style={styles.roundCourseName}>{round.course}</Text>
                  <Text style={styles.roundDate}>{round.date}</Text>
                </View>
                <View style={styles.roundScore}>
                  <Text style={styles.roundScoreText}>{round.score}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        );
      
      case "Stats":
        return (
          <View style={styles.tabContent}>
            <View style={styles.achievementsSection}>
              <Text style={styles.sectionTitle}>Recent Achievements</Text>
              {profile.achievements.map((achievement) => (
                <View key={achievement.id} style={styles.achievementCard}>
                  <Text style={styles.achievementIcon}>{achievement.icon}</Text>
                  <View style={styles.achievementInfo}>
                    <Text style={styles.achievementTitle}>{achievement.title}</Text>
                    <Text style={styles.achievementDate}>{achievement.date}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        );
      
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.navigate("ProfileSettings")}
        >
          <Text style={styles.menuText}>⋯</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {renderProfileHeader()}
        {renderQuickActions()}
        {renderTabNavigation()}
        {renderTabContent()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    height: verticalScale(56),
    flexDirection: 'row',
    marginTop : verticalScale(30),
    alignItems: 'center',
    justifyContent: 'center',
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
  menuButton: {
    position: 'absolute',
    right: horizontalScale(16),
    width: moderateScale(32),
    height: moderateScale(32),
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuText: {
    fontSize: moderateScale(20),
    color: colors.text,
    fontWeight: '600',
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
    marginTop : verticalScale(10),
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
    width: moderateScale(24),
    height: moderateScale(24),
    marginBottom: verticalScale(8),
    tintColor: colors.accent,
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
  tabContent: {
    backgroundColor: colors.surface,
    paddingHorizontal: horizontalScale(16),
    paddingBottom: verticalScale(20),
    minHeight: verticalScale(200),
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: verticalScale(40),
  },
  emptyStateText: {
    fontSize: moderateScale(18),
    fontWeight: '600',
    color: colors.textMute,
    marginBottom: verticalScale(8),
  },
  emptyStateSubtext: {
    fontSize: moderateScale(14),
    color: colors.textMute,
    textAlign: 'center',
  },
  roundCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: verticalScale(12),
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  roundImage: {
    width: moderateScale(48),
    height: moderateScale(48),
    borderRadius: radius.md,
    marginRight: horizontalScale(12),
  },
  roundInfo: {
    flex: 1,
  },
  roundCourseName: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: colors.text,
    marginBottom: verticalScale(2),
  },
  roundDate: {
    fontSize: moderateScale(12),
    color: colors.textMute,
  },
  roundScore: {
    paddingHorizontal: horizontalScale(12),
    paddingVertical: verticalScale(6),
    backgroundColor: colors.accentSoft,
    borderRadius: radius.sm,
  },
  roundScoreText: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: colors.accent,
  },
  achievementsSection: {
    paddingTop: verticalScale(8),
  },
  sectionTitle: {
    fontSize: moderateScale(18),
    fontWeight: '700',
    color: colors.text,
    marginBottom: verticalScale(16),
  },
  achievementCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: verticalScale(12),
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  achievementIcon: {
    fontSize: moderateScale(32),
    marginRight: horizontalScale(16),
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: colors.text,
    marginBottom: verticalScale(2),
  },
  achievementDate: {
    fontSize: moderateScale(12),
    color: colors.textMute,
  },
});
