import { Helmet } from 'react-helmet-async'

const BASE_URL = 'https://wagestowealth.netlify.app'

export default function SEO({ title, description, path = '', noIndex = false }) {
  const fullTitle = title
    ? `${title} — Wages to Wealth`
    : 'Wages to Wealth — Financial Literacy Platform for Australian Employers'
  const url = `${BASE_URL}${path}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      <link rel="canonical" href={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  )
}
