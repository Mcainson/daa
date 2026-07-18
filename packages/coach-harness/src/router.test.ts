import { describe, expect, it } from 'vitest';

import type { CoachInput, CoachMode } from '@daa/contracts';

import { createPrototypeCoachTurn, routeCoachMode } from './router';

const input = (message: string): CoachInput => ({
  locale: 'en',
  message,
  source: 'chat',
  timezone: 'America/Mexico_City',
});

describe('routeCoachMode', () => {
  it.each<[string, CoachMode]>([
    ['DAA, craving!', 'rescue'],
    ['I slipped.', 'lapse_recovery'],
    ['Restaurant', 'rescue'],
    ['Gym resistance', 'rescue'],
    ['Plan changed', 'rescue'],
    ['Can we review my week?', 'weekly_review'],
  ])('routes %s to %s', (message, expected) => {
    expect(routeCoachMode(input(message)).mode).toBe(expected);
  });

  it('always respects an explicit structured-flow mode', () => {
    expect(
      routeCoachMode({
        explicitMode: 'evening_review',
        locale: 'en',
        source: 'structured_flow',
        timezone: 'America/Mexico_City',
      }),
    ).toEqual({ confidence: 'high', mode: 'evening_review', reason: 'explicit_mode' });
  });
});

describe('createPrototypeCoachTurn', () => {
  it('returns a validated-shape lapse recovery response', () => {
    const result = createPrototypeCoachTurn(input('I blew it at lunch'));

    expect(result.mode).toBe('lapse_recovery');
    expect(result.safety.route).toBe('normal');
    expect(result.nextQuestion).toBe('What is happening right now?');
  });
});
