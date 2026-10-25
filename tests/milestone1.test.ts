import { describe, expect, test } from 'bun:test';
import { createApp } from '../src/index';

describe('Checklist Uji Milestone 1', async () => {
  const devApp = await createApp({ nodeEnv: 'development' });
  const prodApp = await createApp({ nodeEnv: 'production' });

  test('serves local CSS, WOFF2 fonts, and SVG mascots without external CDNs', async () => {
    const cssRes = await devApp.handle(new Request('http://localhost/css/app.css'));
    expect(cssRes.status).toBe(200);
    const cssText = await cssRes.text();
    expect(cssText).toContain('baloo-2-700.woff2');
    expect(cssText).toContain('Nunito');
    expect(cssText.toLowerCase()).toContain('--color-paper:#fffdf4');

    const katexRes = await devApp.handle(new Request('http://localhost/css/katex.min.css'));
    expect(katexRes.status).toBe(200);

    const fontRes = await devApp.handle(new Request('http://localhost/fonts/baloo-2-700.woff2'));
    expect(fontRes.status).toBe(200);

    const svgRes = await devApp.handle(new Request('http://localhost/img/mascot-404.svg'));
    expect(svgRes.status).toBe(200);
  });

  test('/dev/komponen renders all 15 base components and enforces attempt marker rules', async () => {
    const res = await devApp.handle(new Request('http://localhost/dev/komponen'));
    expect(res.status).toBe(200);
    const html = await res.text();

    // No external CDNs or em dashes
    expect(html).not.toContain('fonts.googleapis.com');
    expect(html).not.toContain('cdn.tailwindcss.com');
    expect(html).not.toContain('lh3.googleusercontent.com');
    expect(html).not.toContain('\u2014');
    expect(html).not.toContain('Tryout Akbar');

    // Long formula wrapped in math-scroll
    expect(html).toContain('class="math-scroll"');
    expect(html).toContain('katex-display');
    expect(html).toContain('min-h-[48px]');

    // Extract QuestionCard section and verify ZERO green/red/check_circle in attempt cards
    const qStart = html.indexOf('id="catalog-questions"');
    const qEnd = html.indexOf('14. EXPLANATION CARD');
    expect(qStart).toBeGreaterThan(0);
    expect(qEnd).toBeGreaterThan(qStart);
    const questionCardsMarkup = html.slice(qStart, qEnd);

    expect(questionCardsMarkup).not.toContain('check_circle');
    expect(questionCardsMarkup).not.toContain('bg-correct');
    expect(questionCardsMarkup).not.toContain('text-correct');
    expect(questionCardsMarkup).not.toContain('bg-wrong');
    expect(questionCardsMarkup).not.toContain('text-wrong');
    expect(questionCardsMarkup).toContain('data-radio-dot');
    expect(questionCardsMarkup).toContain('data-checkbox-mark');
    expect(questionCardsMarkup).toContain('bg-stabilo');
  });

  test('/dev/komponen returns 404 when NODE_ENV === production', async () => {
    const res = await prodApp.handle(new Request('http://localhost/dev/komponen'));
    expect(res.status).toBe(404);
    const html = await res.text();
    expect(html).toContain('/img/mascot-404.svg');
    expect(html).not.toContain('Katalog 15 Komponen Dasar');
  });

  test('unknown path returns 404 Buku Tulis page with mascot and casual kamu greeting', async () => {
    const res = await devApp.handle(new Request('http://localhost/alamat-ngawur'));
    expect(res.status).toBe(404);
    const html = await res.text();
    expect(html).toContain('/img/mascot-404.svg');
    expect(html).toContain('kamu cari');
    expect(html).toContain('href="/"');
    expect(html).not.toContain('\u2014');
  });
});
