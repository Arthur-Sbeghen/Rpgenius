"use client";

import { CardTable } from "@/components/CardTable/CardTable";
import "./styles.css";
import Sidebar from "@/components/Sidebar/Sidebar";
import { TableCreate } from "@/components/TableActions/TableCreate";
import { TableEnter } from "@/components/TableActions/TableEnter";

import { useEffect, useState } from "react";
import { Alert } from "@/components/Alert/Alert";
import type { Table } from "./schema";
import { myAppHook } from "@/context/AppProvider";
import { authCheck } from "@/lib/authCheck";
import axios from "axios";
import Cookies from "js-cookie";
import Loader from "@/components/Loader/Loader";
import { Toast } from "@/components/Toast/Toast";

export default function HomePage() {
  const { logout } = myAppHook();

  const { checked, allowed } = authCheck({ requireAuth: true });
  const [isSidebarClosed, setIsSidebarClosed] = useState(false);
  const [tables, setTables] = useState<Table[]>([]);
  const [selectedTableId, setSelectedTableId] = useState<number | null>(null);
  const [loadingTables, setLoadingTables] = useState<boolean>(true);

  const toggleSidebar = () => setIsSidebarClosed((prev) => !prev);

  const fetchTables = () => {
    const token = Cookies.get("authToken");
    setLoadingTables(true);
    axios
      .get("/api/tables", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setTables(res.data))
      .catch((error: any) => {
        if (error.response) {
          Toast.error(error.response.data.message);
        } else {
          Alert.error("Erro ao buscar mesas", { title: "Erro" });
        }
      })
      .finally(() => setLoadingTables(false));
  };

  useEffect(() => {
    fetchTables();
  }, []);

  if (!checked || !allowed) return <Loader />;

  const noReleased = () => {
    Alert.warning("Esta função ainda não foi criada neste protótipo.", {
      title: "Opa!",
      confirmButtonText: "Ok!",
      confirmButtonColor: "#8a2be2",
    });
  };

  const selectedTable = tables?.find((t) => t.id === selectedTableId);

  return (
    <>
      <Sidebar isClosed={isSidebarClosed} toggleSidebar={toggleSidebar} />
      <div className={`container ${isSidebarClosed ? "large" : ""}`}>
        <div className="header">
          <h1>Suas Mesas de RPG!</h1>
          <div>
            <div className="tableActions-buttons">
              <TableCreate />
              <TableEnter />
            </div>
            <div className="search-tables">
              <input type="text" />
              <button>Buscar</button>
            </div>
          </div>
        </div>
        <div className="tables">
          {!selectedTable ? (
            <>
              {loadingTables ? (
                <Loader />
              ) : (
                tables.map((table) => (
                  <CardTable
                    key={table.id}
                    title={table.name}
                    image="https://res.cloudinary.com/teepublic/image/private/s--8PzLFaNc--/t_Resized%20Artwork/c_fit,g_north_west,h_954,w_954/co_000000,e_outline:35/co_000000,e_outline:inner_fill:35/co_ffffff,e_outline:35/co_ffffff,e_outline:inner_fill:35/co_bbbbbb,e_outline:3:1000/c_mpad,g_center,h_1260,w_1260/b_rgb:eeeeee/c_limit,f_auto,h_630,q_auto:good:420,w_630/v1574834919/production/designs/6919636_0.jpg"
                    system={table.system}
                    players={table.players}
                    onClick={() => {
                      setSelectedTableId(table.id);
                    }}
                  />
                ))
              )}
            </>
          ) : (
            <div className="table-show">
              <div className="placeReturn">
                <i
                  /* Recarrega a <main> como menu, flechinha de return */
                  onClick={() => setSelectedTableId(null)}
                  className="fa-solid fa-arrow-turn-up return"
                ></i>
              </div>
              {/* Detalhes da mesa */}
              <h1 className="table-h1">{selectedTable.name}</h1>
              <h4 className="table-h4">{selectedTable.system}</h4>
              {selectedTable.isMaster ? (
                <div
                  className="table-master"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    border: "1px solid #5f1ba8",
                    gap: "10px",
                    padding: "10px",
                    margin: "10px",
                  }}
                >
                  <div>
                    <i className="fas fa-user" style={{ marginRight: 8 }}></i>
                    Você é o mestre desta mesa!
                  </div>
                  <button
                    className="table-btn"
                    onClick={async () => {
                      let confirmed = await Alert.confirm(
                        "Tem certeza que deseja excluir esta mesa?",
                        {
                          title: "Excluir Mesa",
                          confirmButtonText: "Sim, excluir",
                          cancelButtonText: "Cancelar",
                          confirmButtonColor: "#e74c3c",
                          cancelButtonColor: "#8a2be2",
                        }
                      );
                      if (confirmed) {
                        axios
                          .delete(`/api/tables/${selectedTable.id}`)
                          .then(() => {
                            Toast.success("Mesa excluída com sucesso!");
                            setSelectedTableId(null);
                            fetchTables();
                          })
                          .catch((error) => {
                            if (error.response) {
                              Toast.error(error.response.data.message);
                            } else {
                              Toast.error("Erro ao excluir mesa");
                            }
                          });
                      }
                    }}
                  >
                    Excluir Mesa
                  </button>
                </div>
              ) : null}
              <h4 className="table-invite-code">
                <span>{selectedTable.invite_code}</span>
                <button
                  className="copy-btn"
                  onClick={() => {
                    navigator.clipboard.writeText(selectedTable.invite_code);
                    Toast.success("Código copiado!");
                  }}
                  style={{ marginLeft: 12 }}
                  title="Copiar código"
                >
                  <i className="fas fa-copy"></i>
                </button>
              </h4>
              {/* Status dos jogadores */}
              <div className="players-container">
                {typeof selectedTable.players === "number" ? (
                  selectedTable.players === 0 ? (
                    <div className="no-players">Sem Jogadores</div>
                  ) : (
                    <div className="player-count">
                      {selectedTable.players} Jogador
                      {selectedTable.players > 1 ? "es" : ""}
                    </div>
                  )
                ) : null}
              </div>
              <div className="animation-control">
                <label>
                  <input type="checkbox" id="animationToggle" defaultChecked />{" "}
                  Mostrar animação?
                </label>
              </div>
              <div className="dice-buttons">
                {selectedTable.dice.map((die, index) => (
                  <button
                    className="table-btn"
                    key={index}
                    onClick={() => rollDice(die)}
                  >
                    1d{die}
                  </button>
                ))}
              </div>
              <div id="roll-results" className="roll-results">
                (Clique nos botões para rolar)
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// Copiado e colado do prototipo
function rollDice(sides: number) {
  const resultDiv = document.getElementById("roll-results");
  const checkbox = document.getElementById(
    "animationToggle"
  ) as HTMLInputElement | null;
  const animate = checkbox?.checked ?? false;

  if (!resultDiv) return;

  if (animate) {
    resultDiv.innerHTML = `
      <svg class="d20-svg rolling" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
          <path d="M50 5 L90 25 L90 75 L50 95 L10 75 L10 25 Z" fill="#8a2be2" stroke="#6a1bbf" stroke-width="2" />
          <text x="50" y="55" font-size="30" fill="#ffffff" text-anchor="middle" dominant-baseline="middle">?</text>
      </svg>
    `;
    setTimeout(() => showResult(sides, resultDiv), 1000);
  } else {
    showResult(sides, resultDiv);
  }
}

function showResult(sides: number, resultDiv: HTMLElement) {
  const roll = Math.floor(Math.random() * sides) + 1;
  resultDiv.innerHTML = `
    <svg class="d20-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
        <path d="M50 5 L90 25 L90 75 L50 95 L10 75 L10 25 Z" fill="#8a2be2" stroke="#6a1bbf" stroke-width="2" />
        <text x="50" y="55" font-size="30" fill="#ffffff" text-anchor="middle" dominant-baseline="middle">${roll}</text>
    </svg>
    <p class="dice-result-text">Rolagem: 1d${sides} = ${roll}</p>
  `;
}
