import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { supabase } from '../lib/supabase'

const RESOURCES = [
  { name: 'National Debt Helpline', phone: '1800 007 007', desc: 'Free, confidential financial counselling for Australians in financial difficulty.', url: 'https://ndh.org.au', hours: 'Mon–Fri 9:30am–4:30pm' },
  { name: 'MoneySmart Hardship Guide', phone: null, desc: 'ASIC\'s comprehensive guide to managing financial hardship.', url: 'https://moneysmart.gov.au/managing-debt/financial-hardship', hours: 'Online 24/7' },
  { name: 'Centrelink Financial Information Service', phone: '132 300', desc: 'Free financial information about Centrelink payments and services.', url: 'https://www.servicesaustralia.gov.au', hours: 'Mon–Fri 8am–5pm' },
  { name: 'AFCA — Financial Complaints', phone: '1800 931 678', desc: 'Australian Financial Complaints Authority — free dispute resolution for financial product complaints.', url: 'https://afca.org.au', hours: 'Mon–Fri 9am–5pm' },
  { name: 'Lifeline', phone: '13 11 14', desc: 'If financial stress is affecting your mental health, Lifeline is available 24/7.', url: 'https://lifeline.org.au', hours: '24/7' },
]

const SCRIPT_STEPS = [
  '"Hi, I\'m calling to speak with someone from your hardship team. I\'m experiencing financial difficulty and I\'d like to discuss my options."',
  '"My account/loan number is [XXXXXXXX]. I\'ve been a customer since [year]."',
  '"I\'m currently experiencing [job loss / medical issue / reduced income / other]. I\'m finding it difficult to meet my current repayments."',
  '"I\'d like to understand what hardship provisions are available to me under the National Credit Code."',
  '"Can we look at [a repayment holiday / reduced repayments / interest-only period / extending my loan term] as options?"',
  '"Can you confirm that reaching out about hardship won\'t affect my credit file?"',
]

export default function GetHelp() {
  const { profile } = useAuth()
  const [referred, setReferred] = useState(false)

  const logReferral = async () => {
    if (!profile?.id || referred) return
    await supabase.from('hardship_referrals').insert({
      employee_id: profile.id,
      referral_type: 'hardship_page_accessed',
    })
    setReferred(true)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8" onClick={logReferral}>
      <div className="bg-red-600 text-white rounded-2xl p-6 mb-6">
        <h1 className="text-2xl font-bold mb-2" style={{ fontFamily: 'DM Sans' }}>🆘 Get Financial Help</h1>
        <p className="text-white/80">Financial hardship affects many Australians. Help is available — free, confidential, and judgment-free.</p>
      </div>

      {/* What is hardship */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
        <h2 className="font-bold text-[#0F2B5B] text-xl mb-3" style={{ fontFamily: 'DM Sans' }}>What is Financial Hardship?</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-3">
          Financial hardship means you're temporarily unable to meet your financial obligations — like loan repayments, utility bills, or rent — due to circumstances beyond your control. This might include job loss, illness, relationship breakdown, or unexpected expenses.
        </p>
        <p className="text-gray-600 text-sm leading-relaxed">
          <strong>You have rights.</strong> Under the National Credit Code (NCC), if you have a credit contract with an Australian credit provider, you can apply for a hardship variation. Lenders must consider your request and respond within 21 days.
        </p>
      </div>

      {/* Steps */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
        <h2 className="font-bold text-[#0F2B5B] text-xl mb-4" style={{ fontFamily: 'DM Sans' }}>Steps to Take Right Now</h2>
        <div className="space-y-3">
          {[
            { n: '1', text: 'Don\'t ignore the problem — contact your lender or creditor as early as possible. Early contact gives you more options.' },
            { n: '2', text: 'Ask for their hardship team — say "I\'d like to speak to someone about financial hardship." You don\'t need to explain everything upfront.' },
            { n: '3', text: 'Request a hardship variation under the National Credit Code. Options may include a repayment holiday, reduced repayments, or loan restructure.' },
            { n: '4', text: 'Contact a free financial counsellor at the National Debt Helpline: 1800 007 007. They can help you navigate the process and negotiate on your behalf.' },
            { n: '5', text: 'If you\'re not happy with the response, escalate to AFCA — the Australian Financial Complaints Authority. It\'s free.' },
          ].map(s => (
            <div key={s.n} className="flex gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="w-8 h-8 bg-red-600 text-white rounded-full flex-shrink-0 flex items-center justify-center font-bold text-sm">{s.n}</div>
              <p className="text-sm text-gray-600 leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bank script */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
        <h2 className="font-bold text-[#0F2B5B] text-xl mb-4" style={{ fontFamily: 'DM Sans' }}>What to Say to Your Lender</h2>
        <div className="space-y-3">
          {SCRIPT_STEPS.map((step, i) => (
            <div key={i} className="bg-[#0F2B5B]/5 border-l-4 border-[#0F2B5B] rounded-r-xl p-4 font-mono text-sm text-gray-700">
              {step}
            </div>
          ))}
        </div>
        <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-700">
          <strong>Your rights:</strong> Requesting hardship assistance does not automatically result in a negative credit listing. Lenders are obligated to assess your request fairly.
        </div>
      </div>

      {/* Resources */}
      <h2 className="font-bold text-[#0F2B5B] text-xl mb-4" style={{ fontFamily: 'DM Sans' }}>Free Resources & Contacts</h2>
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        {RESOURCES.map(r => (
          <div key={r.name} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-bold text-[#0F2B5B] mb-1" style={{ fontFamily: 'DM Sans' }}>{r.name}</h3>
            <p className="text-gray-500 text-xs mb-2">{r.desc}</p>
            {r.phone && (
              <a href={`tel:${r.phone.replace(/\s/g, '')}`} className="text-lg font-bold text-red-600 hover:underline block mb-1">
                📞 {r.phone}
              </a>
            )}
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">{r.hours}</span>
              <a href={r.url} target="_blank" rel="noopener noreferrer" className="text-xs text-[#0F2B5B] font-semibold hover:underline">
                Visit website ↗
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-xs text-blue-700">
        <strong>Privacy note:</strong> Accessing this page may be recorded anonymously to help your employer understand the aggregate level of financial stress in their workforce. Your identity is never shared with your employer.
      </div>
    </div>
  )
}
