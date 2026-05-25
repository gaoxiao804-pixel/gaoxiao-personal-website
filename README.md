# 高筱的个人网站

基于 Vue 3 + Vite + Element Plus 构建的个人网站，包含个人简历、项目展示、技术博客三大板块。

## 技术栈

- **前端框架**: Vue 3 (Composition API) + TypeScript
- **构建工具**: Vite
- **UI 组件库**: Element Plus
- **路由**: Vue Router
- **Markdown 渲染**: markdown-it
- **粒子背景**: Canvas API + face-api.js（可选摄像头交互）

## 页面

| 路由 | 页面 | 说明 |
|---|---|---|
| `/` | 首页 | 个人简介、技能标签、快捷导航 |
| `/resume` | 简历 | 教育经历、工作履历、专业技能 |
| `/projects` | 项目 | 项目陈列、技术栈、成果说明 |
| `/blog` | 博客列表 | 文章列表、分类归档、分页 |
| `/blog/:slug` | 文章详情 | Markdown 渲染、代码高亮展示 |

## 本地开发

```bash
npm install
npm run dev
```


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
