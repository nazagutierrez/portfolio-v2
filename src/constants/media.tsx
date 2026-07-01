import { SiReact, SiTypescript, SiTailwindcss, SiNextdotjs } from '@/components/BrandLogos';

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
    description: '+20 pantallas desarrolladas. Desde flujos de compra hasta paneles de gestión y configuración de eventos.',
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
    description: 'Aplicación construida con Next.js. Participando en el desarrollo de funcionalidades complejas y optimización de la experiencia de usuario.',
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
    description: 'Trabajo en equipo multidisciplinario. Colaborando con diseñadores, backend developers y stakeholders durante todo el ciclo de desarrollo.',
    technologies: [
      { name: 'React', icon: SiReact },
      { name: 'TypeScript', icon: SiTypescript },
      { name: 'Tailwind CSS', icon: SiTailwindcss },
    ]
  },

  {
    id: 4,
    type: 'video',
    src: '/videos/video-ravedates.mp4',
    thumbnail: ravedates1,
    description: "Video demostrativo del funcionamiento de la plataforma.",
    technologies: [
      { name: 'React', icon: SiReact },
      { name: 'TypeScript', icon: SiTypescript },
    ]
  },
];

export const dymoMedia: MediaItem[] = [
  {
    id: 1,
    type: 'image',
    src: dymo1,
    description: 'Diseñé y desarrollé desde cero un centro de ayuda web para centralizar documentación, recursos y soporte para los usuarios.',
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
    description: 'Implementé interfaces modernas, responsive y optimizadas para mejorar la navegación y accesibilidad.',
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
    description: 'Participé en el desarrollo y evolución de herramientas digitales, trabajando junto a equipos de producto y comunicación.',
    technologies: [
      { name: 'React', icon: SiReact },
      { name: 'TypeScript', icon: SiTypescript },
      { name: 'Tailwind CSS', icon: SiTailwindcss },
    ]
  },
  {
    id: 4,
    type: 'video',
    src: '/videos/video-dymo.mp4',
    thumbnail: dymo1,
    description: "Video demostrativo del funcionamiento de la plataforma.",
    technologies: [
      { name: 'React', icon: SiReact },
      { name: 'TypeScript', icon: SiTypescript },
    ]
  },
];

export const freelanceMedia: MediaItem[] = [
  {
    id: 1,
    type: 'video',
    thumbnail: freelance1,
    src: '/videos/video-pisofuerte.mp4',
    description: 'Desarrollo de una web corporativa enfocada en transmitir confianza, presentar servicios y facilitar el contacto con potenciales clientes.',
    technologies: [
      { name: 'Next.js', icon: SiNextdotjs },
      { name: 'Tailwind CSS', icon: SiTailwindcss },
    ]
  },
  {
    id: 2,
    type: 'video',
    src: "/videos/video-nordicaps.mp4",
    thumbnail: freelance2,
    description: 'Implementación de una experiencia moderna y responsive, priorizando rendimiento, diseño y presencia digital de la marca.',
    technologies: [
      { name: 'Next.js', icon: SiNextdotjs },
      { name: 'Tailwind CSS', icon: SiTailwindcss },
    ]
  },
  {
    id: 3,
    type: 'image',
    src: freelance3,
    description: 'Diseño y desarrollo de una web orientada a mostrar servicios, fortalecer la identidad de marca y facilitar la captación de clientes.',
    technologies: [
      { name: 'Next.js', icon: SiNextdotjs },
      { name: 'Tailwind CSS', icon: SiTailwindcss },
    ]
  },
  {
    id: 4,
    type: 'image',
    src: freelance4,
    description: 'Desarrollo de una interfaz atractiva y optimizada para comunicar el producto de forma clara y maximizar la conversión de usuarios.',
    technologies: [
      { name: 'Next.js', icon: SiNextdotjs },
      { name: 'Tailwind CSS', icon: SiTailwindcss },
    ]
  },
];
