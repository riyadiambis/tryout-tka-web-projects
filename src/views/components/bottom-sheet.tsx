import type { PropsWithChildren } from '@kitajs/html';
import { Icon } from './icon';

export interface BottomSheetProps extends PropsWithChildren {
  id: string;
  title: string;
  subtitle?: string;
  isOpenByDefault?: boolean;
}

export function BottomSheet({
  id,
  title,
  subtitle,
  isOpenByDefault = false,
  children,
}: BottomSheetProps): JSX.Element {
  const visibilityClass = isOpenByDefault ? 'flex' : 'hidden';

  return (
    <div
      id={id}
      data-bottom-sheet
      role="dialog"
      aria-modal="true"
      aria-labelledby={`${id}-title`}
      class={`fixed inset-0 z-50 ${visibilityClass} lg:hidden flex-col justify-end bg-ink/50`}
    >
      <div data-sheet-backdrop={id} class="flex-1 w-full" />
      <div class="relative z-10 w-full max-w-mobile mx-auto max-h-[85vh] flex flex-col bg-card border-t-2 border-x-2 border-ink rounded-t-[22px] shadow-solid-lg overflow-hidden">
        <div class="pt-2.5 pb-1 flex justify-center bg-paper-soft">
          <span class="w-12 h-1.5 rounded-full bg-ink/30" />
        </div>
        <div class="px-5 py-3 bg-paper-soft border-b-2 border-ink flex items-center justify-between gap-3">
          <div>
            <h3 id={`${id}-title`} class="font-title font-bold text-[20px] text-ink leading-tight" safe>
              {title}
            </h3>
            {subtitle ? (
              <p class="text-[13px] font-bold text-ink-soft" safe>
                {subtitle}
              </p>
            ) : null}
          </div>
          <button
            type="button"
            data-sheet-close={id}
            aria-label="Tutup panel"
            class="w-11 h-11 rounded-badge bg-card border-2 border-ink flex items-center justify-center text-ink hover:bg-paper cursor-pointer pressable-sm shrink-0"
          >
            <Icon name="x" class="w-5 h-5" />
          </button>
        </div>
        <div class="p-5 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
