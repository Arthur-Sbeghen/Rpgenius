export type AttributeName =
  | "Vida"
  | "Atletismo"
  | "Forca"
  | "Intelecto"
  | "Sanidade";

export type Attribute = {
  name: AttributeName;
  value: number;
};

export type Player = {
  id: number;
  name: string;
  attributes: Attribute[]; // Array de types Attribute
};

export type Table = {
  id: number;
  name: string;
  players: Player[];
  dice: number[];
  system: string;
  invite_code: string;
  isMaster: boolean;
};
