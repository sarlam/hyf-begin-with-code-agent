<script setup lang="ts">
// One prompt, one probability table, and a weighted dice the presenter rolls live.
// Rolling 100 times shows the tally drifting towards the percentages.
import { ref } from 'vue'
import ProbabilityBars from './ProbabilityBars.vue'
import StepCaption from './StepCaption.vue'

const props = defineProps<{
  step: number
  prompt: string
  options: { token: string, p: number }[] // p adds up to 100
}>()

const STEPS = [
  'An LLM reads your text and has to guess the next word',
  'It gives every possible next word a probability',
  'Then it rolls a weighted dice: same question, different answers',
]

const counts = ref(props.options.map(() => 0))
const active = ref<number>()
const rolling = ref(false)

function sample(): number {
  let r = Math.random() * 100
  for (const [i, o] of props.options.entries()) {
    r -= o.p
    if (r < 0)
      return i
  }
  return props.options.length - 1 // only reached through float rounding
}

// Highlight sweeps over the rows twice, slowing down, and stops on the sampled one.
function roll() {
  if (rolling.value)
    return
  rolling.value = true
  const result = sample()
  const n = props.options.length
  const sweep = Array.from({ length: 2 * n + result + 1 }, (_, i) => i % n)
  sweep.forEach((row, i) => setTimeout(() => {
    active.value = row
    if (i === sweep.length - 1) {
      counts.value[result]++
      rolling.value = false
    }
  }, 40 * i + 4 * i * i))
}

function rollMany(times: number) {
  for (let i = 0; i < times; i++)
    counts.value[sample()]++
  active.value = undefined
}

function reset() {
  counts.value = props.options.map(() => 0)
  active.value = undefined
}
</script>

<template>
  <div>
    <StepCaption :step="step" :steps="STEPS" />

    <p class="text-3xl mt-8 mb-8">
      {{ prompt }}
      <b v-if="active !== undefined && !rolling" class="picked">{{ options[active].token.trim() }}</b>
      <span v-else class="blank">______</span>
    </p>

    <div class="flex items-center gap-10">
      <ProbabilityBars
        :options="options" :active="active" :counts="step >= 2 ? counts : undefined"
        :hidden="step < 1" :class="{ 'opacity-0': step < 1 }" class="transition-opacity"
      />
      <!-- mousedown.prevent keeps focus off the buttons, so Space still goes to the next slide -->
      <div v-if="step >= 2" class="flex flex-col gap-2">
        <button class="btn text-xl" :disabled="rolling" @mousedown.prevent @click="roll">🎲 Roll</button>
        <button class="btn" @mousedown.prevent @click="rollMany(100)">Roll 100 ×</button>
        <button class="btn opacity-60" @mousedown.prevent @click="reset">Reset</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.picked {
  color: var(--hyf-accent);
}
.blank {
  opacity: 0.4;
}
.btn {
  padding: 0.3rem 1rem;
  border: 1px solid currentColor;
  border-radius: 0.5rem;
}
.btn:hover:not(:disabled) {
  background: var(--hyf-tint);
}
</style>
