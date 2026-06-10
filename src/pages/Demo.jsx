import { useState } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/ui/SEO'

// ─── Demo data ────────────────────────────────────────────────────────────────

const QUIZ = [
  {
    q: 'You earn $85,000/year. Roughly how much income tax will you pay?',
    options: ['About $5,000', 'About $19,200', 'About $31,500', 'About $42,500'],
    correct: 1,
    explain: 'On $85,000, you\'d pay approximately $19,200 in income tax under Australian tax brackets — about 22.6% effective rate. Understanding this helps you plan salary packaging and super contributions strategically.',
  },
  {
    q: 'What is "salary sacrificing" into super?',
    options: [
      'Giving up part of your salary as a donation',
      'Paying extra into super from pre-tax income to reduce your taxable income',
      'A penalty for leaving super early',
      'A government bonus for low-income earners',
    ],
    correct: 1,
    explain: 'Salary sacrificing lets you redirect pre-tax dollars into super, reducing what the ATO taxes. A $10,000 salary sacrifice could save you ~$3,450 in tax if you\'re in the 34.5% bracket.',
  },
  {
    q: 'Your employer\'s Superannuation Guarantee (SG) rate in 2025 is:',
    options: ['9.0%', '10.5%', '11.0%', '11.5%'],
    correct: 3,
    explain: 'The SG rate rose to 11.5% from 1 July 2024, and will reach 12% in 2025. Checking your payslip confirms your employer is paying the correct rate — many employees never check.',
  },
]

// The real 18 modules — shown in full so employers see the genuine breadth
const MODULES = [
  { icon: '💰', title: 'Budgeting & Saving', cat: 'Foundations' },
  { icon: '🏦', title: 'Banking Basics', cat: 'Foundations' },
  { icon: '💳', title: 'Debt & Credit', cat: 'Foundations' },
  { icon: '🏠', title: 'Buying a House', cat: 'Property' },
  { icon: '📋', title: 'Getting a Mortgage', cat: 'Property' },
  { icon: '🚗', title: 'Buying a Car', cat: 'Borrowing' },
  { icon: '📑', title: 'Personal Loans', cat: 'Borrowing' },
  { icon: '🏘️', title: 'Buying an Investment Property', cat: 'Investing' },
  { icon: '📈', title: 'Buying Shares & ETFs', cat: 'Investing' },
  { icon: '🧓', title: 'Superannuation', cat: 'Retirement' },
  { icon: '🧾', title: 'Understanding Your Pay Slip', cat: 'Workplace' },
  { icon: '📦', title: 'Salary Packaging & Salary Sacrifice', cat: 'Workplace' },
  { icon: '💼', title: 'Super: Voluntary Contributions', cat: 'Workplace' },
  { icon: '🚘', title: 'Novated Leasing Explained', cat: 'Workplace' },
  { icon: '📊', title: 'Income Tax & Your Tax Return', cat: 'Workplace' },
  { icon: '⚖️', title: 'Knowing Your Workplace Entitlements', cat: 'Workplace' },
  { icon: '📜', title: 'Employee Share Schemes (ESS)', cat: 'Workplace' },
  { icon: '🔄', title: 'Managing Money Through Life Events', cat: 'Workplace' },
]

// The real 17 calculators
const CALCULATORS = [
  '💰 Budget Planner', '🏠 Mortgage Repayment', '💪 Borrowing Power', '🎯 Savings Goal',
  '📈 Compound Growth', '💳 Debt Payoff', '🏘️ Investment Property', '🚗 Car Loan',
  '📉 Mortgage Rate Saving', '🧓 Super Projection', '🧾 PAYG Take-Home', '📦 Salary Sacrifice Saving',
  '💼 Super Sacrifice', '🚘 Novated vs Car Loan', '⚖️ Redundancy Pay', '🏡 FHSS Scheme', '📊 ESS Tax Estimate',
]

const BUDGETS = [
  { label: 'Income (monthly after tax)', key: 'income', type: 'income' },
  { label: 'Rent / Mortgage', key: 'rent', type: 'expense' },
  { label: 'Groceries & Food', key: 'food', type: 'expense' },
  { label: 'Transport', key: 'transport', type: 'expense' },
  { label: 'Subscriptions & Entertainment', key: 'entertainment', type: 'expense' },
  { label: 'Other expenses', key: 'other', type: 'expense' },
]

// Sam starts mid-journey so the dashboard looks lived-in
const BASE_SCORE = 38
const BASE_COMPLETED = 4

// ─── Shared bits ──────────────────────────────────────────────────────────────

function SectionHeading({ n, title, sub }) {
  return (
    <div className="mt-12 mb-5">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-7 h-7 bg-[#D4A017] rounded-lg flex items-center justify-center text-[#0F2B5B] font-black text-sm">{n}</div>
        <h2 className="text-xl font-bold text-[#0F2B5B]" style={{ fontFamily: 'DM Sans' }}>{title}</h2>
      </div>
      <p className="text-gray-500 text-sm ml-9">{sub}</p>
    </div>
  )
}

function Ring({ value, max, size = 110, stroke = 10, color = '#D4A017', children }) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const pct = max > 0 ? Math.min(1, value / max) : 0
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#1e3a6e" strokeWidth={stroke} />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - pct)}
          style={{ transition: 'stroke-dashoffset 1s ease' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">{children}</div>
    </div>
  )
}

function EmployerCTA({ label = 'Give your team this experience' }) {
  return (
    <div className="bg-gradient-to-r from-[#0F2B5B] to-[#1a3d7c] rounded-2xl p-6 text-center text-white my-10">
      <p className="text-sm text-white/70 mb-1">Seen enough?</p>
      <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'DM Sans' }}>{label}</h3>
      <Link to="/register/employer"
        className="bg-[#D4A017] text-[#0F2B5B] px-8 py-3 rounded-xl font-bold text-sm hover:bg-yellow-400 transition-colors inline-block">
        Set Up Your Team Today →
      </Link>
      <p className="text-xs text-white/40 mt-3">Plans from $149/month incl. GST · Setup in under 5 minutes.</p>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Demo() {
  const [quizState, setQuizState] = useState({ idx: 0, selected: null, revealed: false, score: 0, done: false })
  const [budgetVals, setBudgetVals] = useState({ income: 6000, rent: 1800, food: 600, transport: 300, entertainment: 200, other: 400 })
  const [salary, setSalary] = useState(90000)
  const [sacrifice, setSacrifice] = useState(500)
  const [previewOpen, setPreviewOpen] = useState(false)

  const q = QUIZ[quizState.idx]

  // ── The living dashboard: quiz completion feeds straight into Sam's stats ──
  const quizBoost = quizState.done ? quizState.score * 4 : 0
  const literacyScore = BASE_SCORE + quizBoost
  const completedCount = quizState.done && quizState.score >= 2 ? BASE_COMPLETED + 1 : BASE_COMPLETED
  const perfectQuiz = quizState.done && quizState.score === QUIZ.length

  const ACHIEVEMENTS = [
    { icon: '🌱', label: 'First Steps', earned: true },
    { icon: '🔥', label: 'On a Roll', earned: completedCount >= 5 },
    { icon: '⭐', label: 'Perfect Score', earned: perfectQuiz },
    { icon: '🎓', label: 'Halfway Hero', earned: false },
    { icon: '🏆', label: 'Master', earned: false },
  ]

  const handleAnswer = (i) => {
    if (quizState.revealed) return
    setQuizState(s => ({ ...s, selected: i, revealed: true }))
  }

  const handleNext = () => {
    const correct = quizState.selected === q.correct
    const newScore = quizState.score + (correct ? 1 : 0)
    if (quizState.idx < QUIZ.length - 1) {
      setQuizState({ idx: quizState.idx + 1, selected: null, revealed: false, score: newScore, done: false })
    } else {
      setQuizState(s => ({ ...s, done: true, score: newScore }))
    }
  }

  // Budget calc
  const totalExpenses = BUDGETS.filter(b => b.type === 'expense').reduce((sum, b) => sum + (Number(budgetVals[b.key]) || 0), 0)
  const surplus = (Number(budgetVals.income) || 0) - totalExpenses
  const savingsRate = budgetVals.income > 0 ? Math.round((surplus / budgetVals.income) * 100) : 0

  // Salary sacrifice estimate (2024–25 resident rates + 2% Medicare, less 15% contributions tax)
  const marginalRate =
    salary <= 18200 ? 0 :
    salary <= 45000 ? 0.18 :
    salary <= 135000 ? 0.32 :
    salary <= 190000 ? 0.39 : 0.47
  const annualSacrifice = sacrifice * 12
  const annualTaxSaving = Math.max(0, Math.round(annualSacrifice * (marginalRate - 0.15)))

  const workplaceModules = MODULES.filter(m => m.cat === 'Workplace')
  const generalModules = MODULES.filter(m => m.cat !== 'Workplace')

  return (
    <div className="bg-[#F9F8F6] min-h-screen">
      <SEO title="Employee Demo" path="/demo" description="Take the interactive tour of Wages to Wealth — the employee dashboard, 18 modules, 17 live calculators, gamified quizzes and the Financial Literacy Score, exactly as your team will experience them." />

      {/* Demo banner */}
      <div className="bg-[#D4A017] text-[#0F2B5B] px-4 py-2.5 text-center text-sm font-semibold">
        👀 You're viewing a live demo of the employee experience —{' '}
        <Link to="/register/employer" className="underline font-bold hover:no-underline">
          set this up for your team →
        </Link>
      </div>

      {/* Hero */}
      <div className="bg-[#0F2B5B] text-white py-14 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block bg-[#D4A017]/20 text-[#D4A017] text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">Interactive Employee Demo</div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'DM Sans' }}>
            Spend two minutes as "Sam" —<br className="hidden sm:block" /> one of your employees
          </h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto mb-6">
            This isn't a video or screenshots. Everything below is live — take the quiz and watch Sam's Financial Literacy Score grow in real time.
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-xs font-semibold">
            {['📚 18 modules', '🧮 17 live calculators', '🎮 Gamified quizzes', '📊 Literacy Score', '🔒 Private by design'].map(chip => (
              <span key={chip} className="bg-white/10 border border-white/15 px-3 py-1.5 rounded-full">{chip}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 pb-12">

        {/* ── 1. The living dashboard ── */}
        <SectionHeading n="1" title="Sam's Dashboard — try to make it move"
          sub="Every employee gets a personal dashboard. This one is wired to the quiz in section 3: finish it and watch the score, ring and achievements update live." />

        <div className="bg-[#0F2B5B] rounded-2xl p-6 text-white shadow-lg">
          {/* Welcome bar */}
          <div className="mb-6">
            <h3 className="text-xl font-bold" style={{ fontFamily: 'DM Sans' }}>Welcome back, Sam 👋</h3>
            <p className="text-white/60 text-sm">
              {quizState.done
                ? `Nice work — your dashboard just updated. You've completed ${completedCount} of 18 modules.`
                : `You've completed ${completedCount} of 18 modules. Keep it up!`}
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 mb-5">
            {/* Literacy score */}
            <div className="bg-white/10 rounded-xl p-4 flex flex-col items-center">
              <p className="text-[10px] uppercase tracking-wider text-white/50 font-bold mb-3">Financial Literacy Score</p>
              <Ring value={literacyScore} max={100} color="#D4A017">
                <span className="text-3xl font-black text-[#D4A017]" style={{ fontFamily: 'DM Sans' }}>{literacyScore}</span>
                <span className="text-[10px] text-white/40">/100</span>
              </Ring>
              {quizState.done && quizBoost > 0 && (
                <span className="mt-2 text-[11px] bg-green-400/20 text-green-300 font-bold px-2 py-0.5 rounded-full">▲ +{quizBoost} from your quiz!</span>
              )}
            </div>

            {/* Modules ring */}
            <div className="bg-white/10 rounded-xl p-4 flex flex-col items-center">
              <p className="text-[10px] uppercase tracking-wider text-white/50 font-bold mb-3">Modules Completed</p>
              <Ring value={completedCount} max={18} color="#22c55e">
                <span className="text-3xl font-black text-white" style={{ fontFamily: 'DM Sans' }}>{completedCount}</span>
                <span className="text-[10px] text-white/40">of 18</span>
              </Ring>
              {quizState.done && completedCount > BASE_COMPLETED && (
                <span className="mt-2 text-[11px] bg-green-400/20 text-green-300 font-bold px-2 py-0.5 rounded-full">▲ Pay Slip module passed!</span>
              )}
            </div>

            {/* Up next */}
            <div className="bg-white/10 rounded-xl p-4 flex flex-col">
              <p className="text-[10px] uppercase tracking-wider text-white/50 font-bold mb-2">Up Next</p>
              <div className="text-3xl mb-1">📦</div>
              <p className="text-[10px] text-[#D4A017] font-bold uppercase tracking-wide">Workplace</p>
              <p className="font-bold text-sm leading-tight mb-2" style={{ fontFamily: 'DM Sans' }}>Salary Packaging & Salary Sacrifice</p>
              <span className="mt-auto bg-[#D4A017] text-[#0F2B5B] text-xs font-bold px-3 py-2 rounded-lg text-center">Start Module →</span>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white/10 rounded-xl p-4">
            <p className="text-[10px] uppercase tracking-wider text-white/50 font-bold mb-3">Achievements · {ACHIEVEMENTS.filter(a => a.earned).length} of {ACHIEVEMENTS.length} unlocked</p>
            <div className="grid grid-cols-5 gap-2">
              {ACHIEVEMENTS.map(a => (
                <div key={a.label} className={`rounded-lg p-2 text-center transition-all duration-500 ${a.earned ? 'bg-[#D4A017]/20 border border-[#D4A017]/50' : 'bg-white/5 border border-transparent opacity-40'}`}>
                  <div className={`text-xl ${a.earned ? '' : 'grayscale'}`}>{a.icon}</div>
                  <div className="text-[9px] font-semibold text-white/70 leading-tight mt-1">{a.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {!quizState.done && (
          <p className="text-center text-xs text-gray-400 mt-3">
            👇 Keep scrolling — the quiz in section 3 makes this dashboard come alive.
          </p>
        )}

        {/* ── 2. Module library ── */}
        <SectionHeading n="2" title="18 modules — including 8 your competitors don't have"
          sub="Most financial wellbeing tools stop at budgeting. Wages to Wealth covers the workplace topics your employees actually ask HR about." />

        {/* Workplace modules — the differentiator, listed first */}
        <div className="bg-white rounded-2xl border-2 border-[#D4A017]/40 shadow-sm p-5 mb-3">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-black text-[#D4A017] uppercase tracking-wider">⭐ Workplace & Employment — exclusive to Wages to Wealth</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {workplaceModules.map(m => (
              <div key={m.title} className="bg-[#0F2B5B]/[0.03] border border-gray-100 rounded-xl p-3 text-center">
                <div className="text-2xl mb-1">{m.icon}</div>
                <div className="text-[11px] font-semibold text-gray-700 leading-tight">{m.title}</div>
              </div>
            ))}
          </div>
        </div>

        {/* General modules */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-3">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Personal Finance Foundations</p>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {generalModules.map(m => (
              <div key={m.title} className="bg-gray-50 rounded-xl p-3 text-center">
                <div className="text-2xl mb-1">{m.icon}</div>
                <div className="text-[11px] font-semibold text-gray-600 leading-tight">{m.title}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Expandable real content preview */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <button onClick={() => setPreviewOpen(o => !o)} className="w-full flex items-center justify-between px-6 py-4 text-left">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🧾</span>
              <div>
                <p className="font-bold text-[#0F2B5B] text-sm" style={{ fontFamily: 'DM Sans' }}>Peek inside a real module: Understanding Your Pay Slip</p>
                <p className="text-xs text-gray-400">8 min read · 5 quiz questions · Workplace</p>
              </div>
            </div>
            <span className={`text-[#0F2B5B] text-xl transition-transform ${previewOpen ? 'rotate-45' : ''}`}>+</span>
          </button>
          {previewOpen && (
            <div className="px-6 pb-6 space-y-3 text-sm text-gray-600 leading-relaxed border-t border-gray-50 pt-4">
              <p>Your pay slip is one of the most important documents you receive — yet most Australians have never been taught how to read one properly.</p>
              <p className="font-semibold text-[#0F2B5B]">Three things to check every single pay period:</p>
              <ol className="list-decimal list-inside space-y-1 ml-2">
                <li>Your <strong>gross pay</strong> matches your agreed salary or award rate</li>
                <li>Your <strong>super</strong> has been paid at the correct SG rate (11.5% in 2025)</li>
                <li>Your <strong>tax withheld</strong> looks right for your income bracket</li>
              </ol>
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-yellow-800 text-xs">
                <strong>Real insight:</strong> The ATO estimates billions of dollars in super is underpaid or lost every year in Australia. Checking your super quarterly takes 2 minutes and protects your retirement.
              </div>
              <p className="text-xs text-gray-400 italic">…the full module continues with PAYG decoding, allowances, deductions and your legal rights — then a 5-question quiz.</p>
            </div>
          )}
        </div>

        {/* ── 3. The quiz that drives the dashboard ── */}
        <SectionHeading n="3" title="Take Sam's quiz — and watch the dashboard react"
          sub="Quizzes close every module. Pass at 60%+ to complete it; scores feed the Financial Literacy Score. Answers stay private — employers only ever see anonymous trends." />

        {!quizState.done ? (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs text-gray-400 font-semibold">QUESTION {quizState.idx + 1} OF {QUIZ.length}</span>
              <div className="flex gap-1">
                {QUIZ.map((_, i) => (
                  <div key={i} className={`h-1.5 w-8 rounded-full transition-colors ${
                    i < quizState.idx ? 'bg-green-400' : i === quizState.idx ? 'bg-[#0F2B5B]' : 'bg-gray-200'
                  }`} />
                ))}
              </div>
            </div>

            <p className="text-[#0F2B5B] font-bold text-base mb-5">{q.q}</p>

            <div className="space-y-2 mb-5">
              {q.options.map((opt, i) => {
                let cls = 'border-2 border-gray-200 text-gray-700 hover:border-gray-300'
                if (quizState.revealed) {
                  if (i === q.correct) cls = 'border-2 border-green-400 bg-green-50 text-green-800'
                  else if (i === quizState.selected) cls = 'border-2 border-red-300 bg-red-50 text-red-700'
                  else cls = 'border-2 border-gray-100 text-gray-400'
                } else if (quizState.selected === i) {
                  cls = 'border-2 border-[#0F2B5B] bg-blue-50 text-[#0F2B5B]'
                }
                return (
                  <button key={i} type="button" onClick={() => handleAnswer(i)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${cls}`}>
                    <span className="mr-2 font-bold">{['A', 'B', 'C', 'D'][i]}.</span>{opt}
                  </button>
                )
              })}
            </div>

            {quizState.revealed && (
              <div className={`rounded-xl p-4 mb-4 text-sm ${quizState.selected === q.correct ? 'bg-green-50 border border-green-200 text-green-800' : 'bg-yellow-50 border border-yellow-200 text-yellow-800'}`}>
                <p className="font-bold mb-1">{quizState.selected === q.correct ? '✅ Correct!' : '💡 Not quite —'}</p>
                <p>{q.explain}</p>
              </div>
            )}

            {quizState.revealed && (
              <button onClick={handleNext}
                className="w-full bg-[#0F2B5B] text-white py-3 rounded-xl font-bold text-sm hover:bg-[#1a3d7c] transition-colors">
                {quizState.idx < QUIZ.length - 1 ? 'Next Question →' : 'Finish & Update My Dashboard →'}
              </button>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border-2 border-[#D4A017]/50 shadow-sm p-8 text-center">
            <div className="text-5xl mb-3">{perfectQuiz ? '🏆' : quizState.score >= 2 ? '🎯' : '📚'}</div>
            <h3 className="text-xl font-bold text-[#0F2B5B] mb-1" style={{ fontFamily: 'DM Sans' }}>
              You scored {quizState.score}/{QUIZ.length} — scroll back up! ☝️
            </h3>
            <p className="text-gray-500 text-sm mb-4 max-w-md mx-auto">
              Sam's Financial Literacy Score just went up by {quizBoost} points{completedCount > BASE_COMPLETED ? ', a module ticked over to complete, and a new achievement unlocked' : ''}. That feedback loop is what keeps employees coming back week after week.
            </p>
            <button onClick={() => setQuizState({ idx: 0, selected: null, revealed: false, score: 0, done: false })}
              className="text-[#0F2B5B] text-sm font-semibold hover:underline">
              ↩ Reset and try again
            </button>
          </div>
        )}

        <EmployerCTA label="Your team could be learning this right now" />

        {/* ── 4. Calculators ── */}
        <SectionHeading n="4" title="17 live calculators — real numbers, instant answers"
          sub="Not static content — working tools employees return to again and again. Here are two of them, fully live. Nothing is saved or sent anywhere." />

        {/* Salary sacrifice — the wow moment */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">📦</span>
            <h3 className="font-bold text-[#0F2B5B]" style={{ fontFamily: 'DM Sans' }}>Salary Sacrifice Tax Saving</h3>
          </div>
          <p className="text-xs text-gray-400 mb-5">The calculator that makes employees say "why didn't anyone tell me this?"</p>

          <div className="grid sm:grid-cols-2 gap-4 mb-5">
            <div>
              <label className="block text-sm text-gray-600 mb-1.5">Annual salary</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input type="number" min="0" step="1000" value={salary}
                  onChange={e => setSalary(Number(e.target.value) || 0)}
                  className="w-full pl-7 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2B5B]" />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1.5">Salary sacrifice to super (per month)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input type="number" min="0" step="50" value={sacrifice}
                  onChange={e => setSacrifice(Number(e.target.value) || 0)}
                  className="w-full pl-7 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2B5B]" />
              </div>
            </div>
          </div>

          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-5 text-center">
            <p className="text-xs text-gray-500 mb-1">Estimated tax saving in the first year alone</p>
            <p className="text-4xl font-black text-green-600" style={{ fontFamily: 'DM Sans' }}>${annualTaxSaving.toLocaleString()}</p>
            <p className="text-xs text-gray-400 mt-2">
              ${annualSacrifice.toLocaleString()}/yr redirected pre-tax · taxed at 15% in super instead of your ~{Math.round(marginalRate * 100)}% marginal rate. General estimate only — not personal advice.
            </p>
          </div>
        </div>

        {/* Budget calculator */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">💰</span>
            <h3 className="font-bold text-[#0F2B5B]" style={{ fontFamily: 'DM Sans' }}>Monthly Budget Planner</h3>
          </div>
          <p className="text-xs text-gray-400 mb-5">Try your own numbers — it reacts instantly.</p>

          <div className="space-y-3 mb-5">
            {BUDGETS.map(b => (
              <div key={b.key} className="flex items-center gap-3">
                <label className="text-sm text-gray-600 flex-1 min-w-0">{b.label}</label>
                <div className="relative w-32 flex-shrink-0">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                  <input type="number" min="0" value={budgetVals[b.key]}
                    onChange={e => setBudgetVals(v => ({ ...v, [b.key]: e.target.value }))}
                    className="w-full pl-7 pr-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2B5B] text-right" />
                </div>
              </div>
            ))}
          </div>

          <div className={`rounded-xl p-4 border-2 ${surplus >= 0 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-sm text-gray-700">Monthly surplus</span>
              <span className={`text-xl font-black ${surplus >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {surplus >= 0 ? '+' : ''}${surplus.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">Savings rate</span>
              <span className={`text-sm font-bold ${savingsRate >= 20 ? 'text-green-600' : savingsRate >= 10 ? 'text-yellow-600' : 'text-red-600'}`}>
                {savingsRate}% {savingsRate >= 20 ? '✅' : savingsRate >= 10 ? '📈' : '⚠️'}
              </span>
            </div>
          </div>
        </div>

        {/* All 17 chips */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Every calculator included on every plan</p>
          <div className="flex flex-wrap gap-2">
            {CALCULATORS.map(c => (
              <span key={c} className="bg-gray-50 border border-gray-200 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-full">{c}</span>
            ))}
          </div>
        </div>

        <EmployerCTA label="Give your employees tools that actually help" />

        {/* ── 5. Employer dashboard ── */}
        <SectionHeading n="5" title="And here's what you see as the employer"
          sub="Aggregate engagement, module trends and your team's average literacy score — never individual results, scores or calculator inputs. Privacy is enforced at the database level." />

        <div className="bg-[#0F2B5B] rounded-2xl p-6 text-white mb-4">
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-xs text-white/50 uppercase tracking-wide">Employer Dashboard Preview</p>
              <h3 className="font-bold text-lg" style={{ fontFamily: 'DM Sans' }}>Acme Corporation</h3>
            </div>
            <span className="bg-green-400/20 text-green-300 text-xs font-semibold px-3 py-1 rounded-full">Active</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            {[
              { val: '47', label: 'Enrolled', sub: 'employees' },
              { val: '34', label: 'Started', sub: '72% of team' },
              { val: '68', label: 'Avg Score', sub: 'Financial Literacy' },
              { val: '156', label: 'Quiz Attempts', sub: 'this month' },
            ].map(s => (
              <div key={s.label} className="bg-white/10 rounded-xl p-3 text-center">
                <div className="text-2xl font-black text-[#D4A017]">{s.val}</div>
                <div className="text-xs font-semibold text-white mt-0.5">{s.label}</div>
                <div className="text-xs text-white/40">{s.sub}</div>
              </div>
            ))}
          </div>
          <div className="bg-white/10 rounded-xl p-4">
            <p className="text-xs text-white/50 mb-3 uppercase tracking-wide">Top modules this month</p>
            {[
              { name: 'Understanding Your Pay Slip', pct: 88 },
              { name: 'Superannuation', pct: 74 },
              { name: 'Budgeting & Saving', pct: 69 },
            ].map(m => (
              <div key={m.name} className="flex items-center gap-3 mb-2">
                <span className="text-xs text-white/70 flex-1 truncate">{m.name}</span>
                <div className="w-24 bg-white/20 rounded-full h-1.5">
                  <div className="h-1.5 rounded-full bg-[#D4A017]" style={{ width: `${m.pct}%` }} />
                </div>
                <span className="text-xs text-white/50 w-8 text-right">{m.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy + compliance trust */}
        <div className="grid sm:grid-cols-3 gap-3 mb-4">
          {[
            { icon: '🔒', title: 'Employee privacy', desc: 'Individual scores and calculator inputs are never visible to employers. Row-level security enforces it.' },
            { icon: '⚖️', title: 'ASIC-safe', desc: 'General information only — no personal advice, no product recommendations, no AFSL required.' },
            { icon: '🇦🇺', title: 'Built for Australia', desc: 'Australian tax rates, super rules and entitlements. Data hosted in Australia.' },
          ].map(t => (
            <div key={t.title} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <div className="text-2xl mb-2">{t.icon}</div>
              <p className="font-bold text-[#0F2B5B] text-sm mb-1" style={{ fontFamily: 'DM Sans' }}>{t.title}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>

        {/* Final CTA */}
        <div className="bg-gradient-to-br from-[#D4A017] to-yellow-500 rounded-2xl p-8 text-center mt-10">
          <h2 className="text-2xl font-bold text-[#0F2B5B] mb-3" style={{ fontFamily: 'DM Sans' }}>
            Your team deserves this
          </h2>
          <p className="text-[#0F2B5B]/70 text-sm mb-6 max-w-md mx-auto">
            Financial stress is the #1 productivity drain in Australian workplaces. Wages to Wealth fixes it — affordably, compliantly, and without any IT work on your end.
          </p>
          <Link to="/register/employer"
            className="bg-[#0F2B5B] text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-[#1a3d7c] transition-colors inline-block shadow-lg">
            Set Up My Team Now →
          </Link>
          <p className="text-[#0F2B5B]/50 text-xs mt-3">Plans from $149/month incl. GST · Setup in under 5 minutes · ASIC compliant</p>
        </div>
      </div>
    </div>
  )
}
