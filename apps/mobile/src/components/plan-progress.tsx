import { StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing, typeScale } from '@/theme/tokens';

type PlanProgressProps = {
  completed: number;
  total: number;
};

export function PlanProgress({ completed, total }: PlanProgressProps) {
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <View accessibilityLabel={`${completed} of ${total} commitments kept or recovered`}>
      <View style={styles.labels}>
        <Text style={styles.label}>Today&apos;s follow-through</Text>
        <Text style={styles.value}>
          {completed} / {total}
        </Text>
      </View>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${percent}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fill: {
    backgroundColor: colors.primary,
    borderRadius: radius.sm,
    height: '100%',
  },
  label: {
    color: colors.textMuted,
    fontSize: typeScale.caption,
    fontWeight: '600',
  },
  labels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  track: {
    backgroundColor: colors.line,
    borderRadius: radius.sm,
    height: 6,
    overflow: 'hidden',
  },
  value: {
    color: colors.text,
    fontSize: typeScale.caption,
    fontWeight: '700',
  },
});
