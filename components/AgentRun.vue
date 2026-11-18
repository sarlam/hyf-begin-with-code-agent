<script setup lang="ts">
// One made-up agent run, one message per click. Every message goes through the agent: it sends the
// history to the LLM, runs the tool the LLM asks for, and piles the result onto the history.
// The history in the agent's frame is exactly what the LLM reads on its next turn.
import type { Edge } from './LoopDiagram.vue'
import LoopDiagram from './LoopDiagram.vue'
import StepCaption from './StepCaption.vue'

const props = defineProps<{
  step: number
  request: string
  tools: { call: string, result: string }[] // what the LLM asks for, and what the tool returns
  answer: string
}>()

type Kind = 'ask' | 'send' | 'call' | 'run' | 'result' | 'answer' | 'done'

const EDGE: Record<Kind, Edge> = {
  ask: 'ask', send: 'send', call: 'reply', run: 'run', result: 'result', answer: 'reply', done: 'answer',
}

const CAPTION: Record<Kind, string> = {
  ask: 'You ask the agent for something',
  send: 'The agent sends the whole history to the LLM',
  call: 'The LLM can only write text: here, a request to use a tool',
  run: 'The agent runs that tool for it',
  result: 'The result goes on the history',
  answer: 'No tool needed any more: the LLM writes the answer',
  done: 'The agent hands you the answer, and the loop stops',
}

const HISTORY = [
  { icon: '👤', text: props.request, code: false },
  ...props.tools.flatMap(t => [
    { icon: '🧠', text: t.call, code: true },
    { icon: '🛠', text: t.result, code: true },
  ]),
  { icon: '🧠', text: props.answer, code: false },
]

// Each step: what happens, and how many history lines exist by then.
const STEPS: { kind: Kind, lines: number }[] = [
  { kind: 'ask', lines: 1 },
  ...props.tools.flatMap((_, i): { kind: Kind, lines: number }[] => [
    { kind: 'send', lines: 1 + 2 * i },
    { kind: 'call', lines: 2 + 2 * i },
    { kind: 'run', lines: 2 + 2 * i },
    { kind: 'result', lines: 3 + 2 * i },
  ]),
  { kind: 'send', lines: HISTORY.length - 1 },
  { kind: 'answer', lines: HISTORY.length },
  { kind: 'done', lines: HISTORY.length },
]
</script>

<template>
  <div>
    <StepCaption :step="step" :steps="STEPS.map(s => CAPTION[s.kind])" />

    <LoopDiagram :active="EDGE[STEPS[step].kind]" class="mt-2">
      <ol class="history" :class="{ sending: STEPS[step].kind === 'send' }">
        <li
          v-for="(h, i) in HISTORY.slice(0, STEPS[step].lines)" :key="i"
          :class="{ current: i === STEPS[step].lines - 1 && STEPS[step].kind !== 'send' }"
        >
          <span>{{ h.icon }}</span>
          <code v-if="h.code">{{ h.text }}</code>
          <span v-else>{{ h.text }}</span>
        </li>
      </ol>
    </LoopDiagram>

    <p class="text-sm opacity-60 mt-1">
      The history in the middle is what the LLM reads every time: its <b>context</b>.
    </p>
  </div>
</template>

<style scoped>
.history {
  list-style: none;
  padding: 0.25rem;
  margin: 0;
  font-size: 0.9rem;
  border: 2px solid transparent;
  border-radius: 0.5rem;
  transition: border-color 0.2s;
}
.history.sending {
  border-color: var(--hyf-accent);
}
.history li {
  display: flex;
  gap: 0.5rem;
  padding: 0.1rem 0.4rem;
  margin: 0;
  border-radius: 0.3rem;
  opacity: 0.6;
  animation: appear 0.35s ease;
}
/* Plain code, without the deck's inline-code box, so all lines fit in the frame. */
.history li code {
  padding: 0;
  background: none;
  font-size: 0.85rem;
}
.history.sending li,
.history li.current {
  opacity: 1;
}
.history li.current {
  background: var(--hyf-yellow);
}
@keyframes appear {
  from {
    opacity: 0;
    transform: translateY(-0.4rem);
  }
}
</style>
