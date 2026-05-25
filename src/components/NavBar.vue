<template>
  <nav class="navbar">
    <router-link to="/" class="navbar__logo">&gt; gaoxiao<span class="navbar__cursor">_</span></router-link>
    <div class="navbar__links">
      <router-link
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        class="navbar__link"
        :class="{ 'navbar__link--active': isActive(item.to) }"
      >
        {{ item.label }}
      </router-link>
    </div>
    <span class="navbar__file">{{ currentFile }}</span>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Resume', to: '/resume' },
  { label: 'Projects', to: '/projects' },
  { label: 'Blog', to: '/blog' },
]

const fileNames: Record<string, string> = {
  '/': 'index.ts',
  '/resume': 'resume.ts',
  '/projects': 'projects.json',
  '/blog': 'blog/*.md',
}

const currentFile = computed(() => {
  const base = route.path.startsWith('/blog/') ? '/blog' : route.path
  return fileNames[base] || 'unknown ✦'
})

function isActive(to: string): boolean {
  if (to === '/') return route.path === '/'
  return route.path.startsWith(to)
}
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 28px;
  background: var(--bg-surface);
  border-bottom: 1px solid var(--border-color);
  font-family: var(--font-mono);
}

.navbar__logo {
  color: var(--accent-green);
  font-weight: bold;
  font-size: 14px;
  text-decoration: none;
}

.navbar__cursor {
  display: inline-block;
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  50% { opacity: 0; }
}

.navbar__links {
  display: flex;
  gap: 28px;
}

.navbar__link {
  font-size: 12px;
  color: var(--text-muted);
  text-decoration: none;
  transition: color 0.2s;
}

.navbar__link:hover,
.navbar__link--active {
  color: var(--accent-blue);
}

.navbar__file {
  color: #666;
  font-size: 10px;
}
</style>
