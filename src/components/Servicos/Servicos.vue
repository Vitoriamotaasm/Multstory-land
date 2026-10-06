<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

import {
  Video,
  Palette,
  Share2,
  Globe,
  Layers3,
  Users,
  TrendingUp,
  Monitor,
} from 'lucide-vue-next'

interface Service {
  title: string
  shortDescription: string
  description: string
  benefit: string
  icon: typeof Video
}

const services: Service[] = [
  {
    title: 'Produção de Vídeos',

    shortDescription:
      'Transformamos ideias em conteúdos que prendem a atenção e valorizam sua marca.',

    description:
      'Cuidamos de todo o processo de produção, desde a roteirização e planejamento até a captação e edição dos vídeos. Criamos conteúdos institucionais, comerciais, vídeos para redes sociais, campanhas, produtos e muito mais.',

    benefit:
      'Ter uma comunicação mais profissional, transmitir confiança, apresentar seus produtos e serviços de forma atrativa e gerar conteúdos capazes de aumentar o interesse do público pela sua marca.',

    icon: Video,
  },

  {
    title: 'Design Gráfico',

    shortDescription:
      'Criamos materiais visuais que fortalecem a identidade e tornam sua comunicação mais profissional.',

    description:
      'Desenvolvemos banners, cards, carrosséis, catálogos, materiais promocionais, apresentações, peças para redes sociais e outras soluções gráficas de acordo com as necessidades da sua empresa.',

    benefit:
      'Manter uma comunicação visual organizada e profissional, fortalecer o reconhecimento da marca e apresentar produtos, serviços e campanhas de maneira mais atrativa para seus clientes.',

    icon: Palette,
  },

  {
    title: 'Social Media',

    shortDescription:
      'Planejamos o que sua empresa precisa comunicar, quando publicar e como transformar as redes sociais em um canal estratégico.',

    description:
      'Criamos planejamento de conteúdo, calendário editorial, estratégias, pautas, campanhas e direcionamentos para melhorar a presença digital da marca.',

    benefit:
      'Evita publicações sem planejamento, mantém a marca ativa nas redes sociais e cria uma comunicação pensada para atrair, informar, relacionar e gerar oportunidades de vendas.',

    icon: Share2,
  },

  {
    title: 'Criação de Sites e Landing Pages',

    shortDescription:
      'Desenvolvemos sites e páginas estratégicas para fortalecer a presença digital da sua empresa e gerar novas oportunidades de negócio.',

    description:
      'Criamos sites institucionais, landing pages para campanhas, páginas de apresentação de serviços, produtos e soluções personalizadas.',

    benefit:
      'Aumenta a credibilidade da marca, facilita que novos clientes encontrem informações sobre sua empresa e cria novos canais para geração de contatos, orçamentos e vendas.',

    icon: Globe,
  },

  {
    title: 'Gestão de Mídias Digitais',

    shortDescription:
      'Cuidamos da presença da sua empresa nos principais canais digitais.',

    description:
      'Realizamos o gerenciamento de plataformas como Instagram, Facebook, LinkedIn, Google e outros canais importantes para o posicionamento da marca.',

    benefit:
      'Centraliza a gestão dos canais digitais, mantém informações e conteúdos atualizados e garante uma presença mais profissional e consistente onde seus clientes procuram pela sua empresa.',

    icon: Layers3,
  },

  {
    title: 'CRM e Gestão de Leads',

    shortDescription:
      'Organizamos seus contatos e oportunidades comerciais para que nenhum possível cliente seja perdido durante o processo de venda.',

    description:
      'Implementamos soluções para gestão de leads, acompanhamento de atendimentos, organização de WhatsApp, armazenamento de informações, automação de tarefas, relatórios e acompanhamento comercial.',

    benefit:
      'Organiza o processo de atendimento, reduz tarefas manuais, melhora o acompanhamento dos clientes e ajuda sua equipe comercial a identificar quais oportunidades precisam de atenção para gerar mais vendas.',

    icon: Users,
  },

  {
    title: 'Gestão de Tráfego Pago',

    shortDescription:
      'Levamos sua empresa até as pessoas certas através de campanhas de anúncios estratégicas.',

    description:
      'Planejamos, criamos, gerenciamos e otimizamos campanhas no Google Ads e Meta Ads, buscando aumentar a visibilidade da marca e gerar oportunidades comerciais.',

    benefit:
      'Atrai potenciais clientes de forma mais rápida, aumenta a geração de leads, direciona pessoas interessadas para seus canais de venda e permite investir em campanhas com objetivos e resultados mensuráveis.',

    icon: TrendingUp,
  },

  {
    title: 'Estratégia Digital',

    shortDescription:
      'Criamos estratégias para transformar marketing em uma ferramenta de crescimento para sua empresa.',

    description:
      'Analisamos posicionamento, comunicação, público, jornada de compra, canais digitais e oportunidades comerciais para desenvolver estratégias alinhadas aos objetivos do negócio.',

    benefit:
      'Traz mais clareza sobre onde investir, como se posicionar, quais ações priorizar e como integrar marketing e vendas para melhorar os resultados da empresa.',

    icon: Monitor,
  },
]

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
    id="servicos"
    ref="root"
    class="services"
    :class="{ 'services--visible': visible }"
    aria-labelledby="services-heading"
  >
    <div class="services__container">

      <!-- CABEÇALHO -->
      <header class="services__header">
        <h2
          id="services-heading"
          class="services__title"
        >
          Na Multstory
        </h2>

        <p class="services__intro">
          unimos criatividade, estratégia e tecnologia para fortalecer a presença da sua empresa,
          <br class="services__desktop-break" />
          otimizar processos e transformar comunicação em resultados.
        </p>
      </header>

      <!-- SERVIÇOS -->
      <div class="services__grid">

        <article
          v-for="(service, index) in services"
          :key="service.title"
          class="service-card"
          :class="{
            'service-card--wide': index === 3 || index === 4,
          }"
          :style="{ '--i': index }"
        >

          <!-- ÍCONE -->
          <div class="service-card__icon">
            <component
              :is="service.icon"
              :size="15"
              :stroke-width="1.5"
              aria-hidden="true"
            />
          </div>

          <!-- CONTEÚDO -->
          <div class="service-card__content">

            <h3 class="service-card__title">
              {{ service.title }}
            </h3>

            <!-- TEXTO CURTO -->
            <p class="service-card__short">
              {{ service.shortDescription }}
            </p>

            <!-- TEXTO COMPLETO — ABRE NO HOVER -->
            <div class="service-card__details">

              <div class="service-card__description">

                <p>
                  {{ service.description }}
                </p>

                <br />

                <strong>
                  O que isso facilita para sua empresa:
                </strong>

                <p>
                  {{ service.benefit }}
                </p>

              </div>

              <span class="service-card__action">
                Saiba mais
                <span aria-hidden="true">→</span>
              </span>

            </div>

          </div>
        </article>

      </div>
    </div>
  </section>
</template>

<style src="./Servicos.css"></style>