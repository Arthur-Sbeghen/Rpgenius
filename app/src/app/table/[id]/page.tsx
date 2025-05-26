import { Suspense } from "react";
import TableView from "@/components/table-view";
import { getData, Spinner } from "@/lib/utils";
import Link from "next/link";
import { SP } from "next/dist/shared/lib/utils";

interface Props {
  params: { id: string };
}

export default function TablePage({ params }: Props) {
  const tablePromise = getData(`http://127.0.0.1:8000/api/mesas/${params.id}`);

  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-12">
        <Link 
            href="/table" 
            className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors mb-6"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Voltar
      </Link>
    <Suspense fallback={<Spinner/>}>
      <TableView tablePromise={tablePromise} />
    </Suspense>
    </main>
  );
}