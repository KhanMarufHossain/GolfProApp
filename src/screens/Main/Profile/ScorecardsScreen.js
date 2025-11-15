import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Image,
  ActivityIndicator 
} from 'react-native';
import { getMyScorecards, getProfile } from '../../../services/profileService';
import { colors, radius } from '../../../utils/theme';
import { horizontalScale, verticalScale, moderateScale } from '../../../utils/dimensions';

export default function ScorecardsScreen({ navigation }) {
  const [scorecards, setScorecards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    loadProfile();
    loadScorecards();
  }, []);

  const loadProfile = async () => {
    try {
      console.log('🔵 [ScorecardsScreen] Loading profile from backend');
      const response = await getProfile();
      console.log('📊 [ScorecardsScreen] Profile response:', { ok: response.ok, hasData: !!response.data });
      
      if (response.ok && response.data) {
        console.log('📋 [ScorecardsScreen] Profile data:', JSON.stringify(response.data, null, 2));
        setProfile(response.data);
        console.log('✅ [ScorecardsScreen] Profile loaded');
      } else {
        console.log('❌ [ScorecardsScreen] Failed to load profile');
      }
    } catch (error) {
      console.error('🔴 [ScorecardsScreen] Error loading profile:', error);
    }
  };

  const loadScorecards = async () => {
    setLoading(true);
    try {
      const r = await getMyScorecards();
      if (r.ok) {
        setScorecards(r.data);
      } else {
        // Mock data for demo
        setScorecards([
          {
            id: '1',
            course: 'Torrey Pines South',
            date: '2024-09-08',
            gross: 82,
            net: 67,
            par: 72,
            courseImage: require('../../../../assets/coursepreview.png'),
            tees: 'Blue Tees',
            weather: 'Sunny, 75°F',
            highlights: ['Eagle on #13', 'Chip-in birdie #7'],
            handicap: 15.2
          },
          {
            id: '2',
            course: 'Pebble Beach Golf Links',
            date: '2024-09-05',
            gross: 76,
            net: 61,
            par: 72,
            courseImage: require('../../../../assets/coursepreview.png'),
            tees: 'Championship Tees',
            weather: 'Overcast, 68°F',
            highlights: ['Personal best round'],
            handicap: 15.2
          },
          {
            id: '3',
            course: 'Augusta National Golf Club',
            date: '2024-09-01',
            gross: 88,
            net: 73,
            par: 72,
            courseImage: require('../../../../assets/coursepreview.png'),
            tees: 'Member Tees',
            weather: 'Partly cloudy, 80°F',
            highlights: ['Played the Masters course!'],
            handicap: 15.2
          },
          {
            id: '4',
            course: 'Bethpage Black',
            date: '2024-08-28',
            gross: 91,
            net: 76,
            par: 71,
            courseImage: require('../../../../assets/coursepreview.png'),
            tees: 'Black Tees',
            weather: 'Windy, 72°F',
            highlights: ['Toughest course played'],
            handicap: 15.2
          },
        ]);
      }
    } catch (error) {
      console.error('Failed to load scorecards:', error);
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score, par) => {
    const diff = score - par;
    if (diff <= -2) return colors.like; // Eagle or better
    if (diff === -1) return '#4CAF50'; // Birdie
    if (diff === 0) return colors.accent; // Par
    if (diff === 1) return '#FF9800'; // Bogey
    return '#F44336'; // Double bogey or worse
  };

  const getScoreLabel = (score, par) => {
    const diff = score - par;
    if (diff <= -3) return 'Albatross';
    if (diff === -2) return 'Eagle';
    if (diff === -1) return 'Birdie';
    if (diff === 0) return 'Par';
    if (diff === 1) return 'Bogey';
    if (diff === 2) return 'Double';
    return `+${diff}`;
  };

  const renderScorecardItem = ({ item }) => (
    <TouchableOpacity style={styles.scorecardCard}>
      <View style={styles.cardHeader}>
        <Image source={item.courseImage} style={styles.courseImage} />
        <View style={styles.courseInfo}>
          <Text style={styles.courseName}>{item.course}</Text>
          <Text style={styles.courseDate}>{new Date(item.date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}</Text>
          <Text style={styles.courseTees}>{item.tees} • {item.weather}</Text>
        </View>
      </View>

      <View style={styles.scoreContainer}>
        <View style={styles.scoreSection}>
          <View style={styles.scoreItem}>
            <Text style={styles.scoreLabel}>Gross</Text>
            <Text style={[
              styles.scoreValue,
              { color: getScoreColor(item.gross, item.par) }
            ]}>
              {item.gross}
            </Text>
            <Text style={styles.scoreDetail}>
              {getScoreLabel(item.gross, item.par)}
            </Text>
          </View>

          <View style={styles.scoreDivider} />

          <View style={styles.scoreItem}>
            <Text style={styles.scoreLabel}>Net</Text>
            <Text style={[
              styles.scoreValue,
              { color: getScoreColor(item.net, item.par) }
            ]}>
              {item.net}
            </Text>
            <Text style={styles.scoreDetail}>
              {getScoreLabel(item.net, item.par)}
            </Text>
          </View>

          <View style={styles.scoreDivider} />

          <View style={styles.scoreItem}>
            <Text style={styles.scoreLabel}>Par</Text>
            <Text style={styles.scoreValue}>
              {item.par}
            </Text>
            <Text style={styles.scoreDetail}>Course</Text>
          </View>
        </View>
      </View>

      {item.highlights && item.highlights.length > 0 && (
        <View style={styles.highlightsSection}>
          <Text style={styles.highlightsTitle}>Highlights</Text>
          {item.highlights.map((highlight, index) => (
            <Text key={index} style={styles.highlightText}>• {highlight}</Text>
          ))}
        </View>
      )}
    </TouchableOpacity>
  );

  const renderFilterTabs = () => (
    <View style={styles.filterContainer}>
      {['All', 'This Month', 'Best Scores', 'Recent'].map((tab) => (
        <TouchableOpacity
          key={tab}
          onPress={() => setFilter(tab)}
          style={[
            styles.filterButton,
            filter === tab && styles.activeFilterButton
          ]}
        >
          <Text style={[
            styles.filterText,
            filter === tab && styles.activeFilterText
          ]}>
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const getFilteredScorecards = () => {
    switch (filter) {
      case 'This Month':
        return scorecards.filter(card => {
          const cardDate = new Date(card.date);
          const now = new Date();
          return cardDate.getMonth() === now.getMonth() && 
                 cardDate.getFullYear() === now.getFullYear();
        });
      case 'Best Scores':
        return [...scorecards].sort((a, b) => a.net - b.net).slice(0, 5);
      case 'Recent':
        return [...scorecards].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 10);
      default:
        return scorecards;
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Scorecards</Text>
          <View style={styles.headerSpacer} />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.accent} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Scorecards</Text>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={getFilteredScorecards()}
        keyExtractor={(item) => item.id}
        renderItem={renderScorecardItem}
        ListHeaderComponent={renderFilterTabs}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No scorecards found</Text>
            <Text style={styles.emptyStateSubtext}>Start playing and recording your rounds!</Text>
          </View>
        }
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
  backButton: {
    width: moderateScale(40),
    height: moderateScale(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    fontSize: moderateScale(24),
    color: colors.accent,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: moderateScale(18),
    fontWeight: '700',
    color: colors.text,
  },
  addButton: {
    width: moderateScale(40),
    height: moderateScale(40),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accent,
    borderRadius: moderateScale(20),
  },
  addButtonText: {
    fontSize: moderateScale(24),
    color: colors.surface,
    fontWeight: '600',
  },
  headerSpacer: {
    width: moderateScale(40),
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContainer: {
    paddingBottom: verticalScale(20),
  },
  filterContainer: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(16),
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  filterButton: {
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(8),
    borderRadius: radius.md,
    marginRight: horizontalScale(8),
    backgroundColor: colors.surfaceAlt,
  },
  activeFilterButton: {
    backgroundColor: colors.accent,
  },
  filterText: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: colors.textMute,
  },
  activeFilterText: {
    color: colors.surface,
  },
  scorecardCard: {
    backgroundColor: colors.surface,
    marginHorizontal: horizontalScale(16),
    marginTop: verticalScale(16),
    borderRadius: radius.lg,
    padding: horizontalScale(16),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    marginBottom: verticalScale(16),
  },
  courseImage: {
    width: moderateScale(60),
    height: moderateScale(60),
    borderRadius: radius.md,
    marginRight: horizontalScale(12),
  },
  courseInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  courseName: {
    fontSize: moderateScale(18),
    fontWeight: '700',
    color: colors.text,
    marginBottom: verticalScale(4),
  },
  courseDate: {
    fontSize: moderateScale(14),
    color: colors.textMute,
    marginBottom: verticalScale(2),
  },
  courseTees: {
    fontSize: moderateScale(12),
    color: colors.textMute,
  },
  scoreContainer: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.border,
    paddingVertical: verticalScale(16),
    marginBottom: verticalScale(16),
  },
  scoreSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  scoreItem: {
    alignItems: 'center',
    flex: 1,
  },
  scoreLabel: {
    fontSize: moderateScale(12),
    color: colors.textMute,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: verticalScale(4),
  },
  scoreValue: {
    fontSize: moderateScale(24),
    fontWeight: '700',
    color: colors.text,
    marginBottom: verticalScale(2),
  },
  scoreDetail: {
    fontSize: moderateScale(12),
    color: colors.textMute,
  },
  scoreDivider: {
    width: 1,
    backgroundColor: colors.border,
    marginHorizontal: horizontalScale(16),
  },
  highlightsSection: {
    paddingTop: verticalScale(8),
  },
  highlightsTitle: {
    fontSize: moderateScale(14),
    fontWeight: '700',
    color: colors.text,
    marginBottom: verticalScale(8),
  },
  highlightText: {
    fontSize: moderateScale(14),
    color: colors.textMute,
    marginBottom: verticalScale(4),
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
