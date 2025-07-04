import React, { useState } from "react";
import { TableCreateModal } from "./TableCreateModal";
import styles from "./tableCreateModal.module.css";

interface TableCreateProps {
  onSuccess?: () => void;
  systems: Array<{ id: number; name: string }>;
  loadingSystems: boolean;
}

export function TableCreate({
  onSuccess,
  systems,
  loadingSystems,
}: TableCreateProps) {
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
          systems={systems}
          loadingSystems={loadingSystems}
        />
      )}
    </>
  );
}
