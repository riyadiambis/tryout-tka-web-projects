import type { PropsWithChildren } from '@kitajs/html';
import { Icon, type IconName } from './icon';

export type BadgeVariant =
  | 'orange'
  | 'blue'
  | 'purple'
  | 'green'
  | 'stabilo'
  | 'neutral'
  | 'correct'
  | 'wrong';

export interface BadgeProps extends PropsWithChildren {
  variant?: BadgeVariant;
  size?: 'sm' | 'md' | 'icon';
  pill?: boolean;
  icon?: IconName;
  id?: string;
  class?: string;
}

export function Badge({
  variant = 'neutral',
  size = 'sm',
  pill = false,
  icon,
  id,
  class: extraClass = '',
  children,
}: BadgeProps): JSX.Element {
  if (size === 'icon') {
    const iconBg =
      variant === 'orange'
        ? 'bg-badge-orange text-white'
        : variant === 'blue'
          ? 'bg-badge-blue text-white'
          : variant === 'purple'
            ? 'bg-badge-purple text-white'
            : variant === 'green'
              ? 'bg-badge-green text-white'
              : variant === 'stabilo'
                ? 'bg-stabilo text-ink'
                : variant === 'correct'
                  ? 'bg-correct text-white'
                  : variant === 'wrong'
                    ? 'bg-wrong text-white'
                    : 'bg-paper-soft text-ink';

    return (
      <div
        id={id}
        class={`w-[46px] h-[46px] rounded-badge border-2 border-ink shadow-solid-sm flex items-center justify-center font-title font-extrabold text-[18px] shrink-0 ${iconBg} ${extraClass}`.trim()}
      >
        {icon ? <Icon name={icon} class="w-6 h-6" /> : children}
      </div>
    );
  }

  const radiusClass = pill ? 'rounded-full' : 'rounded-chip';
  const sizeClass =
    size === 'md'
      ? 'px-3 py-1 text-[13px]'
      : 'px-2.5 py-0.5 text-[12px]';

  let colorClass = '';
  switch (variant) {
    case 'orange':
      colorClass = 'bg-badge-orange text-white border-2 border-ink';
      break;
    case 'blue':
      colorClass = 'bg-badge-blue text-white border-2 border-ink';
      break;
    case 'purple':
      colorClass = 'bg-badge-purple text-white border-2 border-ink';
      break;
    case 'green':
      colorClass = 'bg-badge-green text-white border-2 border-ink';
      break;
    case 'stabilo':
      colorClass = 'bg-stabilo text-ink border-2 border-ink';
      break;
    case 'correct':
      colorClass = 'bg-correct-bg text-correct border-2 border-correct';
      break;
    case 'wrong':
      colorClass = 'bg-wrong-bg text-wrong border-2 border-wrong';
      break;
    default:
      colorClass = 'bg-paper-soft text-ink-soft border-2 border-ink';
      break;
  }

  return (
    <span
      id={id}
      class={`inline-flex items-center gap-1.5 font-body font-extrabold tracking-wide leading-tight ${radiusClass} ${sizeClass} ${colorClass} ${extraClass}`.trim()}
    >
      {icon ? <Icon name={icon} class="w-3.5 h-3.5 shrink-0" /> : null}
      <span>{children}</span>
    </span>
  );
}
