import { test } from 'node:test'
import assert from 'node:assert/strict'
import { STEPS, stopFill } from './hands-on.ts'

test('the progress bar has one stop per step, Set up first', () => {
  assert.deepEqual(STEPS.map(s => s.stop), ['Set up', 'Plan', 'Build', 'Steer', 'Test', 'Auto'])
})

test('stops before the current step are full, later ones empty', () => {
  assert.deepEqual([0, 1, 2, 3].map(stop => stopFill(stop, 2, 0)), [100, 100, 0, 0])
})

test('the current stop fills with the slide progress', () => {
  assert.equal(stopFill(2, 2, 0.5), 50)
  assert.equal(stopFill(2, 2, 1), 100)
})

test('every step has a goal and a why; all but Auto a prompt key line and three checks', () => {
  for (const step of STEPS) assert.ok(step.goal && step.why, step.stop)
  for (const step of STEPS.slice(0, -1)) {
    assert.ok(step.prompt, step.stop)
    assert.equal(step.checks?.length, 3, step.stop)
  }
})
