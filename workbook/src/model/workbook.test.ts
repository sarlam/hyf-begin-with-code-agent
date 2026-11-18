import { test } from 'node:test'
import assert from 'node:assert/strict'
import type { Step } from '../content/types.ts'
import {
  addAttempt, countDone, initialState, isStepDone, progressOf,
  removeAttempt, setAttempt, setNotes, toggleItem,
} from './workbook.ts'

const steps: Step[] = [
  { id: 'one', title: 'One', short: '1', blocks: [], checklist: ['a', 'b'] },
  { id: 'two', title: 'Two', short: '2', blocks: [], checklist: ['c'] },
]

test('a fresh workbook starts on the first step with nothing ticked', () => {
  const state = initialState('one')
  assert.equal(state.currentStepId, 'one')
  assert.equal(state.agent, 'claude')
  assert.deepEqual(progressOf(state, 'one'), { ticked: [], notes: '', attempts: [] })
})

test('a step is done only when every checklist item is ticked', () => {
  let state = initialState('one')
  state = toggleItem(state, 'one', 1)
  assert.equal(isStepDone(steps[0], progressOf(state, 'one')), false)
  state = toggleItem(state, 'one', 0)
  assert.equal(isStepDone(steps[0], progressOf(state, 'one')), true)
  assert.equal(countDone(steps, state), 1)
})

test('ticking a ticked item unticks it', () => {
  const state = toggleItem(toggleItem(initialState('one'), 'one', 0), 'one', 0)
  assert.deepEqual(progressOf(state, 'one').ticked, [])
})

test('updates return a new state and leave the old one alone', () => {
  const before = initialState('one')
  const after = setNotes(before, 'one', 'it worked')
  assert.equal(progressOf(before, 'one').notes, '')
  assert.equal(progressOf(after, 'one').notes, 'it worked')
})

test('prompt attempts can be added, edited and removed', () => {
  let state = addAttempt(initialState('one'), 'two', 'first try')
  state = addAttempt(state, 'two')
  state = setAttempt(state, 'two', 1, 'second try')
  assert.deepEqual(progressOf(state, 'two').attempts, ['first try', 'second try'])
  state = removeAttempt(state, 'two', 0)
  assert.deepEqual(progressOf(state, 'two').attempts, ['second try'])
})
