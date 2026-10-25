import type { TryoutAttemptPageProps } from '../../../fixtures/types';
import { formatLevelTitle } from '../../../lib/format';
import { BottomSheet } from '../../../views/components/bottom-sheet';
import { Button } from '../../../views/components/button';
import { Card } from '../../../views/components/card';
import { Icon } from '../../../views/components/icon';
import { Modal } from '../../../views/components/modal';
import { QuestionCard } from '../../../views/components/question-card';
import {
  QuestionNumberGrid,
  type QuestionGridItemState,
} from '../../../views/components/question-number-grid';
import { Timer } from '../../../views/components/timer';
import { StudentLayout } from '../../../views/layouts/student-layout';

export function TryoutAttemptPage({
  level,
  user,
  quiz,
  questions,
  initialResponses,
  activeQuestionNumber,
  remainingSeconds,
  isDevMode,
}: TryoutAttemptPageProps): string {
  const totalCount = questions.length;
  const gridItems: QuestionGridItemState[] = questions.map((q) => ({
    number: q.number,
    questionId: q.id,
    isAnswered: Boolean(initialResponses[q.id]),
    isFlagged: false,
  }));

  return StudentLayout({
    title: `Kerjakan ${quiz.title} - ${formatLevelTitle(level)}`,
    description: `Halaman ujian ${quiz.title}`,
    navVariant: 'exam',
    level,
    headerTitle: quiz.title,
    backHref: `/${level}/tryout/${quiz.slug}`,
    user,
    rightSlot: <Timer id="tryout-timer" remainingSeconds={remainingSeconds} showDemoToggle={false} />,
    containerMode: 'cbt',
    hideFooter: true,
    scripts: ['/js/tryout.js'],
    demoBanner: isDevMode ? (
      <div class="flex items-center justify-between flex-wrap gap-2 text-[13px] font-bold text-ink">
        <span>Mode Demo UI Tryout (Timer tampilan saja):</span>
        <button
          type="button"
          data-timer-demo-urgent="tryout-timer"
          class="min-h-[36px] px-3 py-1 rounded-chip bg-card border-2 border-ink text-[12px] font-extrabold text-ink hover:bg-stabilo cursor-pointer"
        >
          Simulasikan Sisa Waktu 04:55
        </button>
      </div>
    ) : undefined,
    children: (
      <form
        id="tryout-attempt-form"
        method="post"
        action={`/${level}/tryout/${quiz.slug}/kumpulkan`}
        data-total-questions={String(totalCount)}
        data-active-number={String(activeQuestionNumber)}
        class="pb-6"
      >
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Kolom Kiri (8 kolom di Desktop): Satu Soal Aktif + Navigasi */}
          <div class="min-w-0 lg:col-span-8 flex flex-col gap-4">
            {/* Bar Info Soal Aktif & Status Tersimpan */}
            <div class="flex items-center justify-between flex-wrap gap-2">
              <div class="flex items-center gap-2">
                <span class="font-title font-extrabold text-[20px] text-ink" id="tryout-step-indicator">
                  Soal {activeQuestionNumber} dari {totalCount}
                </span>
              </div>
              <div class="flex items-center flex-wrap gap-2">
                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-chip bg-paper-soft border-2 border-ink text-[12px] font-extrabold text-ink-soft">
                  <span class="w-2 h-2 rounded-full bg-ink inline-block" />
                  <span id="tryout-autosave-label">Tersimpan otomatis</span>
                </span>
                {/* Tombol Buka Daftar Nomor di HP/Tablet */}
                <button
                  type="button"
                  id="btn-open-tryout-sheet"
                  class="lg:hidden min-h-[44px] px-3 py-1.5 rounded-badge bg-card border-2 border-ink shadow-solid-sm font-title font-bold text-[14px] text-ink inline-flex items-center gap-1.5 cursor-pointer pressable-sm"
                >
                  <Icon name="grid" class="w-4 h-4" />
                  <span>Daftar Soal</span>
                </button>
              </div>
            </div>

            {/* Daftar Kartu Soal (Hanya 1 yang tampil pada satu waktu, sisanya hidden) */}
            <div id="tryout-questions-wrapper">
              {questions.map((question) => (
                <QuestionCard
                  question={question}
                  selectedAnswer={initialResponses[question.id] ?? null}
                  mode="tryout"
                  showFlagButton={true}
                  isFlagged={false}
                  isHidden={question.number !== activeQuestionNumber}
                />
              ))}
            </div>

            {/* Bar Navigasi Bawah Soal (Sebelumnya / Berikutnya) */}
            <div class="grid grid-cols-2 sm:flex sm:items-center sm:justify-between gap-2.5 sm:p-4 sm:bg-card sm:border-2 sm:border-ink sm:rounded-card sm:shadow-solid">
              <Button
                id="btn-prev-question"
                type="button"
                variant="secondary"
                iconLeft="arrow-left"
                disabled={activeQuestionNumber <= 1}
                class="w-full sm:w-auto"
              >
                Sebelumnya
              </Button>

              <span
                id="tryout-mobile-answered-pill"
                class="hidden sm:inline-flex text-[14px] font-extrabold text-ink-soft"
              >
                0/{totalCount} terjawab
              </span>

              <Button
                id="btn-next-question"
                type="button"
                variant="primary"
                iconRight="arrow-right"
                class="w-full sm:w-auto"
              >
                Berikutnya
              </Button>
            </div>

            {/* Tombol Kumpulkan Khusus Layar HP/Tablet */}
            <div class="lg:hidden pt-1">
              <Button
                type="button"
                variant="secondary"
                fullWidth
                dataAction="open-submit-tryout"
              >
                Selesai dan Kumpulkan TO
              </Button>
            </div>
          </div>

          {/* Kolom Kanan (4 kolom di Desktop): Panel Nomor Soal Sticky */}
          <aside class="hidden lg:flex lg:col-span-4 flex-col gap-4 sticky top-[88px]">
            <Card padding="md" class="flex flex-col gap-4">
              <div class="flex items-center justify-between gap-2">
                <div>
                  <span class="label-section">Navigasi Ujian</span>
                  <h2 class="font-title font-extrabold text-[20px] text-ink">
                    Daftar Nomor Soal
                  </h2>
                </div>
                <span
                  id="tryout-desktop-answered-badge"
                  class="px-2.5 py-1 rounded-chip bg-paper-soft border-2 border-ink text-[12px] font-extrabold text-ink"
                >
                  0 / {totalCount}
                </span>
              </div>

              <div data-tryout-grid-panel="desktop">
                <QuestionNumberGrid items={gridItems} activeNumber={activeQuestionNumber} />
              </div>

              <div class="pt-2 border-t-2 border-ink/15">
                <Button
                  type="button"
                  variant="primary"
                  size="lg"
                  fullWidth
                  dataAction="open-submit-tryout"
                >
                  Selesai dan Kumpulkan
                </Button>
              </div>
            </Card>
          </aside>
        </div>

        {/* Bottom Sheet Daftar Nomor Soal (Khusus HP & Tablet) */}
        <BottomSheet
          id="sheet-tryout-numbers"
          title="Daftar Nomor Soal"
          subtitle="Ketuk nomor soal untuk langsung berpindah"
        >
          <div class="flex flex-col gap-5">
            <div data-tryout-grid-panel="mobile">
              <QuestionNumberGrid items={gridItems} activeNumber={activeQuestionNumber} />
            </div>

            <Button
              type="button"
              variant="primary"
              size="lg"
              fullWidth
              dataAction="open-submit-tryout"
            >
              Selesai dan Kumpulkan
            </Button>
          </div>
        </BottomSheet>

        {/* Modal Konfirmasi Pengumpulan TO */}
        <Modal
          id="modal-confirm-tryout"
          title="Kumpulkan Tryout Sekarang?"
          variant="confirm"
          iconVariant="warning"
          footer={
            <>
              <Button
                type="button"
                variant="secondary"
                dataAction="close-modal"
                dataTarget="modal-confirm-tryout"
                class="w-full sm:w-auto"
              >
                Kembali Cek Soal
              </Button>
              <Button
                id="btn-confirm-submit-tryout"
                type="button"
                variant="primary"
                iconRight="arrow-right"
                class="w-full sm:w-auto"
              >
                Ya, Kumpulkan TO
              </Button>
            </>
          }
        >
          <div class="flex flex-col gap-3">
            <p class="font-body text-[16px] text-ink leading-relaxed">
              Pastikan semua jawabanmu sudah diperiksa. Ingat, paket Tryout hanya bisa dikumpulkan{' '}
              <strong class="font-extrabold">1 kali</strong>.
            </p>

            <div class="grid grid-cols-3 gap-2 p-3 rounded-badge bg-paper-soft border-2 border-ink text-center">
              <div class="flex flex-col">
                <span class="text-[11px] font-extrabold uppercase text-ink-soft">Terjawab</span>
                <span id="modal-tryout-answered" class="font-title font-extrabold text-[22px] text-ink">
                  0
                </span>
              </div>
              <div class="flex flex-col">
                <span class="text-[11px] font-extrabold uppercase text-ink-soft">Kosong</span>
                <span id="modal-tryout-empty" class="font-title font-extrabold text-[22px] text-ink">
                  {totalCount}
                </span>
              </div>
              <div class="flex flex-col">
                <span class="text-[11px] font-extrabold uppercase text-ink-soft">Ragu-ragu</span>
                <span id="modal-tryout-flagged" class="font-title font-extrabold text-[22px] text-ink">
                  0
                </span>
              </div>
            </div>

            <div id="modal-tryout-warning-box" class="hidden p-3 rounded-badge bg-stabilo-soft border-2 border-ink text-[14px] font-bold text-ink">
              Masih ada nomor soal yang belum diisi atau ditandai ragu-ragu. Yakin ingin menyelesaikan ujian?
            </div>
          </div>
        </Modal>
      </form>
    ),
  });
}
