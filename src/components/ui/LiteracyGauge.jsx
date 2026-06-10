export default function LiteracyGauge({ score = 0 }) {
  const tiers = [
    { label: 'Beginner', min: 0, max: 39, color: '#D4A017' },
    { label: 'Building', min: 40, max: 59, color: '#f59e0b' },
    { label: 'Capable', min: 60, max: 79, color: '#eab308' },
    { label: 'Confident', min: 80, max: 89, color: '#22c55e' },
    { label: 'Expert', min: 90, max: 100, color: '#0F2B5B' },
  ]

  const tier = tiers.find(t => score >= t.min && score <= t.max) || tiers[0]
  const angle = -90 + (score / 100) * 180

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-48 h-24 overflow-hidden">
        <svg viewBox="0 0 200 100" className="w-full">
          {/* Background arc */}
          <path d="M 10 100 A 90 90 0 0 1 190 100" fill="none" stroke="#e5e7eb" strokeWidth="16" strokeLinecap="round" />
          {/* Score arc */}
          <path
            d="M 10 100 A 90 90 0 0 1 190 100"
            fill="none"
            stroke={tier.color}
            strokeWidth="16"
            strokeLinecap="round"
            strokeDasharray={`${(score / 100) * 283} 283`}
          />
          {/* Needle */}
          <line
            x1="100" y1="100"
            x2={100 + 70 * Math.cos((angle * Math.PI) / 180)}
            y2={100 + 70 * Math.sin((angle * Math.PI) / 180)}
            stroke="#0F2B5B"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="100" cy="100" r="6" fill="#0F2B5B" />
        </svg>
      </div>
      <div className="text-center -mt-2">
        <div className="text-4xl font-bold text-[#0F2B5B]" style={{ fontFamily: 'DM Sans, sans-serif' }}>{score}</div>
        <div className="text-sm font-semibold mt-0.5" style={{ color: tier.color }}>{tier.label}</div>
        <div className="text-xs text-gray-400 mt-0.5">out of 100</div>
      </div>
    </div>
  )
}
