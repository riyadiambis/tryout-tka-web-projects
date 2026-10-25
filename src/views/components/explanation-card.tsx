import type { QuestionResultItem } from '../../fixtures/types';
import { formatQuestionTypeLabel } from '../../lib/format';
import { Badge } from './badge';
import { Button } from './button';
import { Icon } from './icon';

export interface ExplanationCardProps {
  item: QuestionResultItem;
}

export function ExplanationCard({ item }: ExplanationCardProps): JSX.Element {
  const statusBadge =
    item.status === 'correct' ? (
      <Badge variant="correct" size="md" pill icon="check-circle">
        Benar
      </Badge>
    ) : item.status === 'wrong' ? (
      <Badge variant="wrong" size="md" pill icon="x-circle">
        Salah
      </Badge>
    ) : (
      <Badge variant="neutral" size="md" pill>
        Kosong
      </Badge>
    );

  return (
    <article
      id={`pembahasan-${item.number}`}
      class="bg-card border-2 border-ink rounded-card shadow-solid p-4 sm:p-6 flex flex-col gap-4"
    >
      {/* Top Status & Number */}
      <div class="flex items-center justify-between flex-wrap gap-2">
        <div class="flex items-center gap-2">
          {statusBadge}
          <span class="text-[12px] font-extrabold uppercase tracking-wider text-ink-soft" safe>
            {formatQuestionTypeLabel(item.questionType)}
          </span>
        </div>
        <span class="label-section">Nomor {item.number}</span>
      </div>

      {/* Question Stem */}
      <div class="math-content font-body font-bold text-[16px] text-ink leading-relaxed">
        {item.bodyHtml}
      </div>

      {/* Student Answer vs Key Summary */}
      <div class="flex flex-wrap items-center gap-2">
        <span
          class={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-badge border-2 font-body font-extrabold text-[14px] ${
            item.status === 'correct'
              ? 'bg-correct-bg text-correct border-correct'
              : item.status === 'wrong'
                ? 'bg-wrong-bg text-wrong border-wrong'
                : 'bg-paper-soft text-ink-soft border-ink'
          }`}
        >
          <span>Jawabanmu:</span>
          <span safe>{item.studentAnswerLabel}</span>
        </span>

        {item.status !== 'correct' ? (
          <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-badge border-2 border-correct bg-correct-bg text-correct font-body font-extrabold text-[14px]">
            <span>Kunci:</span>
            <span safe>{item.answerKeyLabel}</span>
          </span>
        ) : null}
      </div>

      {/* Written Explanation Box (Mandatory on every question) */}
      <div class="p-4 rounded-badge bg-paper-soft border-2 border-ink flex flex-col gap-2">
        <div class="flex items-center gap-2 text-ink font-title font-bold text-[17px]">
          <Icon name="book" class="w-5 h-5 text-ink shrink-0" />
          <span>Pembahasan Langkah demi Langkah</span>
        </div>
        <div class="math-content font-body text-[16px] text-ink leading-relaxed">
          {item.explanationHtml}
        </div>
      </div>

      {/* Conditional External YouTube Buttons (NEVER embedded) */}
      {item.shortsUrl || item.longVideoUrl ? (
        <div class="flex flex-col sm:flex-row gap-2.5 pt-1">
          {item.shortsUrl ? (
            <Button
              href={item.shortsUrl}
              external
              variant="secondary"
              fullWidth
              iconLeft="youtube"
              iconRight="external-link"
            >
              Lihat Pembahasan Video
            </Button>
          ) : null}
          {item.longVideoUrl ? (
            <Button
              href={item.longVideoUrl}
              external
              variant="secondary"
              fullWidth
              iconLeft="play"
              iconRight="external-link"
            >
              {item.longVideoTimeLabel
                ? `Tonton Penjelasan Lengkap (menit ${item.longVideoTimeLabel})`
                : 'Tonton Penjelasan Lengkap'}
            </Button>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}
