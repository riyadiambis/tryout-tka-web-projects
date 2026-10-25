import type { PropsWithChildren } from '@kitajs/html';

export type CardVariant = 'default' | 'soft' | 'dashed' | 'interactive';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface CardProps extends PropsWithChildren {
  variant?: CardVariant;
  padding?: CardPadding;
  href?: string;
  id?: string;
  class?: string;
}

export function Card({
  variant = 'default',
  padding = 'md',
  href,
  id,
  class: extraClass = '',
  children,
}: CardProps): JSX.Element {
  const padClass =
    padding === 'none'
      ? ''
      : padding === 'sm'
        ? 'p-3.5'
        : padding === 'lg'
          ? 'p-6 sm:p-7'
          : 'p-4 sm:p-5';

  let variantClass = '';
  if (variant === 'soft') {
    variantClass = 'bg-paper-soft border-2 border-ink rounded-card';
  } else if (variant === 'dashed') {
    variantClass = 'bg-paper-soft/80 border-2 border-dashed border-ink rounded-card';
  } else if (variant === 'interactive') {
    variantClass = 'bg-card border-2 border-ink rounded-card shadow-solid pressable hover:bg-paper cursor-pointer block';
  } else {
    variantClass = 'bg-card border-2 border-ink rounded-card shadow-solid';
  }

  const combined = `${variantClass} ${padClass} ${extraClass}`.trim();

  if (href) {
    return (
      <a id={id} href={href} class={combined}>
        {children}
      </a>
    );
  }

  return (
    <div id={id} class={combined}>
      {children}
    </div>
  );
}
