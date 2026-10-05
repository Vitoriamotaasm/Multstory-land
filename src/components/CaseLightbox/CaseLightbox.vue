<style src="./CaseLightbox.css"></style>

<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'
import { X } from 'lucide-vue-next'
import type { CaseStudy } from '../../types'
import { useBodyScrollLock } from '../../composables/useBodyScrollLock'
import { useEscapeKey } from '../../composables/useEscapeKey'

const props = defineProps<{ caseStudy: CaseStudy }>()
const emit = defineEmits<{ close: [] }>()
const closeButton = ref<HTMLButtonElement | null>(null)

function close() {
  emit('close')
}

useBodyScrollLock()
useEscapeKey(close)

onMounted(() => {
  void nextTick(() => closeButton.value?.focus())
})
</script>

<template>
  <Teleport to="body">
    <div
      class="case-lightbox fixed inset-0 z-[200] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-lightbox-title"
      @click="close"
    >
      <div class="absolute inset-0 bg-black/85 backdrop-blur-md" aria-hidden="true" />

      <div class="relative z-10 w-full max-w-[420px]" @click.stop>
        <header class="mb-3 flex items-end justify-between gap-4">
          <div class="min-w-0">
            <p class="mb-1 text-[10px] uppercase tracking-[3px] text-neon-purple">{{ props.caseStudy.client }}</p>
            <h2 id="case-lightbox-title" class="heading-display truncate text-xl text-white md:text-2xl">{{ props.caseStudy.title }}</h2>
          </div>

          <button ref="closeButton" type="button" aria-label="Fechar vídeo" class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-gray-400 hover:border-neon-purple/50 hover:text-white" @click="close">
            <X :size="16" aria-hidden="true" />
          </button>
        </header>

        <div class="relative mx-auto aspect-[9/16] max-h-[78vh] w-full overflow-hidden rounded-2xl border border-neon-purple/30 bg-black shadow-[0_0_80px_rgba(189,0,255,0.2)]">
          <video class="h-full w-full bg-black object-contain" :src="props.caseStudy.video" :poster="props.caseStudy.poster" controls autoplay playsinline />
        </div>
      </div>
    </div>
  </Teleport>
</template>
