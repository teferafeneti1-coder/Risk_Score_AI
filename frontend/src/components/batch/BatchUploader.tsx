import { useRef, useState } from 'react'
import { useBatchPredict, useBatchCsvDownload } from '../../hooks/useBatchPredict'
import BatchSummaryCard from './BatchSummaryCard'
import ResultsTable from './ResultsTable'
import Button from '../ui/Button'
import Spinner from '../ui/Spinner'

export default function BatchUploader() {
  const fileRef   = useRef<HTMLInputElement>(null)
  const [file, setFile]       = useState<File | null>(null)
  const [dragging, setDragging] = useState(false)

  const { mutate, isPending, data, error, reset } = useBatchPredict()
  const { mutate: downloadCsv, isPending: isDownloading } = useBatchCsvDownload()

  function handleFiles(files: FileList | null) {
    if (!files?.length) return
    const f = files[0]
    if (!f.name.toLowerCase().endsWith('.csv')) {
      alert('Please upload a .csv file.')
      return
    }
    setFile(f)
    mutate(f)
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragging(false)
    handleFiles(e.dataTransfer.files)
  }

  function handleReset() {
    reset()
    setFile(null)
    if (fileRef.current) fileRef.current.value = ''
  }

  const apiError = error
    ? ((error as { response?: { data?: { detail?: string } } }).response?.data?.detail ?? 'Batch prediction failed.')
    : null

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Drop zone */}
      {!data && (
        <div
          role="button"
          tabIndex={0}
          aria-label="Drop CSV file here or click to upload"
          onClick={() => fileRef.current?.click()}
          onKeyDown={(e) => e.key === 'Enter' && fileRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          style={{
            borderRadius: 14,
            border: `2px dashed ${dragging ? '#00f5ff' : 'rgba(255,255,255,0.2)'}`,
            background: dragging ? 'rgba(0,245,255,0.05)' : 'rgba(255,255,255,0.02)',
            padding: '40px 24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
            cursor: 'pointer',
            transition: 'border-color 0.2s, background 0.2s',
            textAlign: 'center',
          }}
        >
          <input
            ref={fileRef}
            type="file"
            accept=".csv"
            style={{ display: 'none' }}
            onChange={(e) => handleFiles(e.target.files)}
          />

          {isPending ? (
            <>
              <Spinner size={36} />
              <p style={{ color: '#9a9a9a', fontSize: 14 }}>
                Analysing {file?.name}…
              </p>
            </>
          ) : (
            <>
              {/* Upload icon */}
              <svg width="44" height="44" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" fill="rgba(0,245,255,0.08)" stroke="rgba(0,245,255,0.3)" strokeWidth="1.5" />
                <path d="M12 16V8M8.5 11.5L12 8l3.5 3.5" stroke="#00f5ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>

              <p style={{ color: '#fff', fontSize: 15, fontWeight: 600 }}>
                Drop CSV here or <span style={{ color: '#00f5ff', textDecoration: 'underline' }}>click to upload</span>
              </p>
              <p style={{ color: '#9a9a9a', fontSize: 12.5 }}>
                Must match the backend feature schema (72 columns + optional User column)
              </p>
            </>
          )}
        </div>
      )}

      {/* Error */}
      {apiError && (
        <div role="alert" style={{
          padding: '10px 14px',
          borderRadius: 8,
          background: 'rgba(239,68,68,0.1)',
          border: '1px solid rgba(239,68,68,0.3)',
          color: '#fca5a5',
          fontSize: 13,
        }}>
          {apiError}
          <button onClick={handleReset} style={{ marginLeft: 12, color: '#00f5ff', background: 'none', border: 'none', cursor: 'pointer', fontSize: 12 }}>
            Try again
          </button>
        </div>
      )}

      {/* Results */}
      {data && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }} aria-live="polite">
          <BatchSummaryCard summary={data.summary} />

          <div style={{
            borderRadius: 14,
            border: '1px solid var(--card-border)',
            background: 'var(--card-bg)',
            padding: '20px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, flexWrap: 'wrap', gap: 10 }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>
                All Predictions
                <span style={{ marginLeft: 8, fontSize: 12, fontWeight: 400, color: '#9a9a9a' }}>
                  ({data.results.length} rows)
                </span>
              </h3>

              {file && (
                <Button
                  variant="ghost"
                  isLoading={isDownloading}
                  onClick={() => downloadCsv(file)}
                  style={{ fontSize: 12.5 }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="mr-1.5">
                    <path d="M12 16V4M8 12l4 4 4-4M4 20h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Download CSV
                </Button>
              )}
            </div>

            <ResultsTable results={data.results} />
          </div>

          <Button variant="ghost" onClick={handleReset} style={{ alignSelf: 'flex-start', fontSize: 13 }}>
            ← Upload Another File
          </Button>
        </div>
      )}
    </div>
  )
}
