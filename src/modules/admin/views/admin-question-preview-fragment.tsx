import type { QuestionForAttempt, QuestionOption, QuestionResultItem, QuestionType } from '../../../fixtures/types';
import { renderInlineMarkdownWithLatex, renderMarkdownWithLatex } from '../../../lib/markdown';
import { buildLongVideoUrl, buildShortsUrl } from '../../../lib/youtube';
import { ExplanationCard } from '../../../views/components/explanation-card';
import { QuestionCard } from '../../../views/components/question-card';

export interface AdminQuestionPreviewData {
  level: 'sd' | 'smp';
  elementName: string;
  topicTitle?: string;
  questionType: QuestionType;
  bodyRaw: string;
  imageUrl?: string;
  choiceOptionsRaw?: { key: string; textRaw: string }[];
  statementsRaw?: { statementId: string; textRaw: string }[];
  answerKey: any;
  explanationRaw: string;
  shortsId?: string;
  longVideoId?: string;
  longVideoSeconds?: number;
}

export function AdminQuestionPreviewFragment({
  data,
}: {
  data: AdminQuestionPreviewData;
}): JSX.Element {
  // 1. Build sterile QuestionForAttempt for "Saat Mengerjakan"
  const sterileOptions: QuestionOption[] =
    data.questionType === 'category'
      ? (data.statementsRaw ?? []).map((s) => ({
          kind: 'statement' as const,
          statementId: s.statementId,
          statementHtml: renderInlineMarkdownWithLatex(s.textRaw),
        }))
      : (data.choiceOptionsRaw ?? []).map((c) => ({
          kind: 'choice' as const,
          key: c.key,
          labelHtml: renderInlineMarkdownWithLatex(c.textRaw),
        }));

  const questionForAttempt: QuestionForAttempt = {
    id: 'preview-q',
    number: 1,
    level: data.level,
    elementName: data.elementName,
    topicTitle: data.topicTitle,
    questionType: data.questionType,
    bodyHtml: renderMarkdownWithLatex(data.bodyRaw || '*(Teks soal masih kosong)*'),
    imageUrl: data.imageUrl,
    options: sterileOptions,
  };

  // 2. Build QuestionResultItem for "Setelah Dikumpulkan"
  const answerKeyLabel =
    data.questionType === 'single'
      ? data.answerKey?.key ?? 'A'
      : data.questionType === 'multiple'
        ? (data.answerKey?.keys ?? []).join(', ') || 'A'
        : Object.entries(data.answerKey?.answers ?? {})
            .map(([k, v]) => `${k}: ${v ? 'Benar' : 'Salah'}`)
            .join(' | ') || 'Semua Benar';

  const shortsUrl = data.shortsId ? buildShortsUrl(data.shortsId) : undefined;
  const longVideoUrl = data.longVideoId
    ? buildLongVideoUrl(data.longVideoId, data.longVideoSeconds)
    : undefined;

  const resultItem: QuestionResultItem = {
    ...questionForAttempt,
    status: 'correct' as const,
    studentAnswer: data.answerKey,
    studentAnswerLabel: answerKeyLabel,
    answerKeyLabel,
    explanationHtml: renderMarkdownWithLatex(data.explanationRaw || '*(Pembahasan belum diisi)*'),
    shortsUrl,
    longVideoUrl,
    longVideoTimeLabel: data.longVideoSeconds
      ? `${Math.floor(data.longVideoSeconds / 60)
          .toString()
          .padStart(2, '0')}:${(data.longVideoSeconds % 60).toString().padStart(2, '0')}`
      : undefined,
  };

  return (
    <div class="flex flex-col gap-6">
      {/* Saat Mengerjakan */}
      <div id="preview-tab-attempt" class="preview-tab-content">
        <div class="mb-2 flex items-center justify-between">
          <span class="label-section text-[11px] text-ink-soft">TAMPILAN SAAT MENGERJAKAN</span>
          <span class="px-2 py-0.5 rounded-chip text-[11px] font-bold bg-stabilo-soft text-ink border border-ink">
            Steril Kunci
          </span>
        </div>
        {QuestionCard({
          question: questionForAttempt,
          mode: 'preview',
        })}
      </div>

      {/* Setelah Dikumpulkan */}
      <div id="preview-tab-result" class="preview-tab-content hidden">
        <div class="mb-2 flex items-center justify-between">
          <span class="label-section text-[11px] text-ink-soft">TAMPILAN SETELAH SUBMIT</span>
          <span class="px-2 py-0.5 rounded-chip text-[11px] font-bold bg-correct-bg text-correct border border-correct">
            Dengan Pembahasan
          </span>
        </div>
        {ExplanationCard({ item: resultItem })}
      </div>
    </div>
  );
}
