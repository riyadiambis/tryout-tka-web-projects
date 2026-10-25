import type { PracticeAttemptPageProps } from '../../../fixtures/types';
import { formatLevelTitle } from '../../../lib/format';
import { Badge } from '../../../views/components/badge';
import { Button } from '../../../views/components/button';
import { Card } from '../../../views/components/card';
import { Modal } from '../../../views/components/modal';
import { QuestionCard } from '../../../views/components/question-card';
import { StudentLayout } from '../../../views/layouts/student-layout';

export function PracticeAttemptPage({
  level,
  user,
  quiz,
  questions,
  initialResponses = {},
}: PracticeAttemptPageProps): string {
  const totalCount = questions.length;
  const backHref = quiz.topicSlug ? `/${level}/materi/${quiz.topicSlug}` : `/${level}`;

  return StudentLayout({
    title: `${quiz.title} - ${formatLevelTitle(level)}`,
    description: `Latihan soal ${quiz.title} (${totalCount} soal)`,
    navVariant: 'page',
    level,
    headerTitle: quiz.topicTitle ?? quiz.title,
    backHref,
    user,
    containerMode: 'desktop',
    scripts: ['/js/practice.js'],
    children: (
      <div class="flex flex-col gap-6 pb-8">
        {/* Header & Real-time Progress Card */}
        <Card padding="md" class="flex flex-col gap-3 sticky top-[68px] z-30 bg-card/95 backdrop-blur-[2px]">
          <div class="flex items-center justify-between flex-wrap gap-2">
            <div class="flex flex-col">
              <span class="label-section" safe>
                {quiz.topicTitle ? `Latihan Materi: ${quiz.topicTitle}` : 'Latihan Soal'}
              </span>
              <h1 class="font-title font-extrabold text-[20px] sm:text-[22px] text-ink leading-snug" safe>
                {quiz.title}
              </h1>
            </div>
            <Badge variant="neutral" size="md">
              <span id="practice-answered-label" data-total-questions={String(totalCount)}>
                0 dari {totalCount} terjawab
              </span>
            </Badge>
          </div>

          {/* Progress Bar (Stabilo & Navy only) */}
          <div class="w-full h-3.5 rounded-full bg-paper-soft border-2 border-ink overflow-hidden">
            <div
              id="practice-progress-bar"
              class="h-full bg-stabilo transition-all duration-200"
              style="width: 0%"
            />
          </div>
        </Card>

        {/* Form Daftar Soal Latihan */}
        <form
          id="practice-attempt-form"
          method="post"
          action={`/${level}/latihan/${quiz.slug}/kumpulkan`}
          class="flex flex-col gap-5"
        >
          {questions.map((question) => (
            <QuestionCard
              question={question}
              selectedAnswer={initialResponses[question.id] ?? null}
              mode="practice"
            />
          ))}

          {/* Sticky Submit Bar */}
          <Card padding="md" variant="soft" class="mt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div class="text-center sm:text-left">
              <p class="font-title font-bold text-[18px] text-ink">
                Sudah yakin dengan semua jawabanmu?
              </p>
              <p class="text-[14px] font-semibold text-ink-soft">
                Cek lagi kalau masih ragu, lalu kumpulkan untuk melihat skor dan pembahasan.
              </p>
            </div>
            <Button
              id="btn-submit-practice"
              type="submit"
              variant="primary"
              size="lg"
              iconRight="arrow-right"
              class="w-full sm:w-auto shrink-0"
            >
              Kumpulkan Jawaban
            </Button>
          </Card>
        </form>

        {/* Modal Konfirmasi Soal Kosong */}
        <Modal
          id="modal-confirm-practice"
          title="Masih Ada Soal Kosong"
          variant="confirm"
          iconVariant="warning"
          footer={
            <>
              <Button
                type="button"
                variant="secondary"
                dataAction="close-modal"
                dataTarget="modal-confirm-practice"
                class="w-full sm:w-auto"
              >
                Cek Lagi
              </Button>
              <Button
                id="btn-confirm-submit-practice"
                type="button"
                variant="primary"
                iconRight="arrow-right"
                class="w-full sm:w-auto"
              >
                Tetap Kumpulkan
              </Button>
            </>
          }
        >
          <div class="flex flex-col gap-3">
            <p class="font-body text-[16px] text-ink leading-relaxed">
              Kamu baru menjawab{' '}
              <strong id="modal-practice-answered" class="font-extrabold">
                0
              </strong>{' '}
              dari <strong class="font-extrabold">{totalCount}</strong> soal. Nomor berikut masih belum diisi:
            </p>
            <div
              id="modal-practice-empty-numbers"
              class="flex flex-wrap gap-2 p-3 rounded-badge bg-paper-soft border-2 border-ink"
            />
            <p class="text-[14px] font-semibold text-ink-soft">
              Soal yang kosong tidak mengurangi nilai soal lain, tapi sayang kalau dilewatkan begitu saja.
            </p>
          </div>
        </Modal>
      </div>
    ),
  });
}
