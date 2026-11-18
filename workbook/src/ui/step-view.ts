// The focused card of the current step: its content for the chosen agent, the checklist, and previous/next.
import { AGENTS, type Agent, type Block, type Step } from '../content/types.ts'
import { isStepDone, type StepProgress } from '../model/workbook.ts'
import { copyButton } from './copy-button.ts'
import { h, md } from './dom.ts'

export interface StepActions {
  toggleItem: (index: number) => void
  tryPrompt: (text: string) => void
  goTo: (index: number) => void
}

function renderBlock(block: Block, actions: StepActions): HTMLElement {
  switch (block.kind) {
    case 'text':
      return md('p', block.md)
    case 'list':
      return h('ul', { class: 'content-list' }, ...block.items.map(item => md('li', item)))
    case 'code':
      return h('div', { class: 'code' },
        block.only && h('span', { class: 'code-agent' }, AGENTS[block.only]),
        h('pre', {}, h('code', {}, block.text)),
        copyButton(() => block.text))
    case 'prompt':
      return h('figure', { class: 'prompt' },
        h('figcaption', { class: 'prompt-label' }, 'Prompt for your agent'),
        h('blockquote', {}, block.text),
        h('div', { class: 'prompt-actions' },
          copyButton(() => block.text, 'Copy prompt'),
          h('button', { type: 'button', class: 'button small ghost', onclick: () => actions.tryPrompt(block.text) },
            '✎ Try my own version')))
  }
}

function renderChecklist(step: Step, progress: StepProgress, actions: StepActions): HTMLElement {
  return h('fieldset', { class: 'checklist' },
    h('legend', {}, `Tick as you go · ${progress.ticked.length} of ${step.checklist.length}`),
    ...step.checklist.map((item, index) =>
      h('label', { class: 'check' },
        h('input', {
          type: 'checkbox',
          id: `tick-${index}`,
          checked: progress.ticked.includes(index),
          onchange: () => actions.toggleItem(index),
        }),
        md('span', item))))
}

export function renderStep(steps: Step[], index: number, progress: StepProgress, agent: Agent, actions: StepActions): HTMLElement[] {
  const step = steps[index]
  const previous = steps[index - 1]
  const next = steps[index + 1]
  const done = isStepDone(step, progress)
  const blocks = step.blocks.filter(block => !block.only || block.only === agent)

  return [
    h('p', { class: 'step-count' }, `Step ${index + 1} of ${steps.length}`, done && h('span', { class: 'done-badge' }, '✓ Done')),
    h('h1', { id: 'step-title', tabindex: -1 }, step.title),
    h('div', { class: 'step-content' }, ...blocks.map(block => renderBlock(block, actions))),
    renderChecklist(step, progress, actions),
    h('div', { class: 'step-nav' },
      previous && h('button', { type: 'button', id: 'prev', class: 'button ghost', onclick: () => actions.goTo(index - 1) },
        `← ${previous.short}`),
      next && h('button', { type: 'button', id: 'next', class: `button${done ? ' primary' : ''}`, onclick: () => actions.goTo(index + 1) },
        `Next: ${next.short} →`)),
  ]
}
