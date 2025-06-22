import { NextResponse } from "next/server";
import { api } from "@/lib/apiRequests";

// Não tenho 100% de ctz dq eu estou fazendo. Mas essas normas podem ser consultadas em
// https://nextjs.org/docs/app/building-your-application/routing/route-handlers

// O nome do arquivo route.ts e o nome das funções (GET, POST, PUT...) são
// obrigatórios para que o Next possa reconhecer automaticamente handlers de API

export async function GET() {
  try {
    const { data } = await api.get("/tables");
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { message: "Erro ao buscar as mesas", error: error.message },
      { status: 500 }
    );
  }
}

/* 
export async function POST() {
  ...
}
*/

// Talvez fosse bom fazer isso, mas da erro no catch das pages e cai no then
// pq ainda estaria retornando algo, no caso um objeto do erro. Ent desisti

// catch (error: any) {
//   // Se houver algum erro mandamos a mensagem de erro e o code http com a lib NextRespone
//   return NextResponse.json(
//     { message: "Erro ao buscar tabelas", error: error.message },
//     { status: 500 }
//   );
// }
