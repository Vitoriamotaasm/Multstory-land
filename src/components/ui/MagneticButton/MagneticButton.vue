<style src="./MagneticButton.css"></style>

<script setup lang="ts">
import { computed, ref } from 'vue'

interface Props {
  href: string
  variant?: 'primary' | 'solid'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
})

const position = ref({ x: 0, y: 0 })

const classes = computed(() =>
  props.variant === 'solid'
    ? 'bg-neon-purple text-white shadow-[0_0_50px_rgba(189,0,255,0.5)]'
    : 'bg-gradient-to-r from-violet-600 to-purple-500 text-white shadow-[0_0_30px_rgba(139,92,246,0.4)] hover:shadow-[0_0_50px_rgba(139,92,246,0.6)]',
)

function move(event: MouseEvent) {
  const element = event.currentTarget as HTMLElement
  const rect = element.getBoundingClientRect()

  position.value = {
    x: (event.clientX - (rect.left + rect.width / 2)) * 0.12,
    y: (event.clientY - (rect.top + rect.height / 2)) * 0.12,
  }
}

function reset() {
  position.value = { x: 0, y: 0 }
}
</script>

<template>
  <a
    :href="href"
    target="_blank"
    rel="noopener noreferrer"
    class="relative inline-flex items-center justify-center gap-2 rounded-full font-bold transition-all duration-200 will-change-transform"
    :class="classes"
    :style="{ transform: `translate(${position.x}px, ${position.y}px)` }"
    @mousemove="move"
    @mouseleave="reset"
  >
    <slot />
  </a>
</template>
