import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { horizontalScale, verticalScale } from '../../utils/dimensions';

export default function MapScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Image source={require('../../../assets/map.png')} style={styles.map} resizeMode="cover" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1 },
  map: { width: '100%', height: '100%' },
});
