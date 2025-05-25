"use client";

import { use } from "react";
import Link from "next/link";

interface Table {
  id: string;
  nome: string;
}

export default function TablesList({ tablesPromise }) {
    const tables: Table[] = use(tablesPromise);
    
    return (
        <ul className="space-y-4">
          {tables.map((tab) => (
            <li key={tab.id}>
              <Link
                href={`/table/${tab.id}`}
                className="block p-4 bg-gray-900 rounded-lg border border-purple-900 hover:border-purple-600 transition-colors hover:bg-gray-800"
              >
                <h2 className="text-xl font-medium text-purple-200">{tab.nome}</h2>
              </Link>
            </li>
          ))}
        </ul>
    );
}