import type { Loader } from 'vitepress'
import { discoverContent, type SiteContent } from './content'

export default {
  watch: ['research-digests/*.md', 'tech-radar/*.md'],
  load(): SiteContent {
    return discoverContent(process.cwd())
  }
} satisfies Loader
