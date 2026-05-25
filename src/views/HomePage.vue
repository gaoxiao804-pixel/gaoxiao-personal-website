<template>
  <div class="home">
    <!-- Hero -->
    <div class="hero">
      <div class="hero__avatar">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#569cd6" stroke-width="1" stroke-linecap="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      </div>
      <h1 class="hero__name">{{ resumeData.name }}</h1>
      <p class="hero__role">// {{ resumeData.title }}</p>
    </div>

    <!-- Skill Tags -->
    <div class="skill-tags">
      <span v-for="cat in resumeData.skills" :key="cat.category" class="skill-tag" :style="{ color: tagColors[cat.items.length % tagColors.length] }">
        {{ cat.category }}
      </span>
      <span v-for="(item, i) in flatSkills" :key="item" class="skill-tag" :style="{ color: tagColors[i % tagColors.length] }">
        {{ item }}
      </span>
    </div>

    <!-- Quick Nav Cards -->
    <div class="quick-nav">
      <QuickNavCard icon="resume" label="Resume" description="Work & Education" to="/resume" />
      <QuickNavCard icon="projects" label="Projects" description="What I've Built" to="/projects" />
      <QuickNavCard icon="blog" label="Blog" description="Articles & Notes" to="/blog" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { resumeData } from '@/data/resume'
import QuickNavCard from '@/components/QuickNavCard.vue'

const tagColors = ['#4ec9b0', '#569cd6', '#dcdcaa', '#ce9178', '#c586c0']

const flatSkills = computed(() => {
  return resumeData.skills.flatMap(s => s.items).slice(0, 10)
})
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hero {
  text-align: center;
  margin-bottom: 32px;
}

.hero__avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: var(--border-color);
  border: 2px solid var(--accent-blue);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
}

.hero__name {
  font-size: 24px;
  font-weight: 600;
  font-family: var(--font-sans);
  color: var(--text-primary);
  margin-bottom: 4px;
}

.hero__role {
  color: var(--comment-green);
  font-family: var(--font-mono);
  font-size: 13px;
  margin-bottom: 20px;
}

.skill-tags {
  display: flex;
  gap: 8px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 36px;
  max-width: 600px;
}

.skill-tag {
  background: var(--border-color);
  padding: 3px 10px;
  border-radius: 3px;
  font-size: 11px;
  font-family: var(--font-mono);
}

.quick-nav {
  display: flex;
  gap: 14px;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
