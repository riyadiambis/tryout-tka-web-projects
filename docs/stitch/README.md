# Indeks Desain Google Stitch

Direktori ini berisi hasil export desain Google Stitch untuk proyek Web Tryout TKA SD dan SMP (Yuk Ngeles). File mentah hasil export telah dikategorikan dan disimpan secara terstruktur untuk mobile (HP), desktop, dan admin.

File mentah asli tersimpan di `docs/stitch/_mentah/` yang telah ditambahkan ke `.gitignore` agar tidak membebani repositori git.

## Struktur Direktori

```text
docs/stitch/
├── README.md               # Indeks layar dan status ketersediaan desain
├── AUDIT.md                # Laporan audit kepatuhan desain terhadap PRD dan aturan domain
├── TOKENS.md               # Perbandingan token desain Stitch vs aturan Buku Tulis
├── hp/                     # Tampilan mobile (maksimal 460px)
│   ├── 01-beranda.html (+ .png)
│   ├── 02-jenjang.html (+ .png)
│   ├── 03-materi.html (+ .png)
│   ├── 04-pengerjaan-latihan.html (+ .png)
│   ├── 05-hasil-latihan.html (+ .png)
│   ├── 06a-lobi-to.html (+ .png)
│   ├── 06b-pengerjaan-to.html (+ .png)
│   ├── 07-hasil-to.html (+ .png)
│   ├── 08a-daftar.html (+ .png)
│   └── 08b-masuk.html (+ .png)
├── desktop/                # Tampilan desktop (lebar tengah 760px / beranda 1200px)
│   ├── 01-beranda.html (+ .png)
│   ├── 03-materi.html (+ .png)
│   ├── 04-pengerjaan-latihan.html (+ .png)
│   ├── 05-hasil-latihan.html (+ .png)
│   ├── 06b-pengerjaan-to.html (+ .png)
│   └── 08-daftar-dan-masuk.html (+ .png)
├── admin/                  # Tampilan panel admin (lebar 1100px)
│   ├── a1-daftar-soal.html (+ .png)
│   ├── a2-form-soal.html (+ .png)
│   └── a3-kelola-latihan.html (+ .png)
└── design-system/
    └── DESIGN.md           # Spesifikasi token Buku Tulis EdTech dari Stitch
```

## Tabel Indeks Layar

| Layar | File HP | File Desktop | Fitur PRD | Status Audit | Catatan |
|---|---|---|---|---|---|
| **Beranda** | [`hp/01-beranda.html`](./hp/01-beranda.html) | [`desktop/01-beranda.html`](./desktop/01-beranda.html) | F2 | Perlu revisi | HP lolos. Desktop perlu hapus menu "Tryout Akbar" di navbar dan em dash di footer. |
| **Jenjang / Dashboard** | [`hp/02-jenjang.html`](./hp/02-jenjang.html) | *(Belum ada)* | F2, F3 | Perlu revisi | HP berupa frame perbandingan Guest vs Logged In berdampingan. Diambil sebagai layout tunggal saat kode. |
| **Halaman Materi** | [`hp/03-materi.html`](./hp/03-materi.html) | [`desktop/03-materi.html`](./desktop/03-materi.html) | F4 | Perlu revisi | HP lolos. Desktop perlu hapus banner Tryout Akbar, menu navbar, dan em dash. |
| **Pengerjaan Latihan** | [`hp/04-pengerjaan-latihan.html`](./hp/04-pengerjaan-latihan.html) | [`desktop/04-pengerjaan-latihan.html`](./desktop/04-pengerjaan-latihan.html) | F5 | Perlu revisi | Opsi yang dipilih memakai ikon check_circle yang rawan disalahpahami sebagai kunci jawaban benar. |
| **Hasil Latihan** | [`hp/05-hasil-latihan.html`](./hp/05-hasil-latihan.html) | [`desktop/05-hasil-latihan.html`](./desktop/05-hasil-latihan.html) | F6 | Perlu revisi | HP lolos. Desktop perlu perbaikan em dash dan penyesuaian teks Guru Ahli menjadi nama pemilik. |
| **Lobi Tryout** | [`hp/06a-lobi-to.html`](./hp/06a-lobi-to.html) | *(Belum ada)* | F7 | Lolos | HP memenuhi spesifikasi durasi, jumlah soal, dan aturan pengerjaan. |
| **Pengerjaan Tryout** | [`hp/06b-pengerjaan-to.html`](./hp/06b-pengerjaan-to.html) | [`desktop/06b-pengerjaan-to.html`](./desktop/06b-pengerjaan-to.html) | F7 | Lolos | Satu soal per layar, panel daftar nomor soal, timer countdown, autosave. |
| **Hasil Tryout** | [`hp/07-hasil-to.html`](./hp/07-hasil-to.html) | *(Belum ada)* | F8 | Lolos | Menampilkan skor, durasi pengerjaan, pembahasan per butir, dan tanpa tombol ulangi. |
| **Daftar Akun** | [`hp/08a-daftar.html`](./hp/08a-daftar.html) | [`desktop/08-daftar-dan-masuk.html`](./desktop/08-daftar-dan-masuk.html) | F1 | Perlu revisi | HP lolos (memiliki centang orang tua/wali). Desktop menggabungkan Daftar dan Masuk dalam tab switcher. |
| **Masuk Akun** | [`hp/08b-masuk.html`](./hp/08b-masuk.html) | [`desktop/08-daftar-dan-masuk.html`](./desktop/08-daftar-dan-masuk.html) | F1 | Perlu revisi | HP lolos. Desktop menggabungkan form Daftar dan Masuk dalam satu file. |
| **Admin: Bank Soal** | *(Hanya desktop)* | [`admin/a1-daftar-soal.html`](./admin/a1-daftar-soal.html) | A4 | Lolos | Tabel filter jenjang, elemen, materi, status draft/terbit/arsip, dan aksi preview. |
| **Admin: Form Soal** | *(Hanya desktop)* | [`admin/a2-form-soal.html`](./admin/a2-form-soal.html) | A4, A5 | Lolos | Form editor Markdown+LaTeX dengan preview tampilan siswa langsung berdampingan. Pilihan tanpa materi tersedia. |
| **Admin: Kelola Latihan** | *(Hanya desktop)* | [`admin/a3-kelola-latihan.html`](./admin/a3-kelola-latihan.html) | A6 | Lolos | Pilih materi, pilih 5 sampai 10 butir soal terbit, atur urutan, dan terbitkan. |

Catatan penggabungan file:
- File [`desktop/08-daftar-dan-masuk.html`](./desktop/08-daftar-dan-masuk.html) berisi tampilan halaman autentikasi desktop dengan tab switcher aktif antara form pendaftaran dan form login. Saat implementasi rute server (`/sd/daftar` dan `/sd/masuk`), komponen form dapat dipisah atau dirender sesuai tab aktif berdasarkan URL.

## Daftar Layar PRD yang Belum Memiliki Desain

Berikut adalah layar yang tercantum di PRD namun belum memiliki file export desain Stitch tersendiri:

### Layar Siswa (Desktop)
1. **Dashboard / Halaman Jenjang Desktop (F3)**: Tampilan daftar tugas Classroom untuk layar lebar (bisa mengadaptasi layout kartu dan daftar dari versi HP atau kolom tengah 760px).
2. **Lobi Tryout Desktop (F7)**: Informasi lobi TO untuk layar desktop (bisa menggunakan kolom tengah 760px mengadaptasi versi HP `06a-lobi-to.html`).
3. **Hasil Tryout Desktop (F8)**: Rincian hasil pengerjaan TO untuk layar desktop (bisa mengadaptasi pola dari `desktop/05-hasil-latihan.html` tanpa tombol ulangi).

### Layar Admin (Desktop)
Panel admin ditujukan untuk penggunaan laptop (lebar 1100px). Halaman berikut belum memiliki mockup khusus, tetapi dapat langsung dibuat dengan pola tata letak yang konsisten dari `admin/a1-daftar-soal.html`:
1. **A1 Login Admin**: Halaman masuk khusus admin atau form login reguler yang memvalidasi role admin di server.
2. **A2 Kelola Elemen**: Antarmuka CRUD data elemen kisi-kisi per jenjang (SD dan SMP).
3. **A3 Kelola Materi**: Antarmuka CRUD materi per elemen (judul, slug, link video materi di YouTube).
4. **A7 Kelola Tryout**: Antarmuka pembentukan paket TO (judul, jenjang, durasi menit, pemilihan 10-15 butir soal terbit, urutan soal).
5. **A8 Kelola Siswa**: Daftar pengguna siswa, pencarian username, dan tombol reset password.
6. **A9 Laporan per Paket**: Statistik jumlah siswa yang mengerjakan, rata-rata skor, dan tabel persentase benar per nomor soal.
