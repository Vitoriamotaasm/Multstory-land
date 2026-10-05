<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { Aperture, ArrowUpRight, Camera } from 'lucide-vue-next'
import { cases } from '../../data/cases'

/* Dados de "clique" exibidos em cada foto — troque à vontade. */
const shots = [
  { lens: '35mm', aperture: 'f/1.8', shutter: '1/250', iso: 'ISO 200' },
  { lens: '50mm', aperture: 'f/2.2', shutter: '1/160', iso: 'ISO 320' },
  { lens: '24mm', aperture: 'f/2.8', shutter: '1/125', iso: 'ISO 400' },
  { lens: '85mm', aperture: 'f/1.4', shutter: '1/500', iso: 'ISO 100' },
]

const NODE_OFFSET = 62 // centro do marcador numerado dentro de cada item (px)

const track = ref<HTMLElement | null>(null)
const itemEls = ref<HTMLElement[]>([])
const fill = ref(0)
const reached = ref(-1)
const flash = ref(-1)

let frame = 0
let flashTimer: number | undefined

const pad = (n: number) => String(n).padStart(2, '0')
const shot = (i: number) => shots[i % shots.length]

function setItem(el: unknown, index: number) {
  if (el instanceof HTMLElement) itemEls.value[index] = el
}

function measure() {
  frame = 0

  const el = track.value
  if (!el) return

  const rect = el.getBoundingClientRect()
  const focus = window.innerHeight * 0.55

  fill.value = Math.min(Math.max(focus - rect.top, 0), rect.height)

  let last = -1
  itemEls.value.forEach((item, index) => {
    if (fill.value >= item.offsetTop + NODE_OFFSET) last = index
  })

  if (last > reached.value) {
    // "disparo" da câmera quando um novo case entra em foco
    flash.value = last
    window.clearTimeout(flashTimer)
    flashTimer = window.setTimeout(() => (flash.value = -1), 520)
  }

  reached.value = last
}

function schedule() {
  if (!frame) frame = requestAnimationFrame(measure)
}

function play(event: Event) {
  const video = (event.currentTarget as HTMLElement).querySelector('video')
  video?.play().catch(() => {})
}

function pause(event: Event) {
  const video = (event.currentTarget as HTMLElement).querySelector('video')
  video?.pause()
}

onMounted(() => {
  measure()
  window.addEventListener('scroll', schedule, { passive: true })
  window.addEventListener('resize', schedule)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', schedule)
  window.removeEventListener('resize', schedule)
  cancelAnimationFrame(frame)
  window.clearTimeout(flashTimer)
})
</script>

<template>
  <section
    id="portfolio"
    class="portfolio"
    aria-labelledby="portfolio-heading"
  >
    <div class="portfolio__glow" aria-hidden="true"></div>

    <div class="portfolio__container">

      <!-- HEADER -->
      <header class="portfolio__header">
        <div class="portfolio__eyebrow">
          <span class="portfolio__eyebrow-line"></span>
          <Aperture :size="13" :stroke-width="1.6" aria-hidden="true" />
          <span>Portfólio</span>
          <span class="portfolio__eyebrow-line"></span>
        </div>

        <h2 id="portfolio-heading" class="portfolio__heading">
          Trabalhos que <span>ganharam vida.</span>
        </h2>

        <p class="portfolio__intro">
          Cada projeto é um clique: estratégia, direção e produção
          enquadradas para a marca aparecer do jeito certo.
        </p>
      </header>

      <!-- TIMELINE -->
      <div
        ref="track"
        class="portfolio__track"
        :style="{ '--fill': `${fill}px` }"
      >
        <div class="portfolio__line" aria-hidden="true">
          <span class="portfolio__line-fill"></span>
        </div>

        <span
          class="portfolio__lens"
          :class="{ 'is-visible': fill > 0 }"
          aria-hidden="true"
        >
          <Camera :size="19" :stroke-width="1.8" />
        </span>

        <article
          v-for="(item, index) in cases"
          :key="item.client"
          :ref="(el) => setItem(el, index)"
          class="shot"
          :class="{
            'shot--right': index % 2 === 1,
            'is-active': index <= reached,
          }"
        >
          <span class="shot__node" aria-hidden="true">
            {{ pad(index + 1) }}
          </span>

          <div class="shot__card">
            <button
              type="button"
              class="shot__media"
              :aria-label="`Abrir projeto ${item.client}`"
              @mouseenter="play"
              @mouseleave="pause"
              @focus="play"
              @blur="pause"
            >
              <img
                :src="item.poster"
                :alt="`${item.client} — ${item.title}`"
                class="shot__poster"
                loading="lazy"
              />

              <video
                class="shot__video"
                :src="item.video"
                muted
                loop
                playsinline
                preload="none"
              ></video>

              <span class="shot__shade" aria-hidden="true"></span>

              <!-- VISOR -->
              <span class="shot__finder" aria-hidden="true">
                <i></i><i></i><i></i><i></i>
                <b class="shot__reticle"></b>
              </span>

              <span class="shot__rec" aria-hidden="true">
                <i></i> REC
              </span>

              <span class="shot__frame" aria-hidden="true">
                {{ pad(index + 1) }} / {{ pad(cases.length) }}
              </span>

              <span class="shot__exif" aria-hidden="true">
                <span>{{ shot(index).lens }}</span>
                <span>{{ shot(index).aperture }}</span>
                <span>{{ shot(index).shutter }}</span>
                <span>{{ shot(index).iso }}</span>
              </span>

              <span class="shot__open" aria-hidden="true">
                <ArrowUpRight :size="16" :stroke-width="1.6" />
              </span>

              <span
                class="shot__flash"
                :class="{ 'is-firing': flash === index }"
                aria-hidden="true"
              ></span>
            </button>

            <div class="shot__body">
              <span class="shot__client">{{ item.client }}</span>
              <h3 class="shot__title">{{ item.title }}</h3>
              <p class="shot__caption">{{ item.caption }}</p>
            </div>
          </div>
        </article>
      </div>

      <!-- FOOTER -->
      <footer class="portfolio__footer">
        <span class="portfolio__footer-label">MULTSTORY®</span>
        <span class="portfolio__footer-line"></span>
        <span>Estratégia · Design · Tecnologia</span>
      </footer>

    </div>
  </section>
</template>

<style src="./Portfolio.css"></style>