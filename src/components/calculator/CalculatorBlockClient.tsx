'use client'
import { useMemo, useState } from 'react'
import { monthlyPI, piti } from './calculator.math'

type Defaults = {
  price: number
  downPct: number
  ratePct: number
  termYears: number
  taxesAnnual: number
  insuranceAnnual: number
}

const FALLBACK: Defaults = {
  price: 350000, downPct: 5, ratePct: 6.5, termYears: 30,
  taxesAnnual: 4200, insuranceAnnual: 1800,
}

export function CalculatorBlockClient({ defaults }: { defaults?: Partial<Defaults> }) {
  const [s, setS] = useState<Defaults>({ ...FALLBACK, ...(defaults ?? {}) })
  const principal = Math.max(0, s.price - s.price * (s.downPct / 100))
  const pi = useMemo(
    () => monthlyPI({ principal, ratePct: s.ratePct, termYears: s.termYears }),
    [principal, s.ratePct, s.termYears],
  )
  const total = useMemo(
    () => piti({ principal, ratePct: s.ratePct, termYears: s.termYears, taxesAnnual: s.taxesAnnual, insuranceAnnual: s.insuranceAnnual }),
    [principal, s.ratePct, s.termYears, s.taxesAnnual, s.insuranceAnnual],
  )
  const fmt = (n: number) =>
    n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

  const fields: Array<{ k: keyof Defaults; label: string; step: number; prefix?: string; suffix?: string }> = [
    { k: 'price', label: 'Home price', step: 1000, prefix: '$' },
    { k: 'downPct', label: 'Down payment', step: 0.5, suffix: '%' },
    { k: 'ratePct', label: 'Interest rate', step: 0.125, suffix: '%' },
    { k: 'termYears', label: 'Term', step: 5, suffix: 'yr' },
    { k: 'taxesAnnual', label: 'Taxes / yr', step: 100, prefix: '$' },
    { k: 'insuranceAnnual', label: 'Insurance / yr', step: 100, prefix: '$' },
  ]

  return (
    <div className="card overflow-hidden">
      <div className="grid md:grid-cols-12">
        <div className="grid grid-cols-2 gap-x-6 gap-y-5 p-6 md:col-span-7 md:p-10">
          {fields.map(f => (
            <label key={f.k} className="block">
              <span className="field-label">{f.label}</span>
              <div className="relative">
                {f.prefix && (
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-ink-mute)]">
                    {f.prefix}
                  </span>
                )}
                <input
                  type="number"
                  step={f.step}
                  value={s[f.k]}
                  onChange={e => setS({ ...s, [f.k]: Number(e.target.value) })}
                  className={`field-input tabular ${f.prefix ? 'pl-7' : ''} ${f.suffix ? 'pr-12' : ''}`}
                />
                {f.suffix && (
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[0.85rem] text-[var(--color-ink-mute)]">
                    {f.suffix}
                  </span>
                )}
              </div>
            </label>
          ))}
        </div>

        <div className="bg-[var(--color-canvas-soft)] p-6 md:col-span-5 md:p-10">
          <div className="text-[0.78rem] font-semibold uppercase tracking-[0.06em] text-[var(--color-ink-mute)]">
            Estimated monthly payment
          </div>
          <div className="mt-2 tabular text-[clamp(2.6rem,5vw,3.6rem)] font-bold leading-none tracking-[-0.025em]">
            {fmt(total)}
            <span className="text-[1rem] font-medium text-[var(--color-ink-mute)]">/mo</span>
          </div>
          <hr className="my-6 border-[var(--color-line)]" />
          <dl className="space-y-3 text-[0.92rem]">
            <div className="flex justify-between">
              <dt className="text-[var(--color-ink-mute)]">Principal & interest</dt>
              <dd className="tabular font-medium">{fmt(pi)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-[var(--color-ink-mute)]">Taxes / mo</dt>
              <dd className="tabular font-medium">{fmt(s.taxesAnnual / 12)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-[var(--color-ink-mute)]">Insurance / mo</dt>
              <dd className="tabular font-medium">{fmt(s.insuranceAnnual / 12)}</dd>
            </div>
          </dl>
          <p className="mt-6 text-[0.78rem] leading-relaxed text-[var(--color-ink-mute)]">
            Estimate only. Final terms depend on credit, lender, and property.
          </p>
        </div>
      </div>
    </div>
  )
}
