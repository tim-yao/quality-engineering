import fs from 'node:fs'
import path from 'node:path'

export type ContentKind = 'research-digest' | 'tech-radar'

export interface ContentItem {
  kind: ContentKind
  title: string
  date: string
  summary: string
  link: string
  volume?: number
}

export interface SiteContent {
  researchDigests: ContentItem[]
  techRadarStudies: ContentItem[]
}

function parseFrontmatter(filePath: string): Record<string, string> {
  const source = fs.readFileSync(filePath, 'utf8')
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/)

  if (!match) {
    throw new Error(`Missing frontmatter in ${filePath}`)
  }

  return Object.fromEntries(
    match[1]
      .split(/\r?\n/)
      .filter((line) => line.trim() && !line.trimStart().startsWith('#'))
      .map((line) => {
        const separator = line.indexOf(':')
        if (separator < 1) {
          throw new Error(`Invalid frontmatter line in ${filePath}: ${line}`)
        }

        const key = line.slice(0, separator).trim()
        const rawValue = line.slice(separator + 1).trim()
        const value = rawValue.replace(/^(['"])(.*)\1$/, '$2')
        return [key, value]
      })
  )
}

function discoverSection(
  rootDir: string,
  directory: string,
  kind: ContentKind,
  filePattern: RegExp
): ContentItem[] {
  const sectionDir = path.join(rootDir, directory)

  return fs
    .readdirSync(sectionDir)
    .filter((fileName) => filePattern.test(fileName))
    .map((fileName) => {
      const filePath = path.join(sectionDir, fileName)
      const metadata = parseFrontmatter(filePath)

      for (const field of ['title', 'date', 'summary']) {
        if (!metadata[field]) {
          throw new Error(`Missing ${field} frontmatter in ${filePath}`)
        }
      }

      if (!/^\d{4}-\d{2}-\d{2}$/.test(metadata.date)) {
        throw new Error(`Invalid date frontmatter in ${filePath}: ${metadata.date}`)
      }

      const item: ContentItem = {
        kind,
        title: metadata.title,
        date: metadata.date,
        summary: metadata.summary,
        link: `/${directory}/${fileName.replace(/\.md$/, '')}`
      }

      if (kind === 'tech-radar') {
        const volume = Number(metadata.volume)
        if (!Number.isInteger(volume) || volume < 1) {
          throw new Error(`Missing or invalid volume frontmatter in ${filePath}`)
        }
        item.volume = volume
      }

      return item
    })
    .sort((a, b) => b.date.localeCompare(a.date) || b.link.localeCompare(a.link))
}

export function discoverContent(rootDir: string): SiteContent {
  return {
    researchDigests: discoverSection(
      rootDir,
      'research-digests',
      'research-digest',
      /^\d{4}-\d{2}-\d{2}\.md$/
    ),
    techRadarStudies: discoverSection(
      rootDir,
      'tech-radar',
      'tech-radar',
      /^vol-\d+\.md$/
    )
  }
}

export function formatContentDate(date: string): string {
  return new Intl.DateTimeFormat('en-AU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC'
  }).format(new Date(`${date}T00:00:00Z`))
}
