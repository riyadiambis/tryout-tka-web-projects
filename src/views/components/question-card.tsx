import type {
  CategoryStatementOption,
  ChoiceQuestionOption,
  QuestionForAttempt,
  StudentAnswerValue,
} from '../../fixtures/types';
import { formatQuestionInstruction, formatQuestionTypeLabel } from '../../lib/format';
import { Badge } from './badge';
import { Icon } from './icon';

export interface QuestionCardProps {
  question: QuestionForAttempt;
  selectedAnswer?: StudentAnswerValue;
  mode?: 'practice' | 'tryout' | 'preview';
  showFlagButton?: boolean;
  isFlagged?: boolean;
  isHidden?: boolean;
}

function checkIsQuestionAnswered(question: QuestionForAttempt, value?: StudentAnswerValue): boolean {
  if (!value) return false;
  if (question.questionType === 'single') {
    return typeof value === 'string' && value.length > 0;
  }
  if (question.questionType === 'multiple') {
    return Array.isArray(value) && value.length > 0;
  }
  if (question.questionType === 'category' && typeof value === 'object' && !Array.isArray(value)) {
    const statements = question.options.filter((o): o is CategoryStatementOption => o.kind === 'statement');
    return statements.length > 0 && statements.every((st) => typeof value[st.statementId] === 'boolean');
  }
  return false;
}

/**
 * Attempt Question Card.
 * STRICT RULE:
 * - Only uses Stabilo Yellow (#FFD84D / #FFF6D1) and Navy Ink (#1B3A5C) for selection markers.
 * - Green and Red are FORBIDDEN on attempt options/cards.
 * - `check_circle` (checkmark in circle) is FORBIDDEN.
 * - Complex multiple-choice (`multiple`) checkbox MAY display standard checkmark in navy on stabilo yellow box.
 */
export function QuestionCard({
  question,
  selectedAnswer = null,
  mode = 'practice',
  showFlagButton = false,
  isFlagged = false,
  isHidden = false,
}: QuestionCardProps): JSX.Element {
  const answered = checkIsQuestionAnswered(question, selectedAnswer);

  const choiceOptions = question.options.filter(
    (opt): opt is ChoiceQuestionOption => opt.kind === 'choice'
  );
  const statementOptions = question.options.filter(
    (opt): opt is CategoryStatementOption => opt.kind === 'statement'
  );

  return (
    <article
      id={`soal-${question.number}`}
      data-question-card
      data-question-id={question.id}
      data-question-number={String(question.number)}
      data-question-type={question.questionType}
      data-answered={answered ? 'true' : 'false'}
      class={`bg-card border-2 border-ink rounded-card shadow-solid p-4 sm:p-6 flex flex-col gap-4 ${
        isHidden ? 'hidden' : ''
      }`}
    >
      {/* Card Header */}
      <div class="flex items-center justify-between flex-wrap gap-2">
        <div class="flex items-center gap-2.5 flex-wrap">
          <span class="w-9 h-9 rounded-full bg-ink text-white font-title font-extrabold text-[18px] flex items-center justify-center shrink-0">
            {question.number}
          </span>
          <Badge variant={question.questionType === 'single' ? 'blue' : 'purple'} size="sm">
            {formatQuestionTypeLabel(question.questionType)}
          </Badge>
          {question.elementName ? (
            <span class="text-[12px] font-extrabold uppercase tracking-wider text-ink-soft" safe>
              {question.elementName}
            </span>
          ) : null}
        </div>

        <div class="flex items-center gap-2">
          {showFlagButton ? (
            <button
              type="button"
              data-flag-button={question.id}
              aria-pressed={isFlagged ? 'true' : 'false'}
              class={`min-h-[40px] px-3 py-1 rounded-badge border-2 border-ink font-body font-extrabold text-[13px] inline-flex items-center gap-1.5 cursor-pointer pressable-sm ${
                isFlagged ? 'bg-stabilo text-ink shadow-solid-sm' : 'bg-paper-soft text-ink-soft'
              }`}
            >
              <Icon name="flag" class="w-4 h-4" />
              <span>Ragu-ragu</span>
            </button>
          ) : null}

          <span
            data-answer-badge={question.id}
            class={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-chip border-2 border-ink text-[12px] font-extrabold ${
              answered ? 'bg-stabilo-soft text-ink' : 'bg-paper-soft text-ink-soft'
            }`}
          >
            <span
              data-answer-dot={question.id}
              class={`w-2.5 h-2.5 rounded-full border border-ink ${
                answered ? 'bg-stabilo' : 'bg-card'
              }`}
            />
            <span data-answer-status-text={question.id}>
              {answered ? 'Sudah diisi' : 'Belum dijawab'}
            </span>
          </span>
        </div>
      </div>

      {/* Instruction hint */}
      <p class="text-[13px] font-bold text-ink-soft -mt-1">
        {formatQuestionInstruction(question.questionType)}
      </p>

      {/* Question Stem (Server-rendered Markdown + LaTeX) */}
      <div class="math-content font-body text-[17px] text-ink leading-relaxed">
        {question.bodyHtml}
      </div>

      {/* Optional Local Image */}
      {question.imageUrl ? (
        <div class="rounded-badge border-2 border-ink bg-paper p-3 flex justify-center">
          <img
            src={question.imageUrl}
            alt={`Gambar soal nomor ${question.number}`}
            class="max-h-64 w-auto object-contain rounded"
          />
        </div>
      ) : null}

      {/* Type 1: Single Choice (Radio dot in Navy + Stabilo, NO check_circle) */}
      {question.questionType === 'single' ? (
        <div class="flex flex-col gap-2.5 mt-1" role="radiogroup" aria-label={`Pilihan soal nomor ${question.number}`}>
          {choiceOptions.map((opt) => {
            const isSelected = selectedAnswer === opt.key;
            return (
              <label
                data-option-card
                data-option-type="single"
                data-option-key={opt.key}
                class={`w-full min-h-[52px] p-3.5 rounded-badge border-2 border-ink flex items-center justify-between gap-3 text-left cursor-pointer transition-all select-none pressable-sm ${
                  isSelected
                    ? 'bg-stabilo shadow-solid-sm'
                    : 'bg-card hover:bg-paper-soft shadow-solid-sm'
                }`}
              >
                <input
                  type="radio"
                  name={`q_${question.id}`}
                  value={opt.key}
                  checked={isSelected}
                  disabled={mode === 'preview'}
                  class="sr-only"
                />
                <div class="flex items-center gap-3 min-w-0 flex-1">
                  <span
                    data-option-badge
                    class={`w-8 h-8 rounded-chip border-2 border-ink font-title font-extrabold text-[16px] flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-ink text-white' : 'bg-paper-soft text-ink'
                    }`}
                    safe
                  >
                    {opt.key}
                  </span>
                  <div class="math-content font-body font-bold text-[16px] text-ink min-w-0 flex-1">
                    {opt.labelHtml}
                  </div>
                </div>

                {/* Neutral Radio Bullet: outer navy ring + inner solid navy dot (never check_circle) */}
                <span
                  data-radio-outer
                  class="w-6 h-6 rounded-full border-2 border-ink bg-card flex items-center justify-center shrink-0"
                >
                  <span
                    data-radio-dot
                    class={`w-3 h-3 rounded-full bg-ink ${isSelected ? '' : 'hidden'}`}
                  />
                </span>
              </label>
            );
          })}
        </div>
      ) : null}

      {/* Type 2: Multiple Choice MCMA (Square box with standard navy checkmark on stabilo yellow) */}
      {question.questionType === 'multiple' ? (
        <div class="flex flex-col gap-2.5 mt-1" role="group" aria-label={`Pilihan ganda kompleks nomor ${question.number}`}>
          {choiceOptions.map((opt, idx) => {
            const selectedArr = Array.isArray(selectedAnswer) ? selectedAnswer : [];
            const isSelected = selectedArr.includes(opt.key);
            return (
              <label
                data-option-card
                data-option-type="multiple"
                data-option-key={opt.key}
                class={`w-full min-h-[52px] p-3.5 rounded-badge border-2 border-ink flex items-center justify-between gap-3 text-left cursor-pointer transition-all select-none pressable-sm ${
                  isSelected
                    ? 'bg-stabilo-soft shadow-solid-sm'
                    : 'bg-card hover:bg-paper-soft shadow-solid-sm'
                }`}
              >
                <input
                  type="checkbox"
                  name={`q_${question.id}[]`}
                  value={opt.key}
                  checked={isSelected}
                  disabled={mode === 'preview'}
                  class="sr-only"
                />
                <div class="flex items-center gap-3 min-w-0 flex-1">
                  {/* Square Checkbox: standard navy checkmark on stabilo yellow background */}
                  <span
                    data-checkbox-box
                    class={`w-6 h-6 rounded-chip border-2 border-ink flex items-center justify-center shrink-0 transition-colors ${
                      isSelected ? 'bg-stabilo text-ink' : 'bg-card text-transparent'
                    }`}
                  >
                    <span data-checkbox-mark class={isSelected ? '' : 'hidden'}>
                      <Icon name="check" class="w-4 h-4 text-ink" />
                    </span>
                  </span>
                  <div class="math-content font-body font-bold text-[16px] text-ink min-w-0 flex-1">
                    {opt.labelHtml}
                  </div>
                </div>
                <span class="text-[12px] font-extrabold uppercase tracking-wider text-ink-soft shrink-0">
                  Pilihan {idx + 1}
                </span>
              </label>
            );
          })}
        </div>
      ) : null}

      {/* Type 3: Category Benar / Salah (Stabilo + Navy binary buttons, NO green/red, NO check/cross icon) */}
      {question.questionType === 'category' ? (
        <div class="flex flex-col gap-3 mt-1">
          {statementOptions.map((st, idx) => {
            const record =
              selectedAnswer && typeof selectedAnswer === 'object' && !Array.isArray(selectedAnswer)
                ? selectedAnswer
                : {};
            const currentVal = record[st.statementId];
            const trueSelected = currentVal === true;
            const falseSelected = currentVal === false;

            return (
              <div
                data-statement-row
                data-statement-id={st.statementId}
                class="p-3.5 rounded-badge bg-paper-soft border-2 border-ink flex flex-col gap-3"
              >
                <div class="flex items-start justify-between gap-2">
                  <div class="math-content font-body font-bold text-[16px] text-ink flex-1 min-w-0">
                    {st.statementHtml}
                  </div>
                  <span class="text-[12px] font-extrabold uppercase tracking-wider text-ink-soft shrink-0">
                    Pernyataan {idx + 1}
                  </span>
                </div>

                <input
                  type="hidden"
                  name={`q_${question.id}_${st.statementId}`}
                  value={typeof currentVal === 'boolean' ? String(currentVal) : ''}
                  data-category-input={st.statementId}
                />

                <div class="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    disabled={mode === 'preview'}
                    data-category-btn
                    data-statement-id={st.statementId}
                    data-bool-value="true"
                    aria-pressed={trueSelected ? 'true' : 'false'}
                    class={`min-h-[48px] px-3 py-2 rounded-badge border-2 border-ink font-body font-extrabold text-[16px] flex items-center justify-center transition-all ${
                      trueSelected
                        ? 'bg-stabilo text-ink shadow-solid-sm'
                        : 'bg-card text-ink-soft hover:bg-paper'
                    } ${mode === 'preview' ? 'cursor-default' : 'cursor-pointer pressable-sm'}`}
                  >
                    Benar
                  </button>
                  <button
                    type="button"
                    disabled={mode === 'preview'}
                    data-category-btn
                    data-statement-id={st.statementId}
                    data-bool-value="false"
                    aria-pressed={falseSelected ? 'true' : 'false'}
                    class={`min-h-[48px] px-3 py-2 rounded-badge border-2 border-ink font-body font-extrabold text-[16px] flex items-center justify-center transition-all ${
                      falseSelected
                        ? 'bg-stabilo text-ink shadow-solid-sm'
                        : 'bg-card text-ink-soft hover:bg-paper'
                    } ${mode === 'preview' ? 'cursor-default' : 'cursor-pointer pressable-sm'}`}
                  >
                    Salah
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
    </article>
  );
}
