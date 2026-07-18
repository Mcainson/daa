import { describe, expect, it } from 'vitest';

import { coachInputSchema, dailyPlanSchema } from './coach';

describe('dailyPlanSchema', () => {
  it('accepts no more than three concrete commitments', () => {
    const baseCommitment = {
      area: 'eating' as const,
      detail: 'Eat the meal already planned.',
      status: null,
      title: 'Planned lunch',
    };

    const result = dailyPlanSchema.safeParse({
      commitments: [1, 2, 3, 4].map((id) => ({ ...baseCommitment, id: String(id) })),
      id: 'plan-1',
      implementationIntention: 'If work runs late, I will use the prepared meal.',
      likelyChallenge: 'A late meeting',
      localDate: '2026-07-17',
      primaryOutcome: 'Follow the broad meal plan.',
    });

    expect(result.success).toBe(false);
  });
});

describe('coachInputSchema', () => {
  it('requires either an explicit mode or a message', () => {
    const result = coachInputSchema.safeParse({
      source: 'chat',
      timezone: 'America/Mexico_City',
    });

    expect(result.success).toBe(false);
  });
});
