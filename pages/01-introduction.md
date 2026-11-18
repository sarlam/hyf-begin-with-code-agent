---
layout: presenter
website: https://jarleton.dev
linkedin: https://www.linkedin.com/in/paul-jarleton/
photo: img/paul.jpg # under public/, without a leading slash so it follows the deck's base path
---

For more than 20 years I have written code, mostly building the roads other developers drive on: at Spotify, TomTom and beyond.

---

## Let's take a first step in steering and controlling coding agents

<div class="grid grid-cols-3 gap-6 mt-10">
<div v-click class="part">

<span class="num">1</span>

### What is an LLM?

How a machine turns words into numbers, then guesses the next word, one at a time.

</div>
<div v-click class="part">

<span class="num">2</span>

### The agent loop

How an LLM becomes an agent: tools, a loop, and the places where you steer.

</div>
<div v-click class="part">

<span class="num">3</span>

### Hands-on

You build a todo app with an agent, test it with Playwright, then let it run on its own.

</div>
</div>

<p v-click class="mt-8 opacity-70">Questions are welcome at any time.</p>

<style>
.part {
  padding: 1.25rem 1.5rem 1.5rem;
  border-radius: 0.75rem;
  background: white;
  border-top: 0.4rem solid var(--hyf-red);
}
.part .num {
  font-size: 3rem;
  font-weight: 700;
  line-height: 1;
  color: var(--hyf-red);
}
.part h3 {
  margin-top: 0.5rem;
  font-size: 1.4rem;
}
.part p {
  font-size: 1rem;
  line-height: 1.45;
}
</style>
