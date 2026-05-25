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

@media (max-width: 600px) {
  .footer {
    flex-direction: column;
    gap: 6px;
    text-align: center;
    padding: 12px 16px;
  }
}
</style>
