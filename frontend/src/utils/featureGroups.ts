export interface FieldDef {
  key: string
  label: string
  type: 'number' | 'select'
  options?: string[]
  step?: string
  min?: number
  max?: number
}

export interface FeatureGroup {
  id: string
  label: string
  icon: string
  fields: FieldDef[]
}

const US_STATES = [
  'AK','AL','AR','AZ','CA','CO','CT','DC','DE','FL','GA','HI',
  'IA','ID','IL','IN','KS','KY','LA','MA','MD','ME','MI','MN',
  'MO','MS','MT','NC','ND','NE','NH','NJ','NM','NV','NY','OH',
  'OK','OR','PA','RI','SC','SD','TN','TX','UT','VA','VT','WA',
  'WI','WV','WY',
]

function num(key: string, label?: string, step = 'any', min?: number, max?: number): FieldDef {
  return { key, label: label ?? toLabel(key), type: 'number', step, min, max }
}

function sel(key: string, options: string[], label?: string): FieldDef {
  return { key, label: label ?? toLabel(key), type: 'select', options }
}

export function toLabel(key: string): string {
  return key
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

export const FEATURE_GROUPS: FeatureGroup[] = [
  {
    id: 'profile',
    label: 'Customer Profile',
    icon: '👤',
    fields: [
      num('Current Age', 'Current Age', '1', 18, 100),
      num('Retirement Age', 'Retirement Age', '1', 18, 100),
      sel('Gender', ['Male', 'Female'], 'Gender'),
      sel('State', US_STATES, 'State'),
      num('FICO Score', 'FICO Score', '1', 300, 850),
      num('Num Credit Cards', 'Num Credit Cards', '1', 0, 50),
    ],
  },
  {
    id: 'financial',
    label: 'Financial Overview',
    icon: '💰',
    fields: [
      num('Per Capita Income - Zipcode', 'Per Capita Income (Zipcode)'),
      num('Yearly Income - Person', 'Yearly Income (Person)'),
      num('Total Debt', 'Total Debt'),
      num('debt_to_income', 'Debt-to-Income Ratio'),
      num('income_per_card', 'Income Per Card'),
      num('debt_per_card', 'Debt Per Card'),
      num('income_to_credit_limit_ratio', 'Income to Credit Limit Ratio'),
      num('fico_x_debt_to_income', 'FICO × Debt-to-Income'),
    ],
  },
  {
    id: 'cards',
    label: 'Card Portfolio',
    icon: '💳',
    fields: [
      num('num_active_cards', 'Active Cards', '1', 0),
      num('num_card_brands', 'Card Brands', '1', 0),
      num('total_credit_limit', 'Total Credit Limit'),
      num('avg_credit_limit', 'Avg Credit Limit'),
      num('avg_card_age_days', 'Avg Card Age (Days)', '1', 0),
      num('oldest_card_age_days', 'Oldest Card Age (Days)', '1', 0),
      num('pct_cards_with_chip', '% Cards With Chip', 'any', 0, 1),
      num('any_card_on_dark_web', 'Any Card on Dark Web', '1', 0, 1),
      num('card_age_at_first_use_gap', 'Card Age at First Use Gap'),
    ],
  },
  {
    id: 'behaviour',
    label: 'Transaction Behaviour',
    icon: '📊',
    fields: [
      num('txn_count', 'Transaction Count', '1', 0),
      num('total_spend', 'Total Spend'),
      num('avg_transaction_amount', 'Avg Transaction Amount'),
      num('median_transaction_amount', 'Median Transaction Amount'),
      num('max_transaction_amount', 'Max Transaction Amount'),
      num('std_transaction_amount', 'Std Transaction Amount'),
      num('amount_volatility', 'Amount Volatility'),
      num('high_value_transaction_ratio', 'High Value Transaction Ratio', 'any', 0, 1),
      num('days_since_first_txn', 'Days Since First Txn', '1', 0),
      num('days_since_last_txn', 'Days Since Last Txn', '1', 0),
      num('active_days', 'Active Days', '1', 0),
      num('transactions_7d', 'Transactions (7d)', '1', 0),
      num('spend_7d', 'Spend (7d)'),
      num('transactions_30d', 'Transactions (30d)', '1', 0),
      num('spend_30d', 'Spend (30d)'),
      num('transactions_90d', 'Transactions (90d)', '1', 0),
      num('spend_90d', 'Spend (90d)'),
      num('transactions_180d', 'Transactions (180d)', '1', 0),
      num('spend_180d', 'Spend (180d)'),
      num('recent_mean_amount', 'Recent Mean Amount'),
      num('historical_mean_amount', 'Historical Mean Amount'),
      num('historical_std_amount', 'Historical Std Amount'),
      num('unique_merchants', 'Unique Merchants', '1', 0),
      num('unique_mccs', 'Unique MCCs', '1', 0),
      num('chip_transaction_ratio', 'Chip Transaction Ratio', 'any', 0, 1),
      num('online_transaction_ratio', 'Online Transaction Ratio', 'any', 0, 1),
      num('swipe_transaction_ratio', 'Swipe Transaction Ratio', 'any', 0, 1),
      num('unique_states', 'Unique States', '1', 0),
      num('out_of_state_ratio', 'Out-of-State Ratio', 'any', 0, 1),
      num('night_transaction_ratio', 'Night Transaction Ratio', 'any', 0, 1),
      num('weekend_transaction_ratio', 'Weekend Transaction Ratio', 'any', 0, 1),
      num('txn_hour_std', 'Txn Hour Std'),
      num('hour_entropy', 'Hour Entropy'),
      num('years_to_retirement', 'Years to Retirement', '1'),
      num('credit_risk_proxy', 'Credit Risk Proxy'),
      num('spending_trend', 'Spending Trend'),
    ],
  },
  {
    id: 'risk',
    label: 'Risk Signals',
    icon: '⚠️',
    fields: [
      num('error_count', 'Error Count', '1', 0),
      num('error_rate', 'Error Rate', 'any', 0, 1),
      num('historical_fraud_count', 'Historical Fraud Count', '1', 0),
      num('historical_fraud_rate', 'Historical Fraud Rate', 'any', 0, 1),
      num('fraud_count_30d', 'Fraud Count (30d)', '1', 0),
      num('recent_spending_change', 'Recent Spending Change'),
      num('merchant_diversity_30d', 'Merchant Diversity (30d)', '1', 0),
      num('txn_count_ratio_30d_vs_180d', 'Txn Count Ratio 30d vs 180d'),
      num('amount_zscore_vs_own_history', 'Amount Z-Score vs Own History'),
      num('days_since_last_high_value_txn', 'Days Since Last High Value Txn', '1', 0),
      num('mcc_novelty_ratio_30d', 'MCC Novelty Ratio (30d)', 'any', 0, 1),
      num('state_novelty_ratio_30d', 'State Novelty Ratio (30d)', 'any', 0, 1),
      num('merchant_concentration', 'Merchant Concentration'),
      num('mcc_concentration', 'MCC Concentration'),
      num('historical_fraud_rate_x_days_since_last_txn', 'Fraud Rate × Days Since Last Txn'),
    ],
  },
]

export const ALL_FIELDS: FieldDef[] = FEATURE_GROUPS.flatMap((g) => g.fields)
