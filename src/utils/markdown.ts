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
