import { html } from '@elysiajs/html';
import { staticPlugin } from '@elysiajs/static';
import { Elysia } from 'elysia';
import { devRoutes } from './modules/dev/routes';
import { NotFoundPage } from './views/not-found-page';

export interface CreateAppOptions {
  nodeEnv?: string;
}

export function createApp(options: CreateAppOptions = {}) {
  const env = options.nodeEnv ?? process.env.NODE_ENV ?? 'development';
  const app = new Elysia()
    .use(html())
    .use(
      staticPlugin({
        assets: 'public',
        prefix: '',
      })
    );

  if (env !== 'production') {
    app.use(devRoutes);
  }

  app.all('*', ({ set }) => {
    set.status = 404;
    set.headers['content-type'] = 'text/html; charset=utf-8';
    return NotFoundPage();
  });

  return app;
}

if (import.meta.main) {
  const port = Number(process.env.PORT ?? 3000);
  const app = createApp();
  app.listen(port);
  console.log(`Yuk Ngeles berjalan di http://localhost:${port}`);
}
