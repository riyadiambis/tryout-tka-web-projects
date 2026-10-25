import type { PropsWithChildren } from '@kitajs/html';

export interface BaseLayoutProps extends PropsWithChildren {
  title: string;
  description?: string;
  scripts?: string[];
  bodyClass?: string;
}

export function BaseLayout({
  title,
  description = 'Latihan soal dan Tryout TKA Matematika SD Kelas 6 dan SMP Kelas 9 bersama Yuk Ngeles.',
  scripts = [],
  bodyClass = 'bg-notebook text-ink font-body antialiased',
  children,
}: BaseLayoutProps): string {
  const fullTitle = title.includes('Yuk Ngeles') ? title : `${title} - Yuk Ngeles`;

  return (
    '<!DOCTYPE html>' +
    (
      <html lang="id">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title safe>{fullTitle}</title>
          <meta name="description" content={description} />
          <link rel="icon" type="image/svg+xml" href="/img/favicon.svg" />
          <link rel="stylesheet" href="/css/katex.min.css" />
          <link rel="stylesheet" href="/css/app.css" />
        </head>
        <body class={`min-h-screen flex flex-col ${bodyClass}`.trim()}>
          {children}
          {scripts.map((src) => (
            <script src={src} defer />
          ))}
        </body>
      </html>
    )
  );
}
