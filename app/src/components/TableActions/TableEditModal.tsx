"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Alert } from "@/components/Alert/Alert";
import Cookies from "js-cookie";
import { api } from "@/lib/apiRequests";
import styles from "./tableCreateModal.module.css";
import modalStyles from "./tableEditModal.module.css";
import Loader from "../Loader/Loader";
import { Toast } from "../Toast/Toast";

interface TableEditModalProps {
  table: any;
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
});

type FormData = yup.InferType<typeof tableSchema>;

export const TableEditModal = ({
  table,
  onClose,
  onSuccess,
  systems,
  loadingSystems,
}: TableEditModalProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(tableSchema),
    defaultValues: {
      name: table.name,
      playerLimit: table.player_limit || table.playerLimit || 5,
    },
  });

  const playerLimitValue = watch("playerLimit");
  const handleDragStart = () => setIsDragging(true);
  const handleDragEnd = () => setIsDragging(false);

  const onSubmit = async (data: FormData) => {
    try {
      await api.post(
        `/tables/edit/${table.id}`,
        {
          name: data.name,
          player_limit: data.playerLimit,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("authToken")}`,
          },
        }
      );
      onClose();
      if (onSuccess) onSuccess();
      Toast.success("Mesa editada com sucesso!");
    } catch (error: any) {
      Alert.error("Ocorreu um erro ao editar a mesa. Tente novamente.", {
        title: "Erro",
        confirmButtonColor: "#8a2be2",
      });
    }
  };

  if (loadingSystems) {
    return (
      <div className={styles.modalOverlay} onClick={onClose}>
        <div
          className={styles.modalContent}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={modalStyles.loaderContainer}>
            <Loader />
            <p className={modalStyles.loaderText}>Carregando sistemas...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>Editar Mesa</h2>
          <button className={styles.closeButton} onClick={onClose}>
            &times;
          </button>
        </div>
        {isSubmitting ? (
          <div className={modalStyles.loaderContainer}>
            <Loader />
            <p className={modalStyles.loaderText}>Salvando alterações...</p>
          </div>
        ) : (
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
                Salvar Alterações
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
