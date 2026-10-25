import { renderMarkdownWithLatex } from '../lib/markdown';
import { buildLongVideoUrl, buildShortsUrl, formatSecondsToTime } from '../lib/youtube';
import { getElementById, getElementsByLevel } from './elements';
import { DUMMY_ADMIN_QUESTIONS, renderQuestionOptions } from './questions';
import {
  getPublishedPracticeQuizzesByTopic,
  getPublishedQuizBySlug,
  getPublishedTryoutQuizzesByLevel,
} from './quizzes';
import { getTopicById, getTopicsByLevel } from './topics';
import type {
  AdminQuestionRecord,
  AttemptResultSummary,
  Level,
  LevelDashboardPageProps,
  PracticeResultPageProps,
  QuestionResultItem,
  ResultStatus,
  SessionStudentUser,
  StudentAnswerValue,
  TryoutResultPageProps,
} from './types';

export const DEMO_LOGGED_IN_STUDENT: SessionStudentUser = {
  displayName: 'Raka',
  username: 'raka_smp9',
};

export function resolveDemoStudentUser(sesiQuery?: string): SessionStudentUser | null {
  if (sesiQuery === 'masuk') {
    return DEMO_LOGGED_IN_STUDENT;
  }
  return null;
}

function formatAnswerKeyReadable(rec: AdminQuestionRecord): string {
  if (rec.answerKey.questionType === 'single') {
    return rec.answerKey.key;
  }
  if (rec.answerKey.questionType === 'multiple') {
    return rec.answerKey.keys.map((k) => `Pilihan ${k}`).join(', ');
  }
  const entries = Object.entries(rec.answerKey.answers).map(
    ([stId, val]) => `${stId}: ${val ? 'Benar' : 'Salah'}`
  );
  return entries.join(', ');
}

function buildDummyResultItems(questionIds: string[]): QuestionResultItem[] {
  const items: QuestionResultItem[] = [];

  questionIds.forEach((qId, index) => {
    const rec = DUMMY_ADMIN_QUESTIONS.find((q) => q.id === qId && q.status === 'published');
    if (!rec) return;

    const element = getElementById(rec.elementId);
    const num = items.length + 1;

    // Make realistic variety: mostly correct, 1 wrong (#2), 1 unanswered (#5) so all 3 statuses appear
    let status: ResultStatus = 'correct';
    let studentAnswer: StudentAnswerValue = null;
    let studentAnswerLabel = '';

    if (index === 1) {
      status = 'wrong';
      if (rec.answerKey.questionType === 'single') {
        studentAnswer = rec.answerKey.key === 'A' ? 'B' : 'A';
        studentAnswerLabel = String(studentAnswer);
      } else if (rec.answerKey.questionType === 'multiple') {
        studentAnswer = ['A', 'B'];
        studentAnswerLabel = 'Pilihan A, Pilihan B';
      } else {
        studentAnswer = { '1': true, '2': true, '3': true };
        studentAnswerLabel = '1: Benar, 2: Benar, 3: Benar';
      }
    } else if (index === 4) {
      status = 'unanswered';
      studentAnswer = null;
      studentAnswerLabel = 'Kosong (belum diisi)';
    } else {
      status = 'correct';
      if (rec.answerKey.questionType === 'single') {
        studentAnswer = rec.answerKey.key;
        studentAnswerLabel = rec.answerKey.key;
      } else if (rec.answerKey.questionType === 'multiple') {
        studentAnswer = rec.answerKey.keys;
        studentAnswerLabel = formatAnswerKeyReadable(rec);
      } else {
        studentAnswer = rec.answerKey.answers;
        studentAnswerLabel = formatAnswerKeyReadable(rec);
      }
    }

    items.push({
      id: rec.id,
      number: num,
      elementName: element?.name ?? 'Matematika',
      questionType: rec.questionType,
      bodyHtml: renderMarkdownWithLatex(rec.bodyRaw),
      imageUrl: rec.imageUrl,
      options: renderQuestionOptions(rec),
      status,
      studentAnswer,
      studentAnswerLabel,
      answerKeyLabel: formatAnswerKeyReadable(rec),
      explanationHtml: renderMarkdownWithLatex(rec.explanationRaw),
      shortsUrl: rec.shortsId ? buildShortsUrl(rec.shortsId) : undefined,
      longVideoUrl: rec.longVideoId
        ? buildLongVideoUrl(rec.longVideoId, rec.longVideoSeconds)
        : undefined,
      longVideoTimeLabel:
        rec.longVideoId && rec.longVideoSeconds
          ? formatSecondsToTime(rec.longVideoSeconds)
          : undefined,
    });
  });

  return items;
}

export function getDummyPracticeResult(
  level: Level,
  quizSlug: string,
  user: SessionStudentUser | null
): PracticeResultPageProps | null {
  const quiz = getPublishedQuizBySlug(level, 'practice', quizSlug);
  if (!quiz) return null;

  const items = buildDummyResultItems(quiz.questionIds);
  const totalQuestions = items.length;
  const correctCount = items.filter((i) => i.status === 'correct').length;
  const wrongCount = items.filter((i) => i.status === 'wrong').length;
  const unansweredCount = items.filter((i) => i.status === 'unanswered').length;
  const score = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

  const topic = getTopicById(quiz.topicId);
  const tryouts = getPublishedTryoutQuizzesByLevel(level);

  const summary: AttemptResultSummary = {
    quizTitle: quiz.title,
    quizSlug: quiz.slug,
    level,
    score,
    correctCount,
    wrongCount,
    unansweredCount,
    totalQuestions,
    durationLabel: '06 menit 45 detik',
    encouragementText:
      'Mantap! Sebagian besar konsep sudah kamu kuasai. Yuk cek pembahasan soal yang masih keliru di bawah.',
  };

  return {
    level,
    user,
    topicSlug: topic?.slug ?? '',
    topicTitle: topic?.title ?? 'Materi Latihan',
    tryoutPromoSlug: tryouts[0]?.slug,
    summary,
    items,
  };
}

export function getDummyTryoutResult(
  level: Level,
  quizSlug: string,
  user: SessionStudentUser | null
): TryoutResultPageProps | null {
  const quiz = getPublishedQuizBySlug(level, 'tryout', quizSlug);
  if (!quiz) return null;

  const items = buildDummyResultItems(quiz.questionIds);
  const totalQuestions = items.length;
  const correctCount = items.filter((i) => i.status === 'correct').length;
  const wrongCount = items.filter((i) => i.status === 'wrong').length;
  const unansweredCount = items.filter((i) => i.status === 'unanswered').length;
  const score = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

  const summary: AttemptResultSummary = {
    quizTitle: quiz.title,
    quizSlug: quiz.slug,
    level,
    score,
    correctCount,
    wrongCount,
    unansweredCount,
    totalQuestions,
    durationLabel: '24 menit 12 detik',
    encouragementText:
      'Kerja bagus sudah menyelesaikan simulasi Tryout TKA sampai tuntas! Pelajari pembahasan tiap nomor di bawah ya.',
  };

  return {
    level,
    user,
    summary,
    items,
  };
}

export function getLevelDashboardData(
  level: Level,
  user: SessionStudentUser | null,
  isDevMode: boolean
): LevelDashboardPageProps {
  const elements = getElementsByLevel(level);
  const topics = getTopicsByLevel(level);
  const tryoutQuizzes = getPublishedTryoutQuizzesByLevel(level);
  const isLoggedIn = user !== null;

  const tryouts = tryoutQuizzes.map((tq, idx) => ({
    id: tq.id,
    slug: tq.slug,
    title: tq.title,
    questionCount: tq.questionIds.length,
    durationMinutes: tq.durationMinutes ?? 30,
    status: (isLoggedIn && idx === 0 ? 'completed' : 'not_started') as 'not_started' | 'completed',
    lastScore: isLoggedIn && idx === 0 ? 80 : undefined,
  }));

  const elementGroups = elements.map((el, elIdx) => {
    const elTopics = topics.filter((t) => t.elementId === el.id);
    return {
      element: el,
      topics: elTopics.map((tp, tpIdx) => {
        const practices = getPublishedPracticeQuizzesByTopic(level, tp.id);
        const totalQuestions = practices.reduce((acc, q) => acc + q.questionIds.length, 0);
        const completedDemo = isLoggedIn && elIdx === 0 && tpIdx === 0;
        return {
          topicId: tp.id,
          topicSlug: tp.slug,
          title: tp.title,
          practiceCount: practices.length,
          totalQuestions,
          isCompleted: completedDemo,
          bestScore: completedDemo ? 80 : undefined,
        };
      }),
    };
  });

  return {
    level,
    user,
    isDemoModeSwitchVisible: isDevMode,
    tryouts,
    elementGroups,
  };
}
