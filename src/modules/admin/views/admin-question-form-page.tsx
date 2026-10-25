import type { AdminQuestionRecord, ElementItem, TopicItem } from '../../../fixtures/types';
import { Button } from '../../../views/components/button';
import { Card } from '../../../views/components/card';
import { Icon } from '../../../views/components/icon';
import { AdminLayout } from '../../../views/layouts/admin-layout';
import { AdminQuestionPreviewFragment } from './admin-question-preview-fragment';

export interface AdminQuestionFormPageProps {
  isEditing: boolean;
  question?: AdminQuestionRecord;
  elements: ElementItem[];
  topics: TopicItem[];
}

export function AdminQuestionFormPage({
  isEditing,
  question,
  elements,
  topics,
}: AdminQuestionFormPageProps): string {
  const title = isEditing ? 'Ubah Soal' : 'Tambah Soal Baru';
  const actionUrl = isEditing ? `/admin/soal/${question?.id}/edit` : '/admin/soal/tambah';

  const initialLevel = question?.level ?? 'smp';
  const initialElementId = question?.elementId ?? elements[0]?.id ?? '';
  const initialTopicId = question?.topicId ?? '';
  const initialType = question?.questionType ?? 'single';

  // Format initial video time
  const initialTimeLabel = question?.longVideoSeconds
    ? `${Math.floor(question.longVideoSeconds / 60)
        .toString()
        .padStart(2, '0')}:${(question.longVideoSeconds % 60).toString().padStart(2, '0')}`
    : '';

  // Initial preview data
  const initialPreviewData = {
    level: initialLevel,
    elementName: elements.find((e) => e.id === initialElementId)?.name ?? 'Matematika',
    topicTitle: topics.find((t) => t.id === initialTopicId)?.title,
    questionType: initialType,
    bodyRaw: question?.bodyRaw ?? 'Ketik teks soal di samping untuk melihat preview...',
    imageUrl: question?.imageUrl,
    choiceOptionsRaw: question?.choiceOptionsRaw ?? [
      { key: 'A', textRaw: 'Pilihan A' },
      { key: 'B', textRaw: 'Pilihan B' },
      { key: 'C', textRaw: 'Pilihan C' },
      { key: 'D', textRaw: 'Pilihan D' },
    ],
    statementsRaw: question?.statementsRaw ?? [
      { statementId: 'stmt-1', textRaw: 'Pernyataan 1' },
      { statementId: 'stmt-2', textRaw: 'Pernyataan 2' },
      { statementId: 'stmt-3', textRaw: 'Pernyataan 3' },
    ],
    answerKey: question?.answerKey ?? { questionType: 'single', key: 'A' },
    explanationRaw: question?.explanationRaw ?? 'Tuliskan langkah pembahasan di sini...',
    shortsId: question?.shortsId,
    longVideoId: question?.longVideoId,
    longVideoSeconds: question?.longVideoSeconds,
  };

  return AdminLayout({
    title,
    activeMenu: 'questions',
    scripts: ['/js/admin-question-form.js'],
    children: (
      <div class="flex flex-col gap-6">
        {/* Header Row */}
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <nav class="flex items-center gap-1.5 mb-1 text-ink-soft text-[12px] uppercase font-bold tracking-wider">
              <a href="/admin/soal" class="hover:underline">
                Bank Soal
              </a>
              <Icon name="chevron-right" class="w-3.5 h-3.5" />
              <span class="text-ink">{title}</span>
            </nav>
            <h1 class="font-title font-extrabold text-[26px] sm:text-[30px] text-ink tracking-tight">
              {title} {question ? <span class="font-mono text-[18px] text-ink-soft font-bold">({question.code})</span> : null}
            </h1>
          </div>

          <a
            href="/admin/soal"
            class="min-h-[44px] px-4 py-2 rounded-badge bg-paper-soft border-2 border-ink font-body font-bold text-[14px] text-ink inline-flex items-center gap-1.5 self-start sm:self-auto hover:bg-card"
          >
            <Icon name="arrow-left" class="w-4 h-4" />
            <span>Kembali ke Bank Soal</span>
          </a>
        </div>

        {/* Two-Column Editor & Live Preview */}
        <form id="form-question" method="POST" action={actionUrl} class="flex flex-col gap-6">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Form Fields (7 cols) */}
            <div class="lg:col-span-7 flex flex-col gap-5">
              {/* Card 1: Klasifikasi */}
              <Card variant="default" padding="sm" class="p-4 sm:p-5 flex flex-col gap-4">
                <h2 class="label-section text-[12px] text-ink">KLASIFIKASI SOAL</h2>

                <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Jenjang */}
                  <div class="flex flex-col gap-1">
                    <label for="q-level" class="font-body font-bold text-[13px] text-ink">
                      Jenjang *
                    </label>
                    <select
                      id="q-level"
                      name="level"
                      class="h-11 px-3 bg-paper-soft border-2 border-ink rounded-badge font-body font-bold text-[14px] text-ink focus:outline-none focus:bg-card"
                    >
                      <option value="smp" selected={initialLevel === 'smp'}>
                        SMP Kelas 9
                      </option>
                      <option value="sd" selected={initialLevel === 'sd'}>
                        SD Kelas 6
                      </option>
                    </select>
                  </div>

                  {/* Elemen Kisi-kisi */}
                  <div class="flex flex-col gap-1">
                    <label for="q-element" class="font-body font-bold text-[13px] text-ink">
                      Elemen Kisi-kisi *
                    </label>
                    <select
                      id="q-element"
                      name="elementId"
                      class="h-11 px-3 bg-paper-soft border-2 border-ink rounded-badge font-body text-[14px] text-ink focus:outline-none focus:bg-card"
                    >
                      {elements.map((el) => (
                        <option value={el.id} selected={initialElementId === el.id}>
                          {el.name} ({el.level.toUpperCase()})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Materi Pokok (Opsional untuk TO) */}
                  <div class="flex flex-col gap-1">
                    <label for="q-topic" class="font-body font-bold text-[13px] text-ink">
                      Materi Pokok <span class="text-ink-soft text-[11px]">(Opsional)</span>
                    </label>
                    <select
                      id="q-topic"
                      name="topicId"
                      class="h-11 px-3 bg-paper-soft border-2 border-ink rounded-badge font-body text-[14px] text-ink focus:outline-none focus:bg-card"
                    >
                      <option value="" selected={!initialTopicId}>
                        Tanpa materi (khusus TO)
                      </option>
                      {topics.map((t) => (
                        <option value={t.id} selected={initialTopicId === t.id}>
                          {t.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Bentuk Soal */}
                <div class="flex flex-col gap-1.5 pt-2 border-t border-grid">
                  <label class="font-body font-bold text-[13px] text-ink">Bentuk Soal *</label>
                  <div class="grid grid-cols-3 gap-2">
                    <label class="flex items-center justify-center gap-1.5 p-2.5 rounded-badge border-2 border-ink cursor-pointer font-body font-bold text-[13px] text-ink bg-card has-[:checked]:bg-stabilo has-[:checked]:shadow-solid-sm">
                      <input
                        type="radio"
                        name="questionType"
                        value="single"
                        checked={initialType === 'single'}
                        class="sr-only"
                      />
                      <span>Pilihan Ganda</span>
                    </label>
                    <label class="flex items-center justify-center gap-1.5 p-2.5 rounded-badge border-2 border-ink cursor-pointer font-body font-bold text-[13px] text-ink bg-card has-[:checked]:bg-stabilo has-[:checked]:shadow-solid-sm">
                      <input
                        type="radio"
                        name="questionType"
                        value="multiple"
                        checked={initialType === 'multiple'}
                        class="sr-only"
                      />
                      <span>PG Kompleks</span>
                    </label>
                    <label class="flex items-center justify-center gap-1.5 p-2.5 rounded-badge border-2 border-ink cursor-pointer font-body font-bold text-[13px] text-ink bg-card has-[:checked]:bg-stabilo has-[:checked]:shadow-solid-sm">
                      <input
                        type="radio"
                        name="questionType"
                        value="category"
                        checked={initialType === 'category'}
                        class="sr-only"
                      />
                      <span>Benar / Salah</span>
                    </label>
                  </div>
                </div>
              </Card>

              {/* Card 2: Konten Soal */}
              <Card variant="default" padding="sm" class="p-4 sm:p-5 flex flex-col gap-4">
                <div class="flex items-center justify-between">
                  <h2 class="label-section text-[12px] text-ink">TEKS SOAL & FORMULA</h2>
                  <span class="text-[11px] font-mono text-ink-soft bg-paper-soft px-2 py-0.5 rounded border border-ink/20">
                    Markdown + LaTeX
                  </span>
                </div>

                <div class="flex flex-col gap-1.5">
                  <label for="q-body" class="font-body font-bold text-[13px] text-ink">
                    Batang Soal (Stem) *
                  </label>
                  <textarea
                    id="q-body"
                    name="bodyRaw"
                    rows="4"
                    placeholder="Contoh: Hasil dari $2^3 \times 2^4$ adalah ... atau gunakan rumus blok $$a^2 + b^2 = c^2$$"
                    class="w-full p-3 bg-paper-soft border-2 border-ink rounded-badge font-mono text-[13px] text-ink placeholder:text-ink-soft/60 focus:outline-none focus:bg-card"
                    required
                  >
                    {question?.bodyRaw ?? ''}
                  </textarea>
                </div>

                {/* Gambar Soal (Opsional) */}
                <div class="flex flex-col gap-1">
                  <label for="q-image" class="font-body font-bold text-[13px] text-ink">
                    Link / Nama File Gambar <span class="text-ink-soft text-[11px]">(Opsional)</span>
                  </label>
                  <input
                    type="text"
                    id="q-image"
                    name="imageUrl"
                    value={question?.imageUrl ?? ''}
                    placeholder="Contoh: /uploads/soal-segitiga-01.png"
                    class="h-10 px-3 bg-paper-soft border-2 border-ink rounded-badge font-body text-[13px] text-ink focus:outline-none focus:bg-card"
                  />
                </div>
              </Card>

              {/* Card 3: Opsi Jawaban & Kunci (Disesuaikan Bentuk Soal) */}
              <Card variant="default" padding="sm" class="p-4 sm:p-5 flex flex-col gap-4">
                <div class="flex items-center justify-between">
                  <h2 class="label-section text-[12px] text-ink">OPSI JAWABAN & KUNCI</h2>
                  <span id="hint-bentuk-soal" class="text-[12px] font-body text-ink-soft">
                    {initialType === 'single'
                      ? 'Pilih 1 kunci benar'
                      : initialType === 'multiple'
                        ? 'Centang semua kunci benar'
                        : 'Tentukan Benar/Salah tiap baris'}
                  </span>
                </div>

                {/* Editor Single Choice */}
                <div
                  id="editor-single"
                  class={`flex flex-col gap-3 ${initialType === 'single' ? '' : 'hidden'}`}
                >
                  {['A', 'B', 'C', 'D'].map((key) => {
                    const opt = question?.choiceOptionsRaw?.find((o: { key: string }) => o.key === key);
                    const isKey =
                      question?.answerKey.questionType === 'single' &&
                      question.answerKey.key === key;
                    return (
                      <div class="flex items-center gap-2">
                        <label
                          class="flex items-center gap-1.5 cursor-pointer"
                          title="Tandai sebagai kunci"
                        >
                          <input
                            type="radio"
                            name="keySingle"
                            value={key}
                            checked={isKey || (key === 'A' && !question)}
                            class="w-4 h-4 text-ink accent-ink"
                          />
                          <span class="w-7 h-7 rounded-badge bg-paper-soft border-2 border-ink flex items-center justify-center font-title font-bold text-[13px] text-ink">
                            {key}
                          </span>
                        </label>
                        <input
                          type="text"
                          name={`option_${key}`}
                          value={opt?.textRaw ?? ''}
                          placeholder={`Pilihan ${key} (Markdown / LaTeX)`}
                          class="flex-1 h-10 px-3 bg-paper-soft border-2 border-ink rounded-badge font-mono text-[13px] text-ink focus:outline-none focus:bg-card input-option-text"
                        />
                      </div>
                    );
                  })}
                </div>

                {/* Editor Multiple Choice (MCMA) */}
                <div
                  id="editor-multiple"
                  class={`flex flex-col gap-3 ${initialType === 'multiple' ? '' : 'hidden'}`}
                >
                  {['A', 'B', 'C', 'D'].map((key) => {
                    const opt = question?.choiceOptionsRaw?.find((o: { key: string }) => o.key === key);
                    const isKey =
                      question?.answerKey.questionType === 'multiple' &&
                      question.answerKey.keys.includes(key);
                    return (
                      <div class="flex items-center gap-2">
                        <label
                          class="flex items-center gap-1.5 cursor-pointer"
                          title="Centang jika termasuk kunci benar"
                        >
                          <input
                            type="checkbox"
                            name="keysMultiple[]"
                            value={key}
                            checked={isKey}
                            class="w-4 h-4 text-ink accent-ink"
                          />
                          <span class="w-7 h-7 rounded-badge bg-paper-soft border-2 border-ink flex items-center justify-center font-title font-bold text-[13px] text-ink">
                            {key}
                          </span>
                        </label>
                        <input
                          type="text"
                          name={`option_mult_${key}`}
                          value={opt?.textRaw ?? ''}
                          placeholder={`Pilihan ${key} (Markdown / LaTeX)`}
                          class="flex-1 h-10 px-3 bg-paper-soft border-2 border-ink rounded-badge font-mono text-[13px] text-ink focus:outline-none focus:bg-card input-option-text"
                        />
                      </div>
                    );
                  })}
                </div>

                {/* Editor Category (Benar/Salah) */}
                <div
                  id="editor-category"
                  class={`flex flex-col gap-3 ${initialType === 'category' ? '' : 'hidden'}`}
                >
                  {[1, 2, 3].map((num) => {
                    const stmtId = `stmt-${num}`;
                    const stmt = question?.statementsRaw?.find((s: { statementId: string }) => s.statementId === stmtId);
                    const currentAnswer =
                      question?.answerKey.questionType === 'category'
                        ? question.answerKey.answers[stmtId]
                        : true;

                    return (
                      <div class="p-3 bg-paper-soft rounded-badge border-2 border-ink flex flex-col gap-2">
                        <div class="flex items-center justify-between gap-2">
                          <span class="font-title font-bold text-[13px] text-ink">
                            Pernyataan {num}
                          </span>
                          <div class="flex items-center gap-2">
                            <label class="flex items-center gap-1 font-body text-[12px] font-bold text-correct cursor-pointer">
                              <input
                                type="radio"
                                name={`cat_ans_${num}`}
                                value="true"
                                checked={currentAnswer === true}
                                class="accent-correct"
                              />
                              <span>Benar</span>
                            </label>
                            <label class="flex items-center gap-1 font-body text-[12px] font-bold text-wrong cursor-pointer">
                              <input
                                type="radio"
                                name={`cat_ans_${num}`}
                                value="false"
                                checked={currentAnswer === false}
                                class="accent-wrong"
                              />
                              <span>Salah</span>
                            </label>
                          </div>
                        </div>
                        <input
                          type="text"
                          name={`stmt_${num}`}
                          value={stmt?.textRaw ?? ''}
                          placeholder={`Teks pernyataan ${num} (Markdown / LaTeX)`}
                          class="w-full h-9 px-3 bg-card border-2 border-ink rounded-badge font-mono text-[13px] text-ink focus:outline-none input-option-text"
                        />
                      </div>
                    );
                  })}
                </div>
              </Card>

              {/* Card 4: Pembahasan Tertulis & Video */}
              <Card variant="default" padding="sm" class="p-4 sm:p-5 flex flex-col gap-4">
                <h2 class="label-section text-[12px] text-ink">PEMBAHASAN & MEDIA VIDEO</h2>

                <div class="flex flex-col gap-1.5">
                  <label for="q-explanation" class="font-body font-bold text-[13px] text-ink">
                    Pembahasan Tertulis *
                  </label>
                  <textarea
                    id="q-explanation"
                    name="explanationRaw"
                    rows="4"
                    placeholder="Langkah penyelesaian lengkap menggunakan rumus LaTeX..."
                    class="w-full p-3 bg-paper-soft border-2 border-ink rounded-badge font-mono text-[13px] text-ink placeholder:text-ink-soft/60 focus:outline-none focus:bg-card"
                    required
                  >
                    {question?.explanationRaw ?? ''}
                  </textarea>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-grid">
                  {/* Link Shorts */}
                  <div class="flex flex-col gap-1">
                    <label for="q-shorts" class="font-body font-bold text-[12px] text-ink">
                      Link / ID Shorts YouTube
                    </label>
                    <input
                      type="text"
                      id="q-shorts"
                      name="shortsId"
                      value={question?.shortsId ?? ''}
                      placeholder="youtu.be/... atau ID"
                      class="h-10 px-3 bg-paper-soft border-2 border-ink rounded-badge font-body text-[13px] text-ink focus:outline-none focus:bg-card"
                    />
                  </div>

                  {/* Link Video Panjang */}
                  <div class="flex flex-col gap-1">
                    <label for="q-long-video" class="font-body font-bold text-[12px] text-ink">
                      Link Video Panjang
                    </label>
                    <input
                      type="text"
                      id="q-long-video"
                      name="longVideoId"
                      value={question?.longVideoId ?? ''}
                      placeholder="youtube.com/watch?v=..."
                      class="h-10 px-3 bg-paper-soft border-2 border-ink rounded-badge font-body text-[13px] text-ink focus:outline-none focus:bg-card"
                    />
                  </div>

                  {/* Menit Konsep */}
                  <div class="flex flex-col gap-1">
                    <label for="q-video-time" class="font-body font-bold text-[12px] text-ink">
                      Menit Konsep (mm:ss)
                    </label>
                    <input
                      type="text"
                      id="q-video-time"
                      name="longVideoTime"
                      value={initialTimeLabel}
                      placeholder="Contoh: 03:20"
                      class="h-10 px-3 bg-paper-soft border-2 border-ink rounded-badge font-body text-[13px] text-ink focus:outline-none focus:bg-card"
                    />
                  </div>
                </div>
              </Card>
            </div>

            {/* Right Column: Sticky Live Preview Panel (5 cols) */}
            <div class="lg:col-span-5 sticky top-20 flex flex-col gap-3">
              <Card variant="default" padding="sm" class="p-4 sm:p-5 flex flex-col gap-3">
                <div class="flex items-center justify-between pb-2 border-b-2 border-grid">
                  <div class="flex items-center gap-2">
                    <span class="w-3 h-3 rounded-full bg-correct border border-ink"></span>
                    <span class="font-title font-bold text-[15px] text-ink">
                      Live Preview Siswa
                    </span>
                  </div>

                  {/* Tab Switcher: Saat Mengerjakan vs Setelah Submit */}
                  <div class="inline-flex p-1 bg-paper-soft border-2 border-ink rounded-badge gap-1">
                    <button
                      type="button"
                      id="tab-btn-attempt"
                      class="px-2.5 py-1 rounded text-[11px] font-bold bg-stabilo text-ink border border-ink shadow-solid-sm"
                    >
                      Mengerjakan
                    </button>
                    <button
                      type="button"
                      id="tab-btn-result"
                      class="px-2.5 py-1 rounded text-[11px] font-bold text-ink-soft hover:text-ink"
                    >
                      Hasil
                    </button>
                  </div>
                </div>

                {/* Preview Container */}
                <div
                  id="live-preview-container"
                  class="max-h-[70vh] overflow-y-auto p-1 border-2 border-dashed border-ink/20 rounded-badge bg-paper"
                >
                  <AdminQuestionPreviewFragment data={initialPreviewData} />
                </div>
              </Card>

              {/* Bottom Action Card */}
              <Card variant="default" padding="sm" class="p-4 flex flex-col gap-2.5">
                <div class="text-[12px] font-body text-ink-soft flex items-center gap-1.5">
                  <Icon name="info" class="w-4 h-4 text-ink" />
                  <span id="preview-requirement-note">
                    {question?.status === 'published'
                      ? 'Soal sudah terbit. Perubahan dapat disimpan.'
                      : 'Buka preview siswa untuk mengaktifkan tombol Terbitkan.'}
                  </span>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    type="submit"
                    name="action"
                    value="draft"
                    class="min-h-[44px] px-3 rounded-badge bg-card border-2 border-ink shadow-solid-sm pressable-sm font-body font-bold text-[13px] text-ink"
                  >
                    Simpan Draft
                  </button>
                  <button
                    type="button"
                    id="btn-inspect-preview"
                    class="min-h-[44px] px-3 rounded-badge bg-paper-soft border-2 border-ink shadow-solid-sm pressable-sm font-body font-bold text-[13px] text-ink hover:bg-stabilo-soft"
                  >
                    Buka Preview
                  </button>
                  <button
                    type="submit"
                    id="btn-publish-question"
                    name="action"
                    value="publish"
                    disabled={question?.status !== 'published'}
                    class="min-h-[44px] px-3 rounded-badge bg-stabilo border-2 border-ink shadow-solid-sm pressable-sm font-title font-bold text-[14px] text-ink disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                  >
                    Terbitkan
                  </button>
                </div>
              </Card>
            </div>
          </div>
        </form>
      </div>
    ),
  });
}
