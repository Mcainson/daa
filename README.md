# DAA

Daily Accountability Agent is an iOS-first React Native application for planning,
difficult-moment support, honest review, and gradual self-coaching.

## Current Slice

The repository now contains:

- an Expo SDK 57 mobile app with Today, Rescue, Progress, Coach, and Settings
- strict TypeScript and runtime Zod contracts
- pure commitment-state transitions
- deterministic fast-command and coach-mode routing
- Vitest tests for contracts, domain behavior, and the coaching harness
- Jest Expo and React Native Testing Library for mobile components
- ESLint, Prettier, type checks, and coverage commands

The Coach screen currently uses a deterministic prototype adapter. It does not
send private data to a model or pretend that remote AI is already configured.

## Repository

```text
apps/mobile/              Expo and React Native application
packages/contracts/       Runtime schemas and inferred TypeScript types
packages/domain/          Pure DAA domain behavior
packages/coach-harness/   Mode routing and provider-independent coach runtime
core/                     Original DAA method, protocols, and safety policy
docs/                     Architecture and implementation plans
schemas/                  Existing V1 data contracts
```

## Development

Requirements: Node.js 22 or newer and pnpm 11.

```powershell
pnpm install
pnpm dev
pnpm dev:web
pnpm check
pnpm test:coverage
```

The iOS app uses an Expo development build so native integrations such as
HealthKit can be added behind adapters. On Windows, use EAS for an iPhone build
or use the web target for local UI iteration.

## Plans

- [Mobile and AI harness architecture](docs/MOBILE_HARNESS_ARCHITECTURE.md)
- [Implementation plan](docs/IMPLEMENTATION_PLAN.md)
- [RAG, vector store, and MCP use cases](docs/AI_EXTENSION_USE_CASES.md)
