import { useSearchParams, Link } from 'react-router-dom'
import SEO from '../components/ui/SEO'

export default function Contact() {
  const [params] = useSearchParams()
  const type = params.get('type')
  const isNfp = type === 'nfp'

  return (
    <div className="min-h-screen bg-[#F9F8F6] flex items-center justify-center px-4 py-16">
      <SEO title="Contact Us" path="/contact" description="Contact Wages to Wealth for NFP discounts, government pricing, or a platform demo." />
      <div className="w-full max-w-lg text-center">
        <Link to="/" className="inline-flex items-center gap-2 justify-center mb-10">
          <div className="w-9 h-9 bg-[#D4A017] rounded-xl flex items-center justify-center font-bold text-[#0F2B5B]">W</div>
          <span className="font-bold text-xl text-[#0F2B5B]" style={{ fontFamily: 'DM Sans' }}>Wages to Wealth</span>
        </Link>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10">
          <div className="text-4xl mb-4">{isNfp ? '🤝' : '👋'}</div>
          <h1 className="text-2xl font-bold text-[#0F2B5B] mb-3" style={{ fontFamily: 'DM Sans' }}>
            {isNfp ? 'NFP & Government Pricing' : 'Get in touch'}
          </h1>
          {isNfp ? (
            <p className="text-gray-500 text-sm mb-6">
              We offer a <strong>20% discount</strong> for registered not-for-profits and tailored pricing for government agencies — including ASIC compliance documentation and government tender response support.
            </p>
          ) : (
            <p className="text-gray-500 text-sm mb-6">
              Our team is happy to answer questions, arrange a demo, or discuss pricing for your organisation.
            </p>
          )}

          <a
            href={`mailto:hello@wagestowealth.com.au?subject=${isNfp ? 'NFP%20%2F%20Government%20Pricing%20Enquiry' : 'Enquiry'}`}
            className="block w-full bg-[#0F2B5B] text-white py-3.5 rounded-xl font-bold text-sm hover:bg-[#1a3d7c] transition-colors mb-3"
          >
            Email us at hello@wagestowealth.com.au →
          </a>
          <Link to="/demo" className="block w-full border-2 border-[#0F2B5B] text-[#0F2B5B] py-3.5 rounded-xl font-bold text-sm hover:bg-[#0F2B5B] hover:text-white transition-colors">
            Or book a demo first
          </Link>
        </div>
      </div>
    </div>
  )
}
