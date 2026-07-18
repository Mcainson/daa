import type { LucideIcon } from 'lucide-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing, typeScale } from '@/theme/tokens';

type RescueActionProps = {
  icon: LucideIcon;
  label: string;
  onPress: () => void;
  tone?: 'coral' | 'blue' | 'amber' | 'green';
};

const tones = {
  amber: { background: colors.amberSoft, foreground: colors.amber },
  blue: { background: colors.blueSoft, foreground: colors.blue },
  coral: { background: colors.coralSoft, foreground: colors.coral },
  green: { background: colors.primarySoft, foreground: colors.primary },
} as const;

export function RescueAction({ icon: Icon, label, onPress, tone = 'green' }: RescueActionProps) {
  const palette = tones[tone];

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      <View style={[styles.icon, { backgroundColor: palette.background }]}>
        <Icon color={palette.foreground} size={21} strokeWidth={2.2} />
      </View>
      <Text numberOfLines={2} style={styles.label}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.line,
    borderRadius: radius.md,
    borderWidth: 1,
    flexBasis: '47%',
    flexDirection: 'row',
    gap: spacing.md,
    minHeight: 72,
    padding: spacing.md,
  },
  icon: {
    alignItems: 'center',
    borderRadius: radius.md,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  label: {
    color: colors.text,
    flex: 1,
    fontSize: typeScale.label,
    fontWeight: '700',
    lineHeight: 18,
  },
  pressed: {
    opacity: 0.68,
  },
});
