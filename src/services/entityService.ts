import { ApiEntityData, CoordsData } from "../types";

const ENTITY_API = "/static/entities.json";
const COORDS_API = "/static/coords.json";

export const fetchEntities = async (): Promise<ApiEntityData[]> => {
  const response = await fetch(ENTITY_API);
  if (!response.ok) {
    throw new Error(`Failed to fetch entities: ${response.statusText}`);
  }
  return await response.json();
};

export const fetchCoords = async (): Promise<CoordsData[]> => {
  const response = await fetch(COORDS_API);
  if (!response.ok) {
    throw new Error(`Failed to fetch coords: ${response.statusText}`);
  }
  return await response.json();
};
