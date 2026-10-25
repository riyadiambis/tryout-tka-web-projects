import { Icon, type IconName } from './icon';

export interface InputProps {
  id: string;
  name: string;
  type?: 'text' | 'password' | 'search' | 'number' | 'textarea';
  label?: string;
  hint?: string;
  placeholder?: string;
  value?: string;
  rows?: number;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  iconLeft?: IconName;
  class?: string;
}

export function Input({
  id,
  name,
  type = 'text',
  label,
  hint,
  placeholder,
  value = '',
  rows = 4,
  required = false,
  disabled = false,
  error,
  iconLeft,
  class: extraClass = '',
}: InputProps): JSX.Element {
  const effectiveIcon: IconName | undefined = iconLeft ?? (type === 'search' ? 'search' : undefined);
  const borderClass = error
    ? 'border-2 border-wrong bg-wrong-bg/30 focus:bg-card'
    : 'border-2 border-ink bg-card focus:bg-paper';
  const disabledClass = disabled ? 'opacity-60 cursor-not-allowed bg-paper-soft' : '';

  return (
    <div class={`flex flex-col gap-1.5 w-full ${extraClass}`.trim()}>
      {label ? (
        <div class="flex items-center justify-between gap-2">
          <label for={id} class="font-body font-extrabold text-[15px] text-ink">
            <span safe>{label}</span>
            {required ? <span class="text-wrong ml-0.5">*</span> : null}
          </label>
          {hint ? <span class="text-[13px] font-semibold text-ink-soft" safe>{hint}</span> : null}
        </div>
      ) : null}

      <div class="relative w-full">
        {effectiveIcon && type !== 'textarea' ? (
          <span class="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-soft">
            <Icon name={effectiveIcon} class="w-5 h-5" />
          </span>
        ) : null}

        {type === 'textarea' ? (
          <textarea
            id={id}
            name={name}
            rows={String(rows)}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            aria-invalid={error ? 'true' : undefined}
            aria-describedby={error ? `${id}-error` : undefined}
            class={`w-full rounded-badge px-4 py-3 text-[16px] text-ink placeholder:text-ink-soft/65 focus:outline-none focus:ring-2 focus:ring-stabilo ${borderClass} ${disabledClass}`.trim()}
            safe
          >
            {value}
          </textarea>
        ) : (
          <input
            id={id}
            name={name}
            type={type === 'search' ? 'search' : type}
            value={value}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            aria-invalid={error ? 'true' : undefined}
            aria-describedby={error ? `${id}-error` : undefined}
            class={`w-full min-h-[48px] rounded-badge ${effectiveIcon ? 'pl-11' : 'px-4'} ${type === 'password' ? 'pr-12' : 'pr-4'} py-2.5 text-[16px] text-ink placeholder:text-ink-soft/65 focus:outline-none focus:ring-2 focus:ring-stabilo ${borderClass} ${disabledClass}`.trim()}
          />
        )}

        {type === 'password' ? (
          <button
            type="button"
            data-toggle-password={id}
            aria-label="Tampilkan atau sembunyikan password"
            class="absolute right-1.5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-chip flex items-center justify-center text-ink-soft hover:text-ink cursor-pointer"
          >
            <span data-eye-open>
              <Icon name="eye" class="w-5 h-5" />
            </span>
            <span data-eye-closed class="hidden">
              <Icon name="eye-off" class="w-5 h-5" />
            </span>
          </button>
        ) : null}
      </div>

      {error ? (
        <p id={`${id}-error`} class="flex items-center gap-1.5 text-[14px] font-bold text-wrong mt-0.5">
          <Icon name="warning" class="w-4 h-4 shrink-0" />
          <span safe>{error}</span>
        </p>
      ) : null}
    </div>
  );
}
