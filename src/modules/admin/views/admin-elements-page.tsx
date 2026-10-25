import type { ElementItem } from '../../../fixtures/types';
import { Badge } from '../../../views/components/badge';
import { Button } from '../../../views/components/button';
import { Card } from '../../../views/components/card';
import { Icon } from '../../../views/components/icon';
import { Input } from '../../../views/components/input';
import { Select } from '../../../views/components/select';
import { AdminLayout } from '../../../views/layouts/admin-layout';

export interface AdminElementsPageProps {
  elements: ElementItem[];
  editingElement?: ElementItem;
}

export function AdminElementsPage({
  elements,
  editingElement,
}: AdminElementsPageProps): string {
  const isEditing = Boolean(editingElement);
  const smpElements = elements.filter((e) => e.level === 'smp').sort((a, b) => a.order - b.order);
  const sdElements = elements.filter((e) => e.level === 'sd').sort((a, b) => a.order - b.order);

  return AdminLayout({
    title: 'Elemen Kisi-kisi',
    activeMenu: 'elements',
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
              <span class="text-ink">Elemen Kisi-kisi</span>
            </nav>
            <div class="relative inline-block">
              <h1 class="font-title font-extrabold text-[28px] sm:text-[32px] text-ink tracking-tight">
                Elemen <span class="stabilo-highlight">Kisi-kisi</span>
              </h1>
            </div>
            <p class="font-body text-[14px] text-ink-soft mt-1">
              Daftar domain kompetensi TKA per jenjang yang dinamis dari database (bukan enum hardcode).
            </p>
          </div>
        </div>

        {/* 2-Column Layout */}
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Element Lists (7 cols) */}
          <div class="lg:col-span-7 flex flex-col gap-6">
            {/* SMP Elements */}
            <Card variant="default" padding="sm" class="p-4 sm:p-5 flex flex-col gap-4">
              <div class="flex items-center justify-between border-b-2 border-ink/10 pb-3">
                <div class="flex items-center gap-2">
                  <Badge variant="purple">SMP KELAS 9</Badge>
                  <span class="font-title font-bold text-[16px] text-ink">
                    {smpElements.length} Elemen
                  </span>
                </div>
                <span class="text-[12px] font-bold text-ink-soft">TKA Matematika</span>
              </div>

              <div class="flex flex-col gap-2">
                {smpElements.map((el) => (
                  <div class="p-3 rounded-badge bg-paper-soft border-2 border-ink flex items-center justify-between gap-3 hover:bg-card transition-all">
                    <div class="flex items-center gap-3">
                      <span class="w-8 h-8 rounded-chip bg-ink text-card font-title font-bold text-[14px] flex items-center justify-center shrink-0">
                        {el.order}
                      </span>
                      <div>
                        <h2 class="font-title font-bold text-[15px] text-ink leading-snug">
                          {el.name}
                        </h2>
                        <p class="font-body text-[12px] text-ink-soft">
                          Slug: <code class="font-mono">{el.slug}</code> &bull; {el.topicCount} Materi &bull; {el.questionCount} Soal
                        </p>
                      </div>
                    </div>
                    <div class="flex items-center gap-1.5 shrink-0">
                      <a
                        href={`/admin/elemen?edit=${el.id}`}
                        class="p-2 rounded-chip bg-card hover:bg-stabilo-soft border border-ink text-ink text-[12px] font-bold inline-flex items-center gap-1"
                        title="Ubah Elemen"
                      >
                        <Icon name="edit" class="w-3.5 h-3.5" />
                        <span>Ubah</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* SD Elements */}
            <Card variant="default" padding="sm" class="p-4 sm:p-5 flex flex-col gap-4">
              <div class="flex items-center justify-between border-b-2 border-ink/10 pb-3">
                <div class="flex items-center gap-2">
                  <Badge variant="orange">SD KELAS 6</Badge>
                  <span class="font-title font-bold text-[16px] text-ink">
                    {sdElements.length} Elemen
                  </span>
                </div>
                <span class="text-[12px] font-bold text-ink-soft">TKA Matematika</span>
              </div>

              <div class="flex flex-col gap-2">
                {sdElements.map((el) => (
                  <div class="p-3 rounded-badge bg-paper-soft border-2 border-ink flex items-center justify-between gap-3 hover:bg-card transition-all">
                    <div class="flex items-center gap-3">
                      <span class="w-8 h-8 rounded-chip bg-ink text-card font-title font-bold text-[14px] flex items-center justify-center shrink-0">
                        {el.order}
                      </span>
                      <div>
                        <h2 class="font-title font-bold text-[15px] text-ink leading-snug">
                          {el.name}
                        </h2>
                        <p class="font-body text-[12px] text-ink-soft">
                          Slug: <code class="font-mono">{el.slug}</code> &bull; {el.topicCount} Materi &bull; {el.questionCount} Soal
                        </p>
                      </div>
                    </div>
                    <div class="flex items-center gap-1.5 shrink-0">
                      <a
                        href={`/admin/elemen?edit=${el.id}`}
                        class="p-2 rounded-chip bg-card hover:bg-stabilo-soft border border-ink text-ink text-[12px] font-bold inline-flex items-center gap-1"
                        title="Ubah Elemen"
                      >
                        <Icon name="edit" class="w-3.5 h-3.5" />
                        <span>Ubah</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column: Add/Edit Form (5 cols) */}
          <div class="lg:col-span-5 sticky top-24">
            <Card variant="default" padding="sm" class="p-4 sm:p-5 flex flex-col gap-4">
              <div class="border-b-2 border-ink/10 pb-3 flex items-center justify-between">
                <div>
                  <h2 class="font-title font-extrabold text-[18px] text-ink">
                    {isEditing ? 'Ubah Elemen' : 'Tambah Elemen Baru'}
                  </h2>
                  <p class="font-body text-[12px] text-ink-soft mt-0.5">
                    {isEditing
                      ? `Mengubah rincian elemen "${editingElement?.name}"`
                      : 'Tambahkan elemen kompetensi kisi-kisi baru'}
                  </p>
                </div>
                {isEditing && (
                  <a
                    href="/admin/elemen"
                    class="text-[12px] font-bold text-ink underline hover:text-wrong"
                  >
                    Batal
                  </a>
                )}
              </div>

              <form method="POST" action="/admin/elemen" class="flex flex-col gap-4">
                {isEditing && (
                  <input type="hidden" name="element_id" value={editingElement?.id} />
                )}

                <Select
                  label="Jenjang"
                  id="el-level"
                  name="level"
                  options={[
                    { value: 'smp', label: 'SMP Kelas 9' },
                    { value: 'sd', label: 'SD Kelas 6' },
                  ]}
                  selectedValue={editingElement?.level ?? 'smp'}
                />

                <Input
                  label="Nama Elemen"
                  id="el-name"
                  name="name"
                  type="text"
                  placeholder="Contoh: Bilangan, Geometri dan Pengukuran"
                  value={editingElement?.name ?? ''}
                  required
                />

                <Input
                  label="Nomor Urut Tampilan"
                  id="el-order"
                  name="order"
                  type="number"
                  placeholder="1, 2, 3..."
                  value={editingElement?.order ? editingElement.order.toString() : '1'}
                  required
                />

                <div class="pt-2 flex items-center gap-2">
                  <Button type="submit" variant="primary" fullWidth>
                    {isEditing ? 'Simpan Perubahan' : 'Simpan Elemen'}
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
