"use client";

import React from "react";
import styles from "./tableCreateModal.module.css";
import { api } from "@/lib/apiRequests";
import { Toast } from "@/components/Toast/Toast";
import { Alert } from "@/components/Alert/Alert";
import Cookies from "js-cookie";

interface PlayerRemoveProps {
  playerId: number;
  tableId: number;
  onRemoved?: () => void;
  className?: string;
}

export function PlayerRemove({
  playerId,
  tableId,
  onRemoved,
  className,
}: PlayerRemoveProps) {
  async function handleRemove() {
    const confirmed = await Alert.confirm(
      "Tem certeza que deseja remover este jogador?",
      {
        title: "Remover Jogador",
        confirmButtonText: "Remover",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#8a2be2",
      }
    );

    if (confirmed.isConfirmed) {
      try {
        await api.post(
          `/tables/${tableId}/remove/${playerId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("authToken")}`,
            },
          }
        );
        Toast.success("Jogador removido com sucesso!");
        onRemoved?.();
      } catch (error: any) {
        if (error.response) {
          Toast.error(error.response.data.message);
        } else {
          Toast.error("Erro ao remover jogador");
        }
      }
    }
  }

  return (
    <button className={className ?? styles.playerBtn} onClick={handleRemove}>
      <i className="fas fa-user-minus" style={{ marginRight: 8 }}></i>
      Expulsar
    </button>
  );
}
export default PlayerRemove;
