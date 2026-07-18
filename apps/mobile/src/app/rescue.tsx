import { useLocalSearchParams } from 'expo-router';
import { Check, ChevronRight } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Screen } from '@/components/screen';
import { colors, radius, spacing, typeScale } from '@/theme/tokens';

const labels = {
  craving: 'Craving',
  gym: 'Gym resistance',
  restaurant: 'Restaurant',
  slipped: 'Lapse recovery',
} as const;

type RescueKind = keyof typeof labels;

const drivers = ['Physical hunger', 'Stress or emotion', 'Fatigue', 'Habit or cue', 'Not sure'];

const actions = [
  'Use the meal or snack already planned',
  'Step away for ten minutes and reset',
  'Make an intentional choice and record it',
];

function isRescueKind(value: string | undefined): value is RescueKind {
  return value !== undefined && value in labels;
}

export default function RescueScreen() {
  const params = useLocalSearchParams<{ mode?: string }>();
  const kind = isRescueKind(params.mode) ? params.mode : 'craving';
  const [driver, setDriver] = useState<string>();
  const [nextAction, setNextAction] = useState<string>();
  const title = useMemo(() => labels[kind], [kind]);

  return (
    <Screen>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>RIGHT NOW</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>Only the next ten minutes need a decision.</Text>
      </View>

      <Text style={styles.question}>What is driving this moment?</Text>
      <View style={styles.optionList}>
        {drivers.map((item) => {
          const selected = item === driver;
          return (
            <Pressable
              accessibilityRole="radio"
              accessibilityState={{ selected }}
              key={item}
              onPress={() => setDriver(item)}
              style={({ pressed }) => [
                styles.option,
                selected && styles.optionSelected,
                pressed && styles.pressed,
              ]}
            >
              <Text style={[styles.optionText, selected && styles.optionTextSelected]}>{item}</Text>
              {selected ? (
                <Check color={colors.primary} size={20} />
              ) : (
                <ChevronRight color={colors.textMuted} size={20} />
              )}
            </Pressable>
          );
        })}
      </View>

      {driver === undefined ? null : (
        <View style={styles.nextSection}>
          <Text style={styles.question}>Choose one next action</Text>
          <View style={styles.optionList}>
            {actions.map((item) => {
              const selected = item === nextAction;
              return (
                <Pressable
                  accessibilityRole="radio"
                  accessibilityState={{ selected }}
                  key={item}
                  onPress={() => setNextAction(item)}
                  style={({ pressed }) => [
                    styles.option,
                    selected && styles.actionSelected,
                    pressed && styles.pressed,
                  ]}
                >
                  <Text style={[styles.optionText, selected && styles.optionTextSelected]}>
                    {item}
                  </Text>
                  {selected ? <Check color={colors.blue} size={20} /> : null}
                </Pressable>
              );
            })}
          </View>
        </View>
      )}

      {nextAction === undefined ? null : (
        <View style={styles.commitmentBand}>
          <Text style={styles.commitmentLabel}>NEXT ACTION</Text>
          <Text style={styles.commitmentText}>{nextAction}</Text>
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  actionSelected: {
    backgroundColor: colors.blueSoft,
    borderColor: colors.blue,
  },
  commitmentBand: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    gap: spacing.sm,
    marginTop: spacing.xxl,
    padding: spacing.lg,
  },
  commitmentLabel: {
    color: colors.primarySoft,
    fontSize: typeScale.caption,
    fontWeight: '800',
  },
  commitmentText: {
    color: colors.surface,
    fontSize: typeScale.body,
    fontWeight: '700',
    lineHeight: 23,
  },
  eyebrow: {
    color: colors.coral,
    fontSize: typeScale.caption,
    fontWeight: '800',
  },
  header: {
    gap: spacing.sm,
    paddingBottom: spacing.xxl,
    paddingTop: spacing.lg,
  },
  nextSection: { marginTop: spacing.xxl },
  option: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.line,
    borderRadius: radius.md,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 56,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  optionList: { gap: spacing.sm },
  optionSelected: {
    backgroundColor: colors.primarySoft,
    borderColor: colors.primary,
  },
  optionText: {
    color: colors.text,
    flex: 1,
    fontSize: typeScale.body,
    lineHeight: 22,
  },
  optionTextSelected: { fontWeight: '700' },
  pressed: { opacity: 0.65 },
  question: {
    color: colors.text,
    fontSize: typeScale.heading,
    fontWeight: '800',
    marginBottom: spacing.md,
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: typeScale.body,
    lineHeight: 23,
  },
  title: {
    color: colors.text,
    fontSize: typeScale.title,
    fontWeight: '800',
  },
});
