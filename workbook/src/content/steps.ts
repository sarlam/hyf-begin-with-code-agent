// The hands-on steps, mirrored from the deck's pages/04-hands-on.md (hidden slides skipped).
// When the slides change, change the matching step here: words, prompts and commands stay identical.
import type { Block, Step } from './types.ts'

/** The same thing to type, once per agent (the deck's <BothAgents> tag). */
const both = (claude: string, opencode: string): Block[] => [
  { kind: 'code', text: claude, only: 'claude' },
  { kind: 'code', text: opencode, only: 'opencode' },
]

export const STEPS: Step[] = [
  {
    id: 'what-we-build',
    title: 'What we build: a todo app',
    short: 'Goal',
    blocks: [
      { kind: 'text', md: 'The classic first app, built **by you, through an agent**.' },
      {
        kind: 'list',
        items: ['add a todo', 'tick it done', 'delete it', '"*n* items left"', 'still there after a reload'],
      },
      {
        kind: 'text',
        md: '**Only three files:** `index.html`, `app.js`, `style.css`. No libraries, no build.',
      },
    ],
    checklist: [
      'I picked my agent at the top of this page',
      'I know the five things the app must do',
    ],
  },
  {
    id: 'before-we-start',
    title: 'Before we start',
    short: 'Setup',
    blocks: [
      { kind: 'text', md: '1. **Node.js 20 or newer** (MCP servers run with `npx`):' },
      { kind: 'code', text: 'node --version' },
      { kind: 'text', md: '2. **An agent**, installed and signed in:' },
      ...both(
        'curl -fsSL https://claude.ai/install.sh | bash\nclaude --version',
        'curl -fsSL https://opencode.ai/v2/install | bash',
      ),
      { kind: 'text', md: 'then `/connect` inside opencode to pick a model', only: 'opencode' },
      { kind: 'text', md: '3. **An empty folder**, and the agent started in it:' },
      ...both('mkdir todo && cd todo\nclaude', 'mkdir todo && cd todo\nopencode'),
    ],
    checklist: [
      '`node --version` shows v20 or newer',
      'My agent is installed and signed in',
      'My agent runs in a new, empty `todo` folder',
    ],
  },
  {
    id: 'approvals',
    title: 'Approvals on, for now',
    short: 'Approvals',
    blocks: [
      {
        kind: 'text',
        md: 'Out of the box, both agents act **without asking you**. For steps 1 to 4 we want to see, and approve, every edit and command.',
      },
      { kind: 'code', text: 'claude --permission-mode default', only: 'claude' },
      { kind: 'text', md: 'Create `opencode.jsonc` in the todo folder:', only: 'opencode' },
      {
        kind: 'code',
        only: 'opencode',
        text: `{
  "$schema": "https://opencode.ai/config.json",
  "permissions": [
    { "action": "edit", "resource": "*", "effect": "ask" },
    { "action": "shell", "resource": "*", "effect": "ask" }
  ]
}`,
      },
      { kind: 'text', md: 'then start opencode', only: 'opencode' },
      { kind: 'text', md: 'It now stops before each change: **read what it wants to do**, then say yes or no.' },
    ],
    checklist: [
      'My agent runs with approvals on',
      'I will read each change before I say yes or no',
    ],
  },
  {
    id: 'playwright-mcp',
    title: 'Add an MCP: Playwright',
    short: 'MCP',
    blocks: [
      { kind: 'text', md: 'The agent gets a **browser**: it can open your page, click, type and read what it sees.' },
      ...both(
        'claude mcp add playwright -- npx @playwright/mcp@latest',
        'opencode mcp add playwright -- npx @playwright/mcp@latest',
      ),
      { kind: 'text', md: 'Restart the agent, then check it is connected:' },
      ...both('/mcp', 'opencode mcp list'),
      { kind: 'text', md: 'Try it:' },
      { kind: 'prompt', text: 'Open https://example.com in the browser and tell me the page title.' },
    ],
    checklist: [
      'I added the Playwright MCP',
      'I restarted the agent and saw playwright connected',
      'The agent told me the title of example.com',
    ],
  },
  {
    id: 'plan-first',
    title: 'Step 1 · Plan first, no code yet',
    short: 'Plan',
    blocks: [
      { kind: 'text', md: 'Switch to **plan mode**: <kbd>Shift</kbd>+<kbd>Tab</kbd> (both agents), then:' },
      {
        kind: 'prompt',
        text: 'We are building a minimal todo app with only three files: index.html, app.js and style.css. No libraries, no build step. Features: add a todo, mark it done, delete it, show how many are left, and keep the todos after a page reload. Make a plan in small steps. Do not write code yet.',
      },
      {
        kind: 'list',
        items: [
          '**Read the plan.** Anything you did not ask for? Anything missing?',
          '**Change it in plain words**: *"Drop step 5, we don\'t need dark mode."*',
          'Happy with it? Leave plan mode and go to step 2.',
        ],
      },
    ],
    checklist: [
      'I switched to plan mode',
      'I sent the plan prompt',
      'I read the plan and changed what I did not want',
      'I left plan mode',
    ],
  },
  {
    id: 'build-small-steps',
    title: 'Step 2 · Build in small steps',
    short: 'Build',
    blocks: [
      { kind: 'prompt', text: 'Do step 1 of the plan only.' },
      { kind: 'text', md: '**Read what changed.** Ask *"Explain what you just wrote"* if a line is unclear.' },
      { kind: 'text', md: '**Run it**: open `index.html` in your browser, or let the agent check it with Playwright:' },
      {
        kind: 'prompt',
        text: 'Open index.html in the browser, add two todos, tick one, reload, and tell me what you see.',
      },
      { kind: 'text', md: 'Works? **Next step.** Doesn\'t? Say what you see, not how to fix it.' },
    ],
    checklist: [
      'I asked for one step of the plan only',
      'I read what changed',
      'I ran it, in my browser or with Playwright',
      'I went through every step of the plan this way',
    ],
  },
  {
    id: 'steer',
    title: 'Step 3 · Steer',
    short: 'Steer',
    blocks: [
      { kind: 'text', md: '**It goes the wrong way?** <kbd>Esc</kbd>, then say what you want instead.' },
      { kind: 'text', md: '**It broke something?** Undo:' },
      ...both('/rewind', '/undo'),
      { kind: 'text', md: '**It keeps doing the same mistake?** Write a rule in the rules file:' },
      { kind: 'prompt', text: 'Never add a library. Keep the app to index.html, app.js and style.css.' },
      { kind: 'text', md: '**It says it is done?** Check it yourself. "Done" is a prediction too.' },
    ],
    checklist: [
      'I stopped it once with <kbd>Esc</kbd> and said what I wanted instead',
      'I tried undo',
      'I wrote a rule in the rules file',
      'I checked "done" myself',
    ],
  },
  {
    id: 'test-you-can-watch',
    title: 'Step 4 · A test you can watch',
    short: 'Test',
    blocks: [
      {
        kind: 'text',
        md: 'So far *you* checked the app. Now the agent writes a **test**: a small program that checks it for you, every time.',
      },
      {
        kind: 'prompt',
        text: 'Write one Playwright test for the todo app in tests/todo.spec.js. It opens index.html, adds two todos, "Buy milk" and "Learn agents", ticks "Buy milk", and checks that "Buy milk" shows as done and that the counter says "1 item left". Set up Playwright Test to use the Chrome already installed on this machine (channel "chrome"), do not download other browsers. Then run the test with the browser visible and slowed down (slowMo 500 ms) so I can watch it.',
      },
      {
        kind: 'list',
        items: [
          '**Approve the install** (`npm install` of Playwright Test): you are letting it add a tool to your project. The app itself stays three files.',
          '**Watch the browser** type, click and tick on its own, then read the result: **1 passed**.',
          '**Break it on purpose**: change "1 item left" to "2 items left" in the test and ask it to run again. A test that cannot fail checks nothing.',
        ],
      },
    ],
    checklist: [
      'I approved the Playwright Test install',
      'I watched the test run and read **1 passed**',
      'I broke it on purpose and saw it fail',
    ],
  },
  {
    id: 'subtasks-auto-mode',
    title: 'Step 5 · Subtasks, in auto mode',
    short: 'Ticket',
    blocks: [
      {
        kind: 'text',
        md: 'Now the agent works **without asking your permission**: it reads, edits, runs and checks until it thinks it is done.',
      },
      { kind: 'text', md: '<kbd>Shift</kbd>+<kbd>Tab</kbd> until the mode reads auto (or restart):', only: 'claude' },
      { kind: 'code', text: 'claude --permission-mode auto', only: 'claude' },
      { kind: 'text', md: 'Delete `opencode.jsonc`, then restart opencode.', only: 'opencode' },
      {
        kind: 'list',
        items: [
          'It **follows your instructions**. If they never say *"when in doubt, stop and ask me"*, it will not ask: it picks an answer and keeps going.',
          'So put everything it needs in **your first message**, including when it should stop and ask.',
          'That is how engineers use agents today: **write the request like a ticket**, let it run, **review the result**.',
          'Claude Code\'s auto mode still blocks risky actions with a safety check. opencode has none: it runs whatever it decides.',
        ],
      },
      { kind: 'text', md: '**❌ Too vague.** It will guess the layout, the rules, and when it is done. Every guess is a dice roll.' },
      { kind: 'prompt', text: 'Add subtasks to the todos.' },
      { kind: 'text', md: '**✅ Specific: write it like a ticket.**' },
      {
        kind: 'prompt',
        text: `Goal: each todo can have subtasks.

Behaviour:
- A "+ subtask" button on a todo shows a small text field; Enter adds the subtask under that todo.
- Subtasks can be ticked and deleted, like todos.
- When every subtask of a todo is ticked, the todo is ticked too.
- "items left" still counts todos only.

Rules: the app stays index.html, app.js and style.css, with no libraries. Existing todos keep working and look the same. If anything here is unclear, stop and ask me before you start.

Done when: you opened index.html in the browser, added a todo with two subtasks, ticked both, reloaded, and the todo is ticked with both subtasks still there. The test from step 4 still passes. Tell me what you checked.`,
      },
      { kind: 'text', md: 'When it says done: **check the "Done when" yourself**, then ask:' },
      { kind: 'prompt', text: 'What did you change, and why?' },
    ],
    checklist: [
      'I switched my agent to auto mode',
      'I sent the ticket as one message and let it run',
      'I checked the "Done when" myself',
      'I asked what it changed, and why',
    ],
  },
  {
    id: 'what-to-remember',
    title: 'What to remember',
    short: 'Remember',
    blocks: [
      {
        kind: 'list',
        items: [
          'An LLM **predicts the next token**. It does not know, and it can be wrong while sounding sure.',
          'An agent is that LLM **in a loop with tools**, run by a harness.',
          '**You steer**: the request, the rules file, approving, interrupting, reviewing.',
          'In auto mode **your prompt is the spec**: goal, behaviour, rules, and when it is done.',
        ],
      },
      {
        kind: 'text',
        md: '**Try next on your own:** a filter (All / Active / Done), edit a todo with a double-click, or ask the agent to write a test for "items left".',
      },
    ],
    checklist: [
      'I wrote down what surprised me today',
      'I downloaded my notes (button at the bottom of the page)',
    ],
  },
]
