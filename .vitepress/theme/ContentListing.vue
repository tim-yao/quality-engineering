<script setup lang="ts">
import { computed } from 'vue'
import { data } from '../content.data'

const props = defineProps<{
  kind: 'research-digests' | 'tech-radar'
}>()

const items = computed(() =>
  props.kind === 'research-digests'
    ? data.researchDigests
    : data.techRadarStudies
)

function formatDate(date: string): string {
  return new Intl.DateTimeFormat('en-AU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC'
  }).format(new Date(`${date}T00:00:00Z`))
}
</script>

<template>
  <table>
    <thead>
      <tr v-if="kind === 'research-digests'">
        <th>Date</th>
        <th>Focus</th>
        <th>Report</th>
      </tr>
      <tr v-else>
        <th>Volume</th>
        <th>Published</th>
        <th>Study report</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :key="item.link">
        <td v-if="kind === 'research-digests'">{{ formatDate(item.date) }}</td>
        <td v-else>{{ item.volume }}</td>
        <td v-if="kind === 'research-digests'">{{ item.summary }}</td>
        <td v-else>{{ formatDate(item.date) }}</td>
        <td><a :href="item.link">{{ kind === 'research-digests' ? 'Read the digest' : item.title }}</a></td>
      </tr>
    </tbody>
  </table>
</template>
