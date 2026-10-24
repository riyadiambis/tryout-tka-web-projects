# PRD MVP: Web Tryout TKA SD & SMP

Versi 0.2 | 25 Oktober 2026 | Pemilik: Rahmat Riyadi
Nama produk: Yuk Ngeles

## 1. Ringkasan
Web latihan dan tryout TKA Matematika. Channel YouTube Riyadi Ofisharu jadi etalase, web jadi kasir. Satu sistem untuk dua jenjang (SD dan SMP). MVP fokus konten SMP. Pintu SD sudah disiapkan di sistem, kontennya menyusul.

## 2. Tujuan MVP
MVP bukan untuk jualan, tapi untuk membuktikan:
1. Penonton YouTube mau klik link dan mengerjakan soal di web.
2. Pembahasan tertulis + klip Shorts per soal dianggap berguna (nilai lebih dibanding simulasi resmi Pusmendik).
3. Siswa yang selesai latihan mau daftar dan mengerjakan TO.
Kalau terbukti, baru masuk pembayaran dan premium.

## 3. Pengguna
- Siswa (utama): SMP kelas 9 dulu, SD kelas 6 menyusul. Akses dari HP, datang dari link YouTube.
- Orang tua: belum ada fitur khusus di MVP.
- Admin (pemilik): input konten, terbitkan latihan dan TO.

## 4. Alur utama siswa
Video YouTube > halaman materi > (opsional) tonton video materi > kerjakan 5 soal latihan tanpa login > submit > skor + pembahasan + Shorts per soal > ajakan "Coba TO Gratis" > daftar/masuk > kerjakan TO > skor + pembahasan.

## 5. Fitur siswa
F1 Akun: daftar dengan nama panggilan, username, password, centang "orang tua/wali sudah tahu". Tanpa email dan no HP. Lupa password: hubungi admin.
F2 Beranda: pilih jenjang SD atau SMP. SD bertanda "segera hadir" selama belum ada konten.
F3 Dashboard: tampilan ala daftar tugas Classroom. Materi, latihan, dan TO tersusun per elemen, dengan status belum/selesai + skor terakhir.
F4 Halaman materi: judul, deskripsi singkat, tombol "Tonton Materi di YouTube", tombol "Mulai Latihan".
F5 Latihan 5 soal: semua soal di satu halaman, opsi berupa kartu besar, konfirmasi kalau ada soal kosong saat submit, boleh diulang.
F6 Hasil latihan: skor; per soal badge Benar/Salah, jawaban siswa, kunci, dan pembahasan tertulis (selalu ada); tombol "Lihat Pembahasan Video" ke Shorts (muncul kalau tersedia); tombol "Tonton Penjelasan Lengkap" ke menit konsep video panjang (muncul kalau tersedia); tombol "Ulangi" dan "Coba TO Gratis".
F7 TO 10-15 soal: lobi (jumlah soal, durasi, aturan), satu soal per layar, panel nomor soal, timer, autosave, bisa lanjut setelah refresh, auto-submit saat waktu habis.
F8 Hasil TO: skor, jumlah benar, lama pengerjaan, pembahasan per soal dengan tombol video yang sama seperti hasil latihan.

## 6. Fitur admin
A1 Login admin (role admin).
A2 Kelola elemen kisi-kisi per jenjang.
A3 Kelola materi: jenjang, elemen, judul, link video materi.
A4 Kelola soal: jenjang, elemen, materi, bentuk soal, teks (Markdown + LaTeX), gambar opsional, opsi, kunci, pembahasan, link Shorts, link video panjang + menit:detik, status draft/terbit/arsip. Editor teks dengan preview langsung di sebelahnya.
A5 Preview tampilan siswa, wajib dibuka sebelum soal bisa diterbitkan.
A6 Kelola latihan: pilih materi, pilih tepat 5 soal terbit, atur urutan, terbitkan.
A7 Kelola TO: judul, jenjang, durasi, pilih 10-15 soal terbit, atur urutan, terbitkan.
A8 Kelola siswa: daftar, cari username, reset password.
A9 Laporan per paket: jumlah pengerja, rata-rata skor, persentase benar per soal (untuk mendeteksi kunci salah input dan bahan ide video).

## 7. Aturan domain
Lengkap di .agents/rules/01-aturan-domain.md dan WAJIB diikuti.

## 8. Gambaran data
- users: display_name, username, password_hash, role, source (asal link), created_at
- elements: level, name, order
- topics: level, element, title, slug, video_id
- questions: level, element, topic, question_type, body, image, options, answer_key, explanation, shorts_id, long_video_id, long_video_seconds, status, source
- quizzes: level, type (practice/tryout), title, topic, duration_minutes, status, access
- quiz_questions: quiz, question, order
- attempts: user (boleh kosong untuk tamu), guest_token, quiz, started_at, deadline_at, submitted_at, score
- responses: attempt, question, answer, is_correct

## 9. Daftar halaman
Siswa: Beranda, Daftar, Masuk, Dashboard, Materi, Pengerjaan Latihan, Hasil Latihan, Lobi TO, Pengerjaan TO, Hasil TO.
Admin: Dashboard, Elemen, Materi, Daftar Soal, Form Soal + Preview, Kelola Latihan, Kelola TO, Kelola Siswa, Laporan.

## 10. Kebutuhan non-fungsional
- UX dan tampilan: lihat .agents/rules/02-ui-buku-tulis.md.
- Performa: halaman ringan di HP murah, tidak ada video yang di-embed, rumus dirender di server.
- Keamanan: lihat aturan domain bagian Keamanan soal.

## 11. Hosting
- Development dan MVP: home server (mimi), container khusus project ini sekitar 2 GB RAM, Docker Compose (app + MySQL), Cloudflare Tunnel.
- Backup database otomatis harian ke luar server.
- Sebelum TO Akbar: WAJIB uji beban. Kalau hasilnya mepet, pindah ke VPS (gampang karena sudah Docker Compose).

## 12. Di luar scope MVP
Pembayaran, premium, ranking, TO Akbar, AI generate soal di dalam web, analisis topik lemah, soal grup (satu stimulus banyak soal), konten SD, materi SMP selain Bilangan, verifikasi email, fitur orang tua, fitur kelas untuk guru.

## 13. Metrik sukses
Dari database: jumlah attempt latihan, jumlah akun baru, jumlah TO selesai, dan asal pengguna dari parameter link (contoh ?src=yt-bilangan-1). Target angka ditentukan pemilik.

## 14. Keputusan default (bisa diubah sebelum ISSUE terkait dikerjakan)
1. Bentuk soal: dukung single, multiple, category. Nilai semua-atau-nol. Soal grup ditunda.
2. Latihan boleh tanpa login, TO wajib login.
3. Pembahasan TO tampil setelah submit.
4. TO hanya 1 kali per akun.
5. Login username + password, reset lewat admin.
6. Frontend server-render (Elysia JSX + Tailwind + JS ringan).
7. Laporan admin (A9) dipakai.
8. "Mirip Classroom" = susunan tampilan ala daftar tugas, BUKAN fitur kelas untuk guru.

## 15. Rencana ISSUE
- ISSUE-01 Fondasi: setup proyek, Docker Compose, skema database lengkap, layout dasar Buku Tulis, render Markdown + LaTeX.
- ISSUE-02 Akun: daftar, masuk, keluar, role admin, sesi, pembatasan login.
- ISSUE-03 Admin konten: elemen, materi, soal + preview, draft/terbit/arsip, kelola siswa.
- ISSUE-04 Latihan: halaman materi, pengerjaan, penilaian server, hasil + pembahasan + video.
- ISSUE-05 TO: lobi, pengerjaan, timer server, autosave, auto-submit, hasil, kelola TO, laporan.
- ISSUE-06 Deploy: container di mimi, Cloudflare Tunnel, backup harian.