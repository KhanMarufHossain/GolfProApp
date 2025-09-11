import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList, Image } from 'react-native';
import { colors } from '../../utils/theme';
import { horizontalScale, verticalScale, moderateScale } from '../../utils/dimensions';

export default function NotificationsScreen({ navigation }) {
  const [items, setItems] = useState([
    { id: '1', type: 'user', name: 'Nick Blake', message: 'Wants to play with you', date: '7/16/25', unread: true },
    { id: '2', type: 'user', name: 'Nick Blake', message: 'Wants to be your friend', date: '7/16/25', unread: true },
    { id: '3', type: 'user', name: 'Nick Blake', message: 'Top scorer of the Ranking Board', date: '7/16/25', unread: true },
    { id: '4', type: 'user', name: 'Nick Blake', message: 'Share his round play', date: '7/16/25', unread: true },
    { id: '5', type: 'user', name: 'Nick Blake', message: 'Share his round play', date: '7/16/25', unread: true },
    { id: '6', type: 'club', name: 'Steelwood Golf Club', message: 'Check new event, details, and join the game.', date: '7/16/25', unread: false },
    { id: '7', type: 'club', name: 'Steelwood Golf Club Channel', message: 'New Channel Created. Join the club chat.', date: '7/16/25', unread: false },
  ]);

  const toggleRead = useCallback((id) => {
    setItems(prev => prev.map(it => (it.id === id ? { ...it, unread: !it.unread } : it)));
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => toggleRead(item.id)}
      style={styles.card}
    >
      <View style={styles.row}>
        {item.type === 'user' ? (
          <Image source={require('../../../assets/man.png')} style={styles.avatar} />
        ) : (
          <View style={styles.clubBadge}>
            <Image source={require('../../../assets/trophy-icon.png')} style={styles.clubIcon} />
          </View>
        )}

        <View style={styles.center}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.subtitle}>{item.message}</Text>
        </View>

        <View style={styles.right}>
          <Text style={styles.date}>{item.date}</Text>
          {item.unread && <View style={styles.unreadDot} />}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={styles.headerSpacer} />
      </View>

      <FlatList
        data={items}
        keyExtractor={(i) => i.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    paddingTop: verticalScale(50),
    
  },
  header: {
    height: verticalScale(56),
    flexDirection: 'row',
    
    paddingTop: verticalScale(10),
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
  headerSpacer: {
    width: moderateScale(40),
  },

  listContent: {
    paddingHorizontal: horizontalScale(16),
    paddingTop: verticalScale(12),
    paddingBottom: verticalScale(16),
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: moderateScale(12),
    paddingVertical: verticalScale(12),
    paddingHorizontal: horizontalScale(12),
    marginBottom: verticalScale(10),
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 8,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    marginRight: horizontalScale(12),
  },
  clubBadge: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(10),
    backgroundColor: '#F3E3D6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: horizontalScale(12),
  },
  clubIcon: {
    width: moderateScale(22),
    height: moderateScale(22),
    tintColor: '#8B5C2A',
    resizeMode: 'contain',
  },
  center: {
    flex: 1,
  },
  title: {
    fontSize: moderateScale(14),
    fontWeight: '700',
    color: colors.text,
    marginBottom: verticalScale(4),
  },
  subtitle: {
    fontSize: moderateScale(13),
    color: colors.textMute,
  },
  right: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: moderateScale(40),
  },
  date: {
    fontSize: moderateScale(12),
    color: '#9A9A9A',
  },
  unreadDot: {
    width: moderateScale(8),
    height: moderateScale(8),
    borderRadius: moderateScale(4),
    backgroundColor: colors.accent, // matches theme (#8B5C2A)
    marginTop: verticalScale(6),
  },
});
