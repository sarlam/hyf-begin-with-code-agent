<script setup lang="ts">
// One row per candidate next token: label, a bar as wide as its probability, the %, and an optional tally.
defineProps<{
  options: { token: string, p: number }[]
  active?: number // index of the highlighted (picked) row
  counts?: number[] // how many times each row was picked
  hidden?: boolean // keeps the bars at zero width, so they grow in once it turns false
}>()

// Tokens carry their own leading space or newline; show them readably.
function label(token: string) {
  return token === '<end>' ? '(end)' : token.replaceAll('\n', '⏎ ').trim()
}
</script>

<template>
  <div class="bars" :style="{ gridTemplateColumns: counts ? 'auto 18rem auto auto' : 'auto 18rem auto' }">
    <template v-for="(o, i) in options" :key="o.token">
      <span class="label" :class="{ active: i === active }">{{ label(o.token) }}</span>
      <div class="track">
        <div class="bar" :class="{ active: i === active }" :style="{ width: hidden ? '0%' : `${o.p}%` }" />
      </div>
      <span class="pct">{{ o.p }}%</span>
      <span v-if="counts" class="count">× {{ counts[i] }}</span>
    </template>
  </div>
</template>

<style scoped>
.bars {
  display: grid;
  justify-content: start;
  align-items: center;
  gap: 0.4rem 0.75rem;
  font-size: 1.1rem;
}
.label {
  justify-self: end;
  font-family: var(--slidev-code-font-family, monospace);
  transition: color 0.15s;
}
.track {
  height: 1.1rem;
  border-radius: 0.3rem;
  background: rgba(128, 128, 128, 0.12);
}
.bar {
  height: 100%;
  border-radius: 0.3rem;
  background: rgba(128, 128, 128, 0.55);
  transition: width 0.6s ease, background 0.15s;
}
.label.active {
  color: var(--hyf-accent);
  font-weight: bold;
}
.bar.active {
  background: var(--hyf-accent);
}
.pct,
.count {
  font-size: 0.9rem;
  opacity: 0.7;
  font-variant-numeric: tabular-nums;
}
</style>
