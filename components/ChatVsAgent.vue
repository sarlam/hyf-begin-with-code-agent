<script setup lang="ts">
// The same request sent to a chat and to an agent, one beat per click:
// 0 both get the request, 1 the chat answers with text and nothing runs,
// 2 the agent's LLM also writes text (a tool request), 3 the harness runs it and the terminal prints.
defineProps<{
  step: number
  request: string
  reply: string // the chat's answer: words only
  command: string // what the agent's LLM asks to run
  output: string
}>()
</script>

<template>
  <div>
    <div class="grid grid-cols-2 gap-8 mt-4">
      <div class="card">
        <h3>💬 A chat <small>the LLM alone</small></h3>
        <p class="bubble you">{{ request }}</p>
        <p class="bubble llm" :class="{ shown: step >= 1 }">🧠 {{ reply }}</p>
        <p class="link" :class="{ shown: step >= 1 }">✗ no harness: the text stays text</p>
        <pre class="terminal" :class="{ idle: step >= 1 }"><span>$ <span class="cursor">▁</span></span><span class="note" :class="{ shown: step >= 1 }">nothing ran</span></pre>
      </div>

      <div class="card">
        <h3>🤖 An agent <small>the LLM + a harness</small></h3>
        <p class="bubble you">{{ request }}</p>
        <p class="bubble llm" :class="{ shown: step >= 2 }">🧠 <code>run: {{ command }}</code></p>
        <p class="link on" :class="{ shown: step >= 3 }">⚙️ the harness runs it</p>
        <pre class="terminal"><span>$ <span class="typed" :class="{ shown: step >= 3 }">{{ command }}</span></span><span class="result" :class="{ shown: step >= 3 }">{{ output }}</span></pre>
      </div>
    </div>

    <p class="punchline" :class="{ shown: step >= 3 }">
      An LLM only writes text. The <b>harness</b> turns that text into actions.
    </p>
  </div>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  padding: 1rem 1.25rem;
  border-radius: 0.75rem;
  background: white;
}
.card h3 {
  margin: 0 0 0.25rem;
  font-size: 1.3rem;
}
.card h3 small {
  margin-left: 0.4rem;
  font-size: 0.85rem;
  font-weight: 400;
  opacity: 0.6;
}
.card p {
  margin: 0;
}

/* Hidden steps keep their place, so nothing jumps when they appear. */
.bubble,
.link,
.note,
.typed,
.result,
.punchline {
  transition: opacity 0.35s ease, transform 0.35s ease;
}
:is(.bubble.llm, .link, .note, .typed, .result, .punchline):not(.shown) {
  opacity: 0;
  transform: translateY(-0.3rem);
}

.bubble {
  max-width: 85%;
  padding: 0.4rem 0.8rem;
  border-radius: 1rem;
}
.bubble.you {
  align-self: flex-end;
  background: var(--hyf-yellow);
  border-bottom-right-radius: 0.2rem;
}
.bubble.llm {
  align-self: flex-start;
  background: var(--hyf-tint);
  border-bottom-left-radius: 0.2rem;
}
.link {
  font-size: 0.95rem;
  opacity: 0.6;
}
.link.on.shown {
  color: var(--hyf-accent);
  font-weight: bold;
  opacity: 1;
}

.terminal {
  display: flex;
  flex-direction: column;
  min-height: 4.5rem;
  margin: 0;
  padding: 0.6rem 0.9rem;
  border-radius: 0.5rem;
  background: var(--hyf-maroon);
  color: var(--hyf-cream);
  font-family: var(--slidev-code-font-family, monospace);
  font-size: 1rem;
  transition: opacity 0.35s ease;
}
.terminal.idle {
  opacity: 0.45;
}
.terminal .result {
  color: var(--hyf-yellow);
  transition-delay: 0.7s; /* the command runs for a moment before it prints */
}
.terminal .note {
  font-family: var(--slidev-font-family, sans-serif);
  font-style: italic;
}
.cursor {
  animation: blink 1s steps(1) infinite;
}
@keyframes blink {
  50% {
    opacity: 0;
  }
}

.punchline {
  margin-top: 1.25rem;
  text-align: center;
  font-size: 1.4rem;
}
</style>
