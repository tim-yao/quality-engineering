import { defineConfig } from 'vitepress'

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
            {
              text: '25 July 2026',
              link: '/research-digests/2026-07-25'
            }
          ]
        }
      ],
      '/tech-radar/': [
        {
          text: 'Thoughtworks Technology Radar',
          items: [
            { text: 'Overview', link: '/tech-radar/' },
            { text: 'Volume 34', link: '/tech-radar/vol-34' }
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
