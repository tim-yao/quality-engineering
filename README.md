# Quality Engineering

A personal knowledge repository and VitePress website for tracking current quality engineering research, engineering practices, tools and industry trends.

## Purpose

This project provides a structured learning system that:

- Collects recent quality engineering blog posts, papers, reports and technical discussions.
- Identifies emerging trends, techniques and tools.
- Summarises practical implications for quality engineering teams.
- Maintains a searchable personal knowledge base over time.
- Publishes the collected research as a static website through Cloudflare Pages.

The repository is intended to preserve evidence-based Quality Engineering knowledge that remains useful when revisited, rather than becoming a generic collection of testing notes.

## Repository guidance

Repository-specific instructions for coding agents are defined in [`AGENTS.md`](./AGENTS.md). Read it before making repository changes.

Project-wide research and reasoning rules may be maintained separately, for example in ChatGPT Project Instructions.

## Website content

### Research digests

Dated collections of recent articles, papers and engineering discussions related to emerging quality engineering trends and practical delivery problems.

- [Research digest index](./research-digests/index.md)

### Thoughtworks Technology Radar studies

Quality-engineering-focused reviews of Thoughtworks Technology Radar editions, separating the published position from independent QE interpretation and recommended action.

- [Technology Radar study index](./tech-radar/index.md)

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

For publishing and repository-change procedures, follow [`AGENTS.md`](./AGENTS.md).
