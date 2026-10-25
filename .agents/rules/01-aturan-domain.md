---
trigger: always_on
---

# Aturan Domain (TIDAK BOLEH disederhanakan)

## Keamanan soal
1. Kunci jawaban dan pembahasan TIDAK BOLEH sampai ke browser sebelum attempt disubmit. Termasuk di HTML, atribut data-*, JSON, komentar HTML, maupun JavaScript.
2. Penilaian 100% di server.
3. Soal berstatus draft atau archived tidak pernah tampil ke siswa.
4. Halaman dan endpoint admin hanya untuk role admin, dicek di server pada setiap request.
5. Seed dan fixture HANYA berisi soal dummy. Soal asli masuk lewat halaman admin dan tidak pernah di-commit.
6. Password di-hash (Bun.password). Sesi pakai cookie httpOnly. Percobaan login dibatasi.

## Tryout
7. Waktu dihitung server: deadline = started_at + durasi. Timer di browser hanya tampilan.
8. Jawaban disimpan ke server setiap kali siswa memilih (autosave). Attempt bisa dilanjutkan selama belum lewat deadline.
9. Jawaban yang masuk setelah deadline + 30 detik ditolak.
10. Waktu habis = server menilai otomatis memakai jawaban yang sudah tersimpan.
11. Satu siswa maksimal satu attempt per TO.
12. Latihan boleh dikerjakan tanpa login (attempt tamu pakai token di cookie). TO wajib login.

## Penilaian
13. single (PG sederhana): benar jika opsi yang dipilih sama dengan kunci.
14. multiple (PG kompleks MCMA): benar HANYA jika himpunan opsi yang dipilih SAMA PERSIS dengan himpunan kunci. Tidak ada nilai sebagian.
15. category (PG kompleks kategori): benar HANYA jika SEMUA pernyataan dijawab tepat. Tidak ada nilai sebagian.
16. Skor = jumlah benar / jumlah soal x 100.
17. Hasil benar/salah tiap jawaban disimpan saat dinilai dan tidak dihitung ulang diam-diam.
18. Soal yang sudah pernah dikerjakan siswa tidak boleh dihapus permanen, hanya diarsipkan.

## Konten
19. Format konten (soal, opsi, pembahasan): Markdown + LaTeX. Rumus inline $...$, rumus blok $$...$$. Penulisan \(...\) dan \[...\] juga harus diterima.
20. Link YouTube format apa pun (youtu.be, watch?v=, shorts/, embed/) diubah jadi ID video saja. Link tidak valid ditolak. Menit konsep disimpan dalam detik. Saat ditampilkan, link dibangun ulang dari ID: Shorts jadi https://youtube.com/shorts/ID, video panjang jadi https://youtu.be/ID?t=DETIK.
21. Video TIDAK di-embed di web. Semua video dibuka lewat tombol yang mengarah ke YouTube di tab baru (target="_blank" rel="noopener"). Di HP, link ini biasanya terbuka di aplikasi YouTube.
22. Semua field video opsional dan tombolnya hanya muncul kalau link terisi. Pembahasan tertulis (Markdown + LaTeX) WAJIB ada di setiap soal. Link video pembahasan dianggap bagian dari pembahasan, jadi tidak boleh sampai ke browser sebelum attempt disubmit.
23. Soal hanya bisa diterbitkan setelah admin membuka preview tampilan siswa.

## Jenjang
24. Semua materi, soal, dan paket punya jenjang: sd atau smp.
25. Elemen kisi-kisi disimpan sebagai data per jenjang, BUKAN enum yang di-hardcode.
26. URL halaman konten berawalan jenjang: /sd/... dan /smp/... (halaman jenjang, materi, latihan, TO, dan hasil). Halaman umum TANPA awalan jenjang: / (beranda), /daftar, /masuk, /keluar, dan halaman 404. Halaman admin berawalan /admin.

## Disiapkan, belum dipakai
27. Kolom access (free/premium) di paket dan kolom source (manual/ai) di soal sudah ada di database, tapi belum ada fiturnya. Semua paket MVP = free, semua soal = manual.

## Glosarium kode
| Istilah | Nama di kode |
|---|---|
| jenjang | level (sd, smp) |
| elemen kisi-kisi | element |
| materi | topic |
| soal | question |
| bentuk soal | question_type (single, multiple, category) |
| opsi | option |
| kunci | answer_key |
| pembahasan | explanation |
| paket latihan / TO | quiz (type: practice, tryout) |
| percobaan | attempt |
| jawaban siswa | response |