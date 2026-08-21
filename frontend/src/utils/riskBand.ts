import type { PredictionResult, RiskBand } from '../types/api'

export const BAND_COLOURS: Record<RiskBand, string> = {
  'Very Low':  '#22c55e',
  'Low':       '#84cc16',
  'Medium':    '#f59e0b',
  'High':      '#ef4444',
  'Very High': '#dc2626',
}

export const BAND_BG: Record<RiskBand, string> = {
  'Very Low':  'rgba(34,197,94,0.12)',
  'Low':       'rgba(132,204,22,0.12)',
  'Medium':    'rgba(245,158,11,0.12)',
  'High':      'rgba(239,68,68,0.12)',
  'Very High': 'rgba(220,38,38,0.15)',
}

export function getBandColour(band: RiskBand): string {
  return BAND_COLOURS[band] ?? '#9a9a9a'
}

export function getBandBg(band: RiskBand): string {
  return BAND_BG[band] ?? 'rgba(255,255,255,0.05)'
}

export function getBandFromScore(score: number): RiskBand {
  if (score <= 20) return 'Very Low'
  if (score <= 40) return 'Low'
  if (score <= 60) return 'Medium'
  if (score <= 80) return 'High'
  return 'Very High'
}

export function getInterpretationText(result: PredictionResult): string {
  const pct = (result.calibrated_probability * 100).toFixed(0)
  const band = result.risk_band
  const flagged = result.fraud_flag === 1

  const bandDesc: Record<RiskBand, string> = {
    'Very Low':  'very low fraud risk',
    'Low':       'low fraud risk',
    'Medium':    'moderate fraud risk',
    'High':      'high fraud risk',
    'Very High': 'very high fraud risk',
  }

  const action = flagged
    ? `The model flags this customer for review — the calibrated fraud probability of ${pct}% exceeds the decision threshold of ${(result.threshold_used * 100).toFixed(0)}%.`
    : `The calibrated fraud probability of ${pct}% is below the decision threshold of ${(result.threshold_used * 100).toFixed(0)}%, so no immediate flag is raised.`

  return `This customer presents ${bandDesc[band]} (score ${result.risk_score.toFixed(1)}/100). ${action}`
}
