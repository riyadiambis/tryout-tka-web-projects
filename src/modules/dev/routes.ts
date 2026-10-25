import { Elysia } from 'elysia';
import { ComponentCatalogPage } from './views/component-catalog-page';

export const devRoutes = new Elysia({ name: 'dev-routes' }).get('/dev/komponen', ({ set }) => {
  set.headers['content-type'] = 'text/html; charset=utf-8';
  return ComponentCatalogPage();
});
