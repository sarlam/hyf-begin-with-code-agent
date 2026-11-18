<script setup lang="ts">
// Generation one token per click: the pick lights up on the bars, then it is appended and the next bars appear.
// A position whose pick is '<end>' is where the model decides to stop.
import { ref, watch } from 'vue'
import ProbabilityBars from './ProbabilityBars.vue'

const props = defineProps<{
  step: number // tokens generated so far
  prompt: string
  path: { options: { token: string, p: number }[], pick: number }[]
  code?: boolean // monospace, keeps line breaks
}>()

const LANDING_MS = 350

const shown = ref(props.step) // position whose bars are on screen; also how many tokens are written
const landing = ref(false) // the pick is highlighted but not yet appended
let timer: ReturnType<typeof setTimeout> | undefined

watch(() => props.step, (to, from) => {
  clearTimeout(timer)
  landing.value = to === from + 1
  if (!landing.value) {
    shown.value = to
    return
  }
  timer = setTimeout(() => {
    landing.value = false
    shown.value = to
  }, LANDING_MS)
})

const picked = (i: number) => props.path[i].options[props.path[i].pick].token
</script>

<template>
  <div>
    <div class="text text-3xl" :class="{ code }">
      <span>{{ prompt }}</span>
      <template v-for="i in shown" :key="i">
        <span v-if="picked(i - 1) !== '<end>'" class="generated">{{ picked(i - 1) }}</span>
      </template>
      <span v-if="shown < path.length" class="cursor">▁</span>
    </div>

    <div class="mt-8 min-h-48">
      <ProbabilityBars
        v-if="shown < path.length" :key="shown"
        :options="path[shown].options" :active="landing ? path[shown].pick : undefined"
      />
      <p v-else class="text-xl">
        ⏹ The most likely next token was <b class="generated">(end)</b>, so it stopped.
      </p>
    </div>
  </div>
</template>

<style scoped>
.text {
  white-space: pre-wrap;
  line-height: 1.5;
}
.text.code {
  font-family: var(--slidev-code-font-family, monospace);
  font-size: 1.5rem;
}
.generated {
  color: var(--hyf-accent);
  font-weight: bold;
}
.cursor {
  opacity: 0.5;
  animation: blink 1s steps(1) infinite;
}
@keyframes blink {
  50% {
    opacity: 0;
  }
}
</style>
