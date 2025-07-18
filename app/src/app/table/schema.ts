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
  login: string;
  attributes: Attribute[]; // Array de types Attribute
};

export type Table = {
  id: number;
  name: string;
  num_players: number;
  player_limit: number;
  players: Player[];
  dice: number[];
  system: string;
  invite_code: string;
  isMaster: boolean;
  system_variables?: any;
};
