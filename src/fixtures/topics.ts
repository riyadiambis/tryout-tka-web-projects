import { buildTopicVideoUrl } from '../lib/youtube';
import type { Level, TopicItem } from './types';

interface RawTopicSeed {
  id: string;
  level: Level;
  elementId: string;
  elementName: string;
  elementBadgeColor: 'orange' | 'blue' | 'purple' | 'green';
  title: string;
  slug: string;
  description: string;
  videoId?: string;
  practiceCount: number;
}

const RAW_TOPICS: RawTopicSeed[] = [
  // SMP Kelas 9
  {
    id: 'top-smp-pangkat',
    level: 'smp',
    elementId: 'el-smp-bil',
    elementName: 'Bilangan',
    elementBadgeColor: 'blue',
    title: 'Bilangan Berpangkat',
    slug: 'bilangan-berpangkat',
    description:
      'Pelajari sifat perkalian, pembagian, pangkat nol, hingga pangkat negatif secara bertahap sesuai kisi-kisi resmi TKA Matematika SMP.',
    videoId: 'k9X8zV7mQ1A',
    practiceCount: 2,
  },
  {
    id: 'top-smp-akar',
    level: 'smp',
    elementId: 'el-smp-bil',
    elementName: 'Bilangan',
    elementBadgeColor: 'blue',
    title: 'Bentuk Akar dan Rasionalisasi',
    slug: 'bentuk-akar',
    description:
      'Cara menyederhanakan perkalian bentuk akar dan merasionalkan penyebut pecahan tanpa hafalan rumit.',
    practiceCount: 1,
  },
  {
    id: 'top-smp-aljabar',
    level: 'smp',
    elementId: 'el-smp-alj',
    elementName: 'Aljabar',
    elementBadgeColor: 'green',
    title: 'Persamaan Linear dan Bentuk Aljabar',
    slug: 'bentuk-aljabar',
    description:
      'Menyederhanakan suku sejenis, pemfaktoran aljabar, dan memodelkan soal cerita ke dalam persamaan linear.',
    videoId: 'm4N2pL9wR5B',
    practiceCount: 1,
  },
  {
    id: 'top-smp-pythagoras',
    level: 'smp',
    elementId: 'el-smp-geo',
    elementName: 'Geometri dan Pengukuran',
    elementBadgeColor: 'purple',
    title: 'Teorema Pythagoras',
    slug: 'teorema-pythagoras',
    description:
      'Menghitung sisi miring segitiga siku-siku dan penerapannya pada jarak terpendek dalam kehidupan sehari-hari.',
    videoId: 'p7Q3sK8tW2C',
    practiceCount: 1,
  },
  {
    id: 'top-smp-peluang',
    level: 'smp',
    elementId: 'el-smp-dat',
    elementName: 'Data dan Peluang',
    elementBadgeColor: 'orange',
    title: 'Statistika dan Peluang Kejadian',
    slug: 'peluang-kejadian',
    description:
      'Menentukan rata-rata gabungan, median, modus, serta peluang teoretik pelemparan koin atau dadu.',
    practiceCount: 1,
  },

  // SD Kelas 6
  {
    id: 'top-sd-pecahan',
    level: 'sd',
    elementId: 'el-sd-bil',
    elementName: 'Bilangan',
    elementBadgeColor: 'orange',
    title: 'Operasi Pecahan Campuran dan Desimal',
    slug: 'pecahan-campuran',
    description:
      'Mengubah pecahan campuran ke desimal atau persen serta menyelesaikan soal cerita pembagian pecahan dengan rapi.',
    videoId: 's2T6vM1nX4D',
    practiceCount: 2,
  },
  {
    id: 'top-sd-fpb-kpk',
    level: 'sd',
    elementId: 'el-sd-bil',
    elementName: 'Bilangan',
    elementBadgeColor: 'orange',
    title: 'FPB dan KPK dalam Soal Cerita',
    slug: 'fpb-dan-kpk',
    description:
      'Membedakan kapan harus memakai FPB (pembagian sama banyak) dan kapan memakai KPK (jadwal bersama).',
    practiceCount: 1,
  },
  {
    id: 'top-sd-rasio',
    level: 'sd',
    elementId: 'el-sd-alj',
    elementName: 'Aljabar',
    elementBadgeColor: 'green',
    title: 'Rasio dan Perbandingan Senilai',
    slug: 'rasio-perbandingan',
    description:
      'Menghitung perbandingan umur, skala peta, dan takaran resep menggunakan konsep satuan yang mudah dipahami.',
    videoId: 'u8Y4wZ3qC9E',
    practiceCount: 1,
  },
  {
    id: 'top-sd-bangun',
    level: 'sd',
    elementId: 'el-sd-geo',
    elementName: 'Geometri dan Pengukuran',
    elementBadgeColor: 'purple',
    title: 'Luas dan Keliling Bangun Datar Gabungan',
    slug: 'bangun-datar-gabungan',
    description:
      'Memecah bangun gabungan menjadi persegi panjang, segitiga, dan lingkaran agar mudah dihitung luasnya.',
    practiceCount: 1,
  },
  {
    id: 'top-sd-data',
    level: 'sd',
    elementId: 'el-sd-dat',
    elementName: 'Data dan Peluang',
    elementBadgeColor: 'blue',
    title: 'Membaca Diagram Batang dan Rata-rata',
    slug: 'diagram-dan-rata-rata',
    description:
      'Menafsirkan selisih data dari tabel dan diagram batang serta menghitung nilai rata-rata ulangan.',
    practiceCount: 1,
  },
];

export const DUMMY_TOPICS: TopicItem[] = RAW_TOPICS.map((item) => ({
  ...item,
  videoUrl: item.videoId ? buildTopicVideoUrl(item.videoId) : undefined,
}));

export function getTopicsByLevel(level: Level): TopicItem[] {
  return DUMMY_TOPICS.filter((t) => t.level === level);
}

export function getTopicBySlug(level: Level, slug: string): TopicItem | undefined {
  return DUMMY_TOPICS.find((t) => t.level === level && t.slug === slug);
}

export function getTopicById(id: string | null): TopicItem | undefined {
  if (!id) return undefined;
  return DUMMY_TOPICS.find((t) => t.id === id);
}
