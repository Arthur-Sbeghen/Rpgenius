"use client";

import React from "react";
import { api } from "@/lib/apiRequests";
import { Toast } from "@/components/Toast/Toast";
import { Alert } from "@/components/Alert/Alert";
import Cookies from "js-cookie";

interface TableLeaveProps {
  tableId: number;
  onLeft?: () => void;
  className?: string;
}

export function TableLeave({ tableId, onLeft, className }: TableLeaveProps) {
  async function handleLeave() {
    const confirmed = await Alert.confirm(
      "Tem certeza que deseja sair da mesa?",
      {
        title: "Sair da Mesa",
        confirmButtonText: "Sair",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#8a2be2",
      }
    );

    if (confirmed.isConfirmed) {
      try {
        await api.post(
          `/tables/${tableId}/leave`,
          {},
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("authToken")}`,
            },
          }
        );
        Toast.success("Você saiu da mesa com sucesso!");
        onLeft?.();
      } catch (error: any) {
        if (error.response) {
          Toast.error(error.response.data.message);
        } else {
          Toast.error("Erro ao sair da mesa");
        }
      }
    }
  }

  return (
    <button className={className ?? "leave-btn"} onClick={handleLeave}>
      <i className="fas fa-sign-out-alt" style={{ marginRight: 8 }}></i>
      Sair da Mesa
    </button>
  );
}
export default TableLeave;
