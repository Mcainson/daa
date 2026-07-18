import { StyleSheet, Text, View } from 'react-native';

import { Screen } from '@/components/screen';
import { SectionHeading } from '@/components/section-heading';
import { colors, radius, spacing, typeScale } from '@/theme/tokens';

const week = [
  { day: 'Mon', value: 0.7 },
  { day: 'Tue', value: 1 },
  { day: 'Wed', value: 0.45 },
  { day: 'Thu', value: 0.8 },
  { day: 'Fri', value: 0.65 },
  { day: 'Sat', value: 0.9 },
  { day: 'Sun', value: 0.55 },
];

export default function ProgressScreen() {
  return (
    <Screen>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>LAST 7 DAYS</Text>
        <Text style={styles.title}>Progress</Text>
        <Text style={styles.subtitle}>Evidence from actions, adaptations, and recovery.</Text>
      </View>

      <View style={styles.metrics}>
        <View style={styles.metric}>
          <Text style={styles.metricValue}>8</Text>
          <Text style={styles.metricLabel}>Kept</Text>
        </View>
        <View style={styles.metric}>
          <Text style={[styles.metricValue, styles.blue]}>3</Text>
          <Text style={styles.metricLabel}>Adapted</Text>
        </View>
        <View style={styles.metric}>
          <Text style={[styles.metricValue, styles.coral]}>2</Text>
          <Text style={styles.metricLabel}>Recovered</Text>
        </View>
      </View>

      <View style={styles.section}>
        <SectionHeading title="Daily follow-through" />
        <View accessibilityLabel="Seven day follow-through chart" style={styles.chart}>
          {week.map(({ day, value }) => (
            <View key={day} style={styles.barColumn}>
              <View style={styles.barTrack}>
                <View style={[styles.barFill, { height: `${value * 100}%` }]} />
              </View>
              <Text style={styles.day}>{day}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <SectionHeading title="Pattern worth testing" />
        <View style={styles.insightBand}>
          <Text style={styles.insightTitle}>Prepare before the drive home</Text>
          <Text style={styles.insightBody}>
            The difficult evenings followed late meetings. This week&apos;s experiment is to decide
            the meal before leaving work.
          </Text>
          <View style={styles.signalRow}>
            <Text style={styles.signalLabel}>Success signal</Text>
            <Text style={styles.signal}>3 deliberate decisions</Text>
          </View>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  barColumn: {
    alignItems: 'center',
    flex: 1,
    gap: spacing.sm,
  },
  barFill: {
    backgroundColor: colors.primary,
    borderRadius: radius.sm,
    bottom: 0,
    left: 0,
    position: 'absolute',
    width: '100%',
  },
  barTrack: {
    backgroundColor: colors.primarySoft,
    borderRadius: radius.sm,
    height: 132,
    overflow: 'hidden',
    width: 24,
  },
  blue: { color: colors.blue },
  chart: {
    alignItems: 'flex-end',
    backgroundColor: colors.surface,
    borderColor: colors.line,
    borderRadius: radius.md,
    borderWidth: 1,
    flexDirection: 'row',
    gap: spacing.sm,
    minHeight: 188,
    padding: spacing.lg,
  },
  coral: { color: colors.coral },
  day: {
    color: colors.textMuted,
    fontSize: typeScale.caption,
    fontWeight: '600',
  },
  eyebrow: {
    color: colors.primary,
    fontSize: typeScale.caption,
    fontWeight: '800',
  },
  header: {
    gap: spacing.sm,
    paddingBottom: spacing.xl,
    paddingTop: spacing.lg,
  },
  insightBand: {
    backgroundColor: colors.amberSoft,
    borderRadius: radius.md,
    gap: spacing.sm,
    padding: spacing.lg,
  },
  insightBody: {
    color: colors.textMuted,
    fontSize: typeScale.body,
    lineHeight: 23,
  },
  insightTitle: {
    color: colors.text,
    fontSize: typeScale.heading,
    fontWeight: '700',
  },
  metric: {
    flex: 1,
    gap: spacing.xs,
  },
  metricLabel: {
    color: colors.textMuted,
    fontSize: typeScale.caption,
    fontWeight: '600',
  },
  metricValue: {
    color: colors.primary,
    fontSize: 28,
    fontWeight: '800',
  },
  metrics: {
    backgroundColor: colors.surface,
    borderColor: colors.line,
    borderRadius: radius.md,
    borderWidth: 1,
    flexDirection: 'row',
    padding: spacing.lg,
  },
  section: {
    marginTop: spacing.xxl,
  },
  signal: {
    color: colors.amber,
    fontSize: typeScale.caption,
    fontWeight: '800',
  },
  signalLabel: {
    color: colors.textMuted,
    fontSize: typeScale.caption,
    fontWeight: '600',
  },
  signalRow: {
    borderTopColor: 'rgba(145, 105, 29, 0.24)',
    borderTopWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
    paddingTop: spacing.md,
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
