import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { colors } from '../../utils/theme';
import { horizontalScale, verticalScale, moderateScale } from '../../utils/dimensions';

export default function SettingsScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.headerSpacer} />
      </View>
      <View style={styles.content}>
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateIcon}>⚙️</Text>
          <Text style={styles.emptyStateText}>Settings</Text>
          <Text style={styles.emptyStateSubtext}>
            App settings will be available here
          </Text>
        </View>
      </View>
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
  headerSpacer: {
    width: moderateScale(40),
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyState: {
    alignItems: 'center',
    paddingHorizontal: horizontalScale(32),
  },
  emptyStateIcon: {
    fontSize: moderateScale(48),
    marginBottom: verticalScale(16),
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
    lineHeight: moderateScale(20),
  },
});
