---
title: "Thoughtworks Technology Radar Volume 35 — Quality Engineering Review"
date: 2026-11-04
summary: "A quality engineering review of agent harness evaluation, risk-tiered oversight, test effectiveness and delivery flow"
volume: 35
---

# Thoughtworks Technology Radar Volume 35 — Quality Engineering Review

> **Published** 4 November 2026
>
> **Source** [Thoughtworks Technology Radar Volume 35, November 2026 (PDF)](https://www.thoughtworks.com/content/dam/thoughtworks/documents/radar/2026/11/tr_technology_radar_vol_35_en.pdf)
>
> **Purpose** Personal study focused on quality engineering, software testing and delivery controls.

## Executive summary

[Volume 34](./vol-34.md) treated deterministic checks as feedback for coding agents. Volume 35 asks whether the harness supplying that feedback works and whether the delivery system can absorb the resulting changes. Thoughtworks moved mutation testing from Trial to Adopt and the feedback flywheel from Assess to Trial. Harness quality evaluation appears at Assess. These positions reflect Thoughtworks' experience. The personal rings below indicate where I would put engineering effort in a team using coding agents.

The QE implication is to measure three things separately. Can the tests detect broken behaviour? Can the harness prevent or surface unsafe agent actions? Can the team review and release the resulting changes without accumulating queues or rework? Each question requires different evidence.

## Recommended personal radar

| Personal ring | Topic | Rationale |
|---|---|---|
| **Adopt** | Path-to-production mapping | Find the queue or handoff limiting safe delivery before increasing agent concurrency. |
| **Trial** | Mutation testing | Use scoped runs to check assertions on high-risk logic and establish a runtime budget before adding gates. |
| **Trial** | Harness quality evaluation | Verify that guardrails block disallowed actions and measure how reliably agents respond to feedback. |
| **Trial** | Feedback flywheel | Turn recurring failures into reviewed harness changes with regression evidence. |
| **Trial** | Risk-tiered human oversight | Reserve domain review for consequential changes and test the routing rules before enabling automatic merges. |
| **Assess** | Tests as data over tests as code | Compare a bounded declarative suite with code-based tests for a migration or stable business interface. |
| **Caution** | Human-in-the-loop theater | Replace approvals that lack evidence or decision authority with controls matched to the risk. |

---

## 1. Path-to-production mapping

### Thoughtworks position

**Adopt, Techniques #3.** Thoughtworks recommends mapping the route from workstation to production with the people who design, build, release and operate the software. Faster code production makes downstream constraints easier to expose. [Volume 35 PDF, p. 15](https://www.thoughtworks.com/content/dam/thoughtworks/documents/radar/2026/11/tr_technology_radar_vol_35_en.pdf#page=15)

### Quality engineering interpretation

An apparent testing bottleneck can be a shared-environment queue, a wait for representative data or repeated handoffs for a dependency that lacks an owner. Adding runners only helps if execution capacity is the constraint. A map should distinguish waiting, active work and repeat work at each step.

### Recommended action

**Adopt.** Have the delivery lead trace a sample of changes across review, integration and release. Record elapsed wait and active time by stage alongside deployment rework. Ask the team owning the longest recurring queue to trial one intervention, such as reservable test data or an isolated integration environment, then remeasure on comparable changes.

---

## 2. Mutation testing

### Thoughtworks position

**Adopt, Techniques #2.** Thoughtworks highlights mutation testing as a check on the fault-detection ability of suites containing AI-generated tests. It suggests focusing on selected packages or recently changed code because runs can be expensive. [Volume 35 PDF, p. 15](https://www.thoughtworks.com/content/dam/thoughtworks/documents/radar/2026/11/tr_technology_radar_vol_35_en.pdf#page=15)

### Quality engineering interpretation

A passing test can execute a rule while missing its boundary condition. For example, changing an eligibility check from inclusive to exclusive should fail a test at the threshold. A surviving mutant warrants investigation. Some mutants are behaviourally equivalent, and the operators sampled determine which faults the exercise can reveal.

### Recommended action

**Trial.** Keep the personal Trial position from Volume 34 until a service team establishes the cost and signal of incremental runs. Start with one critical rules package, classify surviving mutants with the domain owner and record useful assertion fixes and added runtime. Consider a blocking check only where the scope is stable and the team can triage failures within its CI budget.

---

## 3. Harness quality evaluation

### Thoughtworks position

**Assess, Techniques #29.** Thoughtworks describes scheduled evaluation of agent skills and plugins and automated tests for deterministic guardrails. [Volume 35 PDF, p. 24](https://www.thoughtworks.com/content/dam/thoughtworks/documents/radar/2026/11/tr_technology_radar_vol_35_en.pdf#page=24) · [Online blip](https://www.thoughtworks.com/radar/techniques/harness-quality-evaluation)

### Quality engineering interpretation

A guardrail can fail to block an action even when the agent usually chooses to comply. A reliable block can also leave the agent stuck if its failure message offers no actionable feedback. These failure modes need separate checks.

### Recommended action

**Trial.** In one repository, give the platform owner deterministic allow-and-deny fixtures for permissions and tool calls, including attempts to modify protected checks. Give the service team a small set of representative coding tasks with independent acceptance checks. Block harness releases on failed deterministic policy tests. Run repeated agent evaluations before changing the model or harness, and report verified task completion, unsafe attempts and false blocks separately. Keep versions and run traces so failures can be reproduced and attributed.

---

## 4. Feedback flywheel

### Thoughtworks position

**Trial, Techniques #11.** Thoughtworks moved this technique from Assess to Trial. It describes bringing lessons from agent sessions into shared instructions, skills and checks, with people deciding which changes to make and which obsolete controls to remove. [Volume 35 PDF, p. 18](https://www.thoughtworks.com/content/dam/thoughtworks/documents/radar/2026/11/tr_technology_radar_vol_35_en.pdf#page=18) · [Online blip and ring history](https://www.thoughtworks.com/radar/techniques/feedback-flywheel)

### Quality engineering interpretation

Repeated CI failures can indicate an unclear requirement, a brittle fixture or a missing product invariant. Each has a different owner. Adding another agent instruction can hide the symptom while leaving the cause in place.

### Recommended action

**Trial.** Review recurring failure signatures in the team's existing retrospective. Assign each selected issue to the owner of the requirement, product, test or harness. For a harness change, replay the original failure and nearby tasks before accepting it. Track recurrence and false blocks after rollout. Remove stale instructions or checks when replay shows they no longer improve outcomes.

---

## 5. Risk-tiered human oversight and human-in-the-loop theater

### Thoughtworks position

**Trial, Techniques #17** for risk-tiered human oversight and **Caution, Techniques #42** for human-in-the-loop theater. Thoughtworks describes varying oversight by consequence and reversibility, from automated handling of low-risk changes through to human execution of the riskiest ones. It cautions against approvals where the reviewer cannot make an informed judgement. [Volume 35 PDF, p. 20](https://www.thoughtworks.com/content/dam/thoughtworks/documents/radar/2026/11/tr_technology_radar_vol_35_en.pdf#page=20) · [Volume 35 PDF, p. 27](https://www.thoughtworks.com/content/dam/thoughtworks/documents/radar/2026/11/tr_technology_radar_vol_35_en.pdf#page=27)

### Quality engineering interpretation

Review depth depends on blast radius, reversibility and the evidence available to the reviewer. A one-line change to an entitlement rule can carry more risk than a large internal refactor. A rule based on changed paths alone can miss cross-service consequences.

### Recommended action

**Trial** risk-based routing and use **Caution** for approval steps without a clear decision. Start with protected areas such as authorisation policy, shared contracts, destructive migrations and CI controls. Escalate ambiguous changes to a named owner and attach the relevant test, compatibility or rollback evidence. Run the routing policy in shadow mode and audit changes classified as low risk for missed escalations. Enable automatic merging only for narrow, reversible categories with independently enforced checks and a defined rollback path.

---

## 6. Tests as data over tests as code

### Thoughtworks position

**Assess, Techniques #35.** Thoughtworks describes project-specific runners that execute structured cases and reports early experience with reusing cases across legacy and modern implementations through adapters. Its experience with the AI-assisted use case is limited. [Volume 35 PDF, p. 25](https://www.thoughtworks.com/content/dam/thoughtworks/documents/radar/2026/11/tr_technology_radar_vol_35_en.pdf#page=25)

### Quality engineering interpretation

A schema constrains the shape of a generated case. The assertions, fixtures and adapter still determine whether it detects meaningful faults. During migration, a shared adapter can accidentally normalise away a behavioural difference. Matching the legacy system can also preserve a defect where requirements call for a deliberate change.

### Recommended action

**Assess.** Pick a stable boundary such as eligibility calculation and represent inputs, expected outcomes and approved exceptions explicitly. Run the same cases through thin adapters against both implementations. Include a known discrepancy to check that the comparison exposes it. Compare review time, diagnostic clarity and adapter maintenance with the existing approach before expanding the schema. Keep code-based checks for scenarios the schema expresses poorly.

## Emerging operating model

- **Service teams** own business invariants, test oracles and evidence for changes at their interfaces.
- **Platform teams** own shared harness versions, permission enforcement, evaluation infrastructure and rollback.
- **Principal Quality Engineers** help service and platform owners define the evidence required for each risk tier and check whether controls improve detection without shifting queues to another team.

## Suggested experiments

| Experiment | Setup | Decision evidence |
|---|---|---|
| Harness regression pilot | Replay a fixed set of representative tasks and blocked actions against baseline and candidate harness versions. Repeat model-dependent cases. | Require policy fixtures to pass. Compare independently verified completion, false blocks and review effort before expanding. |
| Mutation and migration pilot | Run scoped mutations on one critical package. For a migration boundary, compare schema-based cases and existing tests against the same seeded behaviour change. | Expand where the cases detect meaningful differences and the team can sustain the added runtime and adapter maintenance. |
| Review-capacity pilot | Map one delivery stream, then shadow risk-tiered review while recording review wait, misrouted changes and rework. | Expand automation only where sampled decisions are sound and the change reduces waiting without increasing rework. |

## Key conclusion

Before increasing agent concurrency, identify the stage limiting delivery and verify that its controls can handle the extra work. A useful pilot can show which faults the tests detect, which actions the harness blocks and which decisions still need domain judgement.

## References

- [Thoughtworks Technology Radar Volume 35, November 2026 (PDF)](https://www.thoughtworks.com/content/dam/thoughtworks/documents/radar/2026/11/tr_technology_radar_vol_35_en.pdf). The edition's Techniques ring list is on p. 12. Individual sections above link to the edition-specific write-ups.
- [Volume 34 Quality Engineering Review](./vol-34.md). Prior personal positions on feedback sensors, mutation testing and delivery metrics.
