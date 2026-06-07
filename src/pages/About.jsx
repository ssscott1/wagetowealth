import { Link } from 'react-router-dom'
import SEO from '../components/ui/SEO'

export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <SEO
        title="About"
        path="/about"
        description="Wages to Wealth is built by Australians for Australian workplaces. We provide ASIC-compliant financial literacy education as an employee benefit — helping workers go from wages to wealth."
      />
      <h1 className="text-4xl font-bold text-[#0F2B5B] mb-4" style={{ fontFamily: 'DM Sans' }}>About Wages to Wealth</h1>
      <p className="text-xl text-gray-500 mb-8">Built by Australians, for Australian workplaces.</p>
      <div className="prose prose-slate max-w-none space-y-5 text-gray-600">
        <p>Wages to Wealth is a financial literacy platform built by Sierra Bravo Capital to help Australian employers provide genuine, ASIC-compliant financial education to their workforce.</p>
        <p>Financial stress is one of the biggest productivity drains in modern workplaces. Yet most employer wellness programs overlook it entirely. We believe every employee deserves access to clear, trustworthy financial education — not product spruiking, not hidden commission referrals, just honest information.</p>
        <p>Our platform is built from the ground up to comply with ASIC's requirements for general financial information. We don't hold an AFSL, we don't give personal advice, and we never recommend specific financial products. Our content is sourced from publicly available educational resources including <a href="https://moneysmart.gov.au" target="_blank" rel="noopener noreferrer" className="text-[#0F2B5B] underline">MoneySmart.gov.au</a>.</p>
        <p>Every employee's financial data is private. Employers can see aggregated, anonymous engagement statistics — never individual financial information.</p>
      </div>
      <div className="mt-10">
        <Link to="/register/employer" className="bg-[#0F2B5B] text-white px-8 py-3.5 rounded-xl font-bold inline-block hover:bg-[#1a3d7c] transition-colors">
          Get Started Free →
        </Link>
      </div>
    </div>
  )
}
