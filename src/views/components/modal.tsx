import type { PropsWithChildren } from '@kitajs/html';
import { Icon } from './icon';

export interface ModalProps extends PropsWithChildren {
  id: string;
  title: string;
  variant?: 'confirm' | 'preview';
  isOpenByDefault?: boolean;
  iconVariant?: 'warning' | 'info';
  footer?: JSX.Element;
}

export function Modal({
  id,
  title,
  variant = 'confirm',
  isOpenByDefault = false,
  iconVariant = 'warning',
  footer,
  children,
}: ModalProps): JSX.Element {
  const maxWidthClass = variant === 'preview' ? 'max-w-[680px]' : 'max-w-[420px]';
  const visibilityClass = isOpenByDefault ? 'flex' : 'hidden';

  return (
    <div
      id={id}
      data-modal
      role="dialog"
      aria-modal="true"
      aria-labelledby={`${id}-title`}
      class={`fixed inset-0 z-50 ${visibilityClass} items-center justify-center p-4 bg-ink/50 backdrop-blur-[1px]`}
    >
      <div
        data-modal-backdrop={id}
        class="absolute inset-0"
      />
      <div
        class={`relative z-10 w-full ${maxWidthClass} max-h-[90vh] flex flex-col bg-card border-2 border-ink rounded-card shadow-solid-lg overflow-hidden`}
      >
        <div class="flex items-center justify-between gap-3 px-5 py-4 bg-paper-soft border-b-2 border-ink">
          <div class="flex items-center gap-2.5">
            <span
              class={`w-9 h-9 rounded-badge border-2 border-ink flex items-center justify-center shrink-0 ${
                iconVariant === 'warning' ? 'bg-stabilo text-ink' : 'bg-badge-blue text-white'
              }`}
            >
              <Icon name={iconVariant === 'warning' ? 'warning' : 'info'} class="w-5 h-5" />
            </span>
            <h3 id={`${id}-title`} class="font-title font-bold text-[20px] text-ink leading-tight" safe>
              {title}
            </h3>
          </div>
          <button
            type="button"
            data-modal-close={id}
            aria-label="Tutup dialog"
            class="w-11 h-11 rounded-badge bg-card border-2 border-ink flex items-center justify-center text-ink hover:bg-paper cursor-pointer pressable-sm shrink-0"
          >
            <Icon name="x" class="w-5 h-5" />
          </button>
        </div>

        <div class="p-5 overflow-y-auto text-[16px] text-ink">
          {children}
        </div>

        {footer ? (
          <div class="px-5 py-4 bg-paper-soft border-t-2 border-ink flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2.5">
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  );
}
