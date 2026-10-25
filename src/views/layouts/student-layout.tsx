import type { PropsWithChildren } from '@kitajs/html';
import type { Level, SessionStudentUser } from '../../fixtures/types';
import { Navbar } from '../components/navbar';
import { BaseLayout } from './base-layout';

export interface StudentLayoutProps extends PropsWithChildren {
  title: string;
  description?: string;
  navVariant?: 'home' | 'page' | 'exam';
  level?: Level;
  headerTitle?: string;
  backHref?: string;
  user?: SessionStudentUser | null;
  rightSlot?: JSX.Element;
  containerMode?: 'mobile' | 'desktop' | 'beranda' | 'cbt';
  demoBanner?: JSX.Element;
  hideFooter?: boolean;
  scripts?: string[];
}

export function StudentLayout({
  title,
  description,
  navVariant = 'page',
  level,
  headerTitle,
  backHref,
  user = null,
  rightSlot,
  containerMode = 'desktop',
  demoBanner,
  hideFooter = false,
  scripts = [],
  children,
}: StudentLayoutProps): string {
  const widthClass =
    containerMode === 'mobile'
      ? 'max-w-mobile'
      : containerMode === 'beranda'
        ? 'max-w-mobile md:max-w-beranda'
        : containerMode === 'cbt'
          ? 'max-w-mobile lg:max-w-cbt'
          : 'max-w-mobile md:max-w-desktop';

  return BaseLayout({
    title,
    description,
    scripts,
    children: (
      <>
        <Navbar
          variant={navVariant}
          level={level}
          title={headerTitle}
          backHref={backHref}
          user={user}
          rightSlot={rightSlot}
        />

        {demoBanner ? (
          <div class="w-full bg-stabilo-soft border-b-2 border-ink">
            <div class={`mx-auto w-full ${widthClass} px-4 py-2`}>
              {demoBanner}
            </div>
          </div>
        ) : null}

        <main class={`flex-1 w-full mx-auto ${widthClass} px-4 py-6 sm:py-8`}>
          {children}
        </main>

        {!hideFooter ? (
          <footer class="w-full border-t-2 border-ink bg-paper-soft mt-auto">
            <div class="mx-auto w-full max-w-mobile md:max-w-beranda px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[14px] text-ink-soft font-semibold text-center sm:text-left">
              <p>Yuk Ngeles - Teman Belajar Matematika SD dan SMP</p>
              <div class="flex items-center gap-4">
                <a href="/sd" class="hover:text-ink underline-offset-4 hover:underline">SD Kelas 6</a>
                <a href="/smp" class="hover:text-ink underline-offset-4 hover:underline">SMP Kelas 9</a>
                <a
                  href="https://www.youtube.com/@RiyadiOfisharu"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="hover:text-ink underline-offset-4 hover:underline"
                >
                  YouTube Kak Riyadi
                </a>
              </div>
            </div>
          </footer>
        ) : null}
      </>
    ),
  });
}
