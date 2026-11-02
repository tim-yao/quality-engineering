import DefaultTheme from 'vitepress/theme'
import './custom.css'
import ContentListing from './ContentListing.vue'
import ResearchMap from './ResearchMap.vue'
import LatestContent from './LatestContent.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('ResearchMap', ResearchMap)
    app.component('ContentListing', ContentListing)
    app.component('LatestContent', LatestContent)
  }
}
