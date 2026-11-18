import { test } from 'node:test'
import assert from 'node:assert/strict'
import type { Step } from '../content/types.ts'
import { addAttempt, initialState, setNotes, toggleItem } from './workbook.ts'
import { toMarkdown } from './export.ts'

const steps: Step[] = [
  { id: 'one', title: 'Plan first', short: '1', blocks: [], checklist: ['Sent the `plan` prompt', 'Read it'] },
  { id: 'two', title: 'Build', short: '2', blocks: [], checklist: ['Ran it'] },
]

test('the export lists every step with its ticks, notes and prompt attempts', () => {
  let state = { ...initialState('one'), agent: 'opencode' as const }
  state = toggleItem(toggleItem(state, 'one', 0), 'one', 1)
  state = setNotes(state, 'one', 'It asked about dark mode.')
  state = addAttempt(state, 'one', 'Plan it.\nNo code.')
  state = addAttempt(state, 'one', '   ')

  assert.equal(toMarkdown(steps, state), `# My hands-on workbook

Agent: opencode · 1 of 2 steps done

## 1. Plan first (done)

- [x] Sent the \`plan\` prompt
- [x] Read it

### My notes

It asked about dark mode.

### My prompt attempts

> Plan it.
> No code.

## 2. Build

- [ ] Ran it
`)
})
