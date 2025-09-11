import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { colors, radius } from "../../../utils/theme";
import { horizontalScale, verticalScale, moderateScale } from "../../../utils/dimensions";

export default function ClubProfileScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState("Feed");

  // Mock club data
  const clubData = {
    name: "Torrey Pines Golf Course",
    type: "Public Golf Course",
    location: "San Diego, CA",
    phone: "(858) 581-7171",
    website: "www.torreypinesgolfcourse.com",
    coverImage: require('../../../../assets/golfField.png'),
    logo: require('../../../../assets/golfClub.svg'),
    stats: {
      members: "2.3K",
      events: "45",
      photos: "120"
    },
    description: "Nestled on the bluffs overlooking the Pacific Ocean, Torrey Pines Golf Course offers two 18-hole championship courses designed for golfers of all skill levels.",
    amenities: ["Pro Shop", "Driving Range", "Restaurant", "Event Space"],
    feed: [
      {
        id: 1,
        type: "event",
        title: "Weekly Tournament",
        description: "Join us every Saturday for our weekly tournament. Open to all skill levels!",
        image: require('../../../../assets/coursepreview.png'),
        time: "2 hours ago"
      },
      {
        id: 2,
        type: "announcement",
        title: "Course Maintenance",
        description: "Course will be closed for maintenance on Monday, Sept 15th.",
        time: "1 day ago"
      }
    ]
  };

  // Mock friends and messages to match Figma-style lists
  const friends = Array.from({ length: 8 }).map((_, i) => ({
    id: i + 1,
    name: i % 2 === 0 ? 'Pebble Beach GC' : 'Augusta National',
    username: i % 2 === 0 ? '@pebble' : '@augusta',
    avatar: require('../../../../assets/man.png'),
    isFollowing: i % 3 === 0,
  }));

  const messages = Array.from({ length: 6 }).map((_, i) => ({
    id: i + 1,
    name: i % 2 === 0 ? 'Pro Shop' : 'Tournament Desk',
    avatar: require('../../../../assets/man.png'),
    lastMessage: i % 2 === 0 ? 'Your order is ready for pickup.' : 'Pairings are live now. Good luck!',
    time: i % 2 === 0 ? '2h' : '1d',
    unread: i % 4 === 0 ? 2 : 0,
  }));

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Image source={clubData.coverImage} style={styles.coverImage} />
      
      <View style={styles.clubInfo}>
        <View style={styles.logoContainer}>
          <View style={styles.logoWrapper}>
            <Text style={styles.logoText}>TP</Text>
          </View>
          <View style={styles.clubDetails}>
            <Text style={styles.clubName}>{clubData.name}</Text>
            <Text style={styles.clubType}>{clubData.type}</Text>
            <Text style={styles.clubLocation}>📍 {clubData.location}</Text>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{clubData.stats.members}</Text>
            <Text style={styles.statLabel}>Members</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{clubData.stats.events}</Text>
            <Text style={styles.statLabel}>Events</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{clubData.stats.photos}</Text>
            <Text style={styles.statLabel}>Photos</Text>
          </View>
        </View>

        <Text style={styles.description}>{clubData.description}</Text>

        <View style={styles.contactInfo}>
          <Text style={styles.contactItem}>📞 {clubData.phone}</Text>
          <Text style={styles.contactItem}>🌐 {clubData.website}</Text>
        </View>

        <View style={styles.amenitiesContainer}>
          <Text style={styles.amenitiesTitle}>Amenities</Text>
          <View style={styles.amenitiesList}>
            {clubData.amenities.map((amenity, index) => (
              <View key={index} style={styles.amenityTag}>
                <Text style={styles.amenityText}>{amenity}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );

  const renderTabNavigation = () => (
    <View style={styles.tabContainer}>
      {["Feed", "Friends", "Messages"].map((tab) => (
        <TouchableOpacity
          key={tab}
          onPress={() => setActiveTab(tab)}
          style={[
            styles.tabButton,
            activeTab === tab && styles.activeTabButton
          ]}
        >
          <Text style={[
            styles.tabText,
            activeTab === tab && styles.activeTabText
          ]}>
            {tab}
          </Text>
          {tab === "Messages" && (
            <View style={styles.notificationBadge}>
              <Text style={styles.badgeText}>3</Text>
            </View>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderFeedItem = ({ item }) => (
    <View style={styles.feedItem}>
      <View style={styles.feedHeader}>
        <Text style={styles.feedTitle}>{item.title}</Text>
        <Text style={styles.feedTime}>{item.time}</Text>
      </View>
      <Text style={styles.feedDescription}>{item.description}</Text>
      {item.image && (
        <Image source={item.image} style={styles.feedImage} />
      )}
      <View style={styles.feedActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>👍 Like</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>💬 Comment</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>📤 Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderFriendItem = ({ item }) => (
    <View style={styles.friendItem}>
      <Image source={item.avatar} style={styles.friendAvatar} />
      <View style={{ flex: 1 }}>
        <Text style={styles.friendName}>{item.name}</Text>
        <Text style={styles.friendMeta}>{item.username}</Text>
      </View>
      <TouchableOpacity
        style={[styles.followBtn, item.isFollowing && styles.followingBtn]}
      >
        <Text style={[styles.followBtnText, item.isFollowing && styles.followingBtnText]}>
          {item.isFollowing ? 'Following' : 'Follow'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderMessageItem = ({ item }) => (
    <View style={styles.messageItem}>
      <Image source={item.avatar} style={styles.messageAvatar} />
      <View style={{ flex: 1, marginRight: horizontalScale(8) }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={styles.messageName}>{item.name}</Text>
          <Text style={styles.messageTime}>{item.time}</Text>
        </View>
        <Text style={styles.messagePreview} numberOfLines={1}>{item.lastMessage}</Text>
      </View>
      {item.unread > 0 && (
        <View style={styles.unreadBadge}><Text style={styles.unreadText}>{item.unread}</Text></View>
      )}
    </View>
  );

  // Decide data and item renderer by tab
  const getListProps = () => {
    if (activeTab === 'Feed') {
      return { data: clubData.feed, renderItem: renderFeedItem };
    }
    if (activeTab === 'Friends') {
      return { data: friends, renderItem: renderFriendItem };
    }
    return { data: messages, renderItem: renderMessageItem };
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <Text style={styles.headerButtonText}>🔔</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Text style={styles.headerButtonText}>⋯</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Use a single VirtualizedList to avoid nesting inside a ScrollView */}
      <FlatList
        {...getListProps()}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <>
            {renderHeader()}
            {renderTabNavigation()}
          </>
        )}
        ListEmptyComponent={() => (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              {activeTab === 'Friends' ? 'No friends yet' : 'No messages'}
            </Text>
            <Text style={styles.emptyStateSubtext}>
              {activeTab === 'Friends' ? 'Connect with other golf clubs and golfers' : 'Start conversations with your members'}
            </Text>
          </View>
        )}
        contentContainerStyle={styles.scrollView}
      />
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
  scrollView: {
    flex: 1,
  },
  headerContainer: {
    backgroundColor: colors.surface,
    marginBottom: verticalScale(1),
  },
  coverImage: {
    width: '100%',
    height: verticalScale(160),
    resizeMode: 'cover',
  },
  clubInfo: {
    paddingHorizontal: horizontalScale(16),
    paddingBottom: verticalScale(20),
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(-30),
    marginBottom: verticalScale(16),
  },
  logoWrapper: {
    width: moderateScale(80),
    height: moderateScale(80),
    borderRadius: moderateScale(40),
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: colors.surface,
  },
  logoText: {
    fontSize: moderateScale(24),
    fontWeight: '700',
    color: colors.surface,
  },
  clubDetails: {
    flex: 1,
    marginLeft: horizontalScale(16),
    marginTop: verticalScale(20),
  },
  clubName: {
    fontSize: moderateScale(20),
    fontWeight: '700',
    color: colors.text,
    marginTop: verticalScale(10),
    marginBottom: verticalScale(2),
  },
  clubType: {
    fontSize: moderateScale(14),
    color: colors.textMute,
    marginBottom: verticalScale(2),
  },
  clubLocation: {
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
    fontSize: moderateScale(18),
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
  description: {
    fontSize: moderateScale(14),
    color: colors.text,
    lineHeight: moderateScale(20),
    marginBottom: verticalScale(16),
  },
  contactInfo: {
    marginBottom: verticalScale(16),
  },
  contactItem: {
    fontSize: moderateScale(14),
    color: colors.text,
    marginBottom: verticalScale(4),
  },
  amenitiesContainer: {
    marginTop: verticalScale(8),
  },
  amenitiesTitle: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: colors.text,
    marginBottom: verticalScale(8),
  },
  amenitiesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  amenityTag: {
    backgroundColor: colors.accentSoft,
    paddingHorizontal: horizontalScale(12),
    paddingVertical: verticalScale(6),
    borderRadius: radius.md,
    marginRight: horizontalScale(8),
    marginBottom: verticalScale(8),
  },
  amenityText: {
    fontSize: moderateScale(12),
    color: colors.accent,
    fontWeight: '600',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    paddingHorizontal: horizontalScale(16),
    paddingTop: verticalScale(16),
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tabButton: {
    flex: 1,
    paddingVertical: verticalScale(12),
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    marginHorizontal: horizontalScale(4),
    flexDirection: 'row',
    justifyContent: 'center',
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
  notificationBadge: {
    backgroundColor: colors.like,
    borderRadius: moderateScale(10),
    paddingHorizontal: horizontalScale(6),
    paddingVertical: verticalScale(2),
    marginLeft: horizontalScale(8),
    minWidth: moderateScale(20),
    alignItems: 'center',
  },
  badgeText: {
    fontSize: moderateScale(12),
    color: colors.surface,
    fontWeight: '700',
  },
  tabContentContainer: {
    backgroundColor: colors.surface,
    minHeight: verticalScale(400),
  },
  feedItem: {
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(16),
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  feedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(8),
  },
  feedTitle: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: colors.text,
  },
  feedTime: {
    fontSize: moderateScale(12),
    color: colors.textMute,
  },
  feedDescription: {
    fontSize: moderateScale(14),
    color: colors.text,
    lineHeight: moderateScale(20),
    marginBottom: verticalScale(12),
  },
  feedImage: {
    width: '100%',
    height: verticalScale(160),
    borderRadius: radius.md,
    marginBottom: verticalScale(12),
  },
  feedActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    paddingVertical: verticalScale(8),
    paddingHorizontal: horizontalScale(12),
  },
  actionText: {
    fontSize: moderateScale(14),
    color: colors.textMute,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: verticalScale(60),
    paddingHorizontal: horizontalScale(32),
  },
  emptyStateText: {
    fontSize: moderateScale(18),
    fontWeight: '600',
    color: colors.textMute,
    marginBottom: verticalScale(8),
    textAlign: 'center',
  },
  emptyStateSubtext: {
    fontSize: moderateScale(14),
    color: colors.textMute,
    textAlign: 'center',
  },
});
