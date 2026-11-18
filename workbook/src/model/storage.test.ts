import { test } from 'node:test'
import assert from 'node:assert/strict'
import { initialState, toggleItem } from './workbook.ts'
import { loadState, parseState, saveState, type KeyValueStore } from './storage.ts'

const fallback = initialState('one')

function memoryStore(): KeyValueStore {
  const data = new Map<string, string>()
  return {
    getItem: key => data.get(key) ?? null,
    setItem: (key, value) => { data.set(key, value) },
    removeItem: key => { data.delete(key) },
  }
}

const brokenStore: KeyValueStore = {
  getItem: () => { throw new Error('blocked') },
  setItem: () => { throw new Error('quota') },
  removeItem: () => { throw new Error('blocked') },
}

test('what is saved comes back on load', () => {
  const store = memoryStore()
  const state = { ...toggleItem(fallback, 'one', 1), agent: 'opencode' as const }
  assert.equal(saveState(store, state), true)
  assert.deepEqual(loadState(store, fallback), state)
})

test('an empty, missing or broken storage gives the fallback, never an error', () => {
  assert.deepEqual(loadState(memoryStore(), fallback), fallback)
  assert.deepEqual(loadState(undefined, fallback), fallback)
  assert.deepEqual(loadState(brokenStore, fallback), fallback)
  assert.equal(saveState(brokenStore, fallback), false)
  assert.equal(saveState(undefined, fallback), false)
})

test('damaged saved data is repaired field by field', () => {
  assert.deepEqual(parseState('not json', fallback), fallback)
  assert.deepEqual(parseState('null', fallback), fallback)
  const repaired = parseState(JSON.stringify({
    agent: 'toString',
    currentStepId: 42,
    steps: { one: { ticked: [0, 'x', 2], notes: 7, attempts: ['keep', null] }, two: 'junk' },
  }), fallback)
  assert.deepEqual(repaired, {
    agent: 'claude',
    currentStepId: 'one',
    steps: { one: { ticked: [0, 2], notes: '', attempts: ['keep'] } },
  })
})
