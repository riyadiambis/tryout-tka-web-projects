export interface QuestionGridItemState {
  number: number;
  questionId: string;
  isAnswered: boolean;
  isFlagged?: boolean;
}

export interface QuestionNumberGridProps {
  items: QuestionGridItemState[];
  activeNumber: number;
}

export function QuestionNumberGrid({ items, activeNumber }: QuestionNumberGridProps): JSX.Element {
  return (
    <div class="flex flex-col gap-4">
      <div class="grid grid-cols-5 gap-2.5">
        {items.map((item) => {
          const isCurrent = item.number === activeNumber;
          let stateClass = 'bg-card text-ink hover:bg-paper-soft';
          if (isCurrent) {
            stateClass = 'bg-stabilo text-ink shadow-solid-sm ring-2 ring-ink';
          } else if (item.isAnswered) {
            stateClass = 'bg-ink text-white';
          }

          return (
            <button
              type="button"
              data-jump-number={String(item.number)}
              data-grid-question-id={item.questionId}
              aria-label={`Pindah ke soal nomor ${item.number}`}
              aria-current={isCurrent ? 'step' : undefined}
              class={`relative min-h-[48px] rounded-badge border-2 border-ink font-title font-extrabold text-[17px] flex items-center justify-center cursor-pointer pressable-sm ${stateClass}`}
            >
              <span>{item.number}</span>
              <span
                data-flag-dot={item.questionId}
                class={`absolute -top-1.5 -right-1.5 w-3.5 h-3.5 rounded-full bg-stabilo border-2 border-ink ${
                  item.isFlagged ? '' : 'hidden'
                }`}
              />
            </button>
          );
        })}
      </div>

      <div class="flex flex-wrap items-center gap-3 pt-2 border-t-2 border-ink/15 text-[13px] font-bold text-ink-soft">
        <span class="inline-flex items-center gap-1.5">
          <span class="w-4 h-4 rounded bg-stabilo border-2 border-ink inline-block" />
          Sedang dibuka
        </span>
        <span class="inline-flex items-center gap-1.5">
          <span class="w-4 h-4 rounded bg-ink border-2 border-ink inline-block" />
          Sudah diisi
        </span>
        <span class="inline-flex items-center gap-1.5">
          <span class="w-4 h-4 rounded bg-card border-2 border-ink inline-block" />
          Kosong
        </span>
      </div>
    </div>
  );
}
