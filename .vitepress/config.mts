import { defineConfig } from 'vitepress'
import { fileURLToPath } from 'node:url'
import { discoverContent, formatContentDate } from './content'

const rootDir = fileURLToPath(new URL('..', import.meta.url))
const content = discoverContent(rootDir)

export default defineConfig({
  lang: 'en-AU',
  title: 'Quality Engineering',
  description: 'Research, trends and practical guidance for modern quality engineering.',
  cleanUrls: true,
  lastUpdated: true,

  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Research Digests', link: '/research-digests/' },
      { text: 'Tech Radar', link: '/tech-radar/' }
    ],

    sidebar: {
      '/research-digests/': [
        {
          text: 'Research Digests',
          items: [
            { text: 'Overview', link: '/research-digests/' },
            ...content.researchDigests.map((item) => ({
              text: formatContentDate(item.date),
              link: item.link
            }))
          ]
        }
      ],
      '/tech-radar/': [
        {
          text: 'Thoughtworks Technology Radar',
          items: [
            { text: 'Overview', link: '/tech-radar/' },
            ...content.techRadarStudies.map((item) => ({
              text: `Volume ${item.volume}`,
              link: item.link
            }))
          ]
        }
      ]
    },

    search: {
      provider: 'local'
    },

    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/tim-yao/quality-engineering'
      }
    ],

    footer: {
      message: 'A personal quality engineering knowledge base.',
      copyright: 'Content maintained by Tim Yao'
    },

    editLink: {
      pattern: 'https://github.com/tim-yao/quality-engineering/edit/main/:path',
      text: 'Edit this page on GitHub'
    },

    lastUpdated: {
      text: 'Last updated'
    },

    outline: {
      level: [2, 3]
    }
  }
})
