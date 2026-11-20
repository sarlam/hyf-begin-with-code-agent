<script setup lang="ts">
// Where the students stand: a slim bar across the top with the five stops of the hands-on.
// Stops before `current` are full, `current` is filled up to `progress` (0 to 1).
withDefaults(defineProps<{ current: number, progress?: number }>(), { progress: 0 })

const PHASES = ['Plan', 'Build', 'Steer', 'Test', 'Auto']
</script>

<template>
  <ol class="track">
    <li v-for="(name, i) in PHASES" :key="name" :class="{ now: i === current, done: i < current }">
      <span class="name">{{ name }}</span>
      <span class="bar"><span :style="{ width: `${i < current ? 100 : i === current ? progress * 100 : 0}%` }" /></span>
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
  opacity: 0.45;
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
