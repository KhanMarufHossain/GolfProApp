import React, { useMemo, useRef, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { colors, radius } from '../../../utils/theme';
import { horizontalScale as hs, verticalScale as vs, moderateScale as ms } from '../../../utils/dimensions';

const sampleMessages = [
  { id: '1', text: 'Hi 👋', time: '2:39 PM', outgoing: false, avatar: require('../../../../assets/man.png') },
  { id: '2', text: 'How are you', time: '2:40 PM', outgoing: false, avatar: require('../../../../assets/man.png') },
  { id: '3', text: '👋 Hello', time: '2:40 PM', outgoing: true, avatar: require('../../../../assets/man.png') },
  { id: '4', text: "I'm good and you", time: '2:40 PM', outgoing: true, avatar: require('../../../../assets/man.png') },
  { id: '5', text: '…', time: '2:41 PM', outgoing: false, avatar: require('../../../../assets/man.png') },
];

export default function ChatThreadScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const convo = route.params?.conversation;
  const [messages, setMessages] = useState(sampleMessages);
  const [text, setText] = useState('');

  const onSend = () => {
    if (!text.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: String(prev.length + 1), text, time: 'Now', outgoing: true },
    ]);
    setText('');
  };

  const renderItem = ({ item }) => {
    const bubbleStyle = [
      styles.bubble,
      item.outgoing ? styles.bubbleOutgoing : styles.bubbleIncoming,
    ];
    const rowStyle = [styles.messageRow, item.outgoing && { justifyContent: 'flex-end' }];
    return (
      <View style={rowStyle}>
        {!item.outgoing && (
          <Image source={item.avatar || require('../../../../assets/man.png')} style={styles.avatar} />
        )}
        <View style={bubbleStyle}>
          <Text style={[styles.messageText, item.outgoing && { color: colors.surface }]}>{item.text}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backIcon}>{'<'}</Text>
        </TouchableOpacity>
        <View style={styles.titleWrap}>
          <Image source={convo?.avatar || require('../../../../assets/golfField.png')} style={styles.headerAvatar} />
          <View>
            <Text style={styles.title} numberOfLines={1}>{convo?.name || 'Chat'}</Text>
            <Text style={styles.subtitle}>Online</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.dotsBtn}>
          <Image source={require('../../../../assets/dots-icon.png')} style={styles.dotsIcon} />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <FlatList
          data={messages}
          keyExtractor={(it) => it.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
        <View style={styles.inputBar}>
          <TextInput
            style={styles.input}
            placeholder="Type message"
            placeholderTextColor={colors.textMute}
            value={text}
            onChangeText={setText}
          />
          <TouchableOpacity style={styles.attachBtn}>
            <Text style={styles.attachIcon}>📎</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sendBtn} onPress={onSend}>
            <Text style={styles.sendIcon}>➤</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: hs(16),
    paddingVertical: vs(12),
    backgroundColor: colors.bg,
  },
  backBtn: { padding: 8, marginRight: 4 },
  backIcon: { fontSize: ms(18), color: colors.text },
  titleWrap: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  headerAvatar: { width: hs(36), height: hs(36), borderRadius: hs(18), marginRight: hs(10) },
  title: { fontSize: ms(16), fontWeight: '600', color: colors.text },
  subtitle: { fontSize: ms(12), color: '#5DB075' },
  dotsBtn: { padding: 6 },
  dotsIcon: { width: hs(20), height: hs(20), tintColor: colors.text },

  listContent: { paddingTop: vs(12), paddingHorizontal: hs(12), paddingBottom: vs(90) },
  messageRow: { flexDirection: 'row', alignItems: 'flex-end', marginBottom: vs(10) },
  avatar: { width: hs(28), height: hs(28), borderRadius: hs(14), marginRight: hs(8) },
  bubble: { maxWidth: '70%', paddingHorizontal: hs(12), paddingVertical: vs(8), borderRadius: radius.lg },
  bubbleIncoming: { backgroundColor: colors.surface },
  bubbleOutgoing: { backgroundColor: '#C06A34' },
  messageText: { color: colors.text, fontSize: ms(14) },

  inputBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    padding: hs(10),
    paddingBottom: Platform.OS === 'ios' ? vs(24) : hs(10),
    backgroundColor: colors.bg,
  },
  input: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    paddingHorizontal: hs(16),
    paddingVertical: vs(10),
    fontSize: ms(14),
    color: colors.text,
    marginRight: hs(8),
  },
  attachBtn: { paddingHorizontal: hs(6), paddingVertical: vs(6) },
  attachIcon: { fontSize: ms(18) },
  sendBtn: {
    width: hs(40),
    height: hs(40),
    borderRadius: hs(20),
    backgroundColor: '#7A3D19',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendIcon: { color: '#fff', fontSize: ms(16), marginTop: -1 },
});
