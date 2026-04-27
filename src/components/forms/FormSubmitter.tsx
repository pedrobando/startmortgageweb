'use client'
import { useState } from 'react'

type FormDoc = {
  id: string | number
  fields?: any[]
  submitButtonLabel?: string
  confirmationMessage?: any
}

export function FormSubmitter({ form }: { form: FormDoc | null | undefined }) {
  const [state, setState] = useState<'idle' | 'submitting' | 'ok' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)
  if (!form) return null

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setState('submitting')
    setError(null)
    const fd = new FormData(e.currentTarget)
    const submissionData = (form.fields ?? []).map((f: any) => ({
      field: f.name,
      value: (fd.get(f.name) as string) ?? '',
    }))
    try {
      const res = await fetch('/api/form-submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ form: form.id, submissionData }),
      })
      if (!res.ok) throw new Error(`Status ${res.status}`)
      setState('ok')
    } catch (err: any) {
      setError(err?.message ?? 'Submission failed')
      setState('error')
    }
  }

  if (state === 'ok') {
    return (
      <div className="rounded-xl border border-[var(--color-leaf)] bg-[var(--color-leaf-tint)] px-6 py-7">
        <div className="text-[0.78rem] font-semibold uppercase tracking-[0.06em] text-[var(--color-leaf-deep)]">
          ★ Received
        </div>
        <p className="mt-2 text-[1.05rem] font-medium leading-[1.4] text-[var(--color-ink)]">
          Thanks &mdash; we&rsquo;ll reach out within 24 hours.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {(form.fields ?? []).map((f: any) => {
        const required = !!f.required
        return (
          <div key={f.id ?? f.name}>
            <label htmlFor={f.name} className="field-label">
              {f.label}
              {required && <span className="ml-1 text-[var(--color-coral)]">*</span>}
            </label>
            {f.blockType === 'textarea' || f.blockType === 'message' ? (
              <textarea
                id={f.name}
                name={f.name}
                required={required}
                rows={4}
                className="field-input resize-none"
              />
            ) : f.blockType === 'select' ? (
              <select
                id={f.name}
                name={f.name}
                required={required}
                defaultValue=""
                className="field-input cursor-pointer"
              >
                <option value="">Choose one</option>
                {(f.options ?? []).map((o: any) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            ) : (
              <input
                id={f.name}
                name={f.name}
                type={f.blockType === 'email' ? 'email' : f.blockType === 'number' ? 'number' : 'text'}
                required={required}
                className="field-input"
              />
            )}
          </div>
        )
      })}
      <button
        type="submit"
        disabled={state === 'submitting'}
        className="btn-primary w-full justify-center disabled:opacity-50"
      >
        {state === 'submitting' ? 'Sending…' : (form.submitButtonLabel ?? 'Send')}
        <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden>
          <path
            d="M3 8h10M9 4l4 4-4 4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {error && (
        <div className="text-[0.85rem] text-[var(--color-coral)]">★ {error}</div>
      )}
    </form>
  )
}
