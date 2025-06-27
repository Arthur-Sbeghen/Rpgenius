import React from "react";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { Toast } from "../Toast/Toast";
import { api } from "@/lib/apiRequests";

interface TableEnterProps {
  onSuccess?: () => void;
}

export function TableEnter({ onSuccess }: TableEnterProps) {
  const handleEnter = async () => {
    const result = await Swal.fire({
      title: "Entrar em uma mesa",
      input: "text",
      inputLabel: "Digite o código da mesa:",
      inputPlaceholder: "Código da mesa",
      confirmButtonText: "Entrar",
      confirmButtonColor: "#8a2be2",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      background: "#232136",
      color: "#fff",
    });
    if (result.isConfirmed && result.value) {
      try {
        const token = Cookies.get("authToken");
        await api.post(
          "/tables/enter",
          { invite_code: result.value },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        Swal.fire({
          icon: "success",
          title: "Sucesso",
          theme: "dark",
          background: "#232136",
          color: "#fff",
          confirmButtonColor: "#8a2be2",
          confirmButtonText: "OK",
          showCancelButton: false,
          text: `Você entrou na mesa com sucesso!`,
        }).then(() => {
          if (onSuccess) onSuccess();
        });
      } catch (error: any) {
        Swal.fire({
          icon: "error",
          title: "Erro",
          background: "#232136",
          color: "#fff",
          confirmButtonColor: "#8a2be2",
          confirmButtonText: "OK",
          showCancelButton: false,
          text:
            error.response?.data?.message ||
            "Erro ao entrar na mesa. Verifique o código e tente novamente.",
        });
      }
    }
  };

  return (
    <button className="table-btn" onClick={handleEnter}>
      <i className="fas fa-door-open" style={{ marginRight: 8 }}></i>
      Juntar-se à mesas
    </button>
  );
}
