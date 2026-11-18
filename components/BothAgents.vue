<script setup lang="ts">
// Side-by-side commands for the two agents the class may use. Omit a side when it has nothing to show.
defineProps<{ claude?: string, opencode?: string }>()
</script>

<template>
  <div class="grid grid-cols-2 gap-4 my-3">
    <div v-for="[name, cmd] in [['Claude Code', claude], ['opencode', opencode]]" :key="name">
      <div class="text-sm opacity-60 mb-1">{{ name }}</div>
      <pre class="cmd">{{ cmd ?? '(same as Claude Code)' }}</pre>
    </div>
  </div>
</template>

<style scoped>
.cmd {
  margin: 0;
  padding: 0.5rem 0.75rem;
  border-radius: 0.4rem;
  background: var(--hyf-tint);
  font-family: var(--slidev-code-font-family, monospace);
  font-size: 0.8rem;
  white-space: pre-wrap;
  word-break: break-all;
}
</style>
