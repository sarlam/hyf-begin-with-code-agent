<script setup lang="ts">
// "You should see": the first `shown` checks, one more per click. Hidden ones keep their space, so nothing jumps.
defineProps<{ checks: string[], shown: number }>()
</script>

<template>
  <div>
    <p class="label">You should see</p>
    <ul>
      <li v-for="(check, i) in checks" :key="check" :class="{ hidden: i >= shown }">{{ check }}</li>
    </ul>
  </div>
</template>

<style scoped>
.label {
  margin: 0 0 0.4rem;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  opacity: 0.7;
}
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
li {
  margin: 0.4rem 0;
  font-size: 1.25rem;
  transition: opacity 0.3s ease;
}
li::before {
  content: '✓ ';
  color: var(--hyf-red);
  font-weight: 700;
}
.hidden {
  opacity: 0;
}
</style>
