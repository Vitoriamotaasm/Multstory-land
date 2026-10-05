<script setup lang="ts">
import { ref } from 'vue'
import { Menu, X } from 'lucide-vue-next'

import { site } from '../../config/site'
import { navigationItems } from './navigation'
import ServicesModal from '../ServicosModal/ServicosModal.vue'
import { useEscapeKey } from '../../composables/useEscapeKey'

const menuOpen = ref(false)
const servicesOpen = ref(false)

useEscapeKey(() => {
  if (servicesOpen.value) {
    closeServices()
    return
  }

  if (menuOpen.value) {
    closeMenu()
  }
})

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function closeMenu() {
  menuOpen.value = false
}

function openServices() {
  closeMenu()
  servicesOpen.value = true
}

function closeServices() {
  servicesOpen.value = false
}
</script>

<template>
  <nav
    class="navbar"
    aria-label="Navegação principal"
  >
    <div class="navbar__container">

      <!-- Logo -->
      <a
        href="#inicio"
        class="navbar__brand"
        aria-label="MultStory - início"
        @click="closeMenu"
      >
        <img
          src="/logo.svg"
          alt="MultStory"
          class="navbar__logo"
        />
      </a>

      <!-- Links -->
      <div class="navbar__links">
        <a
          v-for="item in navigationItems"
          :key="item.href"
          :href="item.href"
          class="navbar__link"
          @click="closeMenu"
        >
          {{ item.label }}
        </a>
      </div>

      <!-- Ações -->
      <div class="navbar__actions">


        <a
          :href="site.whatsapp"
          target="_blank"
          rel="noopener noreferrer"
          class="navbar__cta"
        >
          Solicitar Orçamento
        </a>

      </div>

      <!-- Mobile -->
      <button
        type="button"
        class="navbar__menu-button"
        :aria-expanded="menuOpen"
        aria-controls="mobile-navigation"
        :aria-label="menuOpen ? 'Fechar menu' : 'Abrir menu'"
        @click="toggleMenu"
      >
        <X
          v-if="menuOpen"
          :size="22"
          stroke-width="1.8"
          aria-hidden="true"
        />

        <Menu
          v-else
          :size="22"
          stroke-width="1.8"
          aria-hidden="true"
        />
      </button>

    </div>

    <!-- Mobile -->
    <Transition name="navbar-mobile">
      <div
        v-if="menuOpen"
        id="mobile-navigation"
        class="navbar__mobile"
      >
        <a
          v-for="item in navigationItems"
          :key="`mobile-${item.href}`"
          :href="item.href"
          class="navbar__mobile-link"
          @click="closeMenu"
        >
          {{ item.label }}
        </a>

        <a
          :href="site.whatsapp"
          target="_blank"
          rel="noopener noreferrer"
          class="navbar__mobile-cta"
          @click="closeMenu"
        >
          Solicitar Orçamento
        </a>
      </div>
    </Transition>

    <ServicesModal
      v-if="servicesOpen"
      @close="closeServices"
    />
  </nav>
</template>

<style src="./Navbar.css"></style>