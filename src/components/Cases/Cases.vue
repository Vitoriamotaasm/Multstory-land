<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { ArrowUpRight } from 'lucide-vue-next'

interface Case {
  category: string
  title: string
  description: string
  image: string
}

const cases: Case[] = [
  {
    category: 'BRANDING & WEB',
    title: 'Aura Luxury Brand',
    description:
      'Redefinição completa da identidade visual e desenvolvimento de e-commerce de alto padrão resultando em 120% de aumento em vendas.',
    image: './src/assets/foto/project-image.png',
  },
  {
    category: 'GROWTH & PERFORMANCE',
    title: 'Nexus Fintech',
    description:
      'Estratégia de aquisição multicanal e funil de tráfego pago que escalou a base de usuários ativos da fintech de 10k para 80k.',
    image: '/src/assets/foto/nexus-fintech.png',
  },
  {
    category: 'BRANDING & SOCIAL MEDIA',
    title: 'Vora Cosméticos',
    description:
      'Campanha global de reposicionamento com foco no público premium, unindo minimalista e parcerias com influenciadores de elite.',
    image: '/src/assets/foto/vara-cosmeticos.png',
  },
]

/* Animações de entrada: disparam quando a seção aparece na tela
   e reiniciam quando ela sai por completo (mesmo padrão do FAQ). */
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
      if (entry.intersectionRatio >= 0.2) visible.value = true
      else if (!entry.isIntersecting) visible.value = false
    },
    { threshold: [0, 0.2] },
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
        <div class="cases__heading">

          

          <h2
            id="cases-heading"
            class="cases__title"
          >
            Histórias reais de marcas
            <br />
            extraordinárias
          </h2>

        </div>

        <a
          href="#cases"
          class="cases__button"
        >
          <span>Ver Todos os Cases</span>

          <ArrowUpRight
            :size="13"
            :stroke-width="1.6"
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

            <div
              class="case-card__image-overlay"
              aria-hidden="true"
            />

            <span class="case-card__arrow">
              <ArrowUpRight
                :size="14"
                :stroke-width="1.7"
              />
            </span>
          </div>

          <div class="case-card__content">

            <span class="case-card__category">
              {{ item.category }}
            </span>

            <h3 class="case-card__title">
              {{ item.title }}
            </h3>

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