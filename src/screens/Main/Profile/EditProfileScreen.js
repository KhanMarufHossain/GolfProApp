import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity, 
  Image,
  ScrollView,
  Alert 
} from 'react-native';
import { getProfile, updateProfile } from '../../../services/profileService';
import { colors, radius, spacing } from '../../../utils/theme';
import { horizontalScale, verticalScale, moderateScale } from '../../../utils/dimensions';

export default function EditProfileScreen({ navigation, route }) {
  const [form, setForm] = useState({ 
    name: '', 
    location: '', 
    bio: '', 
    handicap: '',
    phone: '',
    email: '' 
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const p = await getProfile();
      if (p.ok) {
        setForm({ 
          name: p.data.name || '', 
          location: p.data.location || '', 
          bio: p.data.bio || '',
          handicap: p.data.handicap || '',
          phone: p.data.phone || '',
          email: p.data.email || ''
        });
      }
    } catch (error) {
      // Handle error gracefully
      console.error('Failed to load profile:', error);
    }
  };

  const handleSave = async () => {
    if (!form.name.trim()) {
      Alert.alert('Error', 'Name is required');
      return;
    }

    setLoading(true);
    try {
      const res = await updateProfile(form);
      if (res.ok) {
        navigation.goBack();
      } else {
        Alert.alert('Error', 'Failed to update profile');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <TouchableOpacity 
          onPress={handleSave} 
          style={[styles.saveButton, loading && styles.saveButtonDisabled]}
          disabled={loading}
        >
          <Text style={styles.saveText}>
            {loading ? 'Saving...' : 'Save'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.profileImageSection}>
          <View style={styles.profileImageContainer}>
            <Image 
              source={require('../../../../assets/man.png')} 
              style={styles.profileImage}
            />
            <TouchableOpacity style={styles.changePhotoButton}>
              <Text style={styles.changePhotoText}>Change Photo</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.formSection}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Full Name *</Text>
            <TextInput
              value={form.name}
              onChangeText={(value) => setForm(prev => ({ ...prev, name: value }))}
              style={styles.textInput}
              placeholder="Enter your full name"
              placeholderTextColor={colors.textMute}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              value={form.email}
              onChangeText={(value) => setForm(prev => ({ ...prev, email: value }))}
              style={styles.textInput}
              placeholder="Enter your email"
              placeholderTextColor={colors.textMute}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Phone Number</Text>
            <TextInput
              value={form.phone}
              onChangeText={(value) => setForm(prev => ({ ...prev, phone: value }))}
              style={styles.textInput}
              placeholder="Enter your phone number"
              placeholderTextColor={colors.textMute}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Location</Text>
            <TextInput
              value={form.location}
              onChangeText={(value) => setForm(prev => ({ ...prev, location: value }))}
              style={styles.textInput}
              placeholder="City, State"
              placeholderTextColor={colors.textMute}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Handicap</Text>
            <TextInput
              value={form.handicap}
              onChangeText={(value) => setForm(prev => ({ ...prev, handicap: value }))}
              style={styles.textInput}
              placeholder="Your golf handicap"
              placeholderTextColor={colors.textMute}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Bio</Text>
            <TextInput
              value={form.bio}
              onChangeText={(value) => setForm(prev => ({ ...prev, bio: value }))}
              style={[styles.textInput, styles.textArea]}
              placeholder="Tell us about yourself and your golf journey..."
              placeholderTextColor={colors.textMute}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
        </View>

        <View style={styles.dangerSection}>
          <TouchableOpacity style={styles.dangerButton}>
            <Text style={styles.dangerButtonText}>Delete Account</Text>
          </TouchableOpacity>
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
  cancelButton: {
    paddingVertical: verticalScale(8),
    paddingHorizontal: horizontalScale(12),
  },
  cancelText: {
    fontSize: moderateScale(16),
    color: colors.accent,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: moderateScale(18),
    fontWeight: '700',
    color: colors.text,
  },
  saveButton: {
    paddingVertical: verticalScale(8),
    paddingHorizontal: horizontalScale(12),
    backgroundColor: colors.accent,
    borderRadius: radius.sm,
  },
  saveButtonDisabled: {
    backgroundColor: colors.textMute,
  },
  saveText: {
    fontSize: moderateScale(16),
    color: colors.surface,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  profileImageSection: {
    backgroundColor: colors.surface,
    paddingVertical: verticalScale(32),
    alignItems: 'center',
    marginBottom: verticalScale(16),
  },
  profileImageContainer: {
    alignItems: 'center',
  },
  profileImage: {
    width: moderateScale(100),
    height: moderateScale(100),
    borderRadius: moderateScale(50),
    marginBottom: verticalScale(16),
  },
  changePhotoButton: {
    paddingHorizontal: horizontalScale(20),
    paddingVertical: verticalScale(8),
    backgroundColor: colors.accentSoft,
    borderRadius: radius.md,
  },
  changePhotoText: {
    fontSize: moderateScale(14),
    color: colors.accent,
    fontWeight: '600',
  },
  formSection: {
    backgroundColor: colors.surface,
    paddingVertical: verticalScale(24),
    marginBottom: verticalScale(16),
  },
  inputGroup: {
    paddingHorizontal: horizontalScale(16),
    marginBottom: verticalScale(20),
  },
  inputLabel: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: colors.text,
    marginBottom: verticalScale(8),
  },
  textInput: {
    height: verticalScale(48),
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: horizontalScale(16),
    fontSize: moderateScale(16),
    color: colors.text,
    backgroundColor: colors.surface,
  },
  textArea: {
    height: verticalScale(100),
    paddingTop: verticalScale(12),
  },
  dangerSection: {
    backgroundColor: colors.surface,
    paddingVertical: verticalScale(24),
    paddingHorizontal: horizontalScale(16),
  },
  dangerButton: {
    paddingVertical: verticalScale(12),
    alignItems: 'center',
  },
  dangerButtonText: {
    fontSize: moderateScale(16),
    color: colors.like,
    fontWeight: '600',
  },
});
