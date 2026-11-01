---
title: "Sustaining Cross-System Regression After Project Delivery"
date: 2026-11-01
summary: "A low-cost operating model for persistent cross-system journey ownership, manual regression baselines, progressive automation and long-term maintenance after temporary project teams disband"
---

# Sustaining Cross-System Regression After Project Delivery

> **Core finding:** delivery teams can own their components correctly while a shared business journey has no surviving owner. A project may end, but its critical cross-system regression capability must not disappear with it.

*Research date: 1 November 2026. This is a proposed implementation model for largely manual, cross-team regression in constrained organisations. Specific staffing and rollout values are illustrative rather than validated industry benchmarks.*

## Problem: temporary project, permanent integration risk

Suppose Project A involves Teams 1/2/3, B involves 3/4/5 and C involves 2/4/5. Each team owns API, frontend, data or platform code and its CI. During delivery, project staff coordinate integrated user journeys. After go-live, the project team disbands; nobody is tasked or funded to maintain and rerun E2E regression across service boundaries. A later service change may break a journey despite all component pipelines being green.

| Layer | Root cause | Consequence |
| --- | --- | --- |
| Technical | No stable end-to-end test environment, data, trigger or version evidence | Manual tests are difficult to reproduce |
| Delivery | E2E exists only as a project exit activity | Regression disappears after go-live |
| Ownership | Component owners survive, journey owner does not | Cross-service impacts go unreviewed |
| Finance/organisation | No enduring capacity for cross-system maintenance | Suites degrade or are abandoned |
| Feedback | No component-to-journey map or shared results | Impact discovery happens only when a new project starts |

**The gap is primarily lifecycle accountability and engineering testability—not merely a shortage of automation engineers.**

See the preceding research on [Distributed Systems Testing](./2026-10-30) and [Hybrid QE Resourcing](./2026-11-01-hybrid-qe-resourcing).

## Evidence and limits

The [UK Home Office testing principles (updated July 2025)](https://engineering.homeoffice.gov.uk/principles/quality-assurance-and-testing/) recommend contextual, product-oriented QE, automation at suitable test levels and appropriate testability. [The Practical Test Pyramid](https://martinfowler.com/articles/practical-test-pyramid.html) explains why full-stack E2E is costly and why cross-service ownership is difficult to assign; most assertions should be made at a cheaper trustworthy layer.

The [UK Government Digital Functional Standard, updated October 2026](https://www.gov.uk/government/publications/government-functional-standard-govs-005-digital/government-functional-standard-govs-005-digital-html) describes ongoing service management and accountability. [Google SRE's Engagement Model](https://sre.google/workbook/engagement-model/) provides a related model for explicit engagement, transitions and long-lived operational responsibility. These provide architectural and governance rationale; none is a direct controlled study proving this QE operating model.

## Target model: persistent capability, federated maintenance

**Federated ownership + central regression coordination + progressive automation.** Do not default to a new permanent manual SIT department.

| Responsibility | Accountable owner | Execution / contribution |
| --- | --- | --- |
| Business journey criticality and residual service risk | Named Service / Portfolio Owner | Product and delivery stakeholders |
| Regression inventory, impact coordination and evidence | Cross-System Regression Coordinator (QE) | Relevant delivery teams |
| Component, API, contracts and compatibility | Owning provider/consumer engineers | Team CI |
| Journey test assertions and maintenance | Named technical maintainer(s) for each journey | QE and participating engineers |
| Shared test runner, fixtures, reports and CI patterns | QE Automation / Platform capability | Engineering contributors |
| Test environment, credentials and data | Named environment/data owners | Platform and service teams |
| Final release or exception acceptance | Authorised Release / Service Owner | QE provides independent quality assessment |

**Coordination is not ownership of every failing component.** A changed API contract remains the provider/consumer teams' responsibility; an outdated journey assertion belongs to the named journey maintainer; a broken shared runner belongs to the framework owner.

Where no enduring service owner exists, explicitly appoint an authorised portfolio-level interim risk owner with a date to resolve the service ownership gap. QE cannot unilaterally inherit this business responsibility.

## Lifecycle: establish and preserve regression

### 1. Project initiation: identify journeys

The Project Integration QE Lead, delivery owner and participating teams select critical user outcomes, system boundaries, risk scenarios and participating owners. Identify who will receive ongoing responsibility after delivery—*before* the project closes.

### 2. Delivery: create a reproducible baseline

Document the critical end-to-end steps, expected outcomes, prerequisites, environment versions, test accounts, data setup and cleanup, observability IDs and failure triage. Execute risk-based manual journeys now; automate only when repeatability and maintenance are feasible.

### 3. Transition: explicit regression handover

Require an acceptance record for every high-risk surviving journey:

- enduring business/risk owner and named technical test maintainer;
- dependency map and relevant provider/consumer contacts;
- manual runbook or automated pipeline and last verified result;
- test data, secrets/access, environment and deployment manifest;
- trigger rules, result retention and failure escalation;
- capacity/backlog for future test maintenance;
- exceptions, gaps and decision to accept or defer risk.

For existing services, apply this retrospectively in risk order, not as a retrospective blanket compliance exercise. Project closure can proceed with a documented and authorised exception; it must not silently imply that regression was handed over.

### 4. BAU: run only relevant regression

For each material deployment or configuration/data change, assess affected journeys through a small component-to-journey matrix. Run fast component and contract checks first, targeted cross-service tests next, and critical browser journeys as appropriate. A major release or uncertain impact can justify broader manual regression.

### 5. Improve or retire

Monitor execution cost, failures, product-change frequency, service criticality and duplication. Rehome assertions at lower test levels when practical; retire stale scripts with documented owner approval.

## From mostly manual E2E to progressive automation

**Do not translate 100 manual scenarios into 100 browser tests.** Reclassify them by risk:

| Scenario | Preferred verification location |
| --- | --- |
| Field validation, local business rules | Unit/component |
| HTTP status, response schemas, error handling | API/component integration |
| Consumer/provider compatibility | Contract tests |
| ETL semantics and asynchronous completion | API/data-level cross-system integration |
| Critical user outcomes requiring actual browser behaviour | Small, reliable Playwright E2E subset |
| Uncertain edge cases and newly introduced risk | Exploratory manual sessions |

Prioritise candidates by business impact, change frequency, multi-team coupling, repeatability and maintenance burden. Test data determinism and observability are **entry conditions**, not afterthoughts. Start with 3–5 critical journeys as an illustrative pilot boundary, not a standard quota.

## Minimal technical architecture

**Do not purchase a platform before proving that a simple operating loop works.** Reuse existing TypeScript/Playwright capabilities, API clients and GitHub Actions or equivalent CI/CD.

```text
Frontend/API/data/config change
               |
       Affected-component tags
               |
   Component-to-journey register
               |
   +-----------+------------+
   |                        |
API/contract/targeted E2E   Manual runbook (only where needed)
   |                        |
   +-----------+------------+
               |
   Results + deployed versions + evidence
               |
  Named triage owner / release risk decision
```

Suggested assets:

- **Journey registry:** journey ID, risk tier, teams and interfaces, business owner, technical maintainer, runbook/pipeline, last result, review date.
- **Shared runner:** minimal Playwright/API fixtures and reporting; do not require one language/framework for every team's component tests.
- **Execution:** manual dispatch and environment-deploy triggers initially, with scheduled smoke for critical stable flows. Use CI event integration only after dependency tags are trustworthy.
- **Environment and data:** known versions, synthetic/resettable data where feasible, traceable correlation IDs for async flows, managed test accounts, least-privilege secrets.
- **Evidence:** test revision, component/environment versions, time, pass/fail/blocked/not-run, failure link, untested risk.

An independent repository is **optional**. Use a shared repo when journeys span separate repos and shared review is needed; otherwise a natural owning product repository is acceptable. In either case, require CODEOWNERS/technical review and named maintenance responsibility.

[Playwright CI documentation](https://playwright.dev/docs/ci) illustrates reproducible running and reporting. [Pact can-i-deploy](https://docs.pact.io/pact_broker/can_i_deploy) illustrates version-aware contract compatibility; it is a product option rather than a mandatory dependency.

## Regression trigger and failure ownership

Example: Team 3 deploys an API used by Journeys A and B.

1. Team 3 runs local component/API/contract checks and publishes changed API or interface metadata.
2. A lightweight dependency mapping identifies A and B. If the impact is unknown or high risk, broaden selection and involve the journey maintainer.
3. Automated checks run where available. Critical uncovered journeys receive a **scoped manual execution request with named capacity**, not an implicit demand on Central QE.
4. A failure is triaged by cause: service defect to changing team; consumer adaptation to consumer team; outdated assertion to journey maintainer; runner or environment failure to its owner.
5. The release decision-maker sees executed, blocked and unexecuted evidence with versions and accepted residual risk.

Cross-system tests need not run on *every* PR; they may require a deployed compatible service combination. Avoid treating a green historical test against a different deployment manifest as current release evidence.

## Minimum viable staffing and funded work

A lean pilot can use existing staff:

- **Regression Coordinator:** a named fraction of Principal/Senior QE capacity for inventory, prioritisation, assurance and escalation.
- **Automation engineer:** time-boxed allocation for highest-value checks and CI mechanics.
- **Journey maintainers:** named engineering contributors whose maintenance is included in delivery backlogs.
- **Manual contributors:** booked from affected teams when a change triggers a non-automated check.
- **Service/Portfolio Owner:** business risk and maintenance funding decisions.

Illustrative **planning assumptions only**, not benchmarks: 0.1–0.2 FTE for coordination and 0.3–0.5 FTE automation investment during a small pilot, plus separately allocated engineering and manual execution effort. Validate with actual demand, data preparation, run time, failures and rework. A fractional allocation is not around-the-clock incident coverage.

Budget three categories separately: one-off migration, recurring suite upkeep, and demand-driven manual regression. Do not finance only initial script creation.

## 90-day pilot

| Period | Work | Evidence-based exit |
| --- | --- | --- |
| Days 1–30 | Select 1–2 critical existing services; identify 5–10 journeys; assign owners; create structured manual runbooks and dependency mapping | Someone other than original project staff can execute a critical journey and produce reproducible evidence |
| Days 31–60 | Automate 2–3 repeatable high-value journeys at appropriate test layers; add CI reporting and technical review | Non-author can run tests, understand failed checks and route incidents |
| Days 61–90 | Pilot one real deployment-triggered impact analysis; combine automated and manual regression evidence | Ownership, selection, execution, escalation and maintenance backlog all operate end-to-end |

This is an experiment in sustaining an operating model, not a promise to deliver full organisational coverage in 90 days.

## Measurements and governance controls

| Signal | Why it matters |
| --- | --- |
| Critical journeys with named owner and usable runbook | Tests survive team dissolution |
| Critical journeys with reliable automated checks | Reduced repeated manual effort, not raw script count |
| Time to usable regression evidence | Measures actual change feedback and waiting |
| Manual preparation/execution hours | Informs automation investment |
| Flaky/blocked test rate and root causes | Distinguishes environment failure from product regression |
| Unowned or stale journeys and maintenance backlog age | Exposes hidden sustainability debt |

Review monthly initially, then by risk and change cadence. Small incident counts cannot establish that automation caused a release-quality improvement. Avoid equating “automation percentage” with system quality.

## Risks and trade-offs

- **Coordinator as gatekeeper:** automate routine selection/execution; limit human approval to material risk or incomplete evidence.
- **Teams refuse maintenance:** publish named technical owners and include work in their funded backlogs; central QE alone cannot impose capacity.
- **Environment too unstable:** prioritise stable data, version visibility and diagnostics before adding UI tests.
- **Dependency map incomplete:** use conservative fallback to broader risk review; never treat inferred non-impact as certainty.
- **Project-style repository sprawl:** group suites around enduring user journeys or services, not temporary project labels.
- **No genuine service owner:** escalate to delivery/portfolio leadership; QE must not silently absorb business acceptance authority.
- **Expensive broad E2E:** prefer lower-level contracts and integrations where they faithfully detect the relevant fault.

## Key takeaways

1. **Projects expire; critical journeys and their assurance responsibilities do not.**
2. **Start with durable owners and executable manual baselines.**
3. **Automate high-value outcomes progressively, at the cheapest reliable test layer.**
4. **Central QE coordinates cross-system visibility; teams maintain their changing services and assigned test assets.**
5. **A maintained dependency map, actionable evidence and funded ownership matter more than a large E2E script count.**

## References

1. [UK Home Office — Quality Assurance and Testing (2025)](https://engineering.homeoffice.gov.uk/principles/quality-assurance-and-testing/)
2. [Martin Fowler / Ham Vocke — The Practical Test Pyramid](https://martinfowler.com/articles/practical-test-pyramid.html)
3. [UK Government — GovS 005: Digital (updated October 2026)](https://www.gov.uk/government/publications/government-functional-standard-govs-005-digital/government-functional-standard-govs-005-digital-html)
4. [Google SRE Workbook — Engagement Model](https://sre.google/workbook/engagement-model/)
5. [Google SRE — Evolving SRE Engagement Model](https://sre.google/sre-book/evolving-sre-engagement-model/)
6. [Playwright — Continuous Integration](https://playwright.dev/docs/ci)
7. [Pact — can-i-deploy](https://docs.pact.io/pact_broker/can_i_deploy)
