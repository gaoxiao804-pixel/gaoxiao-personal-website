<template>
  <router-link :to="to" class="nav-card">
    <div class="nav-card__icon">
      <!-- Resume: document icon -->
      <svg v-if="icon === 'resume'" width="32" height="32" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" :fill="iconColor" opacity="0.15"/>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" :fill="iconColor"/>
        <polyline points="14 2 14 8 20 8" :fill="iconColor"/>
        <line x1="16" y1="13" x2="8" y2="13" stroke="#1e1e1e" stroke-width="1.5"/>
        <line x1="16" y1="17" x2="8" y2="17" stroke="#1e1e1e" stroke-width="1.5"/>
      </svg>
      <!-- Projects: folder icon -->
      <svg v-else-if="icon === 'projects'" width="32" height="32" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" :fill="iconColor" opacity="0.15"/>
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" :fill="iconColor"/>
      </svg>
      <!-- Blog: edit/pen icon -->
      <svg v-else-if="icon === 'blog'" width="32" height="32" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" :fill="iconColor" opacity="0.15"/>
        <path d="M12 20h9" :stroke="iconColor" stroke-width="1.5"/>
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" :fill="iconColor"/>
      </svg>
    </div>
    <div class="nav-card__label">{{ label }}</div>
    <div class="nav-card__desc">{{ description }}</div>
  </router-link>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  icon: 'resume' | 'projects' | 'blog'
  label: string
  description: string
  to: string
}>()

const iconColorMap: Record<string, string> = {
  resume: '#569cd6',
  projects: '#ce9178',
  blog: '#4ec9b0',
}

const iconColor = computed(() => iconColorMap[props.icon] || '#569cd6')
</script>

<style scoped>
.nav-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--bg-surface);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  padding: 22px 24px;
  width: 140px;
  text-align: center;
  text-decoration: none;
  transition: border-color 0.2s, transform 0.2s;
}
.nav-card:hover {
  border-color: v-bind(iconColor);
  transform: scale(1.03);
}
.nav-card__icon {
  margin-bottom: 8px;
}
.nav-card__label {
  color: var(--text-primary);
  font-size: 13px;
  font-weight: 600;
}
.nav-card__desc {
  color: var(--text-muted);
  font-size: 11px;
  margin-top: 4px;
}
</style>
