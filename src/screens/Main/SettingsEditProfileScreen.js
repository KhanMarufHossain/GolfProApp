import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, TextInput, Alert, ActivityIndicator } from 'react-native';
import { colors, radius } from '../../utils/theme';
import { horizontalScale as hs, verticalScale as vs, moderateScale as ms, verticalScale } from '../../utils/dimensions';
import { getProfile, updateProfile } from '../../services/profileService';

export default function SettingsEditProfileScreen({ navigation }) {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    gender: '',
    dateOfBirth: '',
    country: '',
    city: '',
    address: '',
    ghinNumber: '',
  });
  const [profileData, setProfileData] = useState(null); // Store full profile data
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      console.log('🔵 [SettingsEditProfileScreen] Loading profile');
      setLoading(true);
      const response = await getProfile();
      
      if (response.ok && response.data) {
        console.log('✅ [SettingsEditProfileScreen] Profile loaded');
        setProfileData(response.data); // Store full profile data
        
        // Format date for display (convert from ISO to YYYY-MM-DD)
        let formattedDate = '';
        if (response.data.dateOfBirth) {
          const date = new Date(response.data.dateOfBirth);
          formattedDate = date.toISOString().split('T')[0];
        }
        
        setForm({
          fullName: response.data.fullName || '',
          email: response.data.userId?.email || response.data.email || '',
          gender: response.data.gender || '',
          dateOfBirth: formattedDate,
          country: response.data.country || '',
          city: response.data.city || '',
          address: response.data.address || '',
          ghinNumber: response.data.ghinNumber || '',
        });
      } else {
        console.log('❌ [SettingsEditProfileScreen] Failed to load profile');
        Alert.alert('Error', 'Failed to load profile');
      }
    } catch (error) {
      console.error('🔴 [SettingsEditProfileScreen] Error:', error);
      Alert.alert('Error', 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!form.fullName.trim()) {
      Alert.alert('Error', 'Full name is required');
      return;
    }

    // Validate date format if provided
    if (form.dateOfBirth && !form.dateOfBirth.match(/^\d{4}-\d{2}-\d{2}$/)) {
      Alert.alert('Error', 'Date of Birth must be in YYYY-MM-DD format');
      return;
    }

    try {
      console.log('🔵 [SettingsEditProfileScreen] Saving profile');
      setSaving(true);
      
      const updateData = {
        fullName: form.fullName,
        gender: form.gender,
        dateOfBirth: form.dateOfBirth,
        country: form.country,
        city: form.city,
        address: form.address,
      };
      
      // Only include ghinNumber if it has a value
      if (form.ghinNumber && form.ghinNumber.trim()) {
        updateData.ghinNumber = form.ghinNumber;
      }
      
      const response = await updateProfile(updateData);

      if (response.ok) {
        console.log('✅ [SettingsEditProfileScreen] Profile saved');
        Alert.alert('Success', 'Profile updated successfully', [
          { text: 'OK', onPress: () => navigation.goBack() }
        ]);
      } else {
        console.log('❌ [SettingsEditProfileScreen] Save failed');
        Alert.alert('Error', response.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('🔴 [SettingsEditProfileScreen] Error:', error);
      Alert.alert('Error', 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const Field = ({ label, value, onChangeText, placeholder, editable = true }) => (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput 
        style={[styles.input, !editable && styles.inputDisabled]} 
        value={value} 
        onChangeText={onChangeText} 
        placeholder={placeholder} 
        placeholderTextColor={colors.textMute}
        editable={editable}
      />
    </View>
  );

  if (loading) {
    return (
      <View style={[styles.safe, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={colors.accent} />
        <Text style={{ color: colors.text, marginTop: 10 }}>Loading profile...</Text>
      </View>
    );
  }

  return (
    <View style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}><Text style={styles.backTxt}>{'<'}</Text></TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <View style={{ width: ms(36) }} />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.box}>
          <Field label="Full Name" value={form.fullName} onChangeText={(t) => setForm({ ...form, fullName: t })} placeholder="Enter your full name" />
          <View style={styles.divider} />
          <Field label="Email" value={form.email} editable={false} placeholder="Email (read-only)" />
          <View style={styles.divider} />
          <Field label="Gender" value={form.gender} onChangeText={(t) => setForm({ ...form, gender: t })} placeholder="male, female, or other" />
          <View style={styles.divider} />
          <Field label="Date of Birth" value={form.dateOfBirth} onChangeText={(t) => setForm({ ...form, dateOfBirth: t })} placeholder="YYYY-MM-DD" />
          <View style={styles.divider} />
          <Field label="Country" value={form.country} onChangeText={(t) => setForm({ ...form, country: t })} placeholder="e.g., USA, Bangladesh" />
          <View style={styles.divider} />
          <Field label="City" value={form.city} onChangeText={(t) => setForm({ ...form, city: t })} placeholder="e.g., Kansas, Dhaka" />
          <View style={styles.divider} />
          <Field label="Address" value={form.address} onChangeText={(t) => setForm({ ...form, address: t })} placeholder="Full address (optional)" />
          <View style={styles.divider} />
          <Field label="GHIN Number" value={form.ghinNumber} onChangeText={(t) => setForm({ ...form, ghinNumber: t })} placeholder="GHIN Number (optional)" />
        </View>
        
        {profileData && (
          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>Additional Profile Info</Text>
            <Text style={styles.infoText}>Profile Public: {profileData.isProfilePublic ? 'Yes' : 'No'}</Text>
            <Text style={styles.infoText}>Location Sharing: {profileData.isLocationSharingEnabled ? 'Enabled' : 'Disabled'}</Text>
            <Text style={styles.infoText}>Handicap Index: {profileData.userId?.handicapIndex || 'N/A'}</Text>
            {profileData.clubId && profileData.clubId.length > 0 && (
              <Text style={styles.infoText}>Clubs: {profileData.clubId.length} club(s)</Text>
            )}
          </View>
        )}
        
        <TouchableOpacity 
          style={[styles.primaryBtn, saving && styles.primaryBtnDisabled]} 
          onPress={handleSave}
          disabled={saving}
        >
          {saving ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.primaryTxt}>Save Changes</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  header: {marginTop: verticalScale(50), height: vs(56), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: hs(16), backgroundColor: colors.surface, borderBottomWidth: 1, borderBottomColor: colors.border },
  backBtn: { width: ms(36), height: ms(36), alignItems: 'center', justifyContent: 'center', borderRadius: ms(18), backgroundColor: '#F3E3D6' },
  backTxt: { fontSize: ms(18), color: colors.accent, fontWeight: '800' },
  headerTitle: { fontSize: ms(18), fontWeight: '700', color: colors.text },
  content: { padding: hs(16) },
  box: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md },
  field: { paddingHorizontal: hs(16), paddingVertical: vs(12) },
  label: { color: colors.textMute, marginBottom: 6 },
  input: { color: colors.text, fontSize: ms(14) },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: colors.border },
  primaryBtn: { marginTop: vs(16), backgroundColor: colors.accent, borderRadius: radius.lg, paddingVertical: vs(14), alignItems: 'center' },
  primaryBtnDisabled: { opacity: 0.6 },
  primaryTxt: { color: '#fff', fontWeight: '700' },
  inputDisabled: { opacity: 0.6 },
  infoBox: { marginTop: vs(16), backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, padding: hs(16) },
  infoTitle: { fontSize: ms(14), fontWeight: '700', color: colors.text, marginBottom: vs(8) },
  infoText: { fontSize: ms(12), color: colors.textMute, marginBottom: vs(4) },
});
