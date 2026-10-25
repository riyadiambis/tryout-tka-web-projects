import { Badge } from './components/badge';
import { Button } from './components/button';
import { Card } from './components/card';
import { StudentLayout } from './layouts/student-layout';

export function NotFoundPage(): string {
  return StudentLayout({
    title: 'Halaman Tidak Ditemukan (404)',
    navVariant: 'page',
    headerTitle: 'Halaman Tidak Ketemu',
    backHref: '/',
    containerMode: 'mobile',
    children: (
      <div class="py-4 flex flex-col items-center text-center gap-5">
        <Card padding="lg" class="w-full flex flex-col items-center gap-4">
          <Badge variant="orange" size="md">
            Kode 404
          </Badge>

          <img
            src="/img/mascot-404.svg"
            alt="Maskot buku tulis mencari halaman"
            class="w-44 h-40 object-contain mx-auto"
          />

          <h1 class="font-title font-extrabold text-[28px] text-ink leading-tight">
            Waduh, halaman yang <span class="stabilo-highlight">kamu cari</span> belum ada!
          </h1>

          <p class="text-[16px] text-ink-soft leading-relaxed">
            Bisa jadi alamat link yang kamu buka salah ketik atau paket soalnya sudah dipindahkan. Yuk balik ke beranda dan lanjut latihan!
          </p>

          <div class="w-full flex flex-col gap-3 pt-2">
            <Button href="/" variant="primary" fullWidth iconLeft="arrow-left">
              Kembali ke Beranda
            </Button>
            <div class="grid grid-cols-2 gap-2.5">
              <Button href="/sd" variant="secondary" fullWidth>
                SD Kelas 6
              </Button>
              <Button href="/smp" variant="secondary" fullWidth>
                SMP Kelas 9
              </Button>
            </div>
          </div>
        </Card>
      </div>
    ),
  });
}
