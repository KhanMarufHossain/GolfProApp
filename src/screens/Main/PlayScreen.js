import React from 'react';
import { View, FlatList, SafeAreaView, StyleSheet } from 'react-native';
import CourseCard from '../../components/CourseCard';
import { horizontalScale } from '../../utils/dimensions';

const data = new Array(6).fill(0).map((_, i) => ({ id: i, title: `Course ${i + 1}` }));

export default function PlayScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <FlatList
          data={data}
          keyExtractor={(i) => String(i.id)}
          contentContainerStyle={{ padding: horizontalScale(20) }}
          renderItem={({ item }) => (
            <CourseCard onPress={() => navigation.navigate('Course')} course={{}} />
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1 },
});
