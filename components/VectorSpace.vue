<script setup lang="ts">
// king + (woman - origin) = queen: the "woman" vector is copied, dragged, then slid onto king.
import { ref, useId, watch } from 'vue'

const props = defineProps<{ step: number }>()

type Point = { x: number, y: number }

const UNIT = 50 // svg px per axis unit
const MAX_X = 4
const MAX_Y = 3
const ORIGIN: Point = { x: 0, y: 0 }

const woman = { word: 'woman', at: { x: -1, y: 1 }, color: '#0d9488' }
const man = { word: 'man', at: { x: 1, y: -1 }, color: '#65a30d' }
const king = { word: 'king', at: { x: 3, y: 1 }, color: '#d97706' }
const queen = { word: 'queen', at: { x: 2, y: 2 }, color: '#7c3aed' }
const vectors = [woman, man, king]
const points = [woman, man, king, queen]

const ticksX = Array.from({ length: 2 * MAX_X + 1 }, (_, i) => i - MAX_X)
const ticksY = Array.from({ length: 2 * MAX_Y + 1 }, (_, i) => i - MAX_Y)

const sx = (x: number) => x * UNIT
const sy = (y: number) => -y * UNIT // svg y grows downwards
const markerId = `${useId()}-arrow`

// Root of the draggable copy of "woman", in axis units.
const root = ref<Point>(ORIGIN)
const dragging = ref(false)
watch(() => props.step >= 1, solved => root.value = solved ? king.at : ORIGIN, { immediate: true })

const svg = ref<SVGSVGElement>()
let grab: { pointer: Point, root: Point } | undefined

function toAxis(e: PointerEvent): Point {
  const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(svg.value!.getScreenCTM()!.inverse())
  return { x: p.x / UNIT, y: -p.y / UNIT }
}

function onDown(e: PointerEvent) {
  (e.currentTarget as Element).setPointerCapture(e.pointerId)
  grab = { pointer: toAxis(e), root: root.value }
  dragging.value = true
}

function onMove(e: PointerEvent) {
  if (!grab)
    return
  const p = toAxis(e)
  root.value = { x: grab.root.x + p.x - grab.pointer.x, y: grab.root.y + p.y - grab.pointer.y }
}

function onUp() {
  grab = undefined
  dragging.value = false
}
</script>

<template>
  <div class="flex flex-col items-center">
    <svg
      ref="svg"
      :viewBox="`${-(MAX_X + 0.5) * UNIT} ${-(MAX_Y + 0.5) * UNIT} ${(2 * MAX_X + 1) * UNIT} ${(2 * MAX_Y + 1) * UNIT}`"
      height="340"
      class="select-none"
    >
      <defs>
        <marker
          v-for="v in vectors" :id="`${markerId}-${v.word}`" :key="v.word"
          viewBox="0 0 10 10" refX="9" refY="5" markerWidth="4" markerHeight="4" orient="auto"
        >
          <path d="M0,0 L10,5 L0,10 z" :fill="v.color" />
        </marker>
      </defs>

      <g stroke="currentColor" stroke-opacity="0.12">
        <line v-for="x in ticksX" :key="`gx${x}`" :x1="sx(x)" :x2="sx(x)" :y1="sy(-MAX_Y)" :y2="sy(MAX_Y)" />
        <line v-for="y in ticksY" :key="`gy${y}`" :y1="sy(y)" :y2="sy(y)" :x1="sx(-MAX_X)" :x2="sx(MAX_X)" />
      </g>
      <g stroke="currentColor" stroke-opacity="0.6" stroke-width="1.5">
        <line :x1="sx(-MAX_X)" :x2="sx(MAX_X)" y1="0" y2="0" />
        <line x1="0" x2="0" :y1="sy(-MAX_Y)" :y2="sy(MAX_Y)" />
      </g>
      <text :x="sx(MAX_X) - 4" y="-6" text-anchor="end" fill="currentColor" opacity="0.6">x</text>
      <text x="6" :y="sy(MAX_Y) + 14" fill="currentColor" opacity="0.6">y</text>

      <line
        v-for="v in vectors" :key="v.word"
        x1="0" y1="0" :x2="sx(v.at.x)" :y2="sy(v.at.y)"
        :stroke="v.color" stroke-width="3" :marker-end="`url(#${markerId}-${v.word})`"
      />

      <g v-for="p in points" :key="p.word" :fill="p.color">
        <circle :cx="sx(p.at.x)" :cy="sy(p.at.y)" r="5" />
        <text
          :x="sx(p.at.x) + (p.at.x < 0 ? -10 : 10)" :y="sy(p.at.y) - 10"
          :text-anchor="p.at.x < 0 ? 'end' : 'start'" font-weight="bold"
        >{{ p.word }}</text>
      </g>

      <g
        class="copy" :class="{ dragging }"
        :style="{ transform: `translate(${sx(root.x)}px, ${sy(root.y)}px)` }"
        @pointerdown="onDown" @pointermove="onMove" @pointerup="onUp" @pointercancel="onUp"
      >
        <!-- wide invisible line so the thin arrow is easy to grab -->
        <line x1="0" y1="0" :x2="sx(woman.at.x)" :y2="sy(woman.at.y)" stroke="transparent" stroke-width="20" />
        <line
          x1="0" y1="0" :x2="sx(woman.at.x)" :y2="sy(woman.at.y)"
          :stroke="woman.color" stroke-width="3" stroke-dasharray="6 4"
          :marker-end="`url(#${markerId}-woman)`"
        />
      </g>
    </svg>

    <p class="text-2xl mt-2">
      A <b :style="{ color: woman.color }">woman</b> <b :style="{ color: king.color }">king</b> is a
      <b v-if="step >= 1" :style="{ color: queen.color }">queen</b><span v-else>...</span>
    </p>
  </div>
</template>

<style scoped>
.copy {
  cursor: grab;
  transition: transform 0.8s ease-in-out;
}
.copy.dragging {
  cursor: grabbing;
  transition: none;
}
</style>
