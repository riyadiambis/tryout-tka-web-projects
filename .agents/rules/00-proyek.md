---
trigger: always_on
---

# Aturan Proyek: Web Tryout TKA SD & SMP

## Konteks
Web latihan dan tryout (TO) TKA Matematika untuk siswa SD kelas 6 dan SMP kelas 9. Pemilik: Rahmat Riyadi. Detail produk ada di docs/PRD.md. Rencana tiap tahap ada di docs/issues/. Baca keduanya sebelum mengerjakan apa pun.

## Stack (WAJIB, jangan diganti)
- Runtime Bun, framework ElysiaJS, ORM Drizzle, database MySQL.
- Halaman dirender di server pakai JSX (@elysiajs/html). Styling Tailwind CSS, dibuild pakai Tailwind CLI dari src/styles ke public/css.
- JavaScript di browser seminimal mungkin (vanilla), hanya untuk timer, autosave jawaban, dan interaksi kecil.
- Konten soal dan pembahasan: Markdown + LaTeX, dirender di server (markdown-it + KaTeX). HTML mentah di konten dimatikan.
- Deploy: Docker Compose (app + MySQL) di home server, akses publik lewat Cloudflare Tunnel.

## Struktur folder
- src/db: schema Drizzle, migrasi, seed (seed HANYA data dummy)
- src/modules/<fitur>: route, logika, dan view per fitur (auth, topic, practice, tryout, admin)
- src/lib: helper bersama (render Markdown+LaTeX, parser YouTube, penilaian)
- src/views: layout dan komponen yang dipakai banyak halaman
- public: aset statis (css hasil build, font, gambar)
- uploads: gambar soal dari admin, tidak di-commit
- docs/stitch: referensi desain dari Google Stitch, ikuti tampilannya saat membuat view

## Alur kerja
- Satu ISSUE = satu branch, format: feat/issue-0X-nama-singkat. JANGAN kerja langsung di main.
- Kerjakan HANYA yang tertulis di ISSUE aktif. Ide fitur baru dicatat di laporan akhir, jangan langsung dibuat.
- Jangan mengganti stack. Kalau perlu library tambahan, sebutkan alasannya di laporan.
- Commit kecil dengan awalan jelas: feat:, fix:, chore:, docs:, test:.
- Setelah selesai, tulis laporan: ringkasan perubahan, cara mengetes, dan apa yang belum selesai.

## Bahasa
- Teks antarmuka: Bahasa Indonesia santai tapi sopan, sapaan "kamu".
- JANGAN pakai em dash (tanda garis panjang) di teks antarmuka maupun dokumen.
- Nama di kode (tabel, kolom, variabel, fungsi, folder) pakai bahasa Inggris sesuai glosarium di 01-aturan-domain.md.
- URL untuk pengguna pakai bahasa Indonesia, contoh /smp/latihan/bilangan.