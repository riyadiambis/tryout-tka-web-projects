export interface ToggleBinaryOption {
  value: string;
  label: string;
}

export interface ToggleProps {
  id: string;
  name: string;
  variant?: 'switch' | 'binary';
  checked?: boolean;
  selectedValue?: string;
  leftOption?: ToggleBinaryOption;
  rightOption?: ToggleBinaryOption;
  label?: string;
  disabled?: boolean;
  class?: string;
}

export function Toggle({
  id,
  name,
  variant = 'switch',
  checked = false,
  selectedValue,
  leftOption = { value: 'true', label: 'Benar' },
  rightOption = { value: 'false', label: 'Salah' },
  label,
  disabled = false,
  class: extraClass = '',
}: ToggleProps): JSX.Element {
  if (variant === 'binary') {
    const leftActive = selectedValue === leftOption.value;
    const rightActive = selectedValue === rightOption.value;

    return (
      <div
        id={id}
        data-binary-toggle={name}
        class={`grid grid-cols-2 gap-2.5 w-full ${extraClass}`.trim()}
      >
        <button
          type="button"
          disabled={disabled}
          data-binary-value={leftOption.value}
          aria-pressed={leftActive ? 'true' : 'false'}
          class={`min-h-[48px] px-3 py-2 rounded-badge border-2 border-ink font-body font-extrabold text-[16px] flex items-center justify-center transition-all ${
            leftActive
              ? 'bg-stabilo text-ink shadow-solid-sm'
              : 'bg-card text-ink-soft hover:bg-paper-soft'
          } ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer pressable-sm'}`}
          safe
        >
          {leftOption.label}
        </button>

        <button
          type="button"
          disabled={disabled}
          data-binary-value={rightOption.value}
          aria-pressed={rightActive ? 'true' : 'false'}
          class={`min-h-[48px] px-3 py-2 rounded-badge border-2 border-ink font-body font-extrabold text-[16px] flex items-center justify-center transition-all ${
            rightActive
              ? 'bg-stabilo text-ink shadow-solid-sm'
              : 'bg-card text-ink-soft hover:bg-paper-soft'
          } ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer pressable-sm'}`}
          safe
        >
          {rightOption.label}
        </button>
      </div>
    );
  }

  return (
    <label
      for={id}
      class={`min-h-[48px] inline-flex items-center justify-between gap-3 select-none ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'} ${extraClass}`.trim()}
    >
      {label ? (
        <span class="font-body font-bold text-[16px] text-ink" safe>
          {label}
        </span>
      ) : null}
      <span class="relative inline-flex items-center">
        <input
          id={id}
          name={name}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          class="peer sr-only"
        />
        <span class="w-14 h-8 rounded-full border-2 border-ink bg-paper-soft peer-checked:bg-stabilo transition-colors relative">
          <span class={`absolute top-1 left-1 w-5 h-5 rounded-full bg-ink transition-transform ${checked ? 'translate-x-6' : ''}`} />
        </span>
      </span>
    </label>
  );
}
