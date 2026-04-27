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

  const fields: Array<{ k: keyof Defaults; label: string; step: number; suffix?: string }> = [
    { k: 'price', label: 'Home price', step: 1000, suffix: '$' },
    { k: 'downPct', label: 'Down payment', step: 0.5, suffix: '%' },
    { k: 'ratePct', label: 'Interest rate', step: 0.125, suffix: '%' },
    { k: 'termYears', label: 'Term', step: 5, suffix: 'yr' },
    { k: 'taxesAnnual', label: 'Annual taxes', step: 100, suffix: '$' },
    { k: 'insuranceAnnual', label: 'Annual insurance', step: 100, suffix: '$' },
  ]

  return (
    <div className="grid gap-12 md:grid-cols-12">
      <div className="space-y-7 md:col-span-7">
        <div className="kicker">Inputs</div>
        <hr className="rule" />
        <div className="grid grid-cols-2 gap-x-8 gap-y-6">
          {fields.map(f => (
            <label key={f.k} className="block">
              <span className="kicker block">{f.label}</span>
              <div className="mt-1 flex items-baseline gap-2 border-b border-[var(--color-hairline)] pb-2 transition-colors focus-within:border-[var(--color-leaf)]">
                {f.suffix === '$' && (
                  <span className="font-display italic text-[var(--color-ink-mute)]">$</span>
                )}
                <input
                  type="number"
                  step={f.step}
                  value={s[f.k]}
                  onChange={e => setS({ ...s, [f.k]: Number(e.target.value) })}
                  className="numeral w-full bg-transparent text-2xl tabular-nums text-[var(--color-ink)] outline-none"
                  style={{ fontWeight: 400 }}
                />
                {f.suffix && f.suffix !== '$' && (
                  <span className="font-display italic text-[var(--color-ink-mute)]">{f.suffix}</span>
                )}
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className="md:col-span-5">
        <div className="border border-[var(--color-hairline)] bg-[var(--color-paper)] p-8">
          <div className="kicker kicker--leaf">Estimated monthly</div>
          <div className="numeral mt-3 text-[clamp(3rem,7vw,5rem)] tabular-nums">{fmt(total)}</div>
          <hr className="rule mt-6" />
          <dl className="mt-6 space-y-3 font-mono text-[0.72rem] uppercase tracking-[0.15em] text-[var(--color-ink-soft)]">
            <div className="flex justify-between">
              <dt>P&amp;I</dt>
              <dd className="tabular-nums normal-case tracking-normal">{fmt(pi)}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Taxes / mo</dt>
              <dd className="tabular-nums normal-case tracking-normal">{fmt(s.taxesAnnual / 12)}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Insurance / mo</dt>
              <dd className="tabular-nums normal-case tracking-normal">{fmt(s.insuranceAnnual / 12)}</dd>
            </div>
          </dl>
          <p className="mt-8 font-mono text-[0.65rem] leading-relaxed text-[var(--color-ink-mute)]">
            Estimate only. Final terms depend on credit, lender, and property.
          </p>
        </div>
      </div>
    </div>
  )
}
