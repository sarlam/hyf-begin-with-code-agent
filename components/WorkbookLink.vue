<script setup lang="ts">
// Link to the student workbook. The built site puts the deck in slides/ and the workbook in workbook/
// next to it (see README), so the workbook is always one folder up from the deck, whatever the host.
// Not served by `slidev` dev: use the built site (`npm run build`).
const url = new URL('../workbook/', window.location.href).href
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
