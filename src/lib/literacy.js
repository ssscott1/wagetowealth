import { MODULES } from '../data/modules'

export const TOTAL_MODULES = MODULES.length

// Best (highest) score achieved per module, keyed by module_id
export function bestScoresByModule(attempts = []) {
  const best = {}
  attempts.forEach(a => {
    best[a.module_id] = Math.max(best[a.module_id] || 0, a.score)
  })
  return best
}

// Financial Literacy Score (0–100).
// Rewards BOTH breadth (how many of the 18 modules completed) AND mastery
// (how well each was done). Each module not yet attempted contributes 0,
// so the score only reaches 100 when every module is completed with a top score.
//   score = sum(best score per module) / total modules
export function calcLiteracyScore(attempts = []) {
  const best = bestScoresByModule(attempts)
  const sum = Object.values(best).reduce((s, v) => s + v, 0)
  return Math.round(sum / TOTAL_MODULES)
}

export function literacyTier(score) {
  if (score >= 90) return { label: 'Expert', color: '#0F2B5B' }
  if (score >= 80) return { label: 'Confident', color: '#22c55e' }
  if (score >= 60) return { label: 'Capable', color: '#eab308' }
  if (score >= 40) return { label: 'Building', color: '#f97316' }
  return { label: 'Beginner', color: '#ef4444' }
}
