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

## Before we start

<WorkbookLink />

1. **Node.js 20 or newer**: `node --version` (MCP servers run with `npx`)
2. **An agent**, installed and signed in:

<BothAgents
  claude="curl -fsSL https://claude.ai/install.sh | bash
claude --version"
  opencode="curl -fsSL https://opencode.ai/v2/install | bash
then /connect inside opencode to pick a model"
/>

3. **An empty folder**, and the agent started in it:

<BothAgents
  claude="mkdir todo && cd todo
claude"
  opencode="mkdir todo && cd todo
opencode"
/>

<!--
Windows without WSL: Claude Code has `irm https://claude.ai/install.ps1 | iex`. Checked against both docs on 2026-11-18; opencode moved to a v2 installer, so re-check right before class.
-->

---

## Approvals on, for now

Out of the box, both agents act **without asking you**. For steps 1 to 4 we want to see, and approve, every edit and command.

<BothAgents
  claude="claude --permission-mode default"
  opencode='Create opencode.jsonc in the todo folder:
{
  "$schema": "https://opencode.ai/config.json",
  "permissions": [
    { "action": "edit", "resource": "*", "effect": "ask" },
    { "action": "shell", "resource": "*", "effect": "ask" }
  ]
}
then start opencode'
/>

It now stops before each change: **read what it wants to do**, then say yes or no.

<!--
Checked 2026-11-18: Claude Code starts in auto mode by default since v2.1.283 ("default" is called Manual in its UI). opencode allows everything by default; the rule format and the action names edit/shell come from its permissions page, but the docs do not say where the project file lives: try it once before class.
-->

---

## Add an MCP: Playwright

The agent gets a **browser**: it can open your page, click, type and read what it sees.

<BothAgents
  claude="claude mcp add playwright -- npx @playwright/mcp@latest"
  opencode="opencode mcp add playwright -- npx @playwright/mcp@latest"
/>

Restart the agent, then check it is connected:

<BothAgents claude="/mcp" opencode="opencode mcp list" />

Try it:

> Open https://example.com in the browser and tell me the page title.

<!--
Needs Chrome on the machine. Playwright MCP opens a visible browser window by default, so students see every click.
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

## Step 1 · Plan first, no code yet

Switch to **plan mode**: <kbd>Shift</kbd>+<kbd>Tab</kbd> (both agents), then:

> We are building a minimal todo app with only three files: index.html, app.js and style.css. No libraries, no build step. Features: add a todo, mark it done, delete it, show how many are left, and keep the todos after a page reload. Make a plan in small steps. Do not write code yet.

<v-clicks>

- **Read the plan.** Anything you did not ask for? Anything missing?
- **Change it in plain words**: *"Drop step 5, we don't need dark mode."*
- Happy with it? Leave plan mode and go to step 2.

</v-clicks>

---

## Step 2 · Build in small steps

<v-clicks>

- > Do step 1 of the plan only.
- **Read what changed.** Ask *"Explain what you just wrote"* if a line is unclear.
- **Run it**: open `index.html` in your browser, or let the agent check it with Playwright:
  > Open index.html in the browser, add two todos, tick one, reload, and tell me what you see.
- Works? **Next step.** Doesn't? Say what you see, not how to fix it.

</v-clicks>

---

## Step 3 · Steer

<v-clicks>

- **It goes the wrong way?** <kbd>Esc</kbd>, then say what you want instead.
- **It broke something?** Undo: `/rewind` (Claude Code), `/undo` (opencode).
- **It keeps doing the same mistake?** Write a rule in the rules file:
  > *Never add a library. Keep the app to index.html, app.js and style.css.*
- **It says it is done?** Check it yourself. "Done" is a prediction too.

</v-clicks>

---

## Step 4 · A test you can watch

So far *you* checked the app. Now the agent writes a **test**: a small program that checks it for you, every time.

> Write one Playwright test for the todo app in tests/todo.spec.js. It opens index.html, adds two todos, "Buy milk" and "Learn agents", ticks "Buy milk", and checks that "Buy milk" shows as done and that the counter says "1 item left". Set up Playwright Test to use the Chrome already installed on this machine (channel "chrome"), do not download other browsers. Then run the test with the browser visible and slowed down (slowMo 500 ms) so I can watch it.

<v-clicks>

- **Approve the install** (`npm install` of Playwright Test): you are letting it add a tool to your project. The app itself stays three files.
- **Watch the browser** type, click and tick on its own, then read the result: **1 passed**.
- **Break it on purpose**: change "1 item left" to "2 items left" in the test and ask it to run again. A test that cannot fail checks nothing.

</v-clicks>

<!--
Playwright MCP drives a live browser while chatting; Playwright Test is a test runner that replays a scenario. Not dry-run yet: check the install and channel "chrome" on a clean machine before class.
-->

---

## Step 5 · Subtasks, in auto mode

Now the agent works **without asking your permission**: it reads, edits, runs and checks until it thinks it is done.

<BothAgents
  claude="Shift+Tab until the mode reads auto
(or restart: claude --permission-mode auto)"
  opencode="Delete opencode.jsonc, then restart opencode"
/>

<v-clicks>

- It **follows your instructions**. If they never say *"when in doubt, stop and ask me"*, it will not ask: it picks an answer and keeps going.
- So put everything it needs in **your first message**, including when it should stop and ask.
- That is how engineers use agents today: **write the request like a ticket**, let it run, **review the result**.
- Claude Code's auto mode still blocks risky actions with a safety check. opencode has none: it runs whatever it decides.

</v-clicks>

---

## Step 5 · Write it like a ticket

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
