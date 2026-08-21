import type { BatchSummary } from '../../types/api'
import RiskBandPieChart from './RiskBandPieChart'

interface BatchSummaryCardProps {
  summary: BatchSummary
}

export default function BatchSummaryCard({ summary }: BatchSummaryCardProps) {
  const flagCount = summary.n_high_risk + summary.n_very_high_risk

  return (
    <div style={{
      borderRadius: 14,
      border: '1px solid var(--card-border)',
      background: 'var(--card-bg)',
      backdropFilter: 'blur(8px)',
      padding: '20px',
    }}>
      <h3 style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 16 }}>
        Batch Summary
      </h3>

      {/* Key stats row */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
        {[
          { label: 'Customers Analysed', value: summary.n_customers,                        color: '#00f5ff' },
          { label: 'Avg Risk Score',     value: summary.average_risk_score.toFixed(1),       color: '#f59e0b' },
          { label: 'Flagged (High+)',    value: flagCount,                                   color: '#ef4444' },
          { label: 'Clear (Low+)',       value: summary.n_very_low_risk + summary.n_low_risk, color: '#22c55e' },
        ].map(({ label, value, color }) => (
          <div key={label} style={{
            flex: '1 1 120px',
            padding: '12px 14px',
            borderRadius: 10,
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}>
            <div style={{ fontSize: 22, fontWeight: 800, color, letterSpacing: '-0.03em' }}>
              {value}
            </div>
            <div style={{ fontSize: 11.5, color: '#9a9a9a', marginTop: 2 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Donut chart */}
      <RiskBandPieChart summary={summary} />
    </div>
  )
}
