import type { Level, SessionStudentUser } from '../../fixtures/types';
import { formatLevelTitle } from '../../lib/format';
import { Button } from './button';
import { Icon } from './icon';

export interface NavbarProps {
  variant?: 'home' | 'page' | 'exam';
  level?: Level;
  title?: string;
  backHref?: string;
  user?: SessionStudentUser | null;
  rightSlot?: JSX.Element;
}

export function Navbar({
  variant = 'page',
  level,
  title,
  backHref,
  user = null,
  rightSlot,
}: NavbarProps): JSX.Element {
  const containerWidth =
    variant === 'home'
      ? 'max-w-mobile md:max-w-beranda'
      : variant === 'exam'
        ? 'max-w-mobile lg:max-w-cbt'
        : 'max-w-mobile md:max-w-beranda';

  return (
    <header class="sticky top-0 z-40 w-full bg-paper/95 backdrop-blur-sm border-b-2 border-ink">
      <div class={`mx-auto w-full ${containerWidth} h-16 md:h-[72px] px-4 flex items-center justify-between gap-3`}>
        <div class="flex items-center gap-2.5 min-w-0">
          {variant !== 'home' && backHref ? (
            <a
              href={backHref}
              aria-label="Kembali"
              class="w-12 h-12 rounded-badge bg-card border-2 border-ink shadow-solid-sm pressable-sm flex items-center justify-center text-ink shrink-0"
            >
              <Icon name="arrow-left" class="w-5 h-5" />
            </a>
          ) : (
            <a href="/" class="flex items-center gap-2.5 group shrink-0">
              <span class="w-10 h-10 rounded-badge bg-stabilo border-2 border-ink shadow-solid-sm flex items-center justify-center text-ink">
                <Icon name="book" class="w-5 h-5" />
              </span>
              <span class="font-title font-extrabold text-[22px] text-ink tracking-tight leading-none">
                Yuk Ngeles
              </span>
            </a>
          )}

          {variant !== 'home' ? (
            <div class="flex flex-col min-w-0">
              <div class="flex items-center gap-1.5 whitespace-nowrap overflow-hidden">
                <a href="/" class="hidden sm:inline text-[11px] font-extrabold uppercase tracking-wider text-ink-soft hover:text-ink">
                  Yuk Ngeles
                </a>
                {level ? (
                  <>
                    <span class="hidden sm:inline text-ink-soft text-[11px]">/</span>
                    <span
                      class={`text-[11px] font-extrabold uppercase tracking-wider truncate ${
                        level === 'sd' ? 'text-badge-orange' : 'text-badge-blue'
                      }`}
                    >
                      {formatLevelTitle(level)}
                    </span>
                  </>
                ) : (
                  <span class="sm:hidden text-[11px] font-extrabold uppercase tracking-wider text-ink-soft">
                    Yuk Ngeles
                  </span>
                )}
              </div>
              {title ? (
                <span class="font-title font-bold text-[17px] sm:text-[20px] text-ink truncate leading-tight" safe>
                  {title}
                </span>
              ) : null}
            </div>
          ) : null}
        </div>

        {variant !== 'exam' ? (
          <nav aria-label="Pilih jenjang" class="hidden md:flex items-center gap-6 font-body font-extrabold text-[16px] text-ink">
            <a
              href="/sd"
              class={`min-h-[48px] inline-flex items-center hover:underline decoration-2 underline-offset-4 ${
                level === 'sd' ? 'underline' : ''
              }`}
            >
              SD Kelas 6
            </a>
            <a
              href="/smp"
              class={`min-h-[48px] inline-flex items-center hover:underline decoration-2 underline-offset-4 ${
                level === 'smp' ? 'underline' : ''
              }`}
            >
              SMP Kelas 9
            </a>
          </nav>
        ) : null}

        <div class="flex items-center gap-2 shrink-0">
          {rightSlot ? (
            rightSlot
          ) : user ? (
            <div class="flex items-center gap-2">
              <span class="inline-flex items-center gap-2 min-h-[48px] px-3 py-1.5 rounded-badge bg-stabilo-soft border-2 border-ink font-body font-extrabold text-[14px] text-ink">
                <Icon name="user" class="w-4 h-4 shrink-0" />
                <span class="max-w-[100px] truncate" safe>{user.displayName}</span>
              </span>
              {variant !== 'exam' ? (
                <a
                  href="/keluar"
                  aria-label="Keluar akun"
                  class="min-h-[48px] px-3 rounded-badge bg-card border-2 border-ink shadow-solid-sm pressable-sm inline-flex items-center gap-1.5 font-body font-bold text-[14px] text-ink"
                >
                  <Icon name="logout" class="w-4 h-4" />
                  <span class="hidden sm:inline">Keluar</span>
                </a>
              ) : null}
            </div>
          ) : variant === 'exam' ? (
            <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-badge bg-paper-soft border-2 border-ink font-body font-bold text-[13px] text-ink-soft">
              Mode Fokus
            </span>
          ) : (
            <div class="flex items-center gap-2">
              <Button href="/masuk" variant="secondary" size="md" class="px-3.5">
                Masuk
              </Button>
              <Button href="/daftar" variant="primary" size="md" class="hidden sm:inline-flex px-4">
                Daftar
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
