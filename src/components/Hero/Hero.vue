
<style src="./Hero.css"></style>

<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'

import MagneticButton from '../ui/MagneticButton/MagneticButton.vue'

import { site } from '../../config/site'
import { clients } from '../../data/clients'
</script>

<template>
  <section
    id="inicio"
    class="hero"
    aria-labelledby="hero-heading"
  >
    <!-- Background -->
    <video
      class="hero__video"
      src="/hero-bg.mp4"
      poster="/hero-bg.mp4"
      autoplay
      loop
      muted
      playsinline
      preload="metadata"
      aria-hidden="true"
    />

    <div class="hero__noise" aria-hidden="true" />
    <div class="hero__gradient" aria-hidden="true" />

    <!-- Grid -->
    <div class="hero__grid" aria-hidden="true">
      <span />
      <span />
      <span />
      <span />
      <span />
    </div>

    <!-- Content -->
    <div class="hero__container">

      <!-- Main composition -->
      <div class="hero__main">

        <!-- Left -->
        <div class="hero__content">

          <!-- Os três M são spans para a intro poder medir e acender cada um;
               a linha em zigue-zague passa por trás deles (src/intro/intro.ts) -->
          <h1
            id="hero-heading"
            class="hero__title hero__title--enter"
          >
            <span class="hero__m">M</span>arketing
            <br />
            que <span class="hero__m">m</span>ove
            <br />
            <span class="hero__m">m</span>arcas<span class="hero__title-dot">.</span>

            <svg class="hero__title-fx" aria-hidden="true" focusable="false">
              <path class="hero__zig-line" pathLength="1000" />
              <path class="hero__zig-head" />
            </svg>
          </h1>

        </div>

        <!-- Visual -->
        <div class="hero__visual">

          <div class="hero__visual-header hero__visual-fade">
            <span>MultStory®</span>
            <span>Creative Studio</span>
          </div>

          <div class="hero__visual-stage">
            <div class="hero__visual-frame hero__visual-fade">
              <div class="hero__visual-image" />

              <div class="hero__visual-overlay" />

              <div class="hero__visual-cross hero__visual-cross--top" />
              <div class="hero__visual-cross hero__visual-cross--bottom" />

            </div>

            <!-- Contorno de luz do quadrado (desenhado pela intro: src/intro/intro.ts) -->
            <svg class="hero__frame-fx" aria-hidden="true" focusable="false">
              <path class="hero__frame-line" pathLength="1000" />
              <path class="hero__frame-comet-glow" pathLength="1000" />
              <path class="hero__frame-comet" pathLength="1000" />
            </svg>
          </div>

          <div class="hero__visual-footer hero__visual-fade">
            <span>Creative Direction</span>

            <span class="hero__visual-arrow">
              ↗
            </span>
          </div>
        </div>
      </div>

     
    </div>
  </section>
</template>

