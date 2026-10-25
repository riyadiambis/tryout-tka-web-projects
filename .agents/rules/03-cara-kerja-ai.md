# Cara Kerja Agent (WAJIB di setiap tugas)

## Sebelum ngoding
- Baca ISSUE aktif, docs/PRD.md, dan desain terkait di docs/stitch/ (file HTML dan PNG-nya).

## Saat ngoding
- Kerjakan satu langkah kecil, jalankan aplikasi, cek hasilnya, baru lanjut.
- Commit kecil per langkah.

## Verifikasi tampilan (setiap halaman yang dibuat atau diubah)
- Buka halaman di browser pada lebar 360px, 820px, 1280px, 1440px, dan 1920px.
- Bandingkan dengan PNG desain di docs/stitch/. Perbaiki selisih yang terlihat: jarak, ukuran font, border, bayangan, warna, dan posisi elemen.
- Pastikan tidak ada scroll ke samping di lebar 360px.
- Pastikan tidak ada em dash di teks yang terlihat pengguna.
- Klaim tampilan "rapi" atau "mirip Stitch" WAJIB disertai tabel ukur (font, jarak, overlap) dan screenshot. Laporan tanpa bukti dianggap belum selesai.

## Verifikasi fungsi
- Setiap helper di src/lib/ punya test dengan bun test, dan semua test harus lulus.
- Klik semua tombol dan link di halaman yang dikerjakan, pastikan tujuannya benar.

## Verifikasi keamanan
- Buka View Source halaman pengerjaan latihan dan TO: tidak boleh ada kunci jawaban, pembahasan, atau link video pembahasan dalam bentuk apa pun.

## Laporan
- Setiap selesai milestone, tulis: apa yang dikerjakan, hasil verifikasi tampilan (dengan tabel ukur dan screenshot), fungsi, dan keamanan, serta apa yang belum selesai. Laporan tanpa bukti dianggap belum selesai.
