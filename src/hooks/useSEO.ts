import { useMemo } from 'react';

type SEOProps = {
  lang: string;
};

export const useSEO = ({ lang }: SEOProps) => {
  return useMemo(() => {
    const isEs = lang === 'es';
    const baseUrl = 'https://nazarenogutierrez.com.ar';
    
    // Títulos y Descripciones dinámicos por idioma
    const title = isEs 
      ? 'Nazareno Gutierrez – Frontend Developer SSR'
      : 'Nazareno Gutierrez – Frontend Developer SSR';
      
    const description = isEs
      ? 'Desarrollador Frontend Semi-Senior especializado en React, Next.js y TypeScript. Más de 3 años creando interfaces modernas, animadas y performantes.'
      : 'Semi-Senior Frontend Developer specialized in React, Next.js, and TypeScript. Over 3 years building modern, animated, and performant interfaces.';

    const url = isEs ? `${baseUrl}/` : `${baseUrl}/en`;
    const canonical = url;
    
    // Imagen OG
    const ogImage = `${baseUrl}/og-image-nazareno.jpg`;

    return {
      title,
      description,
      canonical,
      url,
      ogImage,
      baseUrl
    };
  }, [lang]);
};
