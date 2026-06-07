import { Link } from 'react-router-dom'

export default function CheckoutSuccess() {
  return (
    <div className="min-h-screen bg-[#F9F8F6] flex items-center justify-center px-4">
      <div className="w-full max-w-lg text-center">
        <Link to="/" className="inline-flex items-center gap-2 justify-center mb-10">
          <div className="w-9 h-9 bg-[#D4A017] rounded-xl flex items-center justify-center font-bold text-[#0F2B5B]">W</div>
          <span className="font-bold text-xl text-[#0F2B5B]" style={{ fontFamily: 'DM Sans' }}>Wages to Wealth</span>
        </Link>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 mb-6">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">🎉</span>
          </div>
          <h1 className="text-2xl font-bold text-[#0F2B5B] mb-3" style={{ fontFamily: 'DM Sans' }}>
            You're all set!
          </h1>
          <p className="text-gray-500 text-sm mb-1">
            Payment received. Your Wages to Wealth employer account is now active.
          </p>
          <p className="text-gray-400 text-xs mb-8">A receipt has been sent to your email by Stripe.</p>

          <div className="bg-[#0F2B5B]/5 rounded-xl p-5 text-left mb-8 space-y-3">
            <h2 className="font-bold text-[#0F2B5B] text-sm" style={{ fontFamily: 'DM Sans' }}>Your next steps</h2>
            {[
              { icon: '1️⃣', text: 'Sign in to your employer dashboard' },
              { icon: '2️⃣', text: 'Copy your unique employee invite link' },
              { icon: '3️⃣', text: 'Share it with your team via email, Slack or your intranet' },
              { icon: '4️⃣', text: "Watch your team's Financial Literacy Scores grow" },
            ].map(s => (
              <div key={s.text} className="flex items-center gap-3 text-sm text-gray-600">
                <span className="text-base">{s.icon}</span>
                <span>{s.text}</span>
              </div>
            ))}
          </div>

          <Link
            to="/login?type=employer"
            className="block w-full bg-[#0F2B5B] text-white py-3.5 rounded-xl font-bold text-sm hover:bg-[#1a3d7c] transition-colors">
            Sign In to Your Dashboard →
          </Link>
        </div>

        <p className="text-xs text-gray-400">
          Questions? Email us at{' '}
          <a href="mailto:hello@wagestowealth.com.au" className="text-[#0F2B5B] hover:underline">
            hello@wagestowealth.com.au
          </a>
        </p>
      </div>
    </div>
  )
}
