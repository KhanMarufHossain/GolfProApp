import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { horizontalScale, verticalScale, moderateScale } from '../../utils/dimensions';

export default function CourseScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
          <Text style={{ fontSize: moderateScale(18) }}>{'←'}</Text>
        </TouchableOpacity>
        <Image source={require('../../../assets/rectangle.png')} style={styles.hero} resizeMode="cover" />
        <Text style={styles.name}>Course Name</Text>
        <View style={styles.metaRow}>
          <TouchableOpacity style={styles.action} onPress={() => navigation.navigate('CoursePreview')}>
            <Text>Course Preview</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.action} onPress={() => navigation.navigate('AddPlayer')}>
            <Text>Add Player</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.start} onPress={() => {}}>
          <Text style={{ color: '#fff' }}>Start Round</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1, paddingHorizontal: horizontalScale(20) },
  back: { marginTop: verticalScale(10) },
  hero: { width: '100%', height: verticalScale(240), borderRadius: moderateScale(12), marginTop: verticalScale(10) },
  name: { fontSize: moderateScale(22), fontWeight: '700', marginTop: verticalScale(12) },
  metaRow: { flexDirection: 'row', marginTop: verticalScale(12), justifyContent: 'space-between' },
  action: { backgroundColor: '#F5EDE8', padding: horizontalScale(12), borderRadius: moderateScale(8) },
  start: { backgroundColor: '#8B5C2A', paddingVertical: verticalScale(14), borderRadius: moderateScale(8), alignItems: 'center', marginTop: verticalScale(20) },
});
