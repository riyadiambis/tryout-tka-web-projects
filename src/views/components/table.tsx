import type { PropsWithChildren } from '@kitajs/html';
import { Icon } from './icon';

export interface TableHeaderColumn {
  label: string;
  align?: 'left' | 'center' | 'right';
  class?: string;
}

export interface TableProps extends PropsWithChildren {
  headers: TableHeaderColumn[];
  isEmpty?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  footerInfo?: string;
  class?: string;
}

export function Table({
  headers,
  isEmpty = false,
  emptyTitle = 'Belum ada data',
  emptyDescription = 'Data yang kamu cari belum tersedia saat ini.',
  footerInfo,
  class: extraClass = '',
  children,
}: TableProps): JSX.Element {
  return (
    <div class={`bg-card border-2 border-ink rounded-card shadow-solid overflow-hidden ${extraClass}`.trim()}>
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-paper-soft border-b-2 border-ink text-ink font-body font-extrabold text-[12px] uppercase tracking-wider">
              {headers.map((col, idx) => {
                const alignClass =
                  col.align === 'center'
                    ? 'text-center'
                    : col.align === 'right'
                      ? 'text-right'
                      : 'text-left';
                const borderR = idx < headers.length - 1 ? 'border-r-2 border-ink/20' : '';
                return (
                  <th
                    class={`py-3.5 px-3.5 ${alignClass} ${borderR} ${col.class ?? ''}`.trim()}
                    safe
                  >
                    {col.label}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody class="divide-y-2 divide-ink/15 font-body text-[15px] text-ink">
            {isEmpty ? (
              <tr>
                <td colspan={String(headers.length)} class="py-12 px-6 text-center">
                  <div class="flex flex-col items-center justify-center gap-2 max-w-sm mx-auto">
                    <div class="w-12 h-12 rounded-badge bg-paper-soft border-2 border-ink flex items-center justify-center text-ink-soft">
                      <Icon name="search" class="w-6 h-6" />
                    </div>
                    <p class="font-title font-bold text-[19px] text-ink" safe>
                      {emptyTitle}
                    </p>
                    <p class="text-[15px] text-ink-soft" safe>
                      {emptyDescription}
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              children
            )}
          </tbody>
        </table>
      </div>
      {footerInfo ? (
        <div class="bg-paper-soft border-t-2 border-ink px-4 py-2.5 text-[13px] font-bold text-ink-soft flex items-center justify-between">
          <span safe>{footerInfo}</span>
        </div>
      ) : null}
    </div>
  );
}
