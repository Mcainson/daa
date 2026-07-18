import { describe, expect, it } from 'vitest';

import type { DailyPlan } from '@daa/contracts';

import { completedCommitmentCount, setCommitmentStatus } from './commitments';

const plan: DailyPlan = {
  commitments: [
    {
      area: 'movement',
      detail: 'Complete the planned session or adapt for recovery.',
      id: 'gym',
      status: null,
      title: 'Gym plan',
    },
  ],
  id: 'today',
  implementationIntention: 'If energy is low, I will do the recovery version.',
  likelyChallenge: 'Low energy after work',
  localDate: '2026-07-17',
  primaryOutcome: 'Make the next deliberate choice.',
};

describe('setCommitmentStatus', () => {
  it('returns a new plan with the requested status', () => {
    const updated = setCommitmentStatus(plan, 'gym', 'adapted');

    expect(updated).not.toBe(plan);
    expect(updated.commitments[0]?.status).toBe('adapted');
    expect(plan.commitments[0]?.status).toBeNull();
  });

  it('rejects an unknown commitment', () => {
    expect(() => setCommitmentStatus(plan, 'unknown', 'kept')).toThrow('Unknown commitment');
  });
});

describe('completedCommitmentCount', () => {
  it('counts kept and recovered actions as completed', () => {
    const kept = setCommitmentStatus(plan, 'gym', 'recovered');

    expect(completedCommitmentCount(kept)).toBe(1);
  });
});
