import type { FieldError, UseFormRegisterReturn } from 'react-hook-form'
import type { FieldDef } from '../../utils/featureGroups'

interface FieldInputProps {
  field: FieldDef
  registration: UseFormRegisterReturn
  error?: FieldError
}

export default function FieldInput({ field, registration, error }: FieldInputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={field.key}
        style={{
          fontSize: 11.5,
          color: error ? '#ef4444' : '#9a9a9a',
          letterSpacing: '-0.01em',
          fontWeight: 500,
        }}
      >
        {field.label}
      </label>

      {field.type === 'select' ? (
        <select
          id={field.key}
          className="field-input"
          aria-invalid={!!error}
          {...registration}
        >
          <option value="">Select…</option>
          {field.options?.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={field.key}
          type="number"
          step={field.step ?? 'any'}
          min={field.min}
          max={field.max}
          placeholder="0"
          className="field-input"
          aria-invalid={!!error}
          {...registration}
        />
      )}

      {error && (
        <span style={{ fontSize: 11, color: '#ef4444' }} role="alert">
          {error.message ?? 'Invalid value'}
        </span>
      )}
    </div>
  )
}
