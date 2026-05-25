<template>
  <div class="blog-list">
    <p class="blog-list__summary">/** {{ blogArticles.length }} articles — all topics */</p>

    <div
      v-for="article in paginatedArticles"
      :key="article.slug"
      class="timeline-entry"
    >
      <div class="timeline-entry__category" :style="{ color: categoryColor(article.category) }">
        {{ article.category }} · {{ article.date }}
      </div>
      <router-link :to="`/blog/${article.slug}`" class="timeline-entry__title">
        {{ article.title }}
      </router-link>
      <p class="timeline-entry__excerpt">{{ article.excerpt }}</p>
    </div>

    <!-- Pagination -->
    <div class="pagination" v-if="totalPages > 1">
      <button :disabled="currentPage === 1" @click="currentPage--">← Prev</button>
      <button
        v-for="p in totalPages"
        :key="p"
        :class="{ active: p === currentPage }"
        @click="currentPage = p"
      >
        {{ p }}
      </button>
      <button :disabled="currentPage === totalPages" @click="currentPage++">Next →</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { blogArticles } from '@/data/blog'

const PER_PAGE = 5
const currentPage = ref(1)

const totalPages = computed(() => Math.ceil(blogArticles.length / PER_PAGE))

const paginatedArticles = computed(() => {
  const start = (currentPage.value - 1) * PER_PAGE
  return blogArticles.slice(start, start + PER_PAGE)
})

const categoryColors: Record<string, string> = {
  'general': '#4ec9b0',
  'data-engineering': '#ce9178',
  'database': '#dcdcaa',
  'etl': '#c586c0',
  'ops': '#569cd6',
}

function categoryColor(cat: string): string {
  return categoryColors[cat] || '#888'
}
</script>

<style scoped>
.blog-list__summary {
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--comment-green);
  margin-bottom: 24px;
}

.timeline-entry {
  border-left: 2px solid var(--border-color);
  padding-left: 16px;
  margin-bottom: 20px;
  transition: border-color 0.2s;
}
.timeline-entry:hover {
  border-left-color: var(--accent-blue);
}

.timeline-entry__category {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-family: var(--font-mono);
  margin-bottom: 4px;
}

.timeline-entry__title {
  font-size: 14px;
  font-weight: 600;
  font-family: var(--font-sans);
  color: var(--text-primary);
  text-decoration: none;
  display: block;
  transition: color 0.2s;
}
.timeline-entry__title:hover {
  color: var(--accent-blue);
}

.timeline-entry__excerpt {
  color: var(--text-muted);
  font-size: 11px;
  line-height: 1.6;
  margin-top: 4px;
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 28px;
}

.pagination button {
  background: none;
  border: 1px solid var(--border-color);
  color: var(--text-muted);
  padding: 4px 10px;
  border-radius: 3px;
  font-size: 11px;
  cursor: pointer;
  font-family: var(--font-mono);
  transition: border-color 0.2s, color 0.2s;
}

.pagination button:hover:not(:disabled) {
  color: var(--accent-blue);
  border-color: var(--accent-blue);
}

.pagination button:disabled {
  color: var(--text-muted);
  opacity: 0.4;
  cursor: not-allowed;
}

.pagination button.active {
  color: var(--text-primary);
  background: var(--border-color);
}
</style>
