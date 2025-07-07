"use client";

import { CardTable } from "@/components/CardTable/CardTable";
import "./styles.css";
import Sidebar from "@/components/Sidebar/Sidebar";

import { useEffect, useState } from "react";
import { Alert } from "@/components/Alert/Alert";
import type { Table } from "./schema";
import { myAppHook } from "@/context/AppProvider";
import { authCheck } from "@/lib/authCheck";
import axios from "axios";
import Cookies from "js-cookie";
import Loader from "@/components/Loader/Loader";
import { Toast } from "@/components/Toast/Toast";
import { TableCreate } from "@/components/TableActions/TableCreate/TableCreate";
import { TableEnter } from "@/components/TableActions/TableEnter";
import { TableEditModal } from "@/components/TableActions/TableEdit/TableEditModal";
import { api } from "@/lib/apiRequests";
import { TableDelete } from "@/components/TableActions/TableDelete";
import PlayerRemove from "@/components/TableActions/RemoveFromTable";
import TableLeave from "@/components/TableActions/TableLeave";

function TablePage() {
  const { logout } = myAppHook();
  const { checked, allowed } = authCheck({ requireAuth: true });
  const [isSidebarClosed, setIsSidebarClosed] = useState(false);
  const [tables, setTables] = useState<Table[]>([]);
  const [selectedTableId, setSelectedTableId] = useState<number | null>(null);
  const [loadingTables, setLoadingTables] = useState<boolean>(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [systems, setSystems] = useState<any[]>([]);
  const [loadingSystems, setLoadingSystems] = useState<boolean>(true);

  const toggleSidebar = () => setIsSidebarClosed((prev) => !prev);

  const token = Cookies.get("authToken");
  const fetchTables = () => {
    setLoadingTables(true);

    axios
      .get("/api/tables", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setTables(res.data);

        setSelectedTableId((prevId) => {
          if (prevId && !res.data.find((t: any) => t.id === prevId)) {
            return null;
          }
          return prevId;
        });
      })
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
    if (selectedTableId && !tables.find((t) => t.id === selectedTableId)) {
      setSelectedTableId(null);
    }
  }, [tables, selectedTableId]);

  // Busca sistemas de RPG uma única vez
  useEffect(() => {
    if (checked && allowed) {
      fetchTables();
      setLoadingSystems(true);
      api
        .get("/tables/system/list", {
          headers: { Authorization: `Bearer ${Cookies.get("authToken")}` },
        })
        .then((res) => setSystems(res.data))
        .catch(() => setSystems([]))
        .finally(() => setLoadingSystems(false));
    }
  }, [checked, allowed]);

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
        {!selectedTable && (
          <div className="header">
            <h1 className="table-h1">Suas Mesas de RPG!</h1>
            <div>
              <div className="tableActions-buttons">
                <TableCreate
                  onSuccess={fetchTables}
                  systems={systems}
                  loadingSystems={loadingSystems}
                />
                <TableEnter onSuccess={fetchTables} />
              </div>
              <div className="search-tables">
                <input type="text" />
                <button>Buscar</button>
              </div>
            </div>
          </div>
        )}
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
                    players={table.num_players}
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
                  onClick={() => setSelectedTableId(null)}
                  className="fa-solid fa-arrow-left return"
                ></i>
              </div>

              <div className="table-header">
                <h1 className="table-h1">{selectedTable.name}</h1>
                <h4 className="table-h4">{selectedTable.system}</h4>
              </div>

              {selectedTable.isMaster ? (
                <div className="table-master">
                  <div className="meta-card">
                    <h3>Status</h3>
                    <p>
                      <i className="fas fa-crown"></i> Mestre
                    </p>
                  </div>
                  <div className="table-actions">
                    <button
                      type="button"
                      className="table-btn"
                      onClick={() => setShowEditModal(true)}
                    >
                      <i className="fas fa-edit"></i> Editar
                    </button>
                    <TableDelete
                      tableId={selectedTable.id}
                      onDeleted={() => window.location.reload()}
                    />
                  </div>
                </div>
              ) : (
                <>
                  <TableLeave
                    tableId={selectedTable.id}
                    onLeft={() => window.location.reload()}
                  />
                </>
              )}

              <div className="invite-section">
                <h3>Código de Convite</h3>
                <div className="invite-code-container">
                  <span className="invite-code">
                    {selectedTable.invite_code}
                  </span>
                  <button
                    className="copy-btn"
                    onClick={() => {
                      navigator.clipboard.writeText(selectedTable.invite_code);
                      Toast.success("Código copiado!");
                    }}
                    title="Copiar código"
                  >
                    <i className="fas fa-copy"></i> Copiar
                  </button>
                </div>
              </div>

              <div className="players-section">
                <h3 className="section-title">Jogadores</h3>
                {typeof selectedTable.num_players === "number" ? (
                  selectedTable.num_players === 0 ? (
                    <div className="no-players">Sem Jogadores</div>
                  ) : (
                    <div className="players-grid">
                      {selectedTable.players.map((player, index) => (
                        <div className="player-card" key={index}>
                          <div className="player-avatar">
                            <i className="fas fa-user"></i>
                          </div>
                          <div className="player-name">{player.login}</div>
                          <div className="player-role">Participante</div>
                          {selectedTable.isMaster && (
                            <PlayerRemove
                              playerId={player.id}
                              tableId={selectedTable.id}
                              onRemoved={() => {
                                fetchTables();
                              }}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  )
                ) : null}
              </div>

              <div className="dice-section">
                <h3 className="section-title">Rolagem de Dados</h3>
                <div className="animation-control">
                  <label>
                    <input
                      type="checkbox"
                      id="animationToggle"
                      defaultChecked
                    />{" "}
                    Mostrar animação?
                  </label>
                </div>
                <div className="dice-controls">
                  {selectedTable.dice.map((die, index) => (
                    <button
                      className="dice-btn"
                      key={index}
                      onClick={() => rollDice(die)}
                    >
                      1d{die}
                    </button>
                  ))}
                </div>
                <div className="roll-results-container">
                  <div id="roll-results" className="roll-results">
                    (Clique nos botões para rolar)
                  </div>
                </div>
              </div>

              {showEditModal && (
                <TableEditModal
                  table={selectedTable}
                  onClose={() => setShowEditModal(false)}
                  onSuccess={() => {
                    setShowEditModal(false);
                    fetchTables();
                  }}
                  systems={systems}
                  loadingSystems={loadingSystems}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

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

// Export default the page component
export default TablePage;
