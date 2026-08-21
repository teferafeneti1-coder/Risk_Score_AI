import { useForm } from 'react-hook-form'
import type { PredictionResult } from '../../types/api'
import { FEATURE_GROUPS } from '../../utils/featureGroups'
import { SAMPLE_TRANSACTION } from '../../utils/sampleData'
import { usePredict } from '../../hooks/usePredict'
import FormPanel from './FormPanel'
import Button from '../ui/Button'

type FormValues = Record<string, string | number>

interface TransactionFormProps {
  onResult: (result: PredictionResult) => void
}

export default function TransactionForm({ onResult }: TransactionFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ defaultValues: {} })

  const { mutate, isPending, error } = usePredict()

  function onSubmit(data: FormValues) {
    const features: Record<string, string | number> = {}

    for (const [k, v] of Object.entries(data)) {
      // Skip completely empty / undefined values — let the backend's
      // missing-column check produce a clear error rather than sending nulls
      if (v === '' || v === null || v === undefined) continue

      const asNum = Number(v)
      // If the raw value is a non-empty string that parses as a valid number, coerce it
      features[k] = typeof v === 'string' && !isNaN(asNum) ? asNum : v
    }

    mutate({ features }, { onSuccess: onResult })
  }

  function loadSample() {
    reset(SAMPLE_TRANSACTION as FormValues)
  }

  // Parse 422 / 500 errors from the backend — show the real message
  const apiError: string | null = (() => {
    if (!error) return null
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const resp = (error as any)?.response
    const detail = resp?.data?.detail
    if (typeof detail === 'string') return detail
    if (Array.isArray(detail)) {
      // FastAPI validation array: [{loc, msg, type}]
      return detail.map((d: { msg?: string }) => d.msg ?? String(d)).join('; ')
    }
    return resp?.data?.message ?? (error as Error).message ?? 'Prediction failed. Check all required fields.'
  })()

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <p style={{ color: '#9a9a9a', fontSize: 13.5 }}>
          Fill in transaction features or load a sample to test the model.
        </p>
        <Button
          type="button"
          variant="ghost"
          onClick={loadSample}
          style={{ fontSize: 13 }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="mr-1.5">
            <path d="M9 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4M9 3h6M9 3v4m6-4v4M9 7h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Load Sample Data
        </Button>
      </div>

      {/* Feature groups */}
      <div className="flex flex-col gap-3 mb-5">
        {FEATURE_GROUPS.map((group, i) => (
          <FormPanel
            key={group.id}
            group={group}
            register={register}
            errors={errors}
            defaultOpen={i === 0}
          />
        ))}
      </div>

      {/* API error */}
      {apiError && (
        <div
          role="alert"
          style={{
            marginBottom: 16,
            padding: '10px 14px',
            borderRadius: 8,
            background: 'rgba(239,68,68,0.1)',
            border: '1px solid rgba(239,68,68,0.3)',
            color: '#fca5a5',
            fontSize: 13,
          }}
        >
          {apiError}
        </div>
      )}

      {/* Submit */}
      <Button
        type="submit"
        variant="cyber"
        isLoading={isPending}
        className="w-full"
        style={{ height: 48, fontSize: 15, fontWeight: 700, borderRadius: 10 }}
      >
        {!isPending && (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="mr-2">
            <path d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.35C16.5 22.15 20 17.25 20 12V6L12 2z" fill="currentColor" opacity="0.9" />
            <path d="M9 12l2.5 2.5L15 9.5" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
        {isPending ? 'Analysing…' : 'Analyse Risk'}
      </Button>
    </form>
  )
}
