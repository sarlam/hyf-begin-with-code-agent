// A small party when a step is done: a friendly message, and confetti unless the student prefers less motion.
import { h } from './dom.ts'

const CHEERS = [
  'Step done! Nice work.',
  'Ticked off! On to the next one.',
  'You steered that one well.',
  'Another one done. Keep going!',
]
const ALL_DONE = 'All steps done! You built an app through an agent. 🎉'
const CONFETTI_COLOURS = ['var(--hyf-red)', 'var(--hyf-yellow)', 'var(--hyf-maroon)', 'var(--hyf-white)']

let hideToast: ReturnType<typeof setTimeout> | undefined

export function celebrate(toast: HTMLElement, stepIndex: number, allDone: boolean): void {
  toast.textContent = allDone ? ALL_DONE : CHEERS[stepIndex % CHEERS.length]
  toast.classList.add('show')
  clearTimeout(hideToast)
  hideToast = setTimeout(() => toast.classList.remove('show'), allDone ? 5000 : 2600)

  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const burst = h('div', { class: 'confetti', 'aria-hidden': 'true' })
  for (let i = 0; i < (allDone ? 90 : 36); i++) {
    const piece = h('span')
    piece.style.setProperty('--left', `${Math.random() * 100}vw`)
    piece.style.setProperty('--drift', `${Math.random() * 30 - 15}vw`)
    piece.style.setProperty('--spin', `${Math.random() * 720 - 360}deg`)
    piece.style.setProperty('--delay', `${Math.random() * 0.4}s`)
    piece.style.setProperty('--colour', CONFETTI_COLOURS[i % CONFETTI_COLOURS.length])
    burst.append(piece)
  }
  document.body.append(burst)
  setTimeout(() => burst.remove(), 2600)
}
