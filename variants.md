---
theme: seriph
title: Hands-on layouts, a preview
# Preview deck for issue #5: three layouts for the hands-on steps, each on step 1 and step 4. Not published.
colorSchema: light
routerMode: hash
fonts:
  sans: Barlow
  serif: Barlow
  weights: '400,500,700'
themeConfig:
  primary: '#b12900'
---

# Three layouts for the hands-on steps

<p class="subtitle">Each layout on step 1 and step 4. Press ↓ to go on.</p>

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

