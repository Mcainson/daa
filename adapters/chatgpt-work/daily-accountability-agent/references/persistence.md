# DAA Persistence

## Storage Contract

Use persistence only when the user selected a DAA project and
`data/profile.json` contains `persistence.enabled: true`.

Keep personal records under `data/`, which must remain excluded from Git:

```text
data/
  profile.json
  check-ins/YYYY-MM-DD.json
  weekly-reviews/YYYY-MM-DD.json
```

Local JSON is canonical. Conversation history and external dashboards are
convenience views, not authoritative records.

## Session Reads

- Read `data/profile.json` before a personalized session.
- For a morning plan, also read today's record if it exists.
- For an evening review, read today's plan before asking about results.
- For a weekly review or analyst run, read the available records covering the
  requested week. Do not invent missing days.

If a file is absent or invalid, continue the conversation and ask only for the
minimum missing fact. Never fabricate a record to fill a gap.

## Session Writes

Write a daily record only after the user has answered the protocol questions and
the session closes. Validate it against `schemas/daily-check-in.schema.json`.

Write a weekly record only after the review is complete. Validate it against
`schemas/weekly-review.schema.json`.

Do not silently rewrite a completed prior-day record. Ask before correcting it.
Never commit, push, attach, or expose files under `data/`.

## Dashboard Projection

Sync a dashboard row only when `persistence.dashboard_sync` is `consented` and
the profile contains dashboard configuration. Sync only the fields needed for
accountability trends. Do not include medical history, source emails, private
free-form notes, or meal photos.

The local record wins if the dashboard and local file disagree. A dashboard
failure must not block coaching; report the failure briefly and keep the local
record.

## Weekly Analyst

The analyst reads local daily records, produces one evidence-based weekly review,
and writes it under `data/weekly-reviews/`. It may identify patterns and propose
one experiment. It must not message the user as a competing coach, alter goals,
or create facts for missing check-ins.
