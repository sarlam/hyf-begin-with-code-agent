<script setup lang="ts">
// Slidev global layer (global-top: drawn above the slide; global-bottom would sit under our opaque background): a small HackYourFuture wordmark on every slide except the cover,
// which carries the full-size logos, and the presenter slide, which is in Paul's own brand. Cream on the maroon part titles, maroon elsewhere.
</script>

<template>
  <HyfLogo
    v-if="!['cover', 'presenter'].includes($nav.currentLayout)"
    class="absolute bottom-4 left-6 w-28"
    :class="$nav.currentLayout === 'section' ? 'text-[#faf5d9] opacity-80' : 'text-[#5e1600] opacity-50'"
  />
</template>
