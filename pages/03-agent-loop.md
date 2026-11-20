---
layout: section
---

# Part 2 · The agent loop

---
clicks: 3
---

## An LLM alone only writes text

<ChatVsAgent :step="$clicks" request="Run the tests" reply="Sure! Type npm test in your terminal." command="npm test" output="✓ 1 passed" />

<!--
Tools are things like: read a file, edit a file, run a command, open a browser. Claude Code and opencode are harnesses. The "run: npm test" is still just text: the harness recognises the format and runs it.
-->

---
clicks: 19
---

## The agent loop

<script setup>
const tools = [
  { call: 'read sum.test.js', result: 'add(3, 2) should equal 5' },
  { call: 'read sum.js', result: 'return a - b' },
  { call: 'edit sum.js: a - b → a + b', result: 'file saved' },
  { call: 'run npm test', result: '✓ 1 passed' },
]
</script>

<AgentRun :step="$clicks" request="Make the failing test pass" :tools="tools" answer="Fixed: sum used minus instead of plus" />

<!--
Point at the "(end)" from Part 1: the LLM still only picks the next token. A tool call is just text in a format the harness understands; "no more tool calls" is the stop.
-->

---

## Tools, skills and MCP

<div class="grid grid-cols-3 gap-6 mt-8">
<div v-click class="card">

### 🛠 Tools

**The hands.** Built into the harness.

Read and edit files, run commands, search the code.

</div>
<div v-click class="card">

### 📖 Skills

**The recipes.** A folder with instructions (`SKILL.md`), read only when the task needs it.

*"How we write tests in this project."*

</div>
<div v-click class="card">

### 🔌 MCP

**The plugs.** A standard way to add tools from another program.

*Playwright: drive a browser.*

*Context7: up-to-date library docs.*

</div>
</div>

<style>
.card {
  padding: 1rem 1.25rem;
  border-radius: 0.75rem;
  background: white;
}
</style>

---

## Where you steer

<div class="grid grid-cols-[1.2fr_1fr] gap-6 items-center">

<LoopDiagram steer />

<v-clicks>

1. **Your request.** One clear goal, one small step. Ask for a plan first: <kbd>Shift</kbd>+<kbd>Tab</kbd> to plan mode.
2. **The rules file.** `CLAUDE.md` / `AGENTS.md`, read at every start. `/init` writes a first one.
3. **Approve or refuse** each tool call, when approvals are on (Part 3 shows how).
4. **Interrupt** any time with <kbd>Esc</kbd>, then say what to do instead.
5. **Review the answer.** Read the change, run it. Undo with `/rewind` (Claude Code) or `/undo` (opencode).

</v-clicks>

</div>
