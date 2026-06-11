import { useEffect, useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { supabase } from '../lib/supabase'
import { bestScoresByModule, TOTAL_MODULES } from '../lib/literacy'

const PASS_THRESHOLD = 60

export default function Certificate() {
  const { user, profile } = useAuth()
  const navigate = useNavigate()
  const [attempts, setAttempts] = useState(null)
  const [completedDate, setCompletedDate] = useState(null)
  const certRef = useRef(null)

  useEffect(() => {
    if (!profile?.id) return
    supabase
      .from('quiz_attempts')
      .select('module_id, score, completed_at')
      .eq('employee_id', profile.id)
      .order('completed_at', { ascending: false })
      .then(({ data }) => {
        setAttempts(data || [])
        // Find the date the last required module was completed
        if (data && data.length) {
          const best = bestScoresByModule(data)
          const passed = Object.entries(best).filter(([, s]) => s >= PASS_THRESHOLD)
          if (passed.length >= TOTAL_MODULES) {
            // Latest attempt that pushed completions to 18
            const lastAttempt = data.find(a => best[a.module_id] >= PASS_THRESHOLD)
            setCompletedDate(lastAttempt?.completed_at || new Date().toISOString())
          }
        }
      })
  }, [profile?.id])

  if (attempts === null) {
    return <div className="flex items-center justify-center min-h-64 text-gray-400 text-sm">Loading…</div>
  }

  const best = bestScoresByModule(attempts)
  const completedCount = Object.values(best).filter(s => s >= PASS_THRESHOLD).length

  if (completedCount < TOTAL_MODULES) {
    return (
      <div className="max-w-lg mx-auto px-4 py-16 text-center">
        <div className="text-5xl mb-4">🎓</div>
        <h1 className="text-2xl font-bold text-[#0F2B5B] mb-2">Certificate Not Yet Earned</h1>
        <p className="text-gray-500 mb-6">
          You've completed {completedCount} of {TOTAL_MODULES} modules. Finish all {TOTAL_MODULES} to earn your certificate.
        </p>
        <Link to="/dashboard" className="bg-[#0F2B5B] text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-[#1a3d7c] transition-colors">
          Back to Dashboard
        </Link>
      </div>
    )
  }

  const recipientName =
    profile?.preferred_name ||
    (profile?.first_name && profile?.last_name ? `${profile.first_name} ${profile.last_name}` : null) ||
    user?.email?.split('@')[0] ||
    'Valued Learner'

  const issueDate = completedDate
    ? new Date(completedDate).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })
    : new Date().toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })

  const avgScore = Math.round(
    Object.values(best).filter(s => s >= PASS_THRESHOLD).reduce((a, b) => a + b, 0) / TOTAL_MODULES
  )

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Actions */}
      <div className="flex items-center justify-between mb-6">
        <Link to="/dashboard" className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1">
          ← Back to Dashboard
        </Link>
        <button
          onClick={() => window.print()}
          className="bg-[#0F2B5B] text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[#1a3d7c] transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          Print / Save PDF
        </button>
      </div>

      {/* Certificate */}
      <div
        ref={certRef}
        className="cert-page bg-white relative overflow-hidden"
        style={{
          border: '2px solid #0F2B5B',
          borderRadius: '4px',
          padding: '0',
          aspectRatio: '1.414 / 1', // A4 landscape ratio
          display: 'flex',
          flexDirection: 'column',
          fontFamily: 'Georgia, "Times New Roman", serif',
        }}
      >
        {/* Gold outer border inset */}
        <div style={{
          position: 'absolute', inset: '10px',
          border: '1.5px solid #D4A017',
          borderRadius: '2px',
          pointerEvents: 'none',
          zIndex: 1,
        }} />

        {/* Top navy band */}
        <div style={{
          background: '#0F2B5B',
          padding: '18px 48px 14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          {/* Logo left */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: 36, height: 36,
              background: '#D4A017',
              borderRadius: 6,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 700, color: '#0F2B5B', fontSize: 16,
            }}>W</div>
            <span style={{ color: 'white', fontFamily: 'DM Sans, sans-serif', fontWeight: 700, fontSize: 15, letterSpacing: '0.02em' }}>
              Wages to Wealth
            </span>
          </div>

          {/* Ornamental right */}
          <div style={{ color: '#D4A017', fontSize: 22, letterSpacing: 8, opacity: 0.6 }}>✦ ✦ ✦</div>
        </div>

        {/* Body */}
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: '20px 56px 24px',
          textAlign: 'center',
          position: 'relative',
          zIndex: 2,
        }}>
          {/* Watermark */}
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 180, opacity: 0.03, userSelect: 'none', pointerEvents: 'none',
            color: '#0F2B5B',
            fontFamily: 'Georgia, serif',
          }}>🎓</div>

          <p style={{ fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#D4A017', marginBottom: 8, fontFamily: 'DM Sans, sans-serif' }}>
            Certificate of Completion
          </p>

          <div style={{ width: 60, height: 1.5, background: '#D4A017', marginBottom: 16 }} />

          <p style={{ fontSize: 13, color: '#555', marginBottom: 6, fontFamily: 'DM Sans, sans-serif' }}>
            This is to certify that
          </p>

          <h1 style={{
            fontSize: 'clamp(26px, 4vw, 42px)',
            fontWeight: 700,
            color: '#0F2B5B',
            margin: '4px 0 12px',
            fontFamily: 'Georgia, serif',
            letterSpacing: '0.01em',
            lineHeight: 1.1,
          }}>
            {recipientName}
          </h1>

          <p style={{ fontSize: 13, color: '#555', maxWidth: 480, lineHeight: 1.6, marginBottom: 8, fontFamily: 'DM Sans, sans-serif' }}>
            has successfully completed all <strong>{TOTAL_MODULES} modules</strong> of the
          </p>

          <h2 style={{
            fontSize: 'clamp(14px, 2vw, 20px)',
            fontWeight: 700,
            color: '#0F2B5B',
            margin: '0 0 8px',
            fontFamily: 'Georgia, serif',
            letterSpacing: '0.02em',
          }}>
            Financial Literacy Program
          </h2>

          <p style={{ fontSize: 12, color: '#888', marginBottom: 4, fontFamily: 'DM Sans, sans-serif' }}>
            Average quiz score: <strong style={{ color: '#0F2B5B' }}>{avgScore}%</strong>
          </p>

          <p style={{ fontSize: 10.5, color: '#aaa', fontStyle: 'italic', maxWidth: 420, lineHeight: 1.5, marginBottom: 16, fontFamily: 'DM Sans, sans-serif' }}>
            This is a non-accredited course. It provides general financial education and does not constitute a formal qualification or financial advice.
          </p>

          <div style={{ width: 60, height: 1.5, background: '#D4A017', marginBottom: 16 }} />

          {/* Signature row */}
          <div style={{ display: 'flex', gap: 64, justifyContent: 'center', alignItems: 'flex-end', width: '100%', maxWidth: 480 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ borderTop: '1px solid #ccc', paddingTop: 6 }}>
                <p style={{ fontSize: 11, color: '#555', fontFamily: 'DM Sans, sans-serif' }}>Date Completed</p>
                <p style={{ fontSize: 11, fontWeight: 700, color: '#0F2B5B', fontFamily: 'DM Sans, sans-serif' }}>{issueDate}</p>
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ borderTop: '1px solid #ccc', paddingTop: 6 }}>
                <p style={{ fontSize: 11, color: '#555', fontFamily: 'DM Sans, sans-serif' }}>Issued by</p>
                <p style={{ fontSize: 11, fontWeight: 700, color: '#0F2B5B', fontFamily: 'DM Sans, sans-serif' }}>Wages to Wealth</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom navy band */}
        <div style={{
          background: '#0F2B5B',
          padding: '10px 48px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <p style={{ fontSize: 9.5, color: 'rgba(255,255,255,0.4)', fontFamily: 'DM Sans, sans-serif' }}>
            www.wagestowealth.com.au
          </p>
          <p style={{ fontSize: 9.5, color: 'rgba(255,255,255,0.4)', fontFamily: 'DM Sans, sans-serif' }}>
            Sierra Bravo Capital Pty Ltd · General financial education only
          </p>
        </div>
      </div>

      {/* Print styles */}
      <style>{`
        @media print {
          body * { visibility: hidden; }
          .cert-page, .cert-page * { visibility: visible; }
          .cert-page {
            position: fixed !important;
            top: 0; left: 0;
            width: 100vw; height: 100vh;
            border-radius: 0 !important;
            border: none !important;
            margin: 0; padding: 0;
          }
        }
      `}</style>
    </div>
  )
}
