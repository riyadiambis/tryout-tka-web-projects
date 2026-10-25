# ISSUE-01: Fondasi UI Bergaya Buku Tulis (Server-Rendered JSX + Data Dummy)

## 1. Konteks, Tujuan, dan Batasan Scope

Tahap pertama pembangunan aplikasi **Yuk Ngeles** (Web Latihan dan Tryout TKA Matematika SD Kelas 6 dan SMP Kelas 9) berfokus pada fondasi antarmuka pengguna (UI), sistem desain **Buku Tulis**, komponen dasar yang dapat dipakai ulang, perenderan rumus matematika di server, serta seluruh halaman siswa dan admin menggunakan data dummy dari sisi server.

### Strategi Eksekusi: 3 Milestone, 3 Branch, 3 Pull Request
Agar review kode terukur dan risiko regresi kecil, pengerjaan ISSUE-01 **dipecah menjadi 3 milestone berurutan**. Setiap milestone dikerjakan di branch terpisah (jangan pernah bekerja langsung di `main`), diajukan sebagai **1 PR tersendiri**, dan wajib lulus checklist uji manual milestone tersebut sebelum lanjut ke milestone berikutnya:
1. **Milestone 1 (`feat/issue-01a-fondasi`)**: Setup proyek Bun + Elysia, tema Tailwind Buku Tulis, font dan aset SVG lokal, helper render Markdown + LaTeX dan parser YouTube di server, 15 komponen dasar, layout utama, halaman katalog komponen `/dev/komponen`, serta halaman 404.
2. **Milestone 2 (`feat/issue-01b-halaman-siswa`)**: Data dummy siswa di server (dengan pemisahan tegas data pengerjaan dan data hasil) serta seluruh halaman siswa dan halaman umum (`/`, `/sd/...`, `/smp/...`, `/daftar`, `/masuk`, `/keluar`).
3. **Milestone 3 (`feat/issue-01c-halaman-admin`)**: Data dummy kelola admin serta seluruh halaman admin (`/admin/*`), termasuk endpoint live preview server `POST /admin/soal/preview`.

> [!CAUTION]
> **PERINGATAN TEGAS KEAMANAN DEPLOY:** Seluruh route `/admin` (termasuk `POST /admin/soal/preview`) pada ISSUE-01 **belum dilindungi login maupun pengecekan role admin di server**. Aplikasi **TIDAK BOLEH di-deploy ke publik** dalam bentuk apa pun sebelum **ISSUE-02** menambahkan autentikasi sesi dan pengaman role admin pada setiap request.

### Aturan Kerja dan Batasan Teknis Wajib
- **Commit kecil dan rapi**: Gunakan commit kecil dengan awalan jelas (`chore:`, `feat:`, `fix:`, `docs:`, `test:`).
- **Stack wajib**: Runtime Bun, server ElysiaJS, view server-side JSX (`@elysiajs/html`), aset statis (`@elysiajs/static`), styling Tailwind CSS yang dikompilasi memakai Tailwind CLI dari `src/styles/app.css` ke `public/css/app.css`, perender konten `markdown-it` + `katex` di server, dan JavaScript browser murni (vanilla JS) seminimal mungkin.
- **Dilarang membuat proyek frontend terpisah**: Tidak boleh memakai React, Vite, Next.js, SPA router, atau bundler frontend terpisah. Semua halaman adalah view JSX yang dirender langsung oleh Elysia di server.
- **Aturan URL (Poin 26 `01-aturan-domain.md`)**:
  - URL halaman konten wajib berawalan jenjang: `/sd/...` dan `/smp/...` (halaman jenjang, materi, latihan, TO, dan hasil).
  - URL halaman umum **tanpa** awalan jenjang: `/` (beranda), `/daftar`, `/masuk`, `/keluar`, dan halaman 404.
  - URL halaman admin berawalan `/admin` dan tidak boleh ditautkan dari halaman siswa mana pun.
- **Pembatasan route katalog development**: Halaman `/dev/komponen` **hanya aktif saat `NODE_ENV` bukan `production`**. Saat `NODE_ENV === 'production'`, akses ke `/dev/komponen` wajib mengembalikan halaman 404 dengan HTTP status `404`.
- **Kemandirian aset lokal**: Semua font (`Baloo 2`, `Nunito`, serta font `KaTeX`), CSS, ikon SVG, dan ilustrasi maskot wajib di-host lokal di `public/`. Dilarang memuat CDN eksternal (Google Fonts, Material Symbols CDN, Tailwind Play CDN, jsDelivr, maupun URL gambar placeholder dari Stitch).
- **Keamanan struktur data sejak awal**: Data dummy hanya berada di sisi server (`src/fixtures/`) dan dikirim ke view melalui props bertipe tegas. Bentuk data untuk halaman pengerjaan (Latihan dan Tryout) **wajib terpisah** dari bentuk data halaman hasil dan halaman admin. Data pengerjaan dilarang keras memuat kunci jawaban, pembahasan tertulis, maupun link video pembahasan. Dilarang menanam data soal dummy di dalam file JavaScript browser.
- **Aturan penanda opsi jawaban saat mengerjakan**: Saat siswa mengerjakan (halaman pengerjaan latihan dan TO), penanda pilihan siswa **HANYA memakai warna kuning stabilo (`#FFD84D`) dan navy (`#1B3A5C`)**. Warna hijau dan merah **DILARANG** di halaman pengerjaan, karena keduanya khusus untuk status benar/salah di halaman hasil. Ikon `check_circle` atau centang dalam lingkaran dilarang untuk menandai pilihan siswa. Khusus checkbox untuk soal pilihan ganda kompleks (`multiple`), **BOLEH** menampilkan tanda centang standar di dalam kotak, dengan warna navy di atas kuning stabilo.
- **Aturan bahasa dan tanda baca**: Teks antarmuka siswa memakai Bahasa Indonesia santai dan sopan dengan sapaan "kamu". **Dilarang menggunakan em dash** di seluruh teks antarmuka, judul halaman, maupun dokumen. Penamaan simbol kode (folder, file modul, tipe, variabel, fungsi, props) memakai Bahasa Inggris sesuai glosarium di `.agents/rules/01-aturan-domain.md`, sedangkan URL pengguna memakai Bahasa Indonesia.
- **Di luar scope ISSUE-01 (JANGAN dikerjakan)**: Koneksi database MySQL, skema/migrasi Drizzle, autentikasi dan sesi login sungguhan, pengaman role admin, hashing password, penilaian jawaban di server, timer berbasis deadline server, serta autosave jawaban ke database. Folder `src/db/` dibiarkan tetap kosong untuk ISSUE-02.

---

## 2. Daftar File dan Folder yang Akan Dibuat

Seluruh file mengikuti struktur di `.agents/rules/00-proyek.md`. Label `[M1]`, `[M2]`, dan `[M3]` menunjukkan di milestone mana file tersebut dibuat atau dilengkapi agar model pelaksana tidak menebak lokasi maupun urutan pembuatan file.

### Konfigurasi Proyek (Root)
- `package.json` `[M1]` - konfigurasi proyek Bun, daftar dependensi produksi (`elysia`, `@elysiajs/html`, `@elysiajs/static`, `markdown-it`, `katex`) dan dependensi development (`tailwindcss` / `@tailwindcss/cli`, `@types/bun`, `@types/markdown-it`, `@types/katex`, `typescript`), serta script `dev`, `build:css`, `watch:css`, dan `typecheck`.
- `tsconfig.json` `[M1]` - konfigurasi TypeScript ketat (`strict: true`) dan pengaturan JSX untuk `@elysiajs/html`.
- `tailwind.config.ts` `[M1]` - pemetaan token warna, tipografi, radius, bayangan offset, dan lebar kontainer Buku Tulis ke tema Tailwind.

### Entry Point dan Helper Server (`src/`)
- `src/index.ts` `[M1, ditambah registrasi route di M2 & M3]` - inisialisasi aplikasi Elysia, pemasangan plugin HTML dan static (`public/`), pendaftaran route `/dev/komponen` khusus saat `NODE_ENV !== 'production'`, pendaftaran modul fitur per milestone, serta handler global halaman 404 bergaya Buku Tulis.
- `src/lib/markdown.ts` `[M1]` - helper server `renderMarkdownWithLatex` yang memproses Markdown (`html: false` agar HTML mentah dimatikan) serta rumus LaTeX inline (`$...$` dan `\(...\)`) maupun blok (`$$...$$` dan `\[...\]`) menjadi string HTML aman menggunakan `markdown-it` dan `katex`.
- `src/lib/youtube.ts` `[M1]` - helper parser dan pembangun URL YouTube sesuai aturan domain: mengekstrak ID video 11 karakter dari berbagai format link (`youtu.be`, `watch?v=`, `shorts/`, `embed/`), menolak link tidak valid, mengonversi format `mm:ss` ke detik dan sebaliknya, serta membangun URL tampil (`https://youtube.com/shorts/ID` untuk Shorts dan `https://youtu.be/ID?t=DETIK` untuk video panjang).
- `src/lib/format.ts` `[M1]` - helper pemformatan tampilan seperti label jenjang (`SD Kelas 6`, `SMP Kelas 9`), label bentuk soal, dan format durasi menit/detik.

### Data Dummy Server (`src/fixtures/`)
- `src/fixtures/types.ts` `[M1 untuk tipe komponen & domain dasar, dilengkapi props halaman di M2 & M3]` - definisi seluruh tipe domain dan tipe props view dengan pemisahan tegas antara tipe pengerjaan siswa (`QuestionForAttempt`), tipe hasil siswa (`QuestionResultItem`), dan tipe kelola admin (`AdminQuestionRecord`).
- `src/fixtures/elements.ts` `[M2]` - data dummy elemen kisi-kisi untuk jenjang `sd` dan `smp` (Bilangan, Aljabar, Geometri dan Pengukuran, Data dan Peluang).
- `src/fixtures/topics.ts` `[M2]` - data dummy materi per elemen untuk `sd` dan `smp` lengkap dengan deskripsi singkat dan ID video YouTube materi opsional.
- `src/fixtures/questions.ts` `[M2, ditambah selektor/record mentah admin di M3]` - bank soal dummy di server mencakup jenjang `sd` dan `smp`, ketiga bentuk soal (`single`, `multiple`, `category`), status (`published`, `draft`, `archived`), soal dengan materi maupun tanpa materi (khusus TO), rumus panjang LaTeX untuk menguji scroll horizontal di dalam kotak rumus, serta variasi ketersediaan link Shorts dan link video panjang. Dilengkapi fungsi pemilih data yang hanya mengembalikan `QuestionForAttempt` (tanpa kunci dan pembahasan) untuk route pengerjaan.
- `src/fixtures/quizzes.ts` `[M2]` - data dummy paket latihan (`practice`, 5-10 soal) dan paket tryout (`tryout`, 10-15 soal) untuk jenjang `sd` dan `smp`.
- `src/fixtures/attempts.ts` `[M2]` - data dummy status progres siswa (versi tamu vs versi sudah login atas nama siswa dummy "Raka") serta hasil pengerjaan dummy untuk Hasil Latihan dan Hasil TO (mencakup contoh jawaban benar, salah, dan kosong).
- `src/fixtures/users-and-reports.ts` `[M3]` - data dummy daftar akun siswa dan statistik laporan per paket untuk halaman admin Kelola Siswa, Laporan, dan Dashboard Admin.

### Styling Sumber (`src/styles/`)
- `src/styles/app.css` `[M1]` - deklarasi `@font-face` lokal (`Baloo 2` dan `Nunito`), CSS variables token Buku Tulis di `:root`, utilitas latar kertas kotak-kotak 26px, utilitas aksen stabilo judul, interaksi tekan tombol neobrutal, serta aturan pembungkus rumus `.katex-display` agar bisa di-scroll horizontal di dalam kotaknya sendiri tanpa menggeser lebar halaman.

### Layout dan Komponen Dasar (`src/views/`) - Seluruhnya `[M1]`
- `src/views/layouts/base-layout.tsx` - kerangka dokumen HTML5, meta viewport mobile-first, pemuatan CSS lokal (`app.css` dan `katex.min.css`), latar kertas kotak-kotak, dan slot script vanilla JS opsional per halaman.
- `src/views/layouts/student-layout.tsx` - pembungkus halaman siswa dan halaman umum dengan `Navbar`, pengaturan lebar responsif sesuai jenis layar (`mobile` 460px, `desktop` 760px, `beranda` 1200px, atau `cbt` untuk TO desktop), banner kecil pengalih mode demo khusus non-production (opsional per halaman), dan footer bersih tanpa em dash dan tanpa link ke `/admin`.
- `src/views/layouts/admin-layout.tsx` - pembungkus halaman admin laptop dengan header admin tetap di atas, `AdminSidebar` di kiri, dan area konten utama `max-w-admin` (1100px).
- `src/views/components/icon.tsx` - kumpulan ikon SVG inline ringan pengganti font Material Symbols eksternal.
- `src/views/components/button.tsx` - komponen tombol serbaguna (`<button>` atau `<a>`).
- `src/views/components/card.tsx` - komponen kartu kontainer Buku Tulis.
- `src/views/components/badge.tsx` - komponen badge label, kategori, dan status evaluasi.
- `src/views/components/input.tsx` - komponen input teks, password (dengan pemicu lihat/sembunyikan), pencarian, dan textarea beserta pesan error.
- `src/views/components/select.tsx` - komponen dropdown select bergaya Buku Tulis.
- `src/views/components/checkbox.tsx` - komponen kotak centang (untuk persetujuan wali, checklist admin, serta kotak opsi pilihan ganda kompleks dengan centang standar warna navy di atas kuning stabilo).
- `src/views/components/toggle.tsx` - komponen sakelar on/off dan pemilih biner netral (seperti pilihan `Benar` / `Salah` beraksen kuning stabilo dan navy tanpa ikon centang/silang).
- `src/views/components/table.tsx` - komponen tabel data dengan pembungkus scroll horizontal aman dan tampilan kosong (`empty state`).
- `src/views/components/modal.tsx` - komponen dialog modal konfirmasi dan pratinjau dengan backdrop gelap dan bayangan tebal.
- `src/views/components/bottom-sheet.tsx` - komponen panel tarik bawah khusus navigasi daftar nomor soal di layar HP/tablet portrait.
- `src/views/components/navbar.tsx` - komponen bilah navigasi atas halaman siswa (varian beranda, standar dengan tombol kembali, dan ujian TO; mendukung tampilan tamu menuju `/masuk` & `/daftar` serta tampilan sudah login dengan aksi `/keluar`).
- `src/views/components/admin-sidebar.tsx` - komponen navigasi samping panel admin (8 menu utama).
- `src/views/components/question-card.tsx` - komponen kartu soal saat pengerjaan untuk bentuk `single`, `multiple`, dan `category` (murni menerima `QuestionForAttempt`, memakai penanda pilihan kuning stabilo dan navy saja tanpa `check_circle` dan tanpa warna hijau/merah, serta mustahil merender kunci atau pembahasan).
- `src/views/components/explanation-card.tsx` - komponen kartu tinjauan hasil dan pembahasan per soal beserta tombol video YouTube kondisional.
- `src/views/components/timer.tsx` - komponen penunjuk sisa waktu hitung mundur TO dengan perubahan visual otomatis ke warna merah (`wrong`) saat sisa waktu 5 menit atau kurang.
- `src/views/components/question-number-grid.tsx` - sub-komponen grid daftar nomor soal beserta legenda status (dipakai bersama di dalam `BottomSheet` pada HP dan panel kanan sticky pada TO desktop).
- `src/views/not-found-page.tsx` - tampilan halaman 404 umum (tanpa awalan jenjang) bergaya Buku Tulis dengan maskot lokal.

### Modul Fitur (`src/modules/`)
- `src/modules/dev/` `[M1]`
  - `routes.ts` - route `/dev/komponen` yang **hanya aktif saat `NODE_ENV !== 'production'`**.
  - `views/component-catalog-page.tsx` - view katalog seluruh 15 komponen dasar beserta seluruh varian dan interaksinya memakai sampel data lokal di modul `dev`.
- `src/modules/topic/` `[M2]`
  - `routes.ts` - route Beranda umum (`/`) serta route konten berawalan jenjang Halaman Jenjang (`/:level`) dan Halaman Materi (`/:level/materi/:topicSlug`).
  - `views/home-page.tsx` - view Beranda responsif (HP & Desktop).
  - `views/level-dashboard-page.tsx` - view Halaman Jenjang ala daftar tugas Classroom (mendukung mode demo tamu dan sudah login).
  - `views/topic-detail-page.tsx` - view Halaman Materi beserta link video materi YouTube dan daftar paket latihan.
- `src/modules/practice/` `[M2]`
  - `routes.ts` - route Pengerjaan Latihan (`/:level/latihan/:quizSlug`), pengumpulan (`POST /:level/latihan/:quizSlug/kumpulkan`), dan Hasil Latihan (`/:level/latihan/:quizSlug/hasil`).
  - `views/practice-attempt-page.tsx` - view pengerjaan seluruh soal latihan dalam satu halaman beserta modal konfirmasi soal kosong.
  - `views/practice-result-page.tsx` - view skor latihan, daftar pembahasan per soal, tombol Ulangi Latihan, dan tombol Coba TO Gratis.
- `src/modules/tryout/` `[M2]`
  - `routes.ts` - route Lobi TO (`/:level/tryout/:quizSlug`), Pengerjaan TO (`/:level/tryout/:quizSlug/kerjakan`), pengumpulan (`POST /:level/tryout/:quizSlug/kumpulkan`), dan Hasil TO (`/:level/tryout/:quizSlug/hasil`).
  - `views/tryout-lobby-page.tsx` - view informasi paket dan aturan pengerjaan TO.
  - `views/tryout-attempt-page.tsx` - view pengerjaan satu soal per layar, timer sticky, bottom sheet nomor soal (HP), dan layout CBT dua kolom (desktop).
  - `views/tryout-result-page.tsx` - view skor TO, lama pengerjaan, pembahasan per soal, tanpa tombol ulangi.
- `src/modules/auth/` `[M2]`
  - `routes.ts` - route umum tanpa awalan jenjang: Daftar (`/daftar`), Masuk (`/masuk`), dan Keluar (`/keluar`).
  - `views/register-page.tsx` - view form pendaftaran siswa dengan centang persetujuan orang tua/wali dan state pesan error.
  - `views/login-page.tsx` - view form masuk siswa dengan info bantuan lupa password ke admin dan state pesan error.
- `src/modules/admin/` `[M3]`
  - `routes.ts` - seluruh route `/admin/*` termasuk endpoint `POST /admin/soal/preview` untuk perenderan live preview Markdown + LaTeX di server (belum dilindungi auth pada ISSUE-01).
  - `views/admin-login-page.tsx` - view halaman masuk khusus admin (`/admin/masuk`).
  - `views/admin-dashboard-page.tsx` - view ringkasan metrik dan pintasan kelola konten (`/admin`).
  - `views/admin-elements-page.tsx` - view kelola elemen kisi-kisi per jenjang (`/admin/elemen`).
  - `views/admin-topics-page.tsx` - view kelola materi dan link video YouTube materi (`/admin/materi`).
  - `views/admin-questions-page.tsx` - view tabel Bank Soal dengan filter dan modal preview (`/admin/soal`).
  - `views/admin-question-form-page.tsx` - view editor soal 2 kolom dengan panel live preview tampilan siswa berdampingan (`/admin/soal/tambah`, `/admin/soal/:id/edit`).
  - `views/admin-question-preview-fragment.tsx` - fragmen JSX untuk merender preview "Saat Mengerjakan" dan "Setelah Dikumpulkan" dari server.
  - `views/admin-practices-page.tsx` - view kelola paket latihan 5-10 soal per materi (`/admin/latihan`).
  - `views/admin-tryouts-page.tsx` - view kelola paket TO 10-15 soal per jenjang (`/admin/tryout`).
  - `views/admin-students-page.tsx` - view daftar siswa, pencarian username, dan aksi reset password dummy (`/admin/siswa`).
  - `views/admin-reports-page.tsx` - view statistik pengerjaan dan persentase benar per butir soal (`/admin/laporan`).

### Aset Statis Publik (`public/`)
- `public/fonts/` `[M1]` - file WOFF2 lokal `Baloo2` (600, 700, 800), `Nunito` (400, 600, 700, 800), serta file font WOFF2 bawaan `KaTeX`.
- `public/css/` `[M1]` - `app.css` (hasil kompilasi Tailwind CLI, diabaikan di `.gitignore` atau dibuild ulang saat dev/build) dan `katex.min.css` (disalin dari paket lokal `katex` dengan path font mengarah ke `../fonts/`).
- `public/img/` `[M1]` - aset SVG lokal ringan bertema Buku Tulis:
  - `mascot-wave.svg` (maskot menyapa untuk Beranda dan Halaman Jenjang login)
  - `mascot-celebrate.svg` (maskot selebrasi untuk Hasil Latihan dan Hasil TO)
  - `mascot-404.svg` (maskot bingung mencari halaman untuk 404)
  - `hero-notebook.svg` (ilustrasi buku catatan matematika untuk Beranda desktop)
  - `favicon.svg` (ikon tab browser buku tulis stabilo)
- `public/js/` - script vanilla JS tipis tanpa bundel berat dan tanpa data soal di dalamnya:
  - `catalog.js` `[M1]` - interaksi buka/tutup demo modal, bottom sheet, toggle password, dan simulasi pilih opsi pada halaman `/dev/komponen`.
  - `practice.js` `[M2]` - interaksi pilih opsi netral (`single`, `multiple`, `category`), hitung progres soal terjawab real-time, dan buka modal konfirmasi jika masih ada soal kosong saat klik Kumpulkan.
  - `tryout.js` `[M2]` - navigasi pindah nomor soal satu per layar, penanda ragu-ragu tampilan, buka/tutup bottom sheet Daftar Soal di HP, hitung mundur timer tampilan dan transisi warna kritis saat `<= 300` detik, serta modal konfirmasi kumpulkan TO.
  - `auth.js` `[M2]` - tombol mata tampilkan/sembunyikan password dan validasi tampilan pesan error dasar di form `/daftar` dan `/masuk`.
  - `admin-question-form.js` `[M3]` - ganti blok input opsi sesuai dropdown Bentuk Soal, tambah/hapus baris pernyataan kategori, panggil endpoint server `POST /admin/soal/preview` secara debounce saat mengetik Markdown + LaTeX, ganti tab preview ("Saat Mengerjakan" vs "Setelah Dikumpulkan"), serta aktifkan tombol "Terbitkan" setelah admin membuka preview.
  - `admin-quiz-form.js` `[M3]` - hitung jumlah soal dicentang pada form Kelola Latihan (wajib 5-10 soal) dan Kelola TO (wajib 10-15 soal), geser urutan soal naik/turun, dan kunci tombol Terbitkan jika syarat jumlah soal belum terpenuhi.

---

## 3. Pemetaan Token Desain ke Tema Tailwind dan CSS

Acuan tunggal warna, font, elevasi, dan ukuran menggabungkan `.agents/rules/02-ui-buku-tulis.md` dan `docs/stitch/TOKENS.md`. Semua token warna wajib didefinisikan sebagai CSS custom properties di `:root` pada `src/styles/app.css` sekaligus dipetakan ke `tailwind.config.ts`.

### Tabel Token Warna
| Nama Token | CSS Variable | Kelas Tailwind | Nilai Hex | Penggunaan Utama |
|---|---|---|---|---|
| Paper | `--color-paper` | `bg-paper`, `text-paper` | `#FFFDF4` | Latar dasar kertas buku tulis dan badge status netral |
| Paper Soft | `--color-paper-soft` | `bg-paper-soft` | `#F6F4EB` | Latar kotak sekunder, baris pernyataan, dan header tabel |
| Stabilo Soft | `--color-stabilo-soft` | `bg-stabilo-soft` | `#FFF6D1` | Latar kartu opsi jawaban saat sedang dipilih siswa |
| Grid | `--color-grid` | `border-grid`, `bg-grid` | `#D9E6F2` | Garis kotak-kotak buku tulis ukuran 26px x 26px |
| Ink | `--color-ink` | `text-ink`, `border-ink`, `bg-ink` | `#1B3A5C` | Teks utama, seluruh border 2px, nomor soal terjawab, dan bayangan utama |
| Ink Soft | `--color-ink-soft` | `text-ink-soft`, `border-ink-soft` | `#5B7793` | Label section kapital, breadcrumb, metadata, dan teks sekunder |
| Card | `--color-card` | `bg-card` | `#FFFFFF` | Latar kartu soal, tombol sekunder, input aktif, dan modal |
| Line | `--color-line` | `border-line`, `bg-line` | `#C8D8E8` | Garis pemisah halus dan bayangan offset sekunder non-interaktif |
| Stabilo | `--color-stabilo` | `bg-stabilo`, `text-stabilo` | `#FFD84D` | Tombol aksi utama, aksen stabilo kata kunci judul, nomor soal aktif |
| Correct | `--color-correct` | `text-correct`, `border-correct`, `bg-correct` | `#1F9254` | Teks dan border badge jawaban benar serta status Selesai/Terbit |
| Correct Bg | `--color-correct-bg` | `bg-correct-bg` | `#E4F6EA` | Latar lembut badge dan kotak evaluasi jawaban benar |
| Wrong | `--color-wrong` | `text-wrong`, `border-wrong`, `bg-wrong` | `#D9482F` | Teks dan border badge jawaban salah, pesan error, dan timer kritis (`<= 5` menit) |
| Wrong Bg | `--color-wrong-bg` | `bg-wrong-bg` | `#FCEAE6` | Latar lembut badge salah, kotak pesan error, dan timer kritis |
| Badge Orange | `--color-badge-orange` | `bg-badge-orange`, `text-badge-orange` | `#E8734A` | Identitas jenjang SD Kelas 6 dan badge kategori/peringatan |
| Badge Blue | `--color-badge-blue` | `bg-badge-blue`, `text-badge-blue` | `#4A9BE8` | Identitas jenjang SMP Kelas 9 dan badge elemen |
| Badge Purple | `--color-badge-purple` | `bg-badge-purple`, `text-badge-purple` | `#8B5FBF` | Badge bentuk soal kompleks, label ADMIN, dan elemen geometri |
| Badge Green | `--color-badge-green` | `bg-badge-green`, `text-badge-green` | `#2FA88B` | Badge progres, elemen aljabar/data, dan aksen bantuan |

### Tabel Tipografi, Bentuk, Bayangan, dan Ukuran Kontainer
| Kategori | Nama Token / Utility | Spesifikasi Nilai | Aturan Penggunaan |
|---|---|---|---|
| Font Judul & Skor | `font-title` | `"Baloo 2", sans-serif` (bobot 600, 700, 800) | Semua heading `h1`-`h4`, angka skor besar, nomor soal, dan teks tombol utama |
| Font Isi & UI | `font-body` | `"Nunito", sans-serif` (bobot 400, 600, 700, 800) | Teks soal, opsi jawaban, pembahasan, label form, dan tabel (minimal `16px` untuk teks isi) |
| Label Section | `.label-section` | `13px`, huruf kapital (`uppercase`), `letter-spacing: 1.2px`, `font-bold`, warna `ink-soft` | Judul seksi seperti `PILIH JENJANG`, `TRYOUT`, `LATIHAN PER MATERI`, `PEMBAHASAN SOAL` |
| Pola Kertas | `.bg-notebook` | Warna dasar `#FFFDF4` + dua `repeating-linear-gradient` `#D9E6F2` 1px bersilangan tiap `26px` | Dipasang pada latar halaman siswa dan area kerja admin |
| Aksen Stabilo | `.stabilo-highlight` | `linear-gradient(transparent 58%, #FFD84D 58%)` atau blok miring tipis di belakang satu kata kunci judul | Maksimal satu kata atau frasa pendek per judul halaman agar tetap rapi di layar 360px |
| Border Standar | `border-2 border-ink` | `2px solid #1B3A5C` | Wajib pada semua kartu, tombol utama/sekunder, input, select, modal, dan badge utama |
| Radius Sudut | `rounded-card` / `rounded-badge` | Kartu & tombol besar `16px` (`14-16px`), badge ikon `12px`, chip kecil `8px` | Konsisten di seluruh komponen dasar |
| Bayangan Offset | `shadow-solid-sm` / `shadow-solid` / `shadow-solid-lg` / `shadow-line` | `2px 2px 0 #1B3A5C` / `4px 4px 0 #1B3A5C` / `6px 6px 0 #1B3A5C` / `3px 3px 0 #C8D8E8` | Tanpa blur sama sekali. `shadow-solid` untuk kartu & tombol, `shadow-solid-lg` untuk modal & bottom sheet |
| Efek Tekan | `.pressable` | Saat `:active` bergeser `translate(2px, 2px)` dan bayangan mengecil ke `2px 2px 0 #1B3A5C` | Diterapkan pada semua tombol aktif dan kartu yang dapat di-klik |
| Lebar Kontainer | `max-w-mobile` (`460px`), `max-w-desktop` (`760px`), `max-w-beranda` (`1200px`), `max-w-admin` (`1100px`), `max-w-cbt` (`1280px`) | Rata tengah (`mx-auto`) | HP selalu mengikuti lebar penuh hingga `460px`; tablet/desktop menyesuaikan jenis halaman |
| Area Tap & Rumus | `min-h-[48px]`, `.math-scroll` | Tinggi interaktif minimal `48px`; rumus blok `.katex-display` memiliki `overflow-x: auto; max-width: 100%` | Menjamin kenyamanan tap di HP Android 360px dan mencegah halaman bergeser ke samping saat ada rumus panjang |

---

## 4. Definisi Bentuk Data Dummy (Tipe Server)

Seluruh nama tipe dan properti di `src/fixtures/types.ts` wajib mengikuti glosarium `.agents/rules/01-aturan-domain.md` (`level`, `element`, `topic`, `question`, `questionType`, `option`, `answerKey`, `explanation`, `quiz`, `attempt`, `response`). Pemisahan tipe di bawah ini menjaga agar kunci jawaban dan pembahasan tidak pernah ikut terkirim ke view pengerjaan, baik saat memakai data dummy maupun saat disambung ke MySQL pada ISSUE berikutnya.

### A. Tipe Dasar dan Master Konten
- **`Level`**: nilai literal `'sd'` atau `'smp'`.
- **`QuestionType`**: nilai literal `'single'` (pilihan ganda 1 jawaban), `'multiple'` (pilihan ganda kompleks lebih dari 1 jawaban), atau `'category'` (pernyataan Benar/Salah).
- **`QuestionStatus`**: nilai literal `'draft'`, `'published'`, atau `'archived'`.
- **`QuizType`**: nilai literal `'practice'` atau `'tryout'`.
- **`ElementItem`**: `id`, `level`, `name`, `slug`, `order`, `badgeColor` (`'orange' | 'blue' | 'purple' | 'green'`), `topicCount`, `questionCount`.
- **`TopicItem`**: `id`, `level`, `elementId`, `elementName`, `elementBadgeColor`, `title`, `slug`, `description`, `videoUrl` (hasil bangun dari `videoId` jika ada, opsional), `practiceCount`.
- **`QuestionOption`**:
  - Untuk `single` dan `multiple`: `key` (contoh `'A'`, `'B'`, `'C'`, `'D'`), `labelHtml` (hasil render Markdown + LaTeX di server).
  - Untuk `category` (daftar pernyataan): `statementId` (contoh `'1'`, `'2'`, `'3'`), `statementHtml` (hasil render Markdown + LaTeX di server).

### B. Tipe Pengerjaan Siswa (STERIL - Tanpa Kunci dan Pembahasan)
Tipe ini adalah **satu-satunya** bentuk soal yang boleh masuk ke `QuestionCard`, `PracticeAttemptPage`, dan `TryoutAttemptPage`:
- **`QuestionForAttempt`**:
  - Field yang diizinkan: `id`, `number` (nomor urut di paket), `level`, `elementName`, `topicTitle` (opsional), `questionType`, `bodyHtml` (teks soal hasil render Markdown + LaTeX server), `imageUrl` (opsional, path lokal), `options` (daftar opsi untuk `single`/`multiple` atau daftar pernyataan untuk `category`).
  - **Field yang DILARANG ADA pada tipe ini**: `answerKey`, `explanation`, `explanationHtml`, `shortsId`, `shortsUrl`, `longVideoId`, `longVideoSeconds`, `longVideoUrl`, `isCorrect`.
- **`StudentAnswerValue`**:
  - Untuk `single`: `string` kode opsi (misal `'A'`) atau `null` jika kosong.
  - Untuk `multiple`: `string[]` daftar kode opsi terpilih atau `[]` jika kosong.
  - Untuk `category`: pemetaan `Record<string, boolean>` per `statementId` (`true` = Benar, `false` = Salah).
- **`QuizAttemptMeta`**: `id`, `slug`, `level`, `type` (`'practice' | 'tryout'`), `title`, `topicTitle` (opsional), `topicSlug` (opsional), `questionCount`, `durationMinutes` (khusus `tryout`).
- **`PracticeAttemptPageProps`**: `level`, `user` (opsional untuk mode demo login), `quiz` (`QuizAttemptMeta`), `questions` (`QuestionForAttempt[]`), `initialResponses` (`Record<string, StudentAnswerValue>` opsional).
- **`TryoutLobbyPageProps`**: `level`, `user` (opsional), `quiz` (`QuizAttemptMeta`), `rules` (`string[]`), `hasCompletedAttempt` (`boolean`).
- **`TryoutAttemptPageProps`**: `level`, `user` (opsional), `quiz` (`QuizAttemptMeta`), `questions` (`QuestionForAttempt[]`), `initialResponses` (`Record<string, StudentAnswerValue>`), `activeQuestionNumber` (`number`), `remainingSeconds` (`number`, di ISSUE-01 berasal dari durasi dummy atau query demo `?sisa=`).

### C. Tipe Hasil Pengerjaan Siswa (Setelah Dikumpulkan)
Tipe ini hanya dipakai oleh `ExplanationCard`, `PracticeResultPage`, dan `TryoutResultPage`:
- **`ResultStatus`**: `'correct'` (benar), `'wrong'` (salah), atau `'unanswered'` (kosong).
- **`QuestionResultItem`**:
  - Memuat seluruh info soal (`id`, `number`, `elementName`, `questionType`, `bodyHtml`, `imageUrl`, `options`), ditambah:
  - `status` (`ResultStatus`)
  - `studentAnswer` (`StudentAnswerValue`)
  - `studentAnswerLabel` (ringkasan terbaca jawaban siswa, misal `'B'` atau `'Kosong'`)
  - `answerKeyLabel` (ringkasan terbaca kunci jawaban, misal `'C'`, `'Pilihan 1, Pilihan 2'`, atau daftar `'1: Benar, 2: Salah, 3: Benar'`)
  - `explanationHtml` (pembahasan langkah demi langkah hasil render Markdown + LaTeX server, wajib selalu terisi)
  - `shortsUrl` (opsional, string URL YouTube Shorts jika soal punya `shortsId`)
  - `longVideoUrl` (opsional, string URL `youtu.be/ID?t=DETIK` jika soal punya `longVideoId`)
  - `longVideoTimeLabel` (opsional, contoh `'03:20'` untuk teks tombol)
- **`AttemptResultSummary`**: `quizTitle`, `quizSlug`, `level`, `score` (0-100), `correctCount`, `wrongCount`, `unansweredCount`, `totalQuestions`, `durationLabel` (contoh `'26 menit 40 detik'`), `encouragementText`.
- **`PracticeResultPageProps`**: `level`, `user` (opsional), `topicSlug`, `topicTitle`, `tryoutPromoSlug` (opsional), `summary` (`AttemptResultSummary`), `items` (`QuestionResultItem[]`).
- **`TryoutResultPageProps`**: `level`, `user` (opsional), `summary` (`AttemptResultSummary`), `items` (`QuestionResultItem[]`). (Tidak memiliki prop untuk ulangi TO).

### D. Tipe Halaman Umum, Siswa Lainnya, dan Admin
- **`SessionStudentUser`**: `displayName` (contoh `'Raka'`), `username` (contoh `'raka_smp9'`). Bernilai `null` pada mode tamu.
- **`LevelDashboardPageProps`**: `level`, `user` (`SessionStudentUser | null`), `isDemoModeSwitchVisible` (`boolean`), `tryouts` (daftar kartu TO beserta status `'not_started' | 'completed'` dan skor terakhir jika login), `elementGroups` (daftar elemen berisi daftar materi beserta jumlah soal latihan, status selesai, dan nilai terakhir jika login).
- **`TopicDetailPageProps`**: `level`, `user` (`SessionStudentUser | null`), `topic` (`TopicItem`), `practices` (daftar paket latihan materi tersebut berisi `title`, `slug`, `questionCount`, `estimatedMinutes`, serta skor terakhir jika login), `featuredTryoutSlug` (opsional).
- **`AuthPageProps`** (untuk `/daftar` dan `/masuk` tanpa awalan jenjang): `mode` (`'register' | 'login'`), `returnTo` (opsional, contoh `'/smp'` jika datang dari halaman jenjang tertentu), `errorMessage` (opsional untuk banner error atas), `fieldErrors` (opsional per nama field), `defaultValues` (opsional), `supportWhatsappUrl`.
- **`AdminQuestionRecord`** (khusus sisi server & view admin): memuat teks mentah Markdown + LaTeX (`bodyRaw`, `explanationRaw`, `optionsRaw`), `answerKey`, `shortsId`, `longVideoId`, `longVideoSeconds`, `status` (`'draft' | 'published' | 'archived'`), `code` (kode tampil admin seperti `'MAT-9-BIL-014'`), serta klasifikasi `level`, `elementId`, `topicId` (boleh `null` untuk soal khusus TO).
- **`AdminStudentItem`** dan **`AdminQuizReport`**: tipe baris tabel siswa (nama panggilan, username, tanggal daftar, asal link `source`, jumlah pengerjaan) dan tipe laporan paket (jumlah pengerja, rata-rata skor, dan daftar persentase benar per nomor soal).

---

## 5. Daftar Komponen Dasar, Varian, dan Props

Seluruh halaman siswa, umum, dan admin wajib dirakit menggunakan 15 komponen dasar berikut di `src/views/components/` (ditambah helper `Icon` dan `QuestionNumberGrid`) agar gaya Buku Tulis seragam di seluruh aplikasi.

| No | Komponen & Lokasi File | Varian Utama | Props Penting | Aturan Visual & Perilaku |
|---|---|---|---|---|
| 1 | **`Button`** (`button.tsx`) | `primary` (stabilo `#FFD84D`), `secondary` (putih `#FFFFFF`), `danger` (merah `#FCEAE6` teks `#D9482F`), `ghost` (transparan bergaris bawah) | `variant`, `size` (`md` default 48px, `lg` 52-56px, `sm` 40px khusus tabel desktop admin), `href` (jika berupa link `<a>`), `external` (otomatis `target="_blank" rel="noopener noreferrer"`), `fullWidth`, `disabled`, `type`, `id`, `iconLeft`, `iconRight`, `children` | Tinggi minimal `48px` di semua halaman siswa. Border `2px solid ink`, `shadow-solid`, bergeser saat ditekan. Saat `disabled`: tanpa bayangan, tanpa efek tekan, opasitas turun. |
| 2 | **`Card`** (`card.tsx`) | `default` (putih solid + shadow), `soft` (kertas lembut `#F6F4EB`), `dashed` (garis putus-putus ajakan daftar/TO), `interactive` (kartu bisa di-klik penuh) | `variant`, `padding` (`sm`, `md`, `lg`), `href` (jika seluruh kartu berupa link), `className`, `children` | Border `2px solid ink`, radius `16px`. Varian `interactive` memiliki efek tekan persis seperti tombol. |
| 3 | **`Badge`** (`badge.tsx`) | Warna: `orange` (SD), `blue` (SMP), `purple`, `green`, `stabilo`, `neutral` (kertas/abu), `correct` (Benar/Terbit), `wrong` (Salah/Error) | `variant`, `size` (`sm`, `md`), `pill` (`boolean`), `icon`, `children` | Untuk badge ikon kotak kategori memakai ukuran `46px` radius `12px` teks putih tebal; untuk chip status memakai radius `8px` atau kapsul penuh dengan border `ink` / warna status. |
| 4 | **`Input`** (`input.tsx`) | `text`, `password` (dengan tombol mata lihat/sembunyikan), `search` (ikon kaca pembesar kiri), `textarea` (multiline untuk editor soal/pembahasan) | `id`, `name`, `type`, `label`, `hint`, `placeholder`, `value`, `rows`, `required`, `disabled`, `error` (teks pesan salah), `iconLeft` | Tinggi input minimal `48px` di halaman siswa, teks `16px` (mencegah auto-zoom di browser HP). Jika `error` terisi: border berubah ke `wrong` dan pesan error muncul di bawah field. |
| 5 | **`Select`** (`select.tsx`) | `default` (form penuh), `filter` (toolbar filter tabel admin) | `id`, `name`, `label`, `subLabel` (opsional kanan atas), `options` (`{ value, label }[]`), `selectedValue`, `disabled`, `error` | Menggunakan panah chevron SVG lokal di sisi kanan, border `2px solid ink`, latar putih/lembut. |
| 6 | **`Checkbox`** (`checkbox.tsx`) | `default` (form non-soal: centang persetujuan wali di `/daftar` dan checklist admin; serta sub-komponen kotak opsi `multiple` di `QuestionCard`) | `id`, `name`, `value`, `checked`, `label`, `description`, `disabled`, `error` | Kotak `24px x 24px` radius `6-8px` border `2px solid ink`, area tap minimal `48px`. Saat dipilih/centang: menampilkan tanda centang standar di dalam kotak dengan **warna navy (`#1B3A5C`) di atas latar kuning stabilo (`#FFD84D`)**. Dilarang memakai warna hijau atau ikon `check_circle` (lingkaran centang). |
| 7 | **`Toggle`** (`toggle.tsx`) | `switch` (sakelar geser on/off), `binary` (dua tombol berdampingan seperti pilihan `Benar` / `Salah` atau pengalih mode) | `id`, `name`, `variant`, `checked` / `selectedValue`, `leftOption`, `rightOption`, `label`, `disabled` | Pada varian `binary` untuk soal `category` saat pengerjaan: pilihan aktif **HANYA memakai latar stabilo (`#FFD84D`)** dan teks `ink` (`#1B3A5C`) tebal. Warna hijau dan merah **DILARANG** di halaman pengerjaan karena khusus untuk evaluasi di halaman hasil. Ikon `check_circle` maupun ikon silang dilarang. |
| 8 | **`Table`** (`table.tsx`) | `default` (tabel data bergaris Buku Tulis) | `headers` (`{ label, align?, width? }[]`), `isEmpty`, `emptyTitle`, `emptyDescription`, `pagination` (opsional info halaman), `children` | Dibungkus `overflow-x-auto`, border luar `2px solid ink` radius `16px`, header latar `paper-soft` huruf kapital `12px`, mendukung tampilan kosong yang ramah. |
| 9 | **`Modal`** (`modal.tsx`) | `confirm` (peringatan soal kosong / konfirmasi aksi), `preview` (modal lebar preview soal di Bank Soal admin) | `id`, `title`, `variant`, `isOpenByDefault` (`boolean`), `iconVariant` (`warning`, `info`), `footer`, `children` | Backdrop `ink/45`, kartu berbayangan `shadow-solid-lg` (`6px 6px 0`), tombol tutup `X` di kanan atas, bisa ditutup lewat klik area luar atau tombol `Escape`. |
| 10 | **`BottomSheet`** (`bottom-sheet.tsx`) | `default` (panel bawah layar HP/tablet portrait) | `id`, `title`, `subtitle`, `isOpenByDefault`, `children` | Hanya untuk layar mobile/tablet, muncul dari bawah dengan handle garis di tengah atas, tinggi maksimal `85vh` (`overflow-y-auto`), tombol tutup `X`, dan backdrop gelap. |
| 11 | **`Navbar`** (`navbar.tsx`) | `home` (logo + link jenjang desktop + tombol Masuk `/masuk` & Daftar `/daftar`), `page` (tombol kembali + judul/logo + profil/keluar `/keluar` atau tombol `/masuk`), `exam` (header fokus pengerjaan TO/Latihan) | `variant`, `level` (opsional), `title` (opsional), `backHref` (opsional), `user` (`SessionStudentUser | null`) | Tinggi `64px` di HP (`80px` di desktop beranda/standar). **Tidak boleh** memuat menu "Tryout Akbar" dan **tidak boleh** ada bottom navigation bar di bawah layar. |
| 12 | **`AdminSidebar`** (`admin-sidebar.tsx`) | `default` (sidebar kiri tetap 256px di laptop + pemicu buka/tutup di layar sempit) | `activeMenu` (`'dashboard' | 'questions' | 'practices' | 'tryouts' | 'topics' | 'elements' | 'students' | 'reports'`), `adminName` | Menampilkan 8 menu utama: Dashboard, Soal, Latihan, Tryout, Materi, Elemen, Siswa, Laporan. Menu aktif diberi latar `stabilo`, border `2px solid ink`, dan `shadow-solid-sm`. |
| 13 | **`QuestionCard`** (`question-card.tsx`) | Berdasarkan `question.questionType`: `single`, `multiple`, `category` | `question` (`QuestionForAttempt`), `selectedAnswer` (`StudentAnswerValue`), `mode` (`'practice' | 'tryout' | 'preview'`), `showFlagButton` (khusus TO) | Seluruh kartu opsi bisa di-tap (`min-h-[52px]`). Saat pengerjaan, penanda pilihan siswa **HANYA memakai warna kuning stabilo (`#FFD84D`) dan navy (`#1B3A5C`)**. Warna hijau dan merah **DILARANG** di halaman pengerjaan (khusus untuk hasil). Aturan penanda tiap bentuk soal: (1) `single`: lingkaran radio border `ink`, saat terpilih berisi bulatan penuh `ink` di atas kartu beraksen stabilo (dilarang ikon `check_circle`); (2) `multiple`: kotak checkbox border `ink`, saat terpilih **BOLEH menampilkan tanda centang standar** di dalam kotak dengan warna navy di atas kuning stabilo; (3) `category`: tombol biner `Benar` / `Salah` saat dipilih hanya berubah latar menjadi `stabilo` dan teks `ink` tanpa ikon dan tanpa warna hijau/merah; (4) Badge "Sudah diisi" di header kartu memakai titik bulat netral tanpa centang. Rumus panjang dibungkus `.math-scroll`. |
| 14 | **`ExplanationCard`** (`explanation-card.tsx`) | Berdasarkan `item.status`: `correct` (Benar), `wrong` (Salah), `unanswered` (Kosong) | `item` (`QuestionResultItem`) | Menampilkan badge status (hijau untuk Benar, merah untuk Salah, abu-abu netral untuk Kosong), perbandingan jawaban siswa dan kunci, kotak pembahasan tertulis (`explanationHtml`), serta tombol YouTube Shorts dan/atau Video Panjang (`target="_blank" rel="noopener noreferrer"`) yang **hanya dirender jika URL-nya tersedia**. |
| 15 | **`Timer`** (`timer.tsx`) | `normal` (`> 300` detik, kartu putih teks `ink`), `urgent` (`<= 300` detik, latar `wrong-bg` border & teks `wrong`) | `remainingSeconds` (`number`), `id`, `showDemoToggle` (`boolean`, hanya `true` saat `NODE_ENV !== 'production'`) | Selalu terlihat di bagian atas pengerjaan TO. Menghitung mundur per detik di browser sebagai tampilan saja dan otomatis berubah ke varian `urgent` saat menyentuh `05:00` (300 detik). |

---

## 6. Daftar Route, View, dan Data Dummy yang Dipakai

Pembagian URL wajib mematuhi poin 26 `.agents/rules/01-aturan-domain.md`:
- **Halaman konten berawalan jenjang (`/sd/...` dan `/smp/...`)**: halaman jenjang, materi, pengerjaan latihan, hasil latihan, lobi TO, pengerjaan TO, dan hasil TO. Parameter `:level` wajib divalidasi hanya menerima `sd` atau `smp` (nilai lain langsung mengembalikan halaman 404).
- **Halaman umum TANPA awalan jenjang**: `/` (beranda), `/daftar`, `/masuk`, `/keluar`, dan halaman 404.
- **Halaman admin**: berawalan `/admin` dan tidak ditautkan dari halaman siswa mana pun.

### A. Route Umum dan Konten Siswa (Milestone 2, kecuali 404 di Milestone 1)
| Metode & Path URL | Kategori URL | Modul & View | Tipe Props View | Sumber Data Dummy (`src/fixtures/`) | Catatan Perilaku |
|---|---|---|---|---|---|
| `GET /` | Umum (tanpa jenjang) | `topic` -> `home-page.tsx` | `HomePageProps` | `elements.ts` (tag elemen SD & SMP) | Kedua kartu jenjang (`SD Kelas 6` ke `/sd` dan `SMP Kelas 9` ke `/smp`) tampil aktif bertanda "Tersedia". Tombol Masuk/Daftar di navbar mengarah ke `/masuk` dan `/daftar`. |
| `GET /daftar` & `POST /daftar` | Umum (tanpa jenjang) | `auth` -> `register-page.tsx` | `AuthPageProps` | Konfigurasi pesan error dummy | Form Nama Panggilan, Username, Password, dan centang persetujuan orang tua/wali. Mendukung simulasi error (misal `?error=username` atau submit tanpa centang wali). Tanpa awalan jenjang. |
| `GET /masuk` & `POST /masuk` | Umum (tanpa jenjang) | `auth` -> `login-page.tsx` | `AuthPageProps` | Konfigurasi pesan error dummy | Form Username & Password, kartu bantuan lupa password WhatsApp admin, serta simulasi tampilan pesan error (misal `?error=kredensial`). Tanpa awalan jenjang. |
| `GET /keluar` & `POST /keluar` | Umum (tanpa jenjang) | `auth` -> redirect `303` | - | - | Route dummy keluar sesi yang mengarahkan kembali ke `/` (atau menghapus penanda mode demo login jika sedang aktif). |
| `GET /:level` | Konten (`/sd`, `/smp`) | `topic` -> `level-dashboard-page.tsx` | `LevelDashboardPageProps` | `elements.ts`, `topics.ts`, `quizzes.ts`, `attempts.ts` | Mendukung mode demo development lewat query `?sesi=tamu` (default) atau `?sesi=masuk` (siswa dummy "Raka") dengan tombol pengalih kecil khusus non-production. |
| `GET /:level/materi/:topicSlug` | Konten (`/sd/...`, `/smp/...`) | `topic` -> `topic-detail-page.tsx` | `TopicDetailPageProps` | `topics.ts`, `quizzes.ts`, `attempts.ts` | Menampilkan deskripsi, tombol "Tonton Materi di YouTube" (jika `videoUrl` ada), dan daftar paket latihan materi tersebut. Jika slug tidak ada -> 404. |
| `GET /:level/latihan/:quizSlug` | Konten (`/sd/...`, `/smp/...`) | `practice` -> `practice-attempt-page.tsx` | `PracticeAttemptPageProps` | `quizzes.ts`, `questions.ts` (via pemilih steril `getQuestionsForAttempt`) | Merender 5-10 soal di satu halaman memakai `QuestionForAttempt[]` (tanpa kunci & pembahasan). |
| `POST /:level/latihan/:quizSlug/kumpulkan` | Konten (`/sd/...`, `/smp/...`) | `practice` -> redirect `303` | - | - | Endpoint transisi form submit latihan yang mengarahkan siswa ke `/:level/latihan/:quizSlug/hasil`. |
| `GET /:level/latihan/:quizSlug/hasil` | Konten (`/sd/...`, `/smp/...`) | `practice` -> `practice-result-page.tsx` | `PracticeResultPageProps` | `quizzes.ts`, `attempts.ts` (`getDummyPracticeResult`) | Menampilkan skor dummy, status benar/salah/kosong, pembahasan berumus rapi, tombol video kondisional, tombol "Ulangi Latihan", dan "Coba TO Gratis". |
| `GET /:level/tryout/:quizSlug` | Konten (`/sd/...`, `/smp/...`) | `tryout` -> `tryout-lobby-page.tsx` | `TryoutLobbyPageProps` | `quizzes.ts`, `attempts.ts` | Menampilkan judul TO, jumlah soal, durasi, 1x kesempatan, 3 aturan utama, dan tombol "Mulai TO". |
| `GET /:level/tryout/:quizSlug/kerjakan` | Konten (`/sd/...`, `/smp/...`) | `tryout` -> `tryout-attempt-page.tsx` | `TryoutAttemptPageProps` | `quizzes.ts`, `questions.ts` (via pemilih steril `getQuestionsForAttempt`) | Satu soal aktif per layar, navigasi Sebelumnya/Berikutnya, panel nomor soal (Bottom Sheet di HP, panel kanan di desktop), timer tampilan (mendukung `?sisa=305` di dev). |
| `POST /:level/tryout/:quizSlug/kumpulkan` | Konten (`/sd/...`, `/smp/...`) | `tryout` -> redirect `303` | - | - | Endpoint transisi pengumpulan TO yang mengarahkan siswa ke `/:level/tryout/:quizSlug/hasil`. |
| `GET /:level/tryout/:quizSlug/hasil` | Konten (`/sd/...`, `/smp/...`) | `tryout` -> `tryout-result-page.tsx` | `TryoutResultPageProps` | `quizzes.ts`, `attempts.ts` (`getDummyTryoutResult`) | Menampilkan skor dummy, jumlah benar, durasi pengerjaan, pembahasan per butir soal, **tanpa tombol ulangi**. |

### B. Route Admin (`/admin/*`) - Milestone 3
> [!WARNING]
> Seluruh route `/admin` di bawah ini pada tahap ISSUE-01 hanya menampilkan antarmuka dengan data dummy dan **belum memiliki proteksi login/role admin**. Aplikasi **TIDAK BOLEH di-deploy ke publik** sebelum ISSUE-02 memasang middleware otorisasi role admin di server.

| Metode & Path URL | View Admin | Sumber Data Dummy (`src/fixtures/`) | Catatan Pola Desain |
|---|---|---|---|
| `GET /admin/masuk` & `POST /admin/masuk` | `admin-login-page.tsx` | Konfigurasi pesan error dummy | Pola kartu login Buku Tulis terpusat dengan badge `ADMIN` (tanpa sidebar), mendukung state pesan error. |
| `GET /admin` | `admin-dashboard-page.tsx` | `questions.ts`, `quizzes.ts`, `users-and-reports.ts` | Pola kartu metrik Buku Tulis + tabel aktivitas ringkas mengikuti tata letak `a1-daftar-soal.html`. |
| `GET /admin/elemen` | `admin-elements-page.tsx` | `elements.ts` | Pola 2 kolom (`a3-kelola-latihan.html`): daftar elemen per jenjang (SD & SMP) beserta urutan di kiri, form tambah/ubah elemen di kanan. |
| `GET /admin/materi` | `admin-topics-page.tsx` | `elements.ts`, `topics.ts` | Pola toolbar filter + tabel (`a1-daftar-soal.html`) dilengkapi panel/modal form tambah/ubah materi dan input link YouTube materi. |
| `GET /admin/soal` | `admin-questions-page.tsx` | `elements.ts`, `topics.ts`, `questions.ts` | Sesuai desain `admin/a1-daftar-soal.html`: filter jenjang, elemen, materi, status (Terbit/Draft/Arsip), cari teks, tabel soal, dan modal preview tampilan siswa. |
| `GET /admin/soal/tambah` & `GET /admin/soal/:id/edit` | `admin-question-form-page.tsx` | `elements.ts`, `topics.ts`, `questions.ts` | Sesuai desain `admin/a2-form-soal.html`: editor kiri (mendukung opsi "Tanpa materi (khusus TO)") + panel kanan sticky Live Preview tampilan siswa, tombol Terbitkan dikunci sebelum preview dibuka. |
| `POST /admin/soal/preview` | `admin-question-preview-fragment.tsx` | Helper `markdown.ts` & `youtube.ts` | Menerima teks form saat ini, merender Markdown + LaTeX di server (`html: false`), dan mengembalikan HTML `QuestionCard` + `ExplanationCard` untuk memperbarui panel preview. |
| `GET /admin/latihan` | `admin-practices-page.tsx` | `topics.ts`, `quizzes.ts`, `questions.ts` | Sesuai desain `admin/a3-kelola-latihan.html`: daftar paket per materi di kiri, form pilih 5-10 soal terbit & atur urutan di kanan. |
| `GET /admin/tryout` | `admin-tryouts-page.tsx` | `elements.ts`, `quizzes.ts`, `questions.ts` | Mengadaptasi pola 2 kolom `a3-kelola-latihan.html`: daftar TO per jenjang di kiri, form judul, jenjang, durasi menit, dan pilih 10-15 soal terbit (termasuk soal tanpa materi) di kanan. |
| `GET /admin/siswa` | `admin-students-page.tsx` | `users-and-reports.ts` | Mengadaptasi pola toolbar + tabel `a1-daftar-soal.html`: cari username, tabel daftar siswa, dan tombol "Reset Password" dengan modal konfirmasi. |
| `GET /admin/laporan` | `admin-reports-page.tsx` | `quizzes.ts`, `users-and-reports.ts` | Mengadaptasi pola `a1-daftar-soal.html`: pilih paket latihan/TO, kartu jumlah pengerja & rata-rata skor, serta tabel persentase benar per nomor soal. |

### C. Route Sistem dan Development - Milestone 1
| Metode & Path URL | View | Kondisi Aktif | Catatan Perilaku |
|---|---|---|---|
| `GET /dev/komponen` | `dev/views/component-catalog-page.tsx` | **Hanya aktif saat `NODE_ENV !== 'production'`** | Menampilkan seluruh 15 komponen dasar beserta semua varian, state error, state disabled, modal, bottom sheet, soal (penanda opsi netral), pembahasan, dan timer di satu halaman uji konsistensi. Saat `NODE_ENV === 'production'`, route ini tidak aktif dan mengembalikan halaman 404. |
| Semua path tidak dikenal (`*`) | `views/not-found-page.tsx` | Selalu aktif (HTTP status `404`) | Halaman umum tanpa awalan jenjang bergaya Buku Tulis dengan maskot lokal `/img/mascot-404.svg`, pesan ramah sapaan "kamu", dan tombol kembali ke Beranda (`/`). |

---

## 7. Daftar Temuan AUDIT.md yang Wajib Ditangani

Berdasarkan audit di `docs/stitch/AUDIT.md`, tidak ada layar yang perlu di-generate ulang di Stitch, namun 10 poin koreksi berikut **wajib diterapkan langsung saat menulis komponen dan view di ISSUE-01**:

1. **Hapus seluruh referensi "Tryout Akbar"**: Pada navbar desktop (`01`, `03`, `04`, `05`, `08`) dan banner bawah halaman materi desktop (`03-materi.html`), hapus tautan maupun sebutan "Tryout Akbar" karena berada di luar scope MVP. Pada banner bawah halaman materi, arahkan tombol "Coba TO Gratis" ke daftar/lobi TO reguler jenjang aktif.
2. **Bersihkan seluruh karakter em dash**: Hapus penggunaan tanda em dash pada judul dokumen `<title>` dan teks hak cipta footer desktop (`Yuk Ngeles - Teman Belajar Matematika SD dan SMP`). Pastikan tidak ada satu pun karakter em dash di seluruh file view, fixture, maupun komponen.
3. **Perjelas aturan penanda opsi jawaban saat mengerjakan**: Pada desain Stitch `04-pengerjaan-latihan` dan `06b-pengerjaan-to`, terdapat pemakaian `check_circle` yang berisiko disangka validasi "jawaban benar" oleh siswa. Saat implementasi di `QuestionCard`, terapkan aturan tegas berikut:
   - Saat mengerjakan (halaman pengerjaan latihan dan TO), penanda pilihan siswa **HANYA memakai warna kuning stabilo (`#FFD84D`) dan navy (`#1B3A5C`)**. Warna hijau dan merah **DILARANG** di halaman pengerjaan, karena keduanya khusus untuk status benar/salah di halaman hasil.
   - Ikon `check_circle` atau centang dalam lingkaran dilarang untuk menandai pilihan siswa.
   - Bentuk `single`: lingkaran radio border `ink` dengan titik bulat penuh warna navy (`#1B3A5C`) di tengah di atas kartu beraksen stabilo. Dilarang memakai `check_circle`.
   - Bentuk `multiple`: kotak checkbox border `ink`, saat terpilih **BOLEH menampilkan tanda centang standar** di dalam kotak dengan warna navy di atas kuning stabilo (`#FFD84D`). Dilarang memakai warna hijau.
   - Bentuk `category`: tombol biner `Benar` / `Salah` saat dipilih hanya berubah latar menjadi `stabilo` (`#FFD84D`) dan teks `ink` tebal, tanpa ikon centang/silang dan tanpa warna hijau/merah.
   - Header kartu soal ("Sudah diisi"): titik bulat kecil netral tanpa ikon centang.
4. **Ubah mockup ganda `hp/02-jenjang.html` menjadi satu halaman responsif tunggal**: Ambil isi dalam kerangka mockup untuk dijadikan komponen `level-dashboard-page.tsx` tunggal (`max-w-mobile` di HP dan `max-w-desktop` di layar lebar) yang merender tampilan Tamu atau tampilan Sudah Login berdasarkan prop `user`, dilengkapi tombol pengalih mode demo khusus non-production.
5. **Pisahkan route Daftar dan Masuk ke URL umum `/daftar` dan `/masuk`**: File `desktop/08-daftar-dan-masuk.html` menyatukan kedua form dalam satu halaman. Saat implementasi, pisahkan ke route umum tanpa awalan jenjang yaitu `/daftar` dan `/masuk` sesuai poin 26 `01-aturan-domain.md`. Pada layar desktop, tombol tab di atas kartu berfungsi sebagai tautan navigasi antar `/daftar` dan `/masuk`.
6. **Ganti seluruh font, CSS, ikon, dan gambar CDN dengan aset lokal**: Hapus semua tag `<link>` Google Fonts (`Rubik`, `Nunito Sans`, `Material Symbols`) dan `<script src="https://cdn.tailwindcss.com">`. Gunakan font WOFF2 lokal `Baloo 2` dan `Nunito` di `public/fonts/`, CSS hasil kompilasi `public/css/app.css`, komponen ikon SVG inline, serta ilustrasi maskot SVG lokal di `public/img/` sebagai pengganti gambar `lh3.googleusercontent.com`.
7. **Pastikan tinggi minimal area tap 48px dan teks isi minimal 16px**: Beberapa tombol di HTML Stitch memakai tinggi `h-10` atau `h-11` (40-44px). Ubah seluruh tombol, kartu opsi, link aksi, dan input di halaman siswa menjadi minimal tinggi `48px` (`min-h-[48px]`) dan ukuran teks soal/opsi/paragraf minimal `16px`.
8. **Seragamkan border 2px tinta dan bayangan offset tanpa blur**: Pada `hp/06a-lobi-to`, `hp/07-hasil-to`, dan `admin/a3-kelola-latihan`, sebagian kartu Stitch memakai bayangan `#436084` atau `shadow-sm` blur tipis tanpa border 2px. Seragamkan semuanya memakai `border-2 border-ink` (`#1B3A5C`) dan bayangan offset solid (`shadow-solid` / `shadow-solid-sm`).
9. **Rapikan editor Form Soal Admin (`a2-form-soal.html`)**: Ganti label kecil "Kurikulum" pada field Elemen menjadi "Elemen Kisi-kisi". Pada bagian Pilihan Jawaban, jangan tampilkan blok Tipe 1, Tipe 2, dan Tipe 3 menumpuk sekaligus seperti di mockup statis, melainkan tampilkan hanya blok editor opsi yang sesuai dengan Bentuk Soal yang sedang dipilih (`single`, `multiple`, atau `category`).
10. **Bersihkan elemen non-PRD di Pengerjaan TO Desktop (`desktop/06b-pengerjaan-to.html`) dan copywriting minor**: Hapus tab navigasi atas "Buku Rumus" serta hapus kotak "Petunjuk Pengerjaan / Buku Rumus Cepat" di dalam soal yang membocorkan rumus penyelesaian soal. Sesuaikan teks "Sesuai Kurikulum TKA" / "Terakreditasi" menjadi "Sesuai kisi-kisi resmi TKA", serta ubah "oleh Guru Ahli" pada kartu video desktop menjadi "oleh Kak Riyadi".

---

## 8. Tahapan Pengerjaan Step-by-Step (3 Milestone)

Kerjakan satu milestone hingga tuntas, lolos `typecheck` (`tsc --noEmit`), lolos `build:css`, dan lolos checklist uji manual milestone tersebut pada Bagian 9 sebelum membuat PR dan melangkah ke milestone berikutnya.

---

### MILESTONE 1: Fondasi Proyek, Tema, Helper Konten, 15 Komponen Dasar, Katalog, dan 404
- **Branch**: `feat/issue-01a-fondasi` (dibuat dari `main`)
- **Target Output**: 1 PR mandiri yang menyajikan fondasi server Elysia + JSX, tema Tailwind Buku Tulis, font lokal, perender Markdown + LaTeX, seluruh 15 komponen dasar beserta layout, katalog `/dev/komponen` (khusus non-production), dan halaman 404.

#### Langkah 1.1: Setup Proyek, Branch, dan Aset Lokal
1. Buat branch `feat/issue-01a-fondasi` dari `main`.
2. Inisialisasi `package.json` dan `tsconfig.json` untuk Bun + ElysiaJS + JSX server (`@elysiajs/html`, `@elysiajs/static`, `markdown-it`, `katex`, `tailwindcss` CLI, beserta paket `@types/*`).
3. Siapkan script di `package.json`: `build:css` (kompilasi `src/styles/app.css` ke `public/css/app.css`), `watch:css`, `dev` (menjalankan server Elysia dengan watch), dan `typecheck` (`tsc --noEmit`). Pastikan `.gitignore` mengabaikan `node_modules/`, `uploads/`, dan file hasil build sementara bila diperlukan.
4. Tempatkan file font WOFF2 lokal `Baloo 2` (600, 700, 800) dan `Nunito` (400, 600, 700, 800) di `public/fonts/`. Salin `katex.min.css` ke `public/css/` dan font WOFF2 `KaTeX` ke `public/fonts/` (sesuaikan path `@font-face` di `katex.min.css` agar memuat dari `../fonts/` tanpa internet).
5. Buat kelima aset SVG placeholder lokal bertema Buku Tulis di `public/img/` (`mascot-wave.svg`, `mascot-celebrate.svg`, `mascot-404.svg`, `hero-notebook.svg`, `favicon.svg`).

#### Langkah 1.2: Konfigurasi Tema Buku Tulis dan Helper Server
1. Konfigurasikan `tailwind.config.ts` dan `src/styles/app.css` sesuai Tabel Pemetaan Token pada Bagian 3 (CSS variables `:root`, `@font-face` lokal, latar `.bg-notebook` ukuran 26px, `.stabilo-highlight`, efek tekan `.pressable`, dan aturan `.math-scroll` untuk `.katex-display`). Jalankan `build:css` dan pastikan `public/css/app.css` terbentuk.
2. Buat `src/lib/markdown.ts`: implementasikan perender Markdown (`html: false`) + LaTeX yang menerima penulisan `$...$`, `$$...$$`, `\(...\)`, dan `\[...\]` menggunakan `katex.renderToString` (`throwOnError: false`). Pastikan rumus blok dibungkus kontainer `.math-scroll` agar rumus panjang dapat digeser di dalam kotaknya sendiri.
3. Buat `src/lib/youtube.ts` dan `src/lib/format.ts`: implementasikan ekstraktor ID video YouTube dari semua format URL valid (`youtu.be`, `watch?v=`, `shorts/`, `embed/`), penolakan URL tidak valid, konversi detik ke `mm:ss` dan sebaliknya, serta pembangun URL tampil Shorts (`https://youtube.com/shorts/ID`) dan video panjang (`https://youtu.be/ID?t=DETIK`).

#### Langkah 1.3: Tipe Dasar, 15 Komponen Dasar, dan Layout
1. Buat `src/fixtures/types.ts` berisi tipe domain dasar serta pemisahan `QuestionForAttempt` (steril tanpa kunci/pembahasan) dan `QuestionResultItem` yang dibutuhkan oleh komponen.
2. Buat `src/views/components/icon.tsx` berisi kumpulan ikon SVG inline.
3. Bangun ke-15 komponen dasar di `src/views/components/` sesuai spesifikasi Bagian 5 (`Button`, `Card`, `Badge`, `Input`, `Select`, `Checkbox`, `Toggle`, `Table`, `Modal`, `BottomSheet`, `Navbar`, `AdminSidebar`, `QuestionCard`, `ExplanationCard`, `Timer`) beserta `QuestionNumberGrid`. Pastikan `QuestionCard` saat pengerjaan hanya memakai warna kuning stabilo dan navy (bebas dari warna hijau/merah), tidak memakai ikon `check_circle` (lingkaran centang), serta checkbox untuk pilihan ganda kompleks `multiple` memakai centang standar navy di dalam kotak kuning stabilo.
4. Bangun `BaseLayout`, `StudentLayout`, dan `AdminLayout` di `src/views/layouts/`.

#### Langkah 1.4: Katalog Komponen Development dan Halaman 404
1. Bangun `src/views/not-found-page.tsx` dengan maskot `/img/mascot-404.svg`, gaya Buku Tulis, sapaan "kamu", dan tombol kembali ke `/`.
2. Bangun `src/modules/dev/views/component-catalog-page.tsx`, `src/modules/dev/routes.ts`, dan `public/js/catalog.js` yang memamerkan seluruh 15 komponen dasar beserta semua varian, state error/disabled, sampel rumus panjang KaTeX, ketiga bentuk soal `QuestionCard`, ketiga status `ExplanationCard`, `Timer` normal vs kritis, `Modal`, dan `BottomSheet`.
3. Buat `src/index.ts`: daftarkan static `public/`, daftarkan modul `dev` **hanya jika `process.env.NODE_ENV !== 'production'`**, dan pasang handler global 404 dengan HTTP status `404`.
4. Jalankan `typecheck`, `build:css`, dan laksanakan seluruh **Checklist Uji Milestone 1 (Bagian 9.1)** sebelum membuat PR 1.

---

### MILESTONE 2: Data Dummy Siswa dan Seluruh Halaman Siswa
- **Branch**: `feat/issue-01b-halaman-siswa` (dibuat setelah Milestone 1 selesai)
- **Target Output**: 1 PR mandiri yang menghadirkan seluruh alur halaman umum dan halaman konten siswa (`/`, `/daftar`, `/masuk`, `/keluar`, `/sd/...`, `/smp/...`) menggunakan data dummy server dan merakit komponen dari Milestone 1.

#### Langkah 2.1: Penyusunan Data Dummy Siswa (`src/fixtures/`)
1. Buat branch `feat/issue-01b-halaman-siswa`. Lengkapi `src/fixtures/types.ts` untuk seluruh props view halaman siswa dan autentikasi umum.
2. Buat `elements.ts`, `topics.ts`, `questions.ts`, `quizzes.ts`, dan `attempts.ts`:
   - Sediakan data lengkap untuk **kedua jenjang** (`sd` dan `smp`) agar semua halaman dapat diklik dan diuji pada `/sd/...` maupun `/smp/...`.
   - Sediakan minimal 1 paket latihan per materi utama (5 soal yang memuat ketiga bentuk `single`, `multiple`, dan `category`, serta minimal 1 soal dengan rumus panjang untuk uji scroll horizontal di dalam kotak rumus) dan 1 paket TO (10-15 soal) per jenjang.
   - Sediakan variasi soal dengan kedua link video (Shorts + video panjang bermenit), hanya satu link video, dan tanpa link video sama sekali.
   - Sediakan fungsi selektor server `getQuestionsForAttempt(quizSlug)` yang hanya mengembalikan `QuestionForAttempt[]` (steril tanpa kunci jawaban, pembahasan, maupun ID/URL video pembahasan).

#### Langkah 2.2: Beranda, Halaman Jenjang, dan Halaman Materi (`src/modules/topic/`)
1. Bangun `home-page.tsx` (`GET /`) mengacu ke `hp/01-beranda.html` dan `desktop/01-beranda.html`: hero dengan maskot lokal, aksen stabilo pada "cara ribet", kartu jenjang `SD Kelas 6` (`/sd`) dan `SMP Kelas 9` (`/smp`) yang keduanya aktif bertanda "Tersedia", bagian "Kenapa di Sini?", dan kartu channel YouTube (`target="_blank" rel="noopener noreferrer"`).
2. Bangun `level-dashboard-page.tsx` (`GET /:level`) mengacu ke isi `hp/02-jenjang.html` (adaptasi 1 kolom `max-w-desktop` rapi untuk tablet/laptop): seksi `TRYOUT` dan seksi `LATIHAN PER MATERI` dikelompokkan per elemen kisi-kisi. Sediakan mode demo Tamu (`?sesi=tamu`, tombol mengarah ke `/masuk` dan `/daftar`) dan mode demo Sudah Login Raka (`?sesi=masuk`, sapaan nama siswa, status pengerjaan, dan aksi `/keluar`) beserta bar kecil pengalih demo khusus saat `NODE_ENV !== 'production'`.
3. Bangun `topic-detail-page.tsx` (`GET /:level/materi/:topicSlug`) mengacu ke `hp/03-materi.html` dan `desktop/03-materi.html` (dengan perbaikan Audit): breadcrumb, badge elemen, judul berstabilo, deskripsi materi, tombol eksternal "Tonton Materi di YouTube" (kondisional jika `videoUrl` ada), daftar kartu paket latihan materi tersebut dengan tombol "Mulai Latihan", dan kartu ajakan bawah "Coba TO Gratis".

#### Langkah 2.3: Pengerjaan Latihan dan Hasil Latihan (`src/modules/practice/`)
1. Bangun `practice-attempt-page.tsx` (`GET /:level/latihan/:quizSlug`), endpoint `POST /:level/latihan/:quizSlug/kumpulkan`, dan `public/js/practice.js` mengacu ke `04-pengerjaan-latihan.html` (HP & desktop):
   - Tampilkan kartu progres terjawab (`0 dari 5 terjawab` di awal) dan seluruh kartu soal `QuestionCard` untuk bentuk `single`, `multiple`, dan `category` dengan penanda pilihan hanya memakai kuning stabilo dan navy (tanpa warna hijau/merah dan tanpa ikon `check_circle`; checkbox `multiple` boleh memakai centang standar navy di atas kuning stabilo).
   - Saat pengguna memilih jawaban di ketiga bentuk soal, perbarui tampilan kartu opsi terpilih, ubah badge soal menjadi "Sudah diisi" (khusus `category` hanya setelah semua pernyataan dipilih), dan perbarui penghitung serta progress bar terjawab.
   - Saat klik "Kumpulkan Jawaban": jika masih ada soal kosong, buka `Modal` konfirmasi berisi jumlah terjawab dan daftar nomor kosong; jika semua sudah diisi atau pengguna menekan "Kumpulkan" di dalam modal, arahkan ke `/:level/latihan/:quizSlug/hasil`.
2. Bangun `practice-result-page.tsx` (`GET /:level/latihan/:quizSlug/hasil`) mengacu ke `05-hasil-latihan.html` (HP & desktop): kartu skor dummy dengan maskot selebrasi lokal, daftar `ExplanationCard` (contoh Benar, Salah, dan Kosong, rumus ter-render rapi, serta tombol Shorts dan Video Panjang kondisional), diikuti tombol bawah "Ulangi Latihan" dan "Coba TO Gratis".

#### Langkah 2.4: Lobi TO, Pengerjaan TO, dan Hasil TO (`src/modules/tryout/`)
1. Bangun `tryout-lobby-page.tsx` (`GET /:level/tryout/:quizSlug`) mengacu ke `hp/06a-lobi-to.html` (adaptasi `max-w-desktop` di layar lebar): informasi jumlah soal, durasi menit, 1x kesempatan, 3 aturan pengerjaan, dan tombol utama "Mulai TO" menuju `/:level/tryout/:quizSlug/kerjakan`.
2. Bangun `tryout-attempt-page.tsx` (`GET /:level/tryout/:quizSlug/kerjakan`), endpoint `POST /:level/tryout/:quizSlug/kumpulkan`, dan `public/js/tryout.js` mengacu ke `hp/06b-pengerjaan-to.html` dan `desktop/06b-pengerjaan-to.html`:
   - Tampilkan `Timer` hitung mundur selalu terlihat di bagian atas (mendukung query demo `?sisa=305` dan pemicu demo non-production untuk mengetes perubahan ke warna merah `wrong` saat sisa `<= 5` menit).
   - Render satu soal aktif per layar dengan tombol navigasi "Sebelumnya", penanda tampilan "Ragu-ragu", dan "Berikutnya" (penanda pilihan hanya kuning stabilo dan navy tanpa `check_circle` dan tanpa warna hijau/merah).
   - Di HP/tablet portrait: tombol "Daftar Soal" membuka `BottomSheet` berisi grid nomor soal dan tombol "Selesai dan Kumpulkan". Di laptop/desktop (`>= 1024px`): tampilkan layout ujian komputer 2 kolom dengan panel Daftar Nomor sticky di sisi kanan (tanpa tab "Buku Rumus" maupun kotak bocoran rumus).
   - Saat klik "Selesai dan Kumpulkan", tampilkan `Modal` konfirmasi ringkasan soal terjawab dan kosong sebelum mengarahkan ke Hasil TO.
3. Bangun `tryout-result-page.tsx` (`GET /:level/tryout/:quizSlug/hasil`) mengacu ke `hp/07-hasil-to.html` (adaptasi `max-w-desktop` di layar lebar): kartu skor dummy, jumlah benar, lama pengerjaan, daftar `ExplanationCard` per soal, dan satu tombol kembali ke halaman jenjang (**tanpa tombol ulangi**).

#### Langkah 2.5: Halaman Umum Daftar, Masuk, dan Keluar (`src/modules/auth/`)
1. Bangun `register-page.tsx` (`/daftar`), `login-page.tsx` (`/masuk`), route dummy `/keluar`, dan `public/js/auth.js` mengacu ke `hp/08a-daftar.html`, `hp/08b-masuk.html`, dan `desktop/08-daftar-dan-masuk.html`. Pastikan seluruh URL autentikasi siswa memakai `/daftar`, `/masuk`, dan `/keluar` **tanpa awalan jenjang**.
2. Pastikan form `/daftar` memuat Nama Panggilan, Username, Password (dengan toggle lihat/sembunyikan), serta `Checkbox` "Orang tua atau wali sudah tahu aku daftar di sini".
3. Pastikan form `/masuk` memuat Username, Password, dan kartu bantuan lupa password menghubungi admin lewat WhatsApp.
4. Sediakan tampilan pesan error bergaya Buku Tulis (`bg-wrong-bg`, `border-wrong`, `text-wrong`) yang dapat dilihat lewat validasi submit form kosong/tanpa centang wali maupun lewat parameter query (contoh `?error=1`).
5. Daftarkan modul `topic`, `practice`, `tryout`, dan `auth` ke `src/index.ts`. Jalankan `typecheck`, `build:css`, dan laksanakan seluruh **Checklist Uji Milestone 2 (Bagian 9.2)** sebelum membuat PR 2.

---

### MILESTONE 3: Seluruh Halaman Admin dan Live Preview Server
- **Branch**: `feat/issue-01c-halaman-admin` (dibuat setelah Milestone 2 selesai)
- **Target Output**: 1 PR mandiri yang menghadirkan seluruh panel `/admin/*` beserta endpoint live preview Markdown + LaTeX `POST /admin/soal/preview` menggunakan data dummy server.
- **Catatan Keamanan Wajib**: Pastikan di kode route admin maupun deskripsi PR tertulis jelas bahwa `/admin` belum memiliki guard autentikasi pada ISSUE-01 dan aplikasi **dilarang keras di-deploy ke publik** sebelum ISSUE-02 selesai.

#### Langkah 3.1: Data Dummy Admin dan Halaman Admin Berdesain Stitch (`src/modules/admin/` Bagian 1)
1. Buat branch `feat/issue-01c-halaman-admin`. Tambahkan `src/fixtures/users-and-reports.ts` serta lengkapi data mentah admin (`AdminQuestionRecord`) di `src/fixtures/questions.ts`.
2. Bangun `admin-questions-page.tsx` (`GET /admin/soal`) mengacu ke `admin/a1-daftar-soal.html`: filter jenjang, elemen, materi, status (Terbit, Draft, Arsip), pencarian teks, tabel soal, serta tombol aksi Lihat Preview (membuka `Modal` berisi preview tampilan siswa) dan tombol Edit/Tambah Soal.
3. Bangun endpoint `POST /admin/soal/preview` dan `admin-question-preview-fragment.tsx` yang menerima input form soal mentah, merender Markdown + LaTeX di server (`html: false`) memakai `src/lib/markdown.ts`, mengolah link YouTube memakai `src/lib/youtube.ts`, lalu mengembalikan HTML preview menggunakan komponen `QuestionCard` (penanda opsi netral) dan `ExplanationCard`.
4. Bangun `admin-question-form-page.tsx` (`GET /admin/soal/tambah` & `GET /admin/soal/:id/edit`) dan `public/js/admin-question-form.js` mengacu ke `admin/a2-form-soal.html`:
   - Kolom kiri (7 kolom): klasifikasi Jenjang, Elemen Kisi-kisi (label "Elemen Kisi-kisi", bukan "Kurikulum"), Materi Pokok (dengan pilihan "Tanpa materi (khusus TO)"), Bentuk Soal, Teks Soal, input gambar soal opsional, blok Pilihan Jawaban & Kunci yang hanya menampilkan editor sesuai bentuk soal aktif (`single`, `multiple`, atau `category`), Pembahasan tertulis wajib, dan Media Video opsional (Shorts, Video Panjang, menit `mm:ss`).
   - Kolom kanan sticky (5 kolom): panel Preview Tampilan Siswa dengan switcher tab "Saat Mengerjakan" dan "Setelah Dikumpulkan" yang diperbarui otomatis lewat request debounce ke `POST /admin/soal/preview` setiap kali admin mengetik.
   - Bar aksi bawah: tombol "Simpan Draft", tombol "Buka Preview", dan tombol "Terbitkan" yang awalnya `disabled` dan baru terbuka setelah admin membuka preview tampilan siswa.
5. Bangun `admin-practices-page.tsx` (`GET /admin/latihan`) dan `public/js/admin-quiz-form.js` mengacu ke `admin/a3-kelola-latihan.html`: daftar paket per materi di kiri, form pilih materi, judul paket, checklist soal terbit, tombol pengatur urutan naik/turun, dan validasi penghitung 5 sampai 10 soal di kanan.

#### Langkah 3.2: Halaman Admin Pelengkap Sesuai Pola Desain (`src/modules/admin/` Bagian 2)
Gunakan komponen dasar Buku Tulis serta pola tata letak `a1-daftar-soal.html` dan `a3-kelola-latihan.html` sesuai tabel "Pola untuk halaman tanpa desain" di `docs/stitch/README.md`:
1. **`admin-login-page.tsx` (`/admin/masuk`)**: kartu form masuk admin terpusat bergaya Buku Tulis dengan badge ungu `ADMIN` dan dukungan tampilan pesan error.
2. **`admin-dashboard-page.tsx` (`/admin`)**: bar kartu metrik ringkas (total soal terbit/draft, paket aktif, total attempt latihan, akun siswa baru, TO selesai) dan pintasan kelola konten.
3. **`admin-elements-page.tsx` (`/admin/elemen`)**: layout 2 kolom untuk menampilkan daftar elemen per jenjang (SD & SMP) beserta nomor urut di kiri dan form tambah/ubah elemen di kanan.
4. **`admin-topics-page.tsx` (`/admin/materi`)**: toolbar filter jenjang & elemen, tabel daftar materi (judul, slug, elemen, status video YouTube), dan form tambah/ubah materi (termasuk input link video YouTube materi).
5. **`admin-tryouts-page.tsx` (`/admin/tryout`)**: layout 2 kolom ala Kelola Latihan untuk daftar paket TO di kiri dan form penyusunan TO di kanan (judul, jenjang, durasi menit, pemilihan 10 sampai 15 soal terbit lintas materi maupun soal tanpa materi, serta urutan soal).
6. **`admin-students-page.tsx` (`/admin/siswa`)**: toolbar pencarian username/nama panggilan, tabel daftar siswa, dan tombol "Reset Password" yang menampilkan modal konfirmasi password sementara dummy.
7. **`admin-reports-page.tsx` (`/admin/laporan`)**: filter pilih paket latihan/TO, kartu ringkasan jumlah pengerja dan rata-rata skor, serta tabel persentase benar per nomor soal dengan penanda warna merah pada soal yang persentase benarnya sangat rendah.

#### Langkah 3.3: Integrasi Akhir dan Pemeriksaan Lintas Aplikasi
1. Daftarkan modul `admin` ke `src/index.ts`. Pastikan tetap tidak ada satu pun tautan menuju `/admin` pada halaman siswa atau halaman umum mana pun.
2. Lakukan pencarian teks menyeluruh di `src/` dan `public/` untuk memastikan nol karakter em dash, nol sebutan "Tryout Akbar", nol CDN eksternal, nol warna hijau/merah pada opsi pengerjaan siswa, dan nol ikon `check_circle` pada penanda pilihan siswa.
3. Jalankan `typecheck`, `build:css`, dan laksanakan seluruh **Checklist Uji Milestone 3 (Bagian 9.3)** sebelum membuat PR 3.

---

## 9. Checklist Uji Manual per Milestone di Tiga Ukuran Layar

Setiap PR wajib diuji manual menggunakan DevTools browser pada tiga ukuran viewport berikut:
- **HP Murah**: `360px x 800px` (target utama siswa)
- **Tablet**: `768px x 1024px` (portrait) dan `1024px x 768px` (landscape)
- **Laptop**: `1366px x 768px`

---

### 9.1 Checklist Uji Milestone 1 (`feat/issue-01a-fondasi` - PR 1)
- [ ] **Build & Typecheck**: Perintah `bun run typecheck` dan `bun run build:css` selesai tanpa error.
- [ ] **Kemandirian Aset Offline (HP 360px / Tablet / Laptop)**: Saat DevTools disetel ke mode Offline (atau dicek di tab Network), halaman tetap memuat latar kertas kotak-kotak 26px (`#FFFDF4` & `#D9E6F2`), font lokal `Baloo 2` + `Nunito`, font `KaTeX`, dan SVG maskot tanpa satu pun request ke domain eksternal/CDN.
- [ ] **Katalog Komponen `/dev/komponen` (HP 360px / Tablet / Laptop)**:
  - Menampilkan seluruh 15 komponen dasar (`Button`, `Card`, `Badge`, `Input`, `Select`, `Checkbox`, `Toggle`, `Table`, `Modal`, `BottomSheet`, `Navbar`, `AdminSidebar`, `QuestionCard`, `ExplanationCard`, `Timer`) beserta semua variannya secara konsisten dengan border `2px solid #1B3A5C` dan bayangan offset solid tanpa blur.
  - Seluruh tombol, input, dan kartu opsi siswa memiliki tinggi area tap minimal `48px` dan teks isi minimal `16px`.
  - Ketiga bentuk `QuestionCard` (`single`, `multiple`, `category`) saat dipilih **HANYA memakai warna kuning stabilo dan navy** (bebas warna hijau dan merah yang khusus untuk halaman hasil), tidak memakai ikon `check_circle` atau centang dalam lingkaran, dan checkbox `multiple` menampilkan centang standar navy di dalam kotak kuning stabilo.
  - Sampel rumus pecahan/eksponen panjang di `QuestionCard` dan `ExplanationCard` ter-render rapi dari server (`html: false`, tag `<script>` mentah ditolak/di-escape) dan dapat di-scroll di dalam kotaknya sendiri tanpa membuat layar 360px bergeser ke samping.
  - `Modal` konfirmasi, `BottomSheet` nomor soal (di viewport HP/tablet), dan perubahan warna `Timer` ke merah (`wrong`) saat `<= 5` menit berfungsi baik.
- [ ] **Proteksi Environment `/dev/komponen`**: Saat server dijalankan dengan `NODE_ENV=production`, membuka `/dev/komponen` mengembalikan HTTP status `404` dengan tampilan halaman 404 (katalog tidak bocor di production).
- [ ] **Halaman 404 Umum (HP 360px / Tablet / Laptop)**: Membuka alamat sembarang (contoh `/alamat-ngawur`) mengembalikan HTTP status `404`, menampilkan halaman Buku Tulis dengan maskot lokal `/img/mascot-404.svg`, sapaan santai "kamu" tanpa em dash, dan tombol kembali ke `/`.

---

### 9.2 Checklist Uji Milestone 2 (`feat/issue-01b-halaman-siswa` - PR 2)
- [ ] **Aturan URL (Poin 26 `01-aturan-domain.md`)**:
  - Halaman umum memakai `/`, `/daftar`, `/masuk`, dan `/keluar` **tanpa awalan jenjang** (membuka `/smp/daftar` atau `/sd/masuk` jatuh ke 404).
  - Seluruh halaman konten memakai awalan `/sd/...` atau `/smp/...` (membuka jenjang tidak valid seperti `/sma` jatuh ke 404).
  - Tidak ada satu pun link menuju `/admin`, tidak ada sebutan "Tryout Akbar", tidak ada karakter em dash, dan tidak ada `<iframe>` embed YouTube di seluruh halaman siswa.
- [ ] **1. Beranda (`/`)**:
  - **HP 360px**: Konten terpusat rapi (`max-w-mobile`), maskot lokal muncul, judul beraksen stabilo, kedua kartu `SD Kelas 6` (`/sd`) dan `SMP Kelas 9` (`/smp`) aktif dan dapat diklik, tombol Masuk/Daftar mengarah ke `/masuk` dan `/daftar`, tombol YouTube membuka tab baru.
  - **Tablet & Laptop**: Lebar `max-w-beranda` (1200px), hero tampil 2 kolom proporsional, kartu jenjang 2 kolom, bagian "Kenapa di Sini?" tampil 3 kolom.
- [ ] **2. Halaman Jenjang (`/sd` dan `/smp`)**:
  - **HP 360px**: Tampil sebagai satu halaman utuh (bukan 2 mockup berdampingan) tanpa scroll samping. Mode Tamu menampilkan tombol `/masuk`, catatan "Perlu daftar dulu" pada TO, badge "Tanpa daftar" pada latihan, dan kartu garis putus-putus ajakan `/daftar` di bawah. Mode Demo Login menampilkan sapaan siswa dummy dengan maskot, tombol `/keluar`, status TO, serta badge "Selesai" + skor pada materi yang sudah dikerjakan.
  - **Tablet & Laptop**: Kolom tengah `max-w-desktop` (760px) rata tengah dengan spasi kartu daftar tugas yang rapi; pengalih mode demo non-production bekerja bergantian antara Tamu dan Login.
- [ ] **3. Halaman Materi (`/:level/materi/:topicSlug`)**:
  - **HP 360px / Tablet / Laptop**: Menampilkan breadcrumb, badge elemen, judul, deskripsi, tombol "Tonton Materi di YouTube" yang membuka tab baru (`target="_blank" rel="noopener noreferrer"`), daftar paket latihan materi tersebut dengan tombol "Mulai Latihan", serta ajakan "Coba TO Gratis" di bawah tanpa teks "Tryout Akbar".
- [ ] **4. Pengerjaan Latihan (`/:level/latihan/:quizSlug`)**:
  - **HP 360px / Tablet / Laptop**: Ketiga bentuk soal (`single`, `multiple`, `category`) bisa dipilih dan diubah jawabannya dengan penanda pilihan **hanya memakai warna kuning stabilo dan navy** (bebas warna hijau/merah dan bebas ikon `check_circle`; checkbox `multiple` memakai centang standar navy di dalam kotak kuning); rumus panjang tidak membuat halaman geser ke samping; penghitung soal terjawab bertambah akurat; klik "Kumpulkan Jawaban" saat masih ada soal kosong memunculkan modal konfirmasi berisi nomor soal kosong.
  - **Cek View Source & Network**: Di HTML, atribut `data-*`, maupun file JS sama sekali **tidak ditemukan** kunci jawaban, teks pembahasan, maupun ID/URL video pembahasan.
- [ ] **5. Hasil Latihan (`/:level/latihan/:quizSlug/hasil`)**:
  - **HP 360px / Tablet / Laptop**: Menampilkan skor dummy, maskot selebrasi lokal, contoh badge Benar (hijau), Salah (merah), dan Kosong (abu-abu), jawaban siswa vs kunci, pembahasan berumus KaTeX rapi, tombol Shorts & Video Panjang yang hanya muncul pada soal yang datanya terisi (membuka tab baru), serta tombol "Ulangi Latihan" dan "Coba TO Gratis".
- [ ] **6. Lobi TO (`/:level/tryout/:quizSlug`) dan Pengerjaan TO (`/:level/tryout/:quizSlug/kerjakan`)**:
  - **HP 360px & Tablet Portrait**: Lobi menampilkan jumlah soal, durasi, 1x kesempatan, dan aturan. Saat mulai TO: tampil satu soal per layar (penanda pilihan hanya kuning stabilo dan navy tanpa `check_circle`), tombol Sebelumnya/Berikutnya bekerja, timer hitung mundur selalu terlihat di atas dan berubah merah (`wrong`) saat sisa `<= 5` menit, serta klik "Daftar Soal" membuka **Bottom Sheet** nomor soal dari bawah layar.
  - **Tablet Landscape & Laptop**: Pengerjaan TO otomatis beralih ke layout ujian komputer 2 kolom (soal aktif di kolom kiri, panel Daftar Nomor Soal & tombol Selesai sticky di kolom kanan tanpa bottom sheet dan tanpa tab "Buku Rumus").
  - **Cek View Source & Network**: Sama sekali **tidak ditemukan** kunci jawaban, pembahasan, maupun link video pembahasan di HTML/JS halaman Pengerjaan TO.
- [ ] **7. Hasil TO (`/:level/tryout/:quizSlug/hasil`)**:
  - **HP 360px / Tablet / Laptop**: Menampilkan skor dummy, jumlah benar, durasi pengerjaan, daftar pembahasan per soal dengan tombol video kondisional, tombol kembali ke halaman jenjang, dan **dipastikan tidak ada tombol Ulangi**.
- [ ] **8. Daftar (`/daftar`), Masuk (`/masuk`), dan Keluar (`/keluar`)**:
  - **HP 360px**: Form `/daftar` memiliki Nama Panggilan, Username, Password (tombol mata berfungsi), dan centang wajib persetujuan orang tua/wali; Form `/masuk` memiliki Username, Password, dan kartu bantuan WhatsApp admin; pesan error muncul jelas dengan warna `wrong`; akses `/keluar` mengarahkan kembali ke `/`.
  - **Tablet & Laptop**: Kartu bergaya binder buku tulis tampil rapi di `max-w-desktop` (760px) dengan navigasi tab Daftar (`/daftar`) / Masuk (`/masuk`).

---

### 9.3 Checklist Uji Milestone 3 (`feat/issue-01c-halaman-admin` - PR 3)
- [ ] **Verifikasi Catatan Keamanan**: Tidak ada link ke `/admin` dari halaman siswa mana pun, dan dokumentasi/PR mencantumkan peringatan jelas bahwa route `/admin` belum dilindungi login sehingga aplikasi dilarang di-deploy ke publik sebelum ISSUE-02.
- [ ] **1. Bank Soal (`/admin/soal`)**:
  - **Laptop (`1366px`)**: Sidebar 8 menu di kiri dan konten `max-w-admin` (1100px) tampil rapi sesuai desain Stitch `a1-daftar-soal.html`; filter jenjang, elemen, materi, status (Terbit/Draft/Arsip), dan pencarian teks tampil lengkap; klik aksi Preview membuka modal berisi tampilan soal versi siswa.
  - **Tablet & HP**: Tabel dibungkus scroll horizontal aman di dalam kotaknya sendiri tanpa merusak tata letak halaman, dan sidebar dapat diakses/ditutup rapi.
- [ ] **2. Form Soal (`/admin/soal/tambah`, `/admin/soal/:id/edit`) dan Endpoint `POST /admin/soal/preview`**:
  - **Laptop (`1366px`)**: Kolom form kiri dan panel Live Preview kanan tampil berdampingan sesuai `a2-form-soal.html`. Mengganti Bentuk Soal hanya menampilkan blok editor opsi yang sesuai (`single`, `multiple`, atau `category`). Materi Pokok menyediakan opsi "Tanpa materi (khusus TO)".
  - **Uji Live Preview Server**: Saat admin mengetik teks berisi Markdown + LaTeX (contoh `$\frac{a^3 b^2}{ab}$` atau `\[x^2 + 2x + 1 = 0\]`) maupun link YouTube, browser meminta hasil render ke `POST /admin/soal/preview` (bukan merender di browser), HTML mentah seperti `<script>` tidak dieksekusi, serta tab "Saat Mengerjakan" (penanda pilihan hanya kuning stabilo dan navy, bebas warna hijau/merah, bebas `check_circle`, tanpa kunci/pembahasan) dan "Setelah Dikumpulkan" (dengan pembahasan & tombol video kondisional) tampil identik dengan halaman siswa.
  - **Aturan Terbit**: Tombol "Terbitkan" terkunci (`disabled`) saat halaman dibuka dan baru aktif setelah admin membuka preview tampilan siswa.
  - **Tablet & HP**: Kolom editor dan kolom preview turun bertumpuk rapi secara vertikal tanpa elemen terpotong.
- [ ] **3. Kelola Latihan (`/admin/latihan`) dan Kelola TO (`/admin/tryout`)**:
  - **Laptop (`1366px`) & Tablet**: Layout 2 kolom tampil sesuai `a3-kelola-latihan.html`. Di Kelola Latihan, penghitung soal mengunci tombol Terbitkan jika soal dipilih `< 5` atau `> 10`, dan tombol geser urutan bekerja. Di Kelola TO, tersedia input durasi menit, pemilihan soal lintas materi termasuk soal tanpa materi, serta penguncian tombol Terbitkan jika soal dipilih `< 10` atau `> 15`.
- [ ] **4. Halaman Admin Pelengkap (`/admin/masuk`, `/admin`, `/admin/elemen`, `/admin/materi`, `/admin/siswa`, `/admin/laporan`)**:
  - **Laptop (`1366px`) & Tablet**: Seluruh 6 halaman pelengkap tampil seragam memakai komponen Buku Tulis; `/admin/elemen` menampilkan daftar elemen per jenjang & urutan; `/admin/materi` mendukung input link video YouTube materi; `/admin/siswa` memiliki pencarian username dan modal konfirmasi Reset Password; `/admin/laporan` menampilkan jumlah pengerja, rata-rata skor, dan persentase benar per nomor soal; serta bebas karakter em dash di seluruh halaman.
