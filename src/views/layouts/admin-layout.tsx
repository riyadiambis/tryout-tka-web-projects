import type { PropsWithChildren } from '@kitajs/html';
import { AdminMobileNav, AdminSidebar, type AdminMenuKey } from '../components/admin-sidebar';
import { Icon } from '../components/icon';
import { BaseLayout } from './base-layout';

export interface AdminLayoutProps extends PropsWithChildren {
  title: string;
  activeMenu: AdminMenuKey;
  scripts?: string[];
}

export function AdminLayout({
  title,
  activeMenu,
  scripts = [],
  children,
}: AdminLayoutProps): string {
  return BaseLayout({
    title: `${title} - Admin Yuk Ngeles`,
    scripts,
    children: (
      <>
        <header class="fixed top-0 left-0 right-0 h-16 bg-card border-b-2 border-ink z-40 px-4 sm:px-6 flex items-center justify-between gap-3">
          <a href="/admin" class="flex items-center gap-2.5">
            <span class="w-10 h-10 rounded-badge bg-stabilo border-2 border-ink shadow-solid-sm flex items-center justify-center text-ink">
              <Icon name="book" class="w-5 h-5" />
            </span>
            <div class="flex items-center gap-2">
              <span class="font-title font-extrabold text-[20px] text-ink tracking-tight">
                Yuk Ngeles
              </span>
              <span class="px-2 py-0.5 rounded-chip text-[11px] font-extrabold uppercase tracking-wider text-white bg-badge-purple border-2 border-ink">
                ADMIN
              </span>
            </div>
          </a>

          <div class="flex items-center gap-2.5">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              class="hidden sm:inline-flex min-h-[40px] px-3 py-1.5 rounded-badge bg-paper-soft border-2 border-ink font-body font-bold text-[13px] text-ink items-center gap-1.5 hover:bg-stabilo-soft"
            >
              <span>Lihat Web Siswa</span>
              <Icon name="external-link" class="w-4 h-4" />
            </a>
            <a
              href="/admin/masuk"
              class="min-h-[40px] px-3.5 py-1.5 rounded-badge bg-card border-2 border-ink shadow-solid-sm pressable-sm font-body font-bold text-[14px] text-ink inline-flex items-center gap-1.5"
            >
              <Icon name="logout" class="w-4 h-4" />
              <span>Keluar</span>
            </a>
          </div>
        </header>

        <AdminSidebar activeMenu={activeMenu} />

        <div class="pt-16 lg:pl-64 flex-1 flex flex-col min-h-screen">
          <AdminMobileNav activeMenu={activeMenu} />
          <main class="flex-1 w-full max-w-admin mx-auto px-4 sm:px-6 py-6 sm:py-8">
            {children}
          </main>
        </div>
      </>
    ),
  });
}
