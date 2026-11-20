---
theme: seriph
title: Hands-on layouts, a preview
# Preview deck for issue #5: three layouts for the hands-on steps, each on step 1 and step 4. Not published.
colorSchema: light
routerMode: hash
fonts:
  sans: Barlow
  serif: Barlow
  mono: Fira Code
  weights: '400,500,700'
themeConfig:
  primary: '#b12900'
---

# Three layouts for the hands-on steps

<p class="subtitle">A · Mission card, B · Journey rail, C · Two-beat, each on step 1 and step 4. Press ↓ to go on.</p>

<style>
.subtitle {
  color: var(--hyf-yellow);
  font-size: 1.4rem;
  opacity: 1 !important;
}
</style>

---
layout: section
---

# A · Mission card

---

<script setup>
import { PLAN } from './variants/steps'
</script>

<PhaseTrack :current="PLAN.phase" />
<GoalWhy :goal="PLAN.goal" :why="PLAN.why" class="mt-24 text-6xl" />

---
clicks: 3
---

<script setup>
import { PLAN } from './variants/steps'
</script>

<PhaseTrack :current="PLAN.phase" :progress="($clicks + 1) / 4" />

## Do it

<KeyPrompt :text="PLAN.prompt" class="mt-6" />
<SeeChecks :checks="PLAN.checks" :shown="$clicks" class="mt-8" />

---

<script setup>
import { TEST } from './variants/steps'
</script>

<PhaseTrack :current="TEST.phase" />
<GoalWhy :goal="TEST.goal" :why="TEST.why" class="mt-24 text-6xl" />

---
clicks: 3
---

<script setup>
import { TEST } from './variants/steps'
</script>

<PhaseTrack :current="TEST.phase" :progress="($clicks + 1) / 4" />

## Do it

<KeyPrompt :text="TEST.prompt" class="mt-6" />
<SeeChecks :checks="TEST.checks" :shown="$clicks" class="mt-8" />

---
layout: section
---

# B · Journey rail

---
clicks: 4
---

<script setup>
import { PLAN } from './variants/steps'
</script>

<div class="grid grid-cols-[13rem_1fr] gap-12 h-full items-center">
  <PhaseTrack vertical :current="PLAN.phase" :title="PLAN.title" />
  <GoalWhy v-if="$clicks === 0" :goal="PLAN.goal" :why="PLAN.why" class="text-5xl" />
  <div v-else>
    <p class="opacity-70"><b>Goal:</b> {{ PLAN.goal }}</p>
    <KeyPrompt :text="PLAN.prompt" class="mt-4" />
    <SeeChecks :checks="PLAN.checks" :shown="$clicks - 1" class="mt-8" />
  </div>
</div>

---
clicks: 4
---

<script setup>
import { TEST } from './variants/steps'
</script>

<div class="grid grid-cols-[13rem_1fr] gap-12 h-full items-center">
  <PhaseTrack vertical :current="TEST.phase" :title="TEST.title" />
  <GoalWhy v-if="$clicks === 0" :goal="TEST.goal" :why="TEST.why" class="text-5xl" />
  <div v-else>
    <p class="opacity-70"><b>Goal:</b> {{ TEST.goal }}</p>
    <KeyPrompt :text="TEST.prompt" class="mt-4" />
    <SeeChecks :checks="TEST.checks" :shown="$clicks - 1" class="mt-8" />
  </div>
</div>

---
layout: section
---

# C · Two-beat

---
layout: full
---

<script setup>
import { PLAN } from './variants/steps'
import { PHASES } from './components/PhaseTrack.vue'
</script>

<div class="absolute inset-0 flex flex-col justify-center px-20" :style="{ background: PHASES[PLAN.phase].bg, color: PHASES[PLAN.phase].fg }">
  <p class="text-xl font-bold">{{ PLAN.title }}</p>
  <GoalWhy :goal="PLAN.goal" :why="PLAN.why" class="mt-6 text-6xl" />
  <HyfLogo class="absolute bottom-4 left-6 w-28 opacity-80" />
</div>

---
clicks: 3
---

<script setup>
import { PLAN } from './variants/steps'
</script>

<KeyPrompt typed :text="PLAN.prompt" class="mt-16" />
<SeeChecks :checks="PLAN.checks" :shown="$clicks" class="mt-10" />

---
layout: full
---

<script setup>
import { TEST } from './variants/steps'
import { PHASES } from './components/PhaseTrack.vue'
</script>

<div class="absolute inset-0 flex flex-col justify-center px-20" :style="{ background: PHASES[TEST.phase].bg, color: PHASES[TEST.phase].fg }">
  <p class="text-xl font-bold">{{ TEST.title }}</p>
  <GoalWhy :goal="TEST.goal" :why="TEST.why" class="mt-6 text-6xl" />
  <HyfLogo class="absolute bottom-4 left-6 w-28 opacity-80" />
</div>

---
clicks: 3
---

<script setup>
import { TEST } from './variants/steps'
</script>

<KeyPrompt typed :text="TEST.prompt" class="mt-16" />
<SeeChecks :checks="TEST.checks" :shown="$clicks" class="mt-10" />
