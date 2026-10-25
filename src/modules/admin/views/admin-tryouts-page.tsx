import type { AdminQuestionRecord, AdminQuizRecord } from '../../../fixtures/types';
import { Badge } from '../../../views/components/badge';
import { Card } from '../../../views/components/card';
import { Icon } from '../../../views/components/icon';
import { AdminLayout } from '../../../views/layouts/admin-layout';

export interface AdminTryoutsPageProps {
  tryouts: AdminQuizRecord[];
  availableQuestions: AdminQuestionRecord[];
  selectedTryout?: AdminQuizRecord;
}

export function AdminTryoutsPage({
  tryouts,
  availableQuestions,
  selectedTryout,
}: AdminTryoutsPageProps): string {
  const currentQuiz = selectedTryout ?? tryouts[0];
  const selectedQuestionIds = new Set(currentQuiz?.questionIds ?? []);

  return AdminLayout({
    title: 'Kelola Tryout',
    activeMenu: 'tryouts',
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
              <span class="text-ink">Tryout</span>
            </nav>
            <div class="relative inline-block">
              <h1 class="font-title font-extrabold text-[26px] sm:text-[32px] text-ink tracking-tight">
                Kelola <span class="stabilo-highlight">Tryout</span>
              </h1>
            </div>
            <p class="font-body text-[14px] text-ink-soft mt-1">
              Atur paket Tryout TKA (durasi menit dan 10 sampai 15 butir soal terbit per paket).
            </p>
          </div>

          <a
            href="/admin/tryout?action=new"
            class="min-h-[44px] px-4 py-2 rounded-badge bg-stabilo border-2 border-ink shadow-solid-sm pressable-sm font-title font-bold text-[14px] text-ink inline-flex items-center gap-2 self-start sm:self-auto"
          >
            <Icon name="plus" class="w-4 h-4" />
            <span>Buat Tryout Baru</span>
          </a>
        </div>

        {/* Two-Column Layout */}
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: List of TO Packages (5 cols) */}
          <div class="lg:col-span-5 flex flex-col gap-4">
            <h2 class="label-section text-[12px] text-ink">DAFTAR PAKET TRYOUT ({tryouts.length})</h2>

            <div class="flex flex-col gap-3">
              {tryouts.map((quiz) => {
                const isSelected = currentQuiz?.id === quiz.id;

                return (
                  <Card
                    variant="interactive"
                    padding="sm"
                    href={`/admin/tryout?id=${quiz.id}`}
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
                      Durasi: {quiz.durationMinutes ?? 30} Menit
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
                    {currentQuiz ? `Edit: ${currentQuiz.title}` : 'Buat Paket Tryout Baru'}
                  </h2>
                  <p class="font-body text-[13px] text-ink-soft">
                    Atur durasi dan pilih 10 sampai 15 soal terbit lintas materi.
                  </p>
                </div>
                {currentQuiz && (
                  <Badge variant={currentQuiz.status === 'published' ? 'correct' : 'stabilo'}>
                    {currentQuiz.status === 'published' ? 'Terbit' : 'Draft'}
                  </Badge>
                )}
              </div>

              <form method="POST" action="/admin/tryout" class="flex flex-col gap-4">
                <input type="hidden" name="quizId" value={currentQuiz?.id ?? ''} />

                {/* Judul TO */}
                <div class="flex flex-col gap-1">
                  <label for="to-title" class="font-body font-bold text-[13px] text-ink">
                    Judul Tryout *
                  </label>
                  <input
                    type="text"
                    id="to-title"
                    name="title"
                    value={currentQuiz?.title ?? ''}
                    placeholder="Contoh: Tryout Gratis 1: Simulasi TKA SMP"
                    required
                    class="h-11 px-3 bg-paper-soft border-2 border-ink rounded-badge font-body text-[14px] text-ink focus:outline-none focus:bg-card"
                  />
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Jenjang */}
                  <div class="flex flex-col gap-1">
                    <label for="to-level" class="font-body font-bold text-[13px] text-ink">
                      Jenjang *
                    </label>
                    <select
                      id="to-level"
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

                  {/* Durasi Menit */}
                  <div class="flex flex-col gap-1">
                    <label for="to-duration" class="font-body font-bold text-[13px] text-ink">
                      Durasi (Menit) *
                    </label>
                    <input
                      type="number"
                      id="to-duration"
                      name="durationMinutes"
                      value={currentQuiz?.durationMinutes ? String(currentQuiz.durationMinutes) : '30'}
                      min="10"
                      max="120"
                      required
                      class="h-11 px-3 bg-paper-soft border-2 border-ink rounded-badge font-body text-[14px] text-ink focus:outline-none"
                    />
                  </div>
                </div>

                {/* Question Selection Checklist */}
                <div class="flex flex-col gap-2 pt-2 border-t border-grid">
                  <div class="flex items-center justify-between">
                    <label class="font-body font-bold text-[13px] text-ink">
                      Pilih Butir Soal Terbit (Lintas Materi) *
                    </label>
                    <span
                      id="question-counter-badge"
                      class="px-2.5 py-0.5 rounded-chip text-[12px] font-bold border-2 border-ink bg-stabilo text-ink"
                    >
                      <span id="selected-count">{selectedQuestionIds.size}</span> / 10-15 Soal
                    </span>
                  </div>

                  <p class="font-body text-[12px] text-ink-soft">
                    Sesuai PRD F7 dan A7: satu paket Tryout berisi 10 sampai 15 butir soal terbit.
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
                              <Badge variant={q.topicId ? 'blue' : 'purple'} size="sm">
                                {q.topicId ? 'Dengan Materi' : 'Khusus TO'}
                              </Badge>
                              <span class="text-[12px] font-body text-ink-soft">
                                ({q.questionType})
                              </span>
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
                    selectedQuestionIds.size >= 10 && selectedQuestionIds.size <= 15 ? 'hidden' : ''
                  }`}
                >
                  <Icon name="info" class="w-4 h-4 shrink-0" />
                  <span>
                    Jumlah butir soal belum memenuhi syarat. Wajib memilih antara 10 sampai 15 butir soal.
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
                    disabled={selectedQuestionIds.size < 10 || selectedQuestionIds.size > 15}
                    class="min-h-[44px] px-6 rounded-badge bg-stabilo border-2 border-ink shadow-solid-sm pressable-sm font-title font-bold text-[14px] text-ink disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                  >
                    Terbitkan Tryout
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
