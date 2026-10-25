import { Elysia } from 'elysia';
import { getDummyTryoutResult, resolveDemoStudentUser } from '../../fixtures/attempts';
import { getQuestionsForAttemptByIds } from '../../fixtures/questions';
import { getPublishedQuizBySlug } from '../../fixtures/quizzes';
import { isValidLevel } from '../../lib/format';
import { NotFoundPage } from '../../views/not-found-page';
import { TryoutAttemptPage } from './views/tryout-attempt-page';
import { TryoutLobbyPage } from './views/tryout-lobby-page';
import { TryoutResultPage } from './views/tryout-result-page';

const DEFAULT_TRYOUT_RULES = [
  'Waktu pengerjaan dihitung oleh server dan langsung berjalan saat kamu menekan tombol Mulai TO.',
  'Setiap jawaban yang kamu pilih tersimpan otomatis sehingga aman apabila koneksi sempat terputus.',
  'Jika waktu habis, lembar jawabanmu dikumpulkan dan dinilai otomatis menggunakan jawaban terakhir yang tersimpan.',
  'Setiap akun siswa hanya memiliki 1 kali kesempatan mengerjakan untuk setiap paket Tryout.',
];

export function createTryoutRoutes(isDevMode: boolean) {
  return new Elysia({ name: 'tryout-routes' })
    .get('/:level/tryout/:quizSlug', ({ params, query, set }) => {
      set.headers['content-type'] = 'text/html; charset=utf-8';
      if (!isValidLevel(params.level)) {
        set.status = 404;
        return NotFoundPage();
      }

      const quiz = getPublishedQuizBySlug(params.level, 'tryout', params.quizSlug);
      if (!quiz) {
        set.status = 404;
        return NotFoundPage();
      }

      const user = resolveDemoStudentUser(typeof query.sesi === 'string' ? query.sesi : undefined);
      const hasCompletedAttempt = query.status === 'selesai';

      return TryoutLobbyPage({
        level: params.level,
        user,
        quiz: {
          id: quiz.id,
          slug: quiz.slug,
          level: quiz.level,
          type: 'tryout',
          title: quiz.title,
          questionCount: quiz.questionIds.length,
          durationMinutes: quiz.durationMinutes ?? 30,
        },
        rules: DEFAULT_TRYOUT_RULES,
        hasCompletedAttempt,
      });
    })
    .get('/:level/tryout/:quizSlug/kerjakan', ({ params, query, set }) => {
      set.headers['content-type'] = 'text/html; charset=utf-8';
      if (!isValidLevel(params.level)) {
        set.status = 404;
        return NotFoundPage();
      }

      const quiz = getPublishedQuizBySlug(params.level, 'tryout', params.quizSlug);
      if (!quiz) {
        set.status = 404;
        return NotFoundPage();
      }

      // STRICT SECURITY RULE: Sterile QuestionForAttempt[] only
      const questions = getQuestionsForAttemptByIds(quiz.questionIds);
      const user = resolveDemoStudentUser(typeof query.sesi === 'string' ? query.sesi : undefined);

      const defaultSeconds = (quiz.durationMinutes ?? 30) * 60;
      const parsedSisa =
        typeof query.sisa === 'string' ? Number.parseInt(query.sisa, 10) : Number.NaN;
      const remainingSeconds =
        Number.isFinite(parsedSisa) && parsedSisa >= 0 ? parsedSisa : defaultSeconds;

      const parsedNomor =
        typeof query.nomor === 'string' ? Number.parseInt(query.nomor, 10) : Number.NaN;
      const activeQuestionNumber =
        Number.isFinite(parsedNomor) && parsedNomor >= 1 && parsedNomor <= questions.length
          ? parsedNomor
          : 1;

      return TryoutAttemptPage({
        level: params.level,
        user,
        quiz: {
          id: quiz.id,
          slug: quiz.slug,
          level: quiz.level,
          type: 'tryout',
          title: quiz.title,
          questionCount: questions.length,
          durationMinutes: quiz.durationMinutes ?? 30,
        },
        questions,
        initialResponses: {},
        activeQuestionNumber,
        remainingSeconds,
        isDevMode,
      });
    })
    .post('/:level/tryout/:quizSlug/kumpulkan', ({ params, set }) => {
      if (!isValidLevel(params.level)) {
        set.status = 404;
        set.headers['content-type'] = 'text/html; charset=utf-8';
        return NotFoundPage();
      }

      const quiz = getPublishedQuizBySlug(params.level, 'tryout', params.quizSlug);
      if (!quiz) {
        set.status = 404;
        set.headers['content-type'] = 'text/html; charset=utf-8';
        return NotFoundPage();
      }

      set.status = 303;
      set.headers['location'] = `/${params.level}/tryout/${quiz.slug}/hasil`;
      return '';
    })
    .get('/:level/tryout/:quizSlug/hasil', ({ params, query, set }) => {
      set.headers['content-type'] = 'text/html; charset=utf-8';
      if (!isValidLevel(params.level)) {
        set.status = 404;
        return NotFoundPage();
      }

      const user = resolveDemoStudentUser(typeof query.sesi === 'string' ? query.sesi : undefined);
      const resultData = getDummyTryoutResult(params.level, params.quizSlug, user);
      if (!resultData) {
        set.status = 404;
        return NotFoundPage();
      }

      return TryoutResultPage(resultData);
    });
}
