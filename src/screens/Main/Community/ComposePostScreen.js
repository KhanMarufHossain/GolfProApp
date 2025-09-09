import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { createPost } from '../../../services/communityService';

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
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}><Text style={styles.backTxt}>Cancel</Text></TouchableOpacity>
        <TouchableOpacity onPress={submit} style={styles.post}><Text style={styles.postTxt}>Post</Text></TouchableOpacity>
      </View>
      <View style={styles.body}>
        <TextInput
          value={text}
          onChangeText={setText}
          multiline
          placeholder="Share something with the community"
          style={styles.input}
        />
        {image ? <Image source={image} style={styles.preview} /> : (
          <TouchableOpacity style={styles.addImage} onPress={() => setImage(require('../../../../assets/golfField.png'))}>
            <Text style={{ color: '#8B5C2A' }}>Add Image (mock)</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 12 },
  back: { padding: 8 },
  backTxt: { color: '#6E6E6E' },
  post: { padding: 8, backgroundColor: '#8B5C2A', borderRadius: 8 },
  postTxt: { color: '#fff', fontWeight: '700' },
  body: { padding: 16 },
  input: { minHeight: 120, textAlignVertical: 'top', borderWidth: 1, borderColor: '#EFE7E1', borderRadius: 8, padding: 10 },
  addImage: { marginTop: 12, height: 44, borderRadius: 8, borderWidth: 1, borderColor: '#EFE7E1', alignItems: 'center', justifyContent: 'center' },
  preview: { marginTop: 12, height: 180, borderRadius: 10 },
});
