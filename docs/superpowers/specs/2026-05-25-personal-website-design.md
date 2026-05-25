# Personal Website Design Spec

**Date:** 2026-05-25
**Status:** Approved

---

## Overview

Lightweight personal website with resume, project showcase, and blog. IDE-inspired dark theme (VS Code Dark+ palette), responsive desktop/mobile, with an interactive particle background.

## Tech Stack

- Vue 3 (Composition API) + TypeScript
- Vite (build tool)
- Element Plus (UI components)
- Vue Router (routing)
- face-api.js (face detection for particles)
- markdown-it or vite-plugin-md (Markdown parsing)

Output: static files, no backend.

## Routes

| Route | Page | Description |
|---|---|---|
| `/` | Home | Hero with avatar, name, role, skill tags, 3 quick-nav cards |
| `/resume` | Resume | Personal info, education, experience, skills, projects |
| `/projects` | Projects | Project entries with descriptions, tech badges, links |
| `/blog` | Blog | Article list with category tags and pagination |
| `/blog/:slug` | Blog Post | Rendered Markdown article with code highlighting |

A shared shell (nav + footer) wraps all pages via Vue Router `<router-view>`.

## Visual Design

### Color Palette (VS Code Dark+)

| Token | Hex | Usage |
|---|---|---|
| Background | `#1e1e1e` | Page background |
| Surface | `#252526` | Cards, nav bar |
| Border | `#333` | Dividers, card borders |
| Text primary | `#d4d4d4` | Body text, headings |
| Text muted | `#888` | Dates, secondary info |
| Accent blue | `#569cd6` | Active nav, links, keywords |
| Accent green | `#4ec9b0` | Logo, category tags |
| Accent yellow | `#dcdcaa` | Warm highlights |
| Accent orange | `#ce9178` | Strings/values |
| Comment green | `#6a9955` | Section header comments |

### Layout

- Centered top navigation bar: logo/name left, nav links centered, file indicator right
- Content area: max-width 800px, centered, padded
- No sidebar
- Shared footer: copyright left, tech tagline center, social links right

### Typography

- Monospace for code elements, section headers, nav indicators
- System sans-serif for body text and headings
- Section headers use comment syntax: `/* 01. SectionName */`

### Section Pattern (applied consistently across all pages)

```
/* 01. SectionName */
│  Content entry with title, meta, description
│  Tech tags below
// link references
```

Left-border (2px, `#333`) on each entry. Entries stacked with 28px spacing.

### Icons

- Filled-circle SVG icons (Element Plus icon components) for quick-nav cards
- Document icon → Resume, Folder icon → Projects, Edit icon → Blog
- Each colored to match its accent (blue, orange, green)

### Hover Effects

- Nav links: color shift to accent blue, 200ms transition
- Quick-nav cards: border glow to icon color, slight scale-up
- Project entries: left border brightens on hover

## Pages Detail

### Home (`/`)

- Centered avatar placeholder (80px circle, accent border)
- Name in large sans-serif, role in comment-style green
- Skill tags as colored chips
- 3 quick-nav cards with filled-circle SVG icons + label + short description
- Cards have subtle hover glow matching icon color

### Resume (`/resume`)

Sections:
1. Personal Info — name, title, contact links
2. Education — degree, school, years, notes as comment
3. Work Experience — title, company, date range, bullet description
4. Skills — colored chip tags grouped by category
5. Projects — condensed version, title + one-liner

### Projects (`/projects`)

- Section-style listing with numbered headers
- Each entry: project name as header, description paragraph, tech badge row, link references as green comments
- Data sourced from a single `projects.json` or TypeScript data file

### Blog (`/blog`)

**List view:**
- Article entries as left-border timeline items
- Each: colored category tag + date, title, excerpt
- Simple pagination (prev/next + page numbers)

**Article detail (`/blog/:slug`):**
- Category + date header, title
- Rendered Markdown body:
  - Headings use `##` prefix style
  - Inline code in monospace accent color
  - Code blocks in `#252526` surface with syntax highlighting
- Back link to blog list

### Footer (shared)

- Copyright: `© 2026 Your Name`
- Center: `Built with Vue3 + Vite` in comment green
- Right: icon links (GitHub, Email, RSS)

## Background Particle System

### Default Mode (camera off)

- Canvas element fixed behind content, pointer-events: none
- Sparse particles drift slowly in random directions
- Ambient, non-distracting

### Camera Mode (camera on)

- User explicitly enables camera (button/toggle)
- Hidden `<video>` captures webcam — feed never displayed, never leaves the browser
- face-api.js (TensorFlow.js) detects face position from the feed
- Particles radiate from face position — movement toward an edge causes particles to surge in that direction
- No face detected: particles settle back to ambient drift
- Medium intensity: visible but not overwhelming

### Privacy

- Camera never activated without explicit user action
- No video data stored or transmitted
- Clear UI indicator when camera is active

## Responsive

- Breakpoint at ~768px: single-column layout, reduced padding
- Nav: links remain visible (no hamburger), font sizes scale down
- Blog article list: full width, no pagination truncation
- Project entries: full width stack

## Data Files

- `src/data/resume.ts` — personal info, education, experience, skills
- `src/data/projects.ts` — project entries
- `src/content/blog/*.md` — blog posts with frontmatter (title, date, category, excerpt)

## Build & Deploy

- `npm run build` outputs static files to `dist/`
- Deploy to GitHub Pages / Vercel / Netlify
- No server-side logic required
