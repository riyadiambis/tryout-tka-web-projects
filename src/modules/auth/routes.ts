import { Elysia } from 'elysia';
import { LoginPage } from './views/login-page';
import { RegisterPage } from './views/register-page';

const SUPPORT_WHATSAPP_URL = 'https://wa.me/6281234567890';

function sanitizeReturnTo(raw: unknown): string {
  if (typeof raw !== 'string') return '';
  if (!raw.startsWith('/') || raw.startsWith('//') || raw.startsWith('/admin')) {
    return '';
  }
  return raw;
}

export function createAuthRoutes() {
  return new Elysia({ name: 'auth-routes' })
    .get('/daftar', ({ query, set }) => {
      set.headers['content-type'] = 'text/html; charset=utf-8';
      const returnTo = sanitizeReturnTo(query.returnTo);
      const errCode = typeof query.error === 'string' ? query.error : '';

      let errorMessage: string | undefined;
      const fieldErrors: Record<string, string> = {};

      if (errCode === 'username_terpakai') {
        errorMessage = 'Username ini sudah dipakai teman lain. Coba tambahkan angka di belakangnya ya.';
        fieldErrors.username = 'Username sudah terdaftar';
      } else if (errCode === 'wali_wajib') {
        errorMessage = 'Centang dulu persetujuan orang tua atau wali sebelum mendaftar.';
        fieldErrors.parentConsent = 'Persetujuan orang tua atau wali wajib dicentang';
      }

      return RegisterPage({
        mode: 'register',
        returnTo,
        errorMessage,
        fieldErrors,
        defaultValues:
          errCode === 'username_terpakai'
            ? { displayName: 'Raka', username: 'raka_smp9', parentConsent: true }
            : {},
        supportWhatsappUrl: SUPPORT_WHATSAPP_URL,
      });
    })
    .post('/daftar', ({ body, set }) => {
      const form = (body ?? {}) as Record<string, unknown>;
      const displayName = typeof form.displayName === 'string' ? form.displayName.trim() : '';
      const username = typeof form.username === 'string' ? form.username.trim() : '';
      const password = typeof form.password === 'string' ? form.password : '';
      const parentConsent = form.parentConsent === '1' || form.parentConsent === 'on';
      const returnTo = sanitizeReturnTo(form.returnTo);

      const fieldErrors: Record<string, string> = {};
      if (!displayName) {
        fieldErrors.displayName = 'Nama panggilan wajib diisi';
      }
      if (!username || /\s/.test(username)) {
        fieldErrors.username = 'Username wajib diisi tanpa spasi';
      } else if (username.toLowerCase() === 'raka_smp9') {
        fieldErrors.username = 'Username sudah dipakai teman lain';
      }
      if (password.length < 6) {
        fieldErrors.password = 'Password minimal 6 karakter';
      }
      if (!parentConsent) {
        fieldErrors.parentConsent = 'Persetujuan orang tua atau wali wajib dicentang';
      }

      if (Object.keys(fieldErrors).length > 0) {
        set.status = 400;
        set.headers['content-type'] = 'text/html; charset=utf-8';
        return RegisterPage({
          mode: 'register',
          returnTo,
          errorMessage: 'Masih ada isian yang perlu diperbaiki dulu ya.',
          fieldErrors,
          defaultValues: { displayName, username, parentConsent },
          supportWhatsappUrl: SUPPORT_WHATSAPP_URL,
        });
      }

      // ISSUE-01 UI Demo: redirect to simulated logged-in view (no real DB/session yet)
      set.status = 303;
      set.headers['location'] = returnTo || '/smp?sesi=masuk';
      return '';
    })
    .get('/masuk', ({ query, set }) => {
      set.headers['content-type'] = 'text/html; charset=utf-8';
      const returnTo = sanitizeReturnTo(query.returnTo);
      const errCode = typeof query.error === 'string' ? query.error : '';

      let errorMessage: string | undefined;
      const fieldErrors: Record<string, string> = {};

      if (errCode === 'kredensial_salah') {
        errorMessage = 'Username atau password belum tepat. Coba ketik pelan-pelan lagi ya.';
        fieldErrors.password = 'Periksa kembali password kamu';
      } else if (errCode === 'terlalu_banyak') {
        errorMessage = 'Terlalu banyak percobaan masuk. Tunggu sebentar lalu coba lagi ya.';
      }

      return LoginPage({
        mode: 'login',
        returnTo,
        errorMessage,
        fieldErrors,
        defaultValues: errCode === 'kredensial_salah' ? { username: 'raka_smp9' } : {},
        supportWhatsappUrl: SUPPORT_WHATSAPP_URL,
      });
    })
    .post('/masuk', ({ body, set }) => {
      const form = (body ?? {}) as Record<string, unknown>;
      const username = typeof form.username === 'string' ? form.username.trim() : '';
      const password = typeof form.password === 'string' ? form.password : '';
      const returnTo = sanitizeReturnTo(form.returnTo);

      const fieldErrors: Record<string, string> = {};
      if (!username) {
        fieldErrors.username = 'Username wajib diisi';
      }
      if (!password) {
        fieldErrors.password = 'Password wajib diisi';
      }

      if (Object.keys(fieldErrors).length > 0 || username === 'salah') {
        set.status = 400;
        set.headers['content-type'] = 'text/html; charset=utf-8';
        return LoginPage({
          mode: 'login',
          returnTo,
          errorMessage:
            username === 'salah'
              ? 'Username atau password belum tepat. Coba ketik ulang ya.'
              : 'Isi username dan password terlebih dahulu ya.',
          fieldErrors,
          defaultValues: { username },
          supportWhatsappUrl: SUPPORT_WHATSAPP_URL,
        });
      }

      // ISSUE-01 UI Demo: redirect to simulated logged-in view
      set.status = 303;
      set.headers['location'] = returnTo || '/smp?sesi=masuk';
      return '';
    })
    .get('/keluar', ({ set }) => {
      set.status = 303;
      set.headers['location'] = '/';
      return '';
    })
    .post('/keluar', ({ set }) => {
      set.status = 303;
      set.headers['location'] = '/';
      return '';
    });
}
