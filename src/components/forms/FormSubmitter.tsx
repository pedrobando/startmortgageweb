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
      <div className="border-l-2 border-[var(--color-leaf)] bg-[var(--color-leaf-tint)] px-6 py-7">
        <div className="font-mono text-[0.7rem] uppercase tracking-[0.15em] text-[var(--color-leaf-deep)]">
          ★ Received
        </div>
        <p className="mt-3 font-display italic text-[1.3rem] leading-[1.4] text-[var(--color-ink)]">
          Thanks — we&rsquo;ll reach out within 24 hours.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="space-y-7">
      {(form.fields ?? []).map((f: any) => {
        const required = !!f.required
        return (
          <div key={f.id ?? f.name}>
            <label htmlFor={f.name} className="kicker block">
              {f.label}
              {required && <span className="ml-1 text-[var(--color-coral)]">*</span>}
            </label>
            {f.blockType === 'textarea' || f.blockType === 'message' ? (
              <textarea
                id={f.name}
                name={f.name}
                required={required}
                rows={4}
                className="field-line resize-none"
              />
            ) : f.blockType === 'select' ? (
              <select
                id={f.name}
                name={f.name}
                required={required}
                defaultValue=""
                className="field-line cursor-pointer"
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
                className="field-line"
              />
            )}
          </div>
        )
      })}
      <div className="pt-4">
        <button
          type="submit"
          disabled={state === 'submitting'}
          className="action-link disabled:opacity-50"
        >
          {state === 'submitting' ? 'Sending…' : (form.submitButtonLabel ?? 'Send')}
        </button>
      </div>
      {error && (
        <div className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-[var(--color-coral)]">
          ★ {error}
        </div>
      )}
    </form>
  )
}
