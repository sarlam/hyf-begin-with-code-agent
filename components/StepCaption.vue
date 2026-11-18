<script setup lang="ts">
// "Step n / total" badge plus the current step's sentence, cross-fading on each click.
defineProps<{ step: number, steps: string[] }>()
</script>

<template>
  <p class="caption">
    <span class="badge">Step {{ step + 1 }} / {{ steps.length }}</span>
    <Transition name="fade" mode="out-in">
      <span :key="step">{{ steps[step] }}</span>
    </Transition>
  </p>
</template>

<style scoped>
.caption {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.25rem;
  min-height: 2rem;
}
.badge {
  flex-shrink: 0;
  font-size: 0.8rem;
  padding: 0.1rem 0.6rem;
  border-radius: 999px;
  border: 1px solid currentColor;
  opacity: 0.7;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
