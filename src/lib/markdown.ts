import MarkdownIt from 'markdown-it';
import katex from 'katex';

const md = new MarkdownIt({
  html: false,
  breaks: true,
  linkify: false,
});

interface MathToken {
  placeholder: string;
  renderedHtml: string;
}

function renderLatexSafe(latex: string, displayMode: boolean): string {
  const html = katex.renderToString(latex.trim(), {
    displayMode,
    throwOnError: false,
    strict: false,
    trust: false,
    output: 'htmlAndMathml',
  });
  if (displayMode) {
    return `<div class="math-scroll">${html}</div>`;
  }
  return html;
}

function extractMathTokens(source: string): { textWithPlaceholders: string; tokens: MathToken[] } {
  const tokens: MathToken[] = [];
  const makeToken = (latex: string, displayMode: boolean): string => {
    const idx = tokens.length;
    const placeholder = `@@YNMATH${idx}TOKEN@@`;
    tokens.push({
      placeholder,
      renderedHtml: renderLatexSafe(latex, displayMode),
    });
    return placeholder;
  };

  let working = source;

  // Protect inline code spans first so dollar signs inside backticks stay untouched
  const codeSpans: { placeholder: string; raw: string }[] = [];
  working = working.replace(/`+[^`]*`+/g, (match) => {
    const placeholder = `@@YNCODE${codeSpans.length}SPAN@@`;
    codeSpans.push({ placeholder, raw: match });
    return placeholder;
  });

  // 1. Block math: $$ ... $$
  working = working.replace(/\$\$([\s\S]+?)\$\$/g, (_match, expr: string) => {
    return makeToken(expr, true);
  });

  // 2. Block math: \[ ... \]
  working = working.replace(/\\\[([\s\S]+?)\\\]/g, (_match, expr: string) => {
    return makeToken(expr, true);
  });

  // 3. Inline math: \( ... \)
  working = working.replace(/\\\(([\s\S]+?)\\\)/g, (_match, expr: string) => {
    return makeToken(expr, false);
  });

  // 4. Inline math: $ ... $ (single line, non-empty, not preceded by \)
  working = working.replace(/(^|[^\\])\$(?!\$)([^\n$]+?)\$/g, (_match, prefix: string, expr: string) => {
    return `${prefix}${makeToken(expr, false)}`;
  });

  // Restore code spans before markdown-it processes them
  for (const span of codeSpans) {
    working = working.replace(span.placeholder, () => span.raw);
  }

  return { textWithPlaceholders: working, tokens };
}

function restoreMathTokens(renderedMarkdown: string, tokens: MathToken[]): string {
  let result = renderedMarkdown;
  for (const token of tokens) {
    result = result.replace(token.placeholder, () => token.renderedHtml);
  }
  return result;
}

export function renderMarkdownWithLatex(input: string): string {
  if (!input || !input.trim()) return '';
  const { textWithPlaceholders, tokens } = extractMathTokens(input);
  const html = md.render(textWithPlaceholders);
  return restoreMathTokens(html, tokens).trim();
}

export function renderInlineMarkdownWithLatex(input: string): string {
  if (!input || !input.trim()) return '';
  const { textWithPlaceholders, tokens } = extractMathTokens(input);
  const html = md.renderInline(textWithPlaceholders);
  return restoreMathTokens(html, tokens).trim();
}

export function escapeHtml(raw: string): string {
  return raw
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
