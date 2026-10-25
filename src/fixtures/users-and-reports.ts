import { DUMMY_ADMIN_QUESTIONS } from './questions';
import { DUMMY_QUIZZES } from './quizzes';
import type { AdminQuizReport, AdminStudentItem } from './types';

export const DUMMY_ADMIN_STUDENTS: AdminStudentItem[] = [
  {
    id: 'stu-01',
    displayName: 'Raka Pratama',
    username: 'raka_smp9',
    createdAtLabel: '24 Okt 2026',
    sourceLabel: 'yt-bilangan-1',
    practiceAttemptCount: 3,
    tryoutAttemptCount: 1,
  },
  {
    id: 'stu-02',
    displayName: 'Aisyah Putri',
    username: 'aisyah_cantik',
    createdAtLabel: '23 Okt 2026',
    sourceLabel: 'yt-shorts-pangkat',
    practiceAttemptCount: 5,
    tryoutAttemptCount: 1,
  },
  {
    id: 'stu-03',
    displayName: 'Budi Santoso',
    username: 'budi_juara',
    createdAtLabel: '22 Okt 2026',
    sourceLabel: 'langsung',
    practiceAttemptCount: 2,
    tryoutAttemptCount: 0,
  },
  {
    id: 'stu-04',
    displayName: 'Dina Amelia',
    username: 'dina_smp',
    createdAtLabel: '21 Okt 2026',
    sourceLabel: 'yt-aljabar-1',
    practiceAttemptCount: 4,
    tryoutAttemptCount: 1,
  },
  {
    id: 'stu-05',
    displayName: 'Farhan Rizki',
    username: 'farhan_sd6',
    createdAtLabel: '20 Okt 2026',
    sourceLabel: 'yt-pecahan-sd',
    practiceAttemptCount: 1,
    tryoutAttemptCount: 0,
  },
  {
    id: 'stu-06',
    displayName: 'Gita Maharani',
    username: 'gita_math',
    createdAtLabel: '19 Okt 2026',
    sourceLabel: 'yt-bilangan-1',
    practiceAttemptCount: 6,
    tryoutAttemptCount: 1,
  },
  {
    id: 'stu-07',
    displayName: 'Hafiz Firdaus',
    username: 'hafiz_ambis',
    createdAtLabel: '18 Okt 2026',
    sourceLabel: 'yt-shorts-segitiga',
    practiceAttemptCount: 3,
    tryoutAttemptCount: 1,
  },
  {
    id: 'stu-08',
    displayName: 'Intan Permata',
    username: 'intan_p',
    createdAtLabel: '17 Okt 2026',
    sourceLabel: 'langsung',
    practiceAttemptCount: 0,
    tryoutAttemptCount: 0,
  },
];

export const DUMMY_QUIZ_REPORTS: AdminQuizReport[] = [
  {
    quizId: 'quiz-smp-to-1',
    quizTitle: 'Tryout Gratis 1: Simulasi TKA SMP',
    level: 'smp',
    quizType: 'tryout',
    participantCount: 142,
    averageScore: 68.4,
    highestScore: 100,
    lowestScore: 26.7,
    questionStats: [
      {
        questionNumber: 1,
        questionCode: 'MAT-9-BIL-001',
        questionExcerpt: 'Hasil perkalian bilangan berpangkat 2^3 x 2^4 adalah ...',
        questionType: 'single',
        correctPercentage: 88,
        mostChosenWrongLabel: 'B (2^12)',
      },
      {
        questionNumber: 2,
        questionCode: 'MAT-9-BIL-002',
        questionExcerpt: 'Ekspresi yang sama persis dengan (3^2)^3...',
        questionType: 'multiple',
        correctPercentage: 74,
        mostChosenWrongLabel: 'Hanya memilih Pilihan 1 & 2',
      },
      {
        questionNumber: 3,
        questionCode: 'MAT-9-BIL-003',
        questionExcerpt: 'Pernyataan sifat perpangkatan (Benar atau Salah)...',
        questionType: 'category',
        correctPercentage: 58,
        mostChosenWrongLabel: 'Keliru pada pernyataan 2 (a^0 = 1)',
      },
      {
        questionNumber: 4,
        questionCode: 'MAT-9-GEO-001',
        questionExcerpt: 'Luas segitiga siku-siku dengan hipotenusa 15 cm...',
        questionType: 'single',
        correctPercentage: 32, // rendah, merah
        mostChosenWrongLabel: 'D (Salah menghitung alas dari triple Pythagoras)',
      },
      {
        questionNumber: 5,
        questionCode: 'MAT-9-BIL-004',
        questionExcerpt: 'Bentuk sederhana dari (a^3 b^2) / (a b^4)...',
        questionType: 'single',
        correctPercentage: 45, // rendah
        mostChosenWrongLabel: 'C (Lupa eksponen negatif)',
      },
    ],
  },
  {
    quizId: 'quiz-smp-pangkat-1',
    quizTitle: 'Latihan 1: Konsep Dasar Bilangan Berpangkat',
    level: 'smp',
    quizType: 'practice',
    participantCount: 285,
    averageScore: 78.2,
    highestScore: 100,
    lowestScore: 40,
    questionStats: [
      {
        questionNumber: 1,
        questionCode: 'MAT-9-BIL-001',
        questionExcerpt: 'Hasil perkalian bilangan berpangkat 2^3 x 2^4 adalah ...',
        questionType: 'single',
        correctPercentage: 92,
        mostChosenWrongLabel: 'B (2^12)',
      },
      {
        questionNumber: 2,
        questionCode: 'MAT-9-BIL-002',
        questionExcerpt: 'Ekspresi yang sama persis dengan (3^2)^3...',
        questionType: 'multiple',
        correctPercentage: 81,
        mostChosenWrongLabel: 'Hanya memilih A',
      },
      {
        questionNumber: 3,
        questionCode: 'MAT-9-BIL-003',
        questionExcerpt: 'Pernyataan sifat perpangkatan (Benar atau Salah)...',
        questionType: 'category',
        correctPercentage: 62,
        mostChosenWrongLabel: 'Keliru pada pernyataan a^0 = 1',
      },
    ],
  },
];

export function getAdminStudents(searchQuery = ''): AdminStudentItem[] {
  const query = searchQuery.trim().toLowerCase();
  if (!query) return DUMMY_ADMIN_STUDENTS;
  return DUMMY_ADMIN_STUDENTS.filter(
    (s) =>
      s.displayName.toLowerCase().includes(query) ||
      s.username.toLowerCase().includes(query) ||
      s.sourceLabel.toLowerCase().includes(query)
  );
}

export function getAdminQuizReports(): AdminQuizReport[] {
  return DUMMY_QUIZ_REPORTS;
}

export function getAdminQuizReportById(id?: string): AdminQuizReport | undefined {
  if (!id) return DUMMY_QUIZ_REPORTS[0];
  return DUMMY_QUIZ_REPORTS.find((r) => r.quizId === id) ?? DUMMY_QUIZ_REPORTS[0];
}

export function getAdminDashboardMetrics() {
  const publishedQuestions = DUMMY_ADMIN_QUESTIONS.filter((q) => q.status === 'published').length;
  const draftQuestions = DUMMY_ADMIN_QUESTIONS.filter((q) => q.status === 'draft').length;
  const archivedQuestions = DUMMY_ADMIN_QUESTIONS.filter((q) => q.status === 'archived').length;

  const totalPractices = DUMMY_QUIZZES.filter((q) => q.type === 'practice').length;
  const totalTryouts = DUMMY_QUIZZES.filter((q) => q.type === 'tryout').length;

  const totalStudents = DUMMY_ADMIN_STUDENTS.length;
  const totalPracticeAttempts = DUMMY_ADMIN_STUDENTS.reduce(
    (acc, s) => acc + s.practiceAttemptCount,
    0
  );
  const totalTryoutAttempts = DUMMY_ADMIN_STUDENTS.reduce(
    (acc, s) => acc + s.tryoutAttemptCount,
    0
  );

  return {
    totalQuestions: DUMMY_ADMIN_QUESTIONS.length,
    publishedQuestions,
    draftQuestions,
    archivedQuestions,
    totalPractices,
    totalTryouts,
    totalStudents,
    totalPracticeAttempts,
    totalTryoutAttempts,
  };
}
