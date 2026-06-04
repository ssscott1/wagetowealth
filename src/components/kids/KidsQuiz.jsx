import { useState } from 'react'

export default function KidsQuiz({ quiz, moduleTitle }) {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [revealed, setRevealed] = useState(false)
  const [answers, setAnswers] = useState([])
  const [done, setDone] = useState(false)

  const q = quiz[current]
  const total = quiz.length
  const score = answers.filter(Boolean).length

  const correctAnswer = typeof q.correct === 'number' ? q.options[q.correct] : q.correct

  const handleSelect = (opt) => {
    if (revealed) return
    setSelected(opt)
  }

  const handleCheck = () => {
    if (!selected) return
    setRevealed(true)
  }

  const handleNext = () => {
    const correct = selected === correctAnswer
    const newAnswers = [...answers, correct]
    if (current + 1 >= total) {
      setAnswers(newAnswers)
      setDone(true)
    } else {
      setAnswers(newAnswers)
      setCurrent(current + 1)
      setSelected(null)
      setRevealed(false)
    }
  }

  const handleRestart = () => {
    setCurrent(0)
    setSelected(null)
    setRevealed(false)
    setAnswers([])
    setDone(false)
  }

  if (done) {
    const pct = Math.round((score / total) * 100)
    const emoji = pct === 100 ? '🏆' : pct >= 80 ? '🌟' : pct >= 60 ? '👍' : '💪'
    const msg = pct === 100 ? 'Perfect score! You\'re a money genius!' : pct >= 80 ? 'Awesome work! You really know this stuff!' : pct >= 60 ? 'Good effort! Read back over the lesson to nail the rest.' : 'Keep practicing — you\'ve got this!'

    return (
      <div className="text-center py-8 px-4">
        <div className="text-6xl mb-4">{emoji}</div>
        <h3 className="text-2xl font-black text-purple-700 mb-2" style={{ fontFamily: 'DM Sans' }}>
          {score}/{total} correct!
        </h3>
        <p className="text-gray-600 mb-6">{msg}</p>

        <div className="flex justify-center gap-3 mb-6">
          {Array.from({ length: total }).map((_, i) => (
            <div key={i} className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${answers[i] ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
              {answers[i] ? '✓' : '✗'}
            </div>
          ))}
        </div>

        <button onClick={handleRestart}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-bold transition-colors">
          Try Again 🔄
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto">
      {/* Progress */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-sm font-bold text-purple-600">Question {current + 1} of {total}</span>
        <div className="flex-1 h-2.5 bg-purple-100 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all"
            style={{ width: `${((current) / total) * 100}%` }} />
        </div>
      </div>

      {/* Question */}
      <div className="bg-white rounded-2xl border-2 border-purple-100 p-6 mb-4 shadow-sm">
        <p className="font-bold text-gray-800 text-lg leading-snug" style={{ fontFamily: 'DM Sans' }}>{q.question}</p>
      </div>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {q.options.map((opt) => {
          let style = 'bg-white border-2 border-gray-200 hover:border-purple-400 hover:bg-purple-50'
          if (revealed) {
            if (opt === correctAnswer) style = 'bg-green-50 border-2 border-green-400'
            else if (opt === selected) style = 'bg-red-50 border-2 border-red-300'
            else style = 'bg-white border-2 border-gray-100 opacity-60'
          } else if (opt === selected) {
            style = 'bg-purple-50 border-2 border-purple-500'
          }

          return (
            <button key={opt} onClick={() => handleSelect(opt)}
              className={`w-full text-left px-5 py-3.5 rounded-xl font-medium transition-all text-sm ${style}`}>
              {revealed && opt === correctAnswer && <span className="mr-2">✅</span>}
              {revealed && opt === selected && opt !== correctAnswer && <span className="mr-2">❌</span>}
              {opt}
            </button>
          )
        })}
      </div>

      {/* Feedback */}
      {revealed && (
        <div className={`rounded-xl p-4 mb-4 text-sm ${selected === q.correct ? 'bg-green-50 border border-green-200 text-green-800' : 'bg-amber-50 border border-amber-200 text-amber-800'}`}>
          <span className="font-bold">{selected === q.correct ? '🎉 Correct! ' : '💡 Not quite — '}</span>
          {q.explanation}
        </div>
      )}

      {/* Buttons */}
      {!revealed ? (
        <button onClick={handleCheck} disabled={!selected}
          className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-bold transition-colors">
          Check Answer
        </button>
      ) : (
        <button onClick={handleNext}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-90 text-white py-3.5 rounded-xl font-bold transition-opacity">
          {current + 1 >= total ? 'See Results 🏆' : 'Next Question →'}
        </button>
      )}
    </div>
  )
}
