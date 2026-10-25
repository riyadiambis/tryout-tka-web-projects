import type { Level, QuestionStatus, QuestionType } from '../fixtures/types';

export function isValidLevel(value: string): value is Level {
  return value === 'sd' || value === 'smp';
}

export function formatLevelTitle(level: Level): string {
  return level === 'sd' ? 'SD Kelas 6' : 'SMP Kelas 9';
}

export function formatLevelShort(level: Level): string {
  return level === 'sd' ? 'SD' : 'SMP';
}

export function formatQuestionTypeLabel(questionType: QuestionType): string {
  switch (questionType) {
    case 'single':
      return 'Pilihan Ganda';
    case 'multiple':
      return 'Pilihan Ganda Kompleks';
    case 'category':
      return 'Benar atau Salah';
  }
}

export function formatQuestionInstruction(questionType: QuestionType): string {
  switch (questionType) {
    case 'single':
      return 'Pilih 1 jawaban yang paling tepat';
    case 'multiple':
      return 'Pilih semua jawaban yang tepat (bisa lebih dari satu)';
    case 'category':
      return 'Tentukan Benar atau Salah untuk setiap pernyataan';
  }
}

export function formatQuestionStatusLabel(status: QuestionStatus): string {
  switch (status) {
    case 'published':
      return 'Terbit';
    case 'draft':
      return 'Draft';
    case 'archived':
      return 'Arsip';
  }
}
