// One linear path through the deck: ↓ and ↑ step through every animation, like → and ←,
// instead of Slidev's default of jumping a whole slide. Shift + → / ← still jump a slide.
import { defineShortcutsSetup } from '@slidev/types'

export default defineShortcutsSetup((nav, base) =>
  base.map((shortcut) => {
    if (shortcut.name === 'next_down') return { ...shortcut, fn: nav.next }
    if (shortcut.name === 'prev_up') return { ...shortcut, fn: nav.prev }
    return shortcut
  }),
)
