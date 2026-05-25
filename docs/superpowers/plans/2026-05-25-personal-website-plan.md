# Personal Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a light-weight personal website for 高筱 with resume, projects, and blog using Vue3 + Vite + Element Plus, IDE-inspired dark theme.

**Architecture:** Vue 3 SPA with Vue Router (5 routes), shared AppShell (nav + footer), Canvas-based particle background, face-api.js for webcam-reactive particles. Markdown blog parsed at build time via `import.meta.glob` + `markdown-it`. Static output to `dist/`.

**Tech Stack:** Vue 3 (Composition API), TypeScript, Vite, Element Plus, Vue Router, markdown-it, face-api.js (CDN)

---

## File Structure

```
src/
├── main.ts                          # App entry, register router + Element Plus
├── App.vue                          # Root: AppShell + ParticleBackground
├── env.d.ts                         # Vite env types
├── router/
│   └── index.ts                     # Route definitions
├── styles/
│   └── global.css                   # CSS variables, reset, responsive breakpoints
├── components/
│   ├── AppShell.vue                 # NavBar + <router-view> + PageFooter
│   ├── NavBar.vue                   # Centered top nav
│   ├── PageFooter.vue               # Copyright + tagline + social links
│   ├── ParticleBackground.vue       # Canvas particles (ambient + camera-reactive)
│   ├── SectionHeader.vue            # /* 01. Title */ comment-style header
│   └── QuickNavCard.vue             # Homepage quick-nav card with SVG icon
├── views/
│   ├── HomePage.vue                 # Hero + skill tags + 3 quick-nav cards
│   ├── ResumePage.vue               # Personal info, education, experience, skills
│   ├── ProjectsPage.vue             # Project entries list
│   ├── BlogListPage.vue             # Article list with pagination
│   └── BlogPostPage.vue             # Rendered markdown article
├── data/
│   ├── resume.ts                    # Personal info, education, experience, skills
│   ├── projects.ts                  # Project entries
│   └── blog.ts                      # Article metadata + markdown loading
├── utils/
│   └── markdown.ts                  # markdown-it renderer setup
└── content/
    └── blog/
        ├── hello-world.md           # Sample article 1
        └── vue-composition-api.md   # Sample article 2
```

---

### Task 1: Scaffold Vite + Vue3 + TypeScript Project

**Files:**
- Create: `package.json`, `index.html`, `vite.config.ts`, `tsconfig.json`, `tsconfig.node.json`, `src/main.ts`, `src/App.vue`, `src/env.d.ts`

- [ ] **Step 1: Create project with Vite template**

```bash
cd f:/CLADUE_RUSUME && npm create vite@latest . -- --template vue-ts 2>&1
```

Expected: scaffolded project with package.json, index.html, vite.config.ts, etc.

- [ ] **Step 2: Install additional dependencies**

```bash
npm install vue-router element-plus markdown-it @types/markdown-it
```

- [ ] **Step 3: Install dev dependencies**

```bash
npm install -D @types/node
```

- [ ] **Step 4: Verify dev server starts**

```bash
npx vite --host 2>&1 | head -20 &
sleep 3 && curl -s http://localhost:5173 | head -5
```

Expected: HTML output. Kill the dev server after verifying.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json index.html vite.config.ts tsconfig.json tsconfig.node.json src/
git commit -m "feat: scaffold Vite + Vue3 + TS project

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 2: Configure Vite and Global Styles

**Files:**
- Modify: `vite.config.ts`
- Create: `src/styles/global.css`
- Modify: `src/main.ts`

- [ ] **Step 1: Update vite.config.ts for markdown raw imports and base path**

Replace `vite.config.ts` content:

```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  assetsInclude: ['**/*.md'],
  base: '/',
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
```

- [ ] **Step 2: Create global CSS with VS Code Dark+ variables**

Write `src/styles/global.css`:

```css
:root {
  --bg-primary: #1e1e1e;
  --bg-surface: #252526;
  --border-color: #333;
  --text-primary: #d4d4d4;
  --text-muted: #888;
  --accent-blue: #569cd6;
  --accent-green: #4ec9b0;
  --accent-yellow: #dcdcaa;
  --accent-orange: #ce9178;
  --accent-purple: #c586c0;
  --comment-green: #6a9955;
  --font-mono: 'Cascadia Code', 'Fira Code', 'JetBrains Mono', 'Consolas', monospace;
  --font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Microsoft YaHei', sans-serif;
  --content-width: 800px;
}

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body {
  background: var(--bg-primary);
  color: var(--text-primary);
  font-family: var(--font-sans);
  font-size: 14px;
  line-height: 1.6;
  min-height: 100vh;
}

a {
  color: var(--accent-blue);
  text-decoration: none;
  transition: color 0.2s;
}
a:hover {
  color: var(--accent-green);
}

code {
  font-family: var(--font-mono);
  font-size: 0.9em;
}

pre {
  background: var(--bg-surface);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  padding: 16px;
  overflow-x: auto;
}

pre code {
  background: none;
  padding: 0;
}

.section-spacer {
  margin-bottom: 28px;
}
```

- [ ] **Step 3: Update main.ts to import global CSS and register Element Plus**

Replace `src/main.ts`:

```typescript
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import './styles/global.css'

const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
```

- [ ] **Step 4: Commit**

```bash
git add vite.config.ts src/styles/global.css src/main.ts
git commit -m "feat: configure Vite, global CSS variables, Element Plus

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 3: Set Up Vue Router

**Files:**
- Create: `src/router/index.ts`

- [ ] **Step 1: Write router with all 5 routes**

Write `src/router/index.ts`:

```typescript
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomePage.vue'),
  },
  {
    path: '/resume',
    name: 'Resume',
    component: () => import('@/views/ResumePage.vue'),
  },
  {
    path: '/projects',
    name: 'Projects',
    component: () => import('@/views/ProjectsPage.vue'),
  },
  {
    path: '/blog',
    name: 'Blog',
    component: () => import('@/views/BlogListPage.vue'),
  },
  {
    path: '/blog/:slug',
    name: 'BlogPost',
    component: () => import('@/views/BlogPostPage.vue'),
    props: true,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
```

- [ ] **Step 2: Verify router exports correctly**

```bash
npx vite build --mode development 2>&1 | tail -5
```

Expected: build succeeds (views don't exist yet, but the router module itself should be valid — temporarily create stub view files if needed).

- [ ] **Step 3: Create stub view files so the import chain resolves**

Write minimal stub for each view. Create `src/views/HomePage.vue`:

```vue
<template>
  <div>Home</div>
</template>
```

Create identical stubs for `ResumePage.vue`, `ProjectsPage.vue`, `BlogListPage.vue`, `BlogPostPage.vue`.

- [ ] **Step 4: Verify build succeeds**

```bash
npx vite build 2>&1 | tail -10
```

Expected: `✓ built in Xms`

- [ ] **Step 5: Commit**

```bash
git add src/router/ src/views/
git commit -m "feat: add Vue Router with 5 routes and view stubs

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 4: Create Resume Data File

**Files:**
- Create: `src/data/resume.ts`

- [ ] **Step 1: Write resume data from extracted resume**

Write `src/data/resume.ts`:

```typescript
export interface Education {
  degree: string
  school: string
  period: string
  note?: string
}

export interface WorkExperience {
  title: string
  company: string
  period: string
  description: string[]
}

export interface ProjectSummary {
  name: string
  role: string
  period: string
  description: string
  responsibilities: string[]
  techStack: string[]
}

export interface SkillCategory {
  category: string
  items: string[]
}

export interface ResumeData {
  name: string
  title: string
  email: string
  phone: string
  location: string
  github?: string
  education: Education[]
  experience: WorkExperience[]
  skills: SkillCategory[]
  certifications: { name: string; level: string; date: string; issuer: string }[]
  projects: ProjectSummary[]
}

export const resumeData: ResumeData = {
  name: '高筱',
  title: '数据工程师',
  email: 'gaoxiao@example.com',
  phone: '18893986727',
  location: '陕西省西安市',
  github: 'github.com/gaoxiao',
  education: [
    {
      degree: '本科 · 数据科学与大数据技术',
      school: '兰州城市学院',
      period: '2018 – 2022',
    },
  ],
  experience: [
    {
      title: '数据工程师',
      company: '东方国信科技股份有限公司',
      period: '2024.11 – 至今',
      description: [
        '负责银行数据仓库建设与数据开发平台升级，整合核心业务、渠道、财务等多源数据',
        '搭建标准分层数仓体系与实时数据处理链路',
        '负责ETL流程设计与开发、任务监控与异常处理',
      ],
    },
    {
      title: '数据工程师',
      company: '东华软件股份公司',
      period: '2023.03 – 2024.10',
      description: [
        '负责银行绩效管理系统ETL流程设计与开发',
        '使用Shell脚本及DMDIS调度工具构建批量调度体系',
        '负责DM8数据库迁移、部署及日常运维',
      ],
    },
  ],
  skills: [
    {
      category: '数据库',
      items: ['Oracle', '达梦数据库', 'Greenplum', 'GBase', 'MySQL', 'Hive', 'Doris'],
    },
    {
      category: 'ETL / 调度',
      items: ['Informatica', 'DMDIS', 'DMETL', 'Shell'],
    },
    {
      category: '大数据生态',
      items: ['Kafka', 'Flink', 'Hadoop', 'Spark', 'HDFS', 'Yarn'],
    },
    {
      category: '开发语言',
      items: ['SQL', 'Shell', 'Python'],
    },
    {
      category: '操作系统',
      items: ['Linux'],
    },
  ],
  certifications: [
    {
      name: '大数据技术应用证书',
      level: '高级',
      date: '2022.12.12',
      issuer: '工业和信息化部教育与考试中心',
    },
  ],
  projects: [
    {
      name: '银行数据仓库建设与数据开发平台升级项目',
      role: '数仓开发工程师',
      period: '2024.11 – 至今',
      description:
        '为银行构建数据仓库及开发平台升级，整合核心业务、渠道、财务等多源数据，搭建标准分层数仓体系与实时数据处理链路，实现数据集成、加工、治理与服务化输出。',
      responsibilities: [
        '负责多源系统数据接入与ETL开发，完成ODS/DWD/DWA层数据加工与模型开发',
        '基于Informatica完成数据抽取、转换及加载，保障数据准确性与稳定性',
        '负责批量ETL任务监控与异常处理，快速定位字段异常、连接超时及跑批失败等问题',
        '参与数据开发平台升级及运维，完成Linux环境部署、日志分析及系统问题排查',
      ],
      techStack: ['Informatica', 'Oracle', 'Linux', 'Shell'],
    },
    {
      name: '1104与金融统计监管报送系统',
      role: '数据开发工程师',
      period: '2024.11 – 至今',
      description:
        '面向银保监会监管要求，建设1104非现场报表与金融统计数据报送体系，支撑全行监管数据采集、加工、校验与上报全流程。',
      responsibilities: [
        '主导统一法人改革相关数据迁移及监管报表改造，完成1104及金融统计报表取数逻辑重构',
        '负责监管指标口径梳理、总分核对及异常数据排查，解决跨系统数据差异及数据不平问题',
        '完成日报、旬报、月报、季报等多类监管报表改造与上线',
        '负责Oracle存储过程开发及SQL性能优化，提升报表取数效率与系统稳定性',
        '负责WebLogic服务部署、系统环境初始化及权限配置',
      ],
      techStack: ['Oracle', 'SQL', 'Linux', 'WebLogic'],
    },
    {
      name: '银行绩效管理系统',
      role: '数据开发工程师',
      period: '2023.03 – 2024.10',
      description:
        '银行绩效管理系统用于支撑全行经营分析、部门KPI考核与员工绩效核算，整合核心业务系统数据源，构建统一绩效指标体系。',
      responsibilities: [
        '负责绩效系统ETL流程设计与开发，实现SFTP自动取数、数据清洗及自动化入库',
        '使用Shell脚本及DMDIS调度工具构建批量调度体系，实现任务自动化运行',
        '开发与维护绩效指标存储过程，优化SQL逻辑，提升任务执行效率',
        '负责DM8数据库迁移、部署及日常运维，保障系统稳定运行',
      ],
      techStack: ['DM8', 'Shell', 'DMDIS', 'SQL', 'SFTP'],
    },
  ],
}
```

- [ ] **Step 2: Commit**

```bash
git add src/data/resume.ts
git commit -m "feat: add resume data with education, experience, skills, projects

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 5: Create Projects Data File

**Files:**
- Create: `src/data/projects.ts`

- [ ] **Step 1: Write projects data**

Write `src/data/projects.ts`:

```typescript
export interface Project {
  name: string
  description: string
  techStack: string[]
  role: string
  period: string
  liveUrl?: string
  sourceUrl?: string
}

export const projectsData: Project[] = [
  {
    name: '银行数据仓库建设与数据开发平台升级项目',
    period: '2024.11 – 至今',
    role: '数仓开发工程师',
    description:
      '为银行构建数据仓库及开发平台升级，整合多源数据，搭建标准分层数仓体系与实时数据处理链路，实现数据集成、加工、治理与服务化输出。',
    techStack: ['Informatica', 'Oracle', 'Linux', 'Shell', 'SQL'],
  },
  {
    name: '1104与金融统计监管报送系统',
    period: '2024.11 – 至今',
    role: '数据开发工程师',
    description:
      '建设1104非现场报表与金融统计数据报送体系，支撑全行监管数据采集、加工、校验与上报全流程，主导统一法人改革落地。',
    techStack: ['Oracle', 'SQL', 'WebLogic', 'Linux', 'Shell'],
  },
  {
    name: '银行绩效管理系统',
    period: '2023.03 – 2024.10',
    role: '数据开发工程师',
    description:
      '支撑全行经营分析、部门KPI考核与员工绩效核算，整合核心业务系统数据源，构建统一绩效指标体系，涵盖数据采集到报表输出全流程。',
    techStack: ['DM8', 'Shell', 'DMDIS', 'SQL', 'SFTP'],
  },
]
```

- [ ] **Step 2: Commit**

```bash
git add src/data/projects.ts
git commit -m "feat: add projects data file

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 6: Create Blog Data and Markdown Utility

**Files:**
- Create: `src/data/blog.ts`
- Create: `src/utils/markdown.ts`

- [ ] **Step 1: Write markdown utility**

Write `src/utils/markdown.ts`:

```typescript
import MarkdownIt from 'markdown-it'

const md = new MarkdownIt({
  html: false,
  linkify: true,
  typographer: true,
  breaks: true,
  highlight: function (str: string, lang: string): string {
    const escaped = str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
    if (lang) {
      return `<pre class="code-block" data-lang="${lang}"><code>${escaped}</code></pre>`
    }
    return `<pre class="code-block"><code>${escaped}</code></pre>`
  },
})

export function renderMarkdown(content: string): string {
  return md.render(content)
}
```

- [ ] **Step 2: Write blog article metadata**

Write `src/data/blog.ts`:

```typescript
export interface BlogArticle {
  slug: string
  title: string
  date: string
  category: string
  excerpt: string
}

export const blogArticles: BlogArticle[] = [
  {
    slug: 'hello-world',
    title: 'Hello World — 我的技术博客上线了',
    date: '2026-05-20',
    category: 'general',
    excerpt: '第一篇博客，聊聊这个网站的技术选型和搭建过程。',
  },
  {
    slug: 'data-warehouse-practice',
    title: '银行数据仓库分层架构实践',
    date: '2026-05-10',
    category: 'data-engineering',
    excerpt: 'ODS、DWD、DWA三层架构在金融场景下的落地经验与踩坑总结。',
  },
  {
    slug: 'etl-best-practices',
    title: 'ETL任务监控与异常处理最佳实践',
    date: '2026-04-28',
    category: 'data-engineering',
    excerpt: '如何构建可靠的ETL监控体系：字段异常检测、超时重试、告警通知。',
  },
  {
    slug: 'sql-optimization',
    title: 'Oracle存储过程性能优化实战',
    date: '2026-04-15',
    category: 'database',
    excerpt: '从执行计划分析到索引优化，分享几个实际案例的性能调优过程。',
  },
  {
    slug: 'informatica-tips',
    title: 'Informatica PowerCenter 使用技巧',
    date: '2026-03-30',
    category: 'etl',
    excerpt: '提升Informatica开发效率的10个实用技巧和常见问题解决方案。',
  },
  {
    slug: 'linux-ops',
    title: 'Linux生产环境运维常用命令速查',
    date: '2026-03-12',
    category: 'ops',
    excerpt: '日志分析、进程管理、磁盘检查 — 数据工程师必备的Linux运维命令清单。',
  },
]
```

- [ ] **Step 3: Commit**

```bash
git add src/utils/markdown.ts src/data/blog.ts
git commit -m "feat: add blog metadata, markdown-it renderer

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 7: Create SectionHeader Component

**Files:**
- Create: `src/components/SectionHeader.vue`

- [ ] **Step 1: Write the component**

Write `src/components/SectionHeader.vue`:

```vue
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/SectionHeader.vue
git commit -m "feat: add SectionHeader component with comment syntax style

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 8: Create QuickNavCard Component

**Files:**
- Create: `src/components/QuickNavCard.vue`

- [ ] **Step 1: Write the component with filled-circle SVG icons**

Write `src/components/QuickNavCard.vue`:

```vue
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/QuickNavCard.vue
git commit -m "feat: add QuickNavCard with filled-circle SVG icons

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 9: Create NavBar Component

**Files:**
- Create: `src/components/NavBar.vue`

- [ ] **Step 1: Write NavBar**

Write `src/components/NavBar.vue`:

```vue
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/NavBar.vue
git commit -m "feat: add NavBar with IDE-style file indicator

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 10: Create PageFooter Component

**Files:**
- Create: `src/components/PageFooter.vue`

- [ ] **Step 1: Write PageFooter**

Write `src/components/PageFooter.vue`:

```vue
<template>
  <footer class="footer">
    <span class="footer__copyright">&copy; 2026 高筱</span>
    <span class="footer__tagline">Built with Vue3 + Vite</span>
    <div class="footer__links">
      <a href="https://github.com/gaoxiao" target="_blank" rel="noopener">GitHub</a>
      <span class="footer__sep">·</span>
      <a href="mailto:gaoxiao@example.com">Email</a>
      <span class="footer__sep">·</span>
      <a href="/blog">Blog</a>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 28px;
  border-top: 1px solid var(--border-color);
  font-size: 11px;
  font-family: var(--font-mono);
}

.footer__copyright {
  color: var(--text-muted);
}

.footer__tagline {
  color: var(--comment-green);
}

.footer__links {
  display: flex;
  gap: 6px;
  color: var(--text-muted);
}

.footer__links a {
  color: var(--text-muted);
  text-decoration: none;
  transition: color 0.2s;
}

.footer__links a:hover {
  color: var(--accent-blue);
}

.footer__sep {
  color: var(--border-color);
}
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/PageFooter.vue
git commit -m "feat: add PageFooter with copyright and social links

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 11: Create AppShell Component

**Files:**
- Create: `src/components/AppShell.vue`

- [ ] **Step 1: Write AppShell**

Write `src/components/AppShell.vue`:

```vue
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/AppShell.vue
git commit -m "feat: add AppShell wrapping NavBar + router-view + Footer

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 12: Create HomePage

**Files:**
- Modify: `src/views/HomePage.vue` (replace stub)

- [ ] **Step 1: Write HomePage**

Replace `src/views/HomePage.vue`:

```vue
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
```

- [ ] **Step 2: Commit**

```bash
git add src/views/HomePage.vue
git commit -m "feat: add HomePage with hero, skill tags, and quick-nav cards

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 13: Create ResumePage

**Files:**
- Modify: `src/views/ResumePage.vue` (replace stub)

- [ ] **Step 1: Write ResumePage**

Replace `src/views/ResumePage.vue`:

```vue
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
```

- [ ] **Step 2: Commit**

```bash
git add src/views/ResumePage.vue
git commit -m "feat: add ResumePage with education, experience, skills, and projects

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 14: Create ProjectsPage

**Files:**
- Modify: `src/views/ProjectsPage.vue` (replace stub)

- [ ] **Step 1: Write ProjectsPage**

Replace `src/views/ProjectsPage.vue`:

```vue
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
```

- [ ] **Step 2: Commit**

```bash
git add src/views/ProjectsPage.vue
git commit -m "feat: add ProjectsPage with timeline entries and tech badges

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 15: Create BlogListPage

**Files:**
- Modify: `src/views/BlogListPage.vue` (replace stub)

- [ ] **Step 1: Write BlogListPage with pagination**

Replace `src/views/BlogListPage.vue`:

```vue
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
```

- [ ] **Step 2: Commit**

```bash
git add src/views/BlogListPage.vue
git commit -m "feat: add BlogListPage with category tags and pagination

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 16: Create BlogPostPage with Markdown Rendering

**Files:**
- Modify: `src/views/BlogPostPage.vue` (replace stub)
- Create: `src/content/blog/` directory with 2 sample .md files

- [ ] **Step 1: Write BlogPostPage**

Replace `src/views/BlogPostPage.vue`:

```vue
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
    const content = modules[key] as string | undefined
    rawMarkdown.value = content || ''
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
```

- [ ] **Step 2: Create sample blog Markdown files**

Create directory and write `src/content/blog/hello-world.md`:

```markdown
# Hello World — 我的技术博客上线了

这是我的第一篇博客文章。搭建这个个人网站的初衷是想有一个地方记录工作中的技术积累和思考。

## 技术选型

这个网站使用 Vue 3 + Vite 构建，搭配 Element Plus 组件库。选择这些技术是因为：

- Vue 3 Composition API 提供了更好的代码组织方式
- Vite 的开发体验极快
- Element Plus 组件丰富，适合快速搭建

## 后续计划

后续会陆续分享数据工程领域的实践经验和踩坑记录，欢迎关注。
```

Write `src/content/blog/data-warehouse-practice.md`:

```markdown
# 银行数据仓库分层架构实践

在银行数据仓库建设项目中，我们采用了经典的 ODS → DWD → DWA 三层架构。本文分享一些实践经验。

## ODS 层设计

ODS（操作数据存储层）保持与源系统一致的数据结构，不做业务逻辑处理。

- 全量 / 增量策略选择
- 数据接入方式：SFTP、Kafka、API

## DWD 层设计

DWD（数据明细层）对ODS数据进行清洗、标准化、维度关联。

- 数据质量校验规则
- 缓慢变化维处理

## DWA 层设计

DWA（数据应用层）面向具体业务场景，提供聚合后的指标数据。
```

- [ ] **Step 3: Commit**

```bash
git add src/views/BlogPostPage.vue src/content/blog/
git commit -m "feat: add BlogPostPage with markdown-it rendering and sample articles

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 17: Create ParticleBackground Component

**Files:**
- Create: `src/components/ParticleBackground.vue`

- [ ] **Step 1: Write ParticleBackground with face-api.js**

Write `src/components/ParticleBackground.vue`:

```vue
<template>
  <div class="particle-bg">
    <canvas ref="canvasRef" class="particle-bg__canvas" />
    <div v-if="cameraActive" class="particle-bg__indicator">● Camera active</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)
const cameraActive = ref(false)

let ctx: CanvasRenderingContext2D | null = null
let animId = 0
let particles: Particle[] = []
let facePosition: { x: number; y: number } | null = null
let video: HTMLVideoElement | null = null
let faceApiLoaded = false

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  opacity: number
}

const PARTICLE_COUNT = 60

function createParticle(w: number, h: number): Particle {
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    radius: Math.random() * 2 + 0.5,
    opacity: Math.random() * 0.5 + 0.1,
  }
}

function initParticles(w: number, h: number) {
  particles = Array.from({ length: PARTICLE_COUNT }, () => createParticle(w, h))
}

function animate() {
  const canvas = canvasRef.value
  if (!canvas || !ctx) return
  const w = canvas.width
  const h = canvas.height

  ctx.clearRect(0, 0, w, h)

  for (const p of particles) {
    // Face-reactive movement
    if (facePosition) {
      const dx = facePosition.x - p.x
      const dy = facePosition.y - p.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist > 0) {
        p.vx += (dx / dist) * 0.02
        p.vy += (dy / dist) * 0.02
      }
    }

    // Apply velocity with damping
    p.x += p.vx
    p.y += p.vy
    p.vx *= 0.995
    p.vy *= 0.995

    // Add slight random drift
    p.vx += (Math.random() - 0.5) * 0.05
    p.vy += (Math.random() - 0.5) * 0.05

    // Wrap around edges
    if (p.x < 0) p.x = w
    if (p.x > w) p.x = 0
    if (p.y < 0) p.y = h
    if (p.y > h) p.y = 0

    // Draw
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(86, 156, 214, ${p.opacity})`
    ctx.fill()
  }

  animId = requestAnimationFrame(animate)
}

async function startCamera() {
  // Load face-api models from CDN if not loaded
  if (!faceApiLoaded) {
    try {
      await Promise.all([
        (window as any).faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
        (window as any).faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
      ])
      faceApiLoaded = true
    } catch {
      // face-api.js models not available; stay in ambient mode
      return
    }
  }

  try {
    video = document.createElement('video')
    video.width = 640
    video.height = 480
    const stream = await navigator.mediaDevices.getUserMedia({ video: true })
    video.srcObject = stream
    await video.play()
    cameraActive.value = true
    detectFace()
  } catch {
    // Camera permission denied; stay in ambient mode
  }
}

async function detectFace() {
  if (!video || !cameraActive.value) return

  const detection = await (window as any).faceapi
    .detectSingleFace(video, new (window as any).faceapi.TinyFaceDetectorOptions())
    .withFaceLandmarks()

  if (detection) {
    const canvas = canvasRef.value
    if (canvas) {
      facePosition = {
        x: (1 - detection.detection.box.x / 640) * canvas.width,
        y: (detection.detection.box.y / 480) * canvas.height,
      }
    }
  } else {
    facePosition = null
  }

  if (cameraActive.value) {
    setTimeout(() => detectFace(), 100)
  }
}

function stopCamera() {
  cameraActive.value = false
  facePosition = null
  if (video && video.srcObject) {
    (video.srcObject as MediaStream).getTracks().forEach(t => t.stop())
  }
}

function handleResize() {
  const canvas = canvasRef.value
  if (!canvas) return
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  if (particles.length === 0) {
    initParticles(canvas.width, canvas.height)
  }
}

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  ctx = canvas.getContext('2d')
  handleResize()
  animate()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  cancelAnimationFrame(animId)
  stopCamera()
  window.removeEventListener('resize', handleResize)
})

defineExpose({ startCamera, stopCamera, cameraActive })
</script>

<style scoped>
.particle-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}

.particle-bg__canvas {
  width: 100%;
  height: 100%;
}

.particle-bg__indicator {
  position: fixed;
  bottom: 12px;
  left: 12px;
  color: var(--accent-green);
  font-family: var(--font-mono);
  font-size: 10px;
  z-index: 1;
  opacity: 0.6;
}
</style>
```

- [ ] **Step 2: Add face-api.js CDN to index.html**

Modify `index.html` to include the face-api.js script before `</head>`:

```html
<script defer src="https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/dist/face-api.min.js"></script>
```

- [ ] **Step 3: Commit**

```bash
git add src/components/ParticleBackground.vue index.html
git commit -m "feat: add particle background with optional face-api.js camera tracking

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 18: Wire App.vue and Finalize Shell

**Files:**
- Modify: `src/App.vue`

- [ ] **Step 1: Write App.vue with ParticleBackground + AppShell**

Replace `src/App.vue`:

```vue
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
```

- [ ] **Step 2: Verify dev server**

```bash
npx vite --host &
sleep 3 && curl -s http://localhost:5173 | head -10
```

Expected: HTML output with the app shell.

- [ ] **Step 3: Commit**

```bash
git add src/App.vue
git commit -m "feat: wire App.vue with ParticleBackground + AppShell

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 19: Add Responsive Styles

**Files:**
- Modify: `src/styles/global.css` (append)
- Modify: `src/components/NavBar.vue` (append scoped style)

- [ ] **Step 1: Add mobile responsive styles to global.css**

Append to `src/styles/global.css`:

```css
@media (max-width: 768px) {
  :root {
    --content-width: 100%;
  }

  html, body {
    font-size: 13px;
  }

  .section-spacer {
    margin-bottom: 22px;
  }
}
```

- [ ] **Step 2: Add mobile styles to NavBar**

Append to NavBar's `<style scoped>`:

```css
@media (max-width: 600px) {
  .navbar {
    flex-direction: column;
    gap: 8px;
    padding: 10px 16px;
  }

  .navbar__links {
    gap: 16px;
  }

  .navbar__link {
    font-size: 11px;
  }

  .navbar__file {
    display: none;
  }
}
```

- [ ] **Step 3: Add mobile styles to PageFooter**

Append to PageFooter's `<style scoped>`:

```css
@media (max-width: 600px) {
  .footer {
    flex-direction: column;
    gap: 6px;
    text-align: center;
    padding: 12px 16px;
  }
}
```

- [ ] **Step 4: Commit**

```bash
git add src/styles/global.css src/components/NavBar.vue src/components/PageFooter.vue
git commit -m "feat: add responsive styles for mobile (768px breakpoint)

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 20: Write README

**Files:**
- Create: `README.md`

- [ ] **Step 1: Write README**

Write `README.md`:

```markdown
# 高筱的个人网站

基于 Vue 3 + Vite + Element Plus 构建的个人网站，包含个人简历、项目展示、技术博客三大板块。

## 技术栈

- **前端框架**: Vue 3 (Composition API) + TypeScript
- **构建工具**: Vite
- **UI 组件库**: Element Plus
- **路由**: Vue Router
- **Markdown 渲染**: markdown-it
- **粒子背景**: Canvas API + face-api.js（可选摄像头交互）
- **代码高亮**: markdown-it 内置 highlight

## 页面

| 路由 | 页面 | 说明 |
|---|---|---|
| `/` | 首页 | 个人简介、技能标签、快捷导航 |
| `/resume` | 简历 | 教育经历、工作履历、专业技能 |
| `/projects` | 项目 | 项目陈列、技术栈、成果说明 |
| `/blog` | 博客列表 | 文章列表、分类归档、分页 |
| `/blog/:slug` | 文章详情 | Markdown 渲染、代码高亮 |

## 本地开发

```bash
npm install
npm run dev
```

访问 http://localhost:5173

## 构建部署

```bash
npm run build
```

静态文件输出到 `dist/`，可部署到 GitHub Pages、Vercel、Netlify 等平台。

## 自定义内容

- 简历数据: `src/data/resume.ts`
- 项目数据: `src/data/projects.ts`
- 博客元数据: `src/data/blog.ts`
- 博客文章: `src/content/blog/*.md`

## 协议

MIT
```

- [ ] **Step 2: Commit**

```bash
git add README.md
git commit -m "docs: add README with tech stack, pages, and development guide

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 21: Build and Verify

- [ ] **Step 1: Install dependencies and build**

```bash
cd f:/CLADUE_RUSUME && npm install && npm run build
```

Expected: `✓ built in Xms`, output in `dist/`.

- [ ] **Step 2: Check dist output**

```bash
ls dist/ && ls dist/assets/
```

Expected: `index.html`, `assets/` directory with JS and CSS bundles.

- [ ] **Step 3: Preview the build**

```bash
npx vite preview --host &
sleep 3 && curl -s http://localhost:4173 | head -10
```

Expected: HTML output. Kill the preview server after verifying.

- [ ] **Step 4: Commit any remaining changes**

```bash
git status
```

If clean, plan is complete. If there are untracked changes, review and commit them.

---
