// The text of the hands-on steps on the slides (Part 3), indexed by step number: STEPS[0] is Step 0 · Set up.
// The slides summarise each step; the full prompts and commands stay in the workbook (decisions #3, #6, #7).

export interface HandsOnStep {
  stop: string // its name on the progress bar
  goal: string
  why: string
  // The "Do it" slide: the prompt's key line and "You should see", one check per click.
  // Step 5 has neither: its slide shows the whole ticket, because the ticket's shape is the lesson.
  prompt?: string
  checks?: [string, string, string]
}

export const STEPS: HandsOnStep[] = [
  {
    stop: 'Set up',
    goal: 'Start an agent that asks first, and give it a browser.',
    why: 'You see and approve every change it makes, and it can check your page the way you would.',
    prompt: 'Open https://example.com in the browser and tell me the page title.',
    checks: [
      'Your agent runs in a new, empty todo folder',
      'It asks before every edit and command',
      'It tells you the title of example.com',
    ],
  },
  {
    stop: 'Plan',
    goal: 'Get a plan from the agent, before any code.',
    why: 'You decide what gets built. Changing a plan takes one sentence; changing code takes much more.',
    prompt: 'Make a plan in small steps. Do not write code yet.',
    checks: [
      'The mode reads plan: Shift+Tab to switch',
      'A plan in small, numbered steps, and no files yet',
      'Something you did not ask for? Say so in plain words',
    ],
  },
  {
    stop: 'Build',
    goal: 'Build the app one step of the plan at a time.',
    why: 'A small change is easy to read and to check. When something breaks, you know which step did it.',
    prompt: 'Do step 1 of the plan only.',
    checks: [
      'A small change you can read: ask "Explain what you just wrote"',
      'The app works in your browser after each step',
      'It does not? Say what you see, not how to fix it',
    ],
  },
  {
    stop: 'Steer',
    goal: 'Keep the agent on your track.',
    why: 'It will go the wrong way sometimes. Stopping it early costs less than fixing it later.',
    prompt: 'Never add a library. Keep the app to index.html, app.js and style.css.',
    checks: [
      'Esc stops it; then say what you want instead',
      '/rewind or /undo takes a change back',
      'A rule in the rules file stops a mistake that keeps coming back',
    ],
  },
  {
    stop: 'Test',
    goal: 'Let the agent write a test, then watch it run.',
    why: 'A test checks your app for you, every time. You stop clicking through it by hand.',
    prompt: 'Write one Playwright test for the todo app, then run it slowly so I can watch it.',
    checks: [
      'It asks to install Playwright Test: approve it',
      'A browser types, clicks and ticks on its own',
      'The result: 1 passed',
    ],
  },
  {
    stop: 'Auto',
    goal: 'Hand the agent a whole feature, and let it run.',
    why: 'In auto mode it does not ask you. Your first message has to say everything, like a ticket.',
  },
]

// How full a stop of the progress bar is, in percent, while the slides show `step` at `progress` (0 to 1).
export const stopFill = (stop: number, step: number, progress: number) =>
  stop < step ? 100 : stop === step ? progress * 100 : 0
