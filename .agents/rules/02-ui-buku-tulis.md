---
trigger: always_on
---

# Gaya UI: Buku Tulis

## Token warna (jadikan CSS variable dan tema Tailwind)
- paper #FFFDF4 (latar), grid #D9E6F2 (garis kotak)
- ink #1B3A5C (garis dan teks utama), ink-soft #5B7793
- card #FFFFFF, line #C8D8E8 (warna bayangan offset)
- stabilo #FFD84D (aksen dan tombol utama)
- correct #1F9254 (latar #E4F6EA), wrong #D9482F (latar #FCEAE6)
- badge: oranye #E8734A, biru #4A9BE8, ungu #8B5FBF, hijau #2FA88B

## Tipografi
- Judul, angka, skor: Baloo 2 (600-800)
- Teks dan UI: Nunito (400-700)
- Label section: huruf kapital, letter-spacing 1.2px, 13px, warna ink-soft
- Font di-host sendiri di public/fonts, jangan bergantung CDN

## Aturan visual
- Latar: dua repeating-linear-gradient bersilangan ukuran 26px, meniru kertas kotak-kotak
- Kartu dan tombol: border 2px solid ink, radius 14-16px
- Bayangan: offset solid TANPA blur (3-5px 3-5px 0)
- Saat ditekan: elemen bergeser ke arah bayangan dan bayangannya mengecil
- Aksen stabilo: linear-gradient(transparent 58%, stabilo 58%) di belakang satu kata kunci judul
- Badge ikon: kotak 46px, radius 12px, warna solid, ikon/teks putih tebal

## Ukuran dan perangkat
- Mobile-first, target HP Android murah dengan layar 360px
- Halaman siswa: lebar konten maksimal 460px, rata tengah
- Halaman admin: untuk laptop, lebar maksimal 1100px (form dan preview berdampingan)
- Tinggi tombol dan area tap minimal 48px, teks isi minimal 16px
- Opsi jawaban berupa kartu selebar konten, seluruh kartu bisa di-tap
- Rumus panjang tidak boleh membuat halaman bisa digeser ke samping. Rumusnya di-scroll di dalam kotaknya sendiri

## Status
- Benar: badge warna correct. Salah: badge warna wrong. Kosong: badge abu-abu
- Timer TO selalu terlihat di bagian atas, berubah ke warna wrong saat sisa 5 menit