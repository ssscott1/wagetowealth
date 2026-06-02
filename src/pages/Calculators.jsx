import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import AsicWarning from '../components/ui/AsicWarning'
import BudgetPlanner from '../components/calculators/BudgetPlanner'
import MortgageCalculator from '../components/calculators/MortgageCalculator'
import BorrowingPower from '../components/calculators/BorrowingPower'
import SavingsGoal from '../components/calculators/SavingsGoal'
import CompoundGrowth from '../components/calculators/CompoundGrowth'
import DebtPayoff from '../components/calculators/DebtPayoff'
import InvestmentProperty from '../components/calculators/InvestmentProperty'
import CarLoan from '../components/calculators/CarLoan'
import MortgageRateSaving from '../components/calculators/MortgageRateSaving'
import SuperProjection from '../components/calculators/SuperProjection'
import PaygTakeHome from '../components/calculators/PaygTakeHome'
import SalarySacrificeSaving from '../components/calculators/SalarySacrificeSaving'
import SuperSacrificeProjection from '../components/calculators/SuperSacrificeProjection'
import NovatedVsLoan from '../components/calculators/NovatedVsLoan'
import RedundancyEstimator from '../components/calculators/RedundancyEstimator'
import FHSSEstimator from '../components/calculators/FHSSEstimator'
import EssTaxEstimator from '../components/calculators/EssTaxEstimator'

const CALCS_GENERAL = [
  { id: 'budget-planner', label: 'Budget Planner', icon: '💰', component: BudgetPlanner },
  { id: 'mortgage-repayment', label: 'Mortgage Repayment', icon: '🏠', component: MortgageCalculator },
  { id: 'borrowing-power', label: 'Borrowing Power', icon: '💪', component: BorrowingPower },
  { id: 'savings-goal', label: 'Savings Goal', icon: '🎯', component: SavingsGoal },
  { id: 'compound-growth', label: 'Compound Growth', icon: '📈', component: CompoundGrowth },
  { id: 'debt-payoff', label: 'Debt Payoff', icon: '💳', component: DebtPayoff },
  { id: 'investment-property', label: 'Investment Property', icon: '🏘️', component: InvestmentProperty },
  { id: 'car-loan', label: 'Car Loan', icon: '🚗', component: CarLoan },
  { id: 'mortgage-rate-saving', label: 'Rate Saving', icon: '📉', component: MortgageRateSaving },
  { id: 'superannuation', label: 'Super Projection', icon: '🧓', component: SuperProjection },
]

const CALCS_WORKPLACE = [
  { id: 'payg-take-home', label: 'PAYG Take-Home', icon: '🧾', component: PaygTakeHome },
  { id: 'salary-sacrifice-saving', label: 'Salary Sacrifice Saving', icon: '📦', component: SalarySacrificeSaving },
  { id: 'super-sacrifice-projection', label: 'Super Sacrifice', icon: '💼', component: SuperSacrificeProjection },
  { id: 'novated-vs-loan', label: 'Novated vs Car Loan', icon: '🚘', component: NovatedVsLoan },
  { id: 'redundancy-estimator', label: 'Redundancy Pay', icon: '⚖️', component: RedundancyEstimator },
  { id: 'fhss-estimator', label: 'FHSS Scheme', icon: '🏡', component: FHSSEstimator },
  { id: 'ess-tax-estimator', label: 'ESS Tax Estimate', icon: '📊', component: EssTaxEstimator },
]

const ALL_CALCS = [...CALCS_GENERAL, ...CALCS_WORKPLACE]

export default function Calculators() {
  const location = useLocation()
  const hash = location.hash.replace('#', '')
  const initial = ALL_CALCS.find(c => c.id === hash) || ALL_CALCS[0]
  const [active, setActive] = useState(initial)

  const ActiveCalc = active.component

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#0F2B5B]" style={{ fontFamily: 'DM Sans' }}>Financial Calculators</h1>
        <p className="text-gray-500 mt-1">17 interactive calculators covering personal finance and workplace financial decisions</p>
      </div>

      <AsicWarning />

      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="hidden md:block w-56 flex-shrink-0 space-y-4">
          <div>
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-1">General Finance</div>
            <nav className="space-y-0.5">
              {CALCS_GENERAL.map(c => (
                <button key={c.id} onClick={() => setActive(c)}
                  className={`w-full text-left flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium transition-all ${active.id === c.id ? 'bg-[#0F2B5B] text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
                  <span className="text-base">{c.icon}</span><span className="leading-tight">{c.label}</span>
                </button>
              ))}
            </nav>
          </div>
          <div>
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-1">Workplace & Employment</div>
            <nav className="space-y-0.5">
              {CALCS_WORKPLACE.map(c => (
                <button key={c.id} onClick={() => setActive(c)}
                  className={`w-full text-left flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium transition-all ${active.id === c.id ? 'bg-[#0F2B5B] text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
                  <span className="text-base">{c.icon}</span><span className="leading-tight">{c.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Mobile selector */}
        <div className="md:hidden w-full mb-4">
          <select value={active.id} onChange={e => setActive(ALL_CALCS.find(c => c.id === e.target.value))}
            className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2B5B]">
            <optgroup label="General Finance">
              {CALCS_GENERAL.map(c => <option key={c.id} value={c.id}>{c.icon} {c.label}</option>)}
            </optgroup>
            <optgroup label="Workplace & Employment">
              {CALCS_WORKPLACE.map(c => <option key={c.id} value={c.id}>{c.icon} {c.label}</option>)}
            </optgroup>
          </select>
        </div>

        {/* Calculator */}
        <div className="flex-1 min-w-0">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-xl font-bold text-[#0F2B5B] mb-5 flex items-center gap-2" style={{ fontFamily: 'DM Sans' }}>
              <span>{active.icon}</span>{active.label}
            </h2>
            <ActiveCalc />
          </div>
        </div>
      </div>
    </div>
  )
}
