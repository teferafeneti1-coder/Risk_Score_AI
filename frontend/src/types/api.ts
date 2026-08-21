export type RiskBand = 'Very Low' | 'Low' | 'Medium' | 'High' | 'Very High'

export interface FeatureImportance {
  feature: string
  importance: number
}

export interface PredictionResult {
  customer_id: string | number | null
  raw_probability: number
  calibrated_probability: number
  risk_score: number
  risk_band: RiskBand
  fraud_flag: 0 | 1
  threshold_used: number
  top_features?: FeatureImportance[]
}

export interface BatchSummary {
  n_customers: number
  n_very_low_risk: number
  n_low_risk: number
  n_medium_risk: number
  n_high_risk: number
  n_very_high_risk: number
  average_risk_score: number
}

export interface BatchPredictionResponse {
  summary: BatchSummary
  results: PredictionResult[]
}

export interface HealthResponse {
  status: string
  model_name: string
  model_version: string
  calibration_method: string
  decision_threshold: number
}

export interface SinglePredictRequest {
  features: Record<string, number | string>
}
