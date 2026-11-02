<script setup lang="ts">
import { computed, ref } from 'vue'
import { withBase } from 'vitepress'
import { data } from '../content.data'
const articles = data.researchDigests
const topics = [...new Set(articles.flatMap(a => a.topics))].sort()
const selected = ref('')
const height = Math.max(550, articles.length * 110, topics.length * 85)
const nodes = computed(() => [
  ...topics.map((name, i) => ({ id: name, label: name, x: 22, y: (i + .5) * height / topics.length, topic: true, date: '', count: articles.filter(a => a.topics.includes(name)).length })),
  ...articles.map((a, i) => ({ id: a.link, label: a.summary, x: 76, y: (i + .5) * height / articles.length, topic: false, date: a.date, count: 0 }))
])
const edges = computed(() => articles.flatMap(a => a.topics.map(t => ({ from: nodes.value.find(n => n.id === t)!, to: nodes.value.find(n => n.id === a.link)! }))))
const related = computed(() => articles.filter(a => a.link === selected.value || a.topics.includes(selected.value)))
function active(id: string) {
  return !selected.value || id === selected.value || related.value.some(a => a.link === id || (!topics.includes(selected.value) && a.topics.includes(id)))
}
function select(id: string) { selected.value = selected.value === id ? '' : id }
</script>
<template>
  <div class="research-map">
    <p>{{ articles.length }} digests · {{ topics.length }} topics · Counts show digest coverage</p>
    <div class="graph" :style="{ height: `${height}px` }">
      <svg aria-hidden="true"><line v-for="e in edges" :key="e.from.id + e.to.id" :x1="e.from.x + '%'" :y1="e.from.y" :x2="e.to.x + '%'" :y2="e.to.y" :class="{ faded: !active(e.from.id) || !active(e.to.id), highlighted: selected && active(e.from.id) && active(e.to.id) }" /></svg>
      <button v-for="n in nodes" :key="n.id" type="button" :aria-pressed="selected === n.id" :class="{ topic: n.topic, faded: !active(n.id) }" :style="{ left: n.x + '%', top: n.y + 'px' }" @click="select(n.id)">
        <span v-if="n.date" class="date">{{ n.date }}</span>{{ n.label }}<span v-if="n.topic"> · {{ n.count }}</span>
      </button>
    </div>
    <div class="selection" aria-live="polite">
      <template v-if="selected"><strong>{{ topics.includes(selected) ? selected : 'Selected digest' }}</strong><ul><li v-for="a in related" :key="a.link"><a :href="withBase(a.link)">{{ a.title }} →</a><p>{{ a.topics.join(' · ') }}</p></li></ul></template>
      <span v-else>Select a topic or article to explore its connections.</span>
    </div>
  </div>
</template>
<style scoped>
.graph{position:relative;margin:24px 0}.graph svg{position:absolute;width:100%;height:100%;pointer-events:none}.graph line{stroke:var(--vp-c-divider);stroke-width:1.5}.graph line.highlighted{stroke:var(--vp-c-brand-1);stroke-width:2}.graph button{position:absolute;transform:translate(-50%,-50%);width:42%;padding:10px;border-radius:10px;background:var(--vp-c-bg);border:1px solid var(--vp-c-divider);color:var(--vp-c-text-1);cursor:pointer;text-align:left;font:inherit;font-size:13px;line-height:1.5}.graph button.topic{background:var(--vp-c-brand-soft);font-weight:600}.graph button:hover,.graph button[aria-pressed=true]{border-color:var(--vp-c-brand-1)}.graph button:focus-visible{outline:2px solid var(--vp-c-brand-1);outline-offset:3px}.date{display:block;color:var(--vp-c-text-2)}.faded{opacity:.22}.selection{min-height:64px;border-top:1px solid var(--vp-c-divider);padding-top:16px}.selection p{margin:0;color:var(--vp-c-text-2);font-size:13px}@media(max-width:480px){.graph button{font-size:12px;padding:6px}}
</style>
