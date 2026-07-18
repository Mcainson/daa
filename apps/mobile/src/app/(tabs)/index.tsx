import type { CommitmentStatus } from '@daa/contracts';
import { completedCommitmentCount, setCommitmentStatus } from '@daa/domain';
import { useRouter } from 'expo-router';
import { CalendarClock, Dumbbell, RotateCcw, Utensils, Zap } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { CommitmentRow } from '@/components/commitment-row';
import { PlanProgress } from '@/components/plan-progress';
import { RescueAction } from '@/components/rescue-action';
import { Screen } from '@/components/screen';
import { SectionHeading } from '@/components/section-heading';
import { createDemoDailyPlan } from '@/data/demo-plan';
import { colors, radius, spacing, typeScale } from '@/theme/tokens';

const rescueActions = [
  { icon: Zap, label: 'Craving', mode: 'craving', tone: 'coral' as const },
  { icon: Utensils, label: 'Restaurant', mode: 'restaurant', tone: 'amber' as const },
  { icon: RotateCcw, label: 'I slipped', mode: 'slipped', tone: 'blue' as const },
  { icon: Dumbbell, label: 'Gym resistance', mode: 'gym', tone: 'green' as const },
];

function formattedToday(): string {
  return new Intl.DateTimeFormat(undefined, {
    day: 'numeric',
    month: 'long',
    weekday: 'long',
  }).format(new Date());
}

export default function TodayScreen() {
  const router = useRouter();
  const initialPlan = useMemo(() => createDemoDailyPlan(), []);
  const [plan, setPlan] = useState(initialPlan);

  const updateStatus = (id: string, status: CommitmentStatus | null) => {
    if (status === null) {
      setPlan((current) => ({
        ...current,
        commitments: current.commitments.map((item) =>
          item.id === id ? { ...item, status: null } : item,
        ),
      }));
      return;
    }

    setPlan((current) => setCommitmentStatus(current, id, status));
  };

  const completed = completedCommitmentCount(plan);

  return (
    <Screen>
      <View style={styles.header}>
        <Text style={styles.date}>{formattedToday()}</Text>
        <Text style={styles.title}>Today</Text>
        <Text style={styles.outcome}>{plan.primaryOutcome}</Text>
      </View>

      <View style={styles.progressBand}>
        <PlanProgress completed={completed} total={plan.commitments.length} />
      </View>

      <View style={styles.section}>
        <SectionHeading action="Maximum 3" title="Your plan" />
        <View style={styles.commitmentList}>
          {plan.commitments.map((commitment) => (
            <CommitmentRow
              commitment={commitment}
              key={commitment.id}
              onStatusChange={(status) => updateStatus(commitment.id, status)}
            />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <SectionHeading action="Right now" title="Need a rescue?" />
        <View style={styles.rescueGrid}>
          {rescueActions.map((action) => (
            <RescueAction
              icon={action.icon}
              key={action.mode}
              label={action.label}
              onPress={() => router.push({ pathname: '/rescue', params: { mode: action.mode } })}
              tone={action.tone}
            />
          ))}
        </View>
      </View>

      <View style={styles.challengeBand}>
        <View style={styles.challengeIcon}>
          <CalendarClock color={colors.blue} size={22} />
        </View>
        <View style={styles.challengeCopy}>
          <Text style={styles.challengeLabel}>Most likely challenge</Text>
          <Text style={styles.challenge}>{plan.likelyChallenge}</Text>
          <Text style={styles.intention}>{plan.implementationIntention}</Text>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  challenge: {
    color: colors.text,
    fontSize: typeScale.body,
    fontWeight: '700',
    lineHeight: 22,
  },
  challengeBand: {
    alignItems: 'flex-start',
    backgroundColor: colors.blueSoft,
    borderRadius: radius.md,
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.xxl,
    padding: spacing.lg,
  },
  challengeCopy: {
    flex: 1,
    gap: spacing.xs,
  },
  challengeIcon: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  challengeLabel: {
    color: colors.blue,
    fontSize: typeScale.caption,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  commitmentList: {
    backgroundColor: colors.surface,
    borderColor: colors.line,
    borderRadius: radius.md,
    borderWidth: 1,
    paddingHorizontal: spacing.lg,
  },
  date: {
    color: colors.primary,
    fontSize: typeScale.label,
    fontWeight: '700',
  },
  header: {
    gap: spacing.sm,
    paddingBottom: spacing.xl,
    paddingTop: spacing.lg,
  },
  intention: {
    color: colors.textMuted,
    fontSize: typeScale.caption,
    lineHeight: 19,
    marginTop: spacing.xs,
  },
  outcome: {
    color: colors.textMuted,
    fontSize: typeScale.body,
    lineHeight: 23,
    maxWidth: 560,
  },
  progressBand: {
    backgroundColor: colors.surface,
    borderColor: colors.line,
    borderRadius: radius.md,
    borderWidth: 1,
    padding: spacing.lg,
  },
  rescueGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  section: {
    marginTop: spacing.xxl,
  },
  title: {
    color: colors.text,
    fontSize: typeScale.title,
    fontWeight: '800',
  },
});
