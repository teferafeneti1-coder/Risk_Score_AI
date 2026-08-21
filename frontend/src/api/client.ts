import axios from 'axios'
import type {
  BatchPredictionResponse,
  HealthResponse,
  PredictionResult,
  SinglePredictRequest,
} from '../types/api'

// In dev: VITE_API_URL is unset → baseURL is '' → Vite proxy handles /predict & /health
// In production (Vercel): VITE_API_URL = your Render backend URL e.g. https://insa-fraud-api.onrender.com
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? '',
  headers: { 'Content-Type': 'application/json' },
})

export async function getHealth(): Promise<HealthResponse> {
  const { data } = await api.get<HealthResponse>('/health')
  return data
}

export async function predict(req: SinglePredictRequest): Promise<PredictionResult> {
  const { data } = await api.post<PredictionResult>('/predict', req)
  return data
}

export async function predictBatch(file: File): Promise<BatchPredictionResponse> {
  const form = new FormData()
  form.append('file', file)
  const { data } = await api.post<BatchPredictionResponse>('/predict/batch', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return data
}

export async function predictBatchCsv(file: File): Promise<Blob> {
  const form = new FormData()
  form.append('file', file)
  const { data } = await api.post<Blob>('/predict/batch/csv', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
    responseType: 'blob',
  })
  return data
}
