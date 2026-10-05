<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { site } from '../../config/site'


interface FaqItem {
  question: string
  answer: string
}

const faqItems: FaqItem[] = [
  {
    question: 'Como funciona um projeto com a Multstory?',
    answer:
      'Começamos entendendo o momento, os objetivos e as necessidades da sua marca. A partir disso, construímos uma estratégia personalizada e acompanhamos todas as etapas do projeto.',
  },
  {
    question: 'Quais serviços a Multstory oferece?',
    answer:
      'A Multstory trabalha com estratégia, criação de conteúdo, produção audiovisual, social media, branding e soluções digitais para marcas.',
  },
  {
    question: 'A Multstory trabalha com projetos personalizados?',
    answer:
      'Sim. Cada projeto é desenvolvido de acordo com o posicionamento, os objetivos e as necessidades específicas de cada marca.',
  },
  {
    question: 'Como funciona o orçamento?',
    answer:
      'Após entendermos o projeto e suas necessidades, estruturamos uma proposta personalizada com os serviços, etapas e investimentos.',
  },
  {
    question: 'Qual é o prazo de um projeto?',
    answer:
      'O prazo depende do escopo e da complexidade de cada projeto. Durante o planejamento, definimos um cronograma claro para todas as etapas.',
  },
]

const activeIndex = ref<number | null>(null)

const root = ref<HTMLElement | null>(null)
const visible = ref(false)

let observer: IntersectionObserver | null = null
let raf = 0
let target = 0
let current = 0

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* A tela do tablet acompanha o scroll da página */
function tick() {
  const el = root.value
  if (!el) return
  current += (target - current) * 0.12
  el.style.setProperty('--scroll', current.toFixed(4))
  raf = Math.abs(target - current) > 0.001 ? requestAnimationFrame(tick) : 0
}

function onScroll() {
  const el = root.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  const vh = window.innerHeight
  const progress = (vh - rect.top) / (vh + rect.height)
  target = Math.min(1, Math.max(0, (progress - 0.15) / 0.65))
  if (!raf) raf = requestAnimationFrame(tick)
}

onMounted(() => {
  const el = root.value
  if (!el) return

  if (reduceMotion()) {
    visible.value = true
    el.style.setProperty('--scroll', '0.4')
    return
  }

  /* entra quando ~35% aparece; reinicia quando sai por completo */
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.intersectionRatio >= 0.35) visible.value = true
      else if (!entry.isIntersecting) visible.value = false
    },
    { threshold: [0, 0.35] },
  )
  observer.observe(el)

  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll)
  onScroll()
})

onBeforeUnmount(() => {
  observer?.disconnect()
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
  cancelAnimationFrame(raf)
})

function toggleFaq(index: number) {
  activeIndex.value = activeIndex.value === index ? null : index
}
</script>

<template>
  <section ref="root" class="faq" :class="{ 'faq--visible': visible }">

    <!-- ESQUERDA: marca + câmera cortada na borda -->
    <aside class="faq__left">
      <div class="faq__brand"></div>

      <svg
          class="faq__camera"
          viewBox="0 0 420 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>

            <linearGradient
              id="cameraBody"
              x1="30"
              y1="20"
              x2="390"
              y2="300"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#B994FF" />
              <stop offset="0.48" stop-color="#7A4ADB" />
              <stop offset="1" stop-color="#293A9E" />
            </linearGradient>

            <linearGradient
              id="cameraLens"
              x1="80"
              y1="60"
              x2="330"
              y2="260"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#A9D5FF" />
              <stop offset="0.45" stop-color="#5267C8" />
              <stop offset="1" stop-color="#101735" />
            </linearGradient>

            <linearGradient
              id="cameraGlass"
              x1="120"
              y1="70"
              x2="300"
              y2="250"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#D5E9FF" />
              <stop offset="1" stop-color="#5365B8" />
            </linearGradient>

          </defs>

          <!-- CORPO DA CÂMERA -->
          <rect
            x="38"
            y="62"
            width="344"
            height="204"
            rx="38"
            fill="url(#cameraBody)"
          />

          <!-- PARTE SUPERIOR -->
          <path
            d="M105 62L130 28C135 21 143 17 152 17H267C276 17 284 21 289 28L314 62H105Z"
            fill="#8760DF"
          />

          <!-- DETALHE SUPERIOR -->
          <rect
            x="157"
            y="31"
            width="106"
            height="17"
            rx="8.5"
            fill="#C5A9FF"
            opacity=".7"
          />

          <!-- LENTE EXTERNA -->
          <circle
            cx="210"
            cy="164"
            r="82"
            fill="#20295D"
            opacity=".95"
          />

          <circle
            cx="210"
            cy="164"
            r="68"
            fill="url(#cameraLens)"
          />

          <circle
            cx="210"
            cy="164"
            r="51"
            fill="#11172F"
          />

          <circle
            cx="210"
            cy="164"
            r="39"
            fill="url(#cameraGlass)"
          />

          <!-- REFLEXO DA LENTE -->
          <ellipse
            cx="191"
            cy="143"
            rx="16"
            ry="10"
            transform="rotate(-35 191 143)"
            fill="white"
            opacity=".45"
          />

          <!-- BOTÃO -->
          <circle
            cx="335"
            cy="92"
            r="12"
            fill="#D7C5FF"
          />

          <circle
            cx="335"
            cy="92"
            r="5"
            fill="#6650B9"
          />

          <!-- DETALHE LATERAL -->
          <rect
            x="68"
            y="88"
            width="22"
            height="63"
            rx="11"
            fill="#BFA8F8"
            opacity=".55"
          />

          <!-- FLASH -->
          <circle class="faq__lens-flash" cx="210" cy="164" r="96" fill="white" />
          <circle class="faq__bulb-flash" cx="335" cy="92" r="26" fill="white" />
        </svg>

      <div class="faq__flash" aria-hidden="true"></div>
    </aside>


    <!-- CENTRO: título, seta e perguntas -->
    <main class="faq__main">

      <div class="faq__heading">
        <h2>Perguntas<br />Frequentes</h2>

        <svg class="faq__arrow" viewBox="0 0 40 28" fill="none" aria-hidden="true">
          <path d="M4 5L20 21L36 5" stroke="currentColor" stroke-width="8" stroke-linejoin="miter" />
        </svg>
      </div>

      <div class="faq__list">
        <article
          v-for="(item, index) in faqItems"
          :key="item.question"
          class="faq__item"
          :class="{ 'faq__item--active': activeIndex === index }"
          :style="{ '--i': index }"
        >
          <button
            type="button"
            class="faq__question"
            :aria-expanded="activeIndex === index"
            @click="toggleFaq(index)"
          >
            <span class="faq__question-text">{{ item.question }}</span>

            <span class="faq__plus" aria-hidden="true">
              <span></span>
              <span></span>
            </span>
          </button>

          <div v-if="activeIndex === index" class="faq__answer">
            <p>{{ item.answer }}</p>
          </div>
        </article>
      </div>

    </main>


    <!-- DIREITA: bloco de menu/redes + painel com tablet -->
    <aside class="faq__right">

      <div class="faq__right-top">
        <div class="faq__menu-row">
          <button class="faq__menu" type="button" aria-label="Abrir menu">
            <span></span>
            <span></span>
          </button>
        </div>

        <div class="faq__socials">
          <a :href="site.instagram" target="_blank" rel="noopener" aria-label="Instagram">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
          </a>

          <span aria-label="LinkedIn">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <rect x="3" y="9" width="3.6" height="12" />
              <circle cx="4.8" cy="4.8" r="2.1" />
              <path d="M10 9h3.4v1.7c.6-1.1 1.9-2 3.7-2 3 0 4 2 4 4.9V21h-3.6v-6.2c0-1.4-.4-2.4-1.8-2.4-1.5 0-2.1 1-2.1 2.5V21H10z" />
            </svg>
          </span>

          <span aria-label="TikTok">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">
              <path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5" />
              <path d="M14 3c.3 2.6 2 4.3 5 4.6" />
            </svg>
          </span>
        </div>
      </div>

      <div class="faq__tablet-shape">
        <svg
          class="faq__tablet"
          viewBox="0 0 340 440"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >

          <defs>

            <linearGradient
              id="tabletFrame"
              x1="30"
              y1="20"
              x2="310"
              y2="420"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#C5A9FF" />
              <stop offset=".5" stop-color="#7950D5" />
              <stop offset="1" stop-color="#293EA8" />
            </linearGradient>

            <linearGradient
              id="tabletScreen"
              x1="30"
              y1="30"
              x2="300"
              y2="410"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#202969" />
              <stop offset="1" stop-color="#080D29" />
            </linearGradient>

            <linearGradient
              id="tabletImage"
              x1="20"
              y1="20"
              x2="220"
              y2="180"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#A88AFF" />
              <stop offset=".5" stop-color="#5568D0" />
              <stop offset="1" stop-color="#16235C" />
            </linearGradient>

          <clipPath id="tabletClip">
              <rect x="34" y="27" width="272" height="386" rx="23" />
            </clipPath>

          </defs>


          <!-- FRAME -->
          <rect
            x="18"
            y="10"
            width="304"
            height="420"
            rx="34"
            fill="url(#tabletFrame)"
          />


          <!-- TELA -->
          <rect
            x="34"
            y="27"
            width="272"
            height="386"
            rx="23"
            fill="url(#tabletScreen)"
          />


          <!-- CÂMERA -->
          <circle
            cx="170"
            cy="20"
            r="4"
            fill="#0A102C"
          />


          <g clip-path="url(#tabletClip)">
          <g class="faq__tablet-scroll">
          <g id="tabletPage">

          <!-- IMAGEM PRINCIPAL -->
          <rect
            x="57"
            y="63"
            width="226"
            height="150"
            rx="16"
            fill="url(#tabletImage)"
          />


          <!-- ELEMENTO ABSTRATO -->
          <path
            d="M57 174C91 140 121 147 151 165C181 183 205 177 231 151C251 131 269 129 283 140V213H57V174Z"
            fill="#26377F"
            opacity=".8"
          />

          <circle
            cx="236"
            cy="105"
            r="25"
            fill="#B69BFF"
            opacity=".55"
          />


          <!-- TÍTULO -->
          <rect
            x="57"
            y="237"
            width="148"
            height="13"
            rx="6.5"
            fill="#D1C1FF"
          />

          <rect
            x="57"
            y="259"
            width="196"
            height="8"
            rx="4"
            fill="#6979C9"
          />

          <rect
            x="57"
            y="275"
            width="165"
            height="8"
            rx="4"
            fill="#5366B8"
          />


          <!-- CARDS -->
          <rect
            x="57"
            y="307"
            width="104"
            height="70"
            rx="13"
            fill="#26377C"
          />

          <rect
            x="174"
            y="307"
            width="109"
            height="70"
            rx="13"
            fill="#1A275F"
          />

          <circle
            cx="81"
            cy="332"
            r="11"
            fill="#B39AFF"
          />

          <rect
            x="101"
            y="326"
            width="38"
            height="8"
            rx="4"
            fill="#8795DE"
          />

          <rect
            x="101"
            y="341"
            width="27"
            height="6"
            rx="3"
            fill="#5265B5"
          />

          <circle
            cx="198"
            cy="332"
            r="11"
            fill="#6E7FE1"
          />

          <rect
            x="218"
            y="326"
            width="40"
            height="8"
            rx="4"
            fill="#8795DE"
          />

          <rect
            x="218"
            y="341"
            width="28"
            height="6"
            rx="3"
            fill="#5265B5"
          />


          </g>
          <use href="#tabletPage" y="370" />
          </g>
          </g>

          <!-- BARRA INFERIOR -->
          <rect
            x="126"
            y="393"
            width="88"
            height="5"
            rx="2.5"
            fill="#A796EF"
            opacity=".7"
          />

        </svg>
      </div>

    </aside>

  </section>
</template>

<style src="./Faq.css"></style>