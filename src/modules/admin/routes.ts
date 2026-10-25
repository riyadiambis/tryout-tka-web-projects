/**
 * ============================================================================
 * CATATAN KEAMANAN WAJIB (ISSUE-01):
 * Seluruh endpoint `/admin/*` pada tahap ISSUE-01 menggunakan data dummy server
 * dan BELUM memiliki guard otentikasi sesi / cookie httpOnly.
 *
 * PERINGATAN KERAS:
 * Aplikasi DILARANG KERAS di-deploy ke lingkungan publik (production)
 * sebelum ISSUE-02 (Database, Skema, Hash Password, dan Role Admin) selesai!
 * ============================================================================
 */

import { Elysia, t } from 'elysia';
import { html } from '@elysiajs/html';
import { DUMMY_ELEMENTS } from '../../fixtures/elements';
import { DUMMY_ADMIN_QUESTIONS } from '../../fixtures/questions';
import { DUMMY_QUIZZES } from '../../fixtures/quizzes';
import { DUMMY_TOPICS } from '../../fixtures/topics';
import {
  getAdminDashboardMetrics,
  getAdminQuizReportById,
  getAdminQuizReports,
  getAdminStudents,
} from '../../fixtures/users-and-reports';
import type { AdminQuestionRecord, QuestionType } from '../../fixtures/types';
import { extractYoutubeVideoId, parseTimeToSeconds } from '../../lib/youtube';
import { AdminDashboardPage } from './views/admin-dashboard-page';
import { AdminElementsPage } from './views/admin-elements-page';
import { AdminLoginPage } from './views/admin-login-page';
import { AdminPracticesPage } from './views/admin-practices-page';
import { AdminQuestionFormPage } from './views/admin-question-form-page';
import { AdminQuestionPreviewFragment } from './views/admin-question-preview-fragment';
import { AdminQuestionsPage } from './views/admin-questions-page';
import { AdminReportsPage } from './views/admin-reports-page';
import { AdminStudentsPage } from './views/admin-students-page';
import { AdminTopicsPage } from './views/admin-topics-page';
import { AdminTryoutsPage } from './views/admin-tryouts-page';

export function createAdminRoutes() {
  return new Elysia({ prefix: '/admin' })
    .use(html())

    // 1. Dashboard Admin
    .get('/', () => {
      return AdminDashboardPage({
        recentQuestions: DUMMY_ADMIN_QUESTIONS,
      });
    })

    // 2. Masuk & Keluar Admin
    .get('/masuk', ({ query }) => {
      const errorMsg = query.error ? 'Username atau password admin salah.' : undefined;
      return AdminLoginPage({ error: errorMsg });
    })
    .post(
      '/masuk',
      ({ body, set }) => {
        // Dummy check for ISSUE-01
        if (body.username === 'admin' && body.password === 'admin123') {
          set.redirect = '/admin';
          return;
        }
        set.redirect = '/admin/masuk?error=1';
      },
      {
        body: t.Object({
          username: t.String(),
          password: t.String(),
        }),
      }
    )
    .get('/keluar', ({ set }) => {
      set.redirect = '/admin/masuk';
    })

    // 3. Bank Soal (/admin/soal)
    .get('/soal', ({ query }) => {
      const level = query.level || 'all';
      const elementId = query.element_id || 'all';
      const topicId = query.topic_id || 'all';
      const status = query.status || 'all';
      const qSearch = (query.q || '').trim().toLowerCase();

      const filtered = DUMMY_ADMIN_QUESTIONS.filter((q) => {
        if (level !== 'all' && q.level !== level) return false;
        if (elementId !== 'all' && q.elementId !== elementId) return false;
        if (topicId !== 'all' && q.topicId !== topicId) return false;
        if (status !== 'all' && q.status !== status) return false;
        if (qSearch) {
          const matchCode = q.code.toLowerCase().includes(qSearch);
          const matchBody = q.bodyRaw.toLowerCase().includes(qSearch);
          if (!matchCode && !matchBody) return false;
        }
        return true;
      });

      return AdminQuestionsPage({
        questions: filtered,
        elements: DUMMY_ELEMENTS,
        topics: DUMMY_TOPICS,
        selectedLevel: level,
        selectedElementId: elementId,
        selectedTopicId: topicId,
        selectedStatus: status,
        searchQuery: query.q || '',
      });
    })

    // 4. Tambah Soal Baru
    .get('/soal/tambah', () => {
      return AdminQuestionFormPage({
        isEditing: false,
        elements: DUMMY_ELEMENTS,
        topics: DUMMY_TOPICS,
      });
    })
    .post('/soal/tambah', ({ set }) => {
      // Dummy success redirect for ISSUE-01
      set.redirect = '/admin/soal';
    })

    // 5. Ubah Soal
    .get('/soal/:id/edit', ({ params, set }) => {
      const question = DUMMY_ADMIN_QUESTIONS.find((q) => q.id === params.id);
      if (!question) {
        set.status = 404;
        return 'Soal tidak ditemukan.';
      }

      return AdminQuestionFormPage({
        isEditing: true,
        question,
        elements: DUMMY_ELEMENTS,
        topics: DUMMY_TOPICS,
      });
    })
    .post('/soal/:id/edit', ({ set }) => {
      // Dummy success redirect for ISSUE-01
      set.redirect = '/admin/soal';
    })

    // 6. Preview Fragment for Question in Bank Soal Modal
    .get('/soal/:id/preview-fragment', ({ params, set }) => {
      const question = DUMMY_ADMIN_QUESTIONS.find((q) => q.id === params.id);
      if (!question) {
        set.status = 404;
        return '<p class="text-wrong font-bold p-4">Soal tidak ditemukan.</p>';
      }

      const el = DUMMY_ELEMENTS.find((e) => e.id === question.elementId);
      const top = DUMMY_TOPICS.find((t) => t.id === question.topicId);

      return AdminQuestionPreviewFragment({
        data: {
          level: question.level,
          elementName: el?.name ?? 'Matematika',
          topicTitle: top?.title,
          questionType: question.questionType,
          bodyRaw: question.bodyRaw,
          imageUrl: question.imageUrl,
          choiceOptionsRaw: question.choiceOptionsRaw,
          statementsRaw: question.statementsRaw,
          answerKey: question.answerKey,
          explanationRaw: question.explanationRaw,
          shortsId: question.shortsId,
          longVideoId: question.longVideoId,
          longVideoSeconds: question.longVideoSeconds,
        },
      });
    })

    // 7. Live Preview Server Endpoint (POST /admin/soal/preview)
    .post('/soal/preview', ({ body }) => {
      const b = body as any;
      const el = DUMMY_ELEMENTS.find((e) => e.id === b.elementId);
      const top = DUMMY_TOPICS.find((t) => t.id === b.topicId);

      const parsedShortsId = b.shortsId ? extractYoutubeVideoId(b.shortsId) ?? b.shortsId : undefined;
      const parsedLongId = b.longVideoId ? extractYoutubeVideoId(b.longVideoId) ?? b.longVideoId : undefined;
      const parsedSeconds = b.longVideoTime ? parseTimeToSeconds(b.longVideoTime) ?? undefined : undefined;

      return AdminQuestionPreviewFragment({
        data: {
          level: b.level || 'smp',
          elementName: el?.name ?? 'Matematika',
          topicTitle: top?.title,
          questionType: (b.questionType as QuestionType) || 'single',
          bodyRaw: b.bodyRaw || '',
          imageUrl: b.imageUrl || undefined,
          choiceOptionsRaw: b.choiceOptions || [],
          statementsRaw: b.statements || [],
          answerKey: b.answerKey || { questionType: 'single', key: 'A' },
          explanationRaw: b.explanationRaw || '',
          shortsId: parsedShortsId,
          longVideoId: parsedLongId,
          longVideoSeconds: parsedSeconds,
        },
      });
    })

    // 8. Kelola Latihan (/admin/latihan)
    .get('/admin/latihan', ({ set }) => {
      set.redirect = '/admin/latihan';
    })
    .get('/latihan', ({ query }) => {
      const practices = DUMMY_QUIZZES.filter((q) => q.type === 'practice');
      const selectedId = query.id;
      const selectedPractice = selectedId
        ? practices.find((p) => p.id === selectedId) ?? practices[0]
        : practices[0];

      return AdminPracticesPage({
        practices,
        topics: DUMMY_TOPICS,
        availableQuestions: DUMMY_ADMIN_QUESTIONS.filter((q) => q.status === 'published'),
        selectedPractice,
      });
    })
    .post('/latihan', ({ set }) => {
      set.redirect = '/admin/latihan';
    })

    // 9. Kelola Tryout (/admin/tryout)
    .get('/tryout', ({ query }) => {
      const tryouts = DUMMY_QUIZZES.filter((q) => q.type === 'tryout');
      const selectedId = query.id;
      const selectedTryout = selectedId
        ? tryouts.find((t) => t.id === selectedId) ?? tryouts[0]
        : tryouts[0];

      return AdminTryoutsPage({
        tryouts,
        availableQuestions: DUMMY_ADMIN_QUESTIONS.filter((q) => q.status === 'published'),
        selectedTryout,
      });
    })
    .post('/tryout', ({ set }) => {
      set.redirect = '/admin/tryout';
    })

    // 10. Elemen Kisi-kisi (/admin/elemen)
    .get('/elemen', ({ query }) => {
      const editingId = query.edit;
      const editingElement = editingId
        ? DUMMY_ELEMENTS.find((e) => e.id === editingId)
        : undefined;

      return AdminElementsPage({
        elements: DUMMY_ELEMENTS,
        editingElement,
      });
    })
    .post('/elemen', ({ set }) => {
      set.redirect = '/admin/elemen';
    })

    // 11. Materi Pokok (/admin/materi)
    .get('/materi', ({ query }) => {
      const level = query.level || 'all';
      const elementId = query.element_id || 'all';
      const editingId = query.edit;
      const editingTopic = editingId ? DUMMY_TOPICS.find((t) => t.id === editingId) : undefined;

      return AdminTopicsPage({
        topics: DUMMY_TOPICS,
        elements: DUMMY_ELEMENTS,
        selectedLevel: level,
        selectedElementId: elementId,
        editingTopic,
      });
    })
    .post('/materi', ({ set }) => {
      set.redirect = '/admin/materi';
    })

    // 12. Kelola Siswa (/admin/siswa)
    .get('/siswa', ({ query }) => {
      const students = getAdminStudents(query.q || '');
      return AdminStudentsPage({
        students,
        searchQuery: query.q || '',
      });
    })

    // 13. Laporan Skor & Butir Soal (/admin/laporan)
    .get('/laporan', ({ query }) => {
      const reports = getAdminQuizReports();
      const selectedReport = getAdminQuizReportById(query.quiz_id);

      return AdminReportsPage({
        reports,
        selectedReport: selectedReport ?? reports[0],
      });
    });
}
