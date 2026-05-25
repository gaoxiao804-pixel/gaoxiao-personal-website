<template>
  <div class="projects">
    <div
      v-for="(proj, i) in projectsData"
      :key="proj.name"
      class="section-spacer"
    >
      <SectionHeader :number="`0${i + 1}`" :title="proj.name" />
      <div class="timeline-entry">
        <div class="timeline-entry__meta">{{ proj.role }} · {{ proj.period }}</div>
        <p class="timeline-entry__desc">{{ proj.description }}</p>
        <div class="tech-badges">
          <span v-for="tech in proj.techStack" :key="tech" class="tech-badge">{{ tech }}</span>
        </div>
        <div class="timeline-entry__links">
          <span v-if="proj.liveUrl">// <a :href="proj.liveUrl">Live Demo</a></span>
          <span v-if="proj.sourceUrl">// <a :href="proj.sourceUrl">Source Code</a></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { projectsData } from '@/data/projects'
import SectionHeader from '@/components/SectionHeader.vue'
</script>

<style scoped>
.timeline-entry {
  border-left: 2px solid var(--border-color);
  padding-left: 16px;
  transition: border-color 0.2s;
}
.timeline-entry:hover {
  border-left-color: var(--accent-blue);
}

.timeline-entry__meta {
  color: var(--text-muted);
  font-size: 11px;
}

.timeline-entry__desc {
  color: var(--text-muted);
  font-size: 12px;
  line-height: 1.7;
  margin-top: 6px;
}

.tech-badges {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-top: 8px;
}

.tech-badge {
  background: var(--border-color);
  padding: 2px 8px;
  border-radius: 2px;
  font-size: 10px;
  font-family: var(--font-mono);
}

.timeline-entry__links {
  margin-top: 8px;
  font-size: 10px;
  font-family: var(--font-mono);
  color: var(--comment-green);
}

.timeline-entry__links a {
  color: var(--accent-blue);
}
</style>
