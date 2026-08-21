import { useMutation } from '@tanstack/react-query'
import { predictBatch, predictBatchCsv } from '../api/client'

export function useBatchPredict() {
  return useMutation({
    mutationFn: (file: File) => predictBatch(file),
  })
}

export function useBatchCsvDownload() {
  return useMutation({
    mutationFn: (file: File) => predictBatchCsv(file),
    onSuccess: (blob) => {
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'fraud_predictions.csv'
      a.click()
      URL.revokeObjectURL(url)
    },
  })
}
