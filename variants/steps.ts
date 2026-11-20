// The text of hands-on steps 1 and 4, shared by the three layouts in variants.md, so they differ in layout only.
// Each slide shows the prompt's key line; the full prompt stays in the workbook (decision #7).

export const PLAN = {
  phase: 0,
  title: 'Step 1 · Plan first',
  goal: 'Get a plan from the agent, before any code.',
  why: 'You decide what gets built. Changing a plan takes one sentence; changing code takes much more.',
  prompt: 'Make a plan in small steps. Do not write code yet.',
  checks: [
    'A plan in small, numbered steps',
    'No files created yet',
    'Something you did not ask for? Say so in plain words',
  ],
}

export const TEST = {
  phase: 3,
  title: 'Step 4 · A test you can watch',
  goal: 'Let the agent write a test, then watch it run.',
  why: 'A test checks your app for you, every time. You stop clicking through it by hand.',
  prompt: 'Write one Playwright test for the todo app, then run it slowly so I can watch it.',
  checks: [
    'It asks to install Playwright Test: approve it',
    'A browser types, clicks and ticks on its own',
    'The result: 1 passed',
  ],
}
