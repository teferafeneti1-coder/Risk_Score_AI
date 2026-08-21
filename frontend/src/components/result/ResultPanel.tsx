import type { PredictionResult } from '../../types/api'
import { getBandColour, getBandBg, getInterpretationText } from '../../utils/riskBand'
import RiskGauge from './RiskGauge'
import FeatureImportanceChart from './FeatureImportanceChart'
import Button from '../ui/Button'

interface ResultPanelProps {
  result: PredictionResult
  onReset: () => void
}

export default function ResultPanel({ result, onReset }: ResultPanelProps) {
  const colour  = getBandColour(result.risk_band)
  const bgTint  = getBandBg(result.risk_band)
  const flagged = result.fraud_flag === 1
  const interp  = getInterpretationText(result)

  return (
    <div
      role="region"
      aria-label="Prediction result"
      aria-live="polite"
      style={{
        animation: 'in-soft 0.6s cubic-bezier(0.16,1,0.3,1) both',
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
      }}
    >
      {/* ── Top card: gauge + key stats ── */}
      <div
        style={{
          borderRadius: 14,
          border: `1px solid ${colour}44`,
          background: bgTint,
          backdropFilter: 'blur(12px)',
          padding: '24px 20px',
        }}
      >
        {/* Gauge + fraud flag row */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 20,
          }}
        >
          <RiskGauge score={result.risk_score} band={result.risk_band} />

          {/* Stats column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, flex: 1, minWidth: 180 }}>
            {/* Fraud flag badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '10px 16px',
                borderRadius: 8,
                fontWeight: 700,
                fontSize: 14,
                letterSpacing: '0.04em',
                background: flagged ? 'rgba(239,68,68,0.15)' : 'rgba(34,197,94,0.12)',
                border: `1px solid ${flagged ? 'rgba(239,68,68,0.4)' : 'rgba(34,197,94,0.35)'}`,
                color: flagged ? '#fca5a5' : '#86efac',
              }}
            >
              {flagged ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" fill="#ef4444" opacity="0.3" stroke="#ef4444" strokeWidth="1.5" />
                    <line x1="12" y1="9" x2="12" y2="13" stroke="#fca5a5" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="12" cy="17" r="1" fill="#fca5a5" />
                  </svg>
                  FRAUD FLAGGED
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.35C16.5 22.15 20 17.25 20 12V6L12 2z" fill="#22c55e" opacity="0.25" stroke="#22c55e" strokeWidth="1.5" />
                    <path d="M9 12l2.5 2.5L15 9.5" stroke="#86efac" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  CLEAR
                </>
              )}
            </div>

            {/* Stat rows */}
            {[
              { label: 'Calibrated Probability', value: `${(result.calibrated_probability * 100).toFixed(1)}%` },
              { label: 'Raw Probability',         value: `${(result.raw_probability * 100).toFixed(1)}%` },
              { label: 'Decision Threshold',      value: `${(result.threshold_used * 100).toFixed(0)}%` },
              { label: 'Risk Score',              value: `${result.risk_score.toFixed(1)} / 100` },
            ].map(({ label, value }) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
                <span style={{ fontSize: 12.5, color: '#9a9a9a' }}>{label}</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#fff', whiteSpace: 'nowrap' }}>{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Interpretation */}
        <p
          style={{
            marginTop: 18,
            padding: '12px 14px',
            borderRadius: 8,
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            fontSize: 13,
            color: '#d4d4d4',
            lineHeight: 1.6,
          }}
        >
          {interp}
        </p>
      </div>

      {/* ── Feature importance chart ── */}
      {result.top_features && result.top_features.length > 0 && (
        <div
          style={{
            borderRadius: 14,
            border: '1px solid var(--card-border)',
            background: 'var(--card-bg)',
            backdropFilter: 'blur(8px)',
            padding: '20px',
          }}
        >
          <FeatureImportanceChart features={result.top_features} />
        </div>
      )}

      {/* ── Reset ── */}
      <Button
        variant="ghost"
        onClick={onReset}
        style={{ alignSelf: 'flex-start', fontSize: 13 }}
      >
        ← New Analysis
      </Button>
    </div>
  )
}
