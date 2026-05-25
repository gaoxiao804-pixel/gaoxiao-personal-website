<template>
  <div class="section-header">
    <span class="section-header__comment">/** </span>
    <span class="section-header__number">{{ number }}.</span>
    {{ title }}
    <span class="section-header__comment"> */</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  number: string
  title: string
}>()
</script>

<style scoped>
.section-header {
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--text-primary);
  margin-bottom: 12px;
}

.section-header__comment {
  color: var(--comment-green);
}

.section-header__number {
  color: var(--accent-green);
}
</style>
