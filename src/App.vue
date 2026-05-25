<template>
  <ParticleBackground ref="particleRef" />
  <AppShell />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppShell from '@/components/AppShell.vue'
import ParticleBackground from '@/components/ParticleBackground.vue'

const particleRef = ref<InstanceType<typeof ParticleBackground> | null>(null)
</script>

<style>
#app {
  position: relative;
  z-index: 1;
}
</style>
