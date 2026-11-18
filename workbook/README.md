# Hands-on workbook

A small website students open on their own laptop during the hands-on part of the workshop. It shows one
step of `pages/04-hands-on.md` at a time, with a checklist to tick, copy buttons on every prompt and
command, and a notepad per step for notes and their own prompt attempts. Progress and notes stay in the
browser (localStorage) and can be downloaded as a Markdown file. It is served at `/workbook/` next to the deck.

Vanilla TypeScript, built with Vite into plain ES modules. No framework, no runtime dependency.

## Get started

From the repository root, after `npm install`:

| Command                  | What it does                                                         |
| ------------------------ | -------------------------------------------------------------------- |
| `npm run dev:workbook`   | Dev server with hot reload, opens <http://localhost:5173/workbook/>  |
| `npm run test:workbook`  | Unit tests, with Node's own test runner (Node 23.6+ runs `.ts` files) |
| `npm run build:workbook` | Type check, then build into `dist/workbook/`                         |
| `npm run build`          | Builds the deck, then the workbook (what Netlify and Vercel run)     |

Read the tests first: `src/model/*.test.ts` say what the workbook promises (when a step counts as done,
what happens when storage is blocked or damaged, what the export looks like).

## Layout

```text
workbook/
├── index.html            the page shell: header, agent picker, footer, reset dialog
├── vite.config.ts        base /workbook/, output to ../dist/workbook
├── tsconfig.json         type check only (tests excluded: they use node:test)
└── src/
    ├── main.ts           entry: holds the state, saves every change, redraws, wires the buttons
    ├── content/          WHAT the student sees
    │   ├── types.ts      Step and Block types, the two agents
    │   └── steps.ts      the steps, mirrored from the slides  <- edit here when the slides change
    ├── model/            the student's data, pure functions, no DOM
    │   ├── workbook.ts   state, updates (tick, notes, attempts), completion rules
    │   ├── storage.ts    load/save in localStorage, every access guarded
    │   └── export.ts     the Markdown download
    ├── ui/               DOM rendering, one file per part of the page
    │   ├── dom.ts        h() to build elements, md() for content Markdown
    │   ├── inline.ts     **bold**, *italic*, `code`, <kbd> to HTML (escapes everything else)
    │   ├── overview.ts   progress bar and step chips
    │   ├── step-view.ts  the current step card and its checklist
    │   ├── notepad.ts    notes and prompt attempts
    │   ├── copy-button.ts
    │   └── celebrate.ts  toast and confetti when a step is done
    └── styles/
        ├── tokens.css    brand colours (mirror the deck's style.css), fonts, radii
        └── workbook.css  the page, in the order it appears
```

Tests sit next to the file they test (`*.test.ts`).

## How to update the steps when the slides change

Edit `src/content/steps.ts`. Each step has the slide `title`, a one-word `short` for the overview, its
`blocks` and its `checklist`:

- `{ kind: 'text', md }` and `{ kind: 'list', items }` take inline Markdown: `**bold**`, `*italic*`,
  `` `code` ``, `<kbd>Esc</kbd>`.
- `{ kind: 'code', text }` is something to type in the terminal or a file to create, with a copy button.
- `{ kind: 'prompt', text }` is a message to the agent: copy button and "Try my own version".
- Add `only: 'claude'` or `only: 'opencode'` to show a block for one agent; `both(claude, opencode)` is the
  deck's `<BothAgents>`.

Copy prompts and commands from the slide word for word. Keep a step's `id` when you reword it: saved
ticks and notes are stored by `id`, and checklist ticks by position, so reordering checklist items moves
students' ticks. `npm run test:workbook` checks the content too (unique ids, a checklist on every step,
both agents covered).

## Things to know

- **State flow.** Every change goes through `commit()` in `main.ts`: a pure update from `model/workbook.ts`
  makes a new state, which is saved and then drawn again. Typing in a notepad saves without redrawing, so
  the cursor stays put.
- **Storage can fail** (private windows, blocked site data). The page then works for the session and shows
  a banner asking the student to download their notes. Saved data is parsed field by field, so an old or
  damaged save never breaks the page. The key is `hyf-workbook-v1`.
- **Motion.** The confetti, the step entrance and transitions are off under `prefers-reduced-motion`.
- **Deployment.** The workbook is plain files under `dist/workbook/`. Netlify serves existing files before the
  deck's catch-all rewrite; `vercel.json` has an explicit `/workbook/` rewrite ahead of it.
