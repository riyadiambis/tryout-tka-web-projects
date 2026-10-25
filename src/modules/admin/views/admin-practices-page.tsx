import type { AdminQuestionRecord, AdminQuizRecord, TopicItem } from '../../../fixtures/types';
import { Badge } from '../../../views/components/badge';
import { Button } from '../../../views/components/button';
import { Card } from '../../../views/components/card';
import { Icon } from '../../../views/components/icon';
import { AdminLayout } from '../../../views/layouts/admin-layout';

export interface AdminPracticesPageProps {
  practices: AdminQuizRecord[];
  topics: TopicItem[];
  availableQuestions: AdminQuestionRecord[];
  selectedPractice?: AdminQuizRecord;
}

export function AdminPracticesPage({
  practices,
  topics,
  availableQuestions,
  selectedPractice,
}: AdminPracticesPageProps): string {
  const currentQuiz = selectedPractice ?? practices[0];
  const selectedQuestionIds = new Set(currentQuiz?.questionIds ?? []);

  return AdminLayout({
    title: 'Kelola Latihan',
    activeMenu: 'practices',
    scripts: ['/js/admin-quiz-form.js'],
    children: (
      <div class="flex flex-col gap-6">
        {/* Header Row */}
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <nav class="flex items-center gap-1.5 mb-1 text-ink-soft text-[12px] uppercase font-bold tracking-wider">
              <span>Admin</span>
              <Icon name="chevron-right" class="w-3.5 h-3.5" />
              <span>Paket Soal</span>
              <Icon name="chevron-right" class="w-3.5 h-3.5" />
              <span class="text-ink">Latihan</span>
            </nav>
            <div class="relative inline-block">
              <h1 class="font-title font-extrabold text-[26px] sm:text-[32px] text-ink tracking-tight">
                Kelola <span class="stabilo-highlight">Latihan</span>
              </h1>
            </div>
            <p class="font-body text-[14px] text-ink-soft mt-1">
              Atur paket latihan per materi (5 sampai 10 butir soal terbit per paket).
            </p>
          </div>

          <a
            href="/admin/latihan?action=new"
            class="min-h-[44px] px-4 py-2 rounded-badge bg-stabilo border-2 border-ink shadow-solid-sm pressable-sm font-title font-bold text-[14px] text-ink inline-flex items-center gap-2 self-start sm:self-auto"
          >
            <Icon name="plus" class="w-4 h-4" />
            <span>Buat Paket Baru</span>
          </a>
        </div>

        {/* Two-Column Layout */}
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: List of Practice Packages (5 cols) */}
          <div class="lg:col-span-5 flex flex-col gap-4">
            <h2 class="label-section text-[12px] text-ink">DAFTAR PAKET LATIHAN ({practices.length})</h2>

            <div class="flex flex-col gap-3">
              {practices.map((quiz) => {
                const topic = topics.find((t) => t.id === quiz.topicId);
                const isSelected = currentQuiz?.id === quiz.id;

                return (
                  <Card
                    variant="interactive"
                    padding="sm"
                    href={`/admin/latihan?id=${quiz.id}`}
                    class={`p-4 flex flex-col gap-2 transition-all ${
                      isSelected ? 'ring-2 ring-ink bg-paper shadow-solid' : 'bg-card'
                    }`}
                  >
                    <div class="flex items-start justify-between gap-2">
                      <div class="flex items-center gap-1.5 flex-wrap">
                        <Badge variant={quiz.level === 'sd' ? 'orange' : 'blue'} size="sm">
                          {quiz.level === 'sd' ? 'SD 6' : 'SMP 9'}
                        </Badge>
                        <Badge variant={quiz.status === 'published' ? 'correct' : 'stabilo'} size="sm">
                          {quiz.status === 'published' ? 'Terbit' : 'Draft'}
                        </Badge>
                      </div>
                      <span class="font-mono text-[11px] text-ink-soft">{quiz.code}</span>
                    </div>

                    <h3 class="font-title font-bold text-[16px] text-ink leading-tight">
                      {quiz.title}
                    </h3>
                    <p class="font-body text-[13px] text-ink-soft line-clamp-1">
                      Materi: {topic?.title ?? 'Umum'}
                    </p>

                    <div class="flex items-center justify-between pt-2 border-t border-grid text-[12px] font-body text-ink-soft">
                      <span>{quiz.questionIds.length} Butir Soal</span>
                      <span class="text-ink font-bold hover:underline">Kelola &rarr;</span>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Right Column: Edit Package Form (7 cols) */}
          <div class="lg:col-span-7 flex flex-col gap-5">
            <Card variant="default" padding="sm" class="p-5 flex flex-col gap-5">
              <div class="flex items-center justify-between pb-3 border-b-2 border-grid">
                <div>
                  <h2 class="font-title font-bold text-[18px] text-ink">
                    {currentQuiz ? `Edit: ${currentQuiz.title}` : 'Buat Paket Latihan Baru'}
                  </h2>
                  <p class="font-body text-[13px] text-ink-soft">
                    Pilih materi dan centang 5 sampai 10 soal terbit.
                  </p>
                </div>
                {currentQuiz && (
                  <Badge variant={currentQuiz.status === 'published' ? 'correct' : 'stabilo'}>
                    {currentQuiz.status === 'published' ? 'Terbit' : 'Draft'}
                  </Badge>
                )}
              </div>

              <form method="POST" action="/admin/latihan" class="flex flex-col gap-4">
                <input type="hidden" name="quizId" value={currentQuiz?.id ?? ''} />

                {/* Judul Paket */}
                <div class="flex flex-col gap-1">
                  <label for="practice-title" class="font-body font-bold text-[13px] text-ink">
                    Judul Paket Latihan *
                  </label>
                  <input
                    type="text"
                    id="practice-title"
                    name="title"
                    value={currentQuiz?.title ?? ''}
                    placeholder="Contoh: Latihan 1: Konsep Dasar Bilangan Berpangkat"
                    required
                    class="h-11 px-3 bg-paper-soft border-2 border-ink rounded-badge font-body text-[14px] text-ink focus:outline-none focus:bg-card"
                  />
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Jenjang */}
                  <div class="flex flex-col gap-1">
                    <label for="practice-level" class="font-body font-bold text-[13px] text-ink">
                      Jenjang *
                    </label>
                    <select
                      id="practice-level"
                      name="level"
                      class="h-11 px-3 bg-paper-soft border-2 border-ink rounded-badge font-body font-bold text-[14px] text-ink focus:outline-none"
                    >
                      <option value="smp" selected={currentQuiz?.level === 'smp'}>
                        SMP Kelas 9
                      </option>
                      <option value="sd" selected={currentQuiz?.level === 'sd'}>
                        SD Kelas 6
                      </option>
                    </select>
                  </div>

                  {/* Materi */}
                  <div class="flex flex-col gap-1">
                    <label for="practice-topic" class="font-body font-bold text-[13px] text-ink">
                      Materi Pokok *
                    </label>
                    <select
                      id="practice-topic"
                      name="topicId"
                      class="h-11 px-3 bg-paper-soft border-2 border-ink rounded-badge font-body text-[14px] text-ink focus:outline-none"
                    >
                      {topics.map((t) => (
                        <option value={t.id} selected={currentQuiz?.topicId === t.id}>
                          {t.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Deskripsi */}
                <div class="flex flex-col gap-1">
                  <label for="practice-desc" class="font-body font-bold text-[13px] text-ink">
                    Deskripsi Singkat
                  </label>
                  <input
                    type="text"
                    id="practice-desc"
                    name="description"
                    value={currentQuiz?.description ?? ''}
                    placeholder="Penjelasan singkat fokus latihan..."
                    class="h-10 px-3 bg-paper-soft border-2 border-ink rounded-badge font-body text-[13px] text-ink focus:outline-none"
                  />
                </div>

                {/* Question Selection Checklist */}
                <div class="flex flex-col gap-2 pt-2 border-t border-grid">
                  <div class="flex items-center justify-between">
                    <label class="font-body font-bold text-[13px] text-ink">
                      Pilih Butir Soal Terbit *
                    </label>
                    <span
                      id="question-counter-badge"
                      class="px-2.5 py-0.5 rounded-chip text-[12px] font-bold border-2 border-ink bg-stabilo text-ink"
                    >
                      <span id="selected-count">{selectedQuestionIds.size}</span> / 5-10 Soal
                    </span>
                  </div>

                  <p class="font-body text-[12px] text-ink-soft">
                    Sesuai PRD F5 dan A6: satu paket latihan berisi 5 sampai 10 butir soal terbit.
                  </p>

                  <div class="flex flex-col gap-2 max-h-[360px] overflow-y-auto p-2 bg-paper rounded-badge border-2 border-ink">
                    {availableQuestions.map((q) => {
                      const isChecked = selectedQuestionIds.has(q.id);

                      return (
                        <label class="p-3 rounded-badge bg-card border-2 border-ink flex items-start gap-3 cursor-pointer hover:bg-stabilo-soft/60 transition-colors">
                          <input
                            type="checkbox"
                            name="questionIds[]"
                            value={q.id}
                            checked={isChecked}
                            class="quiz-question-checkbox mt-1 w-4 h-4 text-ink accent-ink"
                          />
                          <div class="flex flex-col gap-0.5 flex-1 min-w-0">
                            <div class="flex items-center gap-2">
                              <span class="font-mono text-[11px] font-bold text-ink-soft">
                                {q.code}
                              </span>
                              <Badge variant="blue" size="sm">
                                {q.questionType === 'single'
                                  ? 'Pilihan Ganda'
                                  : q.questionType === 'multiple'
                                    ? 'PG Kompleks'
                                    : 'Kategori'}
                              </Badge>
                            </div>
                            <span class="font-body text-[13px] text-ink line-clamp-2">
                              {q.bodyRaw}
                            </span>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Validation Note */}
                <div
                  id="quiz-validation-warning"
                  class={`p-3 rounded-badge bg-wrong-bg border-2 border-wrong text-wrong text-[13px] font-body flex items-center gap-2 ${
                    selectedQuestionIds.size >= 5 && selectedQuestionIds.size <= 10 ? 'hidden' : ''
                  }`}
                >
                  <Icon name="info" class="w-4 h-4 shrink-0" />
                  <span>
                    Jumlah soal belum memenuhi syarat. Wajib memilih antara 5 sampai 10 butir soal.
                  </span>
                </div>

                {/* Action Buttons */}
                <div class="flex items-center justify-end gap-3 pt-3 border-t border-grid">
                  <button
                    type="submit"
                    name="action"
                    value="draft"
                    class="min-h-[44px] px-4 rounded-badge bg-card border-2 border-ink shadow-solid-sm pressable-sm font-body font-bold text-[13px] text-ink"
                  >
                    Simpan Draft
                  </button>
                  <button
                    type="submit"
                    id="btn-publish-quiz"
                    name="action"
                    value="publish"
                    disabled={selectedQuestionIds.size < 5 || selectedQuestionIds.size > 10}
                    class="min-h-[44px] px-6 rounded-badge bg-stabilo border-2 border-ink shadow-solid-sm pressable-sm font-title font-bold text-[14px] text-ink disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                  >
                    Terbitkan Paket
                  </button>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </div>
    ),
  });
}
