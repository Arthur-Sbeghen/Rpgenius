import React from "react";
import styles from "../TableActions/tableCreateModal.module.css";
import { CharacterCreateForm } from "./CharacterCreateForm";

interface CharacterCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  systemConfig: any;
  onSuccess?: (form: any) => void;
}

export function CharacterCreateModal({
  isOpen,
  onClose,
  systemConfig,
  onSuccess,
}: CharacterCreateModalProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Fechar modal"
        >
          &times;
        </button>
        <CharacterCreateForm
          systemConfig={systemConfig}
          onSubmit={(form) => {
            if (onSuccess) onSuccess(form);
            onClose();
          }}
        />
      </div>
    </div>
  );
}
