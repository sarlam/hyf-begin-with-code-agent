<script setup lang="ts">
// A hands-on step's first slide: the progress bar, then its Goal headline and its Why line.
import { STEPS } from '../pages/hands-on'

const props = defineProps<{ step: number }>()
const { goal, why } = STEPS[props.step]
</script>

<template>
  <PhaseTrack :step="step" />
  <div class="mt-24 text-6xl">
    <p class="label">Goal</p>
    <p class="goal">{{ goal }}</p>
    <p class="why"><b>Why:</b> {{ why }}</p>
  </div>
</template>

<style scoped>
p {
  margin: 0;
}
.label {
  font-size: 0.45em;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  opacity: 0.7;
}
.goal {
  font-weight: 700;
  line-height: 1.15;
}
.why {
  margin-top: 0.6em;
  font-size: 0.5em;
  line-height: 1.4;
}
</style>
