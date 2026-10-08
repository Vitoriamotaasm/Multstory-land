<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { ArrowUpRight } from 'lucide-vue-next'

import { imageUrl } from '../../config/storage'

interface Case {
  category: string
  title: string
  description: string
  image: string
}

const cases: Case[] = [
  {
    category:
      'Sany: Máquinas pesadas - Randon: Implementação rodoviária',

    title: 'RANDON E SANY',

    description:
      'Randon a maior empresa nacional de implementação rodoviária. Sany a segunda maior fabricante de máquinas pesadas do mundo! A Baldessar maior representante do Nordeste dessas duas grandes marcas!',

    image: imageUrl('randonbaldessar.jpg'),
  },

  {
    category: 'Venda de veículos',

    title: 'RG MOTOCAR',

    description:
      'Uma das lojas de veículos novos e seminovos mais relevantes de Fortaleza. Com nosso serviço chegou a vender 52 veículos em 14 dias.',

    image: imageUrl('rgmotocar.jpg'),
  },

  {
    category: 'Segmento hidráulico e pneumático',

    title: 'BR HIDRÁULICA',

    description:
      'Empresa 100% cearense. Atua no ramo de mangueiras e engates hidráulicos e pneumáticos. Com 3 filiais no Ceará.',

    image: imageUrl('brhidraulica.jpg'),
  },
]

/* =========================================================
   ANIMAÇÕES DE ENTRADA
   ========================================================= */

const root = ref<HTMLElement | null>(null)
const visible = ref(false)

let observer: IntersectionObserver | null = null

onMounted(() => {
  const el = root.value

  if (!el) return

  if (
    !('IntersectionObserver' in window) ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    visible.value = true
    return
  }

  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.intersectionRatio >= 0.2) {
        visible.value = true
      } else if (!entry.isIntersecting) {
        visible.value = false
      }
    },
    {
      threshold: [0, 0.2],
    },
  )

  observer.observe(el)
})

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>

<template>
  <section
    id="projetos"
    ref="root"
    class="cases"
    :class="{ 'cases--visible': visible }"
    aria-labelledby="cases-heading"
  >
    <div class="cases__container">

      <!-- HEADER -->
      <header class="cases__header">
        <h2
          id="cases-heading"
          class="cases__title"
        >
          Histórias reais de marcas
          <br />
          extraordinárias<span class="cases__title-dot">.</span>
        </h2>

        <a
          href="#cases"
          class="cases__link"
        >
          <span>Ver todos os cases</span>

          <ArrowUpRight
            :size="15"
            :stroke-width="1.8"
            aria-hidden="true"
          />
        </a>
      </header>

      <!-- CASES -->
      <div class="cases__grid">
        <article
          v-for="(item, index) in cases"
          :key="item.title"
          class="case-card"
          :style="{ '--i': index }"
        >
          <div class="case-card__image-wrapper">
            <img
              :src="item.image"
              :alt="`Projeto ${item.title}`"
              class="case-card__image"
              loading="lazy"
            />
          </div>

          <div class="case-card__content">
            <span class="case-card__category">
              {{ item.category }}
            </span>

            <div class="case-card__row">
              <h3 class="case-card__title">
                {{ item.title }}
              </h3>

              <ArrowUpRight
                class="case-card__arrow"
                :size="18"
                :stroke-width="1.6"
                aria-hidden="true"
              />
            </div>

            <p class="case-card__description">
              {{ item.description }}
            </p>
          </div>
        </article>
      </div>

    </div>
  </section>
</template>

<style src="./Cases.css"></style>