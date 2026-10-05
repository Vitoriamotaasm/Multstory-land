<script setup lang="ts">
import Navbar from './components/Navbar/Navbar.vue'

import Hero from './components/Hero/Hero.vue'

import Servicos from './components/Servicos/Servicos.vue'
import Sobre from './components/Sobre/Sobre.vue'
import Equipe from './components/Equipe/Equipe.vue'
import Cases from './components/Cases/Cases.vue'
import Contato from './components/Contato/Contato.vue'
import Faq from './components/Faq/Faq.vue'
import Footer from './components/Footer/Footer.vue'

import Portfolio from './components/Portfolio/Portfolio.vue'
</script>

<template>
  <div class="min-h-screen overflow-x-hidden bg-black text-white selection:bg-neon-purple/30">
    <div class="pointer-events-none fixed inset-0 z-[100] bg-noise opacity-30 mix-blend-screen" aria-hidden="true" />

 

    <main class="relative z-10">
      <Navbar />

      <Hero />
      <Cases />
      <Portfolio />
      <Servicos />
      
      <Sobre />

      <Equipe />
      <Faq />
      
      
    </main>

    <Footer />
  </div>
</template>
