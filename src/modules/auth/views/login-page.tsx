import type { AuthPageProps } from '../../../fixtures/types';
import { Button } from '../../../views/components/button';
import { Card } from '../../../views/components/card';
import { Icon } from '../../../views/components/icon';
import { Input } from '../../../views/components/input';
import { StudentLayout } from '../../../views/layouts/student-layout';

export function LoginPage({
  returnTo = '',
  errorMessage,
  fieldErrors = {},
  defaultValues = {},
  supportWhatsappUrl,
}: AuthPageProps): string {
  const registerHref = returnTo ? `/daftar?returnTo=${encodeURIComponent(returnTo)}` : '/daftar';

  return StudentLayout({
    title: 'Masuk Akun Siswa',
    description: 'Masuk ke akun Yuk Ngeles untuk mengerjakan Tryout TKA Matematika.',
    navVariant: 'page',
    headerTitle: 'Masuk Akun',
    backHref: '/',
    containerMode: 'desktop',
    scripts: ['/js/auth.js'],
    children: (
      <div class="flex flex-col gap-5 pb-8">
        {/* Switcher Tab Daftar / Masuk */}
        <div class="grid grid-cols-2 gap-2 p-1.5 rounded-card bg-paper-soft border-2 border-ink">
          <a
            href={registerHref}
            class="min-h-[44px] rounded-badge font-title font-bold text-[16px] text-ink-soft hover:text-ink hover:bg-card flex items-center justify-center"
          >
            Daftar Baru
          </a>
          <span class="min-h-[44px] rounded-badge bg-stabilo border-2 border-ink shadow-solid-sm font-title font-extrabold text-[16px] text-ink flex items-center justify-center">
            Masuk Akun
          </span>
        </div>

        {/* Kartu Buku Tulis Berlubang Binder */}
        <Card padding="lg" class="relative md:pl-12 overflow-hidden">
          <div
            aria-hidden="true"
            class="hidden md:flex flex-col justify-around items-center absolute left-0 top-0 bottom-0 w-9 bg-paper-soft border-r-2 border-dashed border-line py-8"
          >
            <span class="w-3.5 h-3.5 rounded-full bg-paper border-2 border-ink" />
            <span class="w-3.5 h-3.5 rounded-full bg-paper border-2 border-ink" />
            <span class="w-3.5 h-3.5 rounded-full bg-paper border-2 border-ink" />
          </div>

          <div class="flex flex-col gap-4">
            <div>
              <span class="label-section">Selamat Datang Kembali</span>
              <h1 class="font-title font-extrabold text-[26px] text-ink leading-tight mt-0.5">
                Yuk <span class="stabilo-highlight">Masuk</span> Dulu
              </h1>
              <p class="text-[15px] font-semibold text-ink-soft mt-1">
                Masukkan username dan password akun belajarmu untuk lanjut mengerjakan soal.
              </p>
            </div>

            {errorMessage ? (
              <div
                role="alert"
                class="p-3.5 rounded-badge bg-wrong-bg border-2 border-wrong text-wrong font-body font-bold text-[15px] flex items-start gap-2.5"
              >
                <Icon name="warning" class="w-5 h-5 shrink-0 mt-0.5" />
                <span safe>{errorMessage}</span>
              </div>
            ) : null}

            <form method="post" action="/masuk" class="flex flex-col gap-4 mt-1" novalidate>
              {returnTo ? <input type="hidden" name="returnTo" value={returnTo} /> : null}

              <Input
                id="login-username"
                name="username"
                label="Username"
                placeholder="Username kamu"
                value={defaultValues.username ?? ''}
                required
                iconLeft="user"
                error={fieldErrors.username}
              />

              <Input
                id="login-password"
                name="password"
                type="password"
                label="Password"
                placeholder="Masukkan password"
                required
                iconLeft="lock"
                error={fieldErrors.password}
              />

              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                iconRight="arrow-right"
                class="mt-1"
              >
                Masuk
              </Button>
            </form>
          </div>
        </Card>

        {/* Bantuan Lupa Password via WhatsApp Admin */}
        <Card variant="soft" padding="md" class="flex items-center justify-between gap-3">
          <div class="flex items-center gap-3 min-w-0">
            <span class="w-10 h-10 rounded-badge bg-badge-green border-2 border-ink flex items-center justify-center text-white shrink-0">
              <Icon name="whatsapp" class="w-5 h-5" />
            </span>
            <p class="text-[14px] font-bold text-ink leading-snug">
              Lupa password? Hubungi admin lewat WhatsApp untuk dibantu reset.
            </p>
          </div>
          <Button
            href={supportWhatsappUrl}
            external
            variant="secondary"
            size="sm"
            iconRight="external-link"
            class="shrink-0"
          >
            Bantuan
          </Button>
        </Card>

        {/* Tautan ke Daftar */}
        <p class="text-center text-[16px] font-semibold text-ink">
          Belum punya akun?{' '}
          <a
            href={registerHref}
            class="font-extrabold underline decoration-2 underline-offset-4 hover:text-badge-blue"
          >
            Daftar dulu
          </a>
        </p>

        {/* Catatan Mode Demo untuk Uji Error */}
        <div class="p-3 rounded-badge bg-paper-soft border-2 border-ink/30 text-center text-[13px] font-semibold text-ink-soft">
          Uji tampilan error:{' '}
          <a href="/masuk?error=kredensial_salah" class="underline font-bold text-ink">
            Password salah
          </a>{' '}
          |{' '}
          <a href="/masuk?error=terlalu_banyak" class="underline font-bold text-ink">
            Batas percobaan
          </a>
        </div>
      </div>
    ),
  });
}
