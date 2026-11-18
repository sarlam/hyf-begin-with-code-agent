<script setup lang="ts">
// Link to the student workbook (workbook/, built into <deck>/workbook/ by `npm run build`).
// Worked out at runtime so the address shown is right wherever the deck is hosted:
// a domain root, or /<repo>/ on GitHub Pages. Not served by `slidev` dev: use the built deck.
const url = new URL(`${import.meta.env.BASE_URL}workbook/`, window.location.origin).href
const label = url.replace(/^https?:\/\//, '')
</script>

<template>
  <a :href="url" target="_blank" class="workbook">📓 Your workbook, to follow along: <b>{{ label }}</b></a>
</template>

<style scoped>
.workbook {
  display: inline-block;
  padding: 0.4rem 1rem;
  border-radius: 999px;
  border: none !important;
  background: var(--hyf-yellow);
  color: var(--hyf-maroon) !important;
  font-size: 1.05rem;
}
</style>
