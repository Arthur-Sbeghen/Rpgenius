"use client";

import { CardTable } from "@/components/CardTable/CardTable";
import "./styles.css";
import Sidebar from "@/components/Sidebar/Sidebar";
import { TableCreate } from "@/components/TableActions/TableCreate";
import { TableEnter } from "@/components/TableActions/TableEnter";
import { Button } from "@/components/Button/Button";

export default function HomePage() {
  return (
    <>
      <Sidebar />
      <div className="container">
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
          <CardTable
            title="opa"
            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU-quPbAQMD3Ab9hegEbrrJBBAgfoW0aGIbw&s"
            system="ded"
            creator="ze"
          />
          <CardTable
            title="opa"
            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJ5jUsQfDuHioH8QLly2AK9e0M3yksbkl4-g&s"
            system="ded"
            creator="ze"
          />
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
