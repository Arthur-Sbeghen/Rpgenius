import { NextResponse } from "next/server";
import { api } from "@/lib/api";

export async function GET(
  _req: Request, // Parametro nao usado porem obrigatorio passar por primeiro pelo q entendi
  { params }: { params: { id: string } } // Extrai 'params' de '{ params: {id: string} }' e retorna só {id: x}
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
