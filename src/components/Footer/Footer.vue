<style src="./Footer.css"></style>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { ArrowUp, ArrowUpRight, Instagram, MessageCircle } from 'lucide-vue-next'

import { site } from '../../config/site'
import { navigationItems } from '../Navbar/navigation'

const currentYear = new Date().getFullYear()

const root = ref<HTMLElement | null>(null)
const visible = ref(false)
let observer: IntersectionObserver | null = null

/* Anima ao entrar na tela e reinicia quando sai (mesmo padrão do FAQ) */
onMounted(() => {
  const el = root.value
  if (!el) return

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    visible.value = true
    return
  }

  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.intersectionRatio >= 0.3) visible.value = true
      else if (!entry.isIntersecting) visible.value = false
    },
    { threshold: [0, 0.3] },
  )
  observer.observe(el)
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <footer
    ref="root"
    class="footer"
    :class="{ 'footer--visible': visible }"
    aria-label="Rodapé"
  >
    <div class="footer__glow" aria-hidden="true" />

    <div class="footer__container">

      <div class="footer__top">

        <!-- Marca (entra pela esquerda) -->
        <div class="footer__brand">

          <p class="footer__tagline">
            Estratégia, conteúdo e audiovisual para marcas que querem ser lembradas.
          </p>

          <a
            :href="site.whatsapp"
            target="_blank"
            rel="noopener noreferrer"
            class="footer__cta"
          >
            Solicitar Orçamento
            <ArrowUpRight :size="16" stroke-width="2" aria-hidden="true" />
          </a>
        </div>

        <!-- Navegação (sobe) -->
        <nav class="footer__column footer__column--nav" aria-label="Navegação do rodapé">
          <h3 class="footer__heading">Navegação</h3>

          <ul class="footer__list">
            <li v-for="(item, index) in navigationItems" :key="item.href" :style="{ '--i': index }">
              <a :href="item.href" class="footer__link">{{ item.label }}</a>
            </li>
          </ul>
        </nav>

        <!-- Contato (entra pela direita) -->
        <div class="footer__column footer__column--contact">
          <h3 class="footer__heading">Contato</h3>

          <ul class="footer__list">
            <li :style="{ '--i': 0 }">
              <a :href="site.whatsapp" target="_blank" rel="noopener noreferrer" class="footer__link footer__link--icon">
                <MessageCircle :size="16" stroke-width="1.8" aria-hidden="true" />
                WhatsApp
              </a>
            </li>

            <li :style="{ '--i': 1 }">
              <a :href="site.instagram" target="_blank" rel="noopener noreferrer" class="footer__link footer__link--icon">
                <Instagram :size="16" stroke-width="1.8" aria-hidden="true" />
                Instagram
              </a>
            </li>

            <li :style="{ '--i': 2 }">
              <a :href="site.login" target="_blank" rel="noopener noreferrer" class="footer__link footer__link--icon">
                <ArrowUpRight :size="16" stroke-width="1.8" aria-hidden="true" />
                Área do cliente
              </a>
            </li>
          </ul>
        </div>

      </div>

      <!-- Nome gigante: SVG com textLength, sempre cabe inteiro na largura -->
      <div class="footer__wordmark" aria-hidden="true">
        <svg viewBox="0 0 1000 200" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="wmFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stop-color="#fff" stop-opacity=".22" />
              <stop offset=".55" stop-color="#8b5cf6" stop-opacity=".16" />
              <stop offset="1" stop-color="#08080d" stop-opacity="0" />
            </linearGradient>

            <linearGradient id="wmShine" gradientUnits="userSpaceOnUse" x1="-260" y1="0" x2="-60" y2="0">
              <stop offset="0" stop-color="#fff" stop-opacity="0" />
              <stop offset=".5" stop-color="#fff" stop-opacity=".5" />
              <stop offset="1" stop-color="#fff" stop-opacity="0" />
              <animateTransform
                attributeName="gradientTransform"
                type="translate"
                from="0 0"
                to="1500 0"
                dur="5s"
                begin="1.8s"
                repeatCount="indefinite"
              />
            </linearGradient>
          </defs>

          <text class="footer__wordmark-text" x="0" y="198" textLength="1000" lengthAdjust="spacingAndGlyphs" fill="url(#wmFill)">MULTSTORY</text>
          <text class="footer__wordmark-text footer__shine" x="0" y="198" textLength="1000" lengthAdjust="spacingAndGlyphs" fill="url(#wmShine)">MULTSTORY</text>
        </svg>
      </div>

      <div class="footer__bottom">
        <p class="footer__copy">
          © {{ currentYear }} {{ site.name }}. Todos os direitos reservados.
        </p>

        <a href="#inicio" class="footer__top-link">
          Voltar ao topo
          <span class="footer__top-icon">
            <ArrowUp :size="14" stroke-width="2" aria-hidden="true" />
          </span>
        </a>
      </div>

    </div>
  </footer>
</template>