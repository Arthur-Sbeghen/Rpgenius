"use client";

import { useEffect, useState } from "react";
import { Alert } from "@/components/Alert/Alert";
import type { Table } from "./schema";
import Link from "next/link";
import { myAppHook } from "@/context/AppProvider";
import { authCheck } from "@/lib/authCheck";
import axios from "axios";
import Cookies from "js-cookie";
import "./style.css";
import Loader from "@/components/Loader/Loader";

export default function HomePage() {
  const { logout } = myAppHook();

  const { checked, allowed } = authCheck({ requireAuth: true });

  // Estados, funcionam como variáveis
  const [tables, setTables] = useState<Table[]>([]);
  const [selectedTableId, setSelectedTableId] = useState<number | null>(null);
  const [isSidebarActive, setIsSidebarActive] = useState<boolean>(false);
  const [loadingTables, setLoadingTables] = useState<boolean>(true);

  // Busca as mesas com axios pelo endpoint '/api/tables' quando o DOM
  // é renderizado e armazena os dados no estado 'tables'
  useEffect(() => {
    const token = Cookies.get("authToken");

    axios
      .get("/api/tables", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setTables(res.data);
      })
      .catch((error: any) => {
        Alert.error("Não foi possível carregar suas mesas.", {
          title: "Erro",
        });
      })
      .finally(() => {
        setLoadingTables(false);
      });
  }, []);

  useEffect(() => {
    const loginSuccess = localStorage.getItem("loginSuccess");
    if (loginSuccess === "true") {
      Alert.success("", {
        title: "Login realizado com sucesso!",
        timer: 4000,
        showConfirmButton: false,
        timerProgressBar: true,
      });
      localStorage.removeItem("loginSuccess");
    }
  }, []);

  if (!checked || !allowed) return <Loader />;

  // Função que dispara modal dizendo que a funcionalidade ainda não está disponível
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
      <header className="table-header">
        {/* Icone FontAwesome para abrir a sidebar */}
        <i
          /* Inverte o boolean do estado de sidebar ativo ao clicar */
          onClick={() => setIsSidebarActive(!isSidebarActive)}
          className="fas fa-bars menu-icon"
        ></i>
        {/* Sidebar que muda o nome da classe conforme muda o estado isSidebarActive */}
        <nav className={`sidebar ${isSidebarActive ? "active" : "desativado"}`}>
          <i
            /* Inverte o boolean do estado de sidebar ativo ao clicar */
            onClick={() => setIsSidebarActive(!isSidebarActive)}
            className="fas fa-x menu-close"
          ></i>
          <ul>
            <li>
              {/* Chama a função noReleased ao clicar, importante que não tenha () 
              senão executaria no carregamento do DOM e não ao ser clicado */}
              <a onClick={noReleased}>Home</a>
            </li>
            <li>
              <a onClick={noReleased}>Contato</a>
            </li>
            <li>
              <Link href="/about">Sobre Nós</Link>
            </li>
            <div>
              <li>
                <a onClick={noReleased}>Configurações</a>
              </li>
            </div>
            <div>
              <li>
                <a onClick={logout}>Sair</a>
              </li>
            </div>
          </ul>
        </nav>
      </header>

      {/* Acabou o header e a sidebar, agr é a main (visão de menu das mesas ou de mesa específica) */}
      <main className="table-main">
        {!selectedTable ? (
          /* Se nenhuma tabela foi selecionada: */
          <>
            <h1 className="table-h1">Suas Mesas de RPG!</h1>
            <div>
              <button className="table-btn" onClick={noReleased}>
                Criar Mesa
              </button>
              <button className="table-btn" onClick={noReleased}>
                Juntar-se à mesas
              </button>
            </div>
            <div className="rpgTables">
              {loadingTables ? (
                <p>
                  <b>Carregando Mesas...</b>
                </p>
              ) : (
                tables.map((table) => (
                  <div
                    className="table"
                    /* Necessário no React */
                    key={table.id}
                    /* Adiciona o id da mesa desta div no estado selectedTableId, 
                  que depois será buscada pela função selectedTable e mudará o 
                  conteúdo da <main> automaticamente pcausa do tenário '!selectedTable ? (' */
                    onClick={() => setSelectedTableId(table.id)}
                  >
                    <div className="tableName">{table.table}</div>
                    <div className="tableSystem">{table.system}</div>
                    <div className="tablePlayers">
                      {/* Exemplo de CSS inline */}
                      <span style={{ fontWeight: "bold" }}>
                        {table.players.length === 0
                          ? "Sem Jogadores"
                          : `${table.players.length} Jogador${
                              table.players.length > 1 ? "es" : ""
                            }`}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        ) : (
          /* Se há uma tabela selecionada: */
          <>
            <div className="placeReturn">
              <i
                /* Recarrega a <main> como menu, flechinha de return */
                onClick={() => setSelectedTableId(null)}
                className="fa-solid fa-arrow-turn-up return"
              ></i>
            </div>
            {/* Detalhes da mesa */}
            <h1 className="table-h1">{selectedTable.table}</h1>
            <h4 className="table-h4">{selectedTable.system}</h4>
            {/* Status dos jogadores */}
            <div className="players-container">
              {selectedTable.players.map((player) => (
                <div className="player" key={player.id}>
                  <h3>{player.name}</h3>
                  <div className="player-attributes">
                    {player.attributes.map((attribute, index) => (
                      <div className="attribute" key={index}>
                        <p>
                          <strong>{attribute.name}:</strong>{" "}
                          <span>{attribute.value}</span>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
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
          </>
        )}
      </main>
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
