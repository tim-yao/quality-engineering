# Quality Engineering

A personal knowledge repository and VitePress website for tracking current quality engineering research, engineering practices, tools and industry trends.

## Purpose

This project provides a structured learning system that:

- Collects recent quality engineering blog posts, papers, reports and technical discussions.
- Identifies emerging trends, techniques and tools.
- Summarises practical implications for quality engineering teams.
- Maintains a searchable personal knowledge base over time.
- Publishes the collected research as a static website through Cloudflare Pages.

## Website content

### Research digests

Dated collections of recent articles, papers and engineering discussions related to emerging quality engineering trends.

- [Research digest index](./research-digests/index.md)
- [1 August 2026 — API testing with Zod, OpenAPI-first runtime validation, generated schemas and property-based testing](./research-digests/2026-08-01.md)
- [29 July 2026 — Frontend/backend API integration testing, contract validation and workflow testing](./research-digests/2026-07-29.md)
- [25 July 2026 — Agentic testing, AI evaluation, just-in-time testing and quality governance](./research-digests/2026-07-25.md)

### Thoughtworks Technology Radar studies

Quality-engineering-focused reviews of Thoughtworks Technology Radar editions, separating the published position from independent QE interpretation and recommended action.

- [Technology Radar study index](./tech-radar/index.md)
- [Volume 34 — Quality Engineering Review](./tech-radar/vol-34.md)

## Run locally

Install dependencies:

```bash
npm install
```

Start the local development server:

```bash
npm run docs:dev
```

Build the production website:

```bash
npm run docs:build
```

Preview the production build:

```bash
npm run docs:preview
```

## Cloudflare Pages settings

Configure the Git-connected Cloudflare Pages project with:

```text
Framework preset: VitePress
Build command: npm run docs:build
Build output directory: .vitepress/dist
Root directory: /
```

A separate Wrangler deployment command is not required for this Pages workflow.

## Repository structure

```text
quality-engineering/
├── .vitepress/
│   └── config.mts
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

## Update model

- Use `research-digests/YYYY-MM-DD.md` for recurring research collections.
- Use `tech-radar/vol-<number>.md` for Thoughtworks Technology Radar studies.
- Add each new report to its directory index and the VitePress sidebar in `.vitepress/config.mts`.
- Update the homepage when a new report should be prominently featured.
