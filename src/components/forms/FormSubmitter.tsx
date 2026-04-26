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
      <div className="p-4 bg-[#E8F4D8] text-emerald-900 rounded-xl">
        Thanks! We&rsquo;ll be in touch.
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {(form.fields ?? []).map((f: any) => {
        const required = !!f.required
        const baseInput = 'w-full rounded-xl border border-zinc-200 p-3 focus:border-[var(--accent)] outline-none'
        return (
          <div key={f.id ?? f.name}>
            <label className="block text-sm font-medium mb-1">
              {f.label}
              {required && <span className="text-red-500"> *</span>}
            </label>
            {f.blockType === 'textarea' || f.blockType === 'message' ? (
              <textarea name={f.name} required={required} rows={5} className={baseInput} />
            ) : f.blockType === 'select' ? (
              <select name={f.name} required={required} defaultValue="" className={baseInput}>
                <option value="">--</option>
                {(f.options ?? []).map((o: any) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            ) : (
              <input
                name={f.name}
                type={f.blockType === 'email' ? 'email' : f.blockType === 'number' ? 'number' : 'text'}
                required={required}
                className={baseInput}
              />
            )}
          </div>
        )
      })}
      <button
        type="submit"
        disabled={state === 'submitting'}
        className="bg-[var(--accent)] hover:opacity-90 text-white font-semibold rounded-full px-6 py-3 disabled:opacity-60"
      >
        {state === 'submitting' ? '...' : (form.submitButtonLabel ?? 'Submit')}
      </button>
      {error && <div className="text-red-600 text-sm">{error}</div>}
    </form>
  )
}
