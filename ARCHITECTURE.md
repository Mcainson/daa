# DAA Architecture

DAA is a provider-neutral accountability coaching system with thin adapters for
chat products, schedulers, storage, and notifications.

## Boundaries

The core owns:

- coaching principles and tone
- session protocols
- safety and escalation rules
- profile, goal, check-in, and review contracts
- pattern detection and intervention selection

Adapters own:

- model-provider instructions
- conversation and tool invocation
- scheduling and notifications
- persistence implementation
- user-interface presentation

The core must not depend on ChatGPT, a specific model, a database, a scheduler,
or a user interface.

## Core Operations

```text
onboard(profile) -> profile + initial goals
plan_day(profile, goals, recent_history) -> daily plan
handle_moment(profile, event, recent_history) -> next deliberate action
review_day(profile, daily_plan, observed_day) -> daily review
review_week(profile, daily_reviews, measurements) -> weekly review
adjust_goal(profile, goal, evidence) -> revised goal
```

## Version 1 Adapter

The ChatGPT Work adapter is implemented as the `daily-accountability-agent`
personal skill. It supports a persistent task, scheduled morning and evening
check-ins, on-demand rescue conversations, and weekly reviews.

Structured user data should be kept in a user-selected DAA project. Conversation
memory is useful context but is not the canonical store for measurements or
commitments.

## Future Product

A standalone product can replace each adapter independently:

- Work task history with an application database
- Work scheduled tasks with a job scheduler and push notifications
- the Work skill with provider-specific prompt adapters
- the conversation UI with mobile, web, voice, or messaging clients

Do not distribute private source emails or reproduce another coaching service's
course copy. DAA's behavior must use original language and general behavioral
principles.
