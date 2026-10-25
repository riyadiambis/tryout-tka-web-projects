import { Button } from '../../../views/components/button';
import { Card } from '../../../views/components/card';
import { Icon } from '../../../views/components/icon';
import { Input } from '../../../views/components/input';
import { BaseLayout } from '../../../views/layouts/base-layout';

export interface AdminLoginPageProps {
  error?: string;
  username?: string;
}

export function AdminLoginPage({ error, username = '' }: AdminLoginPageProps = {}): string {
  return BaseLayout({
    title: 'Masuk Admin - Yuk Ngeles',
    scripts: ['/js/auth.js'],
    children: (
      <main class="min-h-screen py-10 px-4 flex flex-col items-center justify-center">
        <div class="w-full max-w-[440px] flex flex-col gap-6">
          {/* Logo Brand Header */}
          <div class="text-center flex flex-col items-center gap-2">
            <a href="/" class="inline-flex items-center gap-2.5">
              <span class="w-12 h-12 rounded-badge bg-stabilo border-2 border-ink shadow-solid flex items-center justify-center text-ink">
                <Icon name="book" class="w-6 h-6" />
              </span>
              <span class="font-title font-extrabold text-[28px] text-ink tracking-tight">
                Yuk Ngeles
              </span>
            </a>
            <div class="inline-flex items-center gap-1.5 mt-1">
              <span class="px-2.5 py-0.5 rounded-chip text-[12px] font-extrabold uppercase tracking-wider text-white bg-badge-purple border-2 border-ink shadow-solid-sm">
                ADMIN PANEL
              </span>
            </div>
            <p class="font-body text-[14px] text-ink-soft">
              Silakan masuk untuk mengelola bank soal, materi, dan laporan.
            </p>
          </div>

          {/* Form Card */}
          <Card variant="default" padding="lg" class="flex flex-col gap-5">
            <div class="border-b-2 border-ink/10 pb-3">
              <h1 class="font-title font-extrabold text-[22px] text-ink">Masuk Sebagai Admin</h1>
              <p class="font-body text-[13px] text-ink-soft mt-0.5">
                Akses khusus pengajar dan pengelola tryout.
              </p>
            </div>

            {error && (
              <div
                role="alert"
                class="p-3.5 rounded-badge bg-wrong-bg border-2 border-wrong text-wrong flex items-start gap-2.5"
              >
                <Icon name="warning" class="w-5 h-5 shrink-0 mt-0.5" />
                <div class="text-[14px] font-bold">
                  <span>{error}</span>
                </div>
              </div>
            )}

            <form method="POST" action="/admin/masuk" class="flex flex-col gap-4">
              <Input
                label="Username Admin"
                id="admin-username"
                name="username"
                type="text"
                value={username}
                placeholder="Contoh: riyadi_admin"
                required
              />

              <div class="flex flex-col gap-1.5">
                <label for="admin-password" class="label-section text-[12px] text-ink">
                  Password
                </label>
                <div class="relative">
                  <input
                    id="admin-password"
                    name="password"
                    type="password"
                    required
                    placeholder="Masukkan password admin"
                    class="w-full h-12 px-3.5 pr-12 rounded-badge border-2 border-ink bg-paper-soft text-ink font-body text-[16px] focus:bg-card focus:outline-none"
                  />
                  <button
                    type="button"
                    class="toggle-password absolute right-2.5 top-1/2 -translate-y-1/2 p-2 text-ink-soft hover:text-ink min-h-[40px] min-w-[40px] flex items-center justify-center"
                    data-target="admin-password"
                    aria-label="Lihat atau sembunyikan password"
                  >
                    <Icon name="eye" class="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div class="pt-2">
                <Button type="submit" variant="primary" fullWidth size="lg">
                  Masuk ke Panel Admin
                </Button>
              </div>
            </form>

            <div class="pt-2 text-center border-t-2 border-ink/10">
              <a
                href="/"
                class="font-body font-bold text-[13px] text-ink-soft hover:text-ink inline-flex items-center gap-1.5"
              >
                <Icon name="arrow-left" class="w-4 h-4" />
                <span>Kembali ke Halaman Siswa</span>
              </a>
            </div>
          </Card>

          <p class="text-center text-[12px] text-ink-soft font-body font-bold">
            Yuk Ngeles &copy; 2026. Panel Manajemen Konten Tryout TKA.
          </p>
        </div>
      </main>
    ),
  });
}
