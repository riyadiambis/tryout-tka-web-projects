import { Elysia } from 'elysia';
import { getDummyPracticeResult, resolveDemoStudentUser } from '../../fixtures/attempts';
import { getQuestionsForAttemptByIds } from '../../fixtures/questions';
import { getPublishedQuizBySlug } from '../../fixtures/quizzes';
import { getTopicById } from '../../fixtures/topics';
import { isValidLevel } from '../../lib/format';
import { NotFoundPage } from '../../views/not-found-page';
import { PracticeAttemptPage } from './views/practice-attempt-page';
import { PracticeResultPage } from './views/practice-result-page';

export function createPracticeRoutes() {
  return new Elysia({ name: 'practice-routes' })
    .get('/:level/latihan/:quizSlug', ({ params, query, set }) => {
      set.headers['content-type'] = 'text/html; charset=utf-8';
      if (!isValidLevel(params.level)) {
        set.status = 404;
        return NotFoundPage();
      }

      const quiz = getPublishedQuizBySlug(params.level, 'practice', params.quizSlug);
      if (!quiz) {
        set.status = 404;
        return NotFoundPage();
      }

      const topic = getTopicById(quiz.topicId);
      // STRICT SECURITY RULE: Only send sterile QuestionForAttempt[] (no answerKey, no explanation, no video URLs)
      const questions = getQuestionsForAttemptByIds(quiz.questionIds);
      const user = resolveDemoStudentUser(typeof query.sesi === 'string' ? query.sesi : undefined);

      return PracticeAttemptPage({
        level: params.level,
        user,
        quiz: {
          id: quiz.id,
          slug: quiz.slug,
          level: quiz.level,
          type: 'practice',
          title: quiz.title,
          topicTitle: topic?.title,
          topicSlug: topic?.slug,
          questionCount: questions.length,
        },
        questions,
      });
    })
    .post('/:level/latihan/:quizSlug/kumpulkan', ({ params, set }) => {
      if (!isValidLevel(params.level)) {
        set.status = 404;
        set.headers['content-type'] = 'text/html; charset=utf-8';
        return NotFoundPage();
      }

      const quiz = getPublishedQuizBySlug(params.level, 'practice', params.quizSlug);
      if (!quiz) {
        set.status = 404;
        set.headers['content-type'] = 'text/html; charset=utf-8';
        return NotFoundPage();
      }

      set.status = 303;
      set.headers['location'] = `/${params.level}/latihan/${quiz.slug}/hasil`;
      return '';
    })
    .get('/:level/latihan/:quizSlug/hasil', ({ params, query, set }) => {
      set.headers['content-type'] = 'text/html; charset=utf-8';
      if (!isValidLevel(params.level)) {
        set.status = 404;
        return NotFoundPage();
      }

      const user = resolveDemoStudentUser(typeof query.sesi === 'string' ? query.sesi : undefined);
      const resultData = getDummyPracticeResult(params.level, params.quizSlug, user);
      if (!resultData) {
        set.status = 404;
        return NotFoundPage();
      }

      return PracticeResultPage(resultData);
    });
}
