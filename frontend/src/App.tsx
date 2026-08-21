import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { PredictionResult } from './types/api'

import GrainOverlay from './components/layout/GrainOverlay'
import Header from './components/layout/Header'
import HeroSection from './components/layout/HeroSection'
import TransactionForm from './components/analyser/TransactionForm'
import ResultPanel from './components/result/ResultPanel'
import BatchUploader from './components/batch/BatchUploader'
import MetricsSection from './components/metrics/MetricsSection'
import Tabs from './components/ui/Tabs'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, staleTime: 30_000 },
  },
})

const TABS = [
  { id: 'single', label: 'Single Transaction', icon: '🔍' },
  { id: 'batch',  label: 'Batch Upload',        icon: '📂' },
]

function Dashboard() {
  const [activeTab, setActiveTab]       = useState<'single' | 'batch'>('single')
  const [result, setResult]             = useState<PredictionResult | null>(null)

  function handleResult(r: PredictionResult) {
    setResult(r)
    // Scroll result into view smoothly
    setTimeout(() => {
      document.getElementById('result-panel')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 80)
  }

  function handleReset() {
    setResult(null)
  }

  function handleTabChange(id: string) {
    setActiveTab(id as 'single' | 'batch')
    setResult(null)
  }

  return (
    <div style={{ background: '#000', color: '#fff', minHeight: '100vh', overflowX: 'hidden' }}>
      <GrainOverlay />
      <Header />

      {/* ── Hero ── */}
      <div className="hero-viewport" style={{ position: 'relative' }}>
        <HeroSection />
      </div>

      {/* ── Analyser section ── */}
      <section
        id="analyser"
        style={{
          padding: '56px 20px 48px',
          maxWidth: 900,
          margin: '0 auto',
          width: '100%',
        }}
        aria-labelledby="analyser-heading"
      >
        {/* Section header */}
        <div style={{ marginBottom: 28 }}>
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
            marginBottom: 12,
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.35C16.5 22.15 20 17.25 20 12V6L12 2z"/>
            </svg>
            Transaction Analyser
          </div>

          <h2
            id="analyser-heading"
            style={{
              fontSize: 'clamp(22px, 3vw, 32px)',
              fontWeight: 700,
              letterSpacing: '-0.04em',
              color: '#fff',
              marginBottom: 6,
            }}
          >
            Fraud Risk Prediction
          </h2>
          <p style={{ color: '#9a9a9a', fontSize: 13.5, maxWidth: 520, lineHeight: 1.6 }}>
            Enter transaction features manually or upload a CSV for batch analysis.
            The model returns a calibrated risk score and top feature drivers.
          </p>
        </div>

        {/* Tabs */}
        <div style={{ marginBottom: 24 }}>
          <Tabs tabs={TABS} active={activeTab} onChange={handleTabChange} />
        </div>

        {/* ── Single transaction ── */}
        {activeTab === 'single' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* Form — hide once result is shown */}
            {!result && <TransactionForm onResult={handleResult} />}

            {/* Result panel */}
            {result && (
              <div id="result-panel">
                <ResultPanel result={result} onReset={handleReset} />
              </div>
            )}
          </div>
        )}

        {/* ── Batch upload ── */}
        {activeTab === 'batch' && <BatchUploader />}
      </section>

      {/* ── Metrics section ── */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <MetricsSection />
      </div>

      {/* ── Footer ── */}
      <footer style={{
        padding: '20px 40px',
        borderTop: '1px solid rgba(255,255,255,0.07)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 12,
        color: '#555',
        fontSize: 12,
      }}>
        <span>INSA AI Risk Intelligence · LogisticRegression v1.0.0 · Isotonic Calibration</span>
        <span style={{ color: '#333' }}>Backend: FastAPI · Frontend: React + Tailwind CSS</span>
      </footer>
    </div>
  )
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Dashboard />
    </QueryClientProvider>
  )
}
