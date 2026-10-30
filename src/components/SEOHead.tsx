import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  noIndex?: boolean;
  schemaJson?: string;
}

export function SEOHead({
  title,
  description,
  canonical,
  ogImage,
  noIndex = false,
  schemaJson,
}: SEOHeadProps) {
  const defaultOgImage = "https://marson.it/media/6d0a9c80-241e-4b62-b246-b9679893db2e.png";
  const siteUrl = "https://marson.it";
  const rawImage = ogImage || defaultOgImage;
  const image = rawImage.startsWith("http") ? rawImage : `${siteUrl}${rawImage}`;
  const absoluteCanonical = canonical ? (canonical.startsWith('http') ? canonical : `${siteUrl}${canonical}`) : undefined;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={image} />
      {absoluteCanonical && <meta property="og:url" content={absoluteCanonical} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {absoluteCanonical && <link rel="canonical" href={absoluteCanonical} />}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      
      {schemaJson && (
        <script type="application/ld+json">
          {schemaJson}
        </script>
      )}
    </Helmet>
  );
}
