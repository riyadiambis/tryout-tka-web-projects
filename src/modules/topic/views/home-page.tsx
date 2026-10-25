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
      <div class="flex flex-col gap-8 sm:gap-10">
        {/* Hero Section: Single card on mobile, 2 columns on desktop */}
        <Card padding="lg" class="relative overflow-hidden">
          <div class="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div class="md:col-span-7 flex flex-col gap-4">
              <div class="flex items-center gap-2 flex-wrap">
                <Badge variant="stabilo" size="md">
                  Sesuai kisi-kisi resmi TKA
                </Badge>
                <Badge variant="neutral" size="md">
                  Gratis Latihan &amp; Pembahasan
                </Badge>
              </div>

              <h1 class="font-title font-extrabold text-[30px] sm:text-[40px] text-ink leading-[1.18] tracking-tight">
                Ngeles dari <span class="stabilo-highlight">cara ribet</span>, bukan dari belajar.
              </h1>

              <p class="text-[16px] sm:text-[18px] text-ink-soft leading-relaxed">
                Teman latihan soal dan Tryout TKA Matematika untuk kamu yang duduk di SD Kelas 6 maupun SMP Kelas 9. Lengkap dengan pembahasan langkah demi langkah dan video YouTube Kak Riyadi.
              </p>

              <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
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
                  Channel Kak Riyadi
                </Button>
              </div>
            </div>

            <div class="md:col-span-5 flex flex-col items-center justify-center relative">
              <img
                src="/img/mascot-wave.svg"
                alt="Maskot Yuk Ngeles menyapa siswa"
                class="w-32 h-32 md:hidden object-contain"
              />
              <img
                src="/img/hero-notebook.svg"
                alt="Ilustrasi buku tulis matematika Yuk Ngeles"
                class="hidden md:block w-full max-w-[360px] h-auto object-contain"
              />
            </div>
          </div>
        </Card>

        {/* Pilih Jenjang */}
        <section id="pilih-jenjang" class="flex flex-col gap-3.5">
          <div class="flex items-center justify-between px-1">
            <h2 class="label-section">PILIH JENJANG KAMU</h2>
            <span class="text-[13px] font-bold text-ink-soft">TKA Matematika</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* SD Kelas 6 */}
            <Card variant="interactive" href="/sd" padding="lg" class="flex flex-col gap-4">
              <div class="flex items-start justify-between gap-3">
                <div class="flex items-center gap-3">
                  <Badge variant="orange" size="icon">
                    SD
                  </Badge>
                  <div>
                    <div class="flex items-center gap-2 flex-wrap">
                      <h3 class="font-title font-extrabold text-[22px] text-ink leading-tight">
                        SD Kelas 6
                      </h3>
                      <Badge variant="correct" pill>
                        Tersedia
                      </Badge>
                    </div>
                    <p class="text-[15px] text-ink-soft mt-0.5">
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
                    class="px-2.5 py-1 rounded-chip bg-paper border-2 border-ink text-[13px] font-bold text-ink"
                    safe
                  >
                    {name}
                  </span>
                ))}
              </div>
            </Card>

            {/* SMP Kelas 9 */}
            <Card variant="interactive" href="/smp" padding="lg" class="flex flex-col gap-4">
              <div class="flex items-start justify-between gap-3">
                <div class="flex items-center gap-3">
                  <Badge variant="blue" size="icon">
                    SMP
                  </Badge>
                  <div>
                    <div class="flex items-center gap-2 flex-wrap">
                      <h3 class="font-title font-extrabold text-[22px] text-ink leading-tight">
                        SMP Kelas 9
                      </h3>
                      <Badge variant="correct" pill>
                        Tersedia
                      </Badge>
                    </div>
                    <p class="text-[15px] text-ink-soft mt-0.5">
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
                    class="px-2.5 py-1 rounded-chip bg-paper border-2 border-ink text-[13px] font-bold text-ink"
                    safe
                  >
                    {name}
                  </span>
                ))}
              </div>
            </Card>
          </div>
        </section>

        {/* Kenapa di Sini? */}
        <section class="flex flex-col gap-3.5">
          <h2 class="label-section px-1">KENAPA BELAJAR DI SINI?</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card class="flex items-start gap-3.5">
              <Badge variant="orange" size="icon" icon="edit" />
              <div>
                <h3 class="font-title font-bold text-[19px] text-ink leading-snug">
                  Pembahasan tiap soal
                </h3>
                <p class="text-[15px] text-ink-soft mt-1 leading-relaxed">
                  Langkah demi langkah ditulis rapi, biar kamu benar-benar paham konsepnya, bukan cuma hafal rumus.
                </p>
              </div>
            </Card>

            <Card class="flex items-start gap-3.5">
              <Badge variant="blue" size="icon" icon="youtube" />
              <div>
                <h3 class="font-title font-bold text-[19px] text-ink leading-snug">
                  Video penjelasan YouTube
                </h3>
                <p class="text-[15px] text-ink-soft mt-1 leading-relaxed">
                  Tersedia tombol ke video pendek Shorts maupun menit konsep video panjang oleh Kak Riyadi.
                </p>
              </div>
            </Card>

            <Card class="flex items-start gap-3.5">
              <Badge variant="purple" size="icon" icon="clock" />
              <div>
                <h3 class="font-title font-bold text-[19px] text-ink leading-snug">
                  Tryout dengan timer
                </h3>
                <p class="text-[15px] text-ink-soft mt-1 leading-relaxed">
                  Biasakan mengatur waktu pengerjaan 3 bentuk soal persis seperti ujian TKA sesungguhnya.
                </p>
              </div>
            </Card>
          </div>
        </section>

        {/* Kartu Ajakan YouTube */}
        <Card variant="soft" padding="lg" class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div class="flex flex-col gap-1">
            <span class="label-section">BELAJAR BARENG KAK RIYADI</span>
            <h3 class="font-title font-bold text-[22px] text-ink">
              Tonton pembahasan santai di YouTube Riyadi Ofisharu
            </h3>
            <p class="text-[16px] text-ink-soft">
              Kebuka langsung di aplikasi YouTube HP kamu, hemat kuota dan gampang diulang kapan saja.
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
            Buka YouTube
          </Button>
        </Card>
      </div>
    ),
  });
}
