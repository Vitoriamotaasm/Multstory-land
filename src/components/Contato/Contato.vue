<style src="./Contato.css"></style>

<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
import MagneticButton from '../ui/MagneticButton/MagneticButton.vue'
import { site } from '../../config/site'
</script>

<template>
  <section id="contato" class="contato relative z-20 bg-black px-6 py-32" aria-labelledby="contact-heading">
    <div class="mx-auto max-w-5xl bg-gradient-to-br from-deep-blue via-black to-neon-purple p-px shadow-[0_0_80px_rgba(0,68,255,0.15)]">
      <div class="relative overflow-hidden bg-black px-8 py-24 text-center">
        <div class="pointer-events-none absolute inset-0 bg-deep-blue/10 blur-[120px]" aria-hidden="true" />
        <h2 id="contact-heading" class="relative z-10 mb-8 text-4xl font-black tracking-tight text-white md:text-6xl">Vamos tirar sua ideia do papel?</h2>
        <p class="relative z-10 mx-auto mb-12 max-w-2xl text-xl font-light text-deep-blue opacity-80">Conte o desafio da sua marca e a gente monta a estratégia. Primeira conversa e orçamento sem compromisso.</p>
        <MagneticButton :href="site.whatsapp" variant="solid" class="relative z-10 rounded-none px-10 py-5 text-lg">
          Falar no WhatsApp <ArrowRight :size="24" aria-hidden="true" />
        </MagneticButton>
      </div>
    </div>
  </section>
</template>
