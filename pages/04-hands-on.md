---
layout: section
---

# Part 3 · Hands-on

---

## What we build: a todo app

<script setup>
const base = import.meta.env.BASE_URL // the deck may live under /<repo>/ on GitHub Pages
</script>

<div class="grid grid-cols-[1fr_1.1fr] gap-8 items-start">
<div>

The classic first app, built **by you, through an agent**.

- add a todo
- tick it done
- delete it
- "*n* items left"
- still there after a reload

**Only three files:** `index.html`, `app.js`, `style.css`. No libraries, no build.

</div>

<iframe :src="`${base}todo/index.html`" title="Finished todo app" class="w-full h-90 rounded-lg border border-gray-400/40"></iframe>

</div>

<!--
The iframe is the reference solution in public/todo/: you can try it live. Clear its saved todos from the browser dev tools between sessions if needed.
-->

---

<StepGoal :step="0" />
<WorkbookLink class="mt-10" />

---
clicks: 3
---

<StepDoIt :step="0" :clicks="$clicks" />

<!--
Step 0 in the workbook: Node 20+, install and sign in, an empty todo folder; approvals on; the Playwright MCP, restart, check it is connected.
Windows without WSL: Claude Code has `irm https://claude.ai/install.ps1 | iex`. Checked against both docs on 2026-11-18; opencode moved to a v2 installer, so re-check right before class.
Approvals, checked 2026-11-18: Claude Code starts in auto mode by default since v2.1.283 ("default" is called Manual in its UI). opencode allows everything by default; the rule format and the action names edit/shell come from its permissions page, but the docs do not say where the project file lives: try it once before class.
Playwright MCP needs Chrome on the machine, and opens a visible browser window by default, so students see every click.
-->

---
hide: true
---

<!-- Kept for later: Paul picked Playwright for the hands-on on 2026-11-18. Remove `hide: true` to show it again. -->

## Add an MCP · option B: Context7

The agent gets **up-to-date docs** for libraries and web APIs, instead of what it remembers.

<BothAgents
  claude="claude mcp add --transport http context7 https://mcp.context7.com/mcp"
  opencode="opencode mcp add context7 --url https://mcp.context7.com/mcp"
/>

Restart the agent, then check it is connected:

<BothAgents claude="/mcp" opencode="opencode mcp list" />

Try it:

> How do I save data in the browser with localStorage? use context7

<!--
Works without a key but rate-limited; a free key from context7.com raises the limit. opencode may start an OAuth sign-in for remote servers: check before class.
-->

---

<StepGoal :step="1" />

---
clicks: 3
---

<StepDoIt :step="1" :clicks="$clicks" />

---

<StepGoal :step="2" />

---
clicks: 3
---

<StepDoIt :step="2" :clicks="$clicks" />

<!--
Two prompts in the workbook: "Do step N of the plan only", and the Playwright check: open index.html, add two todos, tick one, reload, tell me what you see.
-->

---

<StepGoal :step="3" />

---
clicks: 3
---

<StepDoIt :step="3" :clicks="$clicks" />

<!--
When it says it is done: check it yourself. "Done" is a prediction too.
-->

---

<StepGoal :step="4" />

---
clicks: 3
---

<StepDoIt :step="4" :clicks="$clicks" />

<!--
The full prompt pins Chrome (channel "chrome", no browser download) and slowMo 500 ms. After "1 passed", break it on purpose: change "1 item left" to "2 items left" and run again. A test that cannot fail checks nothing.
Playwright MCP drives a live browser while chatting; Playwright Test is a test runner that replays a scenario. Not dry-run yet: check the install and channel "chrome" on a clean machine before class.
-->

---

<StepGoal :step="5" />
<p class="mt-10 text-xl">⚠️ <b>opencode has no safety check in auto mode</b>: it runs whatever it decides.</p>

<!--
Switch to auto: Claude Code, Shift+Tab until the mode reads auto (or restart with `claude --permission-mode auto`); opencode, delete opencode.jsonc and restart.
It follows your instructions: if they never say "when in doubt, stop and ask me", it will not ask. That is how engineers use agents today: write the request like a ticket, let it run, review the result.
Claude Code's auto mode still blocks risky actions with a safety check. opencode has none: it runs whatever it decides.
-->

---

<PhaseTrack :step="5" :progress="($clicks + 1) / 4" class="!mb-2" />

## Write it like a ticket

<div class="grid grid-cols-[1fr_2.4fr] gap-6 items-start">
<div>

**❌ Too vague**

> Add subtasks to the todos.

<p v-click="1" class="text-sm">It will guess the layout, the rules, and when it is done. Every guess is a dice roll.</p>

</div>
<div v-click="2" class="ticket">

**✅ Specific**

> **Goal:** each todo can have subtasks.
>
> **Behaviour:**
> - A "+ subtask" button on a todo shows a small text field; <kbd>Enter</kbd> adds the subtask under that todo.
> - Subtasks can be ticked and deleted, like todos.
> - When every subtask of a todo is ticked, the todo is ticked too.
> - "items left" still counts todos only.
>
> **Rules:** the app stays index.html, app.js and style.css, with no libraries. Existing todos keep working and look the same. If anything here is unclear, stop and ask me before you start.
>
> **Done when:** you opened index.html in the browser, added a todo with two subtasks, ticked both, reloaded, and the todo is ticked with both subtasks still there. The test from step 4 still passes. Tell me what you checked.

</div>
</div>

<p v-click="3" class="mt-3">When it says done: <b>check the "Done when" yourself</b>, then ask <i>"What did you change, and why?"</i></p>

<style>
.ticket blockquote {
  font-size: 0.8rem;
  line-height: 1.35;
}
.ticket blockquote p,
.ticket blockquote ul {
  margin: 0.35rem 0;
}
</style>

<!--
The step 4 test is the safety net: whatever auto mode changes, it must still pass. Point at "stop and ask me" in the Rules: it is the instruction that makes the agent ask.
-->

---

## What to remember

<v-clicks>

- An LLM **predicts the next token**. It does not know, and it can be wrong while sounding sure.
- An agent is that LLM **in a loop with tools**, run by a harness.
- **You steer**: the request, the rules file, approving, interrupting, reviewing.
- In auto mode **your prompt is the spec**: goal, behaviour, rules, and when it is done.

</v-clicks>

<div v-click class="mt-8">

**Try next on your own:** a filter (All / Active / Done), edit a todo with a double-click, or ask the agent to write a test for "items left".

</div>
