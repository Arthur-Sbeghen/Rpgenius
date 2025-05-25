import { Suspense } from "react";
import TablesList from "@/components/tables-list";
import { getData, Spinner } from "@/lib/utils";

export default function TablesPage() {
  const tablesPromise = getData("http://127.0.0.1:8000/api/mesas");

  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-12">
    <h1 className="text-4xl font-bold text-purple-300 mb-10">Mesas</h1>
    <Suspense fallback={<Spinner />}>
      <TablesList tablesPromise={tablesPromise}/>
    </Suspense>
    </main>
  );
}