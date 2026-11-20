<script setup lang="ts">
// A hands-on step's "Do it" slide: the progress bar, the prompt's key line, and one check per click.
// The slide sets `clicks: 3` and passes `$clicks`; the bar fills a quarter per click.
import { STEPS } from '../pages/hands-on'

const props = defineProps<{ step: number, clicks: number }>()
const { prompt, checks } = STEPS[props.step]
</script>

<template>
  <PhaseTrack :step="step" :progress="(clicks + 1) / 4" />
  <h2>Do it</h2>
  <KeyPrompt :text="prompt" class="mt-6" />
  <SeeChecks :checks="checks" :shown="clicks" class="mt-8" />
</template>
