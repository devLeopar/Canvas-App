import { ApiEntityData, CoordsData, EntityObject } from "../types";

// Merges entities with coordinates based on the ID
const mergeEntitiesWithCoords = (
  entities: ApiEntityData[],
  coords: CoordsData[]
): EntityObject[] => {
  return entities.map((entity) => {
    const coord = coords.find((c) => c.id === entity.id);
    return {
      ...entity,
      x: coord?.x || 0,
      y: coord?.y || 0,
      attributes: [],
    };
  });
};

export default mergeEntitiesWithCoords;
