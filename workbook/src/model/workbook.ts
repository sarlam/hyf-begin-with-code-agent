// The student's workbook: which agent, where they are, and per step their ticks, notes and prompt attempts.
// Every update is a pure function that returns a new state; main.ts saves it and redraws.
import type { Agent, Step } from '../content/types.ts'

export interface StepProgress {
  /** Indexes of the ticked checklist items, in order. */
  ticked: number[]
  notes: string
  attempts: string[]
}

export interface WorkbookState {
  agent: Agent
  currentStepId: string
  steps: Record<string, StepProgress>
}

export const initialState = (firstStepId: string): WorkbookState =>
  ({ agent: 'claude', currentStepId: firstStepId, steps: {} })

export const progressOf = (state: WorkbookState, stepId: string): StepProgress =>
  state.steps[stepId] ?? { ticked: [], notes: '', attempts: [] }

export const isStepDone = (step: Step, progress: StepProgress): boolean =>
  step.checklist.every((_, index) => progress.ticked.includes(index))

export const countDone = (steps: Step[], state: WorkbookState): number =>
  steps.filter(step => isStepDone(step, progressOf(state, step.id))).length

function updateStep(state: WorkbookState, stepId: string, change: (progress: StepProgress) => Partial<StepProgress>): WorkbookState {
  const progress = progressOf(state, stepId)
  return { ...state, steps: { ...state.steps, [stepId]: { ...progress, ...change(progress) } } }
}

export const toggleItem = (state: WorkbookState, stepId: string, index: number): WorkbookState =>
  updateStep(state, stepId, ({ ticked }) => ({
    ticked: ticked.includes(index) ? ticked.filter(i => i !== index) : [...ticked, index].sort((a, b) => a - b),
  }))

export const setNotes = (state: WorkbookState, stepId: string, notes: string): WorkbookState =>
  updateStep(state, stepId, () => ({ notes }))

export const addAttempt = (state: WorkbookState, stepId: string, text = ''): WorkbookState =>
  updateStep(state, stepId, ({ attempts }) => ({ attempts: [...attempts, text] }))

export const setAttempt = (state: WorkbookState, stepId: string, index: number, text: string): WorkbookState =>
  updateStep(state, stepId, ({ attempts }) => ({ attempts: attempts.map((old, i) => (i === index ? text : old)) }))

export const removeAttempt = (state: WorkbookState, stepId: string, index: number): WorkbookState =>
  updateStep(state, stepId, ({ attempts }) => ({ attempts: attempts.filter((_, i) => i !== index) }))
