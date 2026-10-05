<style src="./ServicosModal.css"></style>

<script setup lang="ts">
import { MessageCircle, X } from 'lucide-vue-next'
import { site } from '../../config/site'
import { serviceIcons } from '../../config/service-icons'
import { services } from '../../data/services'
import { useBodyScrollLock } from '../../composables/useBodyScrollLock'
import { useEscapeKey } from '../../composables/useEscapeKey'

const emit = defineEmits<{ close: [] }>()

function closeModal() {
  emit('close')
}

useBodyScrollLock()
useEscapeKey(closeModal)
</script>

<template>
  <Teleport to="body">
    <div
      class="servicos-modal fixed inset-0 z-[200] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="services-modal-title"
      @click="closeModal"
    >
      <div class="absolute inset-0 bg-black/80 backdrop-blur-md" aria-hidden="true" />

      <div class="relative z-10 w-full max-w-2xl overflow-hidden rounded-2xl border border-neon-purple/30 bg-[#07050f] shadow-[0_0_80px_rgba(189,0,255,0.2)]" @click.stop>
        <header class="flex items-center justify-between border-b border-white/[0.06] px-8 pb-6 pt-8">
          <div>
            <p class="mb-1 text-[10px] uppercase tracking-[3px] text-neon-purple">O que fazemos</p>
            <h2 id="services-modal-title" class="heading-display text-3xl text-white">NOSSOS SERVIÇOS</h2>
          </div>

          <button type="button" aria-label="Fechar serviços" class="text-gray-400 hover:text-white" @click="closeModal">
            <X :size="18" aria-hidden="true" />
          </button>
        </header>

        <ul class="space-y-1 px-8 py-7" aria-label="Lista de serviços">
          <li v-for="service in services" :key="service.title">
            <article class="group flex items-center gap-4 rounded-xl p-4 transition-all hover:border-neon-purple/20 hover:bg-neon-purple/[0.04]">
              <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03]">
                <component :is="serviceIcons[service.icon]" :size="16" class="text-gray-400 group-hover:text-neon-purple" aria-hidden="true" />
              </div>
              <div>
                <h3 class="text-sm font-semibold text-white">{{ service.title }}</h3>
                <p class="mt-0.5 text-xs text-gray-500">{{ service.description }}</p>
              </div>
            </article>
          </li>

          <li>
            <a :href="site.whatsapp" target="_blank" rel="noopener noreferrer" class="mt-4 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-500 py-3 text-sm font-semibold text-white">
              <MessageCircle :size="16" aria-hidden="true" />
              Falar com a equipe
            </a>
          </li>
        </ul>
      </div>
    </div>
  </Teleport>
</template>
