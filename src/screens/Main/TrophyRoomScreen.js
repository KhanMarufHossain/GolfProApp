import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { horizontalScale, verticalScale, moderateScale } from '../../utils/dimensions';

export default function TrophyRoomScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: verticalScale(20) }}>
          <TouchableOpacity
            onPress={() => navigation && navigation.goBack && navigation.goBack()}
            style={{
              width: horizontalScale(36),
              height: horizontalScale(36),
              borderRadius: horizontalScale(18),
              backgroundColor: '#F3E3D6',
              justifyContent: 'center',
              alignItems: 'center',
              shadowColor: '#000',
              shadowOpacity: 0.06,
              shadowRadius: 4,
              elevation: 2,
              marginRight: horizontalScale(8),
            }}
          >
            <Text style={{ fontSize: moderateScale(26), fontWeight: '900', color: '#8B5C2A', lineHeight: moderateScale(28) }}>{'<'}</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Trophy Room</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1, padding: 20 },
  title: { fontSize: moderateScale(22), fontWeight: '700', color: '#222' },
});
