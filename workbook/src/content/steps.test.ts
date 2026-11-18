import { test } from 'node:test'
import assert from 'node:assert/strict'
import { STEPS } from './steps.ts'

test('every step has a unique id, used as the key of saved progress', () => {
  const ids = STEPS.map(step => step.id)
  assert.equal(new Set(ids).size, ids.length)
})

test('every step has something to tick, or it would count as done from the start', () => {
  for (const step of STEPS) assert.ok(step.checklist.length > 0, step.id)
})

test('every agent-specific command exists for both agents', () => {
  for (const step of STEPS) {
    const claude = step.blocks.filter(block => block.only === 'claude').length
    const opencode = step.blocks.filter(block => block.only === 'opencode').length
    assert.equal(claude > 0, opencode > 0, step.id)
  }
})
