import type { PracticeResultPageProps } from '../../../fixtures/types';
import { formatLevelTitle } from '../../../lib/format';
import { Badge } from '../../../views/components/badge';
import { Button } from '../../../views/components/button';
import { Card } from '../../../views/components/card';
import { ExplanationCard } from '../../../views/components/explanation-card';
import { Icon } from '../../../views/components/icon';
import { StudentLayout } from '../../../views/layouts/student-layout';

export function PracticeResultPage({
  level,
  user,
  topicSlug,
  topicTitle,
  tryoutPromoSlug,
  summary,
  items,
}: PracticeResultPageProps): string {
  const backHref = topicSlug ? `/${level}/materi/${topicSlug}` : `/${level}`;

  return StudentLayout({
    title: `Hasil ${summary.quizTitle} - ${formatLevelTitle(level)}`,
    description: `Hasil dan pembahasan ${summary.quizTitle}`,
    navVariant: 'page',
    level,
    headerTitle: 'Hasil Latihan',
    backHref,
    user,
    containerMode: 'desktop',
    children: (
      <div class="flex flex-col gap-6 pb-8">
        {/* Kartu Skor Utama */}
        <Card padding="lg" class="flex flex-col gap-5">
          <div class="flex flex-col sm:flex-row items-center gap-5">
            <img
              src="/img/mascot-celebrate.svg"
              alt="Maskot buku tulis merayakan hasil latihan"
              class="w-24 h-24 shrink-0"
            />
            <div class="flex-1 text-center sm:text-left">
              <span class="label-section" safe>
                {topicTitle}
              </span>
              <h1 class="font-title font-extrabold text-[24px] sm:text-[28px] text-ink leading-tight mt-0.5" safe>
                {summary.quizTitle}
              </h1>
              <p class="text-[16px] font-semibold text-ink-soft mt-1.5" safe>
                {summary.encouragementText}
              </p>
            </div>
            <div class="px-6 py-4 rounded-card bg-stabilo border-2 border-ink shadow-solid flex flex-col items-center justify-center shrink-0 min-w-[136px]">
              <span class="text-[12px] font-extrabold uppercase tracking-wider text-ink">
                SKOR KAMU
              </span>
              <div class="font-title font-extrabold text-[44px] text-ink leading-none mt-1">
                {summary.score}
              </div>
              <span class="text-[13px] font-bold text-ink mt-1">dari 100</span>
            </div>
          </div>

          {/* Ringkasan Statistik */}
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t-2 border-ink/15">
            <div class="p-3 rounded-badge bg-correct-bg border-2 border-correct flex flex-col">
              <span class="text-[12px] font-extrabold uppercase tracking-wider text-correct">
                Benar
              </span>
              <span class="font-title font-extrabold text-[22px] text-correct">
                {summary.correctCount} Soal
              </span>
            </div>
            <div class="p-3 rounded-badge bg-wrong-bg border-2 border-wrong flex flex-col">
              <span class="text-[12px] font-extrabold uppercase tracking-wider text-wrong">
                Salah
              </span>
              <span class="font-title font-extrabold text-[22px] text-wrong">
                {summary.wrongCount} Soal
              </span>
            </div>
            <div class="p-3 rounded-badge bg-paper-soft border-2 border-ink flex flex-col">
              <span class="text-[12px] font-extrabold uppercase tracking-wider text-ink-soft">
                Kosong
              </span>
              <span class="font-title font-extrabold text-[22px] text-ink">
                {summary.unansweredCount} Soal
              </span>
            </div>
            <div class="p-3 rounded-badge bg-paper-soft border-2 border-ink flex flex-col">
              <span class="text-[12px] font-extrabold uppercase tracking-wider text-ink-soft">
                Durasi
              </span>
              <span class="font-title font-extrabold text-[18px] text-ink truncate" safe>
                {summary.durationLabel ?? 'Selesai'}
              </span>
            </div>
          </div>

          {/* Tombol Aksi Atas */}
          <div class="flex flex-col sm:flex-row gap-3 pt-1">
            <Button
              href={`/${level}/latihan/${summary.quizSlug}`}
              variant="secondary"
              fullWidth
              iconLeft="refresh"
            >
              Ulangi Latihan
            </Button>
            {tryoutPromoSlug ? (
              <Button
                href={`/${level}/tryout/${tryoutPromoSlug}`}
                variant="primary"
                fullWidth
                iconRight="arrow-right"
              >
                Coba TO Gratis
              </Button>
            ) : (
              <Button href={backHref} variant="primary" fullWidth iconRight="arrow-right">
                Kembali ke Materi
              </Button>
            )}
          </div>
        </Card>

        {/* Judul Seksi Pembahasan */}
        <div class="flex items-center justify-between gap-2 pt-2">
          <div class="flex items-center gap-2">
            <Icon name="book" class="w-5 h-5 text-ink" />
            <h2 class="font-title font-extrabold text-[22px] text-ink">
              Pembahasan Soal
            </h2>
          </div>
          <Badge variant="neutral" size="sm" pill>
            {summary.totalQuestions} Soal Total
          </Badge>
        </div>

        {/* Daftar Pembahasan Tiap Nomor */}
        <div class="flex flex-col gap-5">
          {items.map((item) => (
            <ExplanationCard item={item} />
          ))}
        </div>

        {/* Kartu Penutup */}
        <Card variant="soft" padding="md" class="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <p class="font-title font-bold text-[18px] text-ink">
              Mau lanjut latihan soal lainnya?
            </p>
            <p class="text-[14px] font-semibold text-ink-soft">
              Kamu bisa mengulang paket ini kapan saja atau kembali ke halaman materi.
            </p>
          </div>
          <div class="flex flex-col sm:flex-row gap-2.5 w-full sm:w-auto shrink-0">
            <Button href={backHref} variant="secondary">
              Ke Halaman Materi
            </Button>
            <Button href={`/${level}/latihan/${summary.quizSlug}`} variant="primary" iconLeft="refresh">
              Ulangi Latihan
            </Button>
          </div>
        </Card>
      </div>
    ),
  });
}
