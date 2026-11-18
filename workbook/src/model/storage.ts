// Saving the workbook in the browser. Storage can be missing, blocked or full (private windows,
// strict settings), so every access is wrapped: the workbook keeps working, it just forgets on reload.
import { AGENTS } from '../content/types.ts'
import type { StepProgress, WorkbookState } from './workbook.ts'

const KEY = 'hyf-workbook-v1'

export type KeyValueStore = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>

/** The browser's localStorage, or undefined when the browser refuses access to it. */
export function browserStorage(): KeyValueStore | undefined {
  try {
    return window.localStorage
  } catch {
    return undefined
  }
}

export function loadState(store: KeyValueStore | undefined, fallback: WorkbookState): WorkbookState {
  try {
    const saved = store?.getItem(KEY)
    return saved ? parseState(saved, fallback) : fallback
  } catch {
    return fallback
  }
}

/** Returns false when nothing could be saved, so the page can warn the student. */
export function saveState(store: KeyValueStore | undefined, state: WorkbookState): boolean {
  if (!store) return false
  try {
    store.setItem(KEY, JSON.stringify(state))
    return true
  } catch {
    return false
  }
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

const arrayOf = <T>(value: unknown, isItem: (item: unknown) => item is T): T[] =>
  Array.isArray(value) ? value.filter(isItem) : []

const isIndex = (item: unknown): item is number => Number.isInteger(item)
const isString = (item: unknown): item is string => typeof item === 'string'

/** Saved data is untrusted (old versions, hand edits): keep what has the right shape, drop the rest. */
export function parseState(json: string, fallback: WorkbookState): WorkbookState {
  let raw: unknown
  try {
    raw = JSON.parse(json)
  } catch {
    return fallback
  }
  if (!isRecord(raw)) return fallback

  const steps: Record<string, StepProgress> = {}
  for (const [id, progress] of Object.entries(isRecord(raw.steps) ? raw.steps : {})) {
    if (!isRecord(progress)) continue
    steps[id] = {
      ticked: arrayOf(progress.ticked, isIndex),
      notes: isString(progress.notes) ? progress.notes : '',
      attempts: arrayOf(progress.attempts, isString),
    }
  }
  return {
    agent: isString(raw.agent) && Object.hasOwn(AGENTS, raw.agent) ? raw.agent as WorkbookState['agent'] : fallback.agent,
    currentStepId: isString(raw.currentStepId) ? raw.currentStepId : fallback.currentStepId,
    steps,
  }
}
