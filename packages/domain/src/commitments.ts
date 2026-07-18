import type { CommitmentStatus, DailyPlan } from '@daa/contracts';

export function setCommitmentStatus(
  plan: DailyPlan,
  commitmentId: string,
  status: CommitmentStatus,
): DailyPlan {
  let found = false;
  const commitments = plan.commitments.map((commitment) => {
    if (commitment.id !== commitmentId) {
      return commitment;
    }

    found = true;
    return { ...commitment, status };
  });

  if (!found) {
    throw new Error(`Unknown commitment: ${commitmentId}`);
  }

  return { ...plan, commitments };
}

export function completedCommitmentCount(plan: DailyPlan): number {
  return plan.commitments.filter(({ status }) => status === 'kept' || status === 'recovered')
    .length;
}
