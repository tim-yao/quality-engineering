<script setup lang="ts">
import { computed } from 'vue'
import { data } from '../content.data'

const props = defineProps<{
  kind: 'research-digests' | 'tech-radar'
}>()

const item = computed(() =>
  props.kind === 'research-digests'
    ? data.researchDigests[0]
    : data.techRadarStudies[0]
)

const linkText = computed(() =>
  props.kind === 'research-digests'
    ? 'Read the latest digest'
    : `Read the Volume ${item.value?.volume} review`
)
</script>

<template>
  <template v-if="item">
    <h3>{{ item.title }}</h3>
    <p>{{ item.summary }}</p>
    <p><a :href="item.link">{{ linkText }} →</a></p>
  </template>
</template>
