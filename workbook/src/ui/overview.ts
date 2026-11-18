// The strip under the header: how far the student is, and a button per step to jump to it.
import type { Step } from '../content/types.ts'
import { countDone, isStepDone, progressOf, type WorkbookState } from '../model/workbook.ts'
import { h } from './dom.ts'

export function renderOverview(steps: Step[], state: WorkbookState, goTo: (index: number) => void): HTMLElement[] {
  const done = countDone(steps, state)
  const percent = Math.round((done / steps.length) * 100)

  const summary = h('p', { class: 'overview-summary' },
    h('strong', {}, `${done} of ${steps.length}`), ' steps done')
  const bar = h('div', {
    class: 'progress',
    role: 'progressbar',
    'aria-label': 'Steps done',
    'aria-valuemin': 0,
    'aria-valuemax': steps.length,
    'aria-valuenow': done,
  }, h('div', { class: 'progress-fill', style: `width: ${percent}%` }))

  const list = h('ol', { class: 'step-list' }, ...steps.map((step, index) => {
    const isDone = isStepDone(step, progressOf(state, step.id))
    const isCurrent = step.id === state.currentStepId
    return h('li', {},
      h('button', {
        type: 'button',
        id: `goto-${index}`,
        class: `step-chip${isDone ? ' done' : ''}`,
        'aria-current': isCurrent ? 'step' : false,
        title: step.title,
        onclick: () => goTo(index),
      },
      h('span', { class: 'chip-number', 'aria-hidden': 'true' }, isDone ? '✓' : String(index + 1)),
      h('span', { class: 'chip-label' }, step.short),
      h('span', { class: 'visually-hidden' }, ` step ${index + 1}${isDone ? ', done' : ''}`)))
  }))

  return [h('div', { class: 'overview-head' }, summary, bar), list]
}
