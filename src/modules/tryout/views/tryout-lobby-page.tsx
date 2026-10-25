import type { TryoutLobbyPageProps } from '../../../fixtures/types';
import { formatLevelTitle } from '../../../lib/format';
import { Badge } from '../../../views/components/badge';
import { Button } from '../../../views/components/button';
import { Card } from '../../../views/components/card';
import { Icon } from '../../../views/components/icon';
import { StudentLayout } from '../../../views/layouts/student-layout';

export function TryoutLobbyPage({
  level,
  user,
  quiz,
  rules,
  hasCompletedAttempt,
}: TryoutLobbyPageProps): string {
  const durationMinutes = quiz.durationMinutes ?? 30;

  return StudentLayout({
    title: `${quiz.title} - ${formatLevelTitle(level)}`,
    description: `Lobi persiapan ${quiz.title}`,
    navVariant: 'page',
    level,
    headerTitle: 'Lobi Tryout',
    backHref: `/${level}`,
    user,
    containerMode: 'desktop',
    children: (
      <div class="flex flex-col gap-6 pb-8">
        {/* Kartu Informasi Paket TO */}
        <Card padding="lg" class="flex flex-col gap-5">
          <div class="flex items-start justify-between flex-wrap gap-3">
            <div class="flex items-center gap-3">
              <span
                class={`w-12 h-12 rounded-badge border-2 border-ink flex items-center justify-center text-white shrink-0 ${
                  level === 'sd' ? 'bg-badge-orange' : 'bg-badge-blue'
                }`}
              >
                <Icon name="clock" class="w-6 h-6" />
              </span>
              <div>
                <span class="label-section">Simulasi Ujian TKA</span>
                <h1 class="font-title font-extrabold text-[24px] sm:text-[28px] text-ink leading-tight mt-0.5" safe>
                  {quiz.title}
                </h1>
              </div>
            </div>
            <Badge variant={level === 'sd' ? 'orange' : 'blue'} size="md">
              {formatLevelTitle(level)}
            </Badge>
          </div>

          <p class="text-[16px] font-semibold text-ink-soft leading-relaxed">
            Soal campuran lintas elemen sesuai kisi-kisi resmi TKA Matematika. Kerjakan dengan tenang seperti ujian sungguhan ya!
          </p>

          {/* 3 Kotak Info Utama */}
          <div class="grid grid-cols-3 gap-2.5 sm:gap-4">
            <div class="p-3 sm:p-4 rounded-badge bg-paper-soft border-2 border-ink flex flex-col items-center text-center">
              <span class="text-[11px] sm:text-[12px] font-extrabold uppercase tracking-wider text-ink-soft">
                Jumlah
              </span>
              <span class="font-title font-extrabold text-[20px] sm:text-[24px] text-ink mt-0.5">
                {quiz.questionCount} Soal
              </span>
            </div>
            <div class="p-3 sm:p-4 rounded-badge bg-paper-soft border-2 border-ink flex flex-col items-center text-center">
              <span class="text-[11px] sm:text-[12px] font-extrabold uppercase tracking-wider text-ink-soft">
                Durasi
              </span>
              <span class="font-title font-extrabold text-[20px] sm:text-[24px] text-ink mt-0.5">
                {durationMinutes} Menit
              </span>
            </div>
            <div class="p-3 sm:p-4 rounded-badge bg-stabilo-soft border-2 border-ink flex flex-col items-center text-center">
              <span class="text-[11px] sm:text-[12px] font-extrabold uppercase tracking-wider text-ink">
                Kesempatan
              </span>
              <span class="font-title font-extrabold text-[20px] sm:text-[24px] text-ink mt-0.5">
                1 Kali
              </span>
            </div>
          </div>
        </Card>

        {/* Kartu Petunjuk & Aturan Pengerjaan */}
        <Card padding="lg" class="flex flex-col gap-4">
          <div>
            <span class="label-section">Petunjuk Pengerjaan</span>
            <h2 class="font-title font-extrabold text-[22px] text-ink mt-0.5">
              Aturan dan Petunjuk
            </h2>
          </div>

          <ol class="flex flex-col gap-3">
            {rules.map((ruleText, idx) => (
              <li class="flex items-start gap-3 p-3.5 rounded-badge bg-paper-soft border-2 border-ink">
                <span class="w-7 h-7 rounded-full bg-ink text-white font-title font-extrabold text-[15px] flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <p class="font-body font-semibold text-[16px] text-ink leading-snug flex-1" safe>
                  {ruleText}
                </p>
              </li>
            ))}
          </ol>

          <div class="p-3.5 rounded-badge bg-stabilo-soft border-2 border-ink flex items-start gap-2.5">
            <Icon name="sparkles" class="w-5 h-5 text-ink shrink-0 mt-0.5" />
            <p class="text-[15px] font-bold text-ink leading-snug">
              Pastikan koneksi internetmu stabil dan cari tempat belajar yang tenang ya, biar kamu makin fokus!
            </p>
          </div>
        </Card>

        {/* Catatan Sesi Akun */}
        {!user ? (
          <Card variant="soft" padding="md" class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div class="flex items-start gap-2.5">
              <Icon name="info" class="w-5 h-5 text-ink shrink-0 mt-0.5" />
              <p class="text-[15px] font-semibold text-ink">
                Untuk menyimpan nilai Tryout ke akunmu, jangan lupa masuk dulu sebelum ujian dimulai.
              </p>
            </div>
            <Button
              href={`/masuk?returnTo=/${level}/tryout/${quiz.slug}`}
              variant="secondary"
              size="sm"
              class="shrink-0"
            >
              Masuk Akun
            </Button>
          </Card>
        ) : null}

        {/* Aksi Utama Mulai TO */}
        {hasCompletedAttempt ? (
          <div class="flex flex-col gap-3">
            <Button
              href={`/${level}/tryout/${quiz.slug}/hasil`}
              variant="primary"
              size="lg"
              fullWidth
              iconRight="arrow-right"
            >
              Lihat Hasil dan Pembahasan TO
            </Button>
            <p class="text-center text-[14px] font-semibold text-ink-soft">
              Kamu sudah menggunakan 1 kali kesempatan pengerjaan untuk paket TO ini.
            </p>
          </div>
        ) : (
          <div class="flex flex-col gap-3">
            <Button
              id="btn-mulai-to"
              href={`/${level}/tryout/${quiz.slug}/kerjakan`}
              variant="primary"
              size="lg"
              fullWidth
              iconRight="arrow-right"
            >
              Mulai TO
            </Button>
            <p class="text-center text-[14px] font-semibold text-ink-soft flex items-center justify-center gap-1.5">
              <Icon name="info" class="w-4 h-4 shrink-0" />
              <span>Hasil skor dan pembahasan lengkap langsung terbuka setelah kamu mengumpulkan TO.</span>
            </p>
          </div>
        )}
      </div>
    ),
  });
}
