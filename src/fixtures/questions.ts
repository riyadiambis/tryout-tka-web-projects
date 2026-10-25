import { renderInlineMarkdownWithLatex, renderMarkdownWithLatex } from '../lib/markdown';
import { getElementById } from './elements';
import { getTopicById } from './topics';
import type { AdminQuestionRecord, Level, QuestionForAttempt, QuestionOption } from './types';

export const DUMMY_ADMIN_QUESTIONS: AdminQuestionRecord[] = [
  // ==================== SMP KELAS 9 (10 Published + 1 Draft + 1 Archived) ====================
  {
    id: 'q-smp-01',
    code: 'MAT-9-BIL-001',
    level: 'smp',
    elementId: 'el-smp-bil',
    topicId: 'top-smp-pangkat',
    questionType: 'single',
    bodyRaw: 'Hasil perkalian bilangan berpangkat $2^3 \\times 2^4$ adalah ...',
    choiceOptionsRaw: [
      { key: 'A', textRaw: '$2^7$' },
      { key: 'B', textRaw: '$2^{12}$' },
      { key: 'C', textRaw: '$4^7$' },
      { key: 'D', textRaw: '$4^{12}$' },
    ],
    answerKey: { questionType: 'single', key: 'A' },
    explanationRaw:
      'Gunakan sifat perkalian bilangan berpangkat dengan basis sama:\n\n$$a^m \\times a^n = a^{m+n}$$\n\nMaka $2^3 \\times 2^4 = 2^{3+4} = 2^7$. Jadi pilihan yang tepat adalah **A**.',
    shortsId: 'sH0rtSmp001',
    longVideoId: 'k9X8zV7mQ1A',
    longVideoSeconds: 200,
    status: 'published',
    source: 'manual',
    updatedAtLabel: '24 Okt 2026',
  },
  {
    id: 'q-smp-02',
    code: 'MAT-9-BIL-002',
    level: 'smp',
    elementId: 'el-smp-bil',
    topicId: 'top-smp-pangkat',
    questionType: 'multiple',
    bodyRaw: 'Manakah ekspresi di bawah ini yang nilainya **sama persis** dengan $(3^2)^3$?',
    choiceOptionsRaw: [
      { key: 'A', textRaw: '$3^{2+2+2} = 3^6$' },
      { key: 'B', textRaw: '$3^2 \\times 3^2 \\times 3^2$' },
      { key: 'C', textRaw: '$3^{2+3} = 3^5$' },
      { key: 'D', textRaw: '$9^3$' },
    ],
    answerKey: { questionType: 'multiple', keys: ['A', 'B', 'D'] },
    explanationRaw:
      'Ingat sifat pangkat dipangkatkan $(a^m)^n = a^{m \\times n}$, sehingga $(3^2)^3 = 3^6$.\n- Pilihan 1 benar karena $3^{2+2+2} = 3^6$.\n- Pilihan 2 benar karena arti pangkat tiga adalah dikalikan berulang 3 kali.\n- Pilihan 4 benar karena $3^2 = 9$, sehingga $(3^2)^3 = 9^3$.',
    shortsId: 'sH0rtSmp002',
    status: 'published',
    source: 'manual',
    updatedAtLabel: '24 Okt 2026',
  },
  {
    id: 'q-smp-03',
    code: 'MAT-9-BIL-003',
    level: 'smp',
    elementId: 'el-smp-bil',
    topicId: 'top-smp-pangkat',
    questionType: 'category',
    bodyRaw: 'Perhatikan sifat-sifat eksponen berikut. Tentukan **Benar** atau **Salah** untuk tiap pernyataan!',
    statementsRaw: [
      { statementId: '1', textRaw: '$5^0 = 1$' },
      { statementId: '2', textRaw: '$(-2)^3 = 8$' },
      { statementId: '3', textRaw: '$\\left(a^4\\right)^2 = a^8$ untuk setiap $a \\neq 0$' },
    ],
    answerKey: { questionType: 'category', answers: { '1': true, '2': false, '3': true } },
    explanationRaw:
      '1. Setiap bilangan tak nol dipangkatkan $0$ hasilnya $1$, maka $5^0 = 1$ **Benar**.\n2. $(-2)^3 = (-2) \\times (-2) \\times (-2) = -8$, maka pernyataan kedua **Salah**.\n3. $(a^4)^2 = a^{4 \\times 2} = a^8$, maka pernyataan ketiga **Benar**.',
    status: 'published',
    source: 'manual',
    updatedAtLabel: '24 Okt 2026',
  },
  {
    id: 'q-smp-04',
    code: 'MAT-9-BIL-004',
    level: 'smp',
    elementId: 'el-smp-bil',
    topicId: 'top-smp-pangkat',
    questionType: 'single',
    bodyRaw:
      'Bentuk paling sederhana dari operasi pecahan berpangkat panjang berikut adalah ...\n\n$$\\frac{2^{14} \\times 3^{9} \\times 5^{7} \\times a^{8} b^{5}}{2^{11} \\times 3^{7} \\times 5^{6} \\times a^{5} b^{2}} + \\frac{6 a^{4} b^{4}}{2 a b}$$',
    choiceOptionsRaw: [
      { key: 'A', textRaw: '$363 a^3 b^3$' },
      { key: 'B', textRaw: '$360 + 3 a^3 b^3$' },
      { key: 'C', textRaw: '$183 a^3 b^3$' },
      { key: 'D', textRaw: '$75 a^3 b^3$' },
    ],
    answerKey: { questionType: 'single', key: 'A' },
    explanationRaw:
      'Sederhanakan suku pertama:\n\n\\[\\frac{2^{14}}{2^{11}} \\times \\frac{3^9}{3^7} \\times \\frac{5^7}{5^6} \\times a^{8-5} b^{5-2} = 2^3 \\times 3^2 \\times 5^1 a^3 b^3 = 8 \\times 9 \\times 5 a^3 b^3 = 360 a^3 b^3\\]\n\nSuku kedua bernilai $3a^3b^3$. Dijumlahkan menjadi $360a^3b^3 + 3a^3b^3 = 363a^3b^3$.',
    longVideoId: 'k9X8zV7mQ1A',
    longVideoSeconds: 410,
    status: 'published',
    source: 'manual',
    updatedAtLabel: '25 Okt 2026',
  },
  {
    id: 'q-smp-05',
    code: 'MAT-9-BIL-005',
    level: 'smp',
    elementId: 'el-smp-bil',
    topicId: 'top-smp-pangkat',
    questionType: 'single',
    bodyRaw: 'Nilai dari $4^{-2} + 2^{-3}$ sama dengan ...',
    choiceOptionsRaw: [
      { key: 'A', textRaw: '$\\frac{3}{16}$' },
      { key: 'B', textRaw: '$\\frac{1}{8}$' },
      { key: 'C', textRaw: '$-14$' },
      { key: 'D', textRaw: '$\\frac{5}{16}$' },
    ],
    answerKey: { questionType: 'single', key: 'A' },
    explanationRaw:
      'Ubah pangkat negatif menjadi pecahan positif: $4^{-2} = \\frac{1}{16}$ dan $2^{-3} = \\frac{1}{8} = \\frac{2}{16}$. Maka $\\frac{1}{16} + \\frac{2}{16} = \\frac{3}{16}$.',
    shortsId: 'sH0rtSmp005',
    status: 'published',
    source: 'manual',
    updatedAtLabel: '25 Okt 2026',
  },
  {
    id: 'q-smp-06',
    code: 'MAT-9-BIL-006',
    level: 'smp',
    elementId: 'el-smp-bil',
    topicId: 'top-smp-akar',
    questionType: 'single',
    bodyRaw: 'Bentuk sederhana dari $\\sqrt{48} + 2\\sqrt{12} - \\sqrt{27}$ adalah ...',
    choiceOptionsRaw: [
      { key: 'A', textRaw: '$5\\sqrt{3}$' },
      { key: 'B', textRaw: '$4\\sqrt{3}$' },
      { key: 'C', textRaw: '$6\\sqrt{3}$' },
      { key: 'D', textRaw: '$3\\sqrt{3}$' },
    ],
    answerKey: { questionType: 'single', key: 'A' },
    explanationRaw:
      'Ubah masing-masing ke akar sejenis $\\sqrt{3}$:\n$\\sqrt{48} = 4\\sqrt{3}$, $2\\sqrt{12} = 4\\sqrt{3}$, dan $\\sqrt{27} = 3\\sqrt{3}$.\nMaka $4\\sqrt{3} + 4\\sqrt{3} - 3\\sqrt{3} = 5\\sqrt{3}$.',
    status: 'published',
    source: 'manual',
    updatedAtLabel: '25 Okt 2026',
  },
  {
    id: 'q-smp-07',
    code: 'MAT-9-ALJ-001',
    level: 'smp',
    elementId: 'el-smp-alj',
    topicId: 'top-smp-aljabar',
    questionType: 'single',
    bodyRaw: 'Jika $3(2x - 4) = 2(x + 6)$, maka nilai dari $x + 5$ adalah ...',
    choiceOptionsRaw: [
      { key: 'A', textRaw: '$11$' },
      { key: 'B', textRaw: '$6$' },
      { key: 'C', textRaw: '$9$' },
      { key: 'D', textRaw: '$12$' },
    ],
    answerKey: { questionType: 'single', key: 'A' },
    explanationRaw:
      'Jabarkan kedua ruas: $6x - 12 = 2x + 12 \\Rightarrow 4x = 24 \\Rightarrow x = 6$. Maka nilai $x + 5 = 6 + 5 = 11$.',
    shortsId: 'sH0rtAlj001',
    longVideoId: 'm4N2pL9wR5B',
    longVideoSeconds: 145,
    status: 'published',
    source: 'manual',
    updatedAtLabel: '25 Okt 2026',
  },
  {
    id: 'q-smp-08',
    code: 'MAT-9-GEO-001',
    level: 'smp',
    elementId: 'el-smp-geo',
    topicId: 'top-smp-pythagoras',
    questionType: 'single',
    bodyRaw:
      'Sebuah tangga sepanjang $13\\text{ m}$ disandarkan pada tembok tegak. Jika jarak kaki tangga ke tembok $5\\text{ m}$, tinggi tembok yang dicapai ujung tangga adalah ...',
    choiceOptionsRaw: [
      { key: 'A', textRaw: '$12\\text{ m}$' },
      { key: 'B', textRaw: '$10\\text{ m}$' },
      { key: 'C', textRaw: '$8\\text{ m}$' },
      { key: 'D', textRaw: '$14\\text{ m}$' },
    ],
    answerKey: { questionType: 'single', key: 'A' },
    explanationRaw:
      'Gunakan Teorema Pythagoras $t = \\sqrt{13^2 - 5^2} = \\sqrt{169 - 25} = \\sqrt{144} = 12\\text{ m}$.',
    longVideoId: 'p7Q3sK8tW2C',
    longVideoSeconds: 95,
    status: 'published',
    source: 'manual',
    updatedAtLabel: '25 Okt 2026',
  },
  {
    id: 'q-smp-09',
    code: 'MAT-9-DAT-001',
    level: 'smp',
    elementId: 'el-smp-dat',
    topicId: 'top-smp-peluang',
    questionType: 'multiple',
    bodyRaw:
      'Sebuah dadu bersisi enam dilempar satu kali. Manakah kejadian berikut yang memiliki peluang tepat $\\frac{1}{2}$?',
    choiceOptionsRaw: [
      { key: 'A', textRaw: 'Muncul mata dadu bilangan genap' },
      { key: 'B', textRaw: 'Muncul mata dadu bilangan prima' },
      { key: 'C', textRaw: 'Muncul mata dadu lebih dari $4$' },
      { key: 'D', textRaw: 'Muncul mata dadu faktor dari $6$' },
    ],
    answerKey: { questionType: 'multiple', keys: ['A', 'B'] },
    explanationRaw:
      'Ruang sampel dadu $n(S) = 6$.\n- Bilangan genap $\\{2, 4, 6\\}$ ada 3 anggota $\\Rightarrow \\frac{3}{6} = \\frac{1}{2}$.\n- Bilangan prima $\\{2, 3, 5\\}$ ada 3 anggota $\\Rightarrow \\frac{3}{6} = \\frac{1}{2}$.\n- Lebih dari $4$ hanya $\\{5, 6\\}$ ($\\frac{2}{6}$), faktor dari $6$ ada $\\{1, 2, 3, 6\\}$ ($\\frac{4}{6}$).',
    status: 'published',
    source: 'manual',
    updatedAtLabel: '25 Okt 2026',
  },
  {
    id: 'q-smp-10',
    code: 'MAT-9-TO-010',
    level: 'smp',
    elementId: 'el-smp-alj',
    topicId: null, // Soal khusus TO tanpa materi halaman
    questionType: 'category',
    bodyRaw:
      'Suatu taman berbentuk persegi panjang memiliki keliling $36\\text{ m}$ dan selisih panjang terhadap lebar adalah $4\\text{ m}$. Tentukan kebenaran pernyataan berikut!',
    statementsRaw: [
      { statementId: '1', textRaw: 'Panjang taman tersebut adalah $11\\text{ m}$.' },
      { statementId: '2', textRaw: 'Lebar taman tersebut adalah $7\\text{ m}$.' },
      { statementId: '3', textRaw: 'Luas taman tersebut adalah $84\\text{ m}^2$.' },
    ],
    answerKey: { questionType: 'category', answers: { '1': true, '2': true, '3': false } },
    explanationRaw:
      'Diketahui $2(p + l) = 36 \\Rightarrow p + l = 18$ dan $p - l = 4$.\nJumlahkan keduanya: $2p = 22 \\Rightarrow p = 11\\text{ m}$ dan $l = 7\\text{ m}$.\nLuas taman $= 11 \\times 7 = 77\\text{ m}^2$ (bukan $84\\text{ m}^2$).',
    status: 'published',
    source: 'manual',
    updatedAtLabel: '25 Okt 2026',
  },
  {
    id: 'q-smp-draft-11',
    code: 'MAT-9-GEO-099',
    level: 'smp',
    elementId: 'el-smp-geo',
    topicId: 'top-smp-pythagoras',
    questionType: 'single',
    bodyRaw: 'Soal draft internal SMP: panjang diagonal persegi bersisi $6\\text{ cm}$ adalah ...',
    choiceOptionsRaw: [
      { key: 'A', textRaw: '$6\\sqrt{2}\\text{ cm}$' },
      { key: 'B', textRaw: '$6\\sqrt{3}\\text{ cm}$' },
      { key: 'C', textRaw: '$12\\text{ cm}$' },
      { key: 'D', textRaw: '$9\\text{ cm}$' },
    ],
    answerKey: { questionType: 'single', key: 'A' },
    explanationRaw: 'Diagonal persegi bersisi $s$ adalah $s\\sqrt{2} = 6\\sqrt{2}\\text{ cm}$.',
    status: 'draft',
    source: 'manual',
    updatedAtLabel: '25 Okt 2026',
  },
  {
    id: 'q-smp-arch-12',
    code: 'MAT-9-BIL-098',
    level: 'smp',
    elementId: 'el-smp-bil',
    topicId: 'top-smp-pangkat',
    questionType: 'single',
    bodyRaw: 'Soal arsip lama SMP: hasil dari $10^0$ adalah ...',
    choiceOptionsRaw: [
      { key: 'A', textRaw: '$1$' },
      { key: 'B', textRaw: '$0$' },
      { key: 'C', textRaw: '$10$' },
      { key: 'D', textRaw: '$-1$' },
    ],
    answerKey: { questionType: 'single', key: 'A' },
    explanationRaw: 'Bilangan tak nol pangkat nol hasilnya $1$.',
    status: 'archived',
    source: 'manual',
    updatedAtLabel: '20 Okt 2026',
  },

  // ==================== SD KELAS 6 (10 Published + 1 Draft) ====================
  {
    id: 'q-sd-01',
    code: 'MAT-6-BIL-001',
    level: 'sd',
    elementId: 'el-sd-bil',
    topicId: 'top-sd-pecahan',
    questionType: 'single',
    bodyRaw: 'Hasil dari $2\\frac{1}{2} + 1\\frac{3}{4} - \\frac{5}{8}$ adalah ...',
    choiceOptionsRaw: [
      { key: 'A', textRaw: '$3\\frac{5}{8}$' },
      { key: 'B', textRaw: '$3\\frac{3}{8}$' },
      { key: 'C', textRaw: '$4\\frac{1}{8}$' },
      { key: 'D', textRaw: '$2\\frac{7}{8}$' },
    ],
    answerKey: { questionType: 'single', key: 'A' },
    explanationRaw:
      'Samakan penyebut menjadi per delapan:\n\n$$2\\frac{4}{8} + 1\\frac{6}{8} - \\frac{5}{8} = 3\\frac{10-5}{8} = 3\\frac{5}{8}$$',
    shortsId: 'sH0rtSd0001',
    longVideoId: 's2T6vM1nX4D',
    longVideoSeconds: 180,
    status: 'published',
    source: 'manual',
    updatedAtLabel: '24 Okt 2026',
  },
  {
    id: 'q-sd-02',
    code: 'MAT-6-BIL-002',
    level: 'sd',
    elementId: 'el-sd-bil',
    topicId: 'top-sd-pecahan',
    questionType: 'multiple',
    bodyRaw: 'Manakah bilangan di bawah ini yang nilainya senilai dengan pecahan $\\frac{3}{4}$?',
    choiceOptionsRaw: [
      { key: 'A', textRaw: '$0,75$' },
      { key: 'B', textRaw: '$75\\%$' },
      { key: 'C', textRaw: '$\\frac{9}{16}$' },
      { key: 'D', textRaw: '$\\frac{15}{20}$' },
    ],
    answerKey: { questionType: 'multiple', keys: ['A', 'B', 'D'] },
    explanationRaw:
      '$\\frac{3}{4} = \\frac{75}{100} = 0,75 = 75\\%$, dan jika pembilang serta penyebut dikali $5$ menjadi $\\frac{15}{20}$.',
    shortsId: 'sH0rtSd0002',
    status: 'published',
    source: 'manual',
    updatedAtLabel: '24 Okt 2026',
  },
  {
    id: 'q-sd-03',
    code: 'MAT-6-BIL-003',
    level: 'sd',
    elementId: 'el-sd-bil',
    topicId: 'top-sd-pecahan',
    questionType: 'category',
    bodyRaw: 'Ibu memiliki $3,5\\text{ kg}$ tepung terigu untuk membuat kue. Tentukan kebenaran pernyataan berikut!',
    statementsRaw: [
      { statementId: '1', textRaw: 'Berat tepung Ibu sama dengan $\\frac{7}{2}\\text{ kg}$.' },
      { statementId: '2', textRaw: 'Jika dipakai $1\\frac{1}{4}\\text{ kg}$, sisa tepung Ibu adalah $2,25\\text{ kg}$.' },
      { statementId: '3', textRaw: 'Jika sisa $2,25\\text{ kg}$ dibagi rata ke 3 stoples, tiap stoples berisi $0,85\\text{ kg}$.' },
    ],
    answerKey: { questionType: 'category', answers: { '1': true, '2': true, '3': false } },
    explanationRaw:
      '1. $3,5 = 3\\frac{1}{2} = \\frac{7}{2}$ (**Benar**).\n2. $3,5 - 1,25 = 2,25\\text{ kg}$ (**Benar**).\n3. $2,25 \\div 3 = 0,75\\text{ kg}$, bukan $0,85\\text{ kg}$ (**Salah**).',
    status: 'published',
    source: 'manual',
    updatedAtLabel: '24 Okt 2026',
  },
  {
    id: 'q-sd-04',
    code: 'MAT-6-BIL-004',
    level: 'sd',
    elementId: 'el-sd-bil',
    topicId: 'top-sd-pecahan',
    questionType: 'single',
    bodyRaw:
      'Hitunglah hasil operasi campuran pecahan memanjang berikut:\n\n$$\\left(\\frac{3}{5} + \\frac{7}{10} + \\frac{4}{15} - \\frac{1}{6}\\right) \\div \\frac{7}{10}$$',
    choiceOptionsRaw: [
      { key: 'A', textRaw: '$2$' },
      { key: 'B', textRaw: '$1\\frac{2}{5}$' },
      { key: 'C', textRaw: '$\\frac{49}{50}$' },
      { key: 'D', textRaw: '$3$' },
    ],
    answerKey: { questionType: 'single', key: 'A' },
    explanationRaw:
      'Samakan penyebut di dalam kurung menjadi $30$:\n\n\\[\\frac{18 + 21 + 8 - 5}{30} = \\frac{42}{30} = \\frac{7}{5}\\]\n\nKemudian $\\frac{7}{5} \\div \\frac{7}{10} = \\frac{7}{5} \\times \\frac{10}{7} = 2$.',
    status: 'published',
    source: 'manual',
    updatedAtLabel: '25 Okt 2026',
  },
  {
    id: 'q-sd-05',
    code: 'MAT-6-BIL-005',
    level: 'sd',
    elementId: 'el-sd-bil',
    topicId: 'top-sd-pecahan',
    questionType: 'single',
    bodyRaw: 'Bentuk persen dari $\\frac{7}{20}$ adalah ...',
    choiceOptionsRaw: [
      { key: 'A', textRaw: '$35\\%$' },
      { key: 'B', textRaw: '$14\\%$' },
      { key: 'C', textRaw: '$28\\%$' },
      { key: 'D', textRaw: '$70\\%$' },
    ],
    answerKey: { questionType: 'single', key: 'A' },
    explanationRaw: 'Kalikan pembilang dan penyebut dengan $5$: $\\frac{7 \\times 5}{20 \\times 5} = \\frac{35}{100} = 35\\%$.',
    status: 'published',
    source: 'manual',
    updatedAtLabel: '25 Okt 2026',
  },
  {
    id: 'q-sd-06',
    code: 'MAT-6-BIL-006',
    level: 'sd',
    elementId: 'el-sd-bil',
    topicId: 'top-sd-fpb-kpk',
    questionType: 'single',
    bodyRaw: 'Lampu merah menyala setiap $12$ detik dan lampu kuning setiap $18$ detik. Kedua lampu menyala bersamaan setiap ...',
    choiceOptionsRaw: [
      { key: 'A', textRaw: '$36$ detik' },
      { key: 'B', textRaw: '$6$ detik' },
      { key: 'C', textRaw: '$24$ detik' },
      { key: 'D', textRaw: '$72$ detik' },
    ],
    answerKey: { questionType: 'single', key: 'A' },
    explanationRaw: 'KPK dari $12 = 2^2 \\times 3$ dan $18 = 2 \\times 3^2$ adalah $2^2 \\times 3^2 = 36$ detik.',
    status: 'published',
    source: 'manual',
    updatedAtLabel: '25 Okt 2026',
  },
  {
    id: 'q-sd-07',
    code: 'MAT-6-BIL-007',
    level: 'sd',
    elementId: 'el-sd-bil',
    topicId: 'top-sd-rasio',
    questionType: 'single',
    bodyRaw: 'Perbandingan kelereng Andi dan Budi adalah $3 : 5$. Jika jumlah kelereng mereka $40$ butir, banyak kelereng Budi adalah ...',
    choiceOptionsRaw: [
      { key: 'A', textRaw: '$25$ butir' },
      { key: 'B', textRaw: '$15$ butir' },
      { key: 'C', textRaw: '$20$ butir' },
      { key: 'D', textRaw: '$30$ butir' },
    ],
    answerKey: { questionType: 'single', key: 'A' },
    explanationRaw: 'Jumlah bagian rasio $= 3 + 5 = 8$. Kelereng Budi $= \\frac{5}{8} \\times 40 = 25$ butir.',
    longVideoId: 'u8Y4wZ3qC9E',
    longVideoSeconds: 120,
    status: 'published',
    source: 'manual',
    updatedAtLabel: '25 Okt 2026',
  },
  {
    id: 'q-sd-08',
    code: 'MAT-6-GEO-001',
    level: 'sd',
    elementId: 'el-sd-geo',
    topicId: 'top-sd-bangun',
    questionType: 'single',
    bodyRaw: 'Sebuah persegi panjang berukuran $14\\text{ cm} \\times 10\\text{ cm}$ digabung dengan segitiga siku-siku beralas $10\\text{ cm}$ dan tinggi $6\\text{ cm}$. Luas gabungannya adalah ...',
    choiceOptionsRaw: [
      { key: 'A', textRaw: '$170\\text{ cm}^2$' },
      { key: 'B', textRaw: '$200\\text{ cm}^2$' },
      { key: 'C', textRaw: '$140\\text{ cm}^2$' },
      { key: 'D', textRaw: '$160\\text{ cm}^2$' },
    ],
    answerKey: { questionType: 'single', key: 'A' },
    explanationRaw: 'Luas persegi panjang $= 14 \\times 10 = 140\\text{ cm}^2$. Luas segitiga $= \\frac{1}{2} \\times 10 \\times 6 = 30\\text{ cm}^2$. Total $= 170\\text{ cm}^2$.',
    status: 'published',
    source: 'manual',
    updatedAtLabel: '25 Okt 2026',
  },
  {
    id: 'q-sd-09',
    code: 'MAT-6-DAT-001',
    level: 'sd',
    elementId: 'el-sd-dat',
    topicId: 'top-sd-data',
    questionType: 'single',
    bodyRaw: 'Nilai ulangan Matematika Dinda sebanyak 5 kali adalah $80, 85, 90, 75,$ dan $95$. Rata-rata nilai ulangan Dinda adalah ...',
    choiceOptionsRaw: [
      { key: 'A', textRaw: '$85$' },
      { key: 'B', textRaw: '$84$' },
      { key: 'C', textRaw: '$86$' },
      { key: 'D', textRaw: '$88$' },
    ],
    answerKey: { questionType: 'single', key: 'A' },
    explanationRaw: 'Jumlah nilai $= 80 + 85 + 90 + 75 + 95 = 425$. Rata-rata $= 425 \\div 5 = 85$.',
    status: 'published',
    source: 'manual',
    updatedAtLabel: '25 Okt 2026',
  },
  {
    id: 'q-sd-10',
    code: 'MAT-6-TO-010',
    level: 'sd',
    elementId: 'el-sd-bil',
    topicId: null, // Khusus TO tanpa materi
    questionType: 'category',
    bodyRaw: 'Harga 4 buku tulis adalah $\\text{Rp}18.000$. Tentukan kebenaran pernyataan berikut!',
    statementsRaw: [
      { statementId: '1', textRaw: 'Harga 1 buku tulis adalah $\\text{Rp}4.500$.' },
      { statementId: '2', textRaw: 'Harga 6 buku tulis adalah $\\text{Rp}27.000$.' },
      { statementId: '3', textRaw: 'Uang $\\text{Rp}50.000$ cukup untuk membeli 12 buku tulis.' },
    ],
    answerKey: { questionType: 'category', answers: { '1': true, '2': true, '3': false } },
    explanationRaw:
      'Harga satuan $= 18.000 \\div 4 = 4.500$. Untuk 6 buku $= 27.000$. Untuk 12 buku dibutuhkan $12 \\times 4.500 = \\text{Rp}54.000$, sehingga $\\text{Rp}50.000$ belum cukup.',
    status: 'published',
    source: 'manual',
    updatedAtLabel: '25 Okt 2026',
  },
  {
    id: 'q-sd-draft-11',
    code: 'MAT-6-GEO-099',
    level: 'sd',
    elementId: 'el-sd-geo',
    topicId: 'top-sd-bangun',
    questionType: 'single',
    bodyRaw: 'Soal draft internal SD: keliling lingkaran berdiameter $14\\text{ cm}$ adalah ...',
    choiceOptionsRaw: [
      { key: 'A', textRaw: '$44\\text{ cm}$' },
      { key: 'B', textRaw: '$22\\text{ cm}$' },
      { key: 'C', textRaw: '$154\\text{ cm}$' },
      { key: 'D', textRaw: '$88\\text{ cm}$' },
    ],
    answerKey: { questionType: 'single', key: 'A' },
    explanationRaw: '$K = \\frac{22}{7} \\times 14 = 44\\text{ cm}$.',
    status: 'draft',
    source: 'manual',
    updatedAtLabel: '25 Okt 2026',
  },
];

export function renderQuestionOptions(record: AdminQuestionRecord): QuestionOption[] {
  if (record.questionType === 'category') {
    return (record.statementsRaw ?? []).map((st) => ({
      kind: 'statement',
      statementId: st.statementId,
      statementHtml: renderInlineMarkdownWithLatex(st.textRaw),
    }));
  }
  return (record.choiceOptionsRaw ?? []).map((opt) => ({
    kind: 'choice',
    key: opt.key,
    labelHtml: renderInlineMarkdownWithLatex(opt.textRaw),
  }));
}

/**
 * STERILE SELECTOR FOR ATTEMPT PAGES
 * Guarantees:
 * 1. Only `published` questions are ever returned to students (Rule 3).
 * 2. Answer keys, written explanations, and explanation video IDs/URLs are stripped completely (Rule 1 & 22).
 */
export function getQuestionsForAttemptByIds(questionIds: string[]): QuestionForAttempt[] {
  const result: QuestionForAttempt[] = [];

  for (const qId of questionIds) {
    const rec = DUMMY_ADMIN_QUESTIONS.find((q) => q.id === qId && q.status === 'published');
    if (!rec) continue;

    const element = getElementById(rec.elementId);
    const topic = getTopicById(rec.topicId);

    const sterileItem: QuestionForAttempt = {
      id: rec.id,
      number: result.length + 1,
      level: rec.level,
      elementName: element?.name ?? 'Matematika',
      topicTitle: topic?.title,
      questionType: rec.questionType,
      bodyHtml: renderMarkdownWithLatex(rec.bodyRaw),
      imageUrl: rec.imageUrl,
      options: renderQuestionOptions(rec),
    };

    result.push(sterileItem);
  }

  return result;
}

export function getPublishedQuestionsByLevel(level: Level): AdminQuestionRecord[] {
  return DUMMY_ADMIN_QUESTIONS.filter((q) => q.level === level && q.status === 'published');
}

export function getAdminQuestionById(id: string): AdminQuestionRecord | undefined {
  return DUMMY_ADMIN_QUESTIONS.find((q) => q.id === id);
}
