import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import type { BatchSummary } from '../../types/api'
import { BAND_COLOURS } from '../../utils/riskBand'
import type { RiskBand } from '../../types/api'

interface RiskBandPieChartProps {
  summary: BatchSummary
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null
  const { name, value } = payload[0]
  return (
    <div style={{
      background: 'rgba(10,10,10,0.95)',
      border: '1px solid rgba(255,255,255,0.12)',
      borderRadius: 8,
      padding: '8px 12px',
      fontSize: 12.5,
      color: '#fff',
    }}>
      <span style={{ color: '#9a9a9a' }}>{name}: </span>
      <strong>{value}</strong>
    </div>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomLegend({ payload }: any) {
  return (
    <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 16px', justifyContent: 'center', padding: 0, margin: 0, listStyle: 'none' }}>
      {payload.map((entry: { color: string; value: string }, i: number) => (
        <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#ccc' }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: entry.color, display: 'inline-block', flexShrink: 0 }} />
          {entry.value}
        </li>
      ))}
    </ul>
  )
}

export default function RiskBandPieChart({ summary }: RiskBandPieChartProps) {
  const rawData = [
    { name: 'Very Low'  as RiskBand, value: summary.n_very_low_risk  },
    { name: 'Low'       as RiskBand, value: summary.n_low_risk       },
    { name: 'Medium'    as RiskBand, value: summary.n_medium_risk    },
    { name: 'High'      as RiskBand, value: summary.n_high_risk      },
    { name: 'Very High' as RiskBand, value: summary.n_very_high_risk },
  ]
  const data = rawData.filter((d) => d.value > 0)

  return (
    <ResponsiveContainer width="100%" height={240}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="45%"
          innerRadius={58}
          outerRadius={88}
          paddingAngle={3}
          dataKey="value"
          nameKey="name"
          strokeWidth={0}
        >
          {data.map((entry, i) => (
            <Cell key={i} fill={BAND_COLOURS[entry.name]} opacity={0.88} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend content={<CustomLegend />} />
      </PieChart>
    </ResponsiveContainer>
  )
}
