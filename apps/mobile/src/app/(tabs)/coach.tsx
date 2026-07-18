import { coachInputSchema } from '@daa/contracts';
import { createPrototypeCoachTurn } from '@daa/coach-harness';
import { Send } from 'lucide-react-native';
import { useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, radius, spacing, typeScale } from '@/theme/tokens';

type Message = {
  body: string;
  id: string;
  role: 'coach' | 'user';
};

const quickMessages = ['Craving', 'I slipped', 'Gym resistance'];

export default function CoachScreen() {
  const scrollRef = useRef<ScrollView>(null);
  const messageSequence = useRef(1);
  const [draft, setDraft] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      body: 'What would make today feel deliberate, even if it is not perfect?',
      id: 'welcome',
      role: 'coach',
    },
  ]);

  const send = (rawMessage: string) => {
    const message = rawMessage.trim();
    if (message.length === 0) {
      return;
    }

    const input = coachInputSchema.parse({
      locale: 'en',
      message,
      source: 'chat',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
    });
    const result = createPrototypeCoachTurn(input);
    const stamp = String(messageSequence.current);
    messageSequence.current += 1;

    setMessages((current) => [
      ...current,
      { body: message, id: `user-${stamp}`, role: 'user' },
      {
        body: `${result.message} ${result.nextQuestion ?? ''}`.trim(),
        id: `coach-${stamp}`,
        role: 'coach',
      },
    ]);
    setDraft('');
    requestAnimationFrame(() => scrollRef.current?.scrollToEnd({ animated: true }));
  };

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={68}
        style={styles.keyboard}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Coach</Text>
          <Text style={styles.subtitle}>DAA AI coach</Text>
        </View>

        <ScrollView
          contentContainerStyle={styles.messages}
          keyboardShouldPersistTaps="handled"
          ref={scrollRef}
        >
          {messages.map((message) => (
            <View
              key={message.id}
              style={[
                styles.message,
                message.role === 'user' ? styles.userMessage : styles.coachMessage,
              ]}
            >
              <Text style={[styles.messageText, message.role === 'user' && styles.userMessageText]}>
                {message.body}
              </Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.quickRow}>
          {quickMessages.map((message) => (
            <Pressable
              accessibilityLabel={`Send quick message: ${message}`}
              accessibilityRole="button"
              key={message}
              onPress={() => send(message)}
              style={({ pressed }) => [styles.quickButton, pressed && styles.pressed]}
            >
              <Text style={styles.quickText}>{message}</Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.composer}>
          <TextInput
            accessibilityLabel="Message DAA"
            multiline
            onChangeText={setDraft}
            onSubmitEditing={() => send(draft)}
            placeholder="What is happening?"
            placeholderTextColor={colors.textMuted}
            style={styles.input}
            value={draft}
          />
          <Pressable
            accessibilityLabel="Send message"
            accessibilityRole="button"
            disabled={draft.trim().length === 0}
            onPress={() => send(draft)}
            style={({ pressed }) => [
              styles.sendButton,
              draft.trim().length === 0 && styles.sendDisabled,
              pressed && styles.pressed,
            ]}
          >
            <Send color={colors.surface} size={20} />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  coachMessage: {
    alignSelf: 'flex-start',
    backgroundColor: colors.surface,
    borderColor: colors.line,
    borderWidth: 1,
  },
  composer: {
    alignItems: 'flex-end',
    backgroundColor: colors.surface,
    borderColor: colors.line,
    borderRadius: radius.md,
    borderWidth: 1,
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.sm,
    marginHorizontal: spacing.lg,
    padding: spacing.sm,
  },
  header: {
    borderBottomColor: colors.line,
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  input: {
    color: colors.text,
    flex: 1,
    fontSize: typeScale.body,
    lineHeight: 22,
    maxHeight: 112,
    minHeight: 40,
    paddingHorizontal: spacing.sm,
    paddingTop: 9,
  },
  keyboard: { flex: 1 },
  message: {
    borderRadius: radius.md,
    maxWidth: '84%',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  messageText: {
    color: colors.text,
    fontSize: typeScale.body,
    lineHeight: 23,
  },
  messages: {
    gap: spacing.md,
    padding: spacing.lg,
  },
  pressed: { opacity: 0.65 },
  quickButton: {
    borderColor: colors.line,
    borderRadius: radius.md,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  quickRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  quickText: {
    color: colors.primary,
    fontSize: typeScale.caption,
    fontWeight: '700',
  },
  safeArea: {
    backgroundColor: colors.canvas,
    flex: 1,
  },
  sendButton: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  sendDisabled: { opacity: 0.35 },
  subtitle: {
    color: colors.textMuted,
    fontSize: typeScale.caption,
    marginTop: spacing.xs,
  },
  title: {
    color: colors.text,
    fontSize: typeScale.heading,
    fontWeight: '800',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: colors.primary,
  },
  userMessageText: { color: colors.surface },
});
