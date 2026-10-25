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
      <div class="flex flex-col gap-10 md:gap-14 lg:gap-16">
        {/* Hero Section: Single card on mobile, 2 columns with generous vertical room on desktop */}
        <Card padding="none" class="relative overflow-hidden p-6 sm:p-8 md:p-10 lg:p-12">
          <div class="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Column: Headline, subtext, actions */}
            <div class="md:col-span-7 flex flex-col gap-5 sm:gap-6">
              <div class="flex items-center gap-2 flex-wrap">
                <Badge variant="neutral" size="md">
                  Gratis Latihan & Pembahasan
                </Badge>
              </div>

              <h1 class="font-title font-extrabold text-[32px] sm:text-[42px] lg:text-[46px] text-ink leading-[1.16] tracking-tight">
                Ngeles dari <span class="stabilo-highlight">cara ribet</span>, bukan dari belajar.
              </h1>

              <p class="text-[16px] sm:text-[18px] lg:text-[19px] text-ink-soft leading-relaxed">
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

            {/* Right Column: Large mascot hero image */}
            <div class="md:col-span-5 flex flex-col items-center justify-center relative">
              <img
                src="/img/maskot-hero.png"
                alt="Maskot Yuk Ngeles belajar matematika"
                class="w-full max-w-[280px] sm:max-w-[340px] md:max-w-[420px] lg:max-w-[460px] h-auto object-contain drop-shadow-md mx-auto"
              />
            </div>
          </div>
        </Card>

        {/* Pilih Jenjang */}
        <section id="pilih-jenjang" class="flex flex-col gap-4">
          <div class="flex items-center justify-between px-1">
            <h2 class="label-section">PILIH JENJANG KAMU</h2>
            <span class="text-[14px] font-bold text-ink-soft">TKA Matematika</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* SD Kelas 6 */}
            <Card variant="interactive" href="/sd" padding="lg" class="flex flex-col gap-5">
              <div class="flex items-start justify-between gap-3">
                <div class="flex items-center gap-3.5">
                  <Badge variant="orange" size="icon">
                    SD
                  </Badge>
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

              <div class="flex flex-wrap gap-2 pt-1">
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
            <Card variant="interactive" href="/smp" padding="lg" class="flex flex-col gap-5">
              <div class="flex items-start justify-between gap-3">
                <div class="flex items-center gap-3.5">
                  <Badge variant="blue" size="icon">
                    SMP
                  </Badge>
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

              <div class="flex flex-wrap gap-2 pt-1">
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

        {/* Kenapa Belajar di Sini? */}
        <section class="flex flex-col gap-4">
          <h2 class="label-section px-1">KENAPA BELAJAR DI SINI?</h2>
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

        {/* Kartu Ajakan YouTube */}
        <Card variant="soft" padding="lg" class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 p-6 sm:p-8">
          <div class="flex flex-col gap-1.5">
            <span class="label-section">BELAJAR BARENG YUK NGELES</span>
            <h3 class="font-title font-bold text-[22px] sm:text-[24px] text-ink">
              Belajar bareng Yuk Ngeles (@yukngeles)
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
            Channel YouTube
          </Button>
        </Card>
      </div>
    ),
  });
}
