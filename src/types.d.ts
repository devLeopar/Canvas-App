export type ApiEntityData = {
  id: number;
  name: string;
};

export type UserEntityData = {
  attributes: string[];
};

export type EntityData = ApiEntityData & UserEntityData;

export type CoordsData = {
  id: number;
  x: number;
  y: number;
};

export type EntityObject = {
  id?: number;
  name: string;
  x: number;
  y: number;
  attributes: string[];
};
