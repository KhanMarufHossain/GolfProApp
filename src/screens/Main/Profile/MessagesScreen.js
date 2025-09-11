import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, FlatList } from 'react-native';
import { colors } from '../../../utils/theme';
import { horizontalScale, verticalScale, moderateScale } from '../../../utils/dimensions';

const mockConversations = [
  { id: 'c1', user: { name: 'Nick Blake', avatar: require('../../../../assets/man.png') }, last: 'See you at 12!', time: '2m' },
  { id: 'c2', user: { name: 'Dianne Russell', avatar: require('../../../../assets/man.png') }, last: 'Great round 👏', time: '1h' },
  { id: 'c3', user: { name: 'Annette Black', avatar: require('../../../../assets/man.png') }, last: 'Let’s play Saturday?', time: 'Yesterday' },
];

export default function MessagesScreen({ navigation }) {
  const openChat = (item) => {
    const conversation = { id: item.id, name: item.user.name, avatar: item.user.avatar };
    navigation.navigate('ChatThread', { conversation });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.row} activeOpacity={0.8} onPress={() => openChat(item)}>
      <Image source={item.user.avatar} style={styles.avatar} />
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{item.user.name}</Text>
        <Text style={styles.last}>{item.last}</Text>
      </View>
      <Text style={styles.time}>{item.time}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Messages</Text>
        <View style={styles.headerSpacer} />
      </View>
      <FlatList
        data={mockConversations}
        keyExtractor={(i) => i.id}
        contentContainerStyle={{ padding: horizontalScale(12) }}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  header: {
    height: verticalScale(56),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: horizontalScale(16),
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: { width: moderateScale(40), height: moderateScale(40), alignItems: 'center', justifyContent: 'center' },
  backButtonText: { fontSize: moderateScale(24), color: colors.accent, fontWeight: '600' },
  headerTitle: { fontSize: moderateScale(18), fontWeight: '700', color: colors.text },
  headerSpacer: { width: moderateScale(40) },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: horizontalScale(12),
    borderRadius: moderateScale(12),
    marginBottom: verticalScale(10),
    borderWidth: 1,
    borderColor: colors.border,
  },
  avatar: { width: moderateScale(44), height: moderateScale(44), borderRadius: moderateScale(22), marginRight: horizontalScale(12) },
  name: { color: colors.text, fontWeight: '700', fontSize: moderateScale(14) },
  last: { color: colors.textMute, marginTop: 2, fontSize: moderateScale(12) },
  time: { color: colors.textMute, fontSize: moderateScale(11), marginLeft: horizontalScale(6) },
});
