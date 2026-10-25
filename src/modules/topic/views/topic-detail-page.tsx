import type { TopicDetailPageProps } from '../../../fixtures/types';
import { formatLevelTitle } from '../../../lib/format';
import { Badge } from '../../../views/components/badge';
import { Button } from '../../../views/components/button';
import { Card } from '../../../views/components/card';
import { StudentLayout } from '../../../views/layouts/student-layout';

export function TopicDetailPage({
  level,
  user,
  topic,
  practices,
  featuredTryoutSlug,
}: TopicDetailPageProps): string {
  const levelLabel = formatLevelTitle(level);

  const titleWords = topic.title.split(' ');
  const firstWords = titleWords.slice(0, -1).join(' ');
  const lastWord = titleWords[titleWords.length - 1] ?? topic.title;

  return StudentLayout({
    title: `${topic.title} - ${levelLabel}`,
    navVariant: 'page',
    level,
    headerTitle: topic.title,
    backHref: `/${level}`,
    user,
    containerMode: 'desktop',
    children: (
      <div class="flex flex-col gap-6">
        {/* Breadcrumb & Element Badge */}
        <div class="flex flex-col gap-2">
          <nav aria-label="Breadcrumb" class="label-section flex items-center gap-1.5 flex-wrap">
            <a href={`/${level}`} class="hover:text-ink underline-offset-4 hover:underline">
              {levelLabel}
            </a>
            <span>&gt;</span>
            <span safe>{topic.elementName}</span>
          </nav>

          <div>
            <Badge variant={topic.elementBadgeColor} size="md" pill>
              {topic.elementName}
            </Badge>
          </div>

          <h1 class="font-title font-extrabold text-[28px] sm:text-[34px] text-ink leading-tight mt-1">
            {firstWords ? <span safe>{`${firstWords} `}</span> : null}
            <span class="stabilo-highlight" safe>{lastWord}</span>
          </h1>
        </div>

        {/* Description Card */}
        <Card>
          <p class="text-[16px] sm:text-[17px] text-ink leading-relaxed" safe>
            {topic.description}
          </p>
        </Card>

        {/* Conditional External YouTube Topic Video Button (Rule 21 & 22: Never embedded, only rendered if filled) */}
        {topic.videoUrl ? (
          <div class="flex flex-col gap-1.5">
            <Button
              href={topic.videoUrl}
              external
              variant="secondary"
              size="lg"
              fullWidth
              iconLeft="youtube"
              iconRight="external-link"
            >
              Tonton Materi di YouTube
            </Button>
            <p class="text-[13px] font-bold text-ink-soft text-center">
              Kebuka di tab baru atau langsung di aplikasi YouTube oleh Kak Riyadi
            </p>
          </div>
        ) : null}

        {/* Practice Packages List */}
        <section class="flex flex-col gap-3.5">
          <div class="flex items-center justify-between px-1">
            <h2 class="label-section">DAFTAR PAKET LATIHAN</h2>
            <span class="text-[13px] font-bold text-ink-soft">
              {practices.length} paket tersedia
            </span>
          </div>

          <div class="flex flex-col gap-4">
            {practices.map((pkg) => (
              <Card padding="lg" class="flex flex-col gap-4">
                <div class="flex items-start justify-between gap-3 flex-wrap">
                  <div>
                    <h3 class="font-title font-bold text-[21px] text-ink leading-snug" safe>
                      {pkg.title}
                    </h3>
                    <p class="text-[15px] text-ink-soft mt-1" safe>
                      {pkg.description}
                    </p>
                  </div>
                  {typeof pkg.lastScore === 'number' ? (
                    <Badge variant="correct" pill icon="check-circle">
                      Nilai Terakhir: {pkg.lastScore}
                    </Badge>
                  ) : null}
                </div>

                <div class="flex flex-wrap items-center gap-2">
                  <Badge variant="neutral">{pkg.questionCount} soal</Badge>
                  <Badge variant="neutral" icon="clock">
                    Sekitar {pkg.estimatedMinutes} menit
                  </Badge>
                  <Badge variant="correct" pill>
                    Tanpa daftar
                  </Badge>
                </div>

                <Button
                  href={`/${level}/latihan/${pkg.slug}`}
                  variant="primary"
                  size="lg"
                  fullWidth
                  iconRight="arrow-right"
                >
                  Mulai Latihan
                </Button>
              </Card>
            ))}
          </div>
        </section>

        {/* Bottom Promo to Regular Tryout (Audit Fix #1: Tryout Rutin) */}
        {featuredTryoutSlug ? (
          <Card
            variant="dashed"
            class="bg-stabilo-soft/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
          >
            <div>
              <h3 class="font-title font-bold text-[19px] text-ink">
                Sudah paham materinya? Yuk uji kemampuanmu!
              </h3>
              <p class="text-[15px] text-ink-soft">
                Kerjakan simulasi Tryout TKA lintas materi lengkap dengan timer hitung mundur.
              </p>
            </div>
            <Button
              href={`/${level}/tryout/${featuredTryoutSlug}`}
              variant="secondary"
              iconRight="chevron-right"
              class="shrink-0 w-full sm:w-auto"
            >
              Coba TO Gratis
            </Button>
          </Card>
        ) : null}
      </div>
    ),
  });
}
