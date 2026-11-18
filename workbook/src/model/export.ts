// The workbook as a Markdown file the student can keep after the workshop.
import { AGENTS, type Step } from '../content/types.ts'
import { countDone, isStepDone, progressOf, type WorkbookState } from './workbook.ts'

const quote = (text: string): string => text.split('\n').map(line => `> ${line}`.trimEnd()).join('\n')

function stepToMarkdown(step: Step, number: number, state: WorkbookState): string {
  const progress = progressOf(state, step.id)
  const done = isStepDone(step, progress) ? ' (done)' : ''
  const items = step.checklist.map((item, i) => `- [${progress.ticked.includes(i) ? 'x' : ' '}] ${item}`)
  const sections = [`## ${number}. ${step.title}${done}`, items.join('\n')]

  if (progress.notes.trim()) sections.push('### My notes', progress.notes.trim())
  const attempts = progress.attempts.map(attempt => attempt.trim()).filter(Boolean)
  if (attempts.length) sections.push('### My prompt attempts', ...attempts.map(quote))
  return sections.join('\n\n')
}

export function toMarkdown(steps: Step[], state: WorkbookState): string {
  const summary = `Agent: ${AGENTS[state.agent]} · ${countDone(steps, state)} of ${steps.length} steps done`
  const body = steps.map((step, i) => stepToMarkdown(step, i + 1, state))
  return ['# My hands-on workbook', summary, ...body].join('\n\n') + '\n'
}
