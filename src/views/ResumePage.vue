<template>
  <div class="resume">
    <!-- Personal Info -->
    <div class="section-spacer">
      <h2 class="resume__name">{{ resumeData.name }} · {{ resumeData.title }}</h2>
      <div class="resume__contact">
        <span>📧 {{ resumeData.email }}</span>
        <span>📱 {{ resumeData.phone }}</span>
        <span>📍 {{ resumeData.location }}</span>
        <span v-if="resumeData.github">🔗 {{ resumeData.github }}</span>
      </div>
    </div>

    <!-- Education -->
    <div class="section-spacer">
      <SectionHeader number="01" title="Education" />
      <div v-for="edu in resumeData.education" :key="edu.school" class="timeline-entry">
        <div class="timeline-entry__title">{{ edu.degree }}</div>
        <div class="timeline-entry__meta">{{ edu.school }} · {{ edu.period }}</div>
        <div v-if="edu.note" class="timeline-entry__note">// {{ edu.note }}</div>
      </div>
    </div>

    <!-- Work Experience -->
    <div class="section-spacer">
      <SectionHeader number="02" title="Work Experience" />
      <div v-for="exp in resumeData.experience" :key="exp.company" class="timeline-entry">
        <div class="timeline-entry__title">{{ exp.title }} @ {{ exp.company }}</div>
        <div class="timeline-entry__meta">{{ exp.period }}</div>
        <ul class="timeline-entry__bullets">
          <li v-for="item in exp.description" :key="item">{{ item }}</li>
        </ul>
      </div>
    </div>

    <!-- Skills -->
    <div class="section-spacer">
      <SectionHeader number="03" title="Skills" />
      <div v-for="cat in resumeData.skills" :key="cat.category" class="skill-group">
        <span class="skill-group__label">{{ cat.category }}:</span>
        <span v-for="item in cat.items" :key="item" class="skill-chip" :style="{ color: chipColor(item) }">{{ item }}</span>
      </div>
    </div>

    <!-- Certifications -->
    <div class="section-spacer">
      <SectionHeader number="04" title="Certifications" />
      <div v-for="cert in resumeData.certifications" :key="cert.name" class="timeline-entry">
        <div class="timeline-entry__title">{{ cert.name }} — {{ cert.level }}</div>
        <div class="timeline-entry__meta">{{ cert.issuer }} · {{ cert.date }}</div>
      </div>
    </div>

    <!-- Projects (condensed) -->
    <div class="section-spacer">
      <SectionHeader number="05" title="Projects" />
      <div v-for="proj in resumeData.projects" :key="proj.name" class="timeline-entry">
        <div class="timeline-entry__title">{{ proj.name }}</div>
        <div class="timeline-entry__meta">{{ proj.role }} · {{ proj.period }}</div>
        <p class="timeline-entry__desc">{{ proj.description }}</p>
        <div class="tech-badges">
          <span v-for="tech in proj.techStack" :key="tech" class="tech-badge">{{ tech }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { resumeData } from '@/data/resume'
import SectionHeader from '@/components/SectionHeader.vue'

const chipColors = ['#4ec9b0', '#569cd6', '#dcdcaa', '#ce9178', '#c586c0', '#888']
function chipColor(item: string): string {
  return chipColors[item.length % chipColors.length]
}
</script>

<style scoped>
.resume__name {
  font-size: 18px;
  font-weight: 600;
  font-family: var(--font-sans);
  color: var(--text-primary);
  margin-bottom: 12px;
}

.resume__contact {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  color: var(--text-muted);
  font-size: 12px;
  font-family: var(--font-mono);
}

.timeline-entry {
  border-left: 2px solid var(--border-color);
  padding-left: 16px;
  margin-bottom: 16px;
  transition: border-color 0.2s;
}
.timeline-entry:hover {
  border-left-color: var(--accent-blue);
}

.timeline-entry__title {
  color: var(--text-primary);
  font-size: 13px;
  font-weight: 600;
  font-family: var(--font-sans);
}

.timeline-entry__meta {
  color: var(--text-muted);
  font-size: 11px;
  margin-top: 2px;
}

.timeline-entry__note {
  color: var(--comment-green);
  font-size: 11px;
  margin-top: 4px;
  font-family: var(--font-mono);
}

.timeline-entry__bullets {
  margin: 6px 0 0 16px;
  padding: 0;
}

.timeline-entry__bullets li {
  color: var(--text-muted);
  font-size: 12px;
  line-height: 1.7;
}

.timeline-entry__desc {
  color: var(--text-muted);
  font-size: 12px;
  line-height: 1.7;
  margin-top: 6px;
}

.skill-group {
  margin-bottom: 10px;
  font-size: 12px;
}

.skill-group__label {
  color: var(--text-muted);
  font-family: var(--font-mono);
  margin-right: 8px;
}

.skill-chip {
  background: var(--border-color);
  padding: 2px 8px;
  border-radius: 3px;
  font-size: 11px;
  font-family: var(--font-mono);
  margin-right: 6px;
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
</style>
