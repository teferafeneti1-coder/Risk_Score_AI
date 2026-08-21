import { useEffect, useRef } from 'react'
import { useHealth } from '../../hooks/useHealth'

export default function Header() {
  const { status, data } = useHealth()
  const elRef = useRef<HTMLElement>(null)

  /* Entrance animation fallback */
  useEffect(() => {
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        elRef.current?.querySelectorAll('.appear').forEach((el) => {
          const anims = el.getAnimations()
          const active = anims.some((a) => a.playState === 'running' || a.playState === 'finished')
          if (!active) el.classList.add('is-in')
        })
      })
    )
  }, [])

  const isOnline  = status === 'online'
  const isOffline = status === 'offline'
  const dotColor  = isOnline ? '#22c55e' : isOffline ? '#ef4444' : '#9a9a9a'
  const badgeText = isOnline
    ? (data?.model_name ? 'SYSTEM SECURE: 24/7 ACTIVE' : 'SYSTEM SECURE: 24/7 ACTIVE')
    : isOffline ? 'SYSTEM OFFLINE'
    : 'CHECKING…'

  return (
    <header
      ref={elRef}
      role="banner"
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center',
        padding: 'var(--header-y) var(--header-x) 10px',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(0,0,0,0.78)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      {/* ── LEFT: INSA logo + title ── */}
      <div
        className="appear appear--scale"
        style={{ '--d': '0.08s' } as React.CSSProperties}
      >
        <a
          href="#top"
          aria-label="INSA AI Risk Intelligence — home"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            justifySelf: 'start',
            textDecoration: 'none',
          }}
        >
          {/* INSA Shield SVG mark */}
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            aria-hidden="true"
            style={{ flexShrink: 0 }}
          >
            <defs>
              <linearGradient id="shieldGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#00f5ff" />
                <stop offset="100%" stopColor="#0066ff" />
              </linearGradient>
            </defs>
            {/* Shield body */}
            <path
              d="M18 3L6 8v9c0 7.88 5.25 15.23 12 17.03C24.75 32.23 30 24.88 30 17V8L18 3z"
              fill="url(#shieldGrad)"
              opacity="0.9"
            />
            {/* Checkmark / lock symbol */}
            <path
              d="M13 18l3.5 3.5L23 14"
              stroke="#000"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* Title with cyan glow */}
          <span
            style={{
              fontSize: 'var(--logo)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              color: '#00f5ff',
              textShadow: '0 0 20px #00f5ff, 0 0 40px rgba(0,245,255,0.5)',
              lineHeight: 1.15,
            }}
          >
            INSA{' '}
            <span style={{ fontWeight: 400, color: '#ffffff', textShadow: 'none' }}>
              AI Risk Intelligence
            </span>
          </span>
        </a>
      </div>

      {/* ── CENTER: nav pills ── */}
      <nav
        id="site-nav"
        aria-label="Primary"
        className="hidden md:flex items-center gap-2"
        style={{ justifySelf: 'center' }}
      >
        {[
          { label: 'Analyser', href: '#analyser', delay: '0.16s', cls: 'appear--scale' },
          { label: 'Batch',    href: '#analyser', delay: '0.28s', cls: 'appear--soft'  },
          { label: 'Metrics',  href: '#metrics',  delay: '0.40s', cls: 'appear--scale' },
        ].map(({ label, href, delay, cls }) => (
          <a
            key={label}
            href={href}
            className={`nav-pill appear ${cls}`}
            style={{ '--d': delay } as React.CSSProperties}
          >
            {label}
          </a>
        ))}
      </nav>

      {/* ── RIGHT: operational status badge ── */}
      <div
        className="appear appear--scale"
        style={{
          '--d': '0.34s',
          justifySelf: 'end',
        } as React.CSSProperties}
      >
        <div
          role="status"
          aria-label={`Backend status: ${badgeText}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '7px 14px',
            borderRadius: '999px',
            background: 'rgba(0,0,0,0.55)',
            border: `1px solid ${isOnline ? 'rgba(34,197,94,0.35)' : isOffline ? 'rgba(239,68,68,0.35)' : 'rgba(255,255,255,0.12)'}`,
            backdropFilter: 'blur(8px)',
          }}
        >
          {/* Pulsing dot */}
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: dotColor,
              boxShadow: isOnline ? `0 0 8px ${dotColor}` : undefined,
              flexShrink: 0,
              animation: isOnline ? 'pulse-glow 2s ease-in-out infinite' : undefined,
            }}
            aria-hidden="true"
          />
          <span
            style={{
              fontSize: 11.5,
              fontWeight: 600,
              letterSpacing: '0.06em',
              color: isOnline ? '#22c55e' : isOffline ? '#ef4444' : '#9a9a9a',
              whiteSpace: 'nowrap',
            }}
          >
            {badgeText}
          </span>
        </div>
      </div>
    </header>
  )
}
