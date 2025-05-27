import { NextResponse } from "next/server";
import { api } from "@/lib/api";

export async function GET() {
  try {
    const { data } = await api.get("/tables");
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { message: "Erro ao buscar tabelas", error: error.message },
      { status: 500 }
    );
  }
}
