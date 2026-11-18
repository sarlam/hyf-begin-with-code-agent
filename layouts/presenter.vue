<script setup lang="ts">
// Paul's presenter slide: the ONLY slide in Paul's own brand, not the HackYourFuture look.
// Brand rules come from Paul's design system (brand/charte.md), via orch-design:
// plain `ground` surface, wordmark top left with one logo-height of clear space,
// Archivo Narrow for labels, Literata for the bio, teal underlined links joined by a middle dot.
// The slide's markdown body is the bio; the rest comes from its frontmatter.
defineProps<{
  website?: string // full URL, shown without the protocol
  linkedin?: string // full URL; empty shows a visible placeholder
  photo?: string // path under public/, no leading slash; empty shows a placeholder box
}>()

const base = import.meta.env.BASE_URL // the deck may live under /<repo>/ on GitHub Pages
const shortUrl = (url: string) => url.replace(/^https?:\/\//, '').replace(/\/$/, '')
</script>

<template>
  <div class="slidev-layout presenter">
    <img class="logo" src="/logos/paul-jarleton-wordmark-light.svg" alt="Paul Jarleton · think ahead">

    <div class="about">
      <div class="rule" />
      <p class="label">Your host for today</p>
      <div class="bio">
        <slot />
      </div>
      <p class="links">
        <a v-if="website" :href="website" target="_blank">{{ shortUrl(website) }}</a>
        <span class="dot"> · </span>
        <a v-if="linkedin" :href="linkedin" target="_blank">LinkedIn</a>
        <span v-else class="missing">[LinkedIn URL]</span>
      </p>
    </div>

    <img v-if="photo" class="photo" :src="base + photo" alt="Paul Jarleton">
    <div v-else class="photo placeholder">photo</div>
  </div>
</template>

<style>
/* Self-hosted, as the brand requires (no CDN). OFL licences sit next to the files in public/fonts/paul/. */
@font-face {
  font-family: 'Archivo Narrow';
  src: url('/fonts/paul/ArchivoNarrow-Medium.woff2') format('woff2');
  font-weight: 500;
}
@font-face {
  font-family: 'Archivo Narrow';
  src: url('/fonts/paul/ArchivoNarrow-Bold.woff2') format('woff2');
  font-weight: 700;
}
@font-face {
  font-family: Literata;
  src: url('/fonts/paul/Literata-Variable.woff2') format('woff2');
  font-weight: 200 900;
}
</style>

<style scoped>
/* Brand tokens (Paul's design system), local to this layout on purpose. */
.presenter {
  --ground: #101c1c;
  --on-ground: #f5f4ee;
  --on-ground-2: #c9d1ce;
  --on-ground-muted: #8fa09c;
  --teal: #00a89e;
  --cyan: #00ffff;
  --ground-rule: #2a3a3a;
  --logo-h: 55px;

  position: relative;
  height: 100%;
  padding: 0;
  background: var(--ground) !important; /* beats the HackYourFuture background in style.css */
  color: var(--on-ground);
}
.logo {
  position: absolute;
  top: var(--logo-h);
  left: var(--logo-h);
  height: var(--logo-h);
}
.about {
  position: absolute;
  left: var(--logo-h);
  top: calc(var(--logo-h) * 3);
  width: 560px;
}
.rule {
  width: 48px;
  height: 2px;
  margin-bottom: 16px;
  background: var(--cyan);
}
.label {
  margin: 0 0 16px;
  font-family: 'Archivo Narrow', 'Arial Narrow', sans-serif;
  font-weight: 500;
  font-size: 13px;
  line-height: 16px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--on-ground-muted);
}
.bio :deep(p) {
  margin: 0;
  font-family: Literata, Georgia, serif;
  font-weight: 400;
  font-size: 24px;
  line-height: 36px;
  color: var(--on-ground-2);
}
.links {
  margin: 24px 0 0;
  font-family: 'Archivo Narrow', 'Arial Narrow', sans-serif;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
}
.links a,
.missing {
  color: var(--teal);
  text-decoration: underline;
  text-underline-offset: 4px;
  border: none;
}
.dot {
  color: var(--on-ground-muted);
}
.photo {
  position: absolute;
  right: var(--logo-h);
  top: 50%;
  transform: translateY(-50%);
  width: 220px;
  height: 220px;
  border-radius: 5px;
  object-fit: cover;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.35);
}
.placeholder {
  display: grid;
  place-items: center;
  border: 1px dashed var(--ground-rule);
  font-family: 'Archivo Narrow', 'Arial Narrow', sans-serif;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--on-ground-muted);
}
</style>
