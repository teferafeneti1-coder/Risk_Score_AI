import { useEffect, useRef, useState } from 'react'

interface MetricCardProps {
  label: string
  value: number
  description: string
  icon: React.ReactNode
  format?: 'decimal' | 'percent'
}

function useCountUp(target: number, duration = 1200) {
  const [current, setCurrent] = useState(0)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const start = performance.now()
    function step(now: number) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCurrent(target * eased)
      if (progress < 1) rafRef.current = requestAnimationFrame(step)
    }
    rafRef.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafRef.current)
  }, [target, duration])

  return current
}

export default function MetricCard({ label, value, description, icon, format = 'decimal' }: MetricCardProps) {
  const animated = useCountUp(value)
  const display = format === 'percent'
    ? `${(animated * 100).toFixed(1)}%`
    : animated.toFixed(3)

  return (
    <div
      style={{
        borderRadius: 12,
        border: '1px solid rgba(255,255,255,0.08)',
        background: 'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(8px)',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        transition: 'border-color 0.25s, box-shadow 0.25s',
        cursor: 'default',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement
        el.style.borderColor = 'rgba(0,245,255,0.3)'
        el.style.boxShadow   = '0 0 24px rgba(0,245,255,0.08)'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement
        el.style.borderColor = 'rgba(255,255,255,0.08)'
        el.style.boxShadow   = 'none'
      }}
    >
      {/* Icon */}
      <div style={{
        width: 36, height: 36,
        borderRadius: 8,
        background: 'rgba(0,245,255,0.1)',
        border: '1px solid rgba(0,245,255,0.2)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#00f5ff',
      }}>
        {icon}
      </div>

      {/* Value */}
      <div style={{
        fontSize: 28,
        fontWeight: 800,
        letterSpacing: '-0.04em',
        color: '#ffffff',
        lineHeight: 1,
        fontVariantNumeric: 'tabular-nums',
      }}>
        {display}
      </div>

      {/* Label */}
      <div style={{ fontSize: 13, fontWeight: 600, color: '#ccc' }}>{label}</div>

      {/* Description */}
      <div style={{ fontSize: 11.5, color: '#9a9a9a', lineHeight: 1.5 }}>{description}</div>
    </div>
  )
}
