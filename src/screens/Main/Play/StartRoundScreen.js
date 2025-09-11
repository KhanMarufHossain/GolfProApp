import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import { horizontalScale, verticalScale, moderateScale } from '../../../utils/dimensions';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import playersService from '../../../services/playersService';
import roundsService from '../../../services/roundsService';
import PlayIcon from '../../../../assets/play.svg';

export default function StartRoundScreen({ navigation, route }) {
  const course = route?.params?.course || { name: 'Course Name' };
  const insets = useSafeAreaInsets();
  const [roundType, setRoundType] = useState('18');
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchFriends();
  }, []);

  const fetchFriends = async () => {
    setLoading(true);
    try {
      const list = await playersService.list();
      setFriends(list);
    } finally {
      setLoading(false);
    }
  };

  const removeFriend = (id) => {
    setFriends((f) => f.filter((p) => p.id !== id));
  };

  const onPlay = async () => {
    const payload = {
      courseId: course.id,
      roundType,
      players: friends.map((p) => p.id),
      startedAt: new Date().toISOString(),
    };
  const res = await roundsService.startRound(payload);
  // roundsService.startRound returns { ok, data }, so pass the data object.
  navigation.navigate('ActiveRound', { round: res?.data ?? res });
  };

  const renderFriend = ({ item }) => (
    <View style={styles.friendRow}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image source={item.avatar ? { uri: item.avatar } : require('../../../../assets/icon.png')} style={styles.friendAvatar} />
        <View style={{ marginLeft: horizontalScale(12) }}>
          <Text style={styles.friendName}>{item.name}</Text>
          <Text style={styles.friendHcp}>HCP {item.hcp}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.removeBtn} onPress={() => removeFriend(item.id)}>
        <Text style={styles.removeTxt}>✕</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safe}>
        <View style={[styles.headerRow, { paddingTop: insets.top + verticalScale(6) }]}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBack}>
            <Text style={styles.headerBackTxt}>{'<'}</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Start Round</Text>
          <View style={{ width: horizontalScale(36) }} />
        </View>

        <View style={[styles.container, { paddingBottom: insets.bottom + verticalScale(130) }]}> 
          <Text style={styles.sectionLabel}>Starting Round At</Text>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.courseLink}>{course.name}</Text>
          </TouchableOpacity>

          <Text style={[styles.sectionLabel, { marginTop: verticalScale(18) }]}>Round Type</Text>
          <View style={styles.roundTypeRow}>
            <TouchableOpacity style={[styles.roundTypeBtn, roundType === '18' ? styles.roundTypeBtnActive : null]} onPress={() => setRoundType('18')}>
              <Text style={[styles.roundTypeTxt, roundType === '18' ? styles.roundTypeTxtActive : null]}>18 Holes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.roundTypeBtn, roundType === 'front' ? styles.roundTypeBtnActiveAlt : null]} onPress={() => setRoundType('front')}>
              <Text style={styles.roundTypeTxt}>Front 9</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.roundTypeBtn, roundType === 'back' ? styles.roundTypeBtnActiveAlt : null]} onPress={() => setRoundType('back')}>
              <Text style={styles.roundTypeTxt}>Back 9</Text>
            </TouchableOpacity>
          </View>

          <Text style={[styles.sectionLabel, { marginTop: verticalScale(18) }]}>Friends Playing With</Text>
          <FlatList
            data={friends}
            keyExtractor={(i) => String(i.id)}
            renderItem={renderFriend}
            ItemSeparatorComponent={() => <View style={{ height: verticalScale(12) }} />}
            contentContainerStyle={{ paddingVertical: verticalScale(8), paddingBottom: verticalScale(140) }}
          />

          <TouchableOpacity style={[styles.playBtn, { bottom: insets.bottom + verticalScale(12) }]} onPress={onPlay}>
            <PlayIcon width={moderateScale(18)} height={moderateScale(18)} />
            <Text style={styles.playTxt}>  Play</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  headerRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: horizontalScale(16) },
  headerBack: { width: horizontalScale(36), height: horizontalScale(36), justifyContent: 'center', alignItems: 'center' },
  headerBackTxt: { fontSize: moderateScale(22), color: '#222', fontWeight: '700' },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: moderateScale(20), fontWeight: '800' },
  container: { flex: 1, paddingHorizontal: horizontalScale(20), position: 'relative' },
  sectionLabel: { fontSize: moderateScale(15), fontWeight: '800', marginTop: verticalScale(8), color: '#222' },
  courseLink: { color: '#B5602E', marginTop: verticalScale(6), fontWeight: '700', fontSize: moderateScale(15) },
  roundTypeRow: { flexDirection: 'row', marginTop: verticalScale(10) },
  roundTypeBtn: { paddingVertical: verticalScale(12), paddingHorizontal: horizontalScale(20), borderRadius: moderateScale(12), backgroundColor: '#F5EDE8', marginRight: horizontalScale(10) },
  roundTypeBtnActive: { borderWidth: 1, borderColor: '#B5602E', backgroundColor: '#fff' },
  roundTypeBtnActiveAlt: { backgroundColor: '#F5EDE8' },
  roundTypeTxt: { color: '#8B5C2A', fontWeight: '800', fontSize: moderateScale(14) },
  roundTypeTxtActive: { color: '#8B5C2A' },
  friendRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  friendAvatar: { width: horizontalScale(44), height: horizontalScale(44), borderRadius: horizontalScale(22) },
  friendName: { fontSize: moderateScale(15), fontWeight: '600' },
  friendHcp: { color: '#888', marginTop: verticalScale(4) },
  removeBtn: { backgroundColor: '#8B5C2A', width: horizontalScale(40), height: horizontalScale(40), borderRadius: horizontalScale(20), justifyContent: 'center', alignItems: 'center' },
  removeTxt: { color: '#fff', fontWeight: '700' },
  playBtn: { position: 'absolute', left: horizontalScale(16), right: horizontalScale(16), backgroundColor: '#8B5C2A', paddingVertical: verticalScale(14), borderRadius: moderateScale(12), alignItems: 'center', flexDirection: 'row', justifyContent: 'center', elevation: 2 },
  playTxt: { color: '#fff', fontWeight: '700', fontSize: moderateScale(16) },
});
