<script setup lang="ts">
// The agent loop as a picture: You on the left, the agent (the harness: Claude Code / opencode) in the
// middle, the LLM and the Tools on the right. The LLM and the Tools never talk to each other: every
// message goes through the agent. The default slot is drawn inside the agent's frame (the growing context).
import { useId, useSlots } from 'vue'

export type Edge = 'ask' | 'answer' | 'send' | 'reply' | 'run' | 'result'

defineProps<{
  active?: Edge // edge drawn in colour, with moving dashes
  steer?: boolean // show the numbered steering points used on the "Where you steer" slide
}>()

// Wide when there is something to pile up in the frame; compact otherwise, to fit half a slide.
const wide = !!useSlots().default
const FRAME_W = wide ? 420 : 140
const GAP = wide ? 110 : 90 // room for the arrows and their labels
const NODE_W = 120
const NODE_H = 50
const HEIGHT = 320

const frameX = NODE_W + GAP
const frameRight = frameX + FRAME_W
const rightX = frameRight + GAP
const WIDTH = rightX + NODE_W

const NODES = [
  { label: '👤 You', x: 0, y: 160 },
  { label: '🧠 LLM', x: rightX, y: 80 },
  { label: '🛠 Tools', x: rightX, y: 240 },
]

// Each pair talks over two parallel arrows; the label sits on the outer side of its arrow.
const arrow = (id: Edge, from: number, to: number, y: number, label: string, above: boolean) =>
  ({ id, d: `M ${from} ${y} L ${to} ${y}`, label, lx: (from + to) / 2, ly: above ? y - 8 : y + 19 })

const EDGES = [
  arrow('ask', NODE_W, frameX - 2, 149, 'your request', true),
  arrow('answer', frameX, NODE_W + 2, 171, 'answer', false),
  arrow('send', frameRight, rightX - 2, 69, 'history', true),
  arrow('reply', rightX, frameRight + 2, 91, 'text', false),
  arrow('run', frameRight, rightX - 2, 229, 'run tool', true),
  arrow('result', rightX, frameRight + 2, 251, 'result', false),
]

// Steering points: where a person can step in (numbers match the list on the slide).
// Badges on an arrow sit just clear of its label.
const STEER = [
  { n: 1, x: (NODE_W + frameX) / 2, y: 113 }, // your request
  { n: 2, x: frameX + FRAME_W / 2, y: 120 }, // the rules file, read by the agent at every start
  { n: 3, x: (frameRight + rightX) / 2, y: 193 }, // approve or refuse a tool call
  { n: 4, x: frameX + FRAME_W / 2, y: 200 }, // interrupt the agent with Esc
  { n: 5, x: (NODE_W + frameX) / 2, y: 210 }, // review the answer
]

const marker = useId()
</script>

<template>
  <svg :viewBox="`0 0 ${WIDTH} ${HEIGHT}`" class="select-none">
    <defs>
      <marker
        v-for="m in ['idle', 'on']" :id="`${marker}-${m}`" :key="m"
        viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto"
      >
        <path d="M0,0 L10,5 L0,10 z" :style="{ fill: m === 'on' ? 'var(--hyf-accent)' : '#9ca3af' }" />
      </marker>
    </defs>

    <rect :x="frameX" y="5" :width="FRAME_W" :height="HEIGHT - 10" rx="16" class="frame" />
    <text :x="frameX + FRAME_W / 2" y="34" text-anchor="middle" fill="currentColor" style="font-size: 17px; font-weight: bold">
      🤖 The agent
    </text>
    <text :x="frameX + FRAME_W / 2" y="52" text-anchor="middle" fill="currentColor" opacity="0.6" style="font-size: 12px">
      Claude Code / opencode
    </text>
    <foreignObject v-if="$slots.default" :x="frameX + 12" y="62" :width="FRAME_W - 24" :height="HEIGHT - 74">
      <slot />
    </foreignObject>

    <g v-for="e in EDGES" :key="e.id">
      <path
        :d="e.d" fill="none" class="edge" :class="{ on: e.id === active }"
        :marker-end="`url(#${marker}-${e.id === active ? 'on' : 'idle'})`"
      />
      <text
        :x="e.lx" :y="e.ly" text-anchor="middle" style="font-size: 13px"
        class="edge-label" :class="{ on: e.id === active }"
      >{{ e.label }}</text>
    </g>

    <g v-for="n in NODES" :key="n.label">
      <rect :x="n.x" :y="n.y - NODE_H / 2" :width="NODE_W" :height="NODE_H" rx="10" class="node" />
      <text :x="n.x + NODE_W / 2" :y="n.y + 6" text-anchor="middle" fill="currentColor" style="font-size: 17px; font-weight: bold">
        {{ n.label }}
      </text>
    </g>

    <g v-if="steer">
      <g v-for="s in STEER" :key="s.n">
        <circle :cx="s.x" :cy="s.y" r="13" style="fill: var(--hyf-accent)" />
        <text :x="s.x" :y="s.y + 5" text-anchor="middle" fill="white" style="font-size: 14px; font-weight: bold">{{ s.n }}</text>
      </g>
    </g>
  </svg>
</template>

<style scoped>
.frame {
  fill: var(--hyf-tint);
  stroke: currentColor;
  stroke-opacity: 0.35;
  stroke-width: 1.5;
  stroke-dasharray: 6 5;
}
.node {
  fill: white;
  stroke: currentColor;
  stroke-opacity: 0.5;
  stroke-width: 1.5;
}
.edge {
  stroke: #9ca3af;
  stroke-width: 2;
  transition: stroke 0.2s;
}
.edge-label {
  fill: currentColor;
  opacity: 0.6;
}
.edge-label.on {
  fill: var(--hyf-accent);
  opacity: 1;
  font-weight: bold;
}
.edge.on {
  stroke: var(--hyf-accent);
  stroke-width: 3.5;
  stroke-dasharray: 9 6;
  animation: march 0.6s linear infinite;
}
@keyframes march {
  to {
    stroke-dashoffset: -15;
  }
}
</style>
