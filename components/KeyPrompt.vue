<script setup lang="ts">
// The prompt's key line, as a card or, with `typed`, typing itself into an agent's input box each time the slide
// is entered (each letter is a span that appears after its own delay). The full prompt lives in the workbook.
import { useIsSlideActive } from '@slidev/client'

defineProps<{ text: string, typed?: boolean }>()
const active = useIsSlideActive()
</script>

<template>
  <div>
    <p v-if="!typed" class="card">{{ text }}</p>
    <p v-else :key="String(active)" class="terminal">
      <span class="sign">❯ </span>
      <span v-for="(c, i) in text" :key="i" class="letter" :style="{ '--i': i }">{{ c }}</span>
      <span class="caret letter" :style="{ '--i': text.length }" />
    </p>
    <p class="note">📓 Full prompt in your workbook</p>
  </div>
</template>

<style scoped>
p {
  margin: 0;
}
.card {
  padding: 1rem 1.25rem;
  border-left: 0.3rem solid var(--hyf-maroon);
  background: var(--hyf-yellow);
  font-size: 1.4rem;
}
.terminal {
  padding: 1.25rem 1.5rem;
  border-radius: 0.6rem;
  background: var(--hyf-maroon);
  color: var(--hyf-cream);
  font-family: ui-monospace, monospace;
  font-size: 1.3rem;
  line-height: 1.5;
}
.sign {
  color: var(--hyf-yellow);
}
.letter {
  opacity: 0;
  animation: appear 0s calc(var(--i) * 45ms) forwards;
}
.caret {
  display: inline-block;
  width: 0.6em;
  height: 1.1em;
  vertical-align: text-bottom;
  background: var(--hyf-yellow);
  animation: appear 0s calc(var(--i) * 45ms) forwards, blink 1s calc(var(--i) * 45ms) step-end infinite;
}
@keyframes appear {
  to {
    opacity: 1;
  }
}
@keyframes blink {
  50% {
    opacity: 0;
  }
}
.note {
  margin-top: 0.5rem;
  font-size: 0.9rem;
  opacity: 0.75;
}
</style>
