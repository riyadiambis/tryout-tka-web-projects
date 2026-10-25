import type { QuestionForAttempt, QuestionResultItem } from '../../../fixtures/types';
import { renderInlineMarkdownWithLatex, renderMarkdownWithLatex } from '../../../lib/markdown';
import { buildLongVideoUrl, buildShortsUrl } from '../../../lib/youtube';
import { AdminMobileNav } from '../../../views/components/admin-sidebar';
import { Badge } from '../../../views/components/badge';
import { BottomSheet } from '../../../views/components/bottom-sheet';
import { Button } from '../../../views/components/button';
import { Card } from '../../../views/components/card';
import { Checkbox } from '../../../views/components/checkbox';
import { ExplanationCard } from '../../../views/components/explanation-card';
import { Input } from '../../../views/components/input';
import { Modal } from '../../../views/components/modal';
import { Navbar } from '../../../views/components/navbar';
import { QuestionCard } from '../../../views/components/question-card';
import { QuestionNumberGrid } from '../../../views/components/question-number-grid';
import { Select } from '../../../views/components/select';
import { Table } from '../../../views/components/table';
import { Timer } from '../../../views/components/timer';
import { Toggle } from '../../../views/components/toggle';
import { StudentLayout } from '../../../views/layouts/student-layout';

export function ComponentCatalogPage(): string {
  const sampleSingle: QuestionForAttempt = {
    id: 'cat-q1',
    number: 1,
    level: 'smp',
    elementName: 'Bilangan',
    questionType: 'single',
    bodyHtml: renderMarkdownWithLatex(
      'Hasil penyederhanaan bentuk pangkat berikut adalah ...\n\n$$\\frac{2^{12} \\times 3^{8} \\times 5^{6} \\times 7^{4}}{2^{9} \\times 3^{6} \\times 5^{5} \\times 7^{4}} + \\frac{a^{10} b^{8} c^{6}}{a^{7} b^{5} c^{4}}$$'
    ),
    options: [
      { kind: 'choice', key: 'A', labelHtml: renderInlineMarkdownWithLatex('$360 + a^3 b^3 c^2$') },
      { kind: 'choice', key: 'B', labelHtml: renderInlineMarkdownWithLatex('$180 + a^3 b^2 c^2$') },
      { kind: 'choice', key: 'C', labelHtml: renderInlineMarkdownWithLatex('$360 + a^{17} b^{13} c^{10}$') },
      { kind: 'choice', key: 'D', labelHtml: renderInlineMarkdownWithLatex('$72 + a^3 b^3 c^2$') },
    ],
  };

  const sampleMultiple: QuestionForAttempt = {
    id: 'cat-q2',
    number: 2,
    level: 'smp',
    elementName: 'Bilangan',
    questionType: 'multiple',
    bodyHtml: renderMarkdownWithLatex('Manakah pernyataan yang senilai dengan \\((3^2)^3\\)?'),
    options: [
      { kind: 'choice', key: 'A', labelHtml: renderInlineMarkdownWithLatex('$3^{2+2+2} = 3^6$') },
      { kind: 'choice', key: 'B', labelHtml: renderInlineMarkdownWithLatex('$3^2 \\times 3^2 \\times 3^2$') },
      { kind: 'choice', key: 'C', labelHtml: renderInlineMarkdownWithLatex('$3^{2+3} = 3^5$') },
      { kind: 'choice', key: 'D', labelHtml: renderInlineMarkdownWithLatex('$9^3$') },
    ],
  };

  const sampleCategory: QuestionForAttempt = {
    id: 'cat-q3',
    number: 3,
    level: 'smp',
    elementName: 'Aljabar',
    questionType: 'category',
    bodyHtml: renderMarkdownWithLatex('Tentukan apakah setiap pernyataan eksponen berikut **Benar** atau **Salah**:'),
    options: [
      { kind: 'statement', statementId: '1', statementHtml: renderInlineMarkdownWithLatex('$5^0 = 1$') },
      { kind: 'statement', statementId: '2', statementHtml: renderInlineMarkdownWithLatex('$(-2)^3 = 8$') },
      { kind: 'statement', statementId: '3', statementHtml: renderInlineMarkdownWithLatex('$(a^4)^2 = a^8$') },
    ],
  };

  const sampleResults: QuestionResultItem[] = [
    {
      ...sampleSingle,
      status: 'correct',
      studentAnswer: 'A',
      studentAnswerLabel: 'A',
      answerKeyLabel: 'A',
      explanationHtml: renderMarkdownWithLatex(
        'Gunakan sifat pembagian bilangan berpangkat $\\frac{x^m}{x^n} = x^{m-n}$:\n\n\\[2^{3} \\times 3^{2} \\times 5^{1} \\times 7^{0} = 8 \\times 9 \\times 5 \\times 1 = 360\\]\n\nDitambah suku kedua $a^3 b^3 c^2$, sehingga jawabannya **A**.'
      ),
      shortsUrl: buildShortsUrl('abc123XYZ_-'),
      longVideoUrl: buildLongVideoUrl('dQw4w9WgXcQ', 200),
      longVideoTimeLabel: '03:20',
    },
    {
      ...sampleMultiple,
      status: 'wrong',
      studentAnswer: ['A', 'B'],
      studentAnswerLabel: 'Pilihan 1, Pilihan 2',
      answerKeyLabel: 'Pilihan 1, Pilihan 2, Pilihan 4',
      explanationHtml: renderMarkdownWithLatex(
        'Ingat bahwa $(3^2)^3 = 3^6$ dan juga sama dengan $9^3$. Pada pilihan ganda kompleks, semua jawaban benar harus dipilih lengkap.'
      ),
      shortsUrl: buildShortsUrl('abc123XYZ_-'),
    },
    {
      ...sampleCategory,
      status: 'unanswered',
      studentAnswer: null,
      studentAnswerLabel: 'Kosong',
      answerKeyLabel: '1: Benar, 2: Salah, 3: Benar',
      explanationHtml: renderMarkdownWithLatex(
        'Bilangan tak nol dipangkatkan $0$ bernilai $1$, sedangkan $(-2)^3 = -8$ (bukan $8$).'
      ),
    },
  ];

  return StudentLayout({
    title: 'Katalog Komponen Buku Tulis (Dev)',
    navVariant: 'page',
    headerTitle: 'Katalog Komponen UI',
    backHref: '/',
    containerMode: 'beranda',
    scripts: ['/js/catalog.js'],
    children: (
      <div class="flex flex-col gap-8">
        <Card padding="lg" class="flex flex-col gap-2">
          <Badge variant="stabilo" size="md">KHUSUS DEVELOPMENT</Badge>
          <h1 class="font-title font-extrabold text-[28px] sm:text-[34px] text-ink leading-tight">
            Katalog 15 Komponen Dasar <span class="stabilo-highlight">Buku Tulis</span>
          </h1>
          <p class="text-[16px] text-ink-soft">
            Halaman ini aktif hanya saat NODE_ENV bukan production untuk menguji konsistensi token warna, border 2px tinta, bayangan offset, area tap 48px, dan aturan penanda opsi jawaban.
          </p>
        </Card>

        {/* 1. Button */}
        <section class="flex flex-col gap-3">
          <h2 class="label-section">1. BUTTON (TOMBOL)</h2>
          <Card class="flex flex-wrap items-center gap-3">
            <Button variant="primary">Tombol Utama</Button>
            <Button variant="secondary" iconLeft="book">Tombol Sekunder</Button>
            <Button variant="danger">Tombol Bahaya</Button>
            <Button variant="ghost">Tombol Ghost</Button>
            <Button variant="primary" disabled>Terkunci</Button>
          </Card>
        </section>

        {/* 2 & 3. Card & Badge */}
        <section class="flex flex-col gap-3">
          <h2 class="label-section">2 &amp; 3. CARD DAN BADGE</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card variant="default">
              <p class="font-title font-bold text-[18px]">Kartu Default</p>
              <p class="text-ink-soft mt-1">Latar putih bersih dengan bayangan solid 4px.</p>
            </Card>
            <Card variant="soft">
              <p class="font-title font-bold text-[18px]">Kartu Soft</p>
              <p class="text-ink-soft mt-1">Latar kertas lembut untuk kotak info pendukung.</p>
            </Card>
            <Card variant="dashed">
              <p class="font-title font-bold text-[18px]">Kartu Garis Putus</p>
              <p class="text-ink-soft mt-1">Dipakai pada kartu ajakan daftar atau coba TO.</p>
            </Card>
          </div>
          <Card class="flex flex-wrap items-center gap-2.5">
            <Badge variant="orange" size="icon">SD</Badge>
            <Badge variant="blue" size="icon">SMP</Badge>
            <Badge variant="orange">SD Kelas 6</Badge>
            <Badge variant="blue">SMP Kelas 9</Badge>
            <Badge variant="purple">Geometri</Badge>
            <Badge variant="green">Aljabar</Badge>
            <Badge variant="stabilo">Tersedia</Badge>
            <Badge variant="neutral">Kosong</Badge>
            <Badge variant="correct" pill icon="check-circle">Benar</Badge>
            <Badge variant="wrong" pill icon="x-circle">Salah</Badge>
          </Card>
        </section>

        {/* 4, 5, 6, 7. Form Controls */}
        <section class="flex flex-col gap-3">
          <h2 class="label-section">4 - 7. INPUT, SELECT, CHECKBOX, DAN TOGGLE</h2>
          <Card class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input
              id="demo-nama"
              name="demo_nama"
              label="Nama Panggilan"
              placeholder="Contoh: Raka"
              hint="Maksimal 20 huruf"
            />
            <Input
              id="demo-pass"
              name="demo_pass"
              type="password"
              label="Password"
              value="rahasia123"
            />
            <Input
              id="demo-error"
              name="demo_error"
              label="Username (Contoh Error)"
              value="raka spasi"
              error="Username tidak boleh memakai spasi."
            />
            <Select
              id="demo-jenjang"
              name="demo_jenjang"
              label="Pilih Jenjang"
              subLabel="Wajib"
              selectedValue="smp"
              options={[
                { value: 'sd', label: 'SD Kelas 6' },
                { value: 'smp', label: 'SMP Kelas 9' },
              ]}
            />
            <Checkbox
              id="demo-wali"
              name="demo_wali"
              checked
              label="Orang tua atau wali sudah tahu aku daftar di sini"
              description="Centang standar navy di atas kotak kuning stabilo."
            />
            <div class="flex flex-col gap-3">
              <Toggle id="demo-switch" name="demo_switch" label="Mode Pengingat Belajar" checked />
              <Toggle id="demo-binary" name="demo_binary" variant="binary" selectedValue="true" />
            </div>
          </Card>
        </section>

        {/* 8. Table */}
        <section class="flex flex-col gap-3">
          <h2 class="label-section">8. TABLE (TABEL DATA)</h2>
          <Table
            headers={[
              { label: 'No', align: 'center', class: 'w-16' },
              { label: 'Materi' },
              { label: 'Jenjang' },
              { label: 'Status', align: 'center' },
            ]}
            footerInfo="Menampilkan 2 contoh baris materi"
          >
            <tr>
              <td class="py-3 px-3.5 text-center font-bold border-r-2 border-ink/15">1</td>
              <td class="py-3 px-3.5 font-bold border-r-2 border-ink/15">Bilangan Berpangkat</td>
              <td class="py-3 px-3.5 border-r-2 border-ink/15"><Badge variant="blue">SMP Kelas 9</Badge></td>
              <td class="py-3 px-3.5 text-center"><Badge variant="correct">Terbit</Badge></td>
            </tr>
            <tr>
              <td class="py-3 px-3.5 text-center font-bold border-r-2 border-ink/15">2</td>
              <td class="py-3 px-3.5 font-bold border-r-2 border-ink/15">Operasi Pecahan Campuran</td>
              <td class="py-3 px-3.5 border-r-2 border-ink/15"><Badge variant="orange">SD Kelas 6</Badge></td>
              <td class="py-3 px-3.5 text-center"><Badge variant="neutral">Draft</Badge></td>
            </tr>
          </Table>
        </section>

        {/* 9, 10, 15. Modal, BottomSheet, Timer */}
        <section class="flex flex-col gap-3">
          <h2 class="label-section">9, 10 &amp; 15. MODAL, BOTTOM SHEET, DAN TIMER</h2>
          <Card class="flex flex-wrap items-center justify-between gap-4">
            <div class="flex flex-wrap items-center gap-3">
              <Timer id="catalog-timer-normal" remainingSeconds={1425} />
              <Timer id="catalog-timer-urgent" remainingSeconds={295} />
            </div>
            <div class="flex flex-wrap items-center gap-3">
              <Button dataAction="open-modal" dataTarget="demo-modal" variant="primary">
                Buka Contoh Modal
              </Button>
              <Button dataAction="open-sheet" dataTarget="demo-sheet" variant="secondary" class="lg:hidden">
                Buka Bottom Sheet (HP)
              </Button>
            </div>
          </Card>

          <Modal
            id="demo-modal"
            title="Masih Ada Soal Kosong"
            iconVariant="warning"
            footer={
              <>
                <Button dataAction="close-modal" dataTarget="demo-modal" variant="secondary">
                  Cek Lagi
                </Button>
                <Button dataAction="close-modal" dataTarget="demo-modal" variant="primary">
                  Tetap Kumpulkan
                </Button>
              </>
            }
          >
            <p>Kamu baru menjawab <strong>3 dari 5 soal</strong>. Nomor 4 dan 5 masih kosong. Yakin mau dikumpulkan sekarang?</p>
          </Modal>

          <BottomSheet id="demo-sheet" title="Daftar Nomor Soal" subtitle="3 dari 5 soal sudah diisi">
            <QuestionNumberGrid
              activeNumber={2}
              items={[
                { number: 1, questionId: 'cat-q1', isAnswered: true },
                { number: 2, questionId: 'cat-q2', isAnswered: true },
                { number: 3, questionId: 'cat-q3', isAnswered: true, isFlagged: true },
                { number: 4, questionId: 'cat-q4', isAnswered: false },
                { number: 5, questionId: 'cat-q5', isAnswered: false },
              ]}
            />
          </BottomSheet>
        </section>

        {/* 11 & 12. Navbar & Admin Nav Preview */}
        <section class="flex flex-col gap-3">
          <h2 class="label-section">11 &amp; 12. VARIAN NAVBAR DAN NAVIGASI ADMIN</h2>
          <div class="rounded-card border-2 border-ink overflow-hidden shadow-solid">
            <Navbar variant="home" />
          </div>
          <div class="rounded-card border-2 border-ink overflow-hidden shadow-solid">
            <AdminMobileNav activeMenu="questions" />
          </div>
        </section>

        {/* 13. QuestionCard (3 Types) */}
        <section class="flex flex-col gap-4" id="catalog-questions">
          <h2 class="label-section">13. QUESTION CARD (PENANDA KUNING STABILO DAN NAVY, TANPA CHECK_CIRCLE)</h2>
          <QuestionCard question={sampleSingle} selectedAnswer="A" showFlagButton />
          <QuestionCard question={sampleMultiple} selectedAnswer={['A', 'B']} />
          <QuestionCard question={sampleCategory} selectedAnswer={{ '1': true, '2': false }} />
        </section>

        {/* 14. ExplanationCard (3 Statuses) */}
        <section class="flex flex-col gap-4">
          <h2 class="label-section">14. EXPLANATION CARD (BENAR, SALAH, DAN KOSONG)</h2>
          {sampleResults.map((item) => (
            <ExplanationCard item={item} />
          ))}
        </section>
      </div>
    ),
  });
}
