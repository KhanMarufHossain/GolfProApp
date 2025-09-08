import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { horizontalScale, verticalScale, moderateScale } from '../../utils/dimensions';

const data = new Array(8).fill(0).map((_, i) => ({ id: i, name: `Player ${i + 1}` }));

export default function AddPlayerScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginBottom: verticalScale(12) }}>
          <Text>{'←'}</Text>
        </TouchableOpacity>
        <FlatList
          data={data}
          keyExtractor={(i) => String(i.id)}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={require('../../../assets/icon.png')} style={styles.avatar} />
                <View style={{ marginLeft: horizontalScale(12) }}>
                  <Text style={{ fontWeight: '600' }}>{item.name}</Text>
                  <Text style={{ color: '#888' }}>Handicap 17</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate('CoursePreview')}>
                <Text style={{ color: '#fff' }}>Add</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1, paddingHorizontal: horizontalScale(20) },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: verticalScale(12) },
  avatar: { width: horizontalScale(40), height: horizontalScale(40), borderRadius: 999 },
  addBtn: { backgroundColor: '#8B5C2A', paddingHorizontal: horizontalScale(16), paddingVertical: verticalScale(8), borderRadius: moderateScale(20) },
});
