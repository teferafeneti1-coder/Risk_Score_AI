import { useEffect, useRef } from 'react'
import type { RiskBand } from '../../types/api'
import { getBandColour } from '../../utils/riskBand'

interface RiskGaugeProps {
  score: number
  band: RiskBand
}

const R = 80        // arc radius
const CX = 100      // centre x
const CY = 95       // centre y (shifted up so semicircle looks centred)
const STROKE = 14   // track width

// Arc from 180° → 0° (left to right), converting to SVG path coords
function describeArc(cx: number, cy: number, r: number, startDeg: number, endDeg: number) {
  const toRad = (d: number) => (d * Math.PI) / 180
  const x1 = cx + r * Math.cos(toRad(startDeg))
  const y1 = cy + r * Math.sin(toRad(startDeg))
  const x2 = cx + r * Math.cos(toRad(endDeg))
  const y2 = cy + r * Math.sin(toRad(endDeg))
  const large = endDeg - startDeg > 180 ? 1 : 0
  return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`
}

const FULL_ARC = describeArc(CX, CY, R, 180, 0)   // full track
// circumference-equivalent for the semicircle
const SEMI_CIRC = Math.PI * R                       // ≈ 251.3

export default function RiskGauge({ score, band }: RiskGaugeProps) {
  const arcRef = useRef<SVGPathElement>(null)
  const colour = getBandColour(band)
  const clampedScore = Math.min(100, Math.max(0, score))
  const fillRatio = clampedScore / 100
  // dashoffset: start fully hidden (offset = length), animate to partially revealed
  const targetOffset = SEMI_CIRC * (1 - fillRatio)

  useEffect(() => {
    const el = arcRef.current
    if (!el) return
    // Start hidden then animate
    el.style.strokeDashoffset = String(SEMI_CIRC)
    const tid = requestAnimationFrame(() => {
      el.style.transition = 'stroke-dashoffset 1s ease-out'
      el.style.strokeDashoffset = String(targetOffset)
    })
    return () => cancelAnimationFrame(tid)
  }, [score, targetOffset])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <svg
        width="200"
        height="115"
        viewBox="0 0 200 115"
        role="img"
        aria-label={`Risk score ${score.toFixed(0)} out of 100, band ${band}`}
      >
        {/* Track */}
        <path
          d={FULL_ARC}
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth={STROKE}
          strokeLinecap="round"
        />

        {/* Filled arc */}
        <path
          ref={arcRef}
          d={FULL_ARC}
          fill="none"
          stroke={colour}
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={SEMI_CIRC}
          strokeDashoffset={SEMI_CIRC}
          style={{ filter: `drop-shadow(0 0 8px ${colour}88)` }}
        />

        {/* Score text */}
        <text
          x={CX}
          y={CY - 4}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#ffffff"
          fontSize="30"
          fontWeight="700"
          fontFamily="Inter, sans-serif"
          letterSpacing="-2"
        >
          {score.toFixed(0)}
        </text>

        {/* /100 sub-label */}
        <text
          x={CX}
          y={CY + 22}
          textAnchor="middle"
          fill="#9a9a9a"
          fontSize="11"
          fontFamily="Inter, sans-serif"
        >
          / 100
        </text>

        {/* Scale labels */}
        <text x="18" y={CY + 18} fill="#555" fontSize="9" fontFamily="Inter,sans-serif">0</text>
        <text x="175" y={CY + 18} fill="#555" fontSize="9" fontFamily="Inter,sans-serif">100</text>
      </svg>

      {/* Band label */}
      <span
        style={{
          fontSize: 22,
          fontWeight: 800,
          letterSpacing: '-0.03em',
          color: colour,
          textShadow: `0 0 16px ${colour}66`,
          marginTop: -4,
        }}
      >
        {band}
      </span>
      <span style={{ fontSize: 11.5, color: '#9a9a9a', marginTop: 4 }}>Risk Band</span>
    </div>
  )
}
