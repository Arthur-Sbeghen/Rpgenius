import { NextResponse } from "next/server";

const team = [
  { id: 1, name: "Arthur", role: "Líder e desenvolvedor full-stack" },
  { id: 2, name: "Sarah", role: "Designer e desenvolvedora Frontend" },
  { id: 3, name: "Rômulo", role: "Desenvolvedor com ênfase em backend e DBA" },
  { id: 4, name: "Enrico", role: "Desenvolvedor full-stack" },
];

export async function GET() {
  return NextResponse.json(team);
}
