import type { CoachInput, CoachMode, CoachTurnResult } from '@daa/contracts';

export type RouteReason =
  'explicit_mode' | 'fast_command' | 'session_language' | 'general_fallback';

export type RoutedCoachMode = {
  confidence: 'high' | 'medium' | 'low';
  mode: CoachMode;
  reason: RouteReason;
};

const normalize = (value: string): string =>
  value
    .trim()
    .toLocaleLowerCase()
    .replace(/[\u2019']/g, ' ')
    .replace(/[.,!?;:]+/g, ' ')
    .replace(/\s+/g, ' ');

export function routeCoachMode(input: CoachInput): RoutedCoachMode {
  if (input.explicitMode !== undefined) {
    return { confidence: 'high', mode: input.explicitMode, reason: 'explicit_mode' };
  }

  const message = normalize(input.message ?? '');

  if (/\b(i slipped|i blew it|lapse|overate)\b/.test(message)) {
    return { confidence: 'high', mode: 'lapse_recovery', reason: 'fast_command' };
  }

  if (/\b(craving|restaurant|gym resistance|plan changed|urge)\b/.test(message)) {
    return { confidence: 'high', mode: 'rescue', reason: 'fast_command' };
  }

  if (/\b(morning|plan my day|today s plan)\b/.test(message)) {
    return { confidence: 'medium', mode: 'morning_plan', reason: 'session_language' };
  }

  if (/\b(evening|review my day|check in)\b/.test(message)) {
    return { confidence: 'medium', mode: 'evening_review', reason: 'session_language' };
  }

  if (/\b(weekly|review my week)\b/.test(message)) {
    return { confidence: 'medium', mode: 'weekly_review', reason: 'session_language' };
  }

  return { confidence: 'low', mode: 'general_chat', reason: 'general_fallback' };
}

const prototypeMessages: Record<CoachMode, string> = {
  onboarding: 'Let us shape one realistic first-week experiment around your actual schedule.',
  morning_plan: 'Let us make today concrete before the difficult moment arrives.',
  rescue: 'Pause for one deliberate choice. We only need to improve the next ten minutes.',
  lapse_recovery:
    'One event does not decide the rest of the day. The next normal action matters now.',
  evening_review: 'We will review the facts without labeling the whole day good or bad.',
  weekly_review:
    'Let us look for one supported pattern and one experiment for the next seven days.',
  general_chat: 'I can help you turn this into one specific next action.',
};

export function createPrototypeCoachTurn(input: CoachInput): CoachTurnResult {
  const route = routeCoachMode(input);

  return {
    message: prototypeMessages[route.mode],
    mode: route.mode,
    nextQuestion:
      route.mode === 'rescue' || route.mode === 'lapse_recovery'
        ? 'What is happening right now?'
        : 'What would a useful next action look like?',
    proposedActions: [],
    safety: { flags: [], route: 'normal' },
    trace: { policyVersion: 'daa-safety-v1', promptVersion: 'prototype-v1' },
  };
}
