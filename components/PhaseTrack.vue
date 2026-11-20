<script lang="ts">
// The five stops of the hands-on, with the colour of each stop's Goal card (TwoBeat).
export const PHASES = [
  { name: 'Plan', bg: 'var(--hyf-maroon)', fg: 'var(--hyf-cream)' },
  { name: 'Build', bg: 'var(--hyf-red)', fg: 'var(--hyf-cream)' },
  { name: 'Steer', bg: 'color-mix(in srgb, var(--hyf-red) 45%, var(--hyf-yellow))', fg: 'var(--hyf-maroon)' },
  { name: 'Test', bg: 'var(--hyf-yellow)', fg: 'var(--hyf-maroon)' },
  { name: 'Auto', bg: 'var(--hyf-tint)', fg: 'var(--hyf-maroon)' },
]
</script>

<script setup lang="ts">
// Where the students stand: stops before `current` are full, `current` is filled up to `progress` (0 to 1).
// Horizontal: a slim bar across the top. Vertical: a rail down the left, the current stop expanded with `title`.
withDefaults(defineProps<{ current: number, progress?: number, vertical?: boolean, title?: string }>(), {
  progress: 0,
})
</script>

<template>
  <ol class="track" :class="{ vertical }">
    <li v-for="(p, i) in PHASES" :key="p.name" :class="{ now: i === current, done: i < current }">
      <span class="name">{{ p.name }}</span>
      <span class="bar"><span :style="{ width: `${i < current ? 100 : i === current ? progress * 100 : 0}%` }" /></span>
      <span v-if="vertical && i === current && title" class="title">{{ title }}</span>
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

/* The rail: stops stacked, the bar turned into a short rule, the current stop taller and titled. */
.vertical {
  flex-direction: column;
  margin: 0;
  gap: 1rem;
  font-size: 1rem;
}
.vertical li {
  flex: none;
  padding-left: 0.9rem;
  border-left: 0.3rem solid var(--hyf-tint);
}
.vertical li.done {
  border-left-color: var(--hyf-red);
}
.vertical li.now {
  border-left-color: var(--hyf-red);
  padding: 0.6rem 0.9rem;
  background: var(--hyf-tint);
  font-size: 1.3rem;
}
.vertical .bar {
  display: none;
}
.title {
  display: block;
  font-size: 0.9rem;
  margin-top: 0.2rem;
  line-height: 1.3;
}
</style>
