---
name: Buku Tulis EdTech
colors:
  surface: '#fbf9f0'
  surface-dim: '#dcdad2'
  surface-bright: '#fbf9f0'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f4eb'
  surface-container: '#f0eee5'
  surface-container-high: '#eae8e0'
  surface-container-highest: '#e4e3da'
  on-surface: '#1b1c17'
  on-surface-variant: '#4d4634'
  inverse-surface: '#30312b'
  inverse-on-surface: '#f3f1e8'
  outline: '#7e7662'
  outline-variant: '#d0c6ae'
  surface-tint: '#725c00'
  primary: '#725c00'
  on-primary: '#ffffff'
  primary-container: '#ffd84d'
  on-primary-container: '#735e00'
  inverse-primary: '#e9c339'
  secondary: '#436084'
  on-secondary: '#ffffff'
  secondary-container: '#b6d4fe'
  on-secondary-container: '#3f5b7f'
  tertiary: '#0061a2'
  on-tertiary: '#ffffff'
  tertiary-container: '#c3ddff'
  on-tertiary-container: '#0063a4'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffe07e'
  primary-fixed-dim: '#e9c339'
  on-primary-fixed: '#231b00'
  on-primary-fixed-variant: '#564500'
  secondary-fixed: '#d2e4ff'
  secondary-fixed-dim: '#abc9f2'
  on-secondary-fixed: '#001c38'
  on-secondary-fixed-variant: '#2b486b'
  tertiary-fixed: '#d1e4ff'
  tertiary-fixed-dim: '#9dcaff'
  on-tertiary-fixed: '#001d35'
  on-tertiary-fixed-variant: '#00497c'
  background: '#fbf9f0'
  on-background: '#1b1c17'
  surface-variant: '#e4e3da'
typography:
  display-lg:
    fontFamily: Rubik
    fontSize: 36px
    fontWeight: '800'
    lineHeight: 44px
  display-lg-mobile:
    fontFamily: Rubik
    fontSize: 30px
    fontWeight: '800'
    lineHeight: 38px
  headline-lg:
    fontFamily: Rubik
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 34px
  headline-md:
    fontFamily: Rubik
    fontSize: 22px
    fontWeight: '700'
    lineHeight: 30px
  headline-sm:
    fontFamily: Rubik
    fontSize: 19px
    fontWeight: '700'
    lineHeight: 26px
  body-lg:
    fontFamily: Nunito Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 28px
  body-md:
    fontFamily: Nunito Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-bold:
    fontFamily: Nunito Sans
    fontSize: 16px
    fontWeight: '700'
    lineHeight: 24px
  label-section:
    fontFamily: Nunito Sans
    fontSize: 13px
    fontWeight: '800'
    lineHeight: 18px
    letterSpacing: 0.08em
  label-sm:
    fontFamily: Nunito Sans
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 20px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  margin: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style
The design system establishes an authentic "Buku Tulis" (Indonesian school exercise book) environment built purposefully for Grade 6 SD and Grade 9 SMP students preparing for TKA Matematika (Tes Kemampuan Akademik). The visual metaphor combines retro classroom stationery with modern, approachable tactile interactions. 

The emotional objective is to remove math anxiety by replacing intimidating sterile test software with a familiar, tactile, and encouraging paper notebook feel. The interface blends geometric graph lines, bold ink-drawn outlines, and vibrant stationery accents (highlighter markers, colored binder tabs, and rubber-stamp validation). 

The voice and tone throughout the copy is casual-polite Indonesian, addressing the student warmly as "kamu" with direct, encouraging feedback without using formal academic jargon or em dashes.

## Colors
The palette evokes traditional graph exercise books ("buku kotak-kotak matematika") and classic student desk supplies:

- **Canvas Background:** Cream `#FFFDF4` evoking natural unbleached book pages.
- **Graph Grid Pattern:** Ultra-crisp `#D9E6F2` lines rendered strictly every 26px on canvas containers.
- **Ink Primary (Structural & Text):** Deep Navy `#1B3A5C` used for all structural borders, hard drop shadows, icon lines, and primary typography.
- **Ink Secondary:** Slate Navy `#5B7793` for supporting metadata, subheadings, hints, and breadcrumbs.
- **Highlighter Primary:** Highlighter Yellow `#FFD84D` for primary action buttons, streak indicators, and angled highlighter marker overlays behind emphasized words.
- **Stationery Accents (Category & Grade Badges):**
  - Oranye Semangat: `#E8734A` (SD Kelas 6 / Trigonometri dasar)
  - Biru Sains: `#4A9BE8` (SMP Kelas 9 / Aljabar)
  - Ungu Logika: `#8B5FBF` (Geometri & Statistika)
  - Hijau Target: `#2FA88B` (Target Harian & Poin)
- **Evaluation Feedback:**
  - Benar (Success): Dark Green `#1F9254` text/icon on Soft Mint `#E4F6EA` fill, bounded by 2px `#1F9254` border.
  - Salah (Danger): Crimson `#D9482F` text/icon on Soft Blush `#FCEAE6` fill, bounded by 2px `#D9482F` border.

## Typography
The typography system uses rounded, playful, high-legibility letterforms suited for mobile comprehension:

- **Headlines & Math Scores:** Configured with expressive, friendly rounded geometric grotesque forms (`Rubik`) mimicking student notebook headings, test scores, and formula banners.
- **Body & Problem Descriptions:** Configured with `Nunito Sans`. The minimum allowed body size is 16px to prevent eye fatigue during lengthy problem reading and complex fractions.
- **Section Labels & Kategori:** Always rendered in 13px, extra bold, uppercase, with wide letter-spacing (`tracking-widest`).
- **Highlighter Accent Rule:** Emphasized phrases or key numerical variables within headings apply an inline highlighter treatment: a background bar of `rgba(255, 216, 77, 0.85)` extending horizontally with 4px left/right padding and a -2 degree tilt.

## Layout & Spacing
The layout adheres strictly to an app-like single-column shell optimized for mobile viewports:

- **Canvas Dimension:** Base canvas is designed at 390px width, restricted to a maximum container width of 460px centered horizontally with an outer background frame on desktop screens.
- **Grid Background:** Base viewport layers contain an active CSS grid pattern: `linear-gradient(#D9E6F2 1px, transparent 1px), linear-gradient(90deg, #D9E6F2 1px, transparent 1px)` with background size exactly `26px 26px`.
- **Top Bar Exclusivity:** Navigation must strictly utilize a persistent top bar (height 64px) housing the avatar, XP/streak, and exit/back controls. Bottom tab bars are strictly prohibited to ensure maximum vertical focus on question stems and keyboard interaction.
- **Rhythm & Touch Targets:** Every interactive element satisfies a minimum touch target bounding box of 48px by 48px. Internal vertical spacing rhythm follows multiples of 8px (8px, 16px, 24px, 32px).

## Elevation & Depth
Depth in this design system rejects blurry ambient dropshadows in favor of sharp, physical paper stationery physics ("Hard Cut Neobrutalism"):

- **The Ink Border Rule:** All cards, floating pills, banners, and interactive controls must carry a solid 2px border in Navy `#1B3A5C`.
- **Hard Offset Shadow:** Elevation is expressed solely through non-blurred, hard drop shadows: `box-shadow: 4px 4px 0px #1B3A5C`.
- **Interactive Tactile Shift:**
  - Default state: `transform: translate(0, 0)` with `box-shadow: 4px 4px 0px #1B3A5C`.
  - Active/Hover/Pressed state: Translates 2px diagonally downward towards the shadow (`transform: translate(2px, 2px)`) with shadow reduced to `box-shadow: 2px 2px 0px #1B3A5C`.
  - Disabled state: `transform: none`, no shadow (`box-shadow: none`), border shifts to `#5B7793` at 40% opacity with light gray background.
- **Sticky / Overlay Depth:** Modal dialogs, math formula cheat-sheets, and bottom action sheets employ a heavy hard shadow: `6px 6px 0px #1B3A5C` with a semi-opaque backdrop scrim (`rgba(27, 58, 92, 0.4)`).

## Shapes
Geometry strikes a balance between clean exercise-book geometry and friendly rounded hand-drawn stationery:

- Standard structural cards, option answer boxes, and key primary/secondary buttons use an explicit corner radius of `16px` (`rounded-2xl`).
- Micro-elements such as tags, badges, timer chips, and numeric step badges use a corner radius of `8px` (`rounded-lg`) or full pill styling (`rounded-full`) for circular action icons.
- Checkbox markers and radio items utilize an 8px radius for soft square boxes and complete round circles for multiple-choice radios, both bounded by the 2px `#1B3A5C` stroke.

## Components

### Buttons
- **Tombol Utama (Primary):** Background Highlighter Yellow `#FFD84D`, 2px solid Navy `#1B3A5C` border, 16px radius, bold Navy text, `box-shadow: 4px 4px 0 #1B3A5C`. On press/hover: translate 2px 2px with 2px 2px shadow.
- **Tombol Sekunder (Secondary):** Background pure White `#FFFFFF`, 2px solid Navy `#1B3A5C` border, 16px radius, bold Navy text, `box-shadow: 4px 4px 0 #1B3A5C`. Same tactile press interaction.
- **Tombol Bantuan (Ghost/Text):** Transparent background, Navy text, underline decoration with 48px tap height.

### Cards & Soal Containers
- **Card Soal (Question Card):** White `#FFFFFF` background, 2px solid Navy border, 16px radius, 4px 4px 0 Navy shadow. Padding: 20px. Contains header category chip and math formula text.
- **Pilihan Jawaban (Answer Option Item):** Radio-like card with minimum 52px height. White `#FFFFFF` background, 2px Navy border, 12px radius, 3px 3px 0 Navy shadow.
  - Selected state: Light Yellow `#FFF6D1` fill with 2px Navy border.
  - Correct verification: Light Mint `#E4F6EA` fill, 2px Green `#1F9254` border, Green `#1F9254` text.
  - Incorrect verification: Light Blush `#FCEAE6` fill, 2px Crimson `#D9482F` border, Crimson `#D9482F` text.

### Badges & Category Chips
- Inline-block badge with 2px solid Navy border and 8px border radius.
- Background tokens mapped by subject:
  - SD Kelas 6: `#E8734A` background with white bold text.
  - SMP Kelas 9: `#4A9BE8` background with white bold text.
  - Topik/Bab: `#8B5FBF` or `#2FA88B` with white bold text.
  - Status Latihan: `#FFFDF4` background with Navy text.

### Form Inputs & Numeric Keypads
- **Input Angka (Numeric Input):** Large bold numbers in 22px Rubik, White `#FFFFFF` background, 2px Navy border, 12px radius, interior padding 14px 16px. Placeholder text in `#5B7793`.
- **On-Screen Math Numpad Keys:** Grid of tactile square buttons with 12px radius, White background, 2px Navy border, 3px 3px 0 Navy shadow.

### Progress Bar & Timer
- **Indikator Progres:** 16px tall capsule container with 2px solid Navy border and Cream background. Filled progress bar uses vibrant Green `#2FA88B` with diagonal 2px navy hash stripes.
- **Timer Chip:** Pill badge (`rounded-full`) with `#FFFFFF` background, 2px Navy border, and bold Navy monospace countdown digits.