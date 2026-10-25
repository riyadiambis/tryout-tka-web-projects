import type { ElementItem, Level } from './types';

export const DUMMY_ELEMENTS: ElementItem[] = [
  // SMP Kelas 9
  {
    id: 'el-smp-bil',
    level: 'smp',
    name: 'Bilangan',
    slug: 'bilangan',
    order: 1,
    badgeColor: 'blue',
    topicCount: 2,
    questionCount: 6,
  },
  {
    id: 'el-smp-alj',
    level: 'smp',
    name: 'Aljabar',
    slug: 'aljabar',
    order: 2,
    badgeColor: 'green',
    topicCount: 1,
    questionCount: 3,
  },
  {
    id: 'el-smp-geo',
    level: 'smp',
    name: 'Geometri dan Pengukuran',
    slug: 'geometri-dan-pengukuran',
    order: 3,
    badgeColor: 'purple',
    topicCount: 1,
    questionCount: 2,
  },
  {
    id: 'el-smp-dat',
    level: 'smp',
    name: 'Data dan Peluang',
    slug: 'data-dan-peluang',
    order: 4,
    badgeColor: 'orange',
    topicCount: 1,
    questionCount: 2,
  },

  // SD Kelas 6
  {
    id: 'el-sd-bil',
    level: 'sd',
    name: 'Bilangan',
    slug: 'bilangan',
    order: 1,
    badgeColor: 'orange',
    topicCount: 3,
    questionCount: 7,
  },
  {
    id: 'el-sd-geo',
    level: 'sd',
    name: 'Geometri dan Pengukuran',
    slug: 'geometri-dan-pengukuran',
    order: 2,
    badgeColor: 'purple',
    topicCount: 1,
    questionCount: 2,
  },
  {
    id: 'el-sd-dat',
    level: 'sd',
    name: 'Data',
    slug: 'data',
    order: 3,
    badgeColor: 'blue',
    topicCount: 1,
    questionCount: 2,
  },
];

export function getElementsByLevel(level: Level): ElementItem[] {
  return DUMMY_ELEMENTS.filter((el) => el.level === level).sort((a, b) => a.order - b.order);
}

export function getElementById(id: string): ElementItem | undefined {
  return DUMMY_ELEMENTS.find((el) => el.id === id);
}
