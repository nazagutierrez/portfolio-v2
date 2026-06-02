import { Helmet } from 'react-helmet-async';
import { useSEO } from '../hooks/useSEO';

type SEOHeadProps = {
  lang: string;
};

const SEOHead = ({ lang }: SEOHeadProps) => {
  const { title, description, canonical, url, ogImage, baseUrl } = useSEO({ lang });

  return (
    <Helmet>
      {/* Basic HTML Meta Tags */}
      <html lang={lang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      {/* Hreflang tags (for i18n SEO) */}
      <link rel="alternate" hreflang="es" href={`${baseUrl}/`} />
      <link rel="alternate" hreflang="en" href={`${baseUrl}/en`} />
      <link rel="alternate" hreflang="x-default" href={`${baseUrl}/`} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content={lang === 'es' ? 'es_AR' : 'en_US'} />
      <meta property="og:site_name" content="Nazareno Gutierrez Portfolio" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
};

export default SEOHead;
