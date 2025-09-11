import React from 'react';
import { Modal, View, Text, StyleSheet, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { horizontalScale, verticalScale, moderateScale } from '../utils/dimensions';
import { colors } from '../utils/theme';

export default function OverflowMenu({ visible, onClose, onSelect }) {
  const items = [
    { key: 'Settings', label: 'Settings', icon: require('../../assets/settings-icon.png'), route: 'Settings' },
    { key: 'Map', label: 'Map', icon: require('../../assets/map-icon.png'), route: 'Map' },
    { key: 'Leaderboard', label: 'Leaderboard', icon: require('../../assets/leaderboard-icon.png'), route: 'Leaderboard' },
    { key: 'TrophyRoom', label: 'Trophy Room', icon: require('../../assets/trophy-icon.png'), route: 'TrophyRoom' },
  ];

  const handle = (route) => {
    onClose && onClose();
    onSelect && onSelect(route);
  };

  return (
    <Modal animationType="fade" transparent visible={visible} onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.card}>
              {items.map((it, idx) => (
                <View key={it.key}>
                  <TouchableOpacity style={styles.item} onPress={() => handle(it.route)}>
                    <Image source={it.icon} style={styles.icon} />
                    <Text style={styles.text}>{it.label}</Text>
                  </TouchableOpacity>
                  {idx < items.length - 1 && <View style={styles.divider} />}
                </View>
              ))}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: verticalScale(100),
    paddingRight: horizontalScale(20),
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(14),
    paddingVertical: verticalScale(6),
    width: horizontalScale(200),
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 12,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: verticalScale(14),
    paddingHorizontal: horizontalScale(16),
  },
  icon: {
    width: moderateScale(18),
    height: moderateScale(18),
    marginRight: horizontalScale(12),
    tintColor: '#1E2250',
  },
  text: { fontSize: moderateScale(15), color: '#1E2250', fontWeight: '600' },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: '#EFE7E1' },
});
