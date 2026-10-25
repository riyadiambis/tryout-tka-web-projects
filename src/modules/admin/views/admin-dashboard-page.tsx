import type { AdminQuestionRecord } from '../../../fixtures/types';
import { getAdminDashboardMetrics } from '../../../fixtures/users-and-reports';
import { Badge } from '../../../views/components/badge';
import { Button } from '../../../views/components/button';
import { Card } from '../../../views/components/card';
import { Icon } from '../../../views/components/icon';
import { Table } from '../../../views/components/table';
import { AdminLayout } from '../../../views/layouts/admin-layout';

export interface AdminDashboardPageProps {
  recentQuestions: AdminQuestionRecord[];
}

export function AdminDashboardPage({ recentQuestions }: AdminDashboardPageProps): string {
  const metrics = getAdminDashboardMetrics();

  const metricCards = [
    {
      label: 'TOTAL SOAL',
      value: metrics.totalQuestions.toString(),
      subLabel: `${metrics.publishedQuestions} Terbit, ${metrics.draftQuestions} Draft`,
      icon: 'list' as const,
      color: 'bg-badge-blue text-white',
    },
    {
      label: 'PAKET AKTIF',
      value: (metrics.totalPractices + metrics.totalTryouts).toString(),
      subLabel: `${metrics.totalPractices} Latihan, ${metrics.totalTryouts} Tryout`,
      icon: 'edit' as const,
      color: 'bg-badge-purple text-white',
    },
    {
      label: 'TOTAL SISWA',
      value: metrics.totalStudents.toString(),
      subLabel: 'Terdaftar dari YouTube & Web',
      icon: 'users' as const,
      color: 'bg-badge-orange text-white',
    },
    {
      label: 'TOTAL PENGERJAAN',
      value: (metrics.totalPracticeAttempts + metrics.totalTryoutAttempts).toString(),
      subLabel: `${metrics.totalPracticeAttempts} Latihan, ${metrics.totalTryoutAttempts} TO`,
      icon: 'chart' as const,
      color: 'bg-badge-green text-white',
    },
  ];

  const tableHeaders = [
    { label: 'Kode', width: '130px' },
    { label: 'Cuplikan Soal', width: '340px' },
    { label: 'Jenjang', width: '100px' },
    { label: 'Bentuk', width: '120px' },
    { label: 'Status', width: '110px' },
    { label: 'Aksi', width: '130px', align: 'center' as const },
  ];

  return AdminLayout({
    title: 'Dashboard',
    activeMenu: 'dashboard',
    scripts: ['/js/admin.js'],
    children: (
      <div class="flex flex-col gap-6">
        {/* Header Row */}
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <nav class="flex items-center gap-1.5 mb-1 text-ink-soft text-[12px] uppercase font-bold tracking-wider">
              <span>Admin</span>
              <Icon name="chevron-right" class="w-3.5 h-3.5" />
              <span class="text-ink">Dashboard</span>
            </nav>
            <div class="relative inline-block">
              <h1 class="font-title font-extrabold text-[28px] sm:text-[34px] text-ink tracking-tight">
                Ringkasan <span class="stabilo-highlight">Konten</span>
              </h1>
            </div>
            <p class="font-body text-[14px] text-ink-soft mt-1">
              Selamat datang di pusat pengelolaan bank soal dan performa tryout TKA.
            </p>
          </div>

          <div class="flex items-center gap-2">
            <Button
              href="/admin/soal/tambah"
              variant="primary"
              iconLeft="plus"
            >
              Tambah Soal Baru
            </Button>
          </div>
        </div>

        {/* Metric Cards Grid */}
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metricCards.map((m) => (
            <Card variant="default" padding="sm" class="p-4 flex items-start gap-3.5">
              <div
                class={`w-12 h-12 rounded-badge ${m.color} border-2 border-ink shadow-solid-sm flex items-center justify-center shrink-0`}
              >
                <Icon name={m.icon} class="w-6 h-6" />
              </div>
              <div class="flex flex-col min-w-0">
                <span class="label-section text-[11px] text-ink-soft">{m.label}</span>
                <span class="font-title font-extrabold text-[28px] text-ink leading-tight">
                  {m.value}
                </span>
                <span class="font-body text-[12px] text-ink-soft mt-0.5 truncate">{m.subLabel}</span>
              </div>
            </Card>
          ))}
        </div>

        {/* Quick Actions Bar */}
        <Card variant="default" padding="sm" class="p-4 sm:p-5 flex flex-col gap-3">
          <span class="label-section text-[12px] text-ink">PINTASAN KELOLA KONTEN</span>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <a
              href="/admin/soal/tambah"
              class="p-3 rounded-badge bg-paper-soft hover:bg-stabilo-soft border-2 border-ink text-ink flex items-center gap-2.5 transition-all"
            >
              <span class="w-8 h-8 rounded-chip bg-stabilo border-2 border-ink flex items-center justify-center shrink-0">
                <Icon name="plus" class="w-4 h-4 text-ink" />
              </span>
              <span class="font-body font-bold text-[13px] leading-tight">Tambah Butir Soal</span>
            </a>

            <a
              href="/admin/latihan"
              class="p-3 rounded-badge bg-paper-soft hover:bg-stabilo-soft border-2 border-ink text-ink flex items-center gap-2.5 transition-all"
            >
              <span class="w-8 h-8 rounded-chip bg-badge-blue border-2 border-ink flex items-center justify-center shrink-0 text-white">
                <Icon name="edit" class="w-4 h-4" />
              </span>
              <span class="font-body font-bold text-[13px] leading-tight">Kelola Latihan</span>
            </a>

            <a
              href="/admin/tryout"
              class="p-3 rounded-badge bg-paper-soft hover:bg-stabilo-soft border-2 border-ink text-ink flex items-center gap-2.5 transition-all"
            >
              <span class="w-8 h-8 rounded-chip bg-badge-purple border-2 border-ink flex items-center justify-center shrink-0 text-white">
                <Icon name="clock" class="w-4 h-4" />
              </span>
              <span class="font-body font-bold text-[13px] leading-tight">Susun Tryout</span>
            </a>

            <a
              href="/admin/laporan"
              class="p-3 rounded-badge bg-paper-soft hover:bg-stabilo-soft border-2 border-ink text-ink flex items-center gap-2.5 transition-all"
            >
              <span class="w-8 h-8 rounded-chip bg-badge-green border-2 border-ink flex items-center justify-center shrink-0 text-white">
                <Icon name="chart" class="w-4 h-4" />
              </span>
              <span class="font-body font-bold text-[13px] leading-tight">Laporan Skor</span>
            </a>
          </div>
        </Card>

        {/* Recent Questions Table */}
        <div class="flex flex-col gap-3">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="font-title font-extrabold text-[20px] text-ink">Butir Soal Terbaru</h2>
              <p class="font-body text-[13px] text-ink-soft">
                5 soal terakhir yang baru saja diinput atau diperbarui.
              </p>
            </div>
            <a
              href="/admin/soal"
              class="font-body font-bold text-[13px] text-ink hover:underline inline-flex items-center gap-1"
            >
              <span>Lihat Semua Soal</span>
              <Icon name="chevron-right" class="w-4 h-4" />
            </a>
          </div>

          <Table headers={tableHeaders}>
            {recentQuestions.slice(0, 5).map((q) => {
              const statusVariant =
                q.status === 'published' ? 'correct' : q.status === 'draft' ? 'stabilo' : 'neutral';
              const statusLabel =
                q.status === 'published' ? 'Terbit' : q.status === 'draft' ? 'Draft' : 'Arsip';

              const typeBadge =
                q.questionType === 'single' ? (
                  <span class="text-[12px] font-bold text-ink">PG Biasa</span>
                ) : q.questionType === 'multiple' ? (
                  <span class="text-[12px] font-bold text-badge-blue">PG Kompleks (MCMA)</span>
                ) : (
                  <span class="text-[12px] font-bold text-badge-purple">PG Kategori</span>
                );

              const plainExcerpt = q.bodyRaw
                .replace(/\$+/g, '')
                .replace(/\\times/g, 'x')
                .replace(/\\left/g, '')
                .replace(/\\right/g, '')
                .slice(0, 55);

              return (
                <tr class="hover:bg-paper-soft/60 transition-colors">
                  <td class="py-3 px-3.5 border-r-2 border-ink/20">
                    <span class="font-mono text-[12px] font-bold text-ink">{q.code}</span>
                  </td>
                  <td class="py-3 px-3.5 border-r-2 border-ink/20">
                    <div class="font-body text-[13px] text-ink font-semibold line-clamp-1">
                      {plainExcerpt}...
                    </div>
                  </td>
                  <td class="py-3 px-3.5 border-r-2 border-ink/20">
                    <Badge variant={q.level === 'sd' ? 'orange' : 'purple'}>
                      {q.level.toUpperCase()}
                    </Badge>
                  </td>
                  <td class="py-3 px-3.5 border-r-2 border-ink/20">{typeBadge}</td>
                  <td class="py-3 px-3.5 border-r-2 border-ink/20">
                    <Badge variant={statusVariant}>{statusLabel}</Badge>
                  </td>
                  <td class="py-3 px-3.5 text-center">
                    <div class="flex items-center justify-center gap-1.5">
                      <a
                        href={`/admin/soal/${q.id}/edit`}
                        class="p-1.5 rounded-chip bg-paper-soft hover:bg-card border border-ink text-ink"
                        title="Ubah Soal"
                      >
                        <Icon name="edit" class="w-4 h-4" />
                      </a>
                      <a
                        href={`/admin/soal#q-${q.id}`}
                        class="p-1.5 rounded-chip bg-paper-soft hover:bg-card border border-ink text-ink"
                        title="Buka di Bank Soal"
                      >
                        <Icon name="eye" class="w-4 h-4" />
                      </a>
                    </div>
                  </td>
                </tr>
              );
            })}
          </Table>
        </div>
      </div>
    ),
  });
}
