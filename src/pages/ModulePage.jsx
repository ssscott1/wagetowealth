import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { MODULES } from '../data/modules'
import AsicWarning from '../components/ui/AsicWarning'
import QuizEngine from '../components/quiz/QuizEngine'
import MortgageCalculator from '../components/calculators/MortgageCalculator'
import MortgageRateSaving from '../components/calculators/MortgageRateSaving'
import BudgetPlanner from '../components/calculators/BudgetPlanner'
import CarLoan from '../components/calculators/CarLoan'
import DebtPayoff from '../components/calculators/DebtPayoff'
import InvestmentProperty from '../components/calculators/InvestmentProperty'
import CompoundGrowth from '../components/calculators/CompoundGrowth'
import SuperProjection from '../components/calculators/SuperProjection'
import PaygTakeHome from '../components/calculators/PaygTakeHome'
import SalarySacrificeSaving from '../components/calculators/SalarySacrificeSaving'
import SuperSacrificeProjection from '../components/calculators/SuperSacrificeProjection'
import NovatedVsLoan from '../components/calculators/NovatedVsLoan'
import RedundancyEstimator from '../components/calculators/RedundancyEstimator'
import EssTaxEstimator from '../components/calculators/EssTaxEstimator'
import NegotiationGuide from './NegotiationGuide'

const CALC_MAP = {
  'mortgage-repayment': MortgageCalculator,
  'mortgage-rate-saving': MortgageRateSaving,
  'budget-planner': BudgetPlanner,
  'car-loan': CarLoan,
  'debt-payoff': DebtPayoff,
  'investment-property': InvestmentProperty,
  'compound-growth': CompoundGrowth,
  'superannuation': SuperProjection,
  'payg-take-home': PaygTakeHome,
  'salary-sacrifice-saving': SalarySacrificeSaving,
  'super-sacrifice-projection': SuperSacrificeProjection,
  'novated-vs-loan': NovatedVsLoan,
  'redundancy-estimator': RedundancyEstimator,
  'ess-tax-estimator': EssTaxEstimator,
}

export default function ModulePage() {
  const { slug } = useParams()
  const module = MODULES.find(m => m.slug === slug)
  const [tab, setTab] = useState('learn')
  const [quizScore, setQuizScore] = useState(null)

  if (!module) return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center">
      <h1 className="text-2xl font-bold text-gray-700">Module not found</h1>
      <Link to="/modules" className="text-[#0F2B5B] font-semibold mt-4 inline-block">← Back to Modules</Link>
    </div>
  )

  const CalcComponent = CALC_MAP[module.calculator]

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link to="/modules" className="text-[#0F2B5B] text-sm font-semibold hover:underline mb-4 inline-block">
        ← Back to Modules
      </Link>

      <div className="flex items-center gap-3 mb-6">
        <span className="text-5xl">{module.icon}</span>
        <div>
          <div className="text-xs font-semibold text-[#D4A017] uppercase tracking-wide mb-0.5">{module.category}</div>
          <h1 className="text-3xl font-bold text-[#0F2B5B]" style={{ fontFamily: 'DM Sans' }}>{module.title}</h1>
        </div>
      </div>

      <AsicWarning />

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-200">
        {[
          { key: 'learn', label: '📖 Learn' },
          ...(CalcComponent ? [{ key: 'calculator', label: '🧮 Calculator' }] : []),
          ...(module.slug === 'getting-a-mortgage' ? [{ key: 'negotiate', label: '💬 Negotiate Your Rate' }] : []),
          { key: 'quiz', label: `🎯 Quiz${quizScore !== null ? ` · ${quizScore}%` : ''}` },
        ].map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`px-4 py-2.5 text-sm font-semibold border-b-2 -mb-px transition-colors ${tab === t.key ? 'border-[#0F2B5B] text-[#0F2B5B]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'learn' && (
        <div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
            <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed">
              {module.overview.split('\n\n').map((para, i) => {
                if (para.startsWith('**') && para.includes(':**')) {
                  const [heading, ...rest] = para.split('\n')
                  return (
                    <div key={i} className="mb-4">
                      <h3 className="font-bold text-[#0F2B5B] mb-2 text-base" style={{ fontFamily: 'DM Sans' }}>
                        {heading.replace(/\*\*/g, '')}
                      </h3>
                      {rest.map((line, j) => {
                        if (line.startsWith('- *')) {
                          const match = line.match(/- \*(.+?)\*: (.+)/)
                          if (match) return (
                            <div key={j} className="flex gap-2 mb-1.5 text-sm">
                              <span className="text-[#D4A017] font-bold flex-shrink-0">•</span>
                              <span><strong>{match[1]}:</strong> {match[2]}</span>
                            </div>
                          )
                        }
                        return line ? <p key={j} className="text-sm mb-2">{line}</p> : null
                      })}
                    </div>
                  )
                }
                return <p key={i} className="mb-4 text-sm leading-relaxed">{para}</p>
              })}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-bold text-[#0F2B5B] mb-3" style={{ fontFamily: 'DM Sans' }}>Key Takeaways</h3>
            <ul className="space-y-2">
              {module.keyPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="text-[#D4A017] font-bold mt-0.5 flex-shrink-0">✓</span>
                  {point}
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-4 border-t border-gray-100 text-xs text-gray-400">
              Source: <a href="https://moneysmart.gov.au" target="_blank" rel="noopener noreferrer" className="text-[#0F2B5B] hover:underline">moneysmart.gov.au</a> and publicly available financial education resources.
            </div>
          </div>

          <div className="mt-4 flex gap-3">
            {CalcComponent && (
              <button onClick={() => setTab('calculator')}
                className="bg-white border border-[#0F2B5B] text-[#0F2B5B] px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-50 transition-colors">
                Try the Calculator →
              </button>
            )}
            <button onClick={() => setTab('quiz')}
              className="bg-[#0F2B5B] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#1a3d7c] transition-colors">
              Take the Quiz →
            </button>
          </div>
        </div>
      )}

      {tab === 'calculator' && CalcComponent && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-bold text-[#0F2B5B] mb-4" style={{ fontFamily: 'DM Sans' }}>
            {module.title} Calculator
          </h2>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-5 text-xs text-amber-700">
            ⚠️ This calculator provides a general estimate only and is not a credit quote or financial advice. Actual results depend on your individual circumstances.
          </div>
          <CalcComponent />
        </div>
      )}

      {tab === 'negotiate' && module.slug === 'getting-a-mortgage' && (
        <NegotiationGuide />
      )}

      {tab === 'quiz' && (
        <div>
          <h2 className="font-bold text-[#0F2B5B] text-xl mb-4" style={{ fontFamily: 'DM Sans' }}>
            {module.title} Quiz
          </h2>
          <QuizEngine
            questions={module.quiz}
            moduleId={module.id}
            onComplete={(score) => setQuizScore(score)}
          />
        </div>
      )}
    </div>
  )
}
