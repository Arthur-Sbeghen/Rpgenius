import React, { useState } from "react";

function rollDice(expression: string): number {
  // Suporta expressões simples como 1d6+2
  const match = expression.match(/(\d*)d(\d+)([+-]\d+)?/);
  if (!match) return NaN;
  const [, diceCountStr, diceSidesStr, modifierStr] = match;
  const diceCount = parseInt(diceCountStr || "1", 10);
  const diceSides = parseInt(diceSidesStr, 10);
  const modifier = modifierStr ? parseInt(modifierStr, 10) : 0;
  let total = 0;
  for (let i = 0; i < diceCount; i++) {
    total += Math.floor(Math.random() * diceSides) + 1;
  }
  return total + modifier;
}

export function DiceRoller({ expression }: { expression: string }) {
  const [result, setResult] = useState<number | null>(null);

  return (
    <div style={{ margin: "8px 0" }}>
      <button type="button" onClick={() => setResult(rollDice(expression))}>
        Rolar {expression}
      </button>
      {result !== null && <span style={{ marginLeft: 8 }}>Resultado: {result}</span>}
    </div>
  );
}
