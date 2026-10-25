import { describe, expect, test } from 'bun:test';
import { createApp } from '../src/index';

describe('Checklist Uji Milestone 3: Seluruh Halaman Admin & Live Preview Server', async () => {
  const app = await createApp({ nodeEnv: 'development' });

  // 1. Verifikasi Keamanan & Isolasi Rute Siswa
  test('Verifikasi Keamanan: tidak ada link menuju /admin dari halaman siswa mana pun', async () => {
    const studentUrls = [
      '/',
      '/sd',
      '/smp',
      '/smp/materi/bilangan-berpangkat',
      '/smp/latihan/latihan-bilangan-berpangkat-1',
      '/smp/latihan/latihan-bilangan-berpangkat-1/hasil',
      '/smp/tryout/simulasi-tka-smp-paket-1',
      '/smp/tryout/simulasi-tka-smp-paket-1/kerjakan',
      '/smp/tryout/simulasi-tka-smp-paket-1/hasil',
      '/daftar',
      '/masuk',
    ];

    for (const url of studentUrls) {
      const res = await app.handle(new Request(`http://localhost${url}`));
      expect(res.status).toBe(200);
      const html = await res.text();
      // Pastikan tidak ada href="/admin..." pada navigasi siswa
      expect(html).not.toMatch(/href="\/admin/);
    }
  });

  // 2. Dashboard Admin (/admin)
  test('1. Dashboard (/admin): metrik ringkasan, pintasan kelola konten, dan butir soal terbaru', async () => {
    const res = await app.handle(new Request('http://localhost/admin'));
    expect(res.status).toBe(200);
    const html = await res.text();

    expect(html).toContain('Dashboard');
    expect(html).toContain('Ringkasan');
    expect(html).toContain('TOTAL SOAL');
    expect(html).toContain('PAKET AKTIF');
    expect(html).toContain('TOTAL SISWA');
    expect(html).toContain('TOTAL PENGERJAAN');
    expect(html).toContain('PINTASAN KELOLA KONTEN');
    expect(html).toContain('/admin/soal/tambah');
    expect(html).toContain('/admin/latihan');
    expect(html).toContain('/admin/tryout');
    expect(html).toContain('/admin/laporan');
    expect(html).toContain('Butir Soal Terbaru');

    // Bebas em dash
    expect(html).not.toContain('—');
    expect(html).not.toContain('–');
  });

  // 3. Masuk Admin (/admin/masuk)
  test('2. Masuk Admin (/admin/masuk): kartu terpusat, badge ungu ADMIN, dan pesan error', async () => {
    // Mode normal
    const res = await app.handle(new Request('http://localhost/admin/masuk'));
    expect(res.status).toBe(200);
    const html = await res.text();
    expect(html).toContain('Masuk Sebagai Admin');
    expect(html).toContain('ADMIN PANEL');
    expect(html).toContain('bg-badge-purple');
    expect(html).toContain('admin-username');
    expect(html).toContain('admin-password');

    // Mode pesan error
    const resErr = await app.handle(new Request('http://localhost/admin/masuk?error=1'));
    expect(resErr.status).toBe(200);
    const htmlErr = await resErr.text();
    expect(htmlErr).toContain('Username atau password admin salah');
    expect(htmlErr).toContain('bg-wrong-bg');
  });

  // 4. Bank Soal (/admin/soal)
  test('3. Bank Soal (/admin/soal): filter toolbar, tabel soal, preview modal, dan tombol tambah', async () => {
    const res = await app.handle(new Request('http://localhost/admin/soal'));
    expect(res.status).toBe(200);
    const html = await res.text();

    expect(html).toContain('Bank');
    expect(html).toContain('Soal');
    expect(html).toContain('filter-level');
    expect(html).toContain('filter-element');
    expect(html).toContain('filter-topic');
    expect(html).toContain('filter-status');
    expect(html).toContain('Tambah Soal');
    expect(html).toContain('btn-open-preview');
    expect(html).toContain('modal-preview-soal');

    // Filter by level
    const resSmp = await app.handle(new Request('http://localhost/admin/soal?level=smp'));
    expect(resSmp.status).toBe(200);
    const htmlSmp = await resSmp.text();
    expect(htmlSmp).toContain('MAT-9-BIL-001');

    // Bebas em dash
    expect(html).not.toContain('—');
    expect(html).not.toContain('–');
  });

  // 5. Form Tambah & Ubah Soal (/admin/soal/tambah & /admin/soal/:id/edit)
  test('4. Form Soal (/admin/soal/tambah & :id/edit): 2 kolom, materi opsional TO, tombol Terbitkan terkunci awal', async () => {
    const resAdd = await app.handle(new Request('http://localhost/admin/soal/tambah'));
    expect(resAdd.status).toBe(200);
    const htmlAdd = await resAdd.text();

    expect(htmlAdd).toContain('Tambah Soal Baru');
    expect(htmlAdd).toContain('Tanpa materi (khusus TO)');
    expect(htmlAdd).toContain('editor-single');
    expect(htmlAdd).toContain('editor-multiple');
    expect(htmlAdd).toContain('editor-category');
    expect(htmlAdd).toContain('live-preview-container');
    expect(htmlAdd).toContain('btn-inspect-preview');
    expect(htmlAdd).toContain('btn-publish-question');

    // Tombol Terbitkan awalnya disabled pada soal baru (belum dipratinjau)
    expect(htmlAdd).toContain('id="btn-publish-question"');
    expect(htmlAdd).toContain('disabled');

    // Form ubah soal yang sudah terbit
    const resEdit = await app.handle(new Request('http://localhost/admin/soal/q-smp-01/edit'));
    expect(resEdit.status).toBe(200);
    const htmlEdit = await resEdit.text();
    expect(htmlEdit).toContain('Ubah Soal');
    expect(htmlEdit).toContain('MAT-9-BIL-001');
  });

  // 6. Endpoint Live Preview Server (POST /admin/soal/preview)
  test('5. Live Preview Server (POST /admin/soal/preview): render KaTeX, anti-XSS, steril saat mengerjakan, video saat hasil', async () => {
    const payload = {
      level: 'smp',
      elementId: 'el-smp-bil',
      topicId: 'top-smp-pangkat',
      questionType: 'single',
      bodyRaw: 'Berapakah nilai dari $\\frac{x^2 - 1}{x - 1}$ untuk $x = 3$? <script>alert("hack")</script>',
      imageUrl: '/uploads/sample.png',
      choiceOptions: [
        { key: 'A', textRaw: '$2$' },
        { key: 'B', textRaw: '$4$' },
        { key: 'C', textRaw: '$6$' },
        { key: 'D', textRaw: '$8$' },
      ],
      answerKey: { questionType: 'single', key: 'B' },
      explanationRaw: 'Faktorkan pembilang: $x^2 - 1 = (x-1)(x+1)$. Saat $x=3$, hasilnya $3+1 = 4$.',
      shortsId: 'sH0rtSmp001',
      longVideoId: 'k9X8zV7mQ1A',
      longVideoTime: '02:30',
    };

    const res = await app.handle(
      new Request('http://localhost/admin/soal/preview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
    );

    expect(res.status).toBe(200);
    const html = await res.text();

    // KaTeX rumus ter-render
    expect(html).toContain('katex');

    // Anti-XSS: tag <script> tidak boleh dieksekusi secara mentah
    expect(html).not.toContain('<script>alert("hack")</script>');
    expect(html).toContain('&lt;script&gt;');

    // Tab "Saat Mengerjakan" steril dari kunci & pembahasan
    expect(html).toContain('preview-tab-attempt');
    expect(html).toContain('preview-tab-result');

    // Video buttons muncul di tab hasil
    expect(html).toContain('https://youtube.com/shorts/sH0rtSmp001');
    expect(html).toContain('https://youtu.be/k9X8zV7mQ1A?t=150');

    // Penanda opsi siswa bebas ikon check_circle
    expect(html).not.toContain('check_circle');

    // Bebas em dash
    expect(html).not.toContain('—');
    expect(html).not.toContain('–');
  });

  // 7. Kelola Latihan (/admin/latihan) & Kelola TO (/admin/tryout)
  test('6. Kelola Latihan & Tryout: validasi jumlah butir (5-10 latihan, 10-15 TO) dan 2 kolom', async () => {
    // Latihan
    const resPrac = await app.handle(new Request('http://localhost/admin/latihan'));
    expect(resPrac.status).toBe(200);
    const htmlPrac = await resPrac.text();
    expect(htmlPrac).toContain('Kelola');
    expect(htmlPrac).toContain('Latihan');
    expect(htmlPrac).toContain('Pilih Butir Soal Terbit');
    expect(htmlPrac).toContain('5-10 Soal');
    expect(htmlPrac).toContain('quiz-question-checkbox');
    expect(htmlPrac).toContain('btn-publish-quiz');

    // Tryout
    const resTO = await app.handle(new Request('http://localhost/admin/tryout'));
    expect(resTO.status).toBe(200);
    const htmlTO = await resTO.text();
    expect(htmlTO).toContain('Kelola');
    expect(htmlTO).toContain('Tryout');
    expect(htmlTO).toContain('Durasi (Menit)');
    expect(htmlTO).toContain('10-15 Soal');
    expect(htmlTO).toContain('quiz-question-checkbox');
  });

  // 8. Elemen Kisi-kisi (/admin/elemen) & Materi Pokok (/admin/materi)
  test('7. Elemen & Materi: daftar per jenjang dinamis dan form tambah/ubah', async () => {
    // Elemen
    const resEl = await app.handle(new Request('http://localhost/admin/elemen'));
    expect(resEl.status).toBe(200);
    const htmlEl = await resEl.text();
    expect(htmlEl).toContain('Elemen');
    expect(htmlEl).toContain('Kisi-kisi');
    expect(htmlEl).toContain('SMP KELAS 9');
    expect(htmlEl).toContain('SD KELAS 6');
    expect(htmlEl).toContain('Tambah Elemen Baru');

    // Materi
    const resMat = await app.handle(new Request('http://localhost/admin/materi'));
    expect(resMat.status).toBe(200);
    const htmlMat = await resMat.text();
    expect(htmlMat).toContain('Materi');
    expect(htmlMat).toContain('Pokok');
    expect(htmlMat).toContain('Link Video Materi YouTube');
    expect(htmlMat).toContain('Bilangan Berpangkat');
  });

  // 9. Kelola Siswa (/admin/siswa) & Laporan (/admin/laporan)
  test('8. Siswa & Laporan: pencarian siswa, modal reset password, dan highlight merah persentase benar rendah', async () => {
    // Siswa
    const resStu = await app.handle(new Request('http://localhost/admin/siswa'));
    expect(resStu.status).toBe(200);
    const htmlStu = await resStu.text();
    expect(htmlStu).toContain('Data');
    expect(htmlStu).toContain('Siswa');
    expect(htmlStu).toContain('Raka Pratama');
    expect(htmlStu).toContain('Reset Password');
    expect(htmlStu).toContain('modal-reset-password');
    expect(htmlStu).toContain('YukNgeles123!');

    // Laporan
    const resRep = await app.handle(new Request('http://localhost/admin/laporan'));
    expect(resRep.status).toBe(200);
    const htmlRep = await resRep.text();
    expect(htmlRep).toContain('Laporan');
    expect(htmlRep).toContain('Skor & Butir');
    expect(htmlRep).toContain('TOTAL PENGERJA');
    expect(htmlRep).toContain('RATA-RATA SKOR');
    expect(htmlRep).toContain('SKOR TERTINGGI');
    expect(htmlRep).toContain('SKOR TERENDAH');

    // Butir dengan % benar <= 40% ditandai merah (bg-wrong-bg text-wrong)
    expect(htmlRep).toContain('bg-wrong-bg text-wrong border-wrong');
  });

  // 10. Kemandirian Aset & Nol CDN pada Panel Admin
  test('9. Kemandirian Aset: panel admin tidak memuat script atau stylesheet eksternal/CDN', async () => {
    const adminUrls = [
      '/admin',
      '/admin/masuk',
      '/admin/soal',
      '/admin/soal/tambah',
      '/admin/latihan',
      '/admin/tryout',
      '/admin/elemen',
      '/admin/materi',
      '/admin/siswa',
      '/admin/laporan',
    ];

    for (const url of adminUrls) {
      const res = await app.handle(new Request(`http://localhost${url}`));
      expect(res.status).toBe(200);
      const html = await res.text();

      // Tidak boleh ada link ke cdn.jsdelivr, unpkg, googleapis, cdnjs, dll
      expect(html).not.toMatch(/https?:\/\/[^"]*cdn[^"]*/i);
      expect(html).not.toMatch(/https?:\/\/fonts\.googleapis\.com/i);
      expect(html).not.toMatch(/https?:\/\/cdn\.jsdelivr\.net/i);
      expect(html).not.toMatch(/https?:\/\/unpkg\.com/i);

      // Bebas em dash
      expect(html).not.toContain('—');
      expect(html).not.toContain('–');
    }
  });
});
