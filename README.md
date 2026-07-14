# text-curtain-vue

Interactive canvas text curtain with Verlet physics — a Vue 3 port of the hanging ink curtain from [Budarina — Roofs of the World](https://github.com/jingle/Chinese-PhoenixCrown).

Chinese characters hang in vertical strands pinned to an image's bottom contour. Mouse movement parts the strands like fabric, with sway physics and optional audio feedback.

## Install

```bash
npm install text-curtain-vue
```

## Usage

```vue
<script setup lang="ts">
import { TextCurtain } from 'text-curtain-vue'
</script>

<template>
  <TextCurtain
    charPool="凤冠霞帔金翠蓝宝珠玉花翎"
    :inkAlpha="0.62"
    :colors="['#7d9bf0', '#e8c46a', '#f2ecdc']"
    :luminous="true"
    contourSelector="#my-image"
    style="width: 100%; height: 500px"
  />
</template>
```

With a contour image (strands hang from the image's bottom edge):

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
| `charPool` | `string` | — (required) | Characters that form the hanging curtain |
| `className` | `string` | — | CSS class for the canvas |
| `color` | `string` | `'#4a3a28'` | Uniform ink color (used when `colors` is empty) |
| `colors` | `string[]` | — | Multi-color ink palette; strands cycle through these |
| `inkAlpha` | `number` | `0.62` | Base ink opacity (0–1). Light scenes: ~0.62, dark: ~1 |
| `luminous` | `boolean` | `false` | Dark-scene mode: heavier stroke + soft glow |
| `contourSelector` | `string` | — | CSS selector for an `<img>` whose bottom contour the curtain hangs from |
| `avoidSelector` | `string` | — | CSS selector for elements behind which the curtain fades |

## Audio

Imported separately:

```ts
import { playCurtainBrush, unlockCurtainAudio } from 'text-curtain-vue/useCurtainAudio'

// unlock on first user gesture
unlockCurtainAudio()
// play a brush sound (intensity 0–1)
playCurtainBrush(0.5)
```

## License

MIT
