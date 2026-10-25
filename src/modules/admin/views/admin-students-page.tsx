import type { AdminStudentItem } from '../../../fixtures/types';
import { Badge } from '../../../views/components/badge';
import { Button } from '../../../views/components/button';
import { Card } from '../../../views/components/card';
import { Icon } from '../../../views/components/icon';
import { Modal } from '../../../views/components/modal';
import { Table } from '../../../views/components/table';
import { AdminLayout } from '../../../views/layouts/admin-layout';

export interface AdminStudentsPageProps {
  students: AdminStudentItem[];
  searchQuery?: string;
}

export function AdminStudentsPage({
  students,
  searchQuery = '',
}: AdminStudentsPageProps): string {
  const tableHeaders = [
    { label: 'No', width: '50px', align: 'center' as const },
    { label: 'Siswa', width: '220px' },
    { label: 'Username', width: '150px' },
    { label: 'Terdaftar', width: '130px' },
    { label: 'Asal Masuk', width: '150px' },
    { label: 'Aktivitas', width: '140px', align: 'center' as const },
    { label: 'Aksi', width: '150px', align: 'center' as const },
  ];

  return AdminLayout({
    title: 'Kelola Siswa',
    activeMenu: 'students',
    scripts: ['/js/admin.js'],
    children: (
      <div class="flex flex-col gap-6">
        {/* Header Row */}
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <nav class="flex items-center gap-1.5 mb-1 text-ink-soft text-[12px] uppercase font-bold tracking-wider">
              <span>Admin</span>
              <Icon name="chevron-right" class="w-3.5 h-3.5" />
              <span>Pengguna</span>
              <Icon name="chevron-right" class="w-3.5 h-3.5" />
              <span class="text-ink">Daftar Siswa</span>
            </nav>
            <div class="relative inline-block">
              <h1 class="font-title font-extrabold text-[28px] sm:text-[32px] text-ink tracking-tight">
                Data <span class="stabilo-highlight">Siswa</span>
              </h1>
            </div>
            <p class="font-body text-[14px] text-ink-soft mt-1">
              Daftar akun siswa yang terdaftar untuk latihan dan tryout TKA Matematika.
            </p>
          </div>
        </div>

        {/* Search Toolbar */}
        <Card variant="default" padding="sm" class="p-4 sm:p-5">
          <form method="GET" action="/admin/siswa" class="flex flex-col sm:flex-row gap-3 items-center">
            <div class="relative flex-1 w-full">
              <input
                id="search-student"
                name="q"
                type="text"
                placeholder="Cari berdasarkan nama, username, atau asal link..."
                value={searchQuery}
                class="w-full h-11 pl-11 pr-4 bg-paper-soft border-2 border-ink rounded-badge font-body text-[14px] text-ink focus:outline-none focus:bg-card"
              />
              <span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-soft">
                <Icon name="search" class="w-4 h-4" />
              </span>
            </div>

            <div class="flex items-center gap-2 w-full sm:w-auto">
              <Button type="submit" variant="primary" size="md">
                Cari Siswa
              </Button>
              {searchQuery && (
                <a
                  href="/admin/siswa"
                  class="min-h-[42px] px-3.5 py-2 rounded-badge bg-paper-soft border-2 border-ink font-body font-bold text-[13px] text-ink inline-flex items-center gap-1.5 hover:bg-card"
                >
                  <Icon name="refresh" class="w-4 h-4" />
                  <span>Reset</span>
                </a>
              )}
            </div>
          </form>
        </Card>

        {/* Student Table */}
        <div class="flex flex-col gap-3">
          <div class="flex items-center justify-between">
            <span class="label-section text-[12px] text-ink">
              TOTAL SISWA: {students.length} AKUN
            </span>
          </div>

          <Table headers={tableHeaders}>
            {students.map((stu, idx) => {
              const sourceBadge = stu.sourceLabel.startsWith('yt') ? (
                <span class="px-2 py-0.5 rounded-chip text-[11px] font-bold bg-wrong-bg text-wrong border border-wrong/40 inline-flex items-center gap-1">
                  <Icon name="play" class="w-3 h-3" />
                  <span>{stu.sourceLabel}</span>
                </span>
              ) : (
                <span class="px-2 py-0.5 rounded-chip text-[11px] font-bold bg-paper-soft text-ink-soft border border-ink/30">
                  Langsung
                </span>
              );

              return (
                <tr class="hover:bg-paper-soft/60 transition-colors">
                  <td class="py-3 px-3.5 text-center border-r-2 border-ink/20">
                    <span class="font-mono text-[12px] font-bold text-ink block">
                      {idx + 1}
                    </span>
                  </td>
                  <td class="py-3 px-3.5 border-r-2 border-ink/20">
                    <div class="flex items-center gap-2.5">
                      <span class="w-8 h-8 rounded-full bg-stabilo border-2 border-ink text-ink font-title font-extrabold text-[12px] flex items-center justify-center shrink-0">
                        {stu.displayName.charAt(0)}
                      </span>
                      <div>
                        <h2 class="font-title font-bold text-[14px] text-ink leading-tight">
                          {stu.displayName}
                        </h2>
                        <span class="font-body text-[11px] text-ink-soft">ID: {stu.id}</span>
                      </div>
                    </div>
                  </td>
                  <td class="py-3 px-3.5 border-r-2 border-ink/20">
                    <span class="font-mono text-[13px] font-bold text-ink">@{stu.username}</span>
                  </td>
                  <td class="py-3 px-3.5 border-r-2 border-ink/20">
                    <span class="font-body text-[13px] text-ink-soft">{stu.createdAtLabel}</span>
                  </td>
                  <td class="py-3 px-3.5 border-r-2 border-ink/20">{sourceBadge}</td>
                  <td class="py-3 px-3.5 border-r-2 border-ink/20 text-center">
                    <div class="text-[12px] font-bold text-ink">
                      <span>{stu.practiceAttemptCount} Latihan</span>
                      <span class="text-ink-soft mx-1">&bull;</span>
                      <span>{stu.tryoutAttemptCount} TO</span>
                    </div>
                  </td>
                  <td class="py-3 px-3.5 text-center">
                    <div class="flex items-center justify-center">
                      <button
                        type="button"
                        class="btn-reset-password px-2.5 py-1.5 rounded-chip bg-paper-soft hover:bg-card border-2 border-ink text-[12px] font-bold text-ink inline-flex items-center gap-1 shadow-solid-sm"
                        data-student-id={stu.id}
                        data-student-name={stu.displayName}
                        data-student-username={stu.username}
                      >
                        <Icon name="refresh" class="w-3.5 h-3.5 text-badge-orange" />
                        <span>Reset Password</span>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </Table>
        </div>

        {/* Modal Konfirmasi Reset Password */}
        <Modal id="modal-reset-password" title="Reset Password Siswa">
          <div class="flex flex-col gap-4">
            <div class="p-3.5 rounded-badge bg-paper-soft border-2 border-ink flex items-start gap-3">
              <span class="w-9 h-9 rounded-full bg-badge-orange text-white border-2 border-ink flex items-center justify-center shrink-0">
                <Icon name="warning" class="w-5 h-5" />
              </span>
              <div class="text-[13px] text-ink font-body">
                <p>
                  Kamu akan membuatkan password baru sementara untuk akun{' '}
                  <strong id="reset-student-target">siswa</strong> (@<span id="reset-username-target">username</span>).
                </p>
              </div>
            </div>

            <div class="flex flex-col gap-1.5">
              <label class="label-section text-[11px] text-ink-soft">
                PASSWORD SEMENTARA DUMMY
              </label>
              <div class="p-3 rounded-badge bg-card border-2 border-ink flex items-center justify-between">
                <code class="font-mono font-bold text-[16px] text-ink tracking-wider">
                  YukNgeles123!
                </code>
                <span class="px-2 py-0.5 rounded-chip text-[11px] font-bold bg-correct-bg text-correct border border-correct">
                  Siap Dipakai
                </span>
              </div>
              <p class="text-[11px] text-ink-soft">
                Siswa dapat langsung login dengan password ini lalu menggantinya di pengaturan akun.
              </p>
            </div>

            <div class="flex flex-col sm:flex-row gap-2 pt-2 border-t-2 border-ink/10">
              <button
                type="button"
                id="btn-close-reset-modal"
                class="min-h-[44px] px-4 py-2 rounded-badge bg-paper-soft border-2 border-ink font-body font-bold text-[14px] text-ink flex-1"
              >
                Batal
              </button>
              <button
                type="button"
                id="btn-confirm-reset"
                class="min-h-[44px] px-4 py-2 rounded-badge bg-stabilo border-2 border-ink shadow-solid-sm font-title font-bold text-[14px] text-ink flex-1"
              >
                Konfirmasi Reset
              </button>
            </div>
          </div>
        </Modal>
      </div>
    ),
  });
}
