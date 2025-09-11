import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { createPost } from '../../../services/communityService';
import { horizontalScale, verticalScale, moderateScale } from '../../../utils/dimensions';
import { colors } from '../../../utils/theme';

export default function ComposePostScreen({ navigation }) {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);

  const submit = async () => {
    const res = await createPost({ text, image });
    if (res.ok) {
      navigation.popToTop();
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.cancelButton}>
          <Text style={styles.cancelTxt}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Post</Text>
        <TouchableOpacity onPress={submit} style={styles.postButton}>
          <Text style={styles.postTxt}>Post</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.userSection}>
          <Image source={require('../../../../assets/man.png')} style={styles.avatar} />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>John Blake</Text>
            <Text style={styles.userMeta}>Club Name</Text>
          </View>
        </View>
        
        <TextInput
          value={text}
          onChangeText={setText}
          multiline
          placeholder="What's on your mind?"
          style={styles.textInput}
          textAlignVertical="top"
        />
        
        {image && (
          <View style={styles.imageContainer}>
            <Image source={image} style={styles.imagePreview} />
            <TouchableOpacity style={styles.removeImage} onPress={() => setImage(null)}>
              <Text style={styles.removeImageText}>✕</Text>
            </TouchableOpacity>
          </View>
        )}
        
        <View style={styles.actionsRow}>
          <TouchableOpacity 
            style={styles.actionButton} 
            onPress={() => setImage(require('../../../../assets/golfField.png'))}
          >
            <Text style={styles.actionIcon}>📷</Text>
            <Text style={styles.actionText}>Photo</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>📍</Text>
            <Text style={styles.actionText}>Location</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
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
