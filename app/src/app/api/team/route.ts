// app/api/team/route.ts
import { NextResponse } from 'next/server'

const team = [
  { id: 1, name: 'Ana', role: 'Desenvolvedora' },
  { id: 2, name: 'Bruno', role: 'Designer' },
]

export async function GET() {
  return NextResponse.json(team)
}