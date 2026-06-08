import { Helmet } from 'react-helmet-async'

const BASE_URL = 'https://www.wagestowealth.com.au'
const DEFAULT_IMAGE = `${BASE_URL}/og-image.png`

export default function SEO({
  title,
  description,
  path = '',
  noIndex = false,
  image = DEFAULT_IMAGE,
  type = 'website',
  jsonLd = null,
}) {
  const fullTitle = title
    ? `${title} — Wages to Wealth`
    : 'Wages to Wealth — Financial Literacy Platform for Australian Employers'
  const url = `${BASE_URL}${path}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noIndex
        ? <meta name="robots" content="noindex, nofollow" />
        : <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />}
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Wages to Wealth" />
      <meta property="og:locale" content="en_AU" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Page-specific structured data */}
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  )
}
