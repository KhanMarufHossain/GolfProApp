import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { getProfile, updateProfile } from '../../../services/profileService';

export default function EditProfileScreen({ navigation }) {
  const [form, setForm] = useState({ name: '', location: '', bio: '' });

  useEffect(() => {
    (async () => {
      const p = await getProfile();
      if (p.ok) setForm({ name: p.data.name, location: p.data.location, bio: p.data.bio });
    })();
  }, []);

  const save = async () => {
    const res = await updateProfile(form);
    if (res.ok) navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}><TouchableOpacity onPress={() => navigation.goBack()}><Text>Cancel</Text></TouchableOpacity><Text style={styles.title}>Edit Profile</Text><View style={{ width: 50 }} /></View>
      <View style={styles.body}>
        <Text style={styles.lbl}>Name</Text>
        <TextInput value={form.name} onChangeText={(v) => setForm((s) => ({ ...s, name: v }))} style={styles.input} />
        <Text style={styles.lbl}>Location</Text>
        <TextInput value={form.location} onChangeText={(v) => setForm((s) => ({ ...s, location: v }))} style={styles.input} />
        <Text style={styles.lbl}>Bio</Text>
        <TextInput value={form.bio} onChangeText={(v) => setForm((s) => ({ ...s, bio: v }))} style={[styles.input, { height: 100 }]} multiline />
        <TouchableOpacity onPress={save} style={styles.save}><Text style={styles.saveTxt}>Save</Text></TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  header: { height: 48, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 12 },
  title: { fontWeight: '700', fontSize: 18 },
  body: { padding: 16 },
  lbl: { color: '#6E6E6E', marginTop: 10 },
  input: { height: 44, borderRadius: 8, borderWidth: 1, borderColor: '#EFE7E1', paddingHorizontal: 10, backgroundColor: '#fff' },
  save: { marginTop: 16, height: 44, borderRadius: 22, backgroundColor: '#8B5C2A', alignItems: 'center', justifyContent: 'center' },
  saveTxt: { color: '#fff', fontWeight: '700' },
});
