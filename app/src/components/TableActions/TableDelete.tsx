"use client";

import React from "react";
import { api } from "@/lib/apiRequests";
import { Toast } from "@/components/Toast/Toast";
import { Alert } from "@/components/Alert/Alert";
import Cookies from "js-cookie";

interface TableDeleteProps {
  tableId: number;
  onDeleted?: () => void;
  className?: string;
}

export function TableDelete({
  tableId,
  onDeleted,
  className,
}: TableDeleteProps) {
  async function handleDelete() {
    const confirmed = await Alert.confirm(
      "Tem certeza que deseja excluir esta mesa?",
      {
        html: `<p>Esta ação não pode ser desfeita. Todas as fichas serão perdidas, inclusive as de jogadores e as suas.</p>`,
        title: "Excluir Mesa",
        confirmButtonText: "Sim, excluir",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#e74c3c",
        cancelButtonColor: "#8a2be2",
      }
    );

    if (confirmed) {
      try {
        await api.post(
          `/tables/delete/${tableId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("authToken")}`,
            },
          }
        );
        Toast.success("Mesa excluída com sucesso!");
        onDeleted?.();
      } catch (error: any) {
        if (error.response) {
          Toast.error(error.response.data.message);
        } else {
          Toast.error("Erro ao excluir mesa");
        }
      }
    }
  }

  return (
    <button className={className ?? "table-btn"} onClick={handleDelete}>
      <i className="fas fa-trash" style={{ marginRight: 8 }}></i>
      Excluir
    </button>
  );
}
