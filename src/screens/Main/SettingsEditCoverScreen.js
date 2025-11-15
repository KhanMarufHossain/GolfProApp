import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Image, Alert, ActivityIndicator } from 'react-native';
import { colors, radius } from '../../utils/theme';
import { horizontalScale as hs, verticalScale as vs, moderateScale as ms, verticalScale } from '../../utils/dimensions';
import * as ImagePicker from 'expo-image-picker';
import { updateProfile } from '../../services/profileService';

export default function SettingsEditCoverScreen({ navigation }) {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    try {
      console.log('🔵 [SettingsEditCoverScreen] Requesting permission');
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission required', 'Permission to access gallery is required to upload photos.');
        return;
      }

      console.log('🔵 [SettingsEditCoverScreen] Starting image picker');
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        console.log('📋 [SettingsEditCoverScreen] Image selected:', result.assets[0]);
        setImage(result.assets[0]);
        uploadCoverImage(result.assets[0]);
      }
    } catch (error) {
      console.error('🔴 [SettingsEditCoverScreen] Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const uploadCoverImage = async (selectedImage) => {
    try {
      console.log('🔵 [SettingsEditCoverScreen] Uploading cover image');
      setUploading(true);

      const formData = new FormData();
      formData.append('coverImage', {
        uri: selectedImage.uri,
        type: 'image/jpeg',
        name: `cover-${Date.now()}.jpg`,
      });

      const response = await updateProfile(formData);
      console.log('📊 [SettingsEditCoverScreen] Upload response:', { ok: response.ok, message: response.message });

      if (response.ok) {
        console.log('✅ [SettingsEditCoverScreen] Upload successful');
        Alert.alert('Success', 'Cover image updated successfully', [
          { text: 'OK', onPress: () => navigation.goBack() }
        ]);
      } else {
        console.log('❌ [SettingsEditCoverScreen] Upload failed');
        Alert.alert('Error', response.message || 'Failed to upload image');
      }
    } catch (error) {
      console.error('🔴 [SettingsEditCoverScreen] Error uploading:', error);
      Alert.alert('Error', 'Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backTxt}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Cover</Text>
        <View style={{ width: ms(36) }} />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        {image ? (
          <View style={styles.imagePreview}>
            <Image source={{ uri: image.uri }} style={styles.previewImage} />
            {uploading && (
              <View style={styles.uploadingOverlay}>
                <ActivityIndicator size="large" color={colors.accent} />
                <Text style={styles.uploadingText}>Uploading...</Text>
              </View>
            )}
          </View>
        ) : (
          <View style={styles.boxDashed}>
            <Text style={styles.icon}>📷</Text>
            <Text style={styles.hint}>Tap to select a photo</Text>
            <TouchableOpacity style={styles.cta} onPress={pickImage} disabled={uploading}>
              <Text style={styles.ctaTxt}>Upload from Gallery</Text>
            </TouchableOpacity>
          </View>
        )}
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
  boxDashed: { borderWidth: 1, borderStyle: 'dashed', borderColor: colors.border, borderRadius: radius.md, height: vs(180), alignItems: 'center', justifyContent: 'center', backgroundColor: colors.surface },
  icon: { fontSize: ms(22), marginBottom: vs(8) },
  hint: { color: colors.textMute, marginBottom: vs(10) },
  cta: { backgroundColor: colors.accent, paddingVertical: vs(10), paddingHorizontal: hs(14), borderRadius: radius.lg },
  ctaTxt: { color: '#fff', fontWeight: '700' },
  imagePreview: { width: '100%', height: vs(200), borderRadius: radius.md, overflow: 'hidden', position: 'relative' },
  previewImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  uploadingOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  uploadingText: { color: '#fff', marginTop: 10, fontSize: ms(14) },
});
