import { describe, it, expect } from 'vitest'
import { monthlyPI, piti, totalInterest, amortization } from './calculator.math'

describe('monthlyPI', () => {
  it('returns 0 when principal is 0', () => {
    expect(monthlyPI({ principal: 0, ratePct: 6, termYears: 30 })).toBe(0)
  })
  it('handles 0% interest as straight amortization', () => {
    expect(monthlyPI({ principal: 36000, ratePct: 0, termYears: 30 })).toBeCloseTo(100, 2)
  })
  it('matches a known case (350k at 6.5% over 30y ≈ $2212.24)', () => {
    expect(monthlyPI({ principal: 350000, ratePct: 6.5, termYears: 30 })).toBeCloseTo(2212.24, 1)
  })
  it('matches a 100k at 5% over 15y ≈ $790.79', () => {
    expect(monthlyPI({ principal: 100000, ratePct: 5, termYears: 15 })).toBeCloseTo(790.79, 1)
  })
})

describe('piti', () => {
  it('adds escrow', () => {
    const v = piti({
      principal: 350000, ratePct: 6.5, termYears: 30,
      taxesAnnual: 4200, insuranceAnnual: 1800,
    })
    expect(v).toBeCloseTo(2212.24 + 350 + 150, 1)
  })
})

describe('amortization', () => {
  it('produces a schedule that pays the loan to ~0', () => {
    const schedule = amortization({ principal: 100000, ratePct: 5, termYears: 15 })
    expect(schedule.length).toBe(15 * 12)
    expect(schedule[schedule.length - 1].balance).toBeCloseTo(0, 0)
  })
  it('all rows sum interest + principal ≈ monthly payment', () => {
    const schedule = amortization({ principal: 100000, ratePct: 5, termYears: 15 })
    const m = monthlyPI({ principal: 100000, ratePct: 5, termYears: 15 })
    for (const row of schedule.slice(0, 5)) {
      expect(row.interest + row.principal).toBeCloseTo(m, 5)
    }
  })
})

describe('totalInterest', () => {
  it('is positive for non-zero rates', () => {
    expect(totalInterest({ principal: 100000, ratePct: 5, termYears: 15 })).toBeGreaterThan(0)
  })
  it('is zero for 0% rates', () => {
    expect(totalInterest({ principal: 100000, ratePct: 0, termYears: 15 })).toBeCloseTo(0, 2)
  })
})
