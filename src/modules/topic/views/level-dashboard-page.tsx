import type { LevelDashboardPageProps } from '../../../fixtures/types';
import { formatLevelTitle } from '../../../lib/format';
import { Badge } from '../../../views/components/badge';
import { Button } from '../../../views/components/button';
import { Card } from '../../../views/components/card';
import { Icon } from '../../../views/components/icon';
import { StudentLayout } from '../../../views/layouts/student-layout';

export function LevelDashboardPage({
  level,
  user,
  isDemoModeSwitchVisible,
  tryouts,
  elementGroups,
}: LevelDashboardPageProps): string {
  const levelLabel = formatLevelTitle(level);
  const isLoggedIn = user !== null;
  const sesiSuffix = isLoggedIn ? '?sesi=masuk' : '';

  const demoBanner = isDemoModeSwitchVisible ? (
    <div class="flex flex-wrap items-center justify-between gap-2 text-[13px] font-bold text-ink">
      <span>
        Mode Demo Dev: menampilkan versi <strong>{isLoggedIn ? 'Sudah Masuk (Raka)' : 'Tamu (Belum Masuk)'}</strong>
      </span>
      <div class="flex items-center gap-2">
        <a
          href={`/${level}?sesi=tamu`}
          class={`px-2.5 py-1 rounded-chip border-2 border-ink ${
            !isLoggedIn ? 'bg-stabilo text-ink' : 'bg-card text-ink-soft'
          }`}
        >
          Lihat Versi Tamu
        </a>
        <a
          href={`/${level}?sesi=masuk`}
          class={`px-2.5 py-1 rounded-chip border-2 border-ink ${
            isLoggedIn ? 'bg-stabilo text-ink' : 'bg-card text-ink-soft'
          }`}
        >
          Lihat Versi Masuk
        </a>
      </div>
    </div>
  ) : undefined;

  return StudentLayout({
    title: `${levelLabel} - Daftar Latihan & Tryout`,
    navVariant: 'page',
    level,
    headerTitle: levelLabel,
    backHref: '/',
    user,
    containerMode: 'desktop',
    demoBanner,
    children: (
      <div class="flex flex-col gap-7">
        {/* Top Greeting & Switch Level */}
        <div class="flex items-center justify-between gap-2 flex-wrap">
          <Badge variant={level === 'sd' ? 'orange' : 'blue'} size="md" pill>
            {levelLabel}
          </Badge>
          <a
            href={level === 'sd' ? `/smp${sesiSuffix}` : `/sd${sesiSuffix}`}
            class="min-h-[48px] inline-flex items-center gap-1 text-[14px] font-extrabold text-ink-soft hover:text-ink underline decoration-2 underline-offset-4"
          >
            <span>Ganti ke {level === 'sd' ? 'SMP Kelas 9' : 'SD Kelas 6'}</span>
            <Icon name="chevron-right" class="w-4 h-4" />
          </a>
        </div>

        {isLoggedIn ? (
          <Card class="flex items-center justify-between gap-4">
            <div class="flex flex-col gap-1">
              <span class="label-section">HALO, TEMAN BELAJAR</span>
              <h1 class="font-title font-extrabold text-[26px] sm:text-[30px] text-ink leading-tight">
                Semangat latihan, <span class="stabilo-highlight" safe>{user.displayName}</span>!
              </h1>
              <p class="text-[16px] text-ink-soft">
                Pilih tugas materi atau lanjutkan simulasi TO kamu hari ini.
              </p>
            </div>
            <img
              src="/img/mascot-wave.svg"
              alt="Maskot menyapa"
              class="w-20 h-20 sm:w-24 sm:h-24 object-contain shrink-0"
            />
          </Card>
        ) : (
          <div>
            <h1 class="font-title font-extrabold text-[28px] sm:text-[32px] text-ink leading-tight">
              Mau <span class="stabilo-highlight">latihan</span> apa hari ini?
            </h1>
            <p class="text-[16px] text-ink-soft mt-1">
              Semua paket latihan materi bisa langsung kamu kerjakan gratis tanpa perlu daftar dulu.
            </p>
          </div>
        )}

        {/* Section 1: TRYOUT */}
        <section class="flex flex-col gap-3">
          <div class="flex items-center justify-between px-1">
            <h2 class="label-section">SIMULASI TRYOUT (TO)</h2>
            <span class="text-[13px] font-bold text-ink-soft">1x kesempatan per akun</span>
          </div>

          <div class="flex flex-col gap-3.5">
            {tryouts.map((to) => (
              <Card class="flex flex-col gap-3.5">
                <div class="flex items-start justify-between gap-3">
                  <div class="flex flex-col gap-1.5">
                    <div class="flex items-center gap-2 flex-wrap">
                      <h3 class="font-title font-bold text-[20px] text-ink leading-snug" safe>
                        {to.title}
                      </h3>
                      {to.status === 'completed' ? (
                        <Badge variant="correct" pill icon="check-circle">
                          Selesai (Skor {to.lastScore})
                        </Badge>
                      ) : null}
                    </div>
                    <div class="flex flex-wrap items-center gap-2">
                      <Badge variant="neutral">{to.questionCount} soal</Badge>
                      <Badge variant="neutral" icon="clock">{to.durationMinutes} menit</Badge>
                    </div>
                  </div>
                  <Badge variant="purple" size="icon" icon="clock" />
                </div>

                <div class="pt-3 border-t-2 border-grid flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  {!isLoggedIn ? (
                    <span class="text-[14px] font-bold text-ink-soft">
                      Perlu daftar dulu sebelum mulai TO
                    </span>
                  ) : to.status === 'completed' ? (
                    <span class="text-[14px] font-bold text-correct">
                      Kamu sudah menyelesaikan TO ini
                    </span>
                  ) : (
                    <span class="text-[14px] font-bold text-ink-soft">
                      Siap dikerjakan sekarang
                    </span>
                  )}

                  {to.status === 'completed' ? (
                    <Button
                      href={`/${level}/tryout/${to.slug}/hasil${sesiSuffix}`}
                      variant="secondary"
                      iconRight="chevron-right"
                    >
                      Lihat Pembahasan
                    </Button>
                  ) : (
                    <Button
                      href={`/${level}/tryout/${to.slug}${sesiSuffix}`}
                      variant="primary"
                      iconRight="arrow-right"
                    >
                      Buka Lobi TO
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Section 2: LATIHAN PER MATERI (Classroom Task List Style) */}
        <section class="flex flex-col gap-4">
          <div class="flex items-center justify-between px-1">
            <h2 class="label-section">LATIHAN PER MATERI</h2>
            {!isLoggedIn ? (
              <Badge variant="correct" pill>Tanpa daftar</Badge>
            ) : null}
          </div>

          <div class="flex flex-col gap-6">
            {elementGroups.map(({ element, topics }) => (
              <div class="flex flex-col gap-2.5">
                <div class="flex items-center gap-2 px-1">
                  <Badge variant={element.badgeColor} size="md">
                    {element.name}
                  </Badge>
                  <span class="text-[13px] font-bold text-ink-soft">
                    {topics.length} materi
                  </span>
                </div>

                <div class="flex flex-col gap-3">
                  {topics.map((tp) => (
                    <Card
                      variant="interactive"
                      href={`/${level}/materi/${tp.topicSlug}${sesiSuffix}`}
                      class="flex items-center justify-between gap-3"
                    >
                      <div class="flex items-start gap-3 min-w-0">
                        <span
                          class={`w-11 h-11 rounded-badge border-2 border-ink flex items-center justify-center shrink-0 ${
                            tp.isCompleted ? 'bg-correct-bg text-correct' : 'bg-paper-soft text-ink'
                          }`}
                        >
                          <Icon name={tp.isCompleted ? 'check-circle' : 'book'} class="w-5 h-5" />
                        </span>
                        <div class="min-w-0">
                          <h3 class="font-title font-bold text-[18px] text-ink leading-snug" safe>
                            {tp.title}
                          </h3>
                          <div class="flex flex-wrap items-center gap-2 mt-1">
                            <span class="text-[14px] font-bold text-ink-soft">
                              {tp.practiceCount} paket ({tp.totalQuestions} soal)
                            </span>
                            {tp.isCompleted && typeof tp.bestScore === 'number' ? (
                              <Badge variant="correct" pill>
                                Selesai - Nilai {tp.bestScore}
                              </Badge>
                            ) : !isLoggedIn ? (
                              <span class="text-[12px] font-extrabold text-correct bg-correct-bg px-2 py-0.5 rounded-chip border border-correct">
                                Tanpa daftar
                              </span>
                            ) : (
                              <span class="text-[12px] font-bold text-ink-soft bg-paper-soft px-2 py-0.5 rounded-chip border border-ink/30">
                                Belum dikerjakan
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <span class="w-10 h-10 rounded-badge bg-paper border-2 border-ink flex items-center justify-center text-ink shrink-0">
                        <Icon name="chevron-right" class="w-5 h-5" />
                      </span>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Guest Registration Prompt */}
        {!isLoggedIn ? (
          <Card variant="dashed" padding="lg" class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div class="flex flex-col gap-1">
              <h3 class="font-title font-bold text-[20px] text-ink">
                Mau nilai latihanmu tersimpan dan ikut Tryout?
              </h3>
              <p class="text-[15px] text-ink-soft">
                Daftar akun gratis cuma pakai nama panggilan dan username, tanpa email dan tanpa nomor HP.
              </p>
            </div>
            <div class="flex items-center gap-2.5 w-full sm:w-auto shrink-0">
              <Button href="/daftar" variant="primary" fullWidth>
                Daftar Gratis
              </Button>
            </div>
          </Card>
        ) : null}
      </div>
    ),
  });
}
