import type { AdminQuizRecord, Level } from './types';

export const DUMMY_QUIZZES: AdminQuizRecord[] = [
  // ==================== SMP PRACTICES (5 Soal Terbit) ====================
  {
    id: 'quiz-smp-prac-1',
    slug: 'latihan-bilangan-berpangkat-1',
    code: 'LAT-9-BIL-01',
    level: 'smp',
    type: 'practice',
    title: 'Paket 1: Konsep Dasar & Operasi Pangkat',
    description: 'Latihan 5 soal mencakup pilihan ganda, pilihan ganda kompleks, dan benar atau salah.',
    topicId: 'top-smp-pangkat',
    status: 'published',
    access: 'free',
    questionIds: ['q-smp-01', 'q-smp-02', 'q-smp-03', 'q-smp-04', 'q-smp-05'],
  },
  {
    id: 'quiz-smp-prac-2',
    slug: 'latihan-bilangan-berpangkat-2',
    code: 'LAT-9-BIL-02',
    level: 'smp',
    type: 'practice',
    title: 'Paket 2: Variasi Pangkat & Akar TKA',
    description: 'Penguatan variasi soal pangkat negatif dan bentuk akar untuk persiapan TO.',
    topicId: 'top-smp-pangkat',
    status: 'published',
    access: 'free',
    questionIds: ['q-smp-05', 'q-smp-06', 'q-smp-01', 'q-smp-02', 'q-smp-03'],
  },
  {
    id: 'quiz-smp-prac-akar',
    slug: 'latihan-bentuk-akar-1',
    code: 'LAT-9-BIL-03',
    level: 'smp',
    type: 'practice',
    title: 'Paket 1: Penyederhanaan Bentuk Akar',
    description: 'Latihan terfokus menyederhanakan penjumlahan dan pengurangan bentuk akar.',
    topicId: 'top-smp-akar',
    status: 'published',
    access: 'free',
    questionIds: ['q-smp-06', 'q-smp-01', 'q-smp-02', 'q-smp-03', 'q-smp-05'],
  },
  {
    id: 'quiz-smp-prac-alj',
    slug: 'latihan-bentuk-aljabar-1',
    code: 'LAT-9-ALJ-01',
    level: 'smp',
    type: 'practice',
    title: 'Paket 1: Persamaan Linear Satu Variabel',
    description: 'Latihan memodelkan dan menyelesaikan persamaan aljabar TKA SMP.',
    topicId: 'top-smp-aljabar',
    status: 'published',
    access: 'free',
    questionIds: ['q-smp-07', 'q-smp-10', 'q-smp-01', 'q-smp-02', 'q-smp-04'],
  },
  {
    id: 'quiz-smp-prac-pyth',
    slug: 'latihan-pythagoras-1',
    code: 'LAT-9-GEO-01',
    level: 'smp',
    type: 'practice',
    title: 'Paket 1: Penerapan Teorema Pythagoras',
    description: 'Soal cerita segitiga siku-siku dan jarak terpendek.',
    topicId: 'top-smp-pythagoras',
    status: 'published',
    access: 'free',
    questionIds: ['q-smp-08', 'q-smp-07', 'q-smp-01', 'q-smp-03', 'q-smp-06'],
  },
  {
    id: 'quiz-smp-prac-pel',
    slug: 'latihan-peluang-1',
    code: 'LAT-9-DAT-01',
    level: 'smp',
    type: 'practice',
    title: 'Paket 1: Peluang Teoretik & Statistika',
    description: 'Menentukan peluang kejadian pelemparan dadu dan analisis data.',
    topicId: 'top-smp-peluang',
    status: 'published',
    access: 'free',
    questionIds: ['q-smp-09', 'q-smp-07', 'q-smp-02', 'q-smp-03', 'q-smp-08'],
  },

  // ==================== SMP TRYOUT (10 Soal Terbit) ====================
  {
    id: 'quiz-smp-to-1',
    slug: 'simulasi-tka-smp-paket-1',
    code: 'TO-9-MAT-01',
    level: 'smp',
    type: 'tryout',
    title: 'Tryout TKA Matematika SMP Paket 1',
    description: 'Simulasi resmi 10 soal lintas elemen kisi-kisi TKA SMP Kelas 9.',
    topicId: null,
    durationMinutes: 30,
    status: 'published',
    access: 'free',
    questionIds: [
      'q-smp-01',
      'q-smp-02',
      'q-smp-03',
      'q-smp-04',
      'q-smp-05',
      'q-smp-06',
      'q-smp-07',
      'q-smp-08',
      'q-smp-09',
      'q-smp-10',
    ],
  },

  // ==================== SD PRACTICES (5 Soal Terbit) ====================
  {
    id: 'quiz-sd-prac-1',
    slug: 'latihan-pecahan-campuran-1',
    code: 'LAT-6-BIL-01',
    level: 'sd',
    type: 'practice',
    title: 'Paket 1: Penjumlahan & Pengurangan Pecahan',
    description: 'Latihan 5 soal operasi pecahan campuran, desimal, dan persen.',
    topicId: 'top-sd-pecahan',
    status: 'published',
    access: 'free',
    questionIds: ['q-sd-01', 'q-sd-02', 'q-sd-03', 'q-sd-04', 'q-sd-05'],
  },
  {
    id: 'quiz-sd-prac-2',
    slug: 'latihan-pecahan-campuran-2',
    code: 'LAT-6-BIL-02',
    level: 'sd',
    type: 'practice',
    title: 'Paket 2: Soal Cerita Pecahan Sehari-hari',
    description: 'Penerapan pembagian pecahan dan persen dalam soal cerita TKA SD.',
    topicId: 'top-sd-pecahan',
    status: 'published',
    access: 'free',
    questionIds: ['q-sd-03', 'q-sd-05', 'q-sd-01', 'q-sd-02', 'q-sd-04'],
  },
  {
    id: 'quiz-sd-prac-fpb',
    slug: 'latihan-fpb-kpk-1',
    code: 'LAT-6-BIL-03',
    level: 'sd',
    type: 'practice',
    title: 'Paket 1: Jadwal Bersama & Pembagian Paket',
    description: 'Latihan membedakan FPB dan KPK di soal cerita.',
    topicId: 'top-sd-fpb-kpk',
    status: 'published',
    access: 'free',
    questionIds: ['q-sd-06', 'q-sd-01', 'q-sd-02', 'q-sd-03', 'q-sd-05'],
  },
  {
    id: 'quiz-sd-prac-rasio',
    slug: 'latihan-rasio-1',
    code: 'LAT-6-ALJ-01',
    level: 'sd',
    type: 'practice',
    title: 'Paket 1: Perbandingan Senilai',
    description: 'Latihan rasio kelereng, umur, dan harga satuan barang.',
    topicId: 'top-sd-rasio',
    status: 'published',
    access: 'free',
    questionIds: ['q-sd-07', 'q-sd-10', 'q-sd-01', 'q-sd-02', 'q-sd-05'],
  },
  {
    id: 'quiz-sd-prac-bangun',
    slug: 'latihan-bangun-gabungan-1',
    code: 'LAT-6-GEO-01',
    level: 'sd',
    type: 'practice',
    title: 'Paket 1: Luas Bangun Datar Gabungan',
    description: 'Menghitung luas gabungan persegi panjang dan segitiga.',
    topicId: 'top-sd-bangun',
    status: 'published',
    access: 'free',
    questionIds: ['q-sd-08', 'q-sd-07', 'q-sd-01', 'q-sd-02', 'q-sd-03'],
  },
  {
    id: 'quiz-sd-prac-data',
    slug: 'latihan-diagram-data-1',
    code: 'LAT-6-DAT-01',
    level: 'sd',
    type: 'practice',
    title: 'Paket 1: Rata-rata Nilai & Diagram',
    description: 'Menghitung mean data tunggal pada soal TKA SD.',
    topicId: 'top-sd-data',
    status: 'published',
    access: 'free',
    questionIds: ['q-sd-09', 'q-sd-06', 'q-sd-08', 'q-sd-02', 'q-sd-03'],
  },

  // ==================== SD TRYOUT (10 Soal Terbit) ====================
  {
    id: 'quiz-sd-to-1',
    slug: 'simulasi-tka-sd-paket-1',
    code: 'TO-6-MAT-01',
    level: 'sd',
    type: 'tryout',
    title: 'Tryout TKA Matematika SD Paket 1',
    description: 'Simulasi resmi 10 soal lintas elemen kisi-kisi TKA SD Kelas 6.',
    topicId: null,
    durationMinutes: 30,
    status: 'published',
    access: 'free',
    questionIds: [
      'q-sd-01',
      'q-sd-02',
      'q-sd-03',
      'q-sd-04',
      'q-sd-05',
      'q-sd-06',
      'q-sd-07',
      'q-sd-08',
      'q-sd-09',
      'q-sd-10',
    ],
  },
];

export function getPublishedPracticeQuizzesByTopic(level: Level, topicId: string): AdminQuizRecord[] {
  return DUMMY_QUIZZES.filter(
    (q) => q.level === level && q.type === 'practice' && q.topicId === topicId && q.status === 'published'
  );
}

export function getPublishedTryoutQuizzesByLevel(level: Level): AdminQuizRecord[] {
  return DUMMY_QUIZZES.filter(
    (q) => q.level === level && q.type === 'tryout' && q.status === 'published'
  );
}

export function getPublishedQuizBySlug(
  level: Level,
  type: 'practice' | 'tryout',
  slug: string
): AdminQuizRecord | undefined {
  return DUMMY_QUIZZES.find(
    (q) => q.level === level && q.type === type && q.slug === slug && q.status === 'published'
  );
}
