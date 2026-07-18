# DAA Implementation Plan

Status: active

Updated: 2026-07-17

This is the execution backlog for turning the current local vertical slice into
a private iOS beta and then a paid product. Task order follows privacy and safety
dependencies, not feature novelty.

## Product Goal

DAA should help a member make a realistic plan, act at a difficult moment, review
the facts without shame, recover quickly after a lapse, and gradually need less
external prompting.

The mobile app is the only member-facing V1 product. A thin backend will provide
authentication, canonical sync, AI access, adaptive push, billing, export, and
deletion. HealthKit remains optional and device-side by default.

## Current Baseline

- [x] Expo SDK 57 React Native application with typed routes
- [x] Today screen with no more than three commitments
- [x] `kept` and `adapted` commitment interactions
- [x] Fast Rescue entry points and an interactive ten-minute rescue flow
- [x] Progress, prototype Coach, and Settings surfaces
- [x] Shared Zod contracts and inferred TypeScript types
- [x] Pure domain status transitions
- [x] Deterministic mode and fast-command router
- [x] Fake coach response adapter with no network or model key
- [x] Strict TypeScript, ESLint, Prettier, Vitest, Jest Expo, and coverage setup
- [x] Expo development-build, SQLite, and native icon dependencies installed
- [x] Dependency and peer-dependency audit clean

## Milestones

| Milestone               | Outcome                                                              | Exit Gate                                                                 |
| ----------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| M0 Foundation           | Runnable typed application and test harness                          | Complete                                                                  |
| M1 Local seven-day loop | One member can onboard, plan, rescue, review, and export offline     | All flows persist across restart and pass accessibility smoke tests       |
| M2 Synced AI alpha      | Authenticated backend, sync, remote AI harness, and adaptive push    | Golden scenarios pass; no duplicate writes; deletion is verified          |
| M3 HealthKit beta       | Optional read-only health summaries with explicit AI consent         | Physical-iPhone permission, revoke, missing-data, and deletion tests pass |
| M4 Paid iOS beta        | StoreKit, support operations, privacy package, and TestFlight cohort | Four-week beta metrics and App Store checklist meet launch thresholds     |
| M5 Android              | Health Connect and Android release parity                            | Cross-platform contracts pass and Android-specific QA is complete         |

## M1: Local Seven-Day Loop

### Product Flows

- [ ] `DAA-101` Build one-question-at-a-time onboarding with resumable progress.
- [ ] `DAA-102` Capture primary goal, up to two secondary goals, baseline,
      schedule, difficult moments, preferences, constraints, and coaching style.
- [ ] `DAA-103` Capture clinician guidance or limitations without requiring
      unnecessary medical details.
- [ ] `DAA-104` Create a first seven-day experiment and observable success signal.
- [ ] `DAA-105` Build Morning Plan: primary outcome, up to three commitments,
      broad eating plan, movement/recovery action, likely disruption, and one
      implementation intention.
- [ ] `DAA-106` Add commitment creation, editing, adaptation, and deliberate pause.
- [ ] `DAA-107` Complete Rescue variants for craving, restaurant, gym resistance,
      and changed plans.
- [ ] `DAA-108` Build a distinct lapse-recovery flow that interrupts all-or-nothing
      language and selects the next normal action.
- [ ] `DAA-109` Build Evening Review with kept, adapted, missed, and recovered
      statuses and at most one lapse examined in depth.
- [ ] `DAA-110` Record the earliest useful intervention point in the behavior
      sequence.
- [ ] `DAA-111` Build Weekly Review with code-computed totals, supported patterns,
      one seven-day experiment, and one independence skill.
- [ ] `DAA-112` Build a missed-check-in return flow with no guilt or forced history
      reconstruction.
- [ ] `DAA-113` Replace prototype progress values with real local aggregates.
- [ ] `DAA-114` Add explicit loading, empty, partial, offline, and error states to
      every flow.
- [ ] `DAA-115` Add English and Spanish copy catalogs before strings proliferate.

### Local Persistence

- [ ] `DAA-120` Define repository interfaces for profile, goal, plan, commitment,
      check-in, behavior event, weekly review, consent, and notification preference.
- [ ] `DAA-121` Define versioned SQLite migrations and a migration test harness.
- [ ] `DAA-122` Implement SQLite profile and goal repositories.
- [ ] `DAA-123` Implement daily-plan and commitment repositories.
- [ ] `DAA-124` Implement check-in, behavior-event, and weekly-review repositories.
- [ ] `DAA-125` Add transactions for multi-record flow completion.
- [ ] `DAA-126` Add an idempotent mutation outbox for future sync.
- [ ] `DAA-127` Add a fake clock and deterministic timezone/date utilities.
- [ ] `DAA-128` Encrypt tokens in OS secure storage; do not place secrets in SQLite.
- [ ] `DAA-129` Define local retention and cleanup behavior.
- [ ] `DAA-130` Export consented local records as versioned JSON.
- [ ] `DAA-131` Add destructive-operation confirmations and local deletion tests.

### Local Notifications

- [ ] `DAA-140` Add notification permission education and a user-initiated prompt.
- [ ] `DAA-141` Schedule morning, evening, and weekly local notifications.
- [ ] `DAA-142` Add timezone changes, daylight-saving behavior, and quiet hours.
- [ ] `DAA-143` Deep-link each notification to the exact incomplete flow.
- [ ] `DAA-144` Cancel or replace notifications when a plan changes or completes.
- [ ] `DAA-145` Keep lock-screen copy generic and free of health or lapse details.
- [ ] `DAA-146` Add denied-permission and notifications-disabled states.

### M1 Quality Gate

- [ ] `DAA-150` Unit-test all domain transitions and schema boundaries.
- [ ] `DAA-151` Add component tests for commitment status, rescue selection,
      onboarding resume, and review submission.
- [ ] `DAA-152` Add Maestro flows for onboarding, one full day, lapse recovery,
      offline restart, and export.
- [ ] `DAA-153` Run VoiceOver, Dynamic Type, contrast, reduced-motion, and touch
      target checks.
- [ ] `DAA-154` Dogfood the local app for seven consecutive days and record UX
      friction separately from coaching outcomes.

## M2: Thin Backend and Synced AI Alpha

### API and State

- [ ] `DAA-201` Scaffold a TypeScript API service and worker in `apps/api`.
- [ ] `DAA-202` Define shared HTTP contracts and generated client types.
- [ ] `DAA-203` Add Sign in with Apple and short-lived application sessions.
- [ ] `DAA-204` Add PostgreSQL migrations for all structured records.
- [ ] `DAA-205` Enforce per-user authorization on every repository operation.
- [ ] `DAA-206` Add automated cross-tenant isolation tests.
- [ ] `DAA-207` Implement idempotent batch sync with record versions and conflict
      responses.
- [ ] `DAA-208` Resolve domain conflicts explicitly; do not use generic
      last-write-wins for commitments or consent.
- [ ] `DAA-209` Add a PostgreSQL-backed worker for follow-ups and deletion jobs.
- [ ] `DAA-210` Add server-side export and auditable account deletion.
- [ ] `DAA-211` Add backups, restore tests, migrations in CI, and rollback notes.

### AI Harness

- [ ] `DAA-220` Define a provider-neutral model adapter with task, risk, latency,
      budget, and retention metadata.
- [ ] `DAA-221` Implement the first remote provider adapter on the server only.
- [ ] `DAA-222` Keep provider keys in managed server secrets and rotate them.
- [ ] `DAA-223` Implement deterministic input red-flag checks before model calls.
- [ ] `DAA-224` Build the minimum-context assembler from profile, today, recent
      matching events, and consented summaries.
- [ ] `DAA-225` Version prompts, policy, tools, and response schemas independently.
- [ ] `DAA-226` Implement strict read tools: today plan, relevant recent events,
      and week aggregates.
- [ ] `DAA-227` Implement validated write tools with user, version, idempotency,
      and consent context.
- [ ] `DAA-228` Require confirmation for plan changes, health sharing, and sensitive
      follow-ups.
- [ ] `DAA-229` Validate model output shape and run deterministic output safety
      checks before display or execution.
- [ ] `DAA-230` Stream ordinary chat while keeping tool writes transactional.
- [ ] `DAA-231` Add task-based model routing and one evaluated fallback.
- [ ] `DAA-232` Track model, prompt version, latency, token use, cost, tool errors,
      and safety route without logging raw private content.
- [ ] `DAA-233` Add timeout, retry, circuit-breaker, and graceful local fallback
      behavior.

### Evaluations

- [ ] `DAA-240` Convert current golden scenarios into versioned provider evals.
- [ ] `DAA-241` Add safety cases for disordered eating, dangerous restriction,
      injury, acute symptoms, self-harm, and clinician conflict.
- [ ] `DAA-242` Grade correct mode, one-question behavior, non-shaming tone,
      evidence grounding, action size, tool choice, and safety route.
- [ ] `DAA-243` Add adversarial prompt-injection and unauthorized-tool cases.
- [ ] `DAA-244` Set regression thresholds that block prompt or model promotion.
- [ ] `DAA-245` Keep a human-reviewed sample for nuanced coaching quality.
- [ ] `DAA-246` Compare quality per dollar before routing work to a cheaper model.

### Remote Notifications

- [ ] `DAA-250` Register push tokens with device, app version, locale, and timezone.
- [ ] `DAA-251` Add generic adaptive follow-ups with delivery retries.
- [ ] `DAA-252` Prevent duplicate local and remote prompts.
- [ ] `DAA-253` Respect quiet hours, pause, opt-out, and account deletion instantly.
- [ ] `DAA-254` Measure send, delivery, open, completion, and opt-out without health
      content in analytics.

## M3: HealthKit Beta

- [ ] `DAA-301` Compare maintained React Native HealthKit libraries with a small
      Expo native module using a physical-device spike.
- [ ] `DAA-302` Keep the selected library behind `HealthContextProvider`.
- [ ] `DAA-303` Add clear purpose strings and per-category authorization.
- [ ] `DAA-304` Request read-only workouts, movement, sleep, and optional body mass
      separately.
- [ ] `DAA-305` Model unknown, not requested, unavailable, denied-looking-empty,
      partial, and available states without guessing.
- [ ] `DAA-306` Summarize raw samples on-device into bounded time-window metrics.
- [ ] `DAA-307` Add separate consent for each health category shared with AI.
- [ ] `DAA-308` Store consent version, source, time window, freshness, and missing
      categories with each uploaded summary.
- [ ] `DAA-309` Never send raw HealthKit samples, locations, clinical records, or
      unrelated health types in V1.
- [ ] `DAA-310` Add disconnect, revoke, retention, export, and deletion behavior.
- [ ] `DAA-311` Test no permission, partial permission, revoked permission,
      unavailable store, offline mode, and timezone boundaries on a physical iPhone.
- [ ] `DAA-312` Verify that coaching remains fully usable without HealthKit.

## M4: Paid iOS Beta

### Privacy, Safety, and Security

- [ ] `DAA-401` Complete a data-flow diagram and threat model.
- [ ] `DAA-402` Publish privacy policy, terms, support, and account-deletion pages.
- [ ] `DAA-403` Disclose each AI provider, purpose, retention posture, and data
      categories before consent.
- [ ] `DAA-404` Review App Store health, AI-sharing, privacy, and subscription rules.
- [ ] `DAA-405` Redact logs, traces, crash reports, analytics, and push payloads.
- [ ] `DAA-406` Add rate limits, abuse controls, secure headers, dependency scans,
      and secret scans.
- [ ] `DAA-407` Add local emergency-resource lookup and reviewed escalation copy.
- [ ] `DAA-408` Test all export, revoke, and deletion workflows end to end.
- [ ] `DAA-409` Commission a security review before expanding the beta.

### Billing and Operations

- [ ] `DAA-420` Define free trial, subscription tiers, usage budgets, and limits
      without using manipulative streak pressure.
- [ ] `DAA-421` Implement StoreKit purchase, restore, renewal, grace period, refund,
      and cancellation states.
- [ ] `DAA-422` Verify entitlements server-side and cache a bounded offline state.
- [ ] `DAA-423` Add per-member model budgets and graceful limit behavior.
- [ ] `DAA-424` Add privacy-safe operational dashboards for activation, check-in
      completion, recovery use, retention, failures, latency, and cost.
- [ ] `DAA-425` Add support tooling with least privilege and an access audit log.
- [ ] `DAA-426` Write incident, provider outage, safety escalation, backup, and
      deletion runbooks.

### Release Quality

- [ ] `DAA-440` Add CI for install, peer audit, format, lint, typecheck, unit tests,
      mobile tests, API tests, migrations, and EAS preview builds.
- [ ] `DAA-441` Test supported iPhone sizes, oldest supported iOS, slow networks,
      offline mode, interrupted sync, and app upgrades.
- [ ] `DAA-442` Finish English and Spanish localization and locale-specific dates.
- [ ] `DAA-443` Verify VoiceOver, Dynamic Type, contrast, keyboard behavior, reduced
      motion, and notification actions.
- [ ] `DAA-444` Profile startup, Today rendering, SQLite queries, sync payloads,
      chat latency, battery, and memory.
- [ ] `DAA-445` Create non-default app icon, splash, screenshots, App Store copy,
      privacy labels, and review notes.
- [ ] `DAA-446` Run an internal alpha, then a small TestFlight cohort.
- [ ] `DAA-447` Review activation, four-week retention, check-in completion,
      notification opt-out, safety events, cost, and qualitative usefulness.
- [ ] `DAA-448` Launch only after deletion, restore purchase, provider outage, and
      safety escalation drills pass.

## M5: Android

- [ ] `DAA-501` Add Android build signing, CI, notification channels, and deep links.
- [ ] `DAA-502` Implement `HealthConnectProvider` against the existing health
      summary contract.
- [ ] `DAA-503` Add Health Connect availability, permission, revoke, and migration
      states.
- [ ] `DAA-504` Add Google Play billing and backend entitlement parity.
- [ ] `DAA-505` Verify TalkBack, font scaling, back behavior, background limits,
      OEM notification behavior, and supported Android versions.
- [ ] `DAA-506` Run a separate Android beta before claiming feature parity.

## AI Extension Gates

- [ ] `DAA-601` Add curated RAG only when the approved corpus needs semantic
      retrieval or citations; evaluate retrieval before production use.
- [ ] `DAA-602` Use a vector store only as an index for reviewed documents, not as
      the source of truth for user records.
- [ ] `DAA-603` Consider consented semantic search over personal history only after
      structured SQL retrieval is proven insufficient and deletion is reliable.
- [ ] `DAA-604` Expose DAA tools through MCP when a second agent client needs them.
- [ ] `DAA-605` Consume external MCP only for trusted, allowlisted integrations
      with OAuth, data minimization, and approval on writes.
- [ ] `DAA-606` Never expose raw HealthKit data through MCP.

See `AI_EXTENSION_USE_CASES.md` for the concrete cases and adoption criteria.

## Next Ten Tasks

The recommended next implementation sequence is:

1. `DAA-120` Repository interfaces.
2. `DAA-121` SQLite migrations and migration tests.
3. `DAA-123` Daily-plan and commitment persistence.
4. `DAA-101` Resumable onboarding shell.
5. `DAA-105` Persisted Morning Plan.
6. `DAA-107` Persisted Rescue behavior events.
7. `DAA-108` Dedicated lapse recovery.
8. `DAA-109` Persisted Evening Review.
9. `DAA-141` Local check-in scheduling.
10. `DAA-154` Seven-day local dogfood.

Do not begin the backend or remote AI until the local daily loop can survive app
restart, offline use, and honest imperfect data.

## Definition of Done

A task is done only when:

- behavior and failure states are implemented, not merely displayed
- runtime input is validated at the boundary
- TypeScript, lint, formatting, tests, and peer checks pass
- accessibility labels and touch targets are present
- sensitive data is minimized and excluded from ordinary logs
- tests cover the important state transition or user workflow
- relevant architecture, privacy, or operational documentation is updated
