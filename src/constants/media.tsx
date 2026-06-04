import { SiReact, SiTypescript, SiTailwindcss, SiNextdotjs } from 'react-icons/si';

import ravedates1 from '@/assets/work-examples/ravedates-1.webp';
import ravedates2 from '@/assets/work-examples/ravedates-2.webp';
import ravedates3 from '@/assets/work-examples/ravedates-3.webp';

import dymo1 from '@/assets/work-examples/dymo-1.webp';
import dymo2 from '@/assets/work-examples/dymo-2.webp';
import dymo3 from '@/assets/work-examples/dymo-3.webp';

import freelance1 from '@/assets/work-examples/freelance-1.webp';
import freelance2 from '@/assets/work-examples/freelance-2.webp';
import freelance3 from '@/assets/work-examples/freelance-3.webp';
import freelance4 from '@/assets/work-examples/freelance-4.webp';


export type Technology = {
  name: string;
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

export const raveDatesMedia: MediaItem[] = [
  {
    id: 1,
    type: 'image',
    src: ravedates1,
    description: 'Plataforma de comercio electrónico con carrito y pasarela de pagos integrada. Diseñada para ofrecer una experiencia de usuario fluida y rápida.',
    technologies: [
      { name: 'React', icon: SiReact },
      { name: 'TypeScript', icon: SiTypescript },
      { name: 'Tailwind CSS', icon: SiTailwindcss },
    ]
  },
  {
    id: 2,
    type: 'image',
    src: ravedates2,
    description: 'Plataforma de comercio electrónico con carrito y pasarela de pagos integrada. Diseñada para ofrecer una experiencia de usuario fluida y rápida.',
    technologies: [
      { name: 'React', icon: SiReact },
      { name: 'TypeScript', icon: SiTypescript },
      { name: 'Tailwind CSS', icon: SiTailwindcss },
    ]
  },
  {
    id: 3,
    type: 'image',
    src: ravedates3,
    description: 'Plataforma de comercio electrónico con carrito y pasarela de pagos integrada. Diseñada para ofrecer una experiencia de usuario fluida y rápida.',
    technologies: [
      { name: 'React', icon: SiReact },
      { name: 'TypeScript', icon: SiTypescript },
      { name: 'Tailwind CSS', icon: SiTailwindcss },
    ]
  },

  // {
  //   id: 4,
  //   type: 'video',
  //   src: '/v1.mp4',
  //   thumbnail: '/a1.jpg',
  //   description: 'Presentación interactiva sobre los nuevos productos lanzados en 2024, con animaciones 3D y diseño inmersivo.',
  //   technologies: [
  //     { name: 'React', icon: SiReact },
  //     { name: 'TypeScript', icon: SiTypescript },
  //   ]
  // },
];

export const dymoMedia: MediaItem[] = [
  {
    id: 1,
    type: 'image',
    src: dymo1,
    description: 'Plataforma de comercio electrónico con carrito y pasarela de pagos integrada. Diseñada para ofrecer una experiencia de usuario fluida y rápida.',
    technologies: [
      { name: 'React', icon: SiReact },
      { name: 'TypeScript', icon: SiTypescript },
      { name: 'Tailwind CSS', icon: SiTailwindcss },
    ]
  },
  {
    id: 2,
    type: 'image',
    src: dymo2,
    description: 'Plataforma de comercio electrónico con carrito y pasarela de pagos integrada. Diseñada para ofrecer una experiencia de usuario fluida y rápida.',
    technologies: [
      { name: 'React', icon: SiReact },
      { name: 'TypeScript', icon: SiTypescript },
      { name: 'Tailwind CSS', icon: SiTailwindcss },
    ]
  },
  {
    id: 3,
    type: 'image',
    src: dymo3,
    description: 'Plataforma de comercio electrónico con carrito y pasarela de pagos integrada. Diseñada para ofrecer una experiencia de usuario fluida y rápida.',
    technologies: [
      { name: 'React', icon: SiReact },
      { name: 'TypeScript', icon: SiTypescript },
      { name: 'Tailwind CSS', icon: SiTailwindcss },
    ]
  },
];

export const freelanceMedia: MediaItem[] = [
  {
    id: 1,
    type: 'image',
    src: freelance1,
    description: 'Landing page para un evento de tecnología, con un diseño moderno, animaciones atractivas y formulario de registro.',
    technologies: [
      { name: 'Next.js', icon: SiNextdotjs },
      { name: 'Tailwind CSS', icon: SiTailwindcss },
    ]
  },
  {
    id: 2,
    type: 'image',
    src: freelance2,
    description: 'Landing page para un evento de tecnología, con un diseño moderno, animaciones atractivas y formulario de registro.',
    technologies: [
      { name: 'Next.js', icon: SiNextdotjs },
      { name: 'Tailwind CSS', icon: SiTailwindcss },
    ]
  },
  {
    id: 3,
    type: 'image',
    src: freelance3,
    description: 'Landing page para un evento de tecnología, con un diseño moderno, animaciones atractivas y formulario de registro.',
    technologies: [
      { name: 'Next.js', icon: SiNextdotjs },
      { name: 'Tailwind CSS', icon: SiTailwindcss },
    ]
  },
  {
    id: 4,
    type: 'image',
    src: freelance4,
    description: 'Landing page para un evento de tecnología, con un diseño moderno, animaciones atractivas y formulario de registro.',
    technologies: [
      { name: 'Next.js', icon: SiNextdotjs },
      { name: 'Tailwind CSS', icon: SiTailwindcss },
    ]
  },
];
