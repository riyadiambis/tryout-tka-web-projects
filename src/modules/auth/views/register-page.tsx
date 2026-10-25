import type { AuthPageProps } from '../../../fixtures/types';
import { Button } from '../../../views/components/button';
import { Card } from '../../../views/components/card';
import { Checkbox } from '../../../views/components/checkbox';
import { Icon } from '../../../views/components/icon';
import { Input } from '../../../views/components/input';
import { StudentLayout } from '../../../views/layouts/student-layout';

export function RegisterPage({
  returnTo = '',
  errorMessage,
  fieldErrors = {},
  defaultValues = {},
}: AuthPageProps): string {
  const loginHref = returnTo ? `/masuk?returnTo=${encodeURIComponent(returnTo)}` : '/masuk';

  return StudentLayout({
    title: 'Daftar Akun Siswa',
    description: 'Buat akun gratis di Yuk Ngeles biar nilai Tryout TKA kamu tersimpan.',
    navVariant: 'page',
    headerTitle: 'Daftar Akun',
    backHref: '/',
    containerMode: 'desktop',
    scripts: ['/js/auth.js'],
    children: (
      <div class="flex flex-col gap-5 pb-8">
        {/* Switcher Tab Daftar / Masuk */}
        <div class="grid grid-cols-2 gap-2 p-1.5 rounded-card bg-paper-soft border-2 border-ink">
          <span class="min-h-[44px] rounded-badge bg-stabilo border-2 border-ink shadow-solid-sm font-title font-extrabold text-[16px] text-ink flex items-center justify-center">
            Daftar Baru
          </span>
          <a
            href={loginHref}
            class="min-h-[44px] rounded-badge font-title font-bold text-[16px] text-ink-soft hover:text-ink hover:bg-card flex items-center justify-center"
          >
            Masuk Akun
          </a>
        </div>

        {/* Kartu Buku Tulis Berlubang Binder */}
        <Card padding="lg" class="relative md:pl-12 overflow-hidden">
          {/* Aksen Lubang Binder di Sisi Kiri (Tampil di layar agak lega) */}
          <div
            aria-hidden="true"
            class="hidden md:flex flex-col justify-around items-center absolute left-0 top-0 bottom-0 w-9 bg-paper-soft border-r-2 border-dashed border-line py-8"
          >
            <span class="w-3.5 h-3.5 rounded-full bg-paper border-2 border-ink" />
            <span class="w-3.5 h-3.5 rounded-full bg-paper border-2 border-ink" />
            <span class="w-3.5 h-3.5 rounded-full bg-paper border-2 border-ink" />
            <span class="w-3.5 h-3.5 rounded-full bg-paper border-2 border-ink" />
          </div>

          <div class="flex flex-col gap-4">
            <div>
              <span class="label-section">Gratis Selamanya untuk Latihan</span>
              <h1 class="font-title font-extrabold text-[26px] text-ink leading-tight mt-0.5">
                Bikin <span class="stabilo-highlight">Akun</span> Belajar
              </h1>
              <p class="text-[15px] font-semibold text-ink-soft mt-1">
                Biar nilai Tryout TKA dan riwayat latihan kamu tersimpan rapi tanpa perlu email atau nomor HP.
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

            <form method="post" action="/daftar" class="flex flex-col gap-4 mt-1" novalidate>
              {returnTo ? <input type="hidden" name="returnTo" value={returnTo} /> : null}

              <Input
                id="reg-display-name"
                name="displayName"
                label="Nama Panggilan"
                placeholder="Contoh: Raka"
                value={defaultValues.displayName ?? ''}
                required
                iconLeft="user"
                error={fieldErrors.displayName}
              />

              <Input
                id="reg-username"
                name="username"
                label="Username"
                hint="Huruf kecil atau angka tanpa spasi"
                placeholder="Contoh: raka_smp9"
                value={defaultValues.username ?? ''}
                required
                error={fieldErrors.username}
              />

              <Input
                id="reg-password"
                name="password"
                type="password"
                label="Password"
                hint="Minimal 6 karakter"
                placeholder="Minimal 6 karakter seru"
                required
                iconLeft="lock"
                error={fieldErrors.password}
              />

              <Checkbox
                id="reg-parent-consent"
                name="parentConsent"
                value="1"
                checked={Boolean(defaultValues.parentConsent)}
                label="Orang tua atau wali sudah tahu aku daftar di sini"
                error={fieldErrors.parentConsent}
              />

              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                iconRight="arrow-right"
                class="mt-1"
              >
                Daftar Sekarang
              </Button>
            </form>
          </div>
        </Card>

        {/* Tautan ke Masuk */}
        <p class="text-center text-[16px] font-semibold text-ink">
          Sudah punya akun?{' '}
          <a
            href={loginHref}
            class="font-extrabold underline decoration-2 underline-offset-4 hover:text-badge-blue"
          >
            Masuk di sini
          </a>
        </p>

        {/* Catatan Mode Demo untuk Uji Error */}
        <div class="p-3 rounded-badge bg-paper-soft border-2 border-ink/30 text-center text-[13px] font-semibold text-ink-soft">
          Uji tampilan error:{' '}
          <a href="/daftar?error=username_terpakai" class="underline font-bold text-ink">
            Username dipakai
          </a>{' '}
          |{' '}
          <a href="/daftar?error=wali_wajib" class="underline font-bold text-ink">
            Persetujuan wali kosong
          </a>
        </div>
      </div>
    ),
  });
}
