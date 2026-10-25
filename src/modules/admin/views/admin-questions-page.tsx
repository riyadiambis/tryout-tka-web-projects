import type { AdminQuestionRecord, ElementItem, Level, QuestionStatus, TopicItem } from '../../../fixtures/types';
import { getElementById } from '../../../fixtures/elements';
import { getTopicById } from '../../../fixtures/topics';
import { Badge } from '../../../views/components/badge';
import { Button } from '../../../views/components/button';
import { Card } from '../../../views/components/card';
import { Icon } from '../../../views/components/icon';
import { Modal } from '../../../views/components/modal';
import { Table } from '../../../views/components/table';
import { AdminLayout } from '../../../views/layouts/admin-layout';
import { AdminQuestionPreviewFragment } from './admin-question-preview-fragment';

export interface AdminQuestionsPageProps {
  questions: AdminQuestionRecord[];
  elements: ElementItem[];
  topics: TopicItem[];
  selectedLevel?: string;
  selectedElementId?: string;
  selectedTopicId?: string;
  selectedStatus?: string;
  searchQuery?: string;
}

export function AdminQuestionsPage({
  questions,
  elements,
  topics,
  selectedLevel = 'all',
  selectedElementId = 'all',
  selectedTopicId = 'all',
  selectedStatus = 'all',
  searchQuery = '',
}: AdminQuestionsPageProps): string {
  const tableHeaders = [
    { label: 'No', width: '60px', align: 'center' as const },
    { label: 'Cuplikan Soal', width: '320px' },
    { label: 'Jenjang', width: '120px' },
    { label: 'Elemen', width: '150px' },
    { label: 'Materi', width: '160px' },
    { label: 'Bentuk', width: '120px' },
    { label: 'Status', width: '110px' },
    { label: 'Aksi', width: '140px', align: 'center' as const },
  ];

  return AdminLayout({
    title: 'Bank Soal',
    activeMenu: 'questions',
    scripts: ['/js/admin.js'],
    children: (
      <div class="flex flex-col gap-6">
        {/* Header Row */}
        <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <nav class="flex items-center gap-1.5 mb-1.5 text-ink-soft text-[12px] uppercase font-bold tracking-wider">
              <span>Admin</span>
              <Icon name="chevron-right" class="w-3.5 h-3.5" />
              <span>Konten</span>
              <Icon name="chevron-right" class="w-3.5 h-3.5" />
              <span class="text-ink">Bank Soal</span>
            </nav>
            <div class="relative inline-block">
              <h1 class="font-title font-extrabold text-[28px] sm:text-[34px] text-ink tracking-tight">
                Bank <span class="stabilo-highlight">Soal</span>
              </h1>
            </div>
            <p class="font-body text-[14px] text-ink-soft mt-1">
              Koleksi butir instrumen TKA Matematika SD Kelas 6 dan SMP Kelas 9.
            </p>
          </div>

          <Button
            href="/admin/soal/tambah"
            variant="primary"
            iconLeft="plus"
          >
            Tambah Soal
          </Button>
        </div>

        {/* Filter Toolbar */}
        <Card variant="default" padding="sm" class="p-4 sm:p-5">
          <form method="GET" action="/admin/soal" class="flex flex-col gap-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Filter Jenjang */}
              <div class="flex flex-col gap-1">
                <label for="filter-level" class="label-section text-[11px] text-ink-soft">
                  Jenjang
                </label>
                <select
                  id="filter-level"
                  name="level"
                  class="h-10 px-3 bg-paper-soft border-2 border-ink rounded-badge font-body font-bold text-[14px] text-ink focus:outline-none focus:bg-card"
                  onchange="this.form.submit()"
                >
                  <option value="all" selected={selectedLevel === 'all'}>
                    Semua Jenjang
                  </option>
                  <option value="sd" selected={selectedLevel === 'sd'}>
                    SD Kelas 6
                  </option>
                  <option value="smp" selected={selectedLevel === 'smp'}>
                    SMP Kelas 9
                  </option>
                </select>
              </div>

              {/* Filter Elemen */}
              <div class="flex flex-col gap-1">
                <label for="filter-element" class="label-section text-[11px] text-ink-soft">
                  Elemen Kisi-kisi
                </label>
                <select
                  id="filter-element"
                  name="element"
                  class="h-10 px-3 bg-paper-soft border-2 border-ink rounded-badge font-body font-bold text-[14px] text-ink focus:outline-none focus:bg-card"
                  onchange="this.form.submit()"
                >
                  <option value="all" selected={selectedElementId === 'all'}>
                    Semua Elemen
                  </option>
                  {elements.map((el) => (
                    <option value={el.id} selected={selectedElementId === el.id}>
                      {el.name} ({el.level.toUpperCase()})
                    </option>
                  ))}
                </select>
              </div>

              {/* Filter Materi */}
              <div class="flex flex-col gap-1">
                <label for="filter-topic" class="label-section text-[11px] text-ink-soft">
                  Materi Pokok
                </label>
                <select
                  id="filter-topic"
                  name="topic"
                  class="h-10 px-3 bg-paper-soft border-2 border-ink rounded-badge font-body font-bold text-[14px] text-ink focus:outline-none focus:bg-card"
                  onchange="this.form.submit()"
                >
                  <option value="all" selected={selectedTopicId === 'all'}>
                    Semua Materi
                  </option>
                  <option value="none" selected={selectedTopicId === 'none'}>
                    Tanpa Materi (Khusus TO)
                  </option>
                  {topics.map((t) => (
                    <option value={t.id} selected={selectedTopicId === t.id}>
                      {t.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Filter Status */}
              <div class="flex flex-col gap-1">
                <label for="filter-status" class="label-section text-[11px] text-ink-soft">
                  Status Soal
                </label>
                <select
                  id="filter-status"
                  name="status"
                  class="h-10 px-3 bg-paper-soft border-2 border-ink rounded-badge font-body font-bold text-[14px] text-ink focus:outline-none focus:bg-card"
                  onchange="this.form.submit()"
                >
                  <option value="all" selected={selectedStatus === 'all'}>
                    Semua Status
                  </option>
                  <option value="published" selected={selectedStatus === 'published'}>
                    Terbit
                  </option>
                  <option value="draft" selected={selectedStatus === 'draft'}>
                    Draft
                  </option>
                  <option value="archived" selected={selectedStatus === 'archived'}>
                    Arsip
                  </option>
                </select>
              </div>
            </div>

            {/* Search Box & Summary */}
            <div class="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-grid">
              <div class="relative w-full sm:max-w-md">
                <span class="absolute left-3 top-2.5 text-ink-soft">
                  <Icon name="search" class="w-4 h-4" />
                </span>
                <input
                  type="text"
                  name="q"
                  value={searchQuery}
                  placeholder="Cari teks soal, rumus, atau kode..."
                  class="w-full h-10 pl-9 pr-3 bg-paper-soft border-2 border-ink rounded-badge font-body text-[14px] text-ink placeholder:text-ink-soft/60 focus:outline-none focus:bg-card"
                />
              </div>

              <div class="flex items-center gap-2 self-end sm:self-center">
                <span class="inline-flex items-center gap-1.5 px-3 py-1 bg-paper border-2 border-ink rounded-badge shadow-solid-sm font-label-section text-[12px] text-ink uppercase">
                  <span class="w-2 h-2 rounded-full bg-stabilo border border-ink"></span>
                  <span>Total {questions.length} Soal</span>
                </span>
                <button
                  type="submit"
                  class="h-10 px-4 bg-paper-soft border-2 border-ink rounded-badge font-body font-bold text-[13px] text-ink hover:bg-stabilo-soft"
                >
                  Filter
                </button>
              </div>
            </div>
          </form>
        </Card>

        {/* Question Table */}
        <Table
          headers={tableHeaders}
          isEmpty={questions.length === 0}
          emptyTitle="Tidak ada soal ditemukan"
          emptyDescription="Coba ubah filter jenjang, elemen, materi, atau kata kunci pencarian di atas."
        >
          {questions.map((q, idx) => {
            const el = getElementById(q.elementId);
            const top = getTopicById(q.topicId);
            const statusVariant =
              q.status === 'published' ? 'correct' : q.status === 'draft' ? 'stabilo' : 'neutral';
            const statusLabel =
              q.status === 'published' ? 'Terbit' : q.status === 'draft' ? 'Draft' : 'Arsip';

            return (
              <tr class="hover:bg-paper-soft/60 transition-colors">
                <td class="py-3 px-3 text-center font-title font-bold text-ink-soft border-r-2 border-ink/15">
                  {(idx + 1).toString().padStart(2, '0')}
                </td>
                <td class="py-3 px-4 border-r-2 border-ink/15">
                  <div class="flex flex-col gap-0.5">
                    <span class="font-body font-bold text-[14px] text-ink line-clamp-2">
                      {q.bodyRaw}
                    </span>
                    <span class="font-mono text-[11px] text-ink-soft">{q.code}</span>
                  </div>
                </td>
                <td class="py-3 px-3 border-r-2 border-ink/15">
                  <Badge variant={q.level === 'sd' ? 'orange' : 'blue'} size="sm">
                    {q.level === 'sd' ? 'SD Kelas 6' : 'SMP Kelas 9'}
                  </Badge>
                </td>
                <td class="py-3 px-3 border-r-2 border-ink/15">
                  <span class="font-body text-[13px] text-ink font-semibold">
                    {el?.name ?? '-'}
                  </span>
                </td>
                <td class="py-3 px-3 border-r-2 border-ink/15">
                  <span class="font-body text-[13px] text-ink-soft">
                    {top?.title ?? <em class="text-ink-soft/70">Khusus TO</em>}
                  </span>
                </td>
                <td class="py-3 px-3 border-r-2 border-ink/15">
                  <span class="font-body font-bold text-[13px] text-ink">
                    {q.questionType === 'single'
                      ? 'Pilihan Ganda'
                      : q.questionType === 'multiple'
                        ? 'PG Kompleks'
                        : 'Benar / Salah'}
                  </span>
                </td>
                <td class="py-3 px-3 border-r-2 border-ink/15">
                  <Badge variant={statusVariant} size="sm">
                    {statusLabel}
                  </Badge>
                </td>
                <td class="py-3 px-3 text-center">
                  <div class="flex items-center justify-center gap-1.5">
                    <button
                      type="button"
                      data-preview-id={q.id}
                      class="btn-open-preview min-h-[36px] px-2.5 py-1 rounded-badge bg-paper-soft border-2 border-ink hover:bg-stabilo text-ink font-body font-bold text-[12px] inline-flex items-center gap-1"
                      title="Lihat Pratinjau Siswa"
                    >
                      <Icon name="eye" class="w-3.5 h-3.5" />
                      <span class="hidden sm:inline">Preview</span>
                    </button>
                    <a
                      href={`/admin/soal/${q.id}/edit`}
                      class="min-h-[36px] px-2.5 py-1 rounded-badge bg-card border-2 border-ink hover:bg-paper-soft text-ink font-body font-bold text-[12px] inline-flex items-center gap-1"
                      title="Ubah Soal"
                    >
                      <Icon name="edit" class="w-3.5 h-3.5" />
                      <span class="hidden sm:inline">Ubah</span>
                    </a>
                  </div>
                </td>
              </tr>
            );
          })}
        </Table>

        {/* Modal Pratinjau Soal */}
        {Modal({
          id: 'modal-preview-soal',
          title: 'Pratinjau Tampilan Siswa',
          variant: 'preview',
          children: (
            <div id="modal-preview-body" class="p-2 sm:p-4">
              <p class="font-body text-ink-soft text-center py-6">Memuat preview soal...</p>
            </div>
          ),
        })}
      </div>
    ),
  });
}
