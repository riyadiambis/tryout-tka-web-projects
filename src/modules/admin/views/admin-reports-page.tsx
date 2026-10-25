import type { AdminQuestionStatRow, AdminQuizReport } from '../../../fixtures/types';
import { Badge } from '../../../views/components/badge';
import { Card } from '../../../views/components/card';
import { Icon } from '../../../views/components/icon';
import { Table } from '../../../views/components/table';
import { AdminLayout } from '../../../views/layouts/admin-layout';

export interface AdminReportsPageProps {
  reports: AdminQuizReport[];
  selectedReport: AdminQuizReport;
}

export function AdminReportsPage({
  reports,
  selectedReport,
}: AdminReportsPageProps): string {
  const tableHeaders = [
    { label: 'No', width: '50px', align: 'center' as const },
    { label: 'Kode Soal', width: '130px' },
    { label: 'Cuplikan Butir Soal', width: '320px' },
    { label: 'Bentuk', width: '120px' },
    { label: '% Benar', width: '110px', align: 'center' as const },
    { label: 'Pengecoh Paling Banyak Dipilih', width: '250px' },
  ];

  return AdminLayout({
    title: 'Laporan Skor & Analisis Soal',
    activeMenu: 'reports',
    children: (
      <div class="flex flex-col gap-6">
        {/* Header Row */}
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <nav class="flex items-center gap-1.5 mb-1 text-ink-soft text-[12px] uppercase font-bold tracking-wider">
              <span>Admin</span>
              <Icon name="chevron-right" class="w-3.5 h-3.5" />
              <span>Hasil Belajar</span>
              <Icon name="chevron-right" class="w-3.5 h-3.5" />
              <span class="text-ink">Laporan & Analisis</span>
            </nav>
            <div class="relative inline-block">
              <h1 class="font-title font-extrabold text-[28px] sm:text-[32px] text-ink tracking-tight">
                Laporan <span class="stabilo-highlight">Skor & Butir</span>
              </h1>
            </div>
            <p class="font-body text-[14px] text-ink-soft mt-1">
              Statistik daya pembeda soal, persentase benar, dan pengecoh paling rawan keliru.
            </p>
          </div>
        </div>

        {/* Paket Selector Toolbar */}
        <Card variant="default" padding="sm" class="p-4 sm:p-5">
          <form method="GET" action="/admin/laporan" class="flex flex-col sm:flex-row gap-3 items-end">
            <div class="flex-1 flex flex-col gap-1 w-full">
              <label for="select-quiz-report" class="label-section text-[11px] text-ink-soft">
                Pilih Paket Latihan atau Tryout
              </label>
              <select
                id="select-quiz-report"
                name="quiz_id"
                class="w-full h-11 px-3.5 bg-paper-soft border-2 border-ink rounded-badge font-body font-bold text-[14px] text-ink focus:outline-none focus:bg-card"
                onchange="this.form.submit()"
              >
                {reports.map((r) => (
                  <option value={r.quizId} selected={r.quizId === selectedReport.quizId}>
                    [{r.level.toUpperCase()} - {r.quizType === 'tryout' ? 'TRYOUT' : 'LATIHAN'}]{' '}
                    {r.quizTitle}
                  </option>
                ))}
              </select>
            </div>
          </form>
        </Card>

        {/* Summary Metric Cards */}
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Card variant="default" padding="sm" class="p-4 flex flex-col gap-1">
            <span class="label-section text-[11px] text-ink-soft">TOTAL PENGERJA</span>
            <span class="font-title font-extrabold text-[28px] text-ink">
              {selectedReport.participantCount}
            </span>
            <span class="font-body text-[12px] text-ink-soft">Siswa telah submit</span>
          </Card>

          <Card variant="default" padding="sm" class="p-4 flex flex-col gap-1">
            <span class="label-section text-[11px] text-ink-soft">RATA-RATA SKOR</span>
            <span class="font-title font-extrabold text-[28px] text-ink">
              {selectedReport.averageScore}
            </span>
            <span class="font-body text-[12px] text-ink-soft">Dari skala 100</span>
          </Card>

          <Card variant="default" padding="sm" class="p-4 flex flex-col gap-1">
            <span class="label-section text-[11px] text-ink-soft">SKOR TERTINGGI</span>
            <span class="font-title font-extrabold text-[28px] text-correct">
              {selectedReport.highestScore}
            </span>
            <span class="font-body text-[12px] text-ink-soft">Nilai sempurna</span>
          </Card>

          <Card variant="default" padding="sm" class="p-4 flex flex-col gap-1">
            <span class="label-section text-[11px] text-ink-soft">SKOR TERENDAH</span>
            <span class="font-title font-extrabold text-[28px] text-wrong">
              {selectedReport.lowestScore}
            </span>
            <span class="font-body text-[12px] text-ink-soft">Perlu penguatan materi</span>
          </Card>
        </div>

        {/* Question Statistics Table */}
        <div class="flex flex-col gap-3">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="font-title font-extrabold text-[20px] text-ink">
                Analisis Butir Soal: {selectedReport.quizTitle}
              </h2>
              <p class="font-body text-[13px] text-ink-soft">
                Butir dengan persentase benar di bawah atau sama dengan 40% ditandai merah (soal sulit / rawan kecoh).
              </p>
            </div>
          </div>

          <Table headers={tableHeaders}>
            {selectedReport.questionStats.map((st: AdminQuestionStatRow) => {
              const isLowPercentage = st.correctPercentage <= 40;

              const percentBadge = (
                <span
                  class={`px-2.5 py-1 rounded-chip text-[12px] font-extrabold inline-block text-center border ${
                    isLowPercentage
                      ? 'bg-wrong-bg text-wrong border-wrong'
                      : st.correctPercentage >= 75
                        ? 'bg-correct-bg text-correct border-correct'
                        : 'bg-paper-soft text-ink border-ink/30'
                  }`}
                >
                  {st.correctPercentage}%
                </span>
              );

              const typeBadge =
                st.questionType === 'single' ? (
                  <span class="text-[12px] font-bold text-ink">PG Biasa</span>
                ) : st.questionType === 'multiple' ? (
                  <span class="text-[12px] font-bold text-badge-blue">PG Kompleks</span>
                ) : (
                  <span class="text-[12px] font-bold text-badge-purple">Kategori</span>
                );

              return (
                <tr class="hover:bg-paper-soft/60 transition-colors">
                  <td class="py-3 px-3.5 border-r-2 border-ink/20 text-center">
                    <span class="font-mono text-[12px] font-bold text-ink block">
                      {st.questionNumber}
                    </span>
                  </td>
                  <td class="py-3 px-3.5 border-r-2 border-ink/20">
                    <span class="font-mono text-[12px] font-bold text-ink">{st.questionCode}</span>
                  </td>
                  <td class="py-3 px-3.5 border-r-2 border-ink/20">
                    <div class="font-body text-[13px] text-ink font-semibold line-clamp-1">
                      {st.questionExcerpt}
                    </div>
                  </td>
                  <td class="py-3 px-3.5 border-r-2 border-ink/20">{typeBadge}</td>
                  <td class="py-3 px-3.5 border-r-2 border-ink/20 text-center">{percentBadge}</td>
                  <td class="py-3 px-3.5">
                    <div class="font-body text-[12px] text-ink-soft">
                      <span class="font-bold text-ink">{st.mostChosenWrongLabel}</span>
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
