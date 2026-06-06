import { useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../hooks/useAuth'

export default function QuizEngine({ questions, moduleId, onComplete }) {
  const { profile } = useAuth()
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [answers, setAnswers] = useState([])
  const [showFeedback, setShowFeedback] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [score, setScore] = useState(0)

  const q = questions[current]
  const progress = ((current) / questions.length) * 100

  const handleSelect = (idx) => {
    if (showFeedback) return
    setSelected(idx)
    setShowFeedback(true)
    const newAnswers = [...answers, idx]
    setAnswers(newAnswers)

    if (current === questions.length - 1) {
      const correct = newAnswers.filter((a, i) => a === questions[i].correct).length
      const pct = Math.round((correct / questions.length) * 100)
      setScore(pct)
      setTimeout(() => {
        setCompleted(true)
        saveAttempt(newAnswers, pct)
      }, 1500)
    }
  }

  const handleNext = () => {
    setCurrent(c => c + 1)
    setSelected(null)
    setShowFeedback(false)
  }

  const saveAttempt = async (ans, pct) => {
    if (!profile?.id) return
    await supabase.from('quiz_attempts').insert({
      employee_id: profile.id,
      module_id: moduleId,
      score: pct,
      answers_json: ans,
    })
    // Update literacy score (simple average)
    const { data: attempts } = await supabase
      .from('quiz_attempts')
      .select('score, module_id')
      .eq('employee_id', profile.id)
    if (attempts?.length) {
      const uniqueModules = [...new Map(attempts.map(a => [a.module_id, a])).values()]
      const avg = Math.round(uniqueModules.reduce((s, a) => s + a.score, 0) / uniqueModules.length)
      await supabase.from('employees').update({ literacy_score: avg }).eq('id', profile.id)
    }
    onComplete?.(pct)
  }

  if (completed) {
    const tier =
      score >= 90 ? { label: 'Expert', color: 'text-[#0F2B5B]', bg: 'bg-blue-50' } :
      score >= 80 ? { label: 'Confident', color: 'text-green-700', bg: 'bg-green-50' } :
      score >= 60 ? { label: 'Capable', color: 'text-yellow-700', bg: 'bg-yellow-50' } :
      score >= 40 ? { label: 'Building', color: 'text-orange-700', bg: 'bg-orange-50' } :
      { label: 'Beginner', color: 'text-red-700', bg: 'bg-red-50' }

    return (
      <div className={`rounded-xl p-8 text-center ${tier.bg} border border-current/10`}>
        <div className="text-6xl mb-3">🎉</div>
        <h3 className="text-2xl font-bold text-[#0F2B5B] mb-1" style={{ fontFamily: 'DM Sans' }}>Quiz Complete!</h3>
        <div className={`text-5xl font-bold ${tier.color} my-4`}>{score}%</div>
        <div className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold ${tier.color} bg-white/70 mb-4`}>
          {tier.label}
        </div>
        <p className="text-gray-600 text-sm mb-6">
          You answered {answers.filter((a, i) => a === questions[i].correct).length} of {questions.length} correctly.
        </p>
        {score === 100 ? (
          <Link to="/modules"
            className="inline-block bg-[#D4A017] text-[#0F2B5B] px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-yellow-400 transition-colors">
            Back to Modules →
          </Link>
        ) : (
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => { setCurrent(0); setSelected(null); setAnswers([]); setShowFeedback(false); setCompleted(false); setScore(0) }}
              className="bg-[#0F2B5B] text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#1a3d7c] transition-colors"
            >
              Retry Quiz
            </button>
            <Link to="/modules"
              className="border-2 border-[#0F2B5B] text-[#0F2B5B] px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#0F2B5B] hover:text-white transition-colors">
              Back to Modules
            </Link>
          </div>
        )}
      </div>
    )
  }

  return (
    <div>
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-xs text-gray-500 mb-1.5">
          <span>Question {current + 1} of {questions.length}</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#D4A017] rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <h3 className="text-lg font-semibold text-[#0F2B5B] mb-5" style={{ fontFamily: 'DM Sans' }}>
          {q.question}
        </h3>
        <div className="space-y-3">
          {q.options.map((opt, idx) => {
            let cls = 'border-gray-200 hover:border-[#0F2B5B] hover:bg-blue-50 cursor-pointer'
            if (showFeedback) {
              if (idx === q.correct) cls = 'border-green-500 bg-green-50 cursor-default'
              else if (idx === selected) cls = 'border-red-400 bg-red-50 cursor-default'
              else cls = 'border-gray-200 opacity-50 cursor-default'
            }
            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                className={`w-full text-left px-4 py-3 rounded-lg border-2 text-sm transition-all ${cls}`}
              >
                <span className="font-semibold mr-2 text-gray-400">{['A', 'B', 'C', 'D'][idx]}.</span>
                {opt}
              </button>
            )
          })}
        </div>

        {showFeedback && (
          <div className={`mt-4 p-4 rounded-lg text-sm ${selected === q.correct ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
            <strong>{selected === q.correct ? '✓ Correct!' : '✗ Incorrect.'}</strong> {q.explanation}
          </div>
        )}

        {showFeedback && current < questions.length - 1 && (
          <button onClick={handleNext} className="mt-4 bg-[#0F2B5B] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#1a3d7c] transition-colors">
            Next Question →
          </button>
        )}
      </div>
    </div>
  )
}
