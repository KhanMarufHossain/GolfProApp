import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { horizontalScale, verticalScale, moderateScale } from '../../utils/dimensions';
import ClubDocket from '../../../assets/ClubDocket.svg';
import GolferIcon from '../../../assets/golfer.svg';
import GolfClubIcon from '../../../assets/golfClub.svg';
import { SafeAreaView } from 'react-native-safe-area-context';



export default function ChooseRoleScreen({ navigation }) {
  const [role, setRole] = useState(null);

  const onSelect = (r) => {
    setRole(r);
    setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'MainTabs' }],
      });
    }, 220);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
  <ClubDocket width={horizontalScale(67.5)} height={verticalScale(67.5)} />

        <Text style={styles.title}>Club Docket</Text>
        <Text style={styles.choose}>Choose Role</Text>

        <View style={styles.optionsRow}>
          <TouchableOpacity
            activeOpacity={0.85}
            style={[styles.option, role === 'golfer' ? styles.optionActive : null]}
            onPress={() => onSelect('golfer')}
          >
            <View style={[styles.iconWrap, role === 'golfer' ? styles.iconWrapActive : null]}>
              <GolferIcon width={horizontalScale(52.5)} height={verticalScale(52.5)} />
            </View>
            <Text style={[styles.optionLabel, role === 'golfer' ? styles.optionLabelActive : null]}>Golfer</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.85}
            style={[styles.option, role === 'club' ? styles.optionActive : null]}
            onPress={() => onSelect('club')}
          >
            <View style={[styles.iconWrap, role === 'club' ? styles.iconWrapActive : null]}>
              <GolfClubIcon width={horizontalScale(52.5)} height={verticalScale(52.5)} />
            </View>
            <Text style={[styles.optionLabel, role === 'club' ? styles.optionLabelActive : null]}>Golf Club</Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  container: {
    flex: 1,
    paddingHorizontal: horizontalScale(30),
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: horizontalScale(67.5),
    height: verticalScale(67.5),
    marginBottom: verticalScale(16.24),
  },
  title: {
    fontSize: moderateScale(26.25),
    fontWeight: '600',
    color: '#5B3926',
    marginBottom: verticalScale(8.12),
  },
  choose: {
    fontSize: moderateScale(16.875),
    fontWeight: '600',
    color: '#2B2540',
    marginBottom: verticalScale(24.36),
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  option: {
    width: horizontalScale(150),
    backgroundColor: '#fff',
    borderRadius: moderateScale(10),
    borderWidth: 1,
    borderColor: '#EFE7E1',
    paddingVertical: verticalScale(24.36),
    paddingHorizontal: horizontalScale(10),
    alignItems: 'center',
    marginHorizontal: horizontalScale(8),
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: moderateScale(6),
    elevation: 2,
  },
  optionActive: {
    backgroundColor: '#8B5C2A',
    borderColor: '#8B5C2A',
  },
  iconWrap: {
    width: horizontalScale(60),
    height: verticalScale(60),
    borderRadius: moderateScale(8),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(12.18),
    borderWidth: 1,
    borderColor: '#EFE7E1',
    backgroundColor: '#fff',
  },
  iconWrapActive: {
    backgroundColor: '#B5602E',
    borderColor: '#B5602E',
  },
  optionLabel: {
    fontSize: moderateScale(13.125),
    color: '#16213E',
    fontWeight: '600',
  },
  optionLabelActive: {
    color: '#fff',
  },
});
