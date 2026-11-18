import { test } from 'node:test'
import assert from 'node:assert/strict'
import { inlineMarkdown } from './inline.ts'

test('inline Markdown becomes bold, italic, code and keys', () => {
  assert.equal(
    inlineMarkdown('**Run it**: *now*, `npm test`, <kbd>Esc</kbd>'),
    '<strong>Run it</strong>: <em>now</em>, <code>npm test</code>, <kbd>Esc</kbd>',
  )
})

test('any other HTML is shown as text, not run', () => {
  assert.equal(inlineMarkdown('<img src=x onerror=alert(1)> & "q"'), '&lt;img src=x onerror=alert(1)&gt; &amp; &quot;q&quot;')
})
