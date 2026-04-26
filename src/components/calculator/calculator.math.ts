type Args = {
  principal: number
  ratePct: number
  termYears: number
}

type ArgsWithEscrow = Args & {
  taxesAnnual: number
  insuranceAnnual: number
}

export function monthlyPI({ principal, ratePct, termYears }: Args): number {
  if (principal <= 0) return 0
  const n = termYears * 12
  if (n <= 0) return 0
  if (ratePct === 0) return principal / n
  const r = ratePct / 100 / 12
  return (principal * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1)
}

export function piti(args: ArgsWithEscrow): number {
  return monthlyPI(args) + (args.taxesAnnual ?? 0) / 12 + (args.insuranceAnnual ?? 0) / 12
}

type AmortRow = { month: number; interest: number; principal: number; balance: number }

export function amortization(args: Args): AmortRow[] {
  const n = args.termYears * 12
  const r = args.ratePct / 100 / 12
  const m = monthlyPI(args)
  let balance = args.principal
  const out: AmortRow[] = []
  for (let i = 1; i <= n; i++) {
    const interest = args.ratePct === 0 ? 0 : balance * r
    const principalPaid = m - interest
    balance = Math.max(0, balance - principalPaid)
    out.push({ month: i, interest, principal: principalPaid, balance })
  }
  return out
}

export function totalInterest(args: Args): number {
  return amortization(args).reduce((s, p) => s + p.interest, 0)
}
