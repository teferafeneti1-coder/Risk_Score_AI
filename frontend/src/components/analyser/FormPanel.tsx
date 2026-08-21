import { useState } from 'react'
import type { FieldErrors, UseFormRegister } from 'react-hook-form'
import type { FeatureGroup } from '../../utils/featureGroups'
import FieldInput from './FieldInput'

interface FormPanelProps {
  group: FeatureGroup
  register: UseFormRegister<Record<string, string | number>>
  errors: FieldErrors<Record<string, string | number>>
  defaultOpen?: boolean
}

export default function FormPanel({ group, register, errors, defaultOpen = false }: FormPanelProps) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div
      style={{
        borderRadius: 10,
        border: '1px solid var(--card-border)',
        background: 'var(--card-bg)',
        backdropFilter: 'blur(8px)',
        borderLeft: open ? '3px solid #00f5ff' : '3px solid rgba(0,245,255,0.2)',
        transition: 'border-left-color 0.25s',
        overflow: 'hidden',
      }}
    >
      {/* Panel header */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '13px 16px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: '#fff',
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: 600, fontSize: 14 }}>
          <span style={{ fontSize: 16 }}>{group.icon}</span>
          {group.label}
          <span
            style={{
              fontSize: 11,
              fontWeight: 400,
              color: '#9a9a9a',
              background: 'rgba(255,255,255,0.07)',
              borderRadius: 4,
              padding: '1px 7px',
            }}
          >
            {group.fields.length} fields
          </span>
        </span>

        {/* Chevron */}
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          style={{
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s',
            flexShrink: 0,
          }}
        >
          <path d="M6 9l6 6 6-6" stroke="#9a9a9a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Fields grid */}
      {open && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: 12,
            padding: '4px 16px 16px',
          }}
        >
          {group.fields.map((f) => (
            <FieldInput
              key={f.key}
              field={f}
              registration={register(f.key, {
                setValueAs: (v) => {
                  if (f.type === 'select') return v
                  if (v === '' || v === null || v === undefined) return ''
                  const n = Number(v)
                  return isNaN(n) ? v : n
                },
              })}
              error={errors[f.key] as import('react-hook-form').FieldError | undefined}
            />
          ))}
        </div>
      )}
    </div>
  )
}
