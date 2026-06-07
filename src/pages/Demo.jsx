import { useState } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/ui/SEO'

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

const BUDGETS = [
  { label: 'Income (monthly after tax)', key: 'income', type: 'income' },
  { label: 'Rent / Mortgage', key: 'rent', type: 'expense' },
  { label: 'Groceries & Food', key: 'food', type: 'expense' },
  { label: 'Transport', key: 'transport', type: 'expense' },
  { label: 'Subscriptions & Entertainment', key: 'entertainment', type: 'expense' },
  { label: 'Other expenses', key: 'other', type: 'expense' },
]

function EmployerCTA({ label = 'Give your team this experience' }) {
  return (
    <div className="bg-gradient-to-r from-[#0F2B5B] to-[#1a3d7c] rounded-2xl p-6 text-center text-white my-10">
      <p className="text-sm text-white/70 mb-1">Seen enough?</p>
      <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'DM Sans' }}>{label}</h3>
      <Link to="/register/employer"
        className="bg-[#D4A017] text-[#0F2B5B] px-8 py-3 rounded-xl font-bold text-sm hover:bg-yellow-400 transition-colors inline-block">
        Start Free — Set Up Your Team Today →
      </Link>
      <p className="text-xs text-white/40 mt-3">No credit card required to explore. Paid plans start at $299/month.</p>
    </div>
  )
}

export default function Demo() {
  const [quizState, setQuizState] = useState({ idx: 0, selected: null, revealed: false, score: 0, done: false })
  const [budgetVals, setBudgetVals] = useState({ income: 6000, rent: 1800, food: 600, transport: 300, entertainment: 200, other: 400 })
  const [scoreAnim] = useState(72)

  const q = QUIZ[quizState.idx]

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

  const totalExpenses = BUDGETS.filter(b => b.type === 'expense').reduce((sum, b) => sum + (Number(budgetVals[b.key]) || 0), 0)
  const surplus = (Number(budgetVals.income) || 0) - totalExpenses
  const savingsRate = budgetVals.income > 0 ? Math.round((surplus / budgetVals.income) * 100) : 0

  return (
    <div className="bg-[#F9F8F6] min-h-screen">
      <SEO title="Employee Demo" path="/demo" description="See what Wages to Wealth looks like for your employees — interactive modules, live calculators and Financial Literacy Scores." />

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
          <div className="inline-block bg-[#D4A017]/20 text-[#D4A017] text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">Employee Demo</div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'DM Sans' }}>
            This is what your employees experience
          </h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            18 modules, 17 live calculators and a personal Financial Literacy Score — all designed to help Australian workers go from wages to wealth.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12">

        {/* Section 1: Module preview */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 bg-[#D4A017] rounded-lg flex items-center justify-center text-[#0F2B5B] font-black text-sm">1</div>
            <h2 className="text-xl font-bold text-[#0F2B5B]" style={{ fontFamily: 'DM Sans' }}>Interactive Learning Modules</h2>
          </div>
          <p className="text-gray-500 text-sm mb-5 ml-9">Each module teaches one topic clearly, with a quiz at the end to lock in the learning.</p>
        </div>

        {/* Module card UI */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-3">
          <div className="bg-gradient-to-r from-[#0F2B5B] to-[#1a3d7c] px-6 py-5">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs text-white/50 uppercase tracking-wide">Module 11 · Workplace</span>
                <h3 className="text-white font-bold text-lg mt-1" style={{ fontFamily: 'DM Sans' }}>Understanding Your Pay Slip</h3>
                <p className="text-white/60 text-sm mt-1">Know exactly what you're being paid — and spot errors before they cost you.</p>
              </div>
              <div className="text-3xl ml-4">🧾</div>
            </div>
            <div className="flex items-center gap-4 mt-4 text-xs text-white/50">
              <span>⏱ 8 min read</span>
              <span>❓ 5 quiz questions</span>
              <span>🎯 Workplace</span>
            </div>
          </div>
          <div className="px-6 py-5 space-y-3 text-sm text-gray-600 leading-relaxed">
            <p>Your pay slip is one of the most important documents you receive — yet most Australians have never been taught how to read one properly.</p>
            <p>Every fortnight (or week, or month), your employer is legally required to provide a pay slip within one working day of payment. It must include your gross pay, tax withheld, superannuation, and any allowances or deductions.</p>
            <p className="font-semibold text-[#0F2B5B]">Three things to check every single pay period:</p>
            <ol className="list-decimal list-inside space-y-1 text-gray-600 ml-2">
              <li>Your <strong>gross pay</strong> matches your agreed salary or award rate</li>
              <li>Your <strong>super</strong> has been paid at the correct SG rate (11.5% in 2025)</li>
              <li>Your <strong>tax withheld</strong> looks right for your income bracket</li>
            </ol>
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-yellow-800 text-xs">
              <strong>Real insight:</strong> The ATO estimates billions of dollars in super is underpaid or lost every year in Australia. Checking your super quarterly takes 2 minutes and protects your retirement.
            </div>
          </div>
        </div>

        {/* Section 2: Quiz */}
        <div className="mt-10 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 bg-[#D4A017] rounded-lg flex items-center justify-center text-[#0F2B5B] font-black text-sm">2</div>
            <h2 className="text-xl font-bold text-[#0F2B5B]" style={{ fontFamily: 'DM Sans' }}>Gamified Quiz Engine</h2>
          </div>
          <p className="text-gray-500 text-sm mb-5 ml-9">Quizzes update each employee's Financial Literacy Score. Answers are private — employers only see aggregate trends.</p>
        </div>

        {!quizState.done ? (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            {/* Progress */}
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
                  <button key={i} type="button"
                    onClick={() => handleAnswer(i)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${cls}`}>
                    <span className="mr-2 font-bold">{['A', 'B', 'C', 'D'][i]}.</span>{opt}
                  </button>
                )
              })}
            </div>

            {quizState.revealed && (
              <div className={`rounded-xl p-4 mb-4 text-sm ${quizState.selected === q.correct ? 'bg-green-50 border border-green-200 text-green-800' : 'bg-orange-50 border border-orange-200 text-orange-800'}`}>
                <p className="font-bold mb-1">{quizState.selected === q.correct ? '✅ Correct!' : '❌ Not quite —'}</p>
                <p>{q.explain}</p>
              </div>
            )}

            {quizState.revealed && (
              <button onClick={handleNext}
                className="w-full bg-[#0F2B5B] text-white py-3 rounded-xl font-bold text-sm hover:bg-[#1a3d7c] transition-colors">
                {quizState.idx < QUIZ.length - 1 ? 'Next Question →' : 'See My Score →'}
              </button>
            )}

            {!quizState.revealed && !quizState.selected === null && (
              <p className="text-center text-xs text-gray-400">Select an answer above</p>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
            <div className="text-5xl mb-3">
              {quizState.score === QUIZ.length ? '🏆' : quizState.score >= 2 ? '🎯' : '📚'}
            </div>
            <h3 className="text-xl font-bold text-[#0F2B5B] mb-1" style={{ fontFamily: 'DM Sans' }}>
              You scored {quizState.score}/{QUIZ.length}
            </h3>
            <p className="text-gray-500 text-sm mb-4">
              {quizState.score === QUIZ.length
                ? 'Perfect score! You clearly know your stuff.'
                : 'Each quiz updates your Financial Literacy Score. Employees can retry to improve.'}
            </p>
            <div className="bg-[#0F2B5B]/5 rounded-xl p-4 text-sm text-gray-600 mb-4">
              In the real platform, this result updates the employee's <strong>Financial Literacy Score</strong> out of 100 — and you see the aggregate trend in your employer dashboard (never individual results).
            </div>
            <button onClick={() => setQuizState({ idx: 0, selected: null, revealed: false, score: 0, done: false })}
              className="text-[#0F2B5B] text-sm font-semibold hover:underline">
              ↩ Try again
            </button>
          </div>
        )}

        <EmployerCTA label="Your team could be learning this right now" />

        {/* Section 3: Budget Calculator */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 bg-[#D4A017] rounded-lg flex items-center justify-center text-[#0F2B5B] font-black text-sm">3</div>
            <h2 className="text-xl font-bold text-[#0F2B5B]" style={{ fontFamily: 'DM Sans' }}>17 Live Calculators</h2>
          </div>
          <p className="text-gray-500 text-sm mb-5 ml-9">Mortgage repayments, salary packaging savings, super projections, debt payoff — all real, all instant, all private.</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="font-bold text-[#0F2B5B] mb-1" style={{ fontFamily: 'DM Sans' }}>Monthly Budget Calculator</h3>
          <p className="text-xs text-gray-400 mb-5">Try entering your numbers — nothing is saved or sent anywhere.</p>

          <div className="space-y-3 mb-5">
            {BUDGETS.map(b => (
              <div key={b.key} className="flex items-center gap-3">
                <label className="text-sm text-gray-600 flex-1 min-w-0">{b.label}</label>
                <div className="relative w-32 flex-shrink-0">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                  <input
                    type="number" min="0" value={budgetVals[b.key]}
                    onChange={e => setBudgetVals(v => ({ ...v, [b.key]: e.target.value }))}
                    className="w-full pl-7 pr-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2B5B] text-right"
                  />
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
            {surplus < 0 && (
              <p className="text-xs text-red-600 mt-2">You're spending more than you earn. The Budgeting module has practical strategies to close this gap.</p>
            )}
            {surplus >= 0 && savingsRate < 20 && (
              <p className="text-xs text-green-700 mt-2">Financial experts recommend saving at least 20% of income. You're at {savingsRate}% — the Super module covers how to grow this faster.</p>
            )}
          </div>
        </div>

        <EmployerCTA label="Give your employees tools that actually help" />

        {/* Section 4: Financial Literacy Score */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 bg-[#D4A017] rounded-lg flex items-center justify-center text-[#0F2B5B] font-black text-sm">4</div>
            <h2 className="text-xl font-bold text-[#0F2B5B]" style={{ fontFamily: 'DM Sans' }}>Financial Literacy Score</h2>
          </div>
          <p className="text-gray-500 text-sm mb-5 ml-9">Every employee gets a personal score out of 100 that grows as they learn. It motivates continued engagement — and gives you measurable ROI.</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-4">
          <div className="flex items-center gap-6">
            <div className="relative w-28 h-28 flex-shrink-0">
              <svg viewBox="0 0 36 36" className="w-28 h-28 -rotate-90">
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#f3f4f6" strokeWidth="3.5" />
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#D4A017" strokeWidth="3.5"
                  strokeDasharray={`${scoreAnim} ${100 - scoreAnim}`} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-black text-[#0F2B5B]">{scoreAnim}</span>
                <span className="text-xs text-gray-400">/100</span>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-[#0F2B5B] mb-1" style={{ fontFamily: 'DM Sans' }}>Sam's Financial Literacy Score</h3>
              <p className="text-xs text-gray-400 mb-3">Updated after each quiz · Private to the employee</p>
              <div className="space-y-1.5">
                {[
                  { label: 'Budgeting & Saving', val: 85, color: 'bg-green-400' },
                  { label: 'Superannuation', val: 70, color: 'bg-blue-400' },
                  { label: 'Tax & Pay', val: 60, color: 'bg-yellow-400' },
                  { label: 'Investing', val: 40, color: 'bg-orange-400' },
                ].map(s => (
                  <div key={s.label} className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 w-32 truncate">{s.label}</span>
                    <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                      <div className={`h-1.5 rounded-full ${s.color}`} style={{ width: `${s.val}%` }} />
                    </div>
                    <span className="text-xs text-gray-400 w-8 text-right">{s.val}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section 5: Employer dashboard preview */}
        <div className="mb-4 mt-10">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 bg-[#D4A017] rounded-lg flex items-center justify-center text-[#0F2B5B] font-black text-sm">5</div>
            <h2 className="text-xl font-bold text-[#0F2B5B]" style={{ fontFamily: 'DM Sans' }}>Your Employer Dashboard</h2>
          </div>
          <p className="text-gray-500 text-sm mb-5 ml-9">You see aggregate trends only — never individual scores or calculator inputs. Privacy is built in.</p>
        </div>

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
          <p className="text-[#0F2B5B]/50 text-xs mt-3">Plans from $299/month · Setup in under 5 minutes · ASIC compliant</p>
        </div>
      </div>
    </div>
  )
}
