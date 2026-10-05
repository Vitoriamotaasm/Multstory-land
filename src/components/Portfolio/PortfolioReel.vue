<script setup lang="ts">
/**
 * Card de um Reel na linha do tempo do portfólio.
 *
 * Compacto: miniatura vertical do Reel + informações ao lado.
 * - em repouso mostra cliente, título e o conceito;
 * - ativo (hover no desktop, toque no mobile) o vídeo roda e o conceito dá
 *   lugar à ficha "como foi produzido", no mesmo espaço — nada muda de tamanho.
 *
 * Todo o conteúdo vem de `item` (src/data/cases.ts).
 */
import { computed, ref, watch } from 'vue'
import { ArrowUpRight, Play } from 'lucide-vue-next'
import type { CaseStudy } from '../../types'

const props = defineProps<{
  item: CaseStudy
  index: number
  total: number
  /** lado da linha do tempo em que o card fica */
  side: 'left' | 'right'
  /** a câmera já passou por este Reel */
  reached: boolean
  active: boolean
}>()

const emit = defineEmits<{
  activate: []
  deactivate: []
  watch: []
}>()

const root = ref<HTMLElement | null>(null)
const video = ref<HTMLVideoElement | null>(null)

const number = computed(() => String(props.index + 1).padStart(2, '0'))
const total = computed(() => String(props.total).padStart(2, '0'))

/** o vídeo só substitui o poster quando realmente começa a rodar */
const playing = ref(false)

/**
 * Mouse → abre no hover e o clique na miniatura leva ao player.
 * Toque → o primeiro toque abre, o segundo fecha (não existe hover).
 * Decidido pelo tipo real do ponteiro, então funciona também em telas híbridas.
 */
let pointer = 'mouse'

function onPointerDown(event: PointerEvent) {
  pointer = event.pointerType
}

function onEnter(event: PointerEvent) {
  if (event.pointerType === 'mouse') emit('activate')
}

function onLeave(event: PointerEvent) {
  if (event.pointerType === 'mouse') emit('deactivate')
}

function onMediaClick(event: MouseEvent) {
  const keyboard = event.detail === 0

  if (pointer === 'mouse' || keyboard) emit('watch')
  else if (props.active) emit('deactivate')
  else emit('activate')
}

function onFocus(event: FocusEvent) {
  if ((event.target as HTMLElement).matches(':focus-visible')) emit('activate')
}

function onFocusOut(event: FocusEvent) {
  if (!root.value?.contains(event.relatedTarget as Node | null)) emit('deactivate')
}

let resetTimer: ReturnType<typeof setTimeout> | undefined

watch(
  () => props.active,
  (active) => {
    const element = video.value
    if (!element) return

    clearTimeout(resetTimer)

    if (active) {
      void element.play().catch(() => {})
    } else {
      element.pause()
      playing.value = false
      // volta ao início depois que o poster já cobriu o vídeo
      resetTimer = setTimeout(() => {
        element.currentTime = 0
      }, 500)
    }
  },
)
</script>

<template>
  <article
    ref="root"
    class="reel"
    :class="[`reel--${side}`, { 'is-reached': reached, 'is-active': active, 'is-playing': playing }]"
    @pointerdown="onPointerDown"
    @pointerenter="onEnter"
    @pointerleave="onLeave"
    @focusout="onFocusOut"
  >
    <!-- marco na linha do tempo -->
    <span class="reel__node" aria-hidden="true">{{ number }}</span>

    <div class="reel__card">
      <!-- MINIATURA -->
      <button
        type="button"
        class="reel__media"
        :aria-label="`Reel ${number} — ${item.client}: ${item.title}`"
        :aria-expanded="active"
        @focus="onFocus"
        @click="onMediaClick"
      >
        <img
          class="reel__poster"
          :src="item.poster"
          alt=""
          loading="lazy"
        />

        <video
          ref="video"
          class="reel__video"
          :src="item.video"
          muted
          loop
          playsinline
          preload="none"
          @playing="playing = active"
        />

        <span class="reel__shade" aria-hidden="true" />
        <span class="reel__flash" aria-hidden="true" />

        <span class="reel__play" aria-hidden="true">
          <Play :size="11" :stroke-width="1.6" />
        </span>

        <span class="reel__duration">{{ item.duration }}</span>
      </button>

      <!-- INFORMAÇÕES -->
      <div class="reel__body">
        <p class="reel__client">{{ item.client }}</p>

        <h3 class="reel__title">{{ item.title }}</h3>

        <p class="reel__meta">{{ item.caption }} · {{ number }}/{{ total }}</p>

        <div class="reel__detail">
          <p class="reel__concept">{{ item.concept }}</p>

          <!-- ficha de produção: ocupa o lugar do conceito quando o Reel está ativo -->
          <div class="reel__sheet" :aria-hidden="!active">
            <dl class="reel__rows">
              <div
                v-for="(detail, i) in item.production"
                :key="detail.label"
                class="reel__row"
                :style="{ '--i': i }"
              >
                <dt>{{ detail.label }}</dt>
                <dd>{{ detail.value }}</dd>
              </div>
            </dl>

            <button
              type="button"
              class="reel__watch"
              :tabindex="active ? 0 : -1"
              @click="emit('watch')"
            >
              <span>Assistir com som</span>
              <ArrowUpRight :size="12" :stroke-width="1.7" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <!-- marcas de enquadramento (visor da câmera) -->
      <span class="reel__frame reel__frame--tl" aria-hidden="true" />
      <span class="reel__frame reel__frame--tr" aria-hidden="true" />
      <span class="reel__frame reel__frame--bl" aria-hidden="true" />
      <span class="reel__frame reel__frame--br" aria-hidden="true" />
    </div>
  </article>
</template>
