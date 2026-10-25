import { html } from '@elysiajs/html';
import { staticPlugin } from '@elysiajs/static';
import { Elysia } from 'elysia';
import { devRoutes } from './modules/dev/routes';
import { NotFoundPage } from './views/not-found-page';

export interface CreateAppOptions {
  nodeEnv?: string;
}

export async function createApp(options: CreateAppOptions = {}) {
  const env = options.nodeEnv ?? process.env.NODE_ENV ?? 'development';
  const app = new Elysia()
    .onError(({ code, set }) => {
      if (code === 'NOT_FOUND') {
        set.status = 404;
        set.headers['content-type'] = 'text/html; charset=utf-8';
        return NotFoundPage();
      }
    })
    .use(html());

  if (env !== 'production') {
    app.use(devRoutes);
  }

  app.use(
    await staticPlugin({
      assets: 'public',
      prefix: '',
      alwaysStatic: false,
    })
  );

  return app;
}

if (import.meta.main) {
  const port = Number(process.env.PORT ?? 3000);
  const app = await createApp();
  app.listen(port);
  console.log(`Yuk Ngeles berjalan di http://localhost:${port}`);
}
