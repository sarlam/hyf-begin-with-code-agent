<script setup lang="ts">
// A step's Goal headline and its Why line. Sized by the parent's font size (everything is in em).
defineProps<{ goal: string, why: string }>()
</script>

<template>
  <div>
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
