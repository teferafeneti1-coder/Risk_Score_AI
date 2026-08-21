import { useEffect, useRef } from 'react'

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260818_072341_50851634-bbc3-4c33-9acc-7647d4db44aa.mp4'

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)

  /* Entrance animation fallback */
  useEffect(() => {
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        sectionRef.current?.querySelectorAll('.appear').forEach((el) => {
          const anims = el.getAnimations()
          const active = anims.some(
            (a) => a.playState === 'running' || a.playState === 'finished',
          )
          if (!active) el.classList.add('is-in')
        })
      }),
    )
  }, [])

  return (
    <main
      ref={sectionRef}
      id="top"
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        padding: '8px 24px var(--hero-gap)',
        minHeight: 0,
        overflow: 'hidden',
      }}
    >
      {/* ── Full-bleed video background ── */}
      <video
        className="hero-video-bg"
        src={VIDEO_URL}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />

      {/* ── Bottom-centered copy ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          maxWidth: 'var(--copy-max)',
          width: '100%',
        }}
      >
        {/* Badge */}
        <div
          className="appear appear--pop"
          style={{ '--d': '0.22s' } as React.CSSProperties}
        >
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '22px',
              padding: '9px 15px',
              borderRadius: '5px',
              background: 'linear-gradient(90deg,#7d7d7d 0%,#2a2a2a 52%,#0a0a0a 100%)',
              color: '#f2f2f2',
              fontSize: 'var(--badge)',
              fontWeight: 400,
              letterSpacing: '-0.01em',
            }}
          >
            {/* Sparkle */}
            <svg
              className="badge-star"
              width="18"
              height="20"
              viewBox="0 0 24 24"
              fill="white"
              aria-hidden="true"
              style={{ filter: 'drop-shadow(0 0 3px rgba(255,255,255,0.45))', flexShrink: 0 }}
            >
              <path d="M12 2.6C12.55 2.6 12.88 3.15 13.08 4.7c.62 4.7 1.52 5.6 6.22 6.22 1.55.2 2.1.53 2.1 1.08s-.55.88-2.1 1.08c-4.7.62-5.6 1.52-6.22 6.22-.2 1.55-.53 2.1-1.08 2.1s-.88-.55-1.08-2.1c-.62-4.7-1.52-5.6-6.22-6.22C3.15 12.88 2.6 12.55 2.6 12s.55-.88 2.1-1.08c4.7-.62 5.6-1.52 6.22-6.22C11.12 3.15 11.45 2.6 12 2.6Z" />
            </svg>
            INSA AI Risk Intelligence Platform
          </span>
        </div>

        {/* H1 */}
        <h1
          className="hero-h1"
          style={{
            fontSize: 'var(--h1)',
            fontWeight: 500,
            letterSpacing: '-0.045em',
            lineHeight: 1.12,
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <span className="headline-line appear appear--mask" style={{ '--d': '0.42s' } as React.CSSProperties}>
            <em>AI-Powered</em> Fraud Risk
          </span>
          <span className="headline-line appear appear--mask" style={{ '--d': '0.62s' } as React.CSSProperties}>
            Intelligence Platform
          </span>
        </h1>

        {/* Lede */}
        <p
          className="appear appear--soft"
          style={{
            '--d': '0.82s',
            animationDuration: '1.25s',
            maxWidth: 'var(--lede-max)',
            marginTop: '18px',
            color: '#9a9a9a',
            fontSize: 'var(--lede)',
            fontWeight: 400,
            lineHeight: 1.55,
            letterSpacing: '-0.015em',
          } as React.CSSProperties}
        >
          Real-time transaction risk scoring powered by calibrated ML — protecting
          every customer, every transaction.
        </p>

        {/* CTAs */}
        <div
          className="appear appear--btn"
          style={{
            '--d': '0.96s',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '10px',
            marginTop: '26px',
          } as React.CSSProperties}
        >
          <a href="#analyser" className="btn btn-solid btn-hero">
            Analyse Transaction
          </a>
          <a
            href="#metrics"
            className="btn btn-hero-ghost btn-hero appear appear--side"
            style={{ '--d': '1.10s' } as React.CSSProperties}
          >
            View Model Metrics
          </a>
        </div>

        {/* Stats bar */}
        <footer
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '32px',
            marginTop: '48px',
            color: '#d8d8d8',
          }}
        >
          {[
            {
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="3" y="3" width="8" height="18" rx="2" fill="rgba(255,255,255,0.5)" />
                  <rect x="13" y="3" width="8" height="18" rx="2" fill="rgba(255,255,255,0.25)" />
                </svg>
              ),
              label: '72 features analysed per prediction',
              delay: '1.12s',
            },
            {
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="2.4" y="2.4" width="19.2" height="19.2" rx="6.2" fill="#ffffff" />
                  <path d="M12 7.1v7.4M8.15 12.35L12 16.2l3.85-3.85" stroke="#111" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ),
              label: '5 risk bands: Very Low → Very High',
              delay: '1.28s',
            },
            {
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" stroke="rgba(0,245,255,0.6)" strokeWidth="2" />
                  <path d="M12 8v4l3 2" stroke="#00f5ff" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              ),
              label: 'Isotonic calibration · threshold 0.14',
              delay: '1.44s',
            },
          ].map(({ icon, label, delay }) => (
            <div
              key={label}
              className="appear appear--stat"
              style={{
                '--d': delay,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: 'var(--stat-size)',
                letterSpacing: '-0.015em',
                whiteSpace: 'nowrap',
              } as React.CSSProperties}
            >
              {icon}
              {label}
            </div>
          ))}
        </footer>
      </div>
    </main>
  )
}
