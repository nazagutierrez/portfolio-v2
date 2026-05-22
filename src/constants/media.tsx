import { SiReact, SiTypescript, SiTailwindcss, SiNextdotjs, SiVite } from 'react-icons/si';

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
    src: '/ravedates-1.png',
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
    src: '/ravedates-2.png',
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
    src: '/ravedates-3.png',
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
    src: '/dymo-1.png',
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
    src: '/dymo-2.png',
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
    src: '/dymo-3.png',
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
    src: '/freelance-1.png',
    description: 'Landing page para un evento de tecnología, con un diseño moderno, animaciones atractivas y formulario de registro.',
    technologies: [
      { name: 'Next.js', icon: SiNextdotjs },
      { name: 'Tailwind CSS', icon: SiTailwindcss },
    ]
  },
  {
    id: 2,
    type: 'image',
    src: '/freelance-2.png',
    description: 'Landing page para un evento de tecnología, con un diseño moderno, animaciones atractivas y formulario de registro.',
    technologies: [
      { name: 'Next.js', icon: SiNextdotjs },
      { name: 'Tailwind CSS', icon: SiTailwindcss },
    ]
  },
  {
    id: 3,
    type: 'image',
    src: '/freelance-3.png',
    description: 'Landing page para un evento de tecnología, con un diseño moderno, animaciones atractivas y formulario de registro.',
    technologies: [
      { name: 'Next.js', icon: SiNextdotjs },
      { name: 'Tailwind CSS', icon: SiTailwindcss },
    ]
  },
  {
    id: 4,
    type: 'image',
    src: '/freelance-4.png',
    description: 'Landing page para un evento de tecnología, con un diseño moderno, animaciones atractivas y formulario de registro.',
    technologies: [
      { name: 'Next.js', icon: SiNextdotjs },
      { name: 'Tailwind CSS', icon: SiTailwindcss },
    ]
  },
];
