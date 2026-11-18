// A tiny helper to build DOM elements in code, so user text is always set as text, never as HTML.
import { inlineMarkdown } from './inline.ts'

type Attrs = Record<string, string | number | boolean | EventListener | undefined>
type Child = Node | string | false | null | undefined

/** h('button', { class: 'x', onclick: fn }, 'Label'): `on…` attributes become event listeners. */
export function h<K extends keyof HTMLElementTagNameMap>(tag: K, attrs: Attrs = {}, ...children: Child[]): HTMLElementTagNameMap[K] {
  const element = document.createElement(tag)
  for (const [name, value] of Object.entries(attrs)) {
    if (typeof value === 'function') element.addEventListener(name.slice(2), value)
    else if (value === true) element.setAttribute(name, '')
    else if (value !== false && value !== undefined) element.setAttribute(name, String(value))
  }
  for (const child of children) if (child) element.append(child)
  return element
}

/** An element whose content is the workbook's own inline Markdown (never user text). */
export function md<K extends keyof HTMLElementTagNameMap>(tag: K, markdown: string, attrs: Attrs = {}): HTMLElementTagNameMap[K] {
  const element = h(tag, attrs)
  element.innerHTML = inlineMarkdown(markdown)
  return element
}
