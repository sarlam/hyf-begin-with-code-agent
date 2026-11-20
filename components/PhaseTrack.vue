<script setup lang="ts">
// Where the students stand: a slim bar across the top with one stop per hands-on step.
// Stops before `step` are full, `step` is filled up to `progress` (0 to 1).
import { STEPS, stopFill } from '../pages/hands-on'

withDefaults(defineProps<{ step: number, progress?: number }>(), { progress: 0 })
</script>

<template>
  <ol class="track">
    <li v-for="({ stop }, i) in STEPS" :key="stop" :class="{ now: i === step, done: i < step }">
      <span class="name">{{ stop }}</span>
      <span class="bar"><span :style="{ width: `${stopFill(i, step, progress)}%` }" /></span>
    </li>
  </ol>
</template>

<style scoped>
.track {
  display: flex;
  gap: 0.4rem;
  list-style: none;
  padding: 0;
  margin: 0 0 2.5rem;
  font-size: 0.8rem;
}
.track li {
  flex: 1;
  margin: 0;
  opacity: 0.7; /* 5.3:1 on cream; 0.45 fell under WCAG AA */
}
.track li.now,
.track li.done {
  opacity: 1;
}
.now .name {
  font-weight: 700;
}
.bar {
  display: block;
  height: 0.3rem;
  border-radius: 999px;
  background: var(--hyf-tint);
  overflow: hidden;
}
.bar > span {
  display: block;
  height: 100%;
  background: var(--hyf-red);
  transition: width 0.4s ease;
}
</style>
