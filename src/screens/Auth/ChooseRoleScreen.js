import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import ClubDocket from '../../../assets/ClubDocket.svg';
import GolferIcon from '../../../assets/golfer.svg';
import GolfClubIcon from '../../../assets/golfClub.svg';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

export default function ChooseRoleScreen({ navigation }) {
  const [role, setRole] = useState(null);

  const onSelect = (r) => {
    setRole(r);
    // small delay for visual feedback then navigate
    setTimeout(() => {
      // replace with the next screen in your flow
      navigation.navigate('Ghin');
    }, 220);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
  <ClubDocket width={width * 0.18} height={width * 0.18} />

        <Text style={styles.title}>Club Docket</Text>
        <Text style={styles.choose}>Choose Role</Text>

        <View style={styles.optionsRow}>
          <TouchableOpacity
            activeOpacity={0.85}
            style={[styles.option, role === 'golfer' ? styles.optionActive : null]}
            onPress={() => onSelect('golfer')}
          >
            <View style={[styles.iconWrap, role === 'golfer' ? styles.iconWrapActive : null]}>
              <GolferIcon width={width * 0.14} height={width * 0.14} />
            </View>
            <Text style={[styles.optionLabel, role === 'golfer' ? styles.optionLabelActive : null]}>Golfer</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.85}
            style={[styles.option, role === 'club' ? styles.optionActive : null]}
            onPress={() => onSelect('club')}
          >
            <View style={[styles.iconWrap, role === 'club' ? styles.iconWrapActive : null]}>
              <GolfClubIcon width={width * 0.14} height={width * 0.14} />
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
    paddingHorizontal: width * 0.08,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: width * 0.18,
    height: width * 0.18,
    marginBottom: height * 0.02,
  },
  title: {
    fontSize: width * 0.07,
    fontWeight: '600',
    color: '#5B3926',
    marginBottom: height * 0.01,
  },
  choose: {
    fontSize: width * 0.045,
    fontWeight: '600',
    color: '#2B2540',
    marginBottom: height * 0.03,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  option: {
    width: (width - width * 0.16) / 2 - 8,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#EFE7E1',
    paddingVertical: height * 0.03,
    paddingHorizontal: 10,
    alignItems: 'center',
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  optionActive: {
    backgroundColor: '#8B5C2A',
    borderColor: '#8B5C2A',
  },
  iconWrap: {
    width: width * 0.16,
    height: width * 0.16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height * 0.015,
    borderWidth: 1,
    borderColor: '#EFE7E1',
    backgroundColor: '#fff',
  },
  iconWrapActive: {
    backgroundColor: '#B5602E',
    borderColor: '#B5602E',
  },
  optionLabel: {
    fontSize: width * 0.035,
    color: '#16213E',
    fontWeight: '600',
  },
  optionLabelActive: {
    color: '#fff',
  },
});
