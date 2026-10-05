<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import {
  Palette,
  Share2,
  Layers3,
  TrendingUp,
  Monitor,
} from 'lucide-vue-next'

interface Service {
  title: string
  description: string
  icon: typeof Palette
}

const services: Service[] = [
  {
    title: 'Identidade de Marca',
    description:
      'Posicionamento estético e conceitual que separa sua marca da concorrência comum.',
    icon: Palette,
  },
  {
    title: 'Social Media ',
    description:
      'Criação de conteúdo magnético focado em autoridade, engajamento e conexão.',
    icon: Share2,
  },
  {
    title: 'Design',
    description:
      'Interfaces, embalagens e identidades visuais focadas em sofisticação e impacto.',
    icon: Layers3,
  },
  {
    title: 'Tráfego Pago',
    description:
      'Campanhas ultra-otimizadas com foco em ROI, aquisição de novos clientes e escala de vendas.',
    icon: TrendingUp,
  },
  {
    title: 'Websites',
    description:
      'Desenvolvimento de páginas velozes, seguras e estrategicamente desenhadas para converter.',
    icon: Monitor,
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
    id="servicos"
    ref="root"
    class="services"
    :class="{ 'services--visible': visible }"
    aria-labelledby="services-heading"
  >
    <div class="services__container">

      <header class="services__header">
        

        <h2
          id="services-heading"
          class="services__title"
        >
          Soluções completas para sua marca
        </h2>

        <p class="services__intro">
          Do conceito criativo à execução tática. Cuidamos de todos os pontos de
          <br class="services__desktop-break" />
          contato da sua jornada digital.
        </p>
      </header>

      <div class="services__grid">
        <article
          v-for="(service, index) in services"
          :key="service.title"
          class="service-card"
          :class="{
            'service-card--wide': index >= 3,
          }"
          :style="{ '--i': index }"
        >
          <div class="service-card__icon">
            <component
              :is="service.icon"
              :size="15"
              :stroke-width="1.5"
              aria-hidden="true"
            />
          </div>

          <div class="service-card__content">
            <h3 class="service-card__title">
              {{ service.title }}
            </h3>

            <p class="service-card__description">
              {{ service.description }}
            </p>
          </div>
        </article>
      </div>

    </div>
  </section>
</template>

<style src="./Servicos.css"></style>