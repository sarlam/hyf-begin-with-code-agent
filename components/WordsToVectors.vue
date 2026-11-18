<script setup lang="ts">
// A deliberately unrealistic walk-through: text -> tokens -> neighbours -> numbers -> a place on a map.
// Positions and colours match VectorSpace.vue so the next slide picks up where this one ends.
import StepCaption from './StepCaption.vue'

defineProps<{ step: number }>()

type Point = { x: number, y: number }
type Word = { color: string, at: Point }

const STEPS = [
  'An LLM reads a huge pile of text',
  'It cuts the text into tokens (words, or pieces of words)',
  'For each token, it notes the neighbours it shows up with',
  'What it noted becomes a list of numbers: a vector',
  'Those numbers are a place on a map: words used alike land close together',
]

const WORDS: Record<string, Word> = {
  king: { color: '#d97706', at: { x: 3, y: 1 } },
  queen: { color: '#7c3aed', at: { x: 2, y: 2 } },
  cat: { color: '#64748b', at: { x: -3, y: -2 } },
}
const CONTEXT = new Set(['rules', 'castle', 'sleeps', 'sofa'])

const SENTENCES = [
  'the king rules the castle',
  'the queen rules the castle',
  'the cat sleeps on the sofa',
].map((s) => {
  const tokens = s.split(' ')
  return { tokens, target: tokens.find(t => t in WORDS)! }
})

const UNIT = 28 // svg px per axis unit
const MAX_X = 4
const MAX_Y = 3

// Style of one token in its sentence for the current step.
function tokenStyle(token: string, target: string, step: number) {
  if (step < 2)
    return {}
  const color = WORDS[target].color
  if (token === target)
    return { color, fontWeight: 'bold', borderColor: color }
  if (CONTEXT.has(token))
    return { color, textDecoration: 'underline' }
  return { opacity: 0.35 }
}
</script>

<template>
  <div>
    <StepCaption :step="step" :steps="STEPS" />

    <div class="grid grid-cols-2 gap-8 items-start mt-6">
      <div class="flex flex-col gap-3 text-xl">
        <div v-for="s in SENTENCES" :key="s.tokens.join(' ')" class="flex flex-wrap gap-1">
          <span
            v-for="(t, i) in s.tokens" :key="i"
            class="token" :class="{ chip: step >= 1 }"
            :style="tokenStyle(t, s.target, step)"
          >{{ t }}</span>
        </div>
      </div>

      <div class="flex flex-col items-center gap-3">
        <div class="font-mono text-lg">
          <div
            v-for="(w, name, i) in WORDS" :key="name"
            class="slide-in" :class="{ shown: step >= 3 }" :style="{ transitionDelay: `${i * 200}ms` }"
          >
            <b :style="{ color: w.color }">{{ name }}</b> → [ {{ w.at.x }}, {{ w.at.y }} ]
          </div>
        </div>

        <svg
          :viewBox="`${-(MAX_X + 0.5) * UNIT} ${-(MAX_Y + 0.5) * UNIT} ${(2 * MAX_X + 1) * UNIT} ${(2 * MAX_Y + 1) * UNIT}`"
          height="190" class="map" :class="{ shown: step >= 4 }"
        >
          <g stroke="currentColor" stroke-opacity="0.5">
            <line :x1="-MAX_X * UNIT" :x2="MAX_X * UNIT" y1="0" y2="0" />
            <line x1="0" x2="0" :y1="-MAX_Y * UNIT" :y2="MAX_Y * UNIT" />
          </g>
          <!-- each word starts at the origin and travels to its place once the map is shown -->
          <g
            v-for="(w, name) in WORDS" :key="name" class="point" :fill="w.color"
            :style="{ transform: step >= 4 ? `translate(${w.at.x * UNIT}px, ${-w.at.y * UNIT}px)` : 'none' }"
          >
            <circle r="5" />
            <text x="8" y="-8" font-weight="bold" style="font-size: 14px">{{ name }}</text>
          </g>
        </svg>
      </div>
    </div>

    <p class="text-sm opacity-60 mt-4">
      Not realistic on purpose: real models use thousands of numbers per token, learned during training.
    </p>
  </div>
</template>

<style scoped>
.token {
  padding: 0.05rem 0.4rem;
  border: 2px solid transparent;
  border-radius: 0.4rem;
  transition: all 0.5s ease;
}
.token.chip {
  border-color: rgba(128, 128, 128, 0.35);
}
.slide-in {
  opacity: 0;
  transform: translateX(-1.5rem);
  transition: all 0.5s ease;
}
.slide-in.shown {
  opacity: 1;
  transform: none;
}
.map {
  opacity: 0;
  transition: opacity 0.4s ease;
}
.map.shown {
  opacity: 1;
}
.point {
  transition: transform 1s ease-in-out 0.3s;
}
</style>
