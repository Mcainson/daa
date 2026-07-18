import type { Commitment, CommitmentStatus } from '@daa/contracts';
import { Check, Circle, RefreshCcw } from 'lucide-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing, typeScale } from '@/theme/tokens';

type CommitmentRowProps = {
  commitment: Commitment;
  onStatusChange: (status: CommitmentStatus | null) => void;
};

export function CommitmentRow({ commitment, onStatusChange }: CommitmentRowProps) {
  const isKept = commitment.status === 'kept';
  const isAdapted = commitment.status === 'adapted';

  return (
    <View style={styles.row}>
      <Pressable
        accessibilityLabel={`${isKept ? 'Clear' : 'Mark'} ${commitment.title} as kept`}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: isKept }}
        hitSlop={8}
        onPress={() => onStatusChange(isKept ? null : 'kept')}
        style={({ pressed }) => [
          styles.statusButton,
          isKept && styles.statusButtonKept,
          pressed && styles.pressed,
        ]}
      >
        {isKept ? (
          <Check color={colors.surface} size={20} strokeWidth={2.5} />
        ) : (
          <Circle color={colors.textMuted} size={20} strokeWidth={1.8} />
        )}
      </Pressable>

      <View style={styles.copy}>
        <View style={styles.titleRow}>
          <Text style={[styles.title, isKept && styles.completed]}>{commitment.title}</Text>
          {isAdapted ? <Text style={styles.adaptedLabel}>Adapted</Text> : null}
        </View>
        <Text style={styles.detail}>{commitment.detail}</Text>
      </View>

      <Pressable
        accessibilityLabel={`Adapt ${commitment.title}`}
        hitSlop={8}
        onPress={() => onStatusChange(isAdapted ? null : 'adapted')}
        style={({ pressed }) => [
          styles.adaptButton,
          isAdapted && styles.adaptButtonActive,
          pressed && styles.pressed,
        ]}
      >
        <RefreshCcw color={isAdapted ? colors.blue : colors.textMuted} size={18} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  adaptButton: {
    alignItems: 'center',
    borderColor: colors.line,
    borderRadius: radius.md,
    borderWidth: 1,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  adaptButtonActive: {
    backgroundColor: colors.blueSoft,
    borderColor: colors.blue,
  },
  adaptedLabel: {
    color: colors.blue,
    fontSize: typeScale.caption,
    fontWeight: '700',
  },
  completed: {
    color: colors.textMuted,
    textDecorationLine: 'line-through',
  },
  copy: {
    flex: 1,
    gap: spacing.xs,
  },
  detail: {
    color: colors.textMuted,
    fontSize: typeScale.caption,
    lineHeight: 19,
  },
  pressed: {
    opacity: 0.65,
  },
  row: {
    alignItems: 'flex-start',
    borderBottomColor: colors.line,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    gap: spacing.md,
    minHeight: 88,
    paddingVertical: spacing.lg,
  },
  statusButton: {
    alignItems: 'center',
    borderColor: colors.line,
    borderRadius: radius.md,
    borderWidth: 1,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  statusButtonKept: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  title: {
    color: colors.text,
    flexShrink: 1,
    fontSize: typeScale.body,
    fontWeight: '700',
    lineHeight: 22,
  },
  titleRow: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
});
