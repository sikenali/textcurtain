# textcurtain-vue

An interactive canvas-based text curtain built with Vue 3, inspired by the hanging ink curtain effect from [Budrina — Roofs of the World]https://github.com/aigc17/Chinese-PhoenixCrown).

Chinese characters hang in vertical strands pinned to the bottom contour of an image. Moving the mouse parts the strands like fabric, with Verlet integration physics for natural sway. Optional audio feedback plays when the curtain is brushed quickly.

## Features

- **Verlet physics simulation** — strands sway and spring back naturally
- **Contour-based anchoring** — characters hang from any image's bottom edge
- **Multi-color ink palette** — cycle through custom colors per strand
- **Luminous mode** — dark background with soft glow effect
- **Mouse interaction** — move fast to part the curtain; fast movement triggers brush sounds
- **Avoid regions** — fade characters behind specific DOM elements
- **Vue 3 Composition API** — clean `<script setup>` integration

## Install

```bash
npm install text-curtain-vue
```

## Usage

### Basic

```vue
<script setup lang="ts">
import { TextCurtain } from 'text-curtain-vue'
</script>

<template>
  <TextCurtain
    charPool="凤冠霞帔金翠蓝宝珠玉花翎"
    :inkAlpha="0.62"
    :colors="['#7d9bf0', '#e8c46a', '#f2ecdc']"
    :luminous="false"
    style="width: 100%; height: 500px"
  />
</template>
```

### With contour image

Characters hang from the image's bottom edge:

```vue
<script setup lang="ts">
import { TextCurtain } from 'text-curtain-vue'
</script>

<template>
  <div style="position: relative">
    <img
      id="roof-image"
      src="/crown.png"
      alt=""
      style="width: 400px"
    />
    <div style="position: absolute; inset: 0">
      <TextCurtain
        charPool="凤冠霞帔金翠蓝宝"
        contourSelector="#roof-image"
        :luminous="true"
      />
    </div>
  </div>
</template>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `charPool` | `string` | — (required) | Pool of characters to display in the curtain |
| `className` | `string` | — | CSS class applied to the canvas element |
| `color` | `string` | `'#4a3a28'` | Single ink color (used when `colors` is empty) |
| `colors` | `string[]` | — | Array of ink colors; strands cycle through the palette |
| `inkAlpha` | `number` | `0.62` | Base opacity of characters (0–1). Use ~0.62 for light backgrounds, ~1 for dark |
| `luminous` | `boolean` | `false` | Enable dark-scene mode with heavier stroke weight and soft glow |
| `contourSelector` | `string` | — | CSS selector for an `<img>` element; curtain hangs from its bottom pixel edge |
| `avoidSelector` | `string` | — | CSS selector for elements behind which the curtain gradually fades out |

## Audio

Sound effects are imported separately:

```ts
import { playCurtainBrush, unlockCurtainAudio } from 'text-curtain-vue/useCurtainAudio'

// Call on first user gesture (click / tap) to unlock audio context
unlockCurtainAudio()

// Play a brush sound with intensity 0–1
playCurtainBrush(0.5)
```

## How It Works

1. **Character atlas** — all unique characters × colors are pre-rendered onto an offscreen canvas for GPU-accelerated batch drawing.
2. **Strand construction** — columns of nodes are generated from the image contour downward, each node storing position, velocity, and home coordinates.
3. **Physics loop** — Verlet integration simulates spring forces toward home positions, damping, breeze oscillation, and mouse repulsion. Constraint solving keeps adjacent nodes at fixed distances.
4. **Rendering** — the atlas is drawn per-node with per-character rotation derived from the angle to its predecessor in the strand.

## Browser Support

Modern browsers with Canvas 2D and `requestAnimationFrame` support. Tested on Chrome, Firefox, Safari, and Edge.

## License

MIT
