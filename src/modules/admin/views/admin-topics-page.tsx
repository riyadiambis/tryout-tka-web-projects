import type { ElementItem, TopicItem } from '../../../fixtures/types';
import { Badge } from '../../../views/components/badge';
import { Button } from '../../../views/components/button';
import { Card } from '../../../views/components/card';
import { Icon } from '../../../views/components/icon';
import { Input } from '../../../views/components/input';
import { Select } from '../../../views/components/select';
import { Table } from '../../../views/components/table';
import { AdminLayout } from '../../../views/layouts/admin-layout';

export interface AdminTopicsPageProps {
  topics: TopicItem[];
  elements: ElementItem[];
  selectedLevel?: string;
  selectedElementId?: string;
  editingTopic?: TopicItem;
}

export function AdminTopicsPage({
  topics,
  elements,
  selectedLevel = 'all',
  selectedElementId = 'all',
  editingTopic,
}: AdminTopicsPageProps): string {
  const isEditing = Boolean(editingTopic);

  const filteredTopics = topics.filter((t) => {
    if (selectedLevel !== 'all' && t.level !== selectedLevel) return false;
    if (selectedElementId !== 'all' && t.elementId !== selectedElementId) return false;
    return true;
  });

  const availableElementsForForm = editingTopic
    ? elements.filter((e) => e.level === editingTopic.level)
    : elements.filter((e) => (selectedLevel !== 'all' ? e.level === selectedLevel : true));

  const tableHeaders = [
    { label: 'No', width: '50px', align: 'center' as const },
    { label: 'Materi Pokok', width: '280px' },
    { label: 'Jenjang', width: '100px' },
    { label: 'Elemen', width: '170px' },
    { label: 'Video YouTube', width: '150px' },
    { label: 'Paket Latihan', width: '120px', align: 'center' as const },
    { label: 'Aksi', width: '100px', align: 'center' as const },
  ];

  return AdminLayout({
    title: 'Kelola Materi',
    activeMenu: 'topics',
    children: (
      <div class="flex flex-col gap-6">
        {/* Header Row */}
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <nav class="flex items-center gap-1.5 mb-1 text-ink-soft text-[12px] uppercase font-bold tracking-wider">
              <span>Admin</span>
              <Icon name="chevron-right" class="w-3.5 h-3.5" />
              <span>Struktur Konten</span>
              <Icon name="chevron-right" class="w-3.5 h-3.5" />
              <span class="text-ink">Materi Pokok</span>
            </nav>
            <div class="relative inline-block">
              <h1 class="font-title font-extrabold text-[28px] sm:text-[32px] text-ink tracking-tight">
                Materi <span class="stabilo-highlight">Pokok</span>
              </h1>
            </div>
            <p class="font-body text-[14px] text-ink-soft mt-1">
              Daftar bab materi TKA Matematika beserta tautan video penjelasan YouTube pendukung.
            </p>
          </div>
        </div>

        {/* Filter Toolbar */}
        <Card variant="default" padding="sm" class="p-4 sm:p-5">
          <form method="GET" action="/admin/materi" class="flex flex-col sm:flex-row gap-3 items-end">
            <div class="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
              <div class="flex flex-col gap-1">
                <label for="filter-topic-level" class="label-section text-[11px] text-ink-soft">
                  Filter Jenjang
                </label>
                <select
                  id="filter-topic-level"
                  name="level"
                  class="h-10 px-3 bg-paper-soft border-2 border-ink rounded-badge font-body font-bold text-[14px] text-ink focus:outline-none focus:bg-card"
                  onchange="this.form.submit()"
                >
                  <option value="all" selected={selectedLevel === 'all'}>
                    Semua Jenjang
                  </option>
                  <option value="smp" selected={selectedLevel === 'smp'}>
                    SMP Kelas 9
                  </option>
                  <option value="sd" selected={selectedLevel === 'sd'}>
                    SD Kelas 6
                  </option>
                </select>
              </div>

              <div class="flex flex-col gap-1">
                <label for="filter-topic-element" class="label-section text-[11px] text-ink-soft">
                  Filter Elemen
                </label>
                <select
                  id="filter-topic-element"
                  name="element_id"
                  class="h-10 px-3 bg-paper-soft border-2 border-ink rounded-badge font-body font-bold text-[14px] text-ink focus:outline-none focus:bg-card"
                  onchange="this.form.submit()"
                >
                  <option value="all" selected={selectedElementId === 'all'}>
                    Semua Elemen
                  </option>
                  {elements.map((e) => (
                    <option value={e.id} selected={selectedElementId === e.id}>
                      [{e.level.toUpperCase()}] {e.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div class="shrink-0 flex gap-2">
              <a
                href="/admin/materi"
                class="min-h-[40px] px-3.5 py-2 rounded-badge bg-paper-soft border-2 border-ink font-body font-bold text-[13px] text-ink inline-flex items-center gap-1.5 hover:bg-card"
              >
                <Icon name="refresh" class="w-4 h-4" />
                <span>Reset</span>
              </a>
            </div>
          </form>
        </Card>

        {/* 2-Column Layout */}
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Topics Table (7 cols) */}
          <div class="lg:col-span-7 flex flex-col gap-4">
            <div class="flex items-center justify-between">
              <span class="label-section text-[12px] text-ink">
                DAFTAR MATERI ({filteredTopics.length})
              </span>
            </div>

            <Table headers={tableHeaders}>
              {filteredTopics.map((t, idx) => {
                const videoBadge = t.videoId ? (
                  <a
                    href={`https://youtu.be/${t.videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="px-2 py-1 rounded-chip bg-paper-soft hover:bg-stabilo-soft border border-ink text-[12px] font-bold text-ink inline-flex items-center gap-1"
                    title="Buka Video Materi di Tab Baru"
                  >
                    <Icon name="play" class="w-3.5 h-3.5 text-badge-orange" />
                    <span>Terhubung</span>
                  </a>
                ) : (
                  <span class="text-[12px] font-bold text-ink-soft">Belum Ada</span>
                );

                return (
                  <tr class="hover:bg-paper-soft/60 transition-colors">
                    <td class="py-3 px-3.5 border-r-2 border-ink/20">
                      <span class="font-mono text-[12px] font-bold text-ink text-center block">
                        {idx + 1}
                      </span>
                    </td>
                    <td class="py-3 px-3.5 border-r-2 border-ink/20">
                      <div>
                        <h2 class="font-title font-bold text-[14px] text-ink leading-tight">
                          {t.title}
                        </h2>
                        <p class="font-body text-[11px] text-ink-soft truncate max-w-[240px]">
                          {t.description}
                        </p>
                      </div>
                    </td>
                    <td class="py-3 px-3.5 border-r-2 border-ink/20">
                      <Badge variant={t.level === 'sd' ? 'orange' : 'purple'}>
                        {t.level.toUpperCase()}
                      </Badge>
                    </td>
                    <td class="py-3 px-3.5 border-r-2 border-ink/20">
                      <Badge variant={t.elementBadgeColor}>{t.elementName}</Badge>
                    </td>
                    <td class="py-3 px-3.5 border-r-2 border-ink/20">{videoBadge}</td>
                    <td class="py-3 px-3.5 border-r-2 border-ink/20">
                      <span class="font-body font-bold text-[13px] text-ink text-center block">
                        {t.practiceCount} Paket
                      </span>
                    </td>
                    <td class="py-3 px-3.5 text-center">
                      <div class="flex items-center justify-center">
                        <a
                          href={`/admin/materi?edit=${t.id}`}
                          class="p-1.5 rounded-chip bg-paper-soft hover:bg-stabilo-soft border border-ink text-ink"
                          title="Ubah Materi"
                        >
                          <Icon name="edit" class="w-4 h-4" />
                        </a>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </Table>
          </div>

          {/* Right Column: Add/Edit Form (5 cols) */}
          <div class="lg:col-span-5 sticky top-24">
            <Card variant="default" padding="sm" class="p-4 sm:p-5 flex flex-col gap-4">
              <div class="border-b-2 border-ink/10 pb-3 flex items-center justify-between">
                <div>
                  <h2 class="font-title font-extrabold text-[18px] text-ink">
                    {isEditing ? 'Ubah Materi' : 'Tambah Materi Baru'}
                  </h2>
                  <p class="font-body text-[12px] text-ink-soft mt-0.5">
                    {isEditing
                      ? `Mengubah rincian bab "${editingTopic?.title}"`
                      : 'Tambahkan materi pokok baru untuk jenjang terpilih'}
                  </p>
                </div>
                {isEditing && (
                  <a
                    href="/admin/materi"
                    class="text-[12px] font-bold text-ink underline hover:text-wrong"
                  >
                    Batal
                  </a>
                )}
              </div>

              <form method="POST" action="/admin/materi" class="flex flex-col gap-4">
                {isEditing && <input type="hidden" name="topic_id" value={editingTopic?.id} />}

                <Select
                  label="Jenjang"
                  id="topic-level"
                  name="level"
                  options={[
                    { value: 'smp', label: 'SMP Kelas 9' },
                    { value: 'sd', label: 'SD Kelas 6' },
                  ]}
                  selectedValue={editingTopic?.level ?? (selectedLevel !== 'all' ? selectedLevel : 'smp')}
                />

                <Select
                  label="Elemen Kisi-kisi"
                  id="topic-element"
                  name="element_id"
                  options={availableElementsForForm.map((e) => ({
                    value: e.id,
                    label: `[${e.level.toUpperCase()}] ${e.name}`,
                  }))}
                  selectedValue={editingTopic?.elementId ?? availableElementsForForm[0]?.id ?? ''}
                />

                <Input
                  label="Judul Materi"
                  id="topic-title"
                  name="title"
                  type="text"
                  placeholder="Contoh: Bilangan Berpangkat"
                  value={editingTopic?.title ?? ''}
                  required
                />

                <Input
                  label="Slug URL"
                  id="topic-slug"
                  name="slug"
                  type="text"
                  placeholder="Contoh: bilangan-berpangkat"
                  value={editingTopic?.slug ?? ''}
                  required
                />

                <div class="flex flex-col gap-1.5">
                  <label for="topic-desc" class="label-section text-[12px] text-ink">
                    Deskripsi Ringkas
                  </label>
                  <textarea
                    id="topic-desc"
                    name="description"
                    rows="3"
                    placeholder="Tuliskan gambaran ringkas materi ini..."
                    class="w-full p-3 rounded-badge border-2 border-ink bg-paper-soft text-ink font-body text-[14px] focus:bg-card focus:outline-none"
                  >
                    {editingTopic?.description ?? ''}
                  </textarea>
                </div>

                <Input
                  label="Link Video Materi YouTube (Opsional)"
                  id="topic-video"
                  name="video_url"
                  type="text"
                  placeholder="Contoh: https://youtu.be/k9X8zV7mQ1A"
                  value={editingTopic?.videoId ? `https://youtu.be/${editingTopic.videoId}` : ''}
                />

                <div class="pt-2 flex items-center gap-2">
                  <Button type="submit" variant="primary" fullWidth>
                    {isEditing ? 'Simpan Perubahan' : 'Simpan Materi'}
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </div>
    ),
  });
}
