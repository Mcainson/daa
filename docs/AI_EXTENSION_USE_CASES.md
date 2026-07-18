# DAA RAG, Vector Store, and MCP Use Cases

Status: staged, not required for the first local release

Updated: 2026-07-17

## Short Answer

DAA has real use cases for all three technologies, but they are not the same
feature and they should not arrive together.

1. **RAG is the first useful addition** when DAA has a larger reviewed coaching
   and safety knowledge base and needs source-grounded educational answers.
2. **A vector store is one possible index behind that RAG system.** It is useful
   for semantic similarity across documents, not for exact daily records.
3. **MCP becomes valuable later** when DAA should work from ChatGPT, Codex, or
   another agent, or when the DAA model needs a standard boundary to trusted
   external services such as a calendar.

None of them is needed for Today, Morning Plan, Rescue, Evening Review, local
notifications, HealthKit summaries, or ordinary structured memory.

## RAG

RAG means retrieving relevant approved material and placing it in the model's
context before generating an answer.

### Strong DAA Use Cases

#### Reviewed Coaching Education

A member might ask:

- Why do late meetings lead to evening eating for me?
- How can I prepare for a restaurant without trying to be perfect?
- Why does a lapse turn into the rest of the weekend?
- How should I think about recovery days when I train often?

DAA can retrieve the relevant section from its reviewed behavior-change method,
public health guidance, safety boundaries, or product education and cite the
source. This is better than asking the model to rely on memory or invent a rule.

#### Safety and Escalation Resources

RAG can select a reviewed, locale-appropriate resource when a deterministic
safety route says qualified or urgent help is needed. Deterministic code still
chooses the safety route; retrieval supplies current approved details such as
local resource text and review dates.

#### Product Help

RAG can answer account, privacy, HealthKit permission, notification, billing,
and deletion questions from the current help center. This is low risk, easy to
evaluate, and a good first production retrieval corpus.

#### Weekly Educational Explanation

The weekly analyst can retrieve one relevant concept after code identifies an
evidence-backed pattern. For example, code finds that three lapses followed late
meetings; retrieval supplies a reviewed planning or cue-interruption explanation.
The model must distinguish the member's observed facts from general education.

### Poor RAG Uses

Do not use RAG to answer:

- Did I keep Tuesday's gym commitment?
- What was my weight last week?
- Which check-ins are missing?
- How many times did I recover after a lapse?

Those are exact database queries. PostgreSQL or SQLite is cheaper, auditable,
deletable, and correct.

### Adoption Gate

Add curated RAG when at least one condition is true:

- the reviewed corpus no longer fits cleanly in a versioned prompt package
- members need citations or source dates
- educational or help answers change independently of an app release
- retrieval evaluation shows better grounded answers than a fixed context

Before launch, build a query set with relevant, irrelevant, conflicting, stale,
and safety-sensitive cases. Measure retrieval precision, missing-source behavior,
citation correctness, latency, and cost.

## Vector Store

A vector store indexes embeddings so semantically similar text can be found even
when the query and source use different words. It can power RAG, but it is not
memory by itself.

### Strong DAA Use Cases

#### Curated Document Index

Index reviewed DAA method notes, public guidance, safety resources, and help
content with metadata such as:

- source and canonical URL
- topic and risk class
- locale and market
- author or reviewer
- version and effective date
- last-reviewed date and expiry date

Use hybrid retrieval: metadata filters first, then semantic and keyword ranking.
Never retrieve expired or unapproved content into a coaching turn.

#### Similar Personal Situations, Much Later

A future member may ask, "When did this happen before?" The wording of earlier
events may differ enough that tags and keyword search miss a useful match. A
separate per-user semantic index could retrieve similar business-trip, late-work,
or social-pressure situations.

This is a V3 candidate, not an MVP feature. It requires explicit consent,
tenant isolation, per-record provenance, delete/update propagation, retention
controls, and an evaluation proving that semantic results are better than SQL
filters over context, cue, state, action, and outcome.

### Poor Vector Store Uses

Do not make a vector store canonical for:

- profiles and goals
- commitments and statuses
- check-ins and measurements
- consent and retention settings
- subscriptions or entitlements
- notification schedules
- audit events

Embeddings are approximate. These records need exact constraints, transactions,
authorization, versions, exports, and deletion.

### Recommended Layout

Use separate indices for:

1. reviewed public/product knowledge
2. locale-specific safety resources
3. optional per-user semantic history, only if it is ever approved

Never mix public knowledge and private member history in one retrieval namespace.

## MCP

MCP is a standard way for an agent to discover and invoke external tools. It is
an integration boundary, not a database, vector store, or coaching method.

### Strong DAA Use Cases

#### Expose DAA to Other Agents

This best supports the long-term provider-agnostic goal. A DAA MCP server could
let ChatGPT, Codex, Claude, or another approved agent use the same account and
domain service.

Start with read-only tools:

- `get_today_plan`
- `get_commitment_statuses`
- `get_next_check_in`
- `get_week_summary`
- `list_active_goals`

Later write tools can include:

- `record_check_in`
- `set_commitment_status`
- `adapt_commitment`
- `schedule_follow_up`

Every write requires OAuth, user authorization, schema validation, idempotency,
an audit event, and explicit approval when the change is sensitive. The MCP
server calls the same DAA application service as the mobile API; it does not
duplicate domain logic.

#### Trusted Calendar Context

With permission, a trusted calendar connector can help DAA notice that the
planned gym time conflicts with a meeting or that tomorrow needs a restaurant
plan. Calendar reads should be minimized to the time window and fields required.
Creating or moving an event should require explicit approval.

For a single mobile integration, an ordinary calendar API may be simpler. MCP
earns its place when several model providers or agent clients need the same
tool boundary.

#### Future Human-Coach Handoff

An approved support or coaching system could receive a member-created summary
through a narrow MCP tool. DAA must never silently send journals, health data, or
full chat history. The member chooses the summary and recipient, and the action
is logged.

### Poor MCP Uses

Do not use MCP for:

- communication between the mobile app and DAA's own API
- ordinary internal database access
- raw HealthKit access from a remote model
- replacing domain commands or authorization
- exposing dozens of tools before a concrete external client needs them

Remote MCP servers can receive model context and tool arguments. Only trusted,
allowlisted servers should be used, with OAuth, minimum data, approval for writes,
and redacted logs.

### Adoption Gate

Build the DAA MCP server when either condition is true:

- a second approved agent client needs DAA records and actions
- at least two model providers need the same external tool interface

Consume an external MCP server only after a named user workflow, privacy review,
tool allowlist, approval policy, timeout/fallback behavior, and adversarial test
set exist.

## Recommended Order

| Stage                | Capability                                            | Decision                                  |
| -------------------- | ----------------------------------------------------- | ----------------------------------------- |
| Local V1             | SQL/SQLite records and deterministic tools            | Build now                                 |
| Synced AI alpha      | Strict internal function tools and evals              | Build before RAG or MCP                   |
| Early beta           | RAG over reviewed product help and coaching education | First optional extension                  |
| Later beta           | Vector index for the approved RAG corpus              | Add if semantic retrieval wins evaluation |
| Multi-client product | DAA MCP server with read-only tools first             | Add when another agent client exists      |
| V3 candidate         | Consented semantic search over personal situations    | Defer until clearly necessary             |

## Sources

- [OpenAI retrieval guide](https://developers.openai.com/api/docs/guides/retrieval)
  describes vector stores as semantic-search indices and supports metadata
  filtering for bounded retrieval.
- [OpenAI MCP and connectors guide](https://developers.openai.com/api/docs/guides/tools-connectors-mcp)
  describes remote tools, explicit approvals, and the need to trust external MCP
  servers because they may receive sensitive context.
- [DAA mobile harness architecture](MOBILE_HARNESS_ARCHITECTURE.md) defines the
  provider-neutral, structured-memory, health-data, and safety boundaries these
  extensions must preserve.
