import { Icon } from './icon';

export interface SelectOptionItem {
  value: string;
  label: string;
}

export interface SelectProps {
  id: string;
  name: string;
  label?: string;
  subLabel?: string;
  variant?: 'default' | 'filter';
  options: SelectOptionItem[];
  selectedValue?: string;
  disabled?: boolean;
  error?: string;
  class?: string;
}

export function Select({
  id,
  name,
  label,
  subLabel,
  variant = 'default',
  options,
  selectedValue = '',
  disabled = false,
  error,
  class: extraClass = '',
}: SelectProps): JSX.Element {
  const heightClass = variant === 'filter' ? 'min-h-[44px] text-[14px]' : 'min-h-[48px] text-[16px]';
  const bgClass = variant === 'filter' ? 'bg-paper-soft focus:bg-card' : 'bg-card focus:bg-paper';
  const borderClass = error ? 'border-2 border-wrong' : 'border-2 border-ink';

  return (
    <div class={`flex flex-col gap-1.5 w-full ${extraClass}`.trim()}>
      {label || subLabel ? (
        <div class="flex items-center justify-between gap-2">
          {label ? (
            <label for={id} class="font-body font-extrabold text-[15px] text-ink" safe>
              {label}
            </label>
          ) : <span />}
          {subLabel ? (
            <span class="text-[12px] font-extrabold uppercase tracking-wider text-ink-soft" safe>
              {subLabel}
            </span>
          ) : null}
        </div>
      ) : null}

      <div class="relative w-full">
        <select
          id={id}
          name={name}
          disabled={disabled}
          class={`w-full ${heightClass} pl-3.5 pr-10 rounded-badge font-body font-bold text-ink appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-stabilo ${bgClass} ${borderClass} ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`.trim()}
        >
          {options.map((opt) => (
            <option value={opt.value} selected={opt.value === selectedValue} safe>
              {opt.label}
            </option>
          ))}
        </select>
        <span class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink">
          <Icon name="chevron-down" class="w-5 h-5" />
        </span>
      </div>

      {error ? (
        <p class="text-[14px] font-bold text-wrong mt-0.5" safe>
          {error}
        </p>
      ) : null}
    </div>
  );
}
