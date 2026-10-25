import { describe, expect, test } from 'bun:test';
import { createApp } from '../src/index';

describe('Smoke Test Seluruh Route (Deskripsi PR #3 & Aturan Keamanan)', async () => {
  const app = await createApp({ nodeEnv: 'development' });
  const prodApp = await createApp({ nodeEnv: 'production' });

  // 1. Request GET ke SEMUA URL siswa, umum, admin, dan /dev/komponen
  const activeRoutes200 = [
    // Tampilan Siswa & Umum
    { name: 'Beranda', url: '/' },
    { name: 'Halaman Jenjang SD', url: '/sd' },
    { name: 'Halaman Jenjang SMP', url: '/smp' },
    { name: 'Halaman Materi', url: '/smp/materi/bilangan-berpangkat' },
    { name: 'Pengerjaan Latihan', url: '/smp/latihan/latihan-bilangan-berpangkat-1' },
    { name: 'Hasil Latihan', url: '/smp/latihan/latihan-bilangan-berpangkat-1/hasil' },
    { name: 'Lobi Tryout', url: '/smp/tryout/simulasi-tka-smp-paket-1' },
    { name: 'Pengerjaan CBT Tryout', url: '/smp/tryout/simulasi-tka-smp-paket-1/kerjakan' },
    { name: 'Hasil Tryout', url: '/smp/tryout/simulasi-tka-smp-paket-1/hasil' },
    { name: 'Daftar Siswa', url: '/daftar' },
    { name: 'Masuk Siswa', url: '/masuk' },
    { name: 'Katalog Komponen Dev', url: '/dev/komponen' },

    // Tampilan Admin
    { name: 'Masuk Admin', url: '/admin/masuk' },
    { name: 'Dashboard Admin', url: '/admin' },
    { name: 'Bank Soal Admin', url: '/admin/soal' },
    { name: 'Tambah Soal Admin', url: '/admin/soal/tambah' },
    { name: 'Edit Soal Admin', url: '/admin/soal/q-smp-01/edit' },
    { name: 'Kelola Latihan Admin', url: '/admin/latihan' },
    { name: 'Kelola Tryout Admin', url: '/admin/tryout' },
    { name: 'Elemen Kisi-kisi Admin', url: '/admin/elemen' },
    { name: 'Materi Admin', url: '/admin/materi' },
    { name: 'Kelola Siswa Admin', url: '/admin/siswa' },
    { name: 'Laporan Admin', url: '/admin/laporan' },
  ];

  for (const route of activeRoutes200) {
    test(`GET ${route.url} (${route.name}) harus berstatus 200`, async () => {
      const res = await app.handle(new Request(`http://localhost${route.url}`));
      expect(res.status).toBe(200);
      const html = await res.text();
      expect(html.length).toBeGreaterThan(50);
    });
  }

  // 2. /halaman-tidak-ditemukan dan /admin/admin/latihan harus status 404
  test('GET /halaman-tidak-ditemukan dan /admin/admin/latihan harus status 404', async () => {
    const notFoundRes = await app.handle(new Request('http://localhost/halaman-tidak-ditemukan'));
    expect(notFoundRes.status).toBe(404);

    const duplicateAdminRes = await app.handle(new Request('http://localhost/admin/admin/latihan'));
    expect(duplicateAdminRes.status).toBe(404);
  });

  // 3. Saat NODE_ENV=production, /dev/komponen harus status 404
  test('Saat NODE_ENV=production, GET /dev/komponen harus status 404', async () => {
    const devProdRes = await prodApp.handle(new Request('http://localhost/dev/komponen'));
    expect(devProdRes.status).toBe(404);
  });

  // 4. Halaman pengerjaan latihan & tryout: HTML tidak boleh mengandung teks pembahasan atau penanda kunci
  test('Halaman pengerjaan latihan dan CBT tryout steril dari pembahasan dan penanda kunci', async () => {
    const practiceRes = await app.handle(
      new Request('http://localhost/smp/latihan/latihan-bilangan-berpangkat-1')
    );
    expect(practiceRes.status).toBe(200);
    const practiceHtml = await practiceRes.text();

    const tryoutRes = await app.handle(
      new Request('http://localhost/smp/tryout/simulasi-tka-smp-paket-1/kerjakan')
    );
    expect(tryoutRes.status).toBe(200);
    const tryoutHtml = await tryoutRes.text();

    const forbiddenStrings = [
      // Cuplikan pembahasan dari data dummy
      'Gunakan sifat perkalian bilangan berpangkat',
      'Pernyataan (1)',
      'Gunakan teorema Pythagoras',
      'Luas alas prisma segitiga',
      'Pembahasan Langkah demi Langkah',
      'Langkah demi langkah',

      // ID video pembahasan YouTube
      'sH0rtSmp001',
      'sH0rtSmp002',
      'k9X8zV7mQ1A',
      'youtube.com/shorts',
      'youtu.be/',

      // Penanda kunci atau status benar/salah
      'answerKey',
      'isCorrect',
      'check_circle',
      'bg-correct',
      'text-correct',
      'bg-wrong',
      'text-wrong',
    ];

    for (const leak of forbiddenStrings) {
      expect(practiceHtml).not.toContain(leak);
      expect(tryoutHtml).not.toContain(leak);
    }
  });
});
