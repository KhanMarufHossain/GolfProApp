import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { createPost } from '../../../services/communityService';
import { getProfile } from '../../../services/profileService';
import { horizontalScale, verticalScale, moderateScale } from '../../../utils/dimensions';
import { colors } from '../../../utils/theme';
import * as ImagePicker from 'expo-image-picker';

export default function ComposePostScreen({ navigation }) {
  const [text, setText] = useState('');
  const [feeling, setFeeling] = useState('');
  const [location, setLocation] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  React.useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await getProfile();
      if (res.ok && res.data) {
        setProfile(res.data);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const pickImage = async () => {
    try {
      console.log('🔵 [ComposePost] Requesting image permission');
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission required', 'Permission to access gallery is required.');
        return;
      }

      console.log('🔵 [ComposePost] Launching image picker');
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        console.log('📋 [ComposePost] Image selected:', result.assets[0]);
        setSelectedImage(result.assets[0]);
      }
    } catch (error) {
      console.error('🔴 [ComposePost] Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const submit = async () => {
    if (!text.trim()) {
      Alert.alert('Error', 'Please write something for your post');
      return;
    }

    try {
      setSubmitting(true);
      console.log('🔵 [ComposePost] Submitting post');

      const formData = new FormData();
      formData.append('postTitle', text);
      
      if (feeling) formData.append('feeling', feeling);
      if (location) formData.append('location', location);

      if (selectedImage) {
        console.log('📤 [ComposePost] Adding image to FormData');
        formData.append('postImage', {
          uri: selectedImage.uri,
          type: 'image/jpeg',
          name: `post-${Date.now()}.jpg`,
        });
      }

      const res = await createPost(formData);
      console.log('📊 [ComposePost] Create response:', { ok: res.ok, message: res.message });

      if (res.ok) {
        console.log('✅ [ComposePost] Post created successfully');
        Alert.alert('Success', 'Post created successfully', [
          { text: 'OK', onPress: () => navigation.popToTop() }
        ]);
      } else {
        console.log('❌ [ComposePost] Create failed');
        Alert.alert('Error', res.message || 'Failed to create post');
      }
    } catch (error) {
      console.error('🔴 [ComposePost] Error:', error);
      Alert.alert('Error', 'Failed to create post');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.cancelButton} disabled={submitting}>
          <Text style={styles.cancelTxt}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Post</Text>
        <TouchableOpacity onPress={submit} style={[styles.postButton, submitting && styles.postButtonDisabled]} disabled={submitting}>
          {submitting ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text style={styles.postTxt}>Post</Text>
          )}
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.userSection}>
          <Image 
            source={profile?.profileImage 
              ? (typeof profile.profileImage === 'string' ? { uri: profile.profileImage } : profile.profileImage)
              : require('../../../../assets/man.png')
            } 
            style={styles.avatar} 
          />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{profile?.fullName || 'User'}</Text>
            <Text style={styles.userMeta}>{profile?.city || 'Club Name'}</Text>
          </View>
        </View>
        
        <TextInput
          value={text}
          onChangeText={setText}
          multiline
          placeholder="What's on your mind?"
          style={styles.textInput}
          textAlignVertical="top"
          editable={!submitting}
        />
        
        {selectedImage && (
          <View style={styles.imageContainer}>
            <Image source={{ uri: selectedImage.uri }} style={styles.imagePreview} />
            <TouchableOpacity 
              style={styles.removeImage} 
              onPress={() => setSelectedImage(null)}
              disabled={submitting}
            >
              <Text style={styles.removeImageText}>✕</Text>
            </TouchableOpacity>
          </View>
        )}
        
        <View style={styles.actionsRow}>
          <TouchableOpacity 
            style={styles.actionButton} 
            onPress={pickImage}
            disabled={submitting}
          >
            <Text style={styles.actionIcon}>📷</Text>
            <Text style={styles.actionText}>Photo</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            disabled={submitting}
          >
            <Text style={styles.actionIcon}>📍</Text>
            <Text style={styles.actionText}>Location</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            disabled={submitting}
          >
            <Text style={styles.actionIcon}>😊</Text>
            <Text style={styles.actionText}>Feeling</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F5EDE8' },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(12),
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#EFE7E1'
  },
  cancelButton: { paddingVertical: verticalScale(8) },
  cancelTxt: { color: colors.textMute, fontSize: moderateScale(16) },
  headerTitle: {
    fontSize: moderateScale(18),
    fontWeight: '700',
    color: '#222'
  },
  postButton: { 
    backgroundColor: '#8B5C2A', 
    borderRadius: moderateScale(8),
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(8)
  },
  postButtonDisabled: { opacity: 0.6 },
  postTxt: { color: '#fff', fontWeight: '700', fontSize: moderateScale(14) },
  
  container: { flex: 1 },
  
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(16),
    backgroundColor: '#fff',
    marginHorizontal: horizontalScale(16),
    marginTop: verticalScale(16),
    borderRadius: moderateScale(12),
    marginBottom: verticalScale(16)
  },
  avatar: {
    width: moderateScale(44),
    height: moderateScale(44),
    borderRadius: moderateScale(22)
  },
  userInfo: { marginLeft: horizontalScale(12) },
  userName: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: '#222'
  },
  userMeta: {
    fontSize: moderateScale(12),
    color: colors.textMute,
    marginTop: verticalScale(2)
  },
  
  textInput: {
    backgroundColor: '#fff',
    marginHorizontal: horizontalScale(16),
    borderRadius: moderateScale(12),
    padding: horizontalScale(16),
    fontSize: moderateScale(16),
    minHeight: verticalScale(120),
    color: '#222',
    marginBottom: verticalScale(16)
  },
  
  imageContainer: {
    marginHorizontal: horizontalScale(16),
    marginBottom: verticalScale(16),
    position: 'relative'
  },
  imagePreview: {
    width: '100%',
    height: verticalScale(200),
    borderRadius: moderateScale(12)
  },
  removeImage: {
    position: 'absolute',
    top: verticalScale(8),
    right: horizontalScale(8),
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: moderateScale(24),
    height: moderateScale(24),
    borderRadius: moderateScale(12),
    alignItems: 'center',
    justifyContent: 'center'
  },
  removeImageText: {
    color: '#fff',
    fontSize: moderateScale(12),
    fontWeight: '700'
  },
  
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(20),
    backgroundColor: '#fff',
    marginHorizontal: horizontalScale(16),
    borderRadius: moderateScale(12),
    marginBottom: verticalScale(20)
  },
  actionButton: {
    alignItems: 'center',
    paddingVertical: verticalScale(8)
  },
  actionIcon: {
    fontSize: moderateScale(24),
    marginBottom: verticalScale(4)
  },
  actionText: {
    fontSize: moderateScale(12),
    color: colors.textMute,
    fontWeight: '600'
  }
});
