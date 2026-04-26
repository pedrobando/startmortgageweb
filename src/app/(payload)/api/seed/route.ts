import { NextRequest } from 'next/server'
import { runSeed } from '@/seed'

export async function POST(req: NextRequest) {
  const auth = req.headers.get('authorization') || ''
  const token = auth.replace(/^Bearer\s+/i, '')
  if (!process.env.SEED_SECRET || token !== process.env.SEED_SECRET) {
    return new Response('Unauthorized', { status: 401 })
  }
  try {
    const report = await runSeed()
    return Response.json(report)
  } catch (err: any) {
    return Response.json(
      { error: String(err?.message ?? err) },
      { status: 500 },
    )
  }
}
