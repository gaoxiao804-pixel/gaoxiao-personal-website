<template>
  <div class="app-shell">
    <NavBar />
    <main class="app-shell__content">
      <router-view />
    </main>
    <PageFooter />
  </div>
</template>

<script setup lang="ts">
import NavBar from './NavBar.vue'
import PageFooter from './PageFooter.vue'
</script>

<style scoped>
.app-shell {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-shell__content {
  flex: 1;
  width: 100%;
  max-width: var(--content-width);
  margin: 0 auto;
  padding: 36px 24px;
}
</style>
