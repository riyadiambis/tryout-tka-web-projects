import { Icon } from './icon';

export interface CheckboxProps {
  id: string;
  name: string;
  value?: string;
  checked?: boolean;
  label: string;
  description?: string;
  disabled?: boolean;
  error?: string;
  class?: string;
}

export function Checkbox({
  id,
  name,
  value = '1',
  checked = false,
  label,
  description,
  disabled = false,
  error,
  class: extraClass = '',
}: CheckboxProps): JSX.Element {
  return (
    <div class={`flex flex-col gap-1 ${extraClass}`.trim()}>
      <label
        for={id}
        class={`min-h-[48px] p-3 rounded-badge border-2 ${error ? 'border-wrong bg-wrong-bg/30' : checked ? 'border-ink bg-stabilo-soft' : 'border-ink bg-card'} flex items-start gap-3 select-none ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer hover:bg-paper-soft'}`}
      >
        <span class="relative flex items-center justify-center shrink-0 mt-0.5">
          <input
            id={id}
            name={name}
            type="checkbox"
            value={value}
            checked={checked}
            disabled={disabled}
            class="peer sr-only"
          />
          <span class="w-6 h-6 rounded-chip border-2 border-ink bg-card peer-checked:bg-stabilo flex items-center justify-center transition-colors">
            <Icon name="check" class="w-4 h-4 text-ink opacity-0 peer-checked:opacity-100" />
          </span>
        </span>
        <span class="flex flex-col">
          <span class="font-body font-bold text-[16px] text-ink leading-snug" safe>
            {label}
          </span>
          {description ? (
            <span class="text-[14px] text-ink-soft mt-0.5" safe>
              {description}
            </span>
          ) : null}
        </span>
      </label>

      {error ? (
        <p class="text-[14px] font-bold text-wrong mt-0.5" safe>
          {error}
        </p>
      ) : null}
    </div>
  );
}
