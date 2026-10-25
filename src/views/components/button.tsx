import type { PropsWithChildren } from '@kitajs/html';
import { Icon, type IconName } from './icon';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends PropsWithChildren {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  external?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  id?: string;
  name?: string;
  value?: string;
  iconLeft?: IconName;
  iconRight?: IconName;
  class?: string;
  ariaLabel?: string;
  dataAction?: string;
  dataTarget?: string;
}

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  external = false,
  fullWidth = false,
  disabled = false,
  type = 'button',
  id,
  name,
  value,
  iconLeft,
  iconRight,
  class: extraClass = '',
  ariaLabel,
  dataAction,
  dataTarget,
  children,
}: ButtonProps): JSX.Element {
  const sizeClass =
    size === 'lg'
      ? 'min-h-[54px] px-6 py-3 text-[17px]'
      : size === 'sm'
        ? 'min-h-[40px] px-3.5 py-2 text-[14px]'
        : 'min-h-[48px] px-5 py-2.5 text-[16px]';

  let variantClass = '';
  if (variant === 'primary') {
    variantClass = disabled
      ? 'bg-stabilo/55 text-ink/60 border-2 border-ink/50 cursor-not-allowed'
      : 'bg-stabilo hover:bg-stabilo/90 text-ink border-2 border-ink shadow-solid pressable cursor-pointer';
  } else if (variant === 'secondary') {
    variantClass = disabled
      ? 'bg-paper-soft text-ink-soft/60 border-2 border-ink/40 cursor-not-allowed'
      : 'bg-card hover:bg-paper-soft text-ink border-2 border-ink shadow-solid pressable cursor-pointer';
  } else if (variant === 'danger') {
    variantClass = disabled
      ? 'bg-wrong-bg/60 text-wrong/50 border-2 border-wrong/40 cursor-not-allowed'
      : 'bg-wrong-bg hover:bg-wrong hover:text-white text-wrong border-2 border-ink shadow-solid pressable cursor-pointer';
  } else {
    variantClass = disabled
      ? 'bg-transparent text-ink-soft/50 cursor-not-allowed'
      : 'bg-transparent hover:bg-paper-soft text-ink underline decoration-2 underline-offset-4 cursor-pointer';
  }

  const widthClass = fullWidth ? 'w-full' : 'inline-flex';
  const baseClass = `${widthClass} flex items-center justify-center gap-2 rounded-card font-title font-bold leading-snug select-none ${sizeClass} ${variantClass} ${extraClass}`.trim();

  const inner = (
    <>
      {iconLeft ? <Icon name={iconLeft} class="w-5 h-5 shrink-0" /> : null}
      <span>{children}</span>
      {iconRight ? <Icon name={iconRight} class="w-5 h-5 shrink-0" /> : null}
    </>
  );

  if (href && !disabled) {
    return (
      <a
        id={id}
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        aria-label={ariaLabel}
        data-action={dataAction}
        data-target={dataTarget}
        class={baseClass}
      >
        {inner}
      </a>
    );
  }

  return (
    <button
      id={id}
      name={name}
      value={value}
      type={type}
      disabled={disabled}
      aria-disabled={disabled ? 'true' : undefined}
      aria-label={ariaLabel}
      data-action={dataAction}
      data-target={dataTarget}
      class={baseClass}
    >
      {inner}
    </button>
  );
}
