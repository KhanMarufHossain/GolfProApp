import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  Switch,
  Alert 
} from 'react-native';
import { colors, radius } from '../../../utils/theme';
import { horizontalScale, verticalScale, moderateScale } from '../../../utils/dimensions';

export default function ProfileSettingsScreen({ navigation }) {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    shareScores: true,
    privateProfile: false,
    showHandicap: true,
    allowMessages: true,
    darkMode: false,
    autoSync: true,
  });

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: () => {
            // Handle logout logic
            navigation.navigate('Auth');
          }
        }
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'This action cannot be undone. Are you sure you want to delete your account?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => {
            // Handle account deletion
            console.log('Account deletion requested');
          }
        }
      ]
    );
  };

  const renderSettingItem = (title, description, value, onValueChange, type = 'switch') => (
    <View style={styles.settingItem}>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        {description && (
          <Text style={styles.settingDescription}>{description}</Text>
        )}
      </View>
      {type === 'switch' && (
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ false: colors.border, true: colors.accentSoft }}
          thumbColor={value ? colors.accent : colors.textMute}
        />
      )}
      {type === 'arrow' && (
        <TouchableOpacity onPress={onValueChange}>
          <Text style={styles.arrowText}>→</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const renderSection = (title, children) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionContent}>
        {children}
      </View>
    </View>
  );

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

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {renderSection('Privacy', [
          renderSettingItem(
            'Private Profile',
            'Only followers can see your profile and posts',
            settings.privateProfile,
            (value) => updateSetting('privateProfile', value)
          ),
          renderSettingItem(
            'Show Handicap',
            'Display your handicap on your profile',
            settings.showHandicap,
            (value) => updateSetting('showHandicap', value)
          ),
          renderSettingItem(
            'Share Scores Automatically',
            'Auto-share your scorecards with followers',
            settings.shareScores,
            (value) => updateSetting('shareScores', value)
          ),
          renderSettingItem(
            'Allow Direct Messages',
            'Let other users send you messages',
            settings.allowMessages,
            (value) => updateSetting('allowMessages', value)
          ),
        ])}

        {renderSection('Notifications', [
          renderSettingItem(
            'Push Notifications',
            'Receive notifications on your device',
            settings.pushNotifications,
            (value) => updateSetting('pushNotifications', value)
          ),
          renderSettingItem(
            'Email Notifications',
            'Receive updates via email',
            settings.emailNotifications,
            (value) => updateSetting('emailNotifications', value)
          ),
        ])}

        {renderSection('App Preferences', [
          renderSettingItem(
            'Dark Mode',
            'Use dark theme throughout the app',
            settings.darkMode,
            (value) => updateSetting('darkMode', value)
          ),
          renderSettingItem(
            'Auto-Sync Data',
            'Automatically sync your data across devices',
            settings.autoSync,
            (value) => updateSetting('autoSync', value)
          ),
        ])}

        {renderSection('Account', [
          renderSettingItem(
            'Change Password',
            'Update your account password',
            null,
            () => navigation.navigate('ChangePassword'),
            'arrow'
          ),
          renderSettingItem(
            'Connected Accounts',
            'Manage linked social accounts',
            null,
            () => navigation.navigate('ConnectedAccounts'),
            'arrow'
          ),
          renderSettingItem(
            'Data Export',
            'Download your golf data',
            null,
            () => navigation.navigate('DataExport'),
            'arrow'
          ),
        ])}

        {renderSection('Support', [
          renderSettingItem(
            'Help Center',
            'Get answers to common questions',
            null,
            () => console.log('Navigate to Help Center'),
            'arrow'
          ),
          renderSettingItem(
            'Contact Support',
            'Get help from our support team',
            null,
            () => console.log('Navigate to Contact Support'),
            'arrow'
          ),
          renderSettingItem(
            'Report a Bug',
            'Help us improve the app',
            null,
            () => console.log('Navigate to Bug Report'),
            'arrow'
          ),
        ])}

        {renderSection('Legal', [
          renderSettingItem(
            'Terms of Service',
            'View our terms and conditions',
            null,
            () => console.log('Navigate to Terms'),
            'arrow'
          ),
          renderSettingItem(
            'Privacy Policy',
            'Learn about our privacy practices',
            null,
            () => console.log('Navigate to Privacy Policy'),
            'arrow'
          ),
        ])}

        <View style={styles.actionSection}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
            <Text style={styles.deleteText}>Delete Account</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.versionSection}>
          <Text style={styles.versionText}>Version 1.0.0</Text>
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
  scrollView: {
    flex: 1,
  },
  section: {
    marginTop: verticalScale(24),
  },
  sectionTitle: {
    fontSize: moderateScale(14),
    fontWeight: '700',
    color: colors.textMute,
    textTransform: 'uppercase',
    letterSpacing: 1,
    paddingHorizontal: horizontalScale(16),
    marginBottom: verticalScale(8),
  },
  sectionContent: {
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(16),
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  settingContent: {
    flex: 1,
    marginRight: horizontalScale(16),
  },
  settingTitle: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: colors.text,
    marginBottom: verticalScale(2),
  },
  settingDescription: {
    fontSize: moderateScale(14),
    color: colors.textMute,
    lineHeight: moderateScale(18),
  },
  arrowText: {
    fontSize: moderateScale(18),
    color: colors.textMute,
  },
  actionSection: {
    marginTop: verticalScale(32),
    paddingHorizontal: horizontalScale(16),
  },
  logoutButton: {
    backgroundColor: colors.surface,
    paddingVertical: verticalScale(16),
    borderRadius: radius.md,
    alignItems: 'center',
    marginBottom: verticalScale(16),
    borderWidth: 1,
    borderColor: colors.border,
  },
  logoutText: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: colors.accent,
  },
  deleteButton: {
    backgroundColor: colors.surface,
    paddingVertical: verticalScale(16),
    borderRadius: radius.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.like,
  },
  deleteText: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: colors.like,
  },
  versionSection: {
    alignItems: 'center',
    paddingVertical: verticalScale(32),
  },
  versionText: {
    fontSize: moderateScale(14),
    color: colors.textMute,
  },
});
