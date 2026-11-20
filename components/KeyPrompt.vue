<script setup lang="ts">
// The prompt's key line, as a card. The full prompt lives in the workbook.
defineProps<{ text: string }>()
</script>

<template>
  <div>
    <p class="card">{{ text }}</p>
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
.note {
  margin-top: 0.5rem;
  font-size: 0.9rem;
  opacity: 0.75;
}
</style>
