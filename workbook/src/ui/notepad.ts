// The notepad beside each step: free notes, plus a list of prompt attempts to compare.
import type { Step } from '../content/types.ts'
import type { StepProgress } from '../model/workbook.ts'
import { copyButton } from './copy-button.ts'
import { h } from './dom.ts'

export interface NotepadActions {
  setNotes: (text: string) => void
  addAttempt: () => void
  setAttempt: (index: number, text: string) => void
  removeAttempt: (index: number) => void
}

function renderAttempt(text: string, index: number, actions: NotepadActions): HTMLElement {
  const id = `attempt-${index}`
  const textarea = h('textarea', {
    id,
    rows: 4,
    placeholder: 'Write your prompt, send it, and note how the agent answered.',
    oninput: () => actions.setAttempt(index, textarea.value),
  }, text)
  return h('li', { class: 'attempt' },
    h('label', { for: id }, `Prompt attempt ${index + 1}`),
    textarea,
    h('div', { class: 'attempt-actions' },
      copyButton(() => textarea.value),
      h('button', {
        type: 'button',
        class: 'button small ghost',
        'aria-label': `Delete prompt attempt ${index + 1}`,
        onclick: () => actions.removeAttempt(index),
      }, 'Delete')))
}

export function renderNotepad(step: Step, progress: StepProgress, actions: NotepadActions): HTMLElement[] {
  const notes = h('textarea', {
    id: 'notes',
    rows: 6,
    placeholder: 'What happened? What surprised you? What would you try next?',
    oninput: () => actions.setNotes(notes.value),
  }, progress.notes)

  return [
    h('h2', { id: 'notepad-title' }, 'My notepad'),
    h('p', { class: 'notepad-hint' }, `For “${step.short}”. Saved automatically in this browser.`),
    h('label', { for: 'notes' }, 'Notes'),
    notes,
    h('h3', {}, 'My prompt attempts'),
    progress.attempts.length
      ? h('ol', { class: 'attempts' }, ...progress.attempts.map((text, i) => renderAttempt(text, i, actions)))
      : h('p', { class: 'notepad-hint' }, 'Try your own wording and compare what the agent does. Each attempt gets its own box.'),
    h('button', { type: 'button', id: 'add-attempt', class: 'button small', onclick: actions.addAttempt }, '+ New prompt attempt'),
  ]
}
