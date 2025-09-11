import React, { useEffect } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ScreenOrientation from 'expo-screen-orientation';
import { horizontalScale as hs, verticalScale as vs, moderateScale as ms } from '../../utils/dimensions';
import { colors } from '../../utils/theme';

export default function BracketScreen({ navigation }) {
  useEffect(() => {
    const lockLandscape = async () => {
      try {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
      } catch (_) {}
    };
    lockLandscape();
    return () => {
      // Unlock back to default (allow all) when leaving
      ScreenOrientation.unlockAsync().catch(() => {});
    };
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backTxt}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Bracket</Text>
        <View style={{ width: hs(40) }} />
      </View>
      <View style={styles.body}>
        <Image source={require('../../../assets/bracket.png')} style={styles.image} resizeMode="contain" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  header: { height: vs(56), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: hs(16), backgroundColor: colors.bg },
  backBtn: { width: hs(40), height: vs(40), alignItems: 'center', justifyContent: 'center' },
  backTxt: { fontSize: ms(18), color: colors.text, fontWeight: '800' },
  title: { fontSize: ms(16), fontWeight: '700', color: colors.text },
  body: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  image: { width: '100%', height: '100%' },
});
