import { z } from 'zod';

export const healthMetricCategorySchema = z.enum(['workouts', 'movement', 'sleep', 'body_mass']);

export type HealthMetricCategory = z.infer<typeof healthMetricCategorySchema>;

export const healthContextSummarySchema = z.object({
  consentVersion: z.string().trim().min(1),
  metrics: z.object({
    sleepMinutes: z.number().nonnegative().nullable().optional(),
    steps: z.number().int().nonnegative().nullable().optional(),
    workoutCompleted: z.boolean().nullable().optional(),
    workoutMinutes: z.number().nonnegative().nullable().optional(),
  }),
  missing: z.array(healthMetricCategorySchema),
  source: z.enum(['apple_healthkit', 'android_health_connect', 'manual']),
  window: z.object({
    end: z.iso.datetime({ offset: true }),
    start: z.iso.datetime({ offset: true }),
  }),
});

export type HealthContextSummary = z.infer<typeof healthContextSummarySchema>;
