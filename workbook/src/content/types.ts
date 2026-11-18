// The shape of the workbook's content. The steps themselves live in steps.ts.

export const AGENTS = { claude: 'Claude Code', opencode: 'opencode' } as const
export type Agent = keyof typeof AGENTS

/**
 * One piece of a step, shown top to bottom.
 * `md` fields take inline Markdown: **bold**, *italic*, `code` and <kbd>key</kbd>.
 * `only` shows the block to students of that agent only.
 */
export type Block =
  | { kind: 'text', md: string, only?: Agent }
  | { kind: 'list', items: string[], only?: Agent }
  /** Something to type in the terminal or a file to create: monospace, with a copy button. */
  | { kind: 'code', text: string, only?: Agent }
  /** A message to send to the agent: copy button, plus "try my own version". */
  | { kind: 'prompt', text: string, only?: Agent }

export interface Step {
  /** Stable key for saved progress: rename it and students lose their ticks for this step. */
  id: string
  /** The slide title. */
  title: string
  /** One word for the step overview. */
  short: string
  blocks: Block[]
  /** What the student ticks. The step is done when every item is ticked. Inline Markdown. */
  checklist: string[]
}
