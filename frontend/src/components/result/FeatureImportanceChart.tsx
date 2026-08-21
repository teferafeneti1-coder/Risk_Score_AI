import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, ReferenceLine,
} from 'recharts'
import type { FeatureImportance } from '../../types/api'

interface FeatureImportanceChartProps {
  features: FeatureImportance[]
}

function shortLabel(name: string): string {
  return name
    .replace(/num__/, '')
    .replace(/cat__/, '')
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .slice(0, 28)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null
  const { name, value } = payload[0].payload
  return (
    <div
      style={{
        background: 'rgba(10,10,10,0.95)',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: 8,
        padding: '8px 12px',
        fontSize: 12.5,
        color: '#fff',
      }}
    >
      <div style={{ color: '#9a9a9a', marginBottom: 2 }}>{name}</div>
      <div style={{ color: value >= 0 ? '#00f5ff' : '#ef4444', fontWeight: 600 }}>
        {value >= 0 ? '+' : ''}{value.toFixed(4)}
      </div>
    </div>
  )
}

export default function FeatureImportanceChart({ features }: FeatureImportanceChartProps) {
  if (!features.length) {
    return (
      <p style={{ color: '#9a9a9a', fontSize: 13, textAlign: 'center', padding: '16px 0' }}>
        Feature importance data not available for this model.
      </p>
    )
  }

  // Sort by absolute importance, keep top 12
  const sorted = [...features]
    .sort((a, b) => Math.abs(b.importance) - Math.abs(a.importance))
    .slice(0, 12)
    .map((f) => ({ name: shortLabel(f.feature), rawName: f.feature, value: f.importance }))
    .reverse() // bottom → top for readability

  const barHeight = 28
  const chartHeight = sorted.length * barHeight + 40

  return (
    <div>
      <h3
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: '#9a9a9a',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          marginBottom: 12,
        }}
      >
        Top Feature Importances
      </h3>
      <ResponsiveContainer width="100%" height={chartHeight}>
        <BarChart
          data={sorted}
          layout="vertical"
          margin={{ top: 4, right: 16, bottom: 4, left: 4 }}
        >
          <XAxis
            type="number"
            tick={{ fill: '#9a9a9a', fontSize: 11 }}
            axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
            tickLine={false}
            tickFormatter={(v) => v.toFixed(2)}
          />
          <YAxis
            type="category"
            dataKey="name"
            width={160}
            tick={{ fill: '#ccc', fontSize: 11.5 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
          <ReferenceLine x={0} stroke="rgba(255,255,255,0.2)" />
          <Bar dataKey="value" radius={[0, 4, 4, 0]} maxBarSize={20}>
            {sorted.map((entry, idx) => (
              <Cell
                key={idx}
                fill={entry.value >= 0 ? '#00f5ff' : '#ef4444'}
                opacity={0.85}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
