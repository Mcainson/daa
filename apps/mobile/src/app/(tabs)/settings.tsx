import { ChevronRight, HeartPulse, ShieldCheck } from 'lucide-react-native';
import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Switch, Text, View } from 'react-native';

import { Screen } from '@/components/screen';
import { SectionHeading } from '@/components/section-heading';
import { colors, radius, spacing, typeScale } from '@/theme/tokens';

type ToggleRowProps = {
  label: string;
  onValueChange: (value: boolean) => void;
  value: boolean;
};

function ToggleRow({ label, onValueChange, value }: ToggleRowProps) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Switch
        accessibilityLabel={label}
        onValueChange={onValueChange}
        thumbColor={colors.surface}
        trackColor={{ false: colors.line, true: colors.primary }}
        value={value}
      />
    </View>
  );
}

export default function SettingsScreen() {
  const [morning, setMorning] = useState(true);
  const [evening, setEvening] = useState(true);

  return (
    <Screen>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>Your cadence, data, and coaching boundaries.</Text>
      </View>

      <View style={styles.section}>
        <SectionHeading title="Check-ins" />
        <View style={styles.panel}>
          <ToggleRow label="Morning plan" onValueChange={setMorning} value={morning} />
          <ToggleRow label="Evening review" onValueChange={setEvening} value={evening} />
        </View>
      </View>

      <View style={styles.section}>
        <SectionHeading title="Health and privacy" />
        <View style={styles.panel}>
          <Pressable
            accessibilityLabel="Connect Apple Health"
            accessibilityRole="button"
            onPress={() =>
              Alert.alert('Apple Health', 'HealthKit is not connected in this prototype build.')
            }
            style={({ pressed }) => [styles.actionRow, pressed && styles.pressed]}
          >
            <View style={[styles.rowIcon, styles.healthIcon]}>
              <HeartPulse color={colors.coral} size={20} />
            </View>
            <View style={styles.rowCopy}>
              <Text style={styles.rowLabel}>Apple Health</Text>
              <Text style={styles.rowValue}>Not connected</Text>
            </View>
            <ChevronRight color={colors.textMuted} size={20} />
          </Pressable>
          <Pressable
            accessibilityLabel="Open privacy controls"
            accessibilityRole="button"
            onPress={() =>
              Alert.alert(
                'Privacy controls',
                'Consent, export, and deletion controls are planned with the local data layer.',
              )
            }
            style={({ pressed }) => [styles.actionRow, pressed && styles.pressed]}
          >
            <View style={[styles.rowIcon, styles.privacyIcon]}>
              <ShieldCheck color={colors.blue} size={20} />
            </View>
            <View style={styles.rowCopy}>
              <Text style={styles.rowLabel}>Privacy controls</Text>
              <Text style={styles.rowValue}>Consent, export, and deletion</Text>
            </View>
            <ChevronRight color={colors.textMuted} size={20} />
          </Pressable>
        </View>
      </View>

      <View style={styles.notice}>
        <Text style={styles.noticeTitle}>DAA is an AI accountability coach</Text>
        <Text style={styles.noticeBody}>
          It supports planning and reflection. It does not replace medical, nutrition, mental
          health, emergency, or qualified training care.
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  actionRow: {
    alignItems: 'center',
    borderBottomColor: colors.line,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    gap: spacing.md,
    minHeight: 68,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  healthIcon: { backgroundColor: colors.coralSoft },
  header: {
    gap: spacing.sm,
    paddingBottom: spacing.xl,
    paddingTop: spacing.lg,
  },
  notice: {
    backgroundColor: colors.blueSoft,
    borderRadius: radius.md,
    gap: spacing.sm,
    marginTop: spacing.xxl,
    padding: spacing.lg,
  },
  noticeBody: {
    color: colors.textMuted,
    fontSize: typeScale.caption,
    lineHeight: 19,
  },
  noticeTitle: {
    color: colors.text,
    fontSize: typeScale.label,
    fontWeight: '800',
  },
  panel: {
    backgroundColor: colors.surface,
    borderColor: colors.line,
    borderRadius: radius.md,
    borderWidth: 1,
    overflow: 'hidden',
  },
  pressed: { opacity: 0.65 },
  privacyIcon: { backgroundColor: colors.blueSoft },
  row: {
    alignItems: 'center',
    borderBottomColor: colors.line,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 62,
    paddingHorizontal: spacing.lg,
  },
  rowCopy: { flex: 1 },
  rowIcon: {
    alignItems: 'center',
    borderRadius: radius.md,
    height: 38,
    justifyContent: 'center',
    width: 38,
  },
  rowLabel: {
    color: colors.text,
    fontSize: typeScale.body,
    fontWeight: '700',
  },
  rowValue: {
    color: colors.textMuted,
    fontSize: typeScale.caption,
    marginTop: spacing.xs,
  },
  section: { marginTop: spacing.xl },
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
