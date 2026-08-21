import { useState } from 'react'
import type { PredictionResult, RiskBand } from '../../types/api'
import { getBandColour, getBandBg } from '../../utils/riskBand'

interface ResultsTableProps {
  results: PredictionResult[]
}

type SortKey = 'customer_id' | 'risk_score' | 'risk_band' | 'fraud_flag'

const BAND_ORDER: Record<RiskBand, number> = {
  'Very Low': 0, Low: 1, Medium: 2, High: 3, 'Very High': 4,
}

export default function ResultsTable({ results }: ResultsTableProps) {
  const [sortKey, setSortKey]   = useState<SortKey>('risk_score')
  const [sortAsc, setSortAsc]   = useState(false)

  function handleSort(key: SortKey) {
    if (key === sortKey) setSortAsc((p) => !p)
    else { setSortKey(key); setSortAsc(false) }
  }

  const sorted = [...results].sort((a, b) => {
    let diff = 0
    if (sortKey === 'risk_score')   diff = a.risk_score - b.risk_score
    if (sortKey === 'fraud_flag')   diff = a.fraud_flag - b.fraud_flag
    if (sortKey === 'risk_band')    diff = BAND_ORDER[a.risk_band] - BAND_ORDER[b.risk_band]
    if (sortKey === 'customer_id')  diff = String(a.customer_id ?? '').localeCompare(String(b.customer_id ?? ''))
    return sortAsc ? diff : -diff
  })

  function SortIcon({ col }: { col: SortKey }) {
    if (col !== sortKey) return <span style={{ color: '#444' }}> ↕</span>
    return <span style={{ color: '#00f5ff' }}>{sortAsc ? ' ↑' : ' ↓'}</span>
  }

  const th = (label: string, col: SortKey) => (
    <th
      key={col}
      onClick={() => handleSort(col)}
      style={{
        padding: '10px 14px',
        textAlign: 'left',
        fontSize: 11.5,
        fontWeight: 600,
        color: '#9a9a9a',
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        userSelect: 'none',
      }}
    >
      {label}<SortIcon col={col} />
    </th>
  )

  return (
    <div style={{ overflowX: 'auto', borderRadius: 10, border: '1px solid var(--card-border)' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr>
            {th('Customer ID', 'customer_id')}
            {th('Risk Band',   'risk_band')}
            {th('Score',       'risk_score')}
            {th('Flagged',     'fraud_flag')}
          </tr>
        </thead>
        <tbody>
          {sorted.map((r, i) => {
            const colour = getBandColour(r.risk_band)
            const bg     = i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent'
            const rowBg  = r.fraud_flag ? 'rgba(239,68,68,0.05)' : getBandBg(r.risk_band)
            return (
              <tr key={i} style={{ background: r.fraud_flag ? rowBg : bg }}>
                {/* Customer ID */}
                <td style={{ padding: '9px 14px', color: '#d4d4d4', fontFamily: 'monospace', fontSize: 12.5 }}>
                  {r.customer_id ?? `#${i + 1}`}
                </td>

                {/* Band pill */}
                <td style={{ padding: '9px 14px' }}>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 5,
                    padding: '2px 10px',
                    borderRadius: 999,
                    fontSize: 11.5,
                    fontWeight: 600,
                    color: colour,
                    background: `${colour}18`,
                    border: `1px solid ${colour}33`,
                  }}>
                    {r.risk_band}
                  </span>
                </td>

                {/* Score mini bar */}
                <td style={{ padding: '9px 14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ flex: 1, height: 5, borderRadius: 3, background: 'rgba(255,255,255,0.08)', maxWidth: 80 }}>
                      <div style={{
                        width: `${r.risk_score}%`,
                        height: '100%',
                        borderRadius: 3,
                        background: colour,
                        transition: 'width 0.4s ease',
                      }} />
                    </div>
                    <span style={{ color: '#ccc', fontSize: 12, whiteSpace: 'nowrap' }}>
                      {r.risk_score.toFixed(1)}
                    </span>
                  </div>
                </td>

                {/* Flag icon */}
                <td style={{ padding: '9px 14px' }}>
                  {r.fraud_flag ? (
                    <span style={{ color: '#fca5a5', fontSize: 12.5, fontWeight: 600 }}>⚠ Yes</span>
                  ) : (
                    <span style={{ color: '#86efac', fontSize: 12.5 }}>✓ Clear</span>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
