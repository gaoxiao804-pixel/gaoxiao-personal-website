<template>
  <div class="blog-post">
    <div v-if="!article" class="blog-post__loading">
      <p>// Article not found</p>
      <router-link to="/blog">← Back to Blog</router-link>
    </div>

    <template v-else>
      <div class="blog-post__meta" :style="{ color: categoryColor(article.category) }">
        {{ article.category }} · {{ article.date }}
      </div>
      <h1 class="blog-post__title">{{ article.title }}</h1>
      <div class="blog-post__body" v-html="renderedContent" />
      <router-link to="/blog" class="blog-post__back">← Back to Blog</router-link>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { blogArticles } from '@/data/blog'
import { renderMarkdown } from '@/utils/markdown'

const route = useRoute()
const slug = computed(() => route.params.slug as string)

const article = computed(() => blogArticles.find(a => a.slug === slug.value))

const rawMarkdown = ref('')
const renderedContent = computed(() => {
  if (!rawMarkdown.value) return ''
  return renderMarkdown(rawMarkdown.value)
})

async function loadMarkdown(slug: string) {
  try {
    const modules = import.meta.glob('/src/content/blog/*.md', { query: '?raw', import: 'default', eager: true })
    const key = `/src/content/blog/${slug}.md`
    rawMarkdown.value = (modules[key] as string) || ''
  } catch {
    rawMarkdown.value = ''
  }
}

watch(slug, (val) => loadMarkdown(val), { immediate: true })

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
.blog-post__loading {
  text-align: center;
  padding: 40px 0;
  font-family: var(--font-mono);
  color: var(--text-muted);
}

.blog-post__meta {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-family: var(--font-mono);
  margin-bottom: 8px;
}

.blog-post__title {
  font-size: 18px;
  font-weight: 600;
  font-family: var(--font-sans);
  color: var(--text-primary);
  margin-bottom: 24px;
}

.blog-post__body {
  font-family: var(--font-sans);
  color: var(--text-primary);
  font-size: 13px;
  line-height: 1.8;
}

.blog-post__body :deep(h2) {
  font-family: var(--font-mono);
  font-size: 14px;
  color: var(--accent-blue);
  margin-top: 24px;
  margin-bottom: 12px;
}

.blog-post__body :deep(h2::before) {
  content: '## ';
  color: var(--comment-green);
}

.blog-post__body :deep(p) {
  margin-bottom: 12px;
}

.blog-post__body :deep(.code-block) {
  background: var(--bg-surface);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  padding: 14px;
  margin: 12px 0;
  overflow-x: auto;
}

.blog-post__body :deep(.code-block code) {
  font-family: var(--font-mono);
  font-size: 11px;
  line-height: 1.6;
}

.blog-post__body :deep(code) {
  background: var(--border-color);
  padding: 1px 5px;
  border-radius: 2px;
  font-family: var(--font-mono);
  font-size: 0.9em;
  color: var(--accent-orange);
}

.blog-post__body :deep(.code-block code) {
  background: none;
  padding: 0;
  color: var(--text-primary);
}

.blog-post__back {
  display: inline-block;
  margin-top: 32px;
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--accent-blue);
  text-decoration: none;
}
.blog-post__back:hover {
  color: var(--accent-green);
}
</style>
