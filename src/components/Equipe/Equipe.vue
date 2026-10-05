<style src="./Equipe.css"></style>

<script setup lang="ts">
import { team } from '../../data/team'

const members = [...team, ...team]
</script>

<template>
  <section id="equipe" class="equipe relative z-20 bg-black py-24" aria-labelledby="team-heading">
    <header class="mx-auto mb-14 max-w-7xl px-6 text-center">
      <p class="mb-3 text-[11px] uppercase tracking-[2px] text-gray-500">Uma equipe multidisciplinar com foco em soluções premium, linguagem autêntica e resultados mensuráveis.</p>
      <h2 id="team-heading" class="text-4xl font-black tracking-tight text-white md:text-5xl">Pessoas que pensam em design, estratégia e crescimento.</h2>
      
    </header>

    <div class="w-full overflow-hidden" aria-label="Equipe MultStory">
      <div class="team-track flex w-max gap-4">
        <article v-for="(member, index) in members" :key="`${member.name}-${index}`" class="group relative h-80 w-56 shrink-0 overflow-hidden rounded-2xl md:h-96 md:w-64">
          <img :src="member.image" :alt="`${member.name}, ${member.role}`" class="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" aria-hidden="true" />
          <div class="absolute bottom-0 left-0 right-0 p-5">
            <p class="mb-1 text-[10px] uppercase tracking-[2px] text-violet-400">{{ member.role }}</p>
            <h3 class="heading-display text-[28px] text-white">{{ member.name }}</h3>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
