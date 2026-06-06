import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-[#0F2B5B] text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-[#D4A017] rounded-lg flex items-center justify-center font-bold text-[#0F2B5B] text-xs">W</div>
              <span className="font-bold" style={{ fontFamily: 'DM Sans, sans-serif' }}>Wages to Wealth</span>
            </div>
            <p className="text-white/60 text-xs leading-relaxed">
              Financial literacy education for Australian employees.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3">Platform</h4>
            <ul className="space-y-1.5 text-white/60 text-sm">
              <li><Link to="/modules" className="hover:text-white transition-colors">Modules</Link></li>
              <li><Link to="/calculators" className="hover:text-white transition-colors">Calculators</Link></li>
              <li><Link to="/get-help" className="hover:text-white transition-colors">Get Help</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3">Company</h4>
            <ul className="space-y-1.5 text-white/60 text-sm">
              <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><a href="mailto:hello@wagetowealth.com.au" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3">Legal</h4>
            <ul className="space-y-1.5 text-white/60 text-sm">
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Use</Link></li>
              <li><a href="https://moneysmart.gov.au" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">MoneySmart ↗</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6">
          <p className="text-white/40 text-xs leading-relaxed max-w-4xl">
            <strong className="text-white/60">Disclaimer:</strong> Wages to Wealth provides general financial information and education only. It is not a financial adviser and does not hold an Australian Financial Services Licence. Content does not constitute personal financial advice and does not consider your individual objectives, financial situation, or needs. Always seek advice from a licensed financial adviser before making financial decisions. Content is sourced from publicly available materials including moneysmart.gov.au.
          </p>
          <p className="text-white/30 text-xs mt-3">© 2026 Wages to Wealth. Sierra Bravo Capital Pty Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
