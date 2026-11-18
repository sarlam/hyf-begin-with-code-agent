// Entry point: holds the student's workbook state, saves every change, and redraws the page.
import './styles/tokens.css'
import './styles/workbook.css'
import { STEPS } from './content/steps.ts'
import type { Agent } from './content/types.ts'
import { toMarkdown } from './model/export.ts'
import { browserStorage, loadState, saveState } from './model/storage.ts'
import {
  addAttempt, countDone, initialState, isStepDone, progressOf, removeAttempt,
  setAttempt, setNotes, toggleItem, type WorkbookState,
} from './model/workbook.ts'
import { celebrate } from './ui/celebrate.ts'
import { renderNotepad } from './ui/notepad.ts'
import { renderOverview } from './ui/overview.ts'
import { renderStep } from './ui/step-view.ts'

const byId = <T extends HTMLElement>(id: string): T => document.getElementById(id) as T
const page = {
  overview: byId('overview'),
  step: byId('step'),
  notepad: byId('notepad'),
  toast: byId('toast'),
  storageWarning: byId('storage-warning'),
  agentPicker: byId<HTMLFieldSetElement>('agent-picker'),
  exportButton: byId('export'),
  resetButton: byId('reset'),
  resetDialog: byId<HTMLDialogElement>('reset-dialog'),
}

const storage = browserStorage()
const freshState = (): WorkbookState => initialState(STEPS[0].id)
let state = loadState(storage, freshState())

const currentIndex = (): number => Math.max(0, STEPS.findIndex(step => step.id === state.currentStepId))
const currentStep = () => STEPS[currentIndex()]

/** Every change goes through here: keep it, save it, and redraw unless the student is typing. */
function commit(next: WorkbookState, redraw = true): void {
  state = next
  page.storageWarning.hidden = saveState(storage, state)
  if (redraw) render()
}

function render(): void {
  const focusedId = document.activeElement?.id
  const step = currentStep()
  const progress = progressOf(state, step.id)

  page.overview.replaceChildren(...renderOverview(STEPS, state, goTo))
  page.step.replaceChildren(...renderStep(STEPS, currentIndex(), progress, state.agent, {
    toggleItem: index => tick(index),
    tryPrompt: text => newAttempt(text),
    goTo,
  }))
  page.notepad.replaceChildren(...renderNotepad(step, progress, {
    setNotes: text => commit(setNotes(state, step.id, text), false),
    addAttempt: () => newAttempt(''),
    setAttempt: (index, text) => commit(setAttempt(state, step.id, index, text), false),
    removeAttempt: index => commit(removeAttempt(state, step.id, index)),
  }))
  for (const radio of page.agentPicker.querySelectorAll('input')) radio.checked = radio.value === state.agent

  // Redrawing replaces the elements: give focus back to the one the student was on.
  if (focusedId) document.getElementById(focusedId)?.focus()
}

function goTo(index: number): void {
  commit({ ...state, currentStepId: STEPS[index].id })
  byId('step-title').focus({ preventScroll: true })
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
  if (!reduceMotion) {
    page.step.animate([{ opacity: 0, transform: 'translateY(0.75rem)' }, { opacity: 1, transform: 'none' }],
      { duration: 280, easing: 'ease-out' })
  }
}

function tick(index: number): void {
  const step = currentStep()
  const wasDone = isStepDone(step, progressOf(state, step.id))
  commit(toggleItem(state, step.id, index))
  if (!wasDone && isStepDone(step, progressOf(state, step.id))) {
    celebrate(page.toast, currentIndex(), countDone(STEPS, state) === STEPS.length)
  }
}

function newAttempt(text: string): void {
  commit(addAttempt(state, currentStep().id, text))
  const attempt = byId<HTMLTextAreaElement>(`attempt-${progressOf(state, currentStep().id).attempts.length - 1}`)
  attempt.focus()
  attempt.scrollIntoView({ block: 'center', behavior: 'smooth' })
}

function downloadNotes(): void {
  const file = new Blob([toMarkdown(STEPS, state)], { type: 'text/markdown' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(file)
  link.download = 'my-hands-on-workbook.md'
  link.click()
  URL.revokeObjectURL(link.href)
}

page.agentPicker.addEventListener('change', event => {
  commit({ ...state, agent: (event.target as HTMLInputElement).value as Agent })
})
page.exportButton.addEventListener('click', downloadNotes)
page.resetButton.addEventListener('click', () => page.resetDialog.showModal())
page.resetDialog.addEventListener('close', () => {
  if (page.resetDialog.returnValue !== 'erase') return
  state = { ...freshState(), agent: state.agent }
  goTo(0)
})

render()
