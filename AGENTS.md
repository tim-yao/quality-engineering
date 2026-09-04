# AGENTS.md

Read `README.md` before making repository changes. It is the source of truth for the repository purpose, structure, content areas, local development commands, and deployment setup.

## Scope of These Instructions

These instructions govern work performed inside this repository.

Project-wide research and reasoning rules may also exist outside the repository, for example in ChatGPT Project Instructions. Do not duplicate those rules here unless they affect repository execution, publishing, or verification.

If instructions conflict, follow the user's most recent explicit requirement first, then preserve established repository conventions where they do not conflict.

Inspect the repository before adding new top-level directories or changing its structure.

## Research Digests

Use `research-digests/YYYY-MM-DD.md` for dated Quality Engineering research articles and digests.

When adding a digest:

1. Use ISO date format for the filename: `YYYY-MM-DD.md`.
2. Add `title`, `date` (`YYYY-MM-DD`) and `summary` frontmatter. These fields are the canonical metadata used by the site.
3. Follow the structure and tone of recent existing digests rather than introducing an unrelated article format.
4. Keep the problem statement concise when the article is based on a delivery problem.
5. Focus on root causes, engineering implications, current evidence, recommendations, implementation considerations, risks, and trade-offs.
6. Preserve direct links to important original sources.
7. Distinguish published evidence from repository interpretation or recommendations.
8. Do not present unsupported claims as established industry practice.

The research digest index, sidebar and homepage latest-digest section are generated automatically from article frontmatter and sorted newest-first. Do not add manual article listings to those pages or to `.vitepress/config.mts`.

The dated article files and their frontmatter are the canonical article listing. Do not maintain a duplicate per-article content list in `README.md`.

## Thoughtworks Technology Radar Studies

Use `tech-radar/vol-<number>.md` for Quality Engineering-focused reviews of Thoughtworks Technology Radar editions.

When adding a Radar study:

1. Preserve the distinction between Thoughtworks' published position and independent Quality Engineering interpretation.
2. Keep naming consistent with the existing `vol-<number>.md` convention.
3. Add `title`, `date` (`YYYY-MM-DD`), `summary` and numeric `volume` frontmatter. These fields are the canonical metadata used by the site.

The Tech Radar index, sidebar and homepage latest-study section are generated automatically from study frontmatter and sorted newest-first. Do not add manual study listings to those pages or to `.vitepress/config.mts`.

The study files and their frontmatter are the canonical study listing. Do not maintain a duplicate per-study content list in `README.md`.

## Content Editing Rules

Before editing an existing article:

- Read the relevant file and nearby examples first.
- Preserve established terminology and article intent unless the user explicitly asks to change them.
- Do not silently remove references, caveats, or previously established conclusions.
- If newer evidence materially changes an earlier conclusion, make the revision explicit.
- Avoid broad rewrites when a targeted edit satisfies the request.

For research content, prefer concise, substantive engineering prose over generic management language or textbook explanations.

## VitePress Navigation and Content Discovery

Top-level navigation is configured in `.vitepress/config.mts`. Article sidebars, section indexes and homepage latest-content sections are generated from the Markdown files and their frontmatter through `.vitepress/content.ts` and `.vitepress/content.data.ts`.

When publishing content:

- use the required filename convention and frontmatter fields
- do not manually edit the section indexes, article sidebars or homepage latest-content sections
- run the production build; missing or invalid canonical metadata must fail the build

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

## Verification

After repository changes, perform verification appropriate to the change.

For content-only changes, at minimum check:

- Markdown structure
- internal links
- source links where modified
- required frontmatter and generated-content consistency

For navigation, theme, component, configuration, or asset changes, also run the production build command documented in `README.md`.

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
- required canonical frontmatter is present and accurate
- the generated section index, sidebar and homepage latest-content section include it in newest-first order
- references remain usable and traceable
- internal links are correct
- the production build passes
