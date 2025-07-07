"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { api } from "@/lib/apiRequests";
import styles from "../tableCreateModal.module.css";
import Loader from "../../Loader/Loader";
import { Toast } from "../../Toast/Toast";
import { useRouter } from "next/navigation";

interface System {
  id: number;
  name: string;
}

interface TableCreateModalProps {
  onClose: () => void;
  onSuccess?: () => void;
  systems: Array<{ id: number; name: string }>;
  loadingSystems: boolean;
}

const tableSchema = yup.object().shape({
  name: yup
    .string()
    .required("Nome da mesa é obrigatório")
    .min(3, "Mínimo 3 caracteres")
    .max(50, "Máximo de 50 caracteres"),
  playerLimit: yup
    .number()
    .required("Limite de jogadores é obrigatório")
    .min(1, "Mínimo 1 jogador")
    .max(10, "Máximo 10 jogadores"),
  idSystem: yup.string().required("Selecione um sistema"),
});

type FormData = yup.InferType<typeof tableSchema>;

export const TableCreateModal = ({
  onClose,
  onSuccess,
}: TableCreateModalProps) => {
  const [systems, setSystems] = useState<System[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(tableSchema),
    defaultValues: {
      name: "",
      playerLimit: 5,
      idSystem: "",
    },
  });

  const playerLimitValue = watch("playerLimit");

  const handleDragStart = () => setIsDragging(true);
  const handleDragEnd = () => setIsDragging(false);

  useEffect(() => {
    const fetchSystems = async () => {
      try {
        const response = await api.get("/tables/system/list", {
          headers: {
            Authorization: `Bearer ${Cookies.get("authToken")}`,
          },
        });
        setSystems(response.data);
      } catch (error) {
        setSystems([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSystems();
  }, []);

  const onSubmit = async (data: FormData) => {
    try {
      const response = await api.post(
        "/tables/",
        {
          name: data.name,
          player_limit: data.playerLimit,
          idSystem: data.idSystem,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("authToken")}`,
          },
        }
      );
      onClose();
      if (onSuccess) onSuccess();
      Toast.success(`Mesa "${data.name}" criada com sucesso!`);
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: "Ocorreu um erro ao criar a mesa. Tente novamente.",
        background: "#232136",
        color: "#fff",
        confirmButtonColor: "#8a2be2",
      });
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>Criar Mesa</h2>
          <button className={styles.closeButton} onClick={onClose}>
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Nome da mesa *</label>
            <input
              id="name"
              type="text"
              {...register("name")}
              placeholder="Nome da mesa"
              className={errors.name ? styles.inputError : ""}
            />
            {errors.name && (
              <span className={styles.errorText}>{errors.name.message}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="playerLimit">
              Limite de jogadores:{" "}
              <span className={isDragging ? styles.bounce : ""}>
                {playerLimitValue}
              </span>
            </label>
            <div className={styles.rangeContainer}>
              <span className={styles.rangeLabelMin}>1</span>
              <input
                id="playerLimit"
                type="range"
                min={1}
                max={10}
                step={1}
                value={playerLimitValue}
                onChange={(e) =>
                  setValue("playerLimit", Number(e.target.value), {
                    shouldValidate: true,
                  })
                }
                onMouseDown={handleDragStart}
                onMouseUp={handleDragEnd}
                onTouchStart={handleDragStart}
                onTouchEnd={handleDragEnd}
                className={`${styles.rangeInput} ${
                  errors.playerLimit ? styles.inputError : ""
                }`}
                aria-valuenow={playerLimitValue}
                aria-valuemin={1}
                aria-valuemax={10}
                style={{
                  background: `linear-gradient(to right, #c084fc 0%, #8a2be2 ${
                    (playerLimitValue - 1) * 11.11
                  }%, #4f1d7a ${
                    (playerLimitValue - 1) * 11.11
                  }%, #4f1d7a 100%)`,
                }}
              />
              <span className={styles.rangeLabelMax}>10</span>
            </div>
            {errors.playerLimit && (
              <span className={styles.errorText}>
                {errors.playerLimit.message}
              </span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="idSystem">Sistema *</label>
            <select
              id="idSystem"
              {...register("idSystem")}
              className={errors.idSystem ? styles.inputError : ""}
            >
              <option value="">Selecione um sistema</option>
              {systems.map((system) => (
                <option key={system.id} value={system.id}>
                  {system.name}
                </option>
              ))}
            </select>
            {errors.idSystem && (
              <span className={styles.errorText}>
                {errors.idSystem.message}
              </span>
            )}
          </div>

          <div className={styles.formActions}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Criando..." : "Criar Mesa"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
