import React, { useState } from "react";
import { TableCreateModal } from "./TableCreateModal";
import styles from "./tableCreateModal.module.css";

export function TableCreate({ onSuccess }: { onSuccess?: () => void }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        className={`${styles.tableBtn} table-btn`}
        onClick={() => setIsModalOpen(true)}
      >
        <i className="fas fa-plus" style={{ marginRight: 8 }}></i>
        Criar Mesa
      </button>

      {isModalOpen && (
        <TableCreateModal
          onClose={() => setIsModalOpen(false)}
          onSuccess={onSuccess}
        />
      )}
    </>
  );
}
