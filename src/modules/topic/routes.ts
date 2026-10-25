import { Elysia } from 'elysia';
import { getLevelDashboardData, resolveDemoStudentUser } from '../../fixtures/attempts';
import { getElementsByLevel } from '../../fixtures/elements';
import {
  getPublishedPracticeQuizzesByTopic,
  getPublishedTryoutQuizzesByLevel,
} from '../../fixtures/quizzes';
import { getTopicBySlug } from '../../fixtures/topics';
import { isValidLevel } from '../../lib/format';
import { NotFoundPage } from '../../views/not-found-page';
import { HomePage } from './views/home-page';
import { LevelDashboardPage } from './views/level-dashboard-page';
import { TopicDetailPage } from './views/topic-detail-page';

export function createTopicRoutes(isDevMode: boolean) {
  return new Elysia({ name: 'topic-routes' })
    .get('/', ({ query, set }) => {
      set.headers['content-type'] = 'text/html; charset=utf-8';
      const user = resolveDemoStudentUser(typeof query.sesi === 'string' ? query.sesi : undefined);
      return HomePage({
        user,
        sdElements: getElementsByLevel('sd').map((e) => e.name),
        smpElements: getElementsByLevel('smp').map((e) => e.name),
        youtubeChannelUrl: 'https://www.youtube.com/@RiyadiOfisharu',
      });
    })
    .get('/:level', ({ params, query, set }) => {
      set.headers['content-type'] = 'text/html; charset=utf-8';
      if (!isValidLevel(params.level)) {
        set.status = 404;
        return NotFoundPage();
      }
      const user = resolveDemoStudentUser(typeof query.sesi === 'string' ? query.sesi : undefined);
      const data = getLevelDashboardData(params.level, user, isDevMode);
      return LevelDashboardPage(data);
    })
    .get('/:level/materi/:topicSlug', ({ params, query, set }) => {
      set.headers['content-type'] = 'text/html; charset=utf-8';
      if (!isValidLevel(params.level)) {
        set.status = 404;
        return NotFoundPage();
      }
      const topic = getTopicBySlug(params.level, params.topicSlug);
      if (!topic) {
        set.status = 404;
        return NotFoundPage();
      }

      const user = resolveDemoStudentUser(typeof query.sesi === 'string' ? query.sesi : undefined);
      const practiceRecords = getPublishedPracticeQuizzesByTopic(params.level, topic.id);
      const tryouts = getPublishedTryoutQuizzesByLevel(params.level);

      return TopicDetailPage({
        level: params.level,
        user,
        topic,
        practices: practiceRecords.map((p, idx) => ({
          id: p.id,
          slug: p.slug,
          title: p.title,
          description: p.description,
          questionCount: p.questionIds.length,
          estimatedMinutes: p.questionIds.length * 2,
          lastScore: user && idx === 0 ? 80 : undefined,
        })),
        featuredTryoutSlug: tryouts[0]?.slug,
      });
    });
}
