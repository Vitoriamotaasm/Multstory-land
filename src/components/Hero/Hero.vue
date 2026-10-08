<style src="./Hero.css"></style>

<script setup lang="ts">
import { ref } from 'vue'
import { ArrowUpRight } from 'lucide-vue-next'

import { videoUrl } from '../../config/storage'

// Serviços que aparecem no letreiro do rodapé do Hero
const services = [
  'Produção de Vídeos',
  'Design Gráfico',
  'Social Media',
  'Sites e Landing Pages',
  'Gestão de Mídias Digitais',
]

// Luz que segue o mouse dentro do título
const titleText = ref<HTMLElement | null>(null)

function onPointerMove(e: PointerEvent) {
  const el = titleText.value

  if (!el) return

  const r = el.getBoundingClientRect()

  el.style.setProperty('--mx', `${e.clientX - r.left}px`)
  el.style.setProperty('--my', `${e.clientY - r.top}px`)
}

function onPointerLeave() {
  const el = titleText.value

  if (!el) return

  el.style.removeProperty('--mx')
  el.style.removeProperty('--my')
}
</script>

<template>
  <section
    id="inicio"
    class="hero"
    aria-labelledby="hero-heading"
    @pointermove="onPointerMove"
    @pointerleave="onPointerLeave"
  >
    <!-- =====================================================
         BACKGROUND
         ===================================================== -->

    <video
      class="hero__video"
      :src="videoUrl('hero-bg.mp4')"
      autoplay
      loop
      muted
      playsinline
      preload="metadata"
      aria-hidden="true"
    ></video>

    <div
      class="hero__noise"
      aria-hidden="true"
    ></div>

    <div
      class="hero__gradient"
      aria-hidden="true"
    ></div>

    <!-- =====================================================
         GRID
         ===================================================== -->

    <div
      class="hero__grid"
      aria-hidden="true"
    >
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>

    <div class="hero__container">

      <!-- ===================================================
           TOPO
           =================================================== -->

      <div class="hero__meta"></div>

      <!-- ===================================================
           COMPOSIÇÃO PRINCIPAL
           =================================================== -->

      <div class="hero__main">

        <!-- =================================================
             ESQUERDA
             ================================================= -->

        <div class="hero__content">

          <!-- TÍTULO -->

          <h1
            id="hero-heading"
            class="hero__title hero__title--enter"
          >
            <span
              ref="titleText"
              class="hero__title-text"
            >
              <span class="hero__m">M</span>arketing
              <br />
              que <span class="hero__m">m</span>ove
              <br />
              <span class="hero__m">m</span>arcas<span
                class="hero__title-dot"
              >.</span>
            </span>

            <svg
              class="hero__title-fx"
              aria-hidden="true"
              focusable="false"
            >
              <path
                class="hero__zig-line"
                pathLength="1000"
              />

              <path
                class="hero__zig-head"
              />
            </svg>
          </h1>

          <!-- =================================================
               BOTÕES
               ================================================= -->

          <div class="hero__action">
            <div class="hero__buttons">

              <!-- BOTÃO PRINCIPAL -->

              <a
                class="hero__button"
                href="#contato"
              >
                Solicitar Orçamento

                <ArrowUpRight
                  :size="16"
                  aria-hidden="true"
                />
              </a>

              <!-- BOTÃO CASES -->

              <a
                class="hero__button hero__button--cases"
                href="#portfolio"
              >
                Ver Cases

                <ArrowUpRight
                  :size="16"
                  aria-hidden="true"
                />
              </a>

            </div>
          </div>

        </div>

        <!-- =================================================
             DIREITA — CARD LAVANDA
             ================================================= -->

        <div
          class="hero__visual hero__visual-fade"
        >

          <!-- ABA AZUL -->

          <a
            class="hero__visual-tab"
            href="#portfolio"
            aria-label="Ver portfólio"
          >
            <ArrowUpRight
              :size="22"
              aria-hidden="true"
            />
          </a>

          <!-- HEADER -->

          <div
            class="hero__visual-header hero__visual-fade"
          >
            <span>MultStory®</span>
            <span>Creative Studio</span>
          </div>

          <!-- STAGE -->

          <div class="hero__visual-stage">

            <!-- FRAME -->

            <div
              class="hero__visual-frame hero__visual-fade"
            >

              <div class="hero__visual-image"></div>

              <!-- LENTE DE CÂMERA -->

              <div
                class="hero__visual-lens"
                aria-hidden="true"
              ></div>

              <!-- OVERLAY -->

              <div
                class="hero__visual-overlay"
                aria-hidden="true"
              ></div>

              <!-- CROSS SUPERIOR -->

              <div
                class="
                  hero__visual-cross
                  hero__visual-cross--top
                "
                aria-hidden="true"
              ></div>

              <!-- CROSS INFERIOR -->

              <div
                class="
                  hero__visual-cross
                  hero__visual-cross--bottom
                "
                aria-hidden="true"
              ></div>

              <!-- HUD -->

              <div class="hero__visual-label">

                <span>
                  <i
                    class="hero__rec"
                    aria-hidden="true"
                  ></i>

                  REC
                </span>

                <span>
                  35MM · F/1.8
                </span>

              </div>

            </div>

            <!-- CONTORNO DE LUZ -->

            <svg
              class="hero__frame-fx"
              aria-hidden="true"
              focusable="false"
            >
              <path
                class="hero__frame-line"
                pathLength="1000"
              />

              <path
                class="hero__frame-comet-glow"
                pathLength="1000"
              />

              <path
                class="hero__frame-comet"
                pathLength="1000"
              />
            </svg>

          </div>

          <!-- FOOTER DO CARD -->

          <div
            class="
              hero__visual-footer
              hero__visual-fade
            "
          >
            <span>
              Creative Direction
            </span>

            <span class="hero__visual-arrow">
              ↗
            </span>
          </div>

        </div>

      </div>

      <!-- ===================================================
           LETREIRO DE SERVIÇOS
           =================================================== -->

      <div
        class="hero__marquee"
        aria-label="Serviços"
      >

        <div class="hero__marquee-track">

          <!-- PRIMEIRO GRUPO -->

          <ul class="hero__marquee-group">

            <li
              v-for="s in services"
              :key="s"
            >
              {{ s }}
            </li>

          </ul>

          <!-- SEGUNDO GRUPO — DUPLICADO PARA LOOP -->

          <ul
            class="hero__marquee-group"
            aria-hidden="true"
          >

            <li
              v-for="s in services"
              :key="`dup-${s}`"
            >
              {{ s }}
            </li>

          </ul>

        </div>

      </div>

    </div>
  </section>
</template>