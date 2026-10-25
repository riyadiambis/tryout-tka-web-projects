# Token Desain: Stitch vs Aturan Buku Tulis

Dokumen ini memetakan seluruh token desain yang digunakan pada file export Google Stitch (`DESIGN.md` dan inline Tailwind config) dan membandingkannya secara langsung dengan aturan visual di `.agents/rules/02-ui-buku-tulis.md`. Dokumen ini menjadi acuan utama saat menyusun tema Tailwind CSS di `src/styles/` pada tahapan **ISSUE-01**.

---

## Tabel Perbandingan Token Desain

| Kategori | Token | Nilai di Aturan (`02-ui-buku-tulis.md`) | Nilai di Stitch (`DESIGN.md` / HTML) | Status | Rekomendasi untuk ISSUE-01 |
|---|---|---|---|---|---|
| **Warna** | Latar Kertas (Paper) | `#FFFDF4` | `#fbf9f0` (M3) / `#FFFDF4` (CSS `.bg-notebook`) | Sama | Gunakan `#FFFDF4` sebagai CSS variable `--paper` dan warna latar utama. |
| **Warna** | Garis Grid (Grid) | `#D9E6F2` | `#d9e6f2` (linear-gradient 26px) | Sama | Gunakan `#D9E6F2` ukuran 26px x 26px pada pola kotak-kotak. |
| **Warna** | Tinta Utama (Ink) | `#1B3A5C` | `#1b3a5c` | Sama | Gunakan `#1B3A5C` untuk seluruh border, teks utama, dan bayangan offset. |
| **Warna** | Tinta Lembut (Ink-Soft) | `#5B7793` | `#5B7793` / `#436084` | Beda sedikit | Gunakan `#5B7793` untuk label section, teks sekunder, dan status non-aktif. |
| **Warna** | Kartu (Card) | `#FFFFFF` | `#ffffff` (`surface-container-lowest`) | Sama | Gunakan `#FFFFFF` untuk latar kartu soal dan modal. |
| **Warna** | Bayangan Offset (Line) | `#C8D8E8` | `#1B3A5C` (navy solid) | Beda | Aturan menyebut `#C8D8E8`, namun Stitch konsisten memakai bayangan navy `#1B3A5C` yang memberikan kontras neobrutalisme lebih tegas. Gunakan bayangan `#1B3A5C` sebagai default tombol dan kartu, dengan `#C8D8E8` untuk bayangan halus sekunder. |
| **Warna** | Stabilo / Tombol Utama | `#FFD84D` | `#ffd84d` (`primary-container`) | Sama | Gunakan `#FFD84D` untuk tombol aksi utama dan aksen teks stabilo. |
| **Warna** | Evaluasi Benar (Correct) | Teks `#1F9254`, latar `#E4F6EA` | Teks `#1F9254`, latar `#E4F6EA` | Sama | Gunakan kombinasi teks `#1F9254` dan latar `#E4F6EA` untuk badge jawaban benar. |
| **Warna** | Evaluasi Salah (Wrong) | Teks `#D9482F`, latar `#FCEAE6` | Teks `#D9482F`, latar `#FCEAE6` | Sama | Gunakan kombinasi teks `#D9482F` dan latar `#FCEAE6` untuk badge jawaban salah. |
| **Warna** | Badge Oranye (SD) | `#E8734A` | `#e8734a` | Sama | Digunakan untuk aksen SD Kelas 6. |
| **Warna** | Badge Biru (SMP) | `#4A9BE8` | `#4a9be8` | Sama | Digunakan untuk aksen SMP Kelas 9. |
| **Warna** | Badge Ungu (Geometri) | `#8B5FBF` | `#8b5fbf` | Sama | Digunakan untuk kategori Geometri dan Logika. |
| **Warna** | Badge Hijau (Aljabar) | `#2FA88B` | `#2fa88b` | Sama | Digunakan untuk target belajar dan topik Bilangan. |
| **Tipografi** | Font Judul / Skor | Baloo 2 (bobot 600-800) | Rubik (bobot 500-800) *(kecuali `hp/02` pakai Baloo 2)* | Beda | **Wajib gunakan Baloo 2**. Host file font lokal WOFF2 di `public/fonts/`. |
| **Tipografi** | Font Teks & UI | Nunito (bobot 400-700) | Nunito Sans (bobot 400-800) *(kecuali `hp/02` pakai Nunito)* | Beda | **Wajib gunakan Nunito**. Host file font lokal WOFF2 di `public/fonts/`. |
| **Tipografi** | Label Section | Kapital, letter-spacing 1.2px, 13px, warna ink-soft | 13px, letter-spacing 0.08em, uppercase, bold | Sama | Format: `text-[13px] tracking-[1.2px] uppercase font-bold text-[#5B7793]`. |
| **Tipografi** | Ukuran Teks Isi | Minimal 16px | 16px (`text-body-md`, line-height 24px) | Sama | Teks paragraf, stem soal, dan opsi jawaban minimal 16px. |
| **Bentuk** | Border | 2px solid #1B3A5C | 2px solid #1B3A5C | Sama | Seluruh kartu dan tombol interaktif menggunakan border 2px solid navy. |
| **Bentuk** | Corner Radius Kartu | 14-16px | 16px (`rounded-2xl`) | Sama | Gunakan `rounded-2xl` (16px) untuk kartu soal dan tombol besar. |
| **Bentuk** | Corner Radius Badge | 8-12px | 8px (`rounded-lg`) / 12px (`rounded-xl`) | Sama | Gunakan `rounded-lg` (8px) untuk chip label dan badge kecil. |
| **Elevasi** | Bayangan Kartu & Tombol | Offset solid tanpa blur (3-5px 3-5px 0) | Offset solid: `3px 3px 0 #1B3A5C` / `4px 4px 0 #1B3A5C` | Sama | Tidak ada blur (offset solid). Efek fisik kertas neobrutal. |
| **Elevasi** | Interaksi Tekan (Active) | Bergeser ke arah bayangan, bayangan mengecil | `transform: translate(2px, 2px)` dan shadow berkurang | Sama | Implementasikan via utility class Tailwind `active:translate-x-0.5 active:translate-y-0.5`. |
| **Visual** | Aksen Stabilo Judul | Gradien kuning di belakang kata kunci judul | Gradien atau elemen `<mark>` dengan rotasi -1deg | Sama | Buat utility `.highlighter` dengan warna `#FFD84D`. |
| **Ukuran** | Lebar HP (Mobile) | Maksimal 460px, rata tengah | `max-w-[460px] mx-auto` | Sama | Dipatuhi di semua tampilan HP siswa. |
| **Ukuran** | Lebar Desktop (Tengah) | 760px | `max-w-[760px] mx-auto` | Sama | Dipatuhi di materi, pengerjaan latihan, hasil, dan auth. |
| **Ukuran** | Lebar Beranda Desktop | 1200px | `max-w-[1200px] mx-auto` | Sama | Dipatuhi di `desktop/01-beranda.html`. |
| **Ukuran** | Lebar Panel Admin | 1100px | `max-w-[1100px] mx-auto` | Sama | Dipatuhi di `admin/a1`, `admin/a2`, dan `admin/a3`. |
| **Ukuran** | Area Tap / Tombol | Minimal 48px | Sebagian `h-11` (44px), sebagian `py-3.5` (48-52px) | Beda sedikit | Pada implementasi, ubah semua tombol yang `h-11` menjadi `min-h-[48px]`. |

---

## Usulan Konfigurasi Tailwind untuk ISSUE-01

Berikut draf konfigurasi Tailwind CSS (`tailwind.config.js`) yang mengintegrasikan token Buku Tulis asli dengan temuan Stitch:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#FFFDF4',
        grid: '#D9E6F2',
        ink: {
          DEFAULT: '#1B3A5C',
          soft: '#5B7793',
        },
        card: '#FFFFFF',
        line: '#C8D8E8',
        stabilo: '#FFD84D',
        correct: {
          DEFAULT: '#1F9254',
          bg: '#E4F6EA',
        },
        wrong: {
          DEFAULT: '#D9482F',
          bg: '#FCEAE6',
        },
        badge: {
          orange: '#E8734A',
          blue: '#4A9BE8',
          purple: '#8B5FBF',
          green: '#2FA88B',
        },
      },
      fontFamily: {
        title: ['"Baloo 2"', 'cursive', 'sans-serif'],
        body: ['Nunito', 'sans-serif'],
      },
      boxShadow: {
        'solid-sm': '2px 2px 0px #1B3A5C',
        'solid': '4px 4px 0px #1B3A5C',
        'solid-lg': '6px 6px 0px #1B3A5C',
      },
      borderRadius: {
        'card': '16px',
        'badge': '8px',
      },
      maxWidth: {
        mobile: '460px',
        desktop: '760px',
        beranda: '1200px',
        admin: '1100px',
      },
    },
  },
  plugins: [],
};
```
