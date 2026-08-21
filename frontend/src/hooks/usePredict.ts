import { useMutation } from '@tanstack/react-query'
import { predict } from '../api/client'
import type { SinglePredictRequest } from '../types/api'

export function usePredict() {
  return useMutation({
    mutationFn: (req: SinglePredictRequest) => predict(req),
  })
}
