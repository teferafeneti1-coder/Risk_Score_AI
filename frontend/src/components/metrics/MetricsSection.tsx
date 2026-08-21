import MetricCard from './MetricCard'

const METRICS = [
  {
    label: 'ROC-AUC',
    value: 0.6634763884528418,
    description: 'Area under the ROC curve. Measures the model\'s ability to discriminate fraud from non-fraud.',
    format: 'decimal' as const,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M3 18C7 18 7 6 12 6s5 12 9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: 'F1 Score',
    value: 0.31627906976744186,
    description: 'Harmonic mean of precision and recall at the 0.14 decision threshold.',
    format: 'decimal' as const,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: 'Precision',
    value: 0.24519230769230768,
    description: 'Of all transactions flagged as fraud, this fraction were truly fraudulent.',
    format: 'decimal' as const,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.35C16.5 22.15 20 17.25 20 12V6L12 2z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: 'Recall',
    value: 0.44541484716157204,
    description: 'Fraction of actual fraud cases that the model successfully identified.',
    format: 'decimal' as const,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: 'Brier Score',
    value: 0.1168681875273888,
    description: 'Mean squared error of calibrated probabilities. Lower is better (0 = perfect).',
    format: 'decimal' as const,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
]

export default function MetricsSection() {
  return (
    <section
      id="metrics"
      style={{
        padding: '64px 40px',
        maxWidth: 1100,
        margin: '0 auto',
        width: '100%',
      }}
      aria-labelledby="metrics-heading"
    >
      {/* Section header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          padding: '5px 12px',
          borderRadius: 5,
          background: 'rgba(0,245,255,0.08)',
          border: '1px solid rgba(0,245,255,0.2)',
          color: '#00f5ff',
          fontSize: 11.5,
          fontWeight: 600,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginBottom: 14,
        }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2.6C12.55 2.6 12.88 3.15 13.08 4.7c.62 4.7 1.52 5.6 6.22 6.22 1.55.2 2.1.53 2.1 1.08s-.55.88-2.1 1.08c-4.7.62-5.6 1.52-6.22 6.22-.2 1.55-.53 2.1-1.08 2.1s-.88-.55-1.08-2.1c-.62-4.7-1.52-5.6-6.22-6.22C3.15 12.88 2.6 12.55 2.6 12s.55-.88 2.1-1.08c4.7-.62 5.6-1.52 6.22-6.22C11.12 3.15 11.45 2.6 12 2.6Z"/>
          </svg>
          Model Performance
        </div>

        <h2
          id="metrics-heading"
          style={{
            fontSize: 'clamp(24px, 3vw, 36px)',
            fontWeight: 700,
            letterSpacing: '-0.04em',
            color: '#fff',
            lineHeight: 1.15,
            marginBottom: 8,
          }}
        >
          Test Set Metrics
        </h2>
        <p style={{ color: '#9a9a9a', fontSize: 14, maxWidth: 520, lineHeight: 1.6 }}>
          Evaluated on a held-out test set using the calibrated LogisticRegression model
          with isotonic regression calibration at a decision threshold of 0.14.
        </p>
      </div>

      {/* Metric cards grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
        gap: 16,
        marginBottom: 32,
      }}>
        {METRICS.map((m) => (
          <MetricCard key={m.label} {...m} />
        ))}
      </div>

      {/* Model metadata strip */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 10,
        padding: '16px 20px',
        borderRadius: 10,
        border: '1px solid rgba(255,255,255,0.08)',
        background: 'rgba(255,255,255,0.02)',
      }}>
        {[
          { label: 'Model',        value: 'LogisticRegression (snapshot-weighted)' },
          { label: 'Version',      value: '1.0.0'    },
          { label: 'Calibration',  value: 'Isotonic' },
          { label: 'Threshold',    value: '0.14'     },
          { label: 'Features',     value: '72 raw → 125 preprocessed' },
        ].map(({ label, value }) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 11.5, color: '#9a9a9a' }}>{label}:</span>
            <span style={{
              fontSize: 11.5,
              fontWeight: 600,
              color: '#ccc',
              padding: '2px 8px',
              borderRadius: 4,
              background: 'rgba(255,255,255,0.06)',
            }}>{value}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
