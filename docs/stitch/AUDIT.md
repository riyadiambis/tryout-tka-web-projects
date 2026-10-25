# Laporan Audit Desain Google Stitch

Dokumen ini berisi hasil audit komprehensif terhadap 19 file HTML hasil export Google Stitch untuk aplikasi **Yuk Ngeles** (Web Tryout TKA SD dan SMP). Audit dilakukan terhadap aturan domain di `.agents/rules/`, spesifikasi PRD di `docs/PRD.md`, serta panduan visual di `.agents/rules/02-ui-buku-tulis.md`.

---

## Ringkasan Eksekutif

- **Total Layar yang Diaudit**: 19 file HTML
- **Jumlah Layar Lolos**: 12 layar
- **Jumlah Layar Perlu Revisi**: 7 layar
- **Rekomendasi Tindakan**: **Seluruh 7 layar CUKUP DIBENERIN SAAT IMPLEMENTASI**. Tidak ada layar yang perlu di-generate ulang di Google Stitch, karena struktur komponen, hierarki visual, warna token, dan responsivitasnya sudah sangat kuat dan sesuai dengan gaya Buku Tulis.

### 5 Temuan Paling Penting

1. **Fitur di Luar Scope MVP pada Layar Desktop (Menu "Tryout Akbar")**:
   Pada navbar `desktop/01-beranda`, `03-materi`, `04-pengerjaan-latihan`, `05-hasil-latihan`, dan `08-daftar-dan-masuk`, terdapat tautan navigasi dan callout banner bertuliskan "Tryout Akbar". Berdasarkan PRD Bagian 12, Tryout Akbar berada di luar scope MVP. Tautan ini wajib dihapus saat implementasi komponen layout bersama (`src/views/layouts/`).
2. **Indikator Opsi Terpilih Menampilkan Ikon `check_circle`**:
   Pada `hp/04-pengerjaan-latihan` dan `desktop/04-pengerjaan-latihan`, opsi yang diklik menampilkan ikon lingkaran centang (`check_circle`). Hal ini rawan memicu salah paham bagi siswa karena terlihat seperti validasi jawaban benar sebelum submit. Saat implementasi, indikator ini diganti dengan penanda radio netral (lingkaran terisi).
3. **Format Layar `hp/02-jenjang.html` Berupa Presentasi Berdampingan**:
   File `hp/02-jenjang.html` membungkus dua tampilan mobile sekaligus (versi Guest dan versi Logged In) dalam satu container perbandingan `max-w-5xl`. Konten task list Classroom di dalamnya sudah sangat rapi. Saat implementasi, komponen kartu di dalamnya cukup dirender sebagai tampilan mobile tunggal `max-w-[460px]` sesuai sesi siswa.
4. **Penggabungan Layar Daftar dan Masuk pada Desktop**:
   File `desktop/08-daftar-dan-masuk.html` menyatukan form pendaftaran akun dan form login ke dalam satu komponen berbasis tab switcher. Saat implementasi, form dapat dipisah atau dirender sesuai rute URL (`/sd/daftar`, `/sd/masuk`, `/smp/daftar`, `/smp/masuk`).
5. **Ketergantungan Font Eksternal dan Perbedaan Keluarga Font**:
   Sebagian besar file Stitch memuat font `Rubik` dan `Nunito Sans` dari CDN Google Fonts, sedangkan aturan `02-ui-buku-tulis.md` menetapkan `Baloo 2` untuk judul dan `Nunito` untuk teks yang di-host lokal di `public/fonts/`. Penyesuaian ini langsung diselesaikan pada konfigurasi tema Tailwind di ISSUE-01.

---

## Audit Layar Mobile (HP)

### 1. `hp/01-beranda.html`
- **Fitur PRD**: F2 (Beranda)
- **Status**: Lolos
- **Temuan**:
  - `SARAN`: Teks subjudul mencantumkan "Sesuai Kurikulum TKA". Lebih baik disesuaikan dengan narasi "Sesuai Kisi-kisi Resmi Pusmendik" agar netral dan akurat.
  - `SARAN`: Font masih menggunakan `Rubik` dan `Nunito Sans` dari Google Fonts CDN.
- **Pemeriksaan Aturan**:
  - Bottom navigation: Tidak ada.
  - Em dash: Tidak ditemukan.
  - SD dan SMP: Keduanya tampil aktif dalam bentuk kartu besar dengan warna badge oranye (SD) dan biru (SMP).
  - Gaya visual: Memenuhi border 2px navy, offset shadow, dan background grid kotak-kotak 26px.
  - Lebar: Terpusat dengan `max-w-[460px]`.
- **Cara Memperbaiki**: Cukup dibenerin saat implementasi.

---

### 2. `hp/02-jenjang.html`
- **Fitur PRD**: F2, F3 (Halaman Jenjang / Dashboard ala Google Classroom)
- **Status**: Perlu revisi
- **Temuan**:
  - `WAJIB`: File HTML ini merupakan halaman presentasi yang menampilkan dua frame mockup HP bersebelahan ("VERSION A: GUEST" dan "VERSION B: LOGGED IN") dalam container lebar `max-w-5xl`. Bukan berupa halaman HP mandiri `max-w-[460px]`.
  - `SARAN`: Font di file ini sudah memakai `Baloo 2` dan `Nunito` (sesuai aturan Buku Tulis). Struktur daftar materi per elemen (Bilangan, Aljabar, Geometri) sudah sangat tepat.
- **Pemeriksaan Aturan**:
  - Bottom navigation: Tidak ada.
  - Em dash: Tidak ditemukan.
  - Sapaan: Santai ("Halo, Siswa Ambis!").
  - Gaya visual: Memenuhi gaya buku tulis (kartu materi, status belum/selesai, skor latihan).
- **Cara Memperbaiki**: Cukup dibenerin saat implementasi (ambil markup bagian dalam device frame untuk dijadikan komponen view server Elysia).

---

### 3. `hp/03-materi.html`
- **Fitur PRD**: F4 (Halaman Materi)
- **Status**: Lolos
- **Temuan**:
  - `SARAN`: Font masih memuat `Rubik` dan `Nunito Sans` via CDN.
- **Pemeriksaan Aturan**:
  - Tombol video YouTube: Tersedia tombol "Tonton Materi di YouTube" dengan atribut `target="_blank" rel="noopener noreferrer"` dan keterangan "Kebuka di aplikasi YouTube". Tidak ada iframe.
  - Daftar paket latihan: Menampilkan daftar paket latihan ("Paket 1: Konsep Dasar (5 Soal)", "Paket 2: Operasi Hitung (5 Soal)") masing-masing dengan tombol "Mulai Latihan".
  - Bottom navigation: Tidak ada.
  - Em dash: Tidak ditemukan.
  - Lebar: `max-w-[460px]`.
- **Cara Memperbaiki**: Cukup dibenerin saat implementasi.

---

### 4. `hp/04-pengerjaan-latihan.html`
- **Fitur PRD**: F5 (Pengerjaan Latihan)
- **Status**: Perlu revisi
- **Temuan**:
  - `WAJIB`: Pada kartu soal single choice, opsi yang terpilih menampilkan ikon centang lingkaran (`check_circle`). Hal ini berisiko membingungkan siswa karena menyerupai indikator bahwa jawaban tersebut sudah dinilai benar.
  - `SARAN`: Tombol sticky di bagian bawah (`Kumpulkan Jawaban`) memicu modal konfirmasi jika ada soal kosong, sesuai dengan PRD F5.
- **Pemeriksaan Aturan**:
  - Bottom navigation: Tidak ada bar navigasi tab bawah (elemen sticky bawah murni tombol submit form).
  - Keamanan soal: Kunci jawaban dan pembahasan tidak tercantum di dalam markup.
  - Bentuk soal: Memperagakan variasi single choice, multiple choice (MCMA), dan category (Benar atau Salah).
  - Lebar: `max-w-[460px]`.
- **Cara Memperbaiki**: Cukup dibenerin saat implementasi (ganti ikon opsi terpilih dengan radio bullet terisi tanpa simbol centang).

---

### 5. `hp/05-hasil-latihan.html`
- **Fitur PRD**: F6 (Hasil Latihan)
- **Status**: Lolos
- **Temuan**:
  - `SARAN`: Font masih memuat Google Fonts CDN.
- **Pemeriksaan Aturan**:
  - Skor: Menampilkan kartu nilai besar (80/100, 4 benar dari 5 soal).
  - Pembahasan: Tiap nomor memiliki badge Benar/Salah, jawaban siswa, kunci jawaban, dan teks pembahasan konsep.
  - Tombol video: Terdapat tombol "Lihat Pembahasan Video" (Shorts) dan "Tonton Penjelasan Lengkap (menit 03:20)". Tidak ada iframe.
  - Aksi lanjutan: Tersedia tombol "Ulangi Latihan" dan tombol kuning utama "Coba TO Gratis".
  - Bottom navigation: Tidak ada.
  - Lebar: `max-w-[460px]`.
- **Cara Memperbaiki**: Cukup dibenerin saat implementasi.

---

### 6. `hp/06a-lobi-to.html`
- **Fitur PRD**: F7 (Lobi Tryout)
- **Status**: Lolos
- **Temuan**:
  - `SARAN`: Teks aturan menyebutkan "sesuai standar kurikulum terbaru". Disarankan disesuaikan menjadi "sesuai kisi-kisi resmi TKA".
- **Pemeriksaan Aturan**:
  - Informasi paket: Menampilkan judul TO, jumlah soal (15 Soal), durasi waktu (30 Menit).
  - Aturan pengerjaan: Menyebutkan waktu server, autosave berkala, dan kesempatan pengerjaan hanya 1 kali.
  - Tombol aksi: Tombol utama "Mulai TO" berwarna kuning stabilo dengan efek offset shadow.
  - Bottom navigation: Tidak ada.
  - Lebar: `max-w-[460px]`.
- **Cara Memperbaiki**: Cukup dibenerin saat implementasi.

---

### 7. `hp/06b-pengerjaan-to.html`
- **Fitur PRD**: F7 (Pengerjaan Tryout)
- **Status**: Lolos
- **Temuan**:
  - `SARAN`: Indikator waktu sisa memiliki demo perubahan visual saat waktu kurang dari 5 menit (sudah sesuai aturan domain nomor 2).
- **Pemeriksaan Aturan**:
  - Satu soal per layar: Menampilkan satu butir soal aktif ("Soal 7 dari 15").
  - Navigasi: Tersedia tombol "Sebelumnya", "Berikutnya", dan tombol drawer modal "Daftar Soal" (grid 15 nomor).
  - Timer: Timer melayang di bagian atas dengan badge waktu mundur.
  - Autosave: Memiliki label penanda "Tersimpan otomatis".
  - Keamanan soal: Tidak ada kunci jawaban maupun pembahasan pada kode HTML.
  - Lebar: `max-w-[460px]`.
- **Cara Memperbaiki**: Cukup dibenerin saat implementasi.

---

### 8. `hp/07-hasil-to.html`
- **Fitur PRD**: F8 (Hasil Tryout)
- **Status**: Lolos
- **Temuan**:
  - `SARAN`: Tombol sticky di bawah mengarahkan "Kembali ke Daftar Latihan".
- **Pemeriksaan Aturan**:
  - Skor: Menampilkan nilai (73/100, 11 dari 15 benar) dan lama pengerjaan (24m 12s).
  - Tanpa tombol ulangi: Sesuai aturan PRD dan domain bahwa Tryout hanya 1 kali pengerjaan per akun, tidak ada tombol ulangi.
  - Pembahasan: Menampilkan tinjauan jawaban dan pembahasan tertulis dengan tombol link video ke YouTube.
  - Bottom navigation: Tidak ada.
  - Lebar: `max-w-[460px]`.
- **Cara Memperbaiki**: Cukup dibenerin saat implementasi.

---

### 9. `hp/08a-daftar.html`
- **Fitur PRD**: F1 (Pendaftaran Akun)
- **Status**: Lolos
- **Temuan**:
  - `SARAN`: Font masih memuat `Rubik` dan `Nunito Sans` dari CDN.
- **Pemeriksaan Aturan**:
  - Field akun: Hanya meminta Nama Panggilan, Username, dan Password (dengan toggle mata). Tidak ada email dan tidak ada nomor HP.
  - Persetujuan orang tua: Memiliki checkbox "Orang tua atau wali sudah tahu aku daftar di sini" (wajib dicentang).
  - Bahasa: Ramah dan santai ("Biar nilai TO kamu tersimpan").
  - Lebar: `max-w-[460px]`.
- **Cara Memperbaiki**: Cukup dibenerin saat implementasi.

---

### 10. `hp/08b-masuk.html`
- **Fitur PRD**: F1 (Masuk Akun)
- **Status**: Lolos
- **Temuan**:
  - `SARAN`: Font CDN.
- **Pemeriksaan Aturan**:
  - Field login: Username dan Password.
  - Bantuan lupa password: Link mengarahkan untuk hubungi admin (sesuai PRD F1, reset lewat admin).
  - Tautan registrasi: Tersedia tautan bagi yang belum memiliki akun.
  - Lebar: `max-w-[460px]`.
- **Cara Memperbaiki**: Cukup dibenerin saat implementasi.

---

## Audit Layar Desktop

### 1. `desktop/01-beranda.html`
- **Fitur PRD**: F2 (Beranda Desktop)
- **Status**: Perlu revisi
- **Temuan**:
  - `WAJIB`: Pada bar navigasi atas, terdapat menu `data-path="tryout-akbar"` dengan teks "Tryout Akbar". Fitur Tryout Akbar di luar scope MVP.
  - `WAJIB`: Teks hak cipta di bagian footer menggunakan em dash (`—`): `Yuk Ngeles — Teman Belajar Matematika`.
  - `SARAN`: Ilustrasi hero memuat gambar placeholder dari URL eksternal Unsplash/Google. Saat implementasi akan diganti dengan SVG lokal bertema buku tulis.
- **Pemeriksaan Aturan**:
  - Lebar: Header dan container utama memakai `max-w-[1200px] mx-auto` (sesuai aturan).
  - Pilihan jenjang: Kartu SD Kelas 6 dan SMP Kelas 9 tampil berdampingan secara aktif.
- **Cara Memperbaiki**: Cukup dibenerin saat implementasi (hapus link Tryout Akbar di navbar, ganti em dash di footer menjadi tanda strip biasa).

---

### 2. `desktop/03-materi.html`
- **Fitur PRD**: F4 (Halaman Materi Desktop)
- **Status**: Perlu revisi
- **Temuan**:
  - `WAJIB`: Pada navbar atas terdapat menu "Tryout Akbar", serta pada kolom konten terdapat banner callout "Tryout Akbar / Ready for Real Exam".
  - `WAJIB`: Tag `<title>` dan footer menggunakan karakter em dash (`—`).
- **Pemeriksaan Aturan**:
  - Tombol video YouTube: Tersedia link kartu "Tonton Materi di YouTube" dengan ikon eksternal.
  - Daftar paket latihan: Menampilkan paket latihan konsep dan operasi hitung dengan tombol "Mulai Latihan".
  - Lebar: Header `max-w-[1200px]`, kolom tengah konten `max-w-[760px]` (sesuai aturan desktop).
- **Cara Memperbaiki**: Cukup dibenerin saat implementasi (hapus banner/menu Tryout Akbar, perbaiki em dash).

---

### 3. `desktop/04-pengerjaan-latihan.html`
- **Fitur PRD**: F5 (Pengerjaan Latihan Desktop)
- **Status**: Perlu revisi
- **Temuan**:
  - `WAJIB`: Pilihan ganda yang dipilih menampilkan ikon `check_circle` centang lingkaran.
  - `WAJIB`: Menu navbar masih memuat "Tryout Akbar", dan tag `<title>` serta footer memuat em dash.
- **Pemeriksaan Aturan**:
  - Format soal: Semua soal ditampilkan dalam 1 halaman panjang terpusat.
  - Tombol submit: Tombol "Kumpulkan Jawaban" memicu modal konfirmasi kelengkapan jawaban.
  - Lebar: Kolom tengah `max-w-[760px]`.
- **Cara Memperbaiki**: Cukup dibenerin saat implementasi.

---

### 4. `desktop/05-hasil-latihan.html`
- **Fitur PRD**: F6 (Hasil Latihan Desktop)
- **Status**: Perlu revisi
- **Temuan**:
  - `WAJIB`: Navbar memuat menu "Tryout Akbar".
  - `WAJIB`: Tag `<title>` dan footer memuat em dash.
  - `SARAN`: Teks deskripsi video menyebut "Tonton penjelasan lengkap oleh Guru Ahli". Disarankan diganti "Tonton penjelasan lengkap oleh Kak Riyadi" atau nama pemilik.
- **Pemeriksaan Aturan**:
  - Nilai dan badge: Menampilkan skor besar, badge benar/salah, kunci, dan pembahasan tertulis.
  - Tombol video: Tautan ke Shorts dan video panjang dengan menit konsep.
  - Lebar: Kolom tengah `max-w-[760px]`.
- **Cara Memperbaiki**: Cukup dibenerin saat implementasi.

---

### 5. `desktop/06b-pengerjaan-to.html`
- **Fitur PRD**: F7 (Pengerjaan Tryout Desktop CBT)
- **Status**: Lolos
- **Temuan**:
  - `SARAN`: Terdapat tombol "Ragu-ragu". Meskipun di PRD belum diatur secara eksplisit, fitur ini merupakan standar CBT dan tidak merusak aturan domain.
  - `SARAN`: Font CDN diganti font lokal saat implementasi.
- **Pemeriksaan Aturan**:
  - Tata letak CBT: Dua kolom desktop modern: kolom kiri soal aktif dan tombol navigasi; kolom kanan grid nomor soal (1-15) dan timer waktu mundur.
  - Keamanan soal: Kunci jawaban dan pembahasan tidak ada di markup.
  - Lebar: Container CBT `max-w-[1440px]` dengan area kerja proporsional.
- **Cara Memperbaiki**: Cukup dibenerin saat implementasi.

---

### 6. `desktop/08-daftar-dan-masuk.html`
- **Fitur PRD**: F1 (Daftar dan Masuk Desktop)
- **Status**: Perlu revisi
- **Temuan**:
  - `WAJIB`: Form pendaftaran dan form masuk disatukan dalam satu halaman dengan tab switcher interaktif.
  - `WAJIB`: Navbar memuat "Tryout Akbar", serta judul dan footer memuat em dash.
  - `SARAN`: Checkbox persetujuan orang tua/wali sudah tersedia pada tab pendaftaran.
- **Pemeriksaan Aturan**:
  - Lebar: Kolom tengah `max-w-[760px]`.
  - Desain: Mengusung elemen binder buku tulis berlubang di sisi kiri kartu.
- **Cara Memperbaiki**: Cukup dibenerin saat implementasi (komponen form dipecah atau diaktifkan tabnya sesuai rute URL server).

---

## Audit Layar Admin

### 1. `admin/a1-daftar-soal.html`
- **Fitur PRD**: A4 (Kelola Soal / Bank Soal)
- **Status**: Lolos
- **Temuan**:
  - `SARAN`: Font CDN.
- **Pemeriksaan Aturan**:
  - Filter: Filter jenjang (SD / SMP), elemen kisi-kisi, materi, dan status (Draft, Terbit, Arsip).
  - Aksi: Tombol "Tambah Soal", tombol aksi edit, dan tombol modal preview siswa.
  - Lebar: `max-w-[1100px]` (sesuai panduan admin).
- **Cara Memperbaiki**: Cukup dibenerin saat implementasi.

---

### 2. `admin/a2-form-soal.html`
- **Fitur PRD**: A4, A5 (Form Soal dan Live Preview Siswa)
- **Status**: Lolos
- **Temuan**:
  - `SARAN`: Label dropdown "Kurikulum" sebaiknya diganti menjadi "Elemen Kisi-kisi".
- **Pemeriksaan Aturan**:
  - Layout dua kolom berdampingan: Kolom kiri editor input form, kolom kanan preview langsung tampilan siswa (memenuhi PRD A5).
  - Pilihan materi opsional: Terdapat opsi `<option value="">Tanpa materi (khusus TO)</option>`.
  - Format soal: Input mendukung Markdown + LaTeX, jenis soal (single, multiple, category), input opsi, kunci jawaban, dan pembahasan.
  - Link video: Input Link Shorts YouTube dan Link Video Panjang beserta menit konsep dalam detik.
  - Lebar: `max-w-[1100px]`.
- **Cara Memperbaiki**: Cukup dibenerin saat implementasi.

---

### 3. `admin/a3-kelola-latihan.html`
- **Fitur PRD**: A6 (Kelola Paket Latihan)
- **Status**: Lolos
- **Temuan**:
  - `SARAN`: Font CDN.
- **Pemeriksaan Aturan**:
  - Pemilihan soal: Memilih materi dan mencentang soal berstatus terbit (dengan batas 5 sampai 10 butir soal per paket sesuai PRD terbaru).
  - Urutan soal: Fitur pengurutan butir soal.
  - Status: Opsi simpan draft atau langsung terbitkan paket.
  - Lebar: `max-w-[1100px]`.
- **Cara Memperbaiki**: Cukup dibenerin saat implementasi.

---

## Ketergantungan Eksternal (Audit Catatan)

Seluruh 19 file export Stitch menggunakan aset eksternal berikut yang **wajib diganti dengan aset lokal pada ISSUE-01**:

1. **Google Fonts CDN**:
   - `https://fonts.googleapis.com` dan `https://fonts.gstatic.com`
   - Meminta font `Rubik`, `Nunito Sans`, `Baloo 2`, `Nunito`, dan icon font `Material Symbols Outlined`.
   - *Solusi*: Host lokal font WOFF2 `Baloo 2` dan `Nunito` di `public/fonts/`. Icon SVG inline atau font lokal.
2. **Tailwind CSS Play CDN**:
   - `<script src="https://cdn.tailwindcss.com"></script>`
   - *Solusi*: Kompilasi file CSS statis lokal `public/css/app.css` menggunakan Tailwind CLI dari `src/styles/app.css`.
3. **Placeholder Gambar Eksternal**:
   - Beberapa gambar hero desktop berasal dari `lh3.googleusercontent.com` dan `images.unsplash.com`.
   - *Solusi*: Gunakan file SVG lokal di `public/img/`.
