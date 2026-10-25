import { describe, expect, test } from 'bun:test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { createApp } from '../src/index';

describe('Milestone 2: Halaman Siswa Lengkap (Data Dummy Server)', async () => {
  const app = await createApp({ nodeEnv: 'development' });

  test('Aturan URL (Poin 26): halaman umum tanpa jenjang aktif, awalan salah jatuh ke 404', async () => {
    const homeRes = await app.handle(new Request('http://localhost/'));
    expect(homeRes.status).toBe(200);

    const daftarRes = await app.handle(new Request('http://localhost/daftar'));
    expect(daftarRes.status).toBe(200);

    const masukRes = await app.handle(new Request('http://localhost/masuk'));
    expect(masukRes.status).toBe(200);

    const keluarRes = await app.handle(new Request('http://localhost/keluar'));
    expect(keluarRes.status).toBe(303);
    expect(keluarRes.headers.get('location')).toBe('/');

    // Awalan jenjang pada daftar/masuk wajib 404
    const wrongDaftar = await app.handle(new Request('http://localhost/smp/daftar'));
    expect(wrongDaftar.status).toBe(404);

    const wrongMasuk = await app.handle(new Request('http://localhost/sd/masuk'));
    expect(wrongMasuk.status).toBe(404);

    // Jenjang tidak valid wajib 404
    const wrongLevel = await app.handle(new Request('http://localhost/sma'));
    expect(wrongLevel.status).toBe(404);
  });

  test('1. Beranda (/): menampilkan SD Kelas 6 & SMP Kelas 9 aktif, bebas em dash & Tryout Akbar', async () => {
    const res = await app.handle(new Request('http://localhost/'));
    const html = await res.text();

    expect(html).toContain('SD Kelas 6');
    expect(html).toContain('SMP Kelas 9');
    expect(html).toContain('href="/sd"');
    expect(html).toContain('href="/smp"');
    expect(html).toContain('href="/masuk"');
    expect(html).toContain('href="/daftar"');
    expect(html).not.toContain('Tryout Akbar');
    expect(html).not.toContain('/admin');
    expect(html).not.toContain('\u2014');
    expect(html).not.toContain('<iframe');
  });

  test('2. Halaman Jenjang (/sd & /smp): mode tamu dan mode demo login berfungsi', async () => {
    const guestRes = await app.handle(new Request('http://localhost/smp?sesi=tamu'));
    expect(guestRes.status).toBe(200);
    const guestHtml = await guestRes.text();
    expect(guestHtml).toContain('Tanpa daftar');
    expect(guestHtml).toContain('Perlu daftar dulu');
    expect(guestHtml).not.toContain('VERSION A');
    expect(guestHtml).not.toContain('/admin');
    expect(guestHtml).not.toContain('\u2014');

    const loginRes = await app.handle(new Request('http://localhost/smp?sesi=masuk'));
    expect(loginRes.status).toBe(200);
    const loginHtml = await loginRes.text();
    expect(loginHtml).toContain('Raka');
    expect(loginHtml).toContain('href="/keluar"');
    expect(loginHtml).toContain('Selesai');

    const sdRes = await app.handle(new Request('http://localhost/sd'));
    expect(sdRes.status).toBe(200);
    const sdHtml = await sdRes.text();
    expect(sdHtml).toContain('SD Kelas 6');
    expect(sdHtml).not.toContain('\u2014');
  });

  test('3. Halaman Materi: tombol YouTube kondisional di tab baru, tidak ada iframe', async () => {
    const withVideoRes = await app.handle(
      new Request('http://localhost/smp/materi/bilangan-berpangkat')
    );
    expect(withVideoRes.status).toBe(200);
    const withVideoHtml = await withVideoRes.text();
    expect(withVideoHtml).toContain('Tonton Materi di YouTube');
    expect(withVideoHtml).toContain('target="_blank"');
    expect(withVideoHtml).toContain('rel="noopener noreferrer"');
    expect(withVideoHtml).not.toContain('<iframe');
    expect(withVideoHtml).not.toContain('Tryout Akbar');
    expect(withVideoHtml).not.toContain('\u2014');

    const withoutVideoRes = await app.handle(
      new Request('http://localhost/smp/materi/bentuk-akar')
    );
    expect(withoutVideoRes.status).toBe(200);
    const withoutVideoHtml = await withoutVideoRes.text();
    expect(withoutVideoHtml).not.toContain('Tonton Materi di YouTube');
  });

  test('4. Pengerjaan Latihan: steril dari kunci/pembahasan/video, hanya stabilo & navy, tanpa check_circle', async () => {
    const res = await app.handle(
      new Request('http://localhost/smp/latihan/latihan-bilangan-berpangkat-1')
    );
    expect(res.status).toBe(200);
    const html = await res.text();

    // Memuat ketiga bentuk soal
    expect(html).toContain('data-question-type="single"');
    expect(html).toContain('data-question-type="multiple"');
    expect(html).toContain('data-question-type="category"');
    expect(html).toContain('0 dari 5 terjawab');
    expect(html).toContain('Kumpulkan Jawaban');
    expect(html).toContain('katex');

    // ATURAN KEAMANAN SOAL #1 & #3 & #22: Nol bocoran kunci, pembahasan, video pembahasan, maupun soal draft/arsip
    expect(html).not.toContain('sH0rtSmp001');
    expect(html).not.toContain('sH0rtSmp002');
    expect(html).not.toContain('k9X8zV7mQ1A');
    expect(html).not.toContain('youtube.com/shorts');
    expect(html).not.toContain('youtu.be/');
    expect(html).not.toContain('Pembahasan Langkah demi Langkah');
    expect(html).not.toContain('Gunakan sifat perkalian bilangan berpangkat');
    expect(html).not.toContain('q-smp-draft');
    expect(html).not.toContain('q-smp-arch');

    // ATURAN PENANDA OPSI: Dilarang check_circle, dilarang hijau/merah pada kartu soal pengerjaan
    expect(html).not.toContain('check_circle');
    expect(html).not.toContain('bg-correct');
    expect(html).not.toContain('text-correct');
    expect(html).not.toContain('/admin');
    expect(html).not.toContain('\u2014');

    // Cek juga isi public/js/practice.js bebas bocoran kunci & bebas warna hijau/merah
    const practiceJs = readFileSync(join(process.cwd(), 'public/js/practice.js'), 'utf-8');
    expect(practiceJs).not.toContain('answerKey');
    expect(practiceJs).not.toContain('bg-correct');
    expect(practiceJs).not.toContain('bg-wrong');
    expect(practiceJs).not.toContain('check_circle');

    // POST submit mengarahkan 303 ke halaman hasil
    const submitRes = await app.handle(
      new Request('http://localhost/smp/latihan/latihan-bilangan-berpangkat-1/kumpulkan', {
        method: 'POST',
      })
    );
    expect(submitRes.status).toBe(303);
    expect(submitRes.headers.get('location')).toBe(
      '/smp/latihan/latihan-bilangan-berpangkat-1/hasil'
    );
  });

  test('5. Hasil Latihan: menampilkan skor, status Benar/Salah/Kosong, pembahasan KaTeX, video kondisional, dan Ulangi Latihan', async () => {
    const res = await app.handle(
      new Request('http://localhost/smp/latihan/latihan-bilangan-berpangkat-1/hasil')
    );
    expect(res.status).toBe(200);
    const html = await res.text();

    expect(html).toContain('SKOR KAMU');
    expect(html).toContain('Benar');
    expect(html).toContain('Salah');
    expect(html).toContain('Kosong');
    expect(html).toContain('Pembahasan Langkah demi Langkah');
    expect(html).toContain('Lihat Pembahasan Video');
    expect(html).toContain('Tonton Penjelasan Lengkap (menit 03:20)');
    expect(html).toContain('Ulangi Latihan');
    expect(html).toContain('Coba TO Gratis');
    expect(html).not.toContain('<iframe');
    expect(html).not.toContain('/admin');
    expect(html).not.toContain('\u2014');
  });

  test('6. Lobi TO & Pengerjaan TO: 1 soal aktif, timer merah saat <= 5 menit, steril tanpa kunci/pembahasan/Buku Rumus', async () => {
    const lobbyRes = await app.handle(
      new Request('http://localhost/smp/tryout/simulasi-tka-smp-paket-1')
    );
    expect(lobbyRes.status).toBe(200);
    const lobbyHtml = await lobbyRes.text();
    expect(lobbyHtml).toContain('10 Soal');
    expect(lobbyHtml).toContain('30 Menit');
    expect(lobbyHtml).toContain('1 Kali');
    expect(lobbyHtml).toContain('Mulai TO');
    expect(lobbyHtml).not.toContain('\u2014');

    const examRes = await app.handle(
      new Request('http://localhost/smp/tryout/simulasi-tka-smp-paket-1/kerjakan?sisa=295')
    );
    expect(examRes.status).toBe(200);
    const examHtml = await examRes.text();

    expect(examHtml).toContain('Soal 1 dari 10');
    expect(examHtml).toContain('04:55');
    expect(examHtml).toContain('bg-wrong-bg border-wrong text-wrong'); // Timer kritis <= 5 menit
    expect(examHtml).toContain('Daftar Nomor Soal');
    expect(examHtml).toContain('sheet-tryout-numbers');

    // Audit & Domain Security Checks
    expect(examHtml).not.toContain('Buku Rumus');
    expect(examHtml).not.toContain('sH0rtSmp001');
    expect(examHtml).not.toContain('k9X8zV7mQ1A');
    expect(examHtml).not.toContain('Pembahasan Langkah demi Langkah');
    expect(examHtml).not.toContain('check_circle');
    expect(examHtml).not.toContain('bg-correct');
    expect(examHtml).not.toContain('/admin');
    expect(examHtml).not.toContain('\u2014');

    const tryoutJs = readFileSync(join(process.cwd(), 'public/js/tryout.js'), 'utf-8');
    expect(tryoutJs).not.toContain('answerKey');
    expect(tryoutJs).not.toContain('bg-correct');
    expect(tryoutJs).not.toContain('check_circle');
  });

  test('7. Hasil TO: menampilkan skor & pembahasan lengkap TANPA tombol Ulangi', async () => {
    const res = await app.handle(
      new Request('http://localhost/smp/tryout/simulasi-tka-smp-paket-1/hasil')
    );
    expect(res.status).toBe(200);
    const html = await res.text();

    expect(html).toContain('NILAI TO');
    expect(html).toContain('Pembahasan Soal TO');
    expect(html).toContain('Kembali ke Halaman Jenjang');
    expect(html).not.toContain('Ulangi');
    expect(html).not.toContain('/admin');
    expect(html).not.toContain('\u2014');
  });

  test('8. Daftar & Masuk: validasi persetujuan orang tua/wali, pesan error, dan bantuan WhatsApp', async () => {
    const regHtml = await (await app.handle(new Request('http://localhost/daftar'))).text();
    expect(regHtml).toContain('Orang tua atau wali sudah tahu aku daftar di sini');
    expect(regHtml).not.toContain('type="email"');
    expect(regHtml).not.toContain('\u2014');

    // Submit daftar tanpa centang persetujuan orang tua -> 400 dengan pesan error
    const badForm = new FormData();
    badForm.set('displayName', 'Budi');
    badForm.set('username', 'budi_sd6');
    badForm.set('password', 'rahasia123');
    const badRegRes = await app.handle(
      new Request('http://localhost/daftar', { method: 'POST', body: badForm })
    );
    expect(badRegRes.status).toBe(400);
    const badRegHtml = await badRegRes.text();
    expect(badRegHtml).toContain('Persetujuan orang tua atau wali wajib dicentang');

    const loginErrHtml = await (
      await app.handle(new Request('http://localhost/masuk?error=kredensial_salah'))
    ).text();
    expect(loginErrHtml).toContain('Username atau password belum tepat');
    expect(loginErrHtml).toContain('wa.me');
    expect(loginErrHtml).not.toContain('\u2014');
  });
});
