import { z } from 'zod';

export const coachModeSchema = z.enum([
  'onboarding',
  'morning_plan',
  'rescue',
  'lapse_recovery',
  'evening_review',
  'weekly_review',
  'general_chat',
]);

export type CoachMode = z.infer<typeof coachModeSchema>;

export const commitmentAreaSchema = z.enum(['eating', 'movement', 'recovery', 'work', 'personal']);

export type CommitmentArea = z.infer<typeof commitmentAreaSchema>;

export const commitmentStatusSchema = z.enum(['kept', 'adapted', 'missed', 'recovered']);

export type CommitmentStatus = z.infer<typeof commitmentStatusSchema>;

export const commitmentSchema = z.object({
  area: commitmentAreaSchema,
  detail: z.string().trim().min(1).max(240),
  id: z.string().trim().min(1),
  status: commitmentStatusSchema.nullable(),
  title: z.string().trim().min(1).max(120),
});

export type Commitment = z.infer<typeof commitmentSchema>;

export const dailyPlanSchema = z.object({
  commitments: z.array(commitmentSchema).min(1).max(3),
  id: z.string().trim().min(1),
  implementationIntention: z.string().trim().min(1).max(320),
  likelyChallenge: z.string().trim().min(1).max(240),
  localDate: z.iso.date(),
  primaryOutcome: z.string().trim().min(1).max(160),
});

export type DailyPlan = z.infer<typeof dailyPlanSchema>;

export const coachInputSchema = z
  .object({
    explicitMode: coachModeSchema.optional(),
    locale: z.string().trim().min(2).default('en'),
    message: z.string().trim().max(4_000).optional(),
    source: z.enum(['structured_flow', 'chat', 'notification']),
    timezone: z.string().trim().min(1),
  })
  .refine((input) => input.explicitMode !== undefined || Boolean(input.message), {
    message: 'A coach turn needs an explicit mode or a message.',
  });

export type CoachInput = z.infer<typeof coachInputSchema>;

const proposedActionSchema = z.object({
  payload: z.record(z.string(), z.unknown()),
  requiresConfirmation: z.boolean(),
  type: z.enum([
    'save_check_in',
    'set_commitment_status',
    'adapt_commitment',
    'schedule_follow_up',
  ]),
});

export const coachTurnResultSchema = z.object({
  message: z.string().trim().min(1).max(2_000),
  mode: coachModeSchema,
  nextQuestion: z.string().trim().min(1).max(320).optional(),
  proposedActions: z.array(proposedActionSchema).max(3),
  safety: z.object({
    flags: z.array(z.string()),
    route: z.enum(['normal', 'qualified_help', 'urgent_help']),
  }),
  trace: z.object({
    policyVersion: z.string().trim().min(1),
    promptVersion: z.string().trim().min(1),
  }),
});

export type CoachTurnResult = z.infer<typeof coachTurnResultSchema>;
