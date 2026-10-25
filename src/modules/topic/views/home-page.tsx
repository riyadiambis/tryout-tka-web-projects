import { SITE_CONFIG } from '../../../config/site';
import type { HomePageProps } from '../../../fixtures/types';
import { Badge } from '../../../views/components/badge';
import { Button } from '../../../views/components/button';
import { Card } from '../../../views/components/card';
import { Icon } from '../../../views/components/icon';
import { StudentLayout } from '../../../views/layouts/student-layout';

export function HomePage({
  user,
  sdElements,
  smpElements,
  youtubeChannelUrl,
}: HomePageProps): string {
  return StudentLayout({
    title: 'Beranda - Yuk Ngeles',
    navVariant: 'home',
    user,
    containerMode: 'beranda',
    children: (
      <div class="flex flex-col gap-12 sm:gap-14 md:gap-16">
        {/* Hero Section: Single card on mobile, 2 columns with generous vertical room on desktop */}
        <section id="hero">
          <Card padding="none" class="relative overflow-hidden p-6 sm:p-8 md:p-10 lg:p-12">
            <div class="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 items-center">
              {/* Left Column: Headline, subtext, actions */}
              <div class="md:col-span-7 flex flex-col gap-5 sm:gap-6">
                <div class="flex items-center gap-2 flex-wrap">
                  <Badge variant="neutral" size="md">
                    Gratis Latihan & Pembahasan
                  </Badge>
                </div>

                <h1 class="font-title font-extrabold text-ink leading-[1.1] tracking-tight text-[2rem] md:text-[2.5rem] lg:text-[3rem]">
                  Ngeles dari <span class="stabilo-highlight">cara ribet</span>, bukan dari belajar.
                </h1>

                <p class="max-w-[34rem] font-body text-[16px] sm:text-[18px] lg:text-[19px] text-ink-soft leading-relaxed">
                  Latihan soal gratis dan pembahasan lengkap untuk TKA Matematika SD dan SMP.
                </p>

                <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                  <Button href="#pilih-jenjang" variant="primary" size="lg" iconRight="arrow-right">
                    Mulai Belajar Sekarang
                  </Button>
                  <Button
                    href={youtubeChannelUrl}
                    external
                    variant="secondary"
                    size="lg"
                    iconLeft="youtube"
                    iconRight="external-link"
                  >
                    Channel YouTube
                  </Button>
                </div>
              </div>

              {/* Right Column: Mascot wrapped as a sticker card */}
              <div class="md:col-span-5 flex flex-col items-center justify-center relative mt-4 md:mt-0">
                <div class="relative inline-block border-[2.5px] border-ink rounded-card shadow-solid -rotate-2 bg-paper-soft p-2 sm:p-2.5 mx-auto max-w-[260px] sm:max-w-[280px] md:max-w-[360px] lg:max-w-[390px]">
                  <img
                    src="/img/maskot-hero.png?v=2"
                    alt="Maskot Yuk Ngeles belajar matematika"
                    class="w-full h-auto object-contain block rounded-badge"
                  />
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Pilih Jenjang Section */}
        <section id="pilih-jenjang" class="flex flex-col">
          <div class="flex items-center justify-between gap-2 px-1 mb-4">
            <h2 class="label-section">PILIH JENJANG KAMU</h2>
            <span class="text-[13px] sm:text-[14px] font-bold text-ink-soft shrink-0">TKA Matematika</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {/* SD Kelas 6 */}
            <Card variant="interactive" href="/sd" padding="lg" class="h-full flex flex-col justify-between gap-5">
              <div class="flex items-start justify-between gap-3">
                <div class="flex items-center gap-3.5">
                  <span class="w-[52px] h-[46px] rounded-badge bg-badge-orange text-white border-2 border-ink shadow-solid-sm flex items-center justify-center font-title font-extrabold text-[16px] shrink-0">
                    SD
                  </span>
                  <div>
                    <div class="flex items-center gap-2 flex-wrap">
                      <h3 class="font-title font-extrabold text-[22px] sm:text-[24px] text-ink leading-tight">
                        SD Kelas 6
                      </h3>
                      <Badge variant="correct" pill>
                        Tersedia
                      </Badge>
                    </div>
                    <p class="text-[15px] sm:text-[16px] text-ink-soft mt-1">
                      Latihan per materi dan simulasi TO TKA SD
                    </p>
                  </div>
                </div>
                <span class="w-11 h-11 rounded-badge bg-paper border-2 border-ink flex items-center justify-center text-ink shrink-0">
                  <Icon name="chevron-right" class="w-5 h-5" />
                </span>
              </div>

              <div class="mt-auto pt-3 flex flex-wrap gap-2">
                {sdElements.map((name) => (
                  <span
                    class="px-3 py-1.5 rounded-chip bg-paper border-2 border-ink text-[14px] font-bold text-ink"
                    safe
                  >
                    {name}
                  </span>
                ))}
              </div>
            </Card>

            {/* SMP Kelas 9 */}
            <Card variant="interactive" href="/smp" padding="lg" class="h-full flex flex-col justify-between gap-5">
              <div class="flex items-start justify-between gap-3">
                <div class="flex items-center gap-3.5">
                  <span class="w-[52px] h-[46px] rounded-badge bg-badge-blue text-white border-2 border-ink shadow-solid-sm flex items-center justify-center font-title font-extrabold text-[16px] shrink-0">
                    SMP
                  </span>
                  <div>
                    <div class="flex items-center gap-2 flex-wrap">
                      <h3 class="font-title font-extrabold text-[22px] sm:text-[24px] text-ink leading-tight">
                        SMP Kelas 9
                      </h3>
                      <Badge variant="correct" pill>
                        Tersedia
                      </Badge>
                    </div>
                    <p class="text-[15px] sm:text-[16px] text-ink-soft mt-1">
                      Latihan per materi dan simulasi TO TKA SMP
                    </p>
                  </div>
                </div>
                <span class="w-11 h-11 rounded-badge bg-paper border-2 border-ink flex items-center justify-center text-ink shrink-0">
                  <Icon name="chevron-right" class="w-5 h-5" />
                </span>
              </div>

              <div class="mt-auto pt-3 flex flex-wrap gap-2">
                {smpElements.map((name) => (
                  <span
                    class="px-3 py-1.5 rounded-chip bg-paper border-2 border-ink text-[14px] font-bold text-ink"
                    safe
                  >
                    {name}
                  </span>
                ))}
              </div>
            </Card>
          </div>
        </section>

        {/* Kenapa Belajar di Sini? Section */}
        <section id="fitur" class="flex flex-col">
          <div class="px-1 mb-4">
            <h2 class="label-section">KENAPA BELAJAR DI SINI?</h2>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card class="flex items-start gap-4 p-5">
              <Badge variant="orange" size="icon" icon="edit" />
              <div>
                <h3 class="font-title font-bold text-[20px] text-ink leading-snug">
                  Pembahasan tiap soal
                </h3>
                <p class="text-[15px] sm:text-[16px] text-ink-soft mt-1.5 leading-relaxed">
                  Langkah demi langkah, biar kamu paham, bukan cuma hafal.
                </p>
              </div>
            </Card>

            <Card class="flex items-start gap-4 p-5">
              <Badge variant="blue" size="icon" icon="youtube" />
              <div>
                <h3 class="font-title font-bold text-[20px] text-ink leading-snug">
                  Video penjelasan YouTube
                </h3>
                <p class="text-[15px] sm:text-[16px] text-ink-soft mt-1.5 leading-relaxed">
                  Konsep dan trik cepat dijelasin langsung, bisa ditonton ulang kapan aja.
                </p>
              </div>
            </Card>

            <Card class="flex items-start gap-4 p-5">
              <Badge variant="purple" size="icon" icon="clock" />
              <div>
                <h3 class="font-title font-bold text-[20px] text-ink leading-snug">
                  Tryout dengan timer
                </h3>
                <p class="text-[15px] sm:text-[16px] text-ink-soft mt-1.5 leading-relaxed">
                  Latihan ngatur waktu kayak ujian beneran.
                </p>
              </div>
            </Card>
          </div>
        </section>

        {/* Kartu Ajakan YouTube Section */}
        <section id="youtube-cta">
          <Card variant="soft" padding="lg" class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 p-6 sm:p-8">
            <div class="flex flex-col gap-1.5">
              <span class="label-section">CHANNEL YOUTUBE</span>
              <h3 class="font-title font-bold text-[22px] sm:text-[24px] text-ink">
                {`Belajar bareng ${SITE_CONFIG.youtube.channelName} (${SITE_CONFIG.youtube.handle})`}
              </h3>
              <p class="text-[16px] sm:text-[17px] text-ink-soft">
                Video materi dan pembahasan soal TKA Matematika.
              </p>
            </div>
            <Button
              href={youtubeChannelUrl}
              external
              variant="secondary"
              iconLeft="youtube"
              iconRight="external-link"
              class="shrink-0"
            >
              {SITE_CONFIG.youtube.buttonLabel}
            </Button>
          </Card>
        </section>
      </div>
    ),
  });
}
