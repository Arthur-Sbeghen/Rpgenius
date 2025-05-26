"use client";

import { use } from "react";
import Link from "next/link";

interface Table {
  id: string;
  nome: string;
  desc: string;
  sys: string;
}

export default function TableView({ tablePromise }) {
    const table: Table = use(tablePromise);

    return (
        <div>
            <h1 className="text-4xl font-bold text-purple-300 mb-2">{table.nome}</h1>
            <h2 className="text-xl text-purple-200 mb-6">Sistema: {table.sys}</h2>
            <p className="text-lg text-gray-100 max-w-3xl leading-relaxed">{table.desc}</p>
        </div>
    )
}