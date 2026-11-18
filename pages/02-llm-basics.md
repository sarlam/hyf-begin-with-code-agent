---
layout: section
---

# Part 1 · What is an LLM?

---
clicks: 4
---

## How a word becomes a vector

<WordsToVectors :step="$clicks" />

---
clicks: 1
---

## The vector view

<VectorSpace :step="$clicks" />

---
clicks: 2
---

## Guess the next word

<script setup>
const options = [
  { token: ' sofa', p: 50 },
  { token: ' bed', p: 25 },
  { token: ' roof', p: 15 },
  { token: ' keyboard', p: 10 },
]
</script>

<NextTokenDice :step="$clicks" prompt="The cat sleeps on the" :options="options" />

---
clicks: 5
---

## One word at a time

Pick a word, add it, guess again, until the best guess is "the end".

<script setup>
const path = [
  { pick: 0, options: [{ token: ' sofa', p: 50 }, { token: ' bed', p: 25 }, { token: ' roof', p: 15 }, { token: ' keyboard', p: 10 }] },
  { pick: 0, options: [{ token: ' all', p: 35 }, { token: '.', p: 30 }, { token: ' and', p: 25 }, { token: ' because', p: 10 }] },
  { pick: 0, options: [{ token: ' day', p: 70 }, { token: ' night', p: 20 }, { token: ' afternoon', p: 10 }] },
  { pick: 0, options: [{ token: '.', p: 80 }, { token: ' long', p: 15 }, { token: '!', p: 5 }] },
  { pick: 0, options: [{ token: '<end>', p: 90 }, { token: ' Then', p: 10 }] },
]
</script>

<NextTokenChain :step="$clicks" prompt="The cat sleeps on the" :path="path" />

---
clicks: 6
---

## Code is just text

Same trick, different text: this is how an LLM writes code.

<script setup>
const path = [
  { pick: 0, options: [{ token: ' a', p: 85 }, { token: ' b', p: 8 }, { token: ' 0', p: 4 }, { token: ' null', p: 3 }] },
  { pick: 0, options: [{ token: ' +', p: 90 }, { token: ' -', p: 6 }, { token: ' *', p: 4 }] },
  { pick: 0, options: [{ token: ' b', p: 95 }, { token: ' 1', p: 5 }] },
  { pick: 0, options: [{ token: ';', p: 85 }, { token: '\n', p: 15 }] },
  { pick: 0, options: [{ token: '\n}', p: 90 }, { token: '\n  //', p: 10 }] },
  { pick: 0, options: [{ token: '<end>', p: 95 }, { token: '\n', p: 5 }] },
]
</script>

<NextTokenChain :step="$clicks" :prompt="'function add(a, b) {\n  return'" :path="path" code />

---

## What this means for you

<div class="grid grid-cols-2 gap-5 mt-6">
<div v-click class="takeaway">
  <span class="icon">🎲</span>
  <div><h3>It guesses</h3><p>Ask twice, get two answers. Wrong answers sound just as sure.</p></div>
</div>
<div v-click class="takeaway">
  <span class="icon">👀</span>
  <div><h3>It only sees what you give it</h3><p>Better context in, better guesses out.</p></div>
</div>
<div v-click class="takeaway">
  <span class="icon">🔍</span>
  <div><h3>You are the reviewer</h3><p>Read what it wrote. Run it. Test it.</p></div>
</div>
<div v-click class="takeaway">
  <span class="icon">🧭</span>
  <div><h3>You steer</h3><p>A clear request, small steps, correct course early.</p></div>
</div>
</div>

<style>
.takeaway {
  display: flex;
  gap: 1.25rem;
  align-items: center;
  padding: 1.25rem 1.5rem;
  border-radius: 0.75rem;
  background: white;
  border-left: 0.4rem solid var(--hyf-red);
}
.takeaway .icon {
  font-size: 2.6rem;
}
.takeaway h3 {
  margin: 0;
  font-size: 1.4rem;
  line-height: 1.15;
}
.takeaway p {
  margin: 0.3rem 0 0;
  font-size: 1.05rem;
  opacity: 0.85;
}
</style>
