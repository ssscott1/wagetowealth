export default function Privacy() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-[#0F2B5B] mb-6" style={{ fontFamily: 'DM Sans' }}>Privacy Policy</h1>
      <p className="text-sm text-gray-400 mb-6">Last updated: June 2025</p>
      <div className="prose prose-sm prose-slate max-w-none space-y-4 text-gray-600">
        <p>Sierra Bravo Capital Pty Ltd ("we", "us", "our") operates the Wages to Wealth platform. This Privacy Policy explains how we collect, use, and protect your personal information in accordance with the Privacy Act 1988 (Cth) and the Australian Privacy Principles.</p>
        <h2 className="text-lg font-bold text-[#0F2B5B] mt-6">Information We Collect</h2>
        <p>We collect email addresses, quiz responses, calculator usage data (not stored with personally identifiable information), and financial literacy scores. We do not collect sensitive financial information such as account numbers, bank details, or income figures.</p>
        <h2 className="text-lg font-bold text-[#0F2B5B] mt-6">How We Use Your Information</h2>
        <p>Employee data is used to track learning progress, calculate literacy scores, and display quiz history to the individual employee. Aggregate, anonymised data is shared with the employing organisation for engagement reporting only. Individual financial data is never shared with employers.</p>
        <h2 className="text-lg font-bold text-[#0F2B5B] mt-6">Data Security</h2>
        <p>All data is stored in Supabase (hosted in Australia) with row-level security enforced at the database level. All connections are encrypted via TLS. We do not sell your data to third parties.</p>
        <h2 className="text-lg font-bold text-[#0F2B5B] mt-6">Your Rights</h2>
        <p>You have the right to access, correct, or request deletion of your personal information. Contact us at privacy@wagetowealth.com.au.</p>
        <h2 className="text-lg font-bold text-[#0F2B5B] mt-6">Contact</h2>
        <p>For privacy inquiries: privacy@wagetowealth.com.au</p>
      </div>
    </div>
  )
}
