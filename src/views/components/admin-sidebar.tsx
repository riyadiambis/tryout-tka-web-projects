import { Icon, type IconName } from './icon';

export type AdminMenuKey =
  | 'dashboard'
  | 'questions'
  | 'practices'
  | 'tryouts'
  | 'topics'
  | 'elements'
  | 'students'
  | 'reports';

export interface AdminSidebarProps {
  activeMenu: AdminMenuKey;
  adminName?: string;
}

const MENU_ITEMS: { key: AdminMenuKey; label: string; href: string; icon: IconName }[] = [
  { key: 'dashboard', label: 'Dashboard', href: '/admin', icon: 'grid' },
  { key: 'questions', label: 'Soal', href: '/admin/soal', icon: 'list' },
  { key: 'practices', label: 'Latihan', href: '/admin/latihan', icon: 'edit' },
  { key: 'tryouts', label: 'Tryout', href: '/admin/tryout', icon: 'clock' },
  { key: 'topics', label: 'Materi', href: '/admin/materi', icon: 'book' },
  { key: 'elements', label: 'Elemen', href: '/admin/elemen', icon: 'layers' },
  { key: 'students', label: 'Siswa', href: '/admin/siswa', icon: 'users' },
  { key: 'reports', label: 'Laporan', href: '/admin/laporan', icon: 'chart' },
];

export function AdminSidebar({ activeMenu, adminName = 'Admin Yuk Ngeles' }: AdminSidebarProps): JSX.Element {
  return (
    <aside
      id="admin-sidebar"
      class="fixed left-0 top-16 bottom-0 w-64 bg-card border-r-2 border-ink z-30 hidden lg:flex flex-col justify-between py-5 overflow-y-auto"
    >
      <div class="px-4">
        <p class="px-2.5 mb-2.5 label-section">MENU ADMIN</p>
        <nav aria-label="Navigasi Admin" class="flex flex-col gap-1.5">
          {MENU_ITEMS.map((item) => {
            const isActive = item.key === activeMenu;
            return (
              <a
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                class={`min-h-[44px] flex items-center gap-3 px-3 py-2 rounded-badge font-body text-[15px] transition-all ${
                  isActive
                    ? 'bg-stabilo text-ink border-2 border-ink shadow-solid-sm font-extrabold'
                    : 'text-ink-soft hover:bg-paper-soft hover:text-ink border-2 border-transparent font-bold'
                }`}
              >
                <Icon name={item.icon} class="w-5 h-5 shrink-0" />
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>
      </div>

      <div class="px-4 pt-4 border-t-2 border-ink/15">
        <div class="p-3 rounded-badge bg-paper-soft border-2 border-ink flex items-center gap-2.5">
          <span class="w-9 h-9 rounded-full bg-badge-purple border-2 border-ink text-white flex items-center justify-center shrink-0">
            <Icon name="user" class="w-4 h-4" />
          </span>
          <div class="min-w-0">
            <p class="font-body font-extrabold text-[14px] text-ink truncate" safe>
              {adminName}
            </p>
            <p class="text-[11px] font-bold uppercase tracking-wider text-ink-soft">
              Pemilik Konten
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}

export function AdminMobileNav({ activeMenu }: { activeMenu: AdminMenuKey }): JSX.Element {
  return (
    <nav
      aria-label="Navigasi Admin Layar Kecil"
      class="lg:hidden bg-card border-b-2 border-ink px-4 py-2.5 overflow-x-auto flex items-center gap-2"
    >
      {MENU_ITEMS.map((item) => {
        const isActive = item.key === activeMenu;
        return (
          <a
            href={item.href}
            class={`shrink-0 min-h-[40px] px-3 py-1.5 rounded-badge font-body text-[13px] inline-flex items-center gap-1.5 ${
              isActive
                ? 'bg-stabilo text-ink border-2 border-ink shadow-solid-sm font-extrabold'
                : 'bg-paper-soft text-ink-soft border-2 border-ink/30 font-bold'
            }`}
          >
            <Icon name={item.icon} class="w-4 h-4" />
            <span>{item.label}</span>
          </a>
        );
      })}
    </nav>
  );
}
