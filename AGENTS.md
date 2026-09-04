# AGENTS.md

## Repository Purpose

This repository is a personal Quality Engineering knowledge base and VitePress website. It captures current research, engineering practices, tools, delivery problems, and Quality Engineering interpretations in a form that can be revisited over time.

The repository is not a generic testing notes collection. Content should remain evidence-based, technically useful, and oriented toward experienced Quality Engineers and engineering leaders.

Read `README.md` before making repository changes.

## Scope of These Instructions

These instructions apply to work performed inside this repository.

Project-wide research and reasoning rules may also exist outside the repository, for example in ChatGPT Project Instructions. Do not duplicate those rules here unless they affect repository execution, publishing, or verification.

If instructions conflict, follow the user's most recent explicit requirement first, then preserve established repository conventions where they do not conflict.

## Repository Structure

Current primary content areas are:

```text
quality-engineering/
├── .vitepress/
│   └── config.mts
├── AGENTS.md
├── index.md
├── package.json
├── README.md
├── research-digests/
│   ├── index.md
│   └── YYYY-MM-DD.md
└── tech-radar/
    ├── index.md
    └── vol-<number>.md
```

Inspect the repository before adding new top-level directories or changing this structure.

## Research Digests

Use `research-digests/YYYY-MM-DD.md` for dated Quality Engineering research articles and digests.

When adding a digest:

1. Use ISO date format for the filename: `YYYY-MM-DD.md`.
2. Follow the structure and tone of recent existing digests rather than introducing an unrelated article format.
3. Keep the problem statement concise when the article is based on a delivery problem.
4. Focus on root causes, engineering implications, current evidence, recommendations, implementation considerations, risks, and trade-offs.
5. Preserve direct links to important original sources.
6. Distinguish published evidence from repository interpretation or recommendations.
7. Do not present unsupported claims as established industry practice.
8. Add the new article to `research-digests/index.md`.
9. Add the article to the `/research-digests/` sidebar in `.vitepress/config.mts`.
10. Update `README.md` when the repository-level content list should reflect the new article.
11. Update the homepage only when the article should be prominently featured.

Keep digest listings newest-first unless the existing surrounding structure clearly requires otherwise.

## Thoughtworks Technology Radar Studies

Use `tech-radar/vol-<number>.md` for Quality Engineering-focused reviews of Thoughtworks Technology Radar editions.

When adding a Radar study:

1. Preserve the distinction between Thoughtworks' published position and independent Quality Engineering interpretation.
2. Add the study to `tech-radar/index.md`.
3. Add the study to the `/tech-radar/` sidebar in `.vitepress/config.mts`.
4. Update `README.md` where appropriate.
5. Keep naming consistent with the existing `vol-<number>.md` convention.

## Content Editing Rules

Before editing an existing article:

- Read the relevant file and nearby examples first.
- Preserve established terminology and article intent unless the user explicitly asks to change them.
- Do not silently remove references, caveats, or previously established conclusions.
- If newer evidence materially changes an earlier conclusion, make the revision explicit.
- Avoid broad rewrites when a targeted edit satisfies the request.

For research content, prefer concise, substantive engineering prose over generic management language or textbook explanations.

## VitePress Navigation

Navigation is configured in `.vitepress/config.mts`.

When publishing content, verify all applicable navigation surfaces:

- section index page
- VitePress sidebar
- README content list
- homepage, when intentionally featured

Do not add every article to the top navigation. The top navigation should remain focused on major content sections.

Use extensionless internal VitePress links in `.vitepress/config.mts`, consistent with the existing configuration.

## Homepage and Design

The site uses a reading-focused editorial style. Preserve the existing visual direction unless the user explicitly requests a redesign.

When changing the homepage or theme:

- inspect the existing implementation before editing
- preserve mobile usability
- preserve dark-mode readability
- avoid unnecessary UI complexity
- avoid duplicating navigation or calls to action without a clear reason
- preserve supplied image assets unless the user explicitly requests replacement or modification

Do not introduce a new design system or framework without an explicit requirement.

## Assets

When adding or changing images or other static assets:

- use repository-managed paths appropriate for VitePress
- verify the rendered path rather than assuming the asset URL is correct
- preserve transparency and dark-mode compatibility when those properties are part of the design requirement
- do not replace user-supplied artwork with a generated approximation unless explicitly requested

## Build and Verification

The repository uses VitePress.

Relevant commands are:

```bash
npm install
npm run docs:dev
npm run docs:build
npm run docs:preview
```

After repository changes, perform verification appropriate to the change.

For content-only changes, at minimum check:

- Markdown structure
- internal links
- source links where modified
- index/sidebar consistency

For navigation, theme, component, configuration, or asset changes, also run:

```bash
npm run docs:build
```

Do not consider a repository change complete if the production build fails because of that change.

## Change Discipline

- Make the smallest coherent change that satisfies the request.
- Preserve existing naming, navigation, content, and design conventions.
- Do not create duplicate articles or duplicate navigation entries.
- Do not remove existing content unless required by the task.
- Do not add dependencies unless they solve a concrete requirement.
- If a repository convention appears outdated or incorrect, surface the issue before replacing it unless the requested task explicitly requires the change.

## Publishing Checklist

Before completing a new article publication, verify:

- the file is in the correct directory
- the filename follows the repository convention
- the section index includes it
- the VitePress sidebar includes it
- README is updated when appropriate
- homepage is updated only when intentionally featured
- references remain usable and traceable
- internal links are correct
- the production build passes when the change affects site behavior, navigation, configuration, theme, or assets
