// A "Copy" button that says when it worked, and what to do when the browser refuses.
import { h } from './dom.ts'

export function copyButton(text: () => string, label = 'Copy'): HTMLButtonElement {
  const button = h('button', { type: 'button', class: 'button small' }, label)
  button.addEventListener('click', async () => {
    let copied = true
    try {
      await navigator.clipboard.writeText(text())
    } catch {
      copied = false
    }
    button.textContent = copied ? 'Copied!' : 'Select it and press Ctrl+C'
    button.classList.toggle('copied', copied)
    setTimeout(() => {
      button.textContent = label
      button.classList.remove('copied')
    }, 1800)
  })
  return button
}
