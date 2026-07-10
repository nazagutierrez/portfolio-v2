import { SiReact, SiTypescript, SiTailwindcss, SiNextdotjs, SiFirebase, SiNodedotjs, SiHtml5, SiCss3, SiAstro } from '@/components/BrandLogos';

import ravedates1 from '@/assets/work-examples/ravedates-1.webp?url';
import ravedates2 from '@/assets/work-examples/ravedates-2.webp?url';
import ravedates3 from '@/assets/work-examples/ravedates-3.webp?url';

import dymo1 from '@/assets/work-examples/dymo-1.webp?url';
import dymo2 from '@/assets/work-examples/dymo-2.webp?url';
import dymo3 from '@/assets/work-examples/dymo-3.webp?url';

import freelance1 from '@/assets/work-examples/freelance-1.webp?url';
import freelance2 from '@/assets/work-examples/freelance-2.webp?url';
import freelance3 from '@/assets/work-examples/freelance-3.webp?url';
import freelance4 from '@/assets/work-examples/freelance-4.webp?url';


export type Technology = {
  name?: string;
  icon: React.ElementType;
};

export type MediaItem = {
  id: number;
  type: 'image' | 'video';
  src: string;
  thumbnail?: string;
  description?: string;
  technologies?: Technology[];
};

const raveDatesStack = [
  { icon: SiReact },
  { icon: SiNextdotjs },
  { icon: SiTypescript },
  { icon: SiTailwindcss },
  { icon: SiHtml5 },
  { icon: SiCss3 },
];

export const dymoStack = [
  { icon: SiReact },
  { icon: SiAstro },
  { icon: SiTypescript },
  { icon: SiTailwindcss },
  { icon: SiHtml5 },
  { icon: SiCss3 },
];

const nordicapsStack = [
  { icon: SiNextdotjs },
  { icon: SiReact},
  { icon: SiTypescript},
  { icon: SiTailwindcss },
  { icon: SiHtml5 },
  { icon: SiCss3 }
];

const pisoFuerteStack = [
  { icon: SiReact},
  { icon: SiTypescript},
  { icon: SiTailwindcss },
  { icon: SiHtml5 },
  { icon: SiCss3 }
];

export const freelanceStack = [
  { icon: SiNextdotjs },
  { icon: SiFirebase },
  { icon: SiNodedotjs },
  { icon: SiTailwindcss },
  { icon: SiHtml5 },
  { icon: SiCss3 },
];


export const raveDatesMedia: MediaItem[] = [
  {
    id: 1,
    type: 'image',
    src: ravedates1,
    description: 'gallery.ravedates.desc1',
    technologies: raveDatesStack,
  },
  {
    id: 2,
    type: 'image',
    src: ravedates2,
    description: 'gallery.ravedates.desc2',
    technologies: raveDatesStack,
  },
  {
    id: 3,
    type: 'image',
    src: ravedates3,
    description: 'gallery.ravedates.desc3',
    technologies: raveDatesStack,
  },

  {
    id: 4,
    type: 'video',
    src: '/videos/video-ravedates.mp4',
    thumbnail: ravedates1,
    description: "gallery.ravedates.desc4",
    technologies: raveDatesStack,
  },
];

export const dymoMedia: MediaItem[] = [
  {
    id: 1,
    type: 'image',
    src: dymo1,
    description: 'gallery.dymo.desc1',
    technologies: dymoStack,
  },
  {
    id: 2,
    type: 'image',
    src: dymo2,
    description: 'gallery.dymo.desc2',
    technologies: dymoStack,
  },
  {
    id: 3,
    type: 'image',
    src: dymo3,
    description: 'gallery.dymo.desc3',
    technologies: dymoStack,
  },
  {
    id: 4,
    type: 'video',
    src: '/videos/video-dymo.mp4',
    thumbnail: dymo1,
    description: "gallery.dymo.desc4",
    technologies: dymoStack,
  },
];

export const freelanceMedia: MediaItem[] = [
  {
    id: 1,
    type: 'video',
    thumbnail: freelance1,
    src: '/videos/video-pisofuerte.mp4',
    description: 'gallery.freelance.desc1',
    technologies: pisoFuerteStack,
  },
  {
    id: 2,
    type: 'video',
    src: "/videos/video-nordicaps.mp4",
    thumbnail: freelance2,
    description: 'gallery.freelance.desc2',
    technologies: nordicapsStack,
  },
  {
    id: 3,
    type: 'image',
    src: freelance3,
    description: 'gallery.freelance.desc3',
    technologies: freelanceStack,
  },
  {
    id: 4,
    type: 'image',
    src: freelance4,
    description: 'gallery.freelance.desc4',
    technologies: freelanceStack,
  },
];
