import { describe, expect, test } from 'bun:test';
import {
  formatLevelShort,
  formatLevelTitle,
  formatQuestionInstruction,
  formatQuestionStatusLabel,
  formatQuestionTypeLabel,
  isValidLevel,
} from '../src/lib/format';
import {
  escapeHtml,
  renderInlineMarkdownWithLatex,
  renderMarkdownWithLatex,
} from '../src/lib/markdown';
import {
  buildLongVideoUrl,
  buildShortsUrl,
  buildTopicVideoUrl,
  extractYoutubeVideoId,
  formatSecondsToTime,
  parseTimeToSeconds,
} from '../src/lib/youtube';

describe('renderMarkdownWithLatex & escapeHtml', () => {
  test('renders inline $...$ and \\(...\\) and block $$...$$ and \\[...\\]', () => {
    const out = renderMarkdownWithLatex(
      'Nilai $\\frac{a^3}{a}$ sama dengan \\(a^2\\).\n\n$$x^2 + 2x + 1 = 0$$\n\n\\[y = mx + c\\]'
    );
    expect(out).toContain('katex');
    expect(out).toContain('math-scroll');
    expect(out).toContain('katex-display');
  });

  test('disables raw HTML to prevent XSS and escapes entities properly', () => {
    const out = renderMarkdownWithLatex('Halo <script>alert("xss")</script> **tebal**');
    expect(out).not.toContain('<script>');
    expect(out).toContain('&lt;script&gt;');
    expect(out).toContain('<strong>tebal</strong>');

    const inlineOut = renderInlineMarkdownWithLatex('<img src=x onerror=alert(1)> $2^3$');
    expect(inlineOut).not.toContain('<img');
    expect(inlineOut).toContain('&lt;img');

    expect(escapeHtml('<div class="a">&\'</div>')).toBe(
      '&lt;div class=&quot;a&quot;&gt;&amp;&#39;&lt;/div&gt;'
    );
  });
});

describe('youtube helper', () => {
  test('extracts ID from youtu.be, watch?v=, shorts/, embed/ and rejects invalid URLs', () => {
    expect(extractYoutubeVideoId('https://youtu.be/dQw4w9WgXcQ?t=45')).toBe('dQw4w9WgXcQ');
    expect(extractYoutubeVideoId('https://www.youtube.com/watch?v=dQw4w9WgXcQ&feature=share')).toBe(
      'dQw4w9WgXcQ'
    );
    expect(extractYoutubeVideoId('https://youtube.com/shorts/abc123XYZ_-?si=test')).toBe(
      'abc123XYZ_-'
    );
    expect(extractYoutubeVideoId('https://www.youtube.com/embed/abc123XYZ_-')).toBe('abc123XYZ_-');
    expect(extractYoutubeVideoId('https://evil.com/watch?v=dQw4w9WgXcQ')).toBeNull();
    expect(extractYoutubeVideoId('https://youtu.be/pendek')).toBeNull();
  });

  test('builds canonical Shorts, topic, and long video URLs and converts mm:ss <-> seconds', () => {
    expect(buildShortsUrl('abc123XYZ_-')).toBe('https://youtube.com/shorts/abc123XYZ_-');
    expect(buildTopicVideoUrl('dQw4w9WgXcQ')).toBe('https://youtu.be/dQw4w9WgXcQ');
    expect(buildLongVideoUrl('dQw4w9WgXcQ', 200)).toBe('https://youtu.be/dQw4w9WgXcQ?t=200');
    expect(parseTimeToSeconds('03:20')).toBe(200);
    expect(parseTimeToSeconds('03:99')).toBeNull();
    expect(formatSecondsToTime(200)).toBe('03:20');
  });
});

describe('format helper', () => {
  test('validates levels and formats level, question type, instruction, and status labels', () => {
    expect(isValidLevel('sd')).toBe(true);
    expect(isValidLevel('smp')).toBe(true);
    expect(isValidLevel('sma')).toBe(false);

    expect(formatLevelTitle('sd')).toBe('SD Kelas 6');
    expect(formatLevelTitle('smp')).toBe('SMP Kelas 9');
    expect(formatLevelShort('sd')).toBe('SD');
    expect(formatLevelShort('smp')).toBe('SMP');

    expect(formatQuestionTypeLabel('single')).toBe('Pilihan Ganda');
    expect(formatQuestionTypeLabel('multiple')).toBe('Pilihan Ganda Kompleks');
    expect(formatQuestionTypeLabel('category')).toBe('Benar atau Salah');

    expect(formatQuestionInstruction('single')).toContain('1 jawaban');
    expect(formatQuestionInstruction('multiple')).toContain('semua jawaban');
    expect(formatQuestionInstruction('category')).toContain('Benar atau Salah');

    expect(formatQuestionStatusLabel('published')).toBe('Terbit');
    expect(formatQuestionStatusLabel('draft')).toBe('Draft');
    expect(formatQuestionStatusLabel('archived')).toBe('Arsip');
  });
});
