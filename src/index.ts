import { html } from '@elysiajs/html';
import { staticPlugin } from '@elysiajs/static';
import { Elysia } from 'elysia';
import { createAdminRoutes } from './modules/admin/routes';
import { createAuthRoutes } from './modules/auth/routes';
import { devRoutes } from './modules/dev/routes';
import { createPracticeRoutes } from './modules/practice/routes';
import { createTopicRoutes } from './modules/topic/routes';
import { createTryoutRoutes } from './modules/tryout/routes';
import { NotFoundPage } from './views/not-found-page';

export interface CreateAppOptions {
  nodeEnv?: string;
}

export async function createApp(options: CreateAppOptions = {}) {
  const env = options.nodeEnv ?? process.env.NODE_ENV ?? 'development';
  const isDevMode = env !== 'production';

  const app = new Elysia()
    .onError(({ code, set }) => {
      if (code === 'NOT_FOUND') {
        set.status = 404;
        set.headers['content-type'] = 'text/html; charset=utf-8';
        return NotFoundPage();
      }
    })
    .use(html());

  if (isDevMode) {
    app.use(devRoutes);
  }

  // Register explicit non-level routes BEFORE /:level dynamic routes
  app
    .use(createAdminRoutes())
    .use(createAuthRoutes())
    .use(createPracticeRoutes())
    .use(createTryoutRoutes(isDevMode))
    .use(createTopicRoutes(isDevMode));

  // Serve CSS with no-cache in dev mode to prevent stale browser styling
  app.get('/css/app.css', ({ set }) => {
    set.headers['content-type'] = 'text/css; charset=utf-8';
    set.headers['cache-control'] = isDevMode
      ? 'no-cache, no-store, must-revalidate'
      : 'public, max-age=86400';
    return Bun.file('public/css/app.css');
  });

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
  const isDev = process.env.NODE_ENV !== 'production';
  if (isDev) {
    try {
      Bun.spawnSync(['bun', 'run', 'build:css']);
    } catch (e) {
      console.warn('Gagal build CSS otomatis saat dev start:', e);
    }
  }

  const port = Number(process.env.PORT ?? 3000);
  const app = await createApp();
  app.listen(port);
  console.log(`Yuk Ngeles berjalan di http://localhost:${port}`);
}
