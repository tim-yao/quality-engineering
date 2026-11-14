---
title: "Tests as Data — Trustworthy Verification in Agentic Coding — 14 November 2026"
date: 2026-11-14
summary: "A critical Quality Engineering review of Matteo Vaccari's Tests as Data: human-owned behavioural contracts, AI-generated runners, trust boundaries, mutation testing and practical adoption."
topics: ["Test architecture", "AI-assisted engineering"]
---

# Tests as Data: Rebuilding Trust in AI-Generated Tests

*Research digest — 14 November 2026. Primary source: Matteo Vaccari, [Tests as data: Ensuring AI-generated code does what we want](https://martinfowler.com/articles/tests-as-data.html), published 11 November 2026 on Martin Fowler's website.*

> **Central finding:** When agents can edit production code **and** the tests that judge it, a green pipeline may cease to be independent evidence of correctness. The useful innovation is not YAML or a new testing framework: it is a **human-reviewable behavioural contract separated from its AI-generated execution machinery**.

## Executive summary

- **Source's proposal:** Make *customer tests*—black-box descriptions of inputs, expected outputs, relevant state changes and side effects—the principal contract between people and agents. Store important scenarios as readable data, and use an AI-generated runner to execute them.
- **Not the abolition of unit testing:** Developer tests remain useful. Customer tests can run at component or service boundaries and need not be browser-driven end-to-end tests.
- **Critical trust boundary:** Protecting scenario files reduces accidental or self-serving changes, but a runner can still ignore assertions, misinterpret a DSL, suppress errors or return a misleading pass. A protected specification is necessary, not sufficient.
- **Mutation testing is a complementary technique, not a new invention or a proof of correctness.** It challenges whether tests detect injected defects; it cannot tell us whether a business expectation was correct.
- **QE interpretation:** Shift review effort from generated test-code volume towards the correctness and traceability of test oracles, coverage of meaningful behaviours, integrity of the harness and independent failure evidence.
- **Recommendation:** Pilot tests-as-data for a bounded, rule-heavy service or API with stable observable behaviour, rather than replacing an existing enterprise test suite wholesale.

## 1. Problem and root causes

Vaccari reports interviews with 26 developers in early 2026 at an organisation extensively using coding agents. Developers were reluctant to trust their automated tests when agents changed them alongside production code. This is **qualitative practitioner evidence**, not a controlled experiment demonstrating how frequently agents undermine tests. The article also points to industry surveys about defects, but explicitly does **not** establish that AI-written tests caused those outcomes.

The systemic failure mode can be decomposed:

| Level | Failure mode | Engineering consequence |
| --- | --- | --- |
| Trigger | Agent changes an implementation and its tests together | Both may align with an incorrect interpretation |
| Technical | Tests are implementation-coupled; assertions are weak or regenerated from current behaviour | Existing defects become encoded as expected behaviour |
| Process | Reviewers inspect large generated code/test diffs under time pressure | Meaningful changes to behavioural expectations go unnoticed |
| Ownership | No clear distinction between who defines correctness and who implements the checking mechanism | The test oracle becomes editable by the system being evaluated |
| Feedback/control | CI reports pass/fail without validating harness integrity or assertion strength | Green status is mistaken for independent assurance |

**Interpretation:** This is partly an *oracle and change-authority* problem, not fundamentally a shortage of automated tests.

## 2. What the original article actually proposes

Vaccari combines established practices—XP customer tests, specification by example, Fit, Go table-driven tests and approval testing—with a newer economic assumption: agents can cheaply write domain-specific parsers and runners.

1. **Customer-oriented specification:** Express observable behaviour from the customer's perspective rather than implementation details.
2. **Tests as data:** Keep setup, input, expected results and side effects in concise, reviewable files. Tables are useful for rule matrices; structured text or a domain-specific language (DSL) works for sequences and stateful interactions.
3. **AI-generated execution machinery:** An agent can create or maintain the runner that interprets the scenarios. This reduces boilerplate in the contract, but does not exempt the runner from engineering verification.
4. **Change controls:** Distinguish expected changes to production code, scenarios and runners. Review and restrict modifications that do not belong to the task.
5. **Multiple layers of evidence:** Validate tests with fault injection, alternative oracles and complementary techniques; retain human exploratory testing.

### Example: an executable business rule contract

The following is an **illustrative example created for this digest**, not from the original article:

```yaml
scenario: "Reject a claim exceeding the policy limit"
given:
  policy_limit: 1000
when:
  claim_amount: 1200
then:
  decision: rejected
  reason: exceeds_policy_limit
  payment_created: false
```

A runner may invoke a domain service, an API or another appropriate entry point. Humans review whether `rejected`, its reason and the absence of payment are the right *business expectations*. The agent implements how those expectations are exercised and observed.

The contract must have **precise semantics**. A loosely worded free-form scenario can be as ambiguous as a prose specification; merely changing the file extension does not solve the oracle problem.

## 3. Assessment of the author's and reader's interpretations

The following distinguishes a useful interpretation of the article from its actual limits.

| Interpretation | Assessment | More precise formulation |
| --- | --- | --- |
| AI will write and maintain much of the test code, while people focus on meaningful scenarios | **Consistent with the proposal** | Humans remain accountable for business rules, expectations, coverage decisions and verification evidence; agents may help draft them |
| Traditional unit tests and all other automated tests no longer matter | **Incorrect / overextended** | The article explicitly retains developer tests and recommends complementary testing; customer tests are the *primary behavioural contract*, not the only checks |
| Scenarios can live in YAML, CSV or free-form text | **Broadly correct** | Choose a form suited to the domain and enforce unambiguous schema, assertions and readable diffs. Completely unconstrained free text has risks |
| This is BDD/Cucumber without human-maintained step definitions | **Partly correct** | Both use executable examples, but Vaccari favours bespoke, constrained DSLs over generic Gherkin where this improves clarity and mandates assertions |
| Let AI completely own the runner; people need only preserve immutable scenario data | **Unsafe extrapolation** | Runners, parsers, environment setup and output projections require validation, change controls and occasionally independent checks |
| If scenario files are immutable, a passing test cannot be gamed | **Incorrect** | Agents can still weaken the runner, skip cases, manipulate fixtures, stub the system under test or suppress failures; authorisation and CI controls are needed |
| Mutation testing verifies that the test can fail if something breaks | **Correct within limits** | Mutation testing is an established technique; killing a mutant demonstrates sensitivity to that injected change, not correctness of all assertions or comprehensive fault detection |

These distinctions matter in enterprise delivery: the authority to define expected behaviour must not silently migrate into an agent-generated implementation.

## 4. The trust architecture: separating contract from executor

A proposed engineering arrangement:

```text
Business rules / authoritative specifications
               |
               v
Human-reviewed executable scenarios
(inputs + expected results + state changes)
               |  protected by ownership & CI
               v
AI-generated DSL parser / test runner
               |
               v
System or component under test
               |
               v
Observed behaviour + explicit assertions
               |
               v
CI evidence + independent harness checks
```

Three boundaries need different controls.

| Boundary | Recommended control | Detects or prevents |
| --- | --- | --- |
| **Specification integrity** | Protected files; CODEOWNERS or equivalent mandatory review; CI diff checks; versioned requirement/source reference | Unexpected weakening or alteration of intended outcomes |
| **Harness integrity** | Runner unit tests; deliberately failing fixture; assertion-count/case-execution checks; independent CI invocation; protected runner changes | Runner ignores scenarios, swallows failures or silently skips assertions |
| **Outcome integrity** | Verified oracle, production-like dependency behaviour, state/side-effect assertions, mutation testing and periodic exploratory checks | Passing tests that do not correspond to real behaviour |

**Important qualification:** A repository CODEOWNERS file is a review-routing mechanism; enforcement requires the hosting platform's branch or ruleset protections. Files merely marked read-only inside an agent's working directory are not a robust security boundary if the agent can change permissions, workflows or execution paths.

A lightweight **canary scenario** that is required to fail against a known-bad fixture is a useful practical control. This is a recommendation in this digest, not a claimed technique proven by Vaccari.

## 5. Mutation testing: what it validates, and what it cannot

Mutation testing deliberately changes executable logic (for example, reversing a comparison) and checks whether the test suite detects the modification.

- A **killed mutant** means one or more tests failed in response to that injected change.
- A **surviving mutant** may reveal missing assertions, insufficient scenarios or an equivalent change that does not alter observable behaviour.
- Even a suite that kills many mutants may be enforcing the *wrong business rule*.
- A mutation campaign must ensure mutants actually execute, and must distinguish equivalent, invalid or timeout-driven outcomes from meaningful detected failures.

For an AI-generated runner, mutation testing can be paired with **known-bad harness fixtures**: deliberately make one expectation fail or make an assertion disappear, and verify that the pipeline refuses a green result. This guards against some harness failures but does not establish a complete proof.

For the expected outputs themselves, use stronger oracles where available: approved business rules, legislation or policy documentation, independent calculations, legacy-system comparison and domain-expert review. The article also highlights **property-based testing** as complementary to example-based scenarios.

## 6. When this approach is useful—and when it is not

**Good candidates:** rule-heavy APIs; pricing and eligibility logic; policy evaluations; state transitions; deterministic transformations; legacy replacement with comparative oracle; large tables of positive, negative and boundary examples.

**Less compelling as a universal replacement:** rapidly changing prototypes; low-level concurrency and memory safety; visual fidelity and accessibility; distributed failure recovery; performance, resilience and security; cases where domain behaviour cannot be expressed adequately in simple examples.

Tests-as-data does **not** imply all customer tests should become E2E tests. Vaccari recommends bypassing the browser when a service or component-level boundary can validate the business requirement faster and more reliably. For external services, local simulators may improve feedback, but independent integration checks remain necessary because a simulator can faithfully reproduce the wrong contract.

### QE considerations for distributed delivery

At enterprise scale, a centrally protected scenario repository can become a new bottleneck or a source of ambiguous ownership. Prefer **scenario ownership aligned with the relevant service or business capability**, and identify named owners of genuinely cross-system business journeys. Shared QE capabilities can provide schema conventions, CI policy and measurement without authoring every test or becoming the release gatekeeper.

A scenario that spans an API, data pipeline and frontend needs a source-of-truth owner for its expected outcome. Individual teams still own their component-level verification and interface obligations. Do not confuse the ability to execute one scenario through multiple runners with proof that real deployed integrations work.

## 7. Practical pilot: one business capability

**Step 1 — Select and baseline.** Choose 10–20 consequential scenarios from one well-defined capability (a *suggested pilot scope*, not an empirical industry norm). Record the existing tests, actual bugs escaped, execution time, flaky failures and review workload.

**Step 2 — Define contract and ownership.** Use a minimal YAML/table DSL specifying named cases, inputs, expected outputs, observable side effects and authoritative rule references. Require explicit assertions; reject unknown fields. Identify who may approve changes to expected results.

**Step 3 — Generate and verify the runner.** Have an agent implement execution at the cheapest trustworthy boundary. Validate schema parsing, fixture isolation, deterministic execution, failure propagation and result reporting using known-good and known-bad cases.

**Step 4 — Protect changes.** For a production refactor, scenario diffs should normally be empty. For a business-rule change, require an approved corresponding scenario revision. For a runner change, require a separate review and regression of harness checks. Enforce via CI/rulesets rather than relying only on prompts.

**Step 5 — Challenge the oracle and harness.** Deliberately inject several representative defects, including a boundary-condition mutation and a disabled assertion. Confirm expected failures; review surprising passes with a domain owner. Retain integration and exploratory verification appropriate to risk.

**Step 6 — Evaluate.** Compare *meaningful* measures against baseline: reviewer time to understand changed expectations; unexpected scenario/runner diffs; scenario mutation sensitivity; false-pass or skipped-test incidents; execution stability; and defects detected before release. Do not equate scenario counts or pass rate with confidence.

**Exit criteria:** adopt beyond the pilot only if scenarios are more reviewable, authoritative expectations are protected, the runner is independently challengeable, and additional maintenance costs are justified. Otherwise preserve conventional tests-as-code.

## 8. Risks and trade-offs

| Risk | Response |
| --- | --- |
| New DSL/parser becomes yet another framework to maintain | Keep the vocabulary minimal; use existing parameterised tests if they already express behaviour clearly |
| Human-owned scenarios still encode wrong expectations | Ground expected values in business oracles and challenge them through review and comparison |
| Agent alters runner instead of protected test data | Protect runner changes and use negative canaries / mutation checks |
| Free-form prose creates ambiguous or weak assertions | Prefer typed schema, mandatory output/side-effect checks and explicit failure reporting |
| Example scenarios miss entire classes of failures | Add properties, contracts, security and reliability checks; retain exploratory work |
| Central scenario ownership slows cross-team delivery | Assign capability/flow-level owners with limited shared standards |
| Apparent savings hide testing infrastructure costs | Measure end-to-end review, maintenance and failure-investigation effort |

## Key takeaways

**Evidence:** Vaccari presents a reasoned practitioner proposal, grounded in past specification-by-example traditions and qualitative interviews. It is not yet demonstrated as a universally superior testing architecture through controlled outcome studies.

**Interpretation:** As AI takes on more coding work, the fundamental QE question becomes *who controls the definition of correct behaviour, and how do we know the machinery checking it remains trustworthy?*

**Recommendation:** Keep critical behavioural expectations explicitly owned, readable and independently reviewable. Let agents generate execution code where it provides value, but preserve layered checks on the runner, the oracle and production behaviour. Focus on **trustworthy evidence**, not the raw volume of generated tests.

## References

1. Matteo Vaccari, [Tests as data: Ensuring AI-generated code does what we want](https://martinfowler.com/articles/tests-as-data.html), 11 November 2026 — primary source and principal proposal.
2. Martin Fowler, [Specification by Example](https://martinfowler.com/bliki/SpecificationByExample.html) — historical background for executable examples and customer/developer alignment.
3. Russ Cox, [Go Testing By Example](https://research.swtch.com/testing) — table-driven and script-based testing precedents referenced by Vaccari.
4. [Stryker Mutator documentation](https://stryker-mutator.io/docs/) — tool-specific explanation of mutation-testing concepts; not evidence of universal effectiveness.
5. [Cucumber — Gherkin reference](https://cucumber.io/docs/gherkin/reference/) — comparison with a standard scenario language.
