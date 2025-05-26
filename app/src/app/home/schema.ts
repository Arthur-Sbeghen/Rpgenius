export type AttributeName =
  | "Vida"
  | "Atletismo"
  | "Força"
  | "Intelecto"
  | "Sanidade";

export type Player = {
  id: number;
  name: string;
  attributes: number[];
};

export type Table = {
  id: number;
  table: string;
  attributes: Record<AttributeName, string>;
  players: Player[];
  dice: number[];
  system: string;
};
