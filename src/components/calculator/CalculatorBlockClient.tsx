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

  const fields: Array<{ k: keyof Defaults; label: string; step: number }> = [
    { k: 'price', label: 'Home price', step: 1000 },
    { k: 'downPct', label: 'Down payment %', step: 0.5 },
    { k: 'ratePct', label: 'Interest rate %', step: 0.125 },
    { k: 'termYears', label: 'Term (years)', step: 5 },
    { k: 'taxesAnnual', label: 'Annual taxes', step: 100 },
    { k: 'insuranceAnnual', label: 'Annual insurance', step: 100 },
  ]

  return (
    <div className="bg-white rounded-2xl border border-zinc-200 p-6 grid gap-6 md:grid-cols-2">
      <div className="space-y-4">
        {fields.map(f => (
          <label key={f.k} className="block">
            <span className="text-sm font-medium">{f.label}</span>
            <input
              type="number"
              step={f.step}
              value={s[f.k]}
              onChange={e => setS({ ...s, [f.k]: Number(e.target.value) })}
              className="mt-1 w-full rounded-xl border border-zinc-200 p-3 focus:border-[var(--accent)] outline-none"
            />
          </label>
        ))}
      </div>
      <div className="bg-zinc-50 rounded-2xl p-6 self-start">
        <div className="text-sm text-zinc-600">Estimated monthly payment</div>
        <div className="text-4xl font-bold mt-1">{fmt(total)}</div>
        <div className="mt-2 text-sm text-zinc-600">
          P&amp;I: {fmt(pi)} • Taxes: {fmt(s.taxesAnnual / 12)} • Insurance: {fmt(s.insuranceAnnual / 12)}
        </div>
        <div className="mt-4 text-xs text-zinc-500">
          Estimate only. Final terms depend on credit, lender, and property.
        </div>
      </div>
    </div>
  )
}
