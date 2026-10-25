import { formatSecondsToTime } from '../../lib/youtube';
import { Icon } from './icon';

export interface TimerProps {
  remainingSeconds: number;
  id?: string;
  showDemoToggle?: boolean;
}

export function Timer({
  remainingSeconds,
  id = 'tryout-timer',
  showDemoToggle = false,
}: TimerProps): JSX.Element {
  const isUrgent = remainingSeconds <= 300;
  const formatted = formatSecondsToTime(remainingSeconds);

  return (
    <div class="inline-flex items-center gap-2 flex-wrap">
      <div
        id={id}
        data-timer
        data-remaining-seconds={String(remainingSeconds)}
        aria-live="off"
        class={`min-h-[48px] px-3.5 py-2 rounded-badge border-2 shadow-solid-sm inline-flex items-center gap-2 font-title font-extrabold text-[18px] transition-colors ${
          isUrgent
            ? 'bg-wrong-bg border-wrong text-wrong'
            : 'bg-card border-ink text-ink'
        }`}
      >
        <Icon name="clock" class="w-5 h-5 shrink-0" />
        <span data-timer-display class="tabular-nums tracking-wide">
          {formatted}
        </span>
      </div>

      {showDemoToggle ? (
        <button
          type="button"
          data-timer-demo-urgent={id}
          class="min-h-[40px] px-2.5 py-1 rounded-chip bg-paper-soft border-2 border-ink text-[12px] font-extrabold text-ink-soft hover:text-ink cursor-pointer"
          title="Mode Demo Dev: Uji sisa waktu kritis 5 menit"
        >
          Uji Sisa 04:55
        </button>
      ) : null}
    </div>
  );
}
