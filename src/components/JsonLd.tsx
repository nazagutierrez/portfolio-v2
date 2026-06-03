import { Helmet } from 'react-helmet-async';
import { useSEO } from '../hooks/useSEO';

type JsonLdProps = {
  lang: string;
};

const JsonLd = ({ lang }: JsonLdProps) => {
  const { baseUrl } = useSEO({ lang });

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Nazareno Gutierrez",
    "url": baseUrl,
    "image": `${baseUrl}/naza.webp`,
    "sameAs": [
      "https://linkedin.com/in/nazarenogutierrez1",
      "https://github.com/nazagutierrez"
    ],
    "jobTitle": "Frontend Developer",
    "knowsAbout": ["React", "Next.js", "TypeScript", "TailwindCSS", "GSAP", "Frontend Development"],
    "email": "nazarenojunin@gmail.com",
    "nationality": "Argentine"
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Nazareno Gutierrez Portfolio",
    "url": baseUrl,
    "description": "Portfolio de Nazareno Gutierrez, Frontend Developer SSR especializado en React y Next.js"
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(personSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
    </Helmet>
  );
};

export default JsonLd;
