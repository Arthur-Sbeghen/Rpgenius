import { NextResponse } from "next/server";
import { api } from "@/lib/api";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { data } = await api.get(`/tables/${params.id}`);
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { message: "Erro ao buscar a tabela", error: error.message },
      { status: 500 }
    );
  }
}
