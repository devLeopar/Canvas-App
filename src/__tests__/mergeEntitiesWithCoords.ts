import mergeEntitiesWithCoords from "../utils/mergeEntitiesWithCoords";
import { ApiEntityData, CoordsData, EntityObject } from "../types";

describe("mergeEntitiesWithCoords utility function", () => {
  test("should correctly merge entities with their corresponding coordinates", () => {
    const entities: ApiEntityData[] = [
      { id: 1, name: "Entity1" },
      { id: 2, name: "Entity2" },
    ];

    const coords: CoordsData[] = [
      { id: 1, x: 10, y: 20 },
      { id: 2, x: 30, y: 40 },
    ];

    const expected: EntityObject[] = [
      { id: 1, name: "Entity1", x: 10, y: 20, attributes: [] },
      { id: 2, name: "Entity2", x: 30, y: 40, attributes: [] },
    ];

    const result = mergeEntitiesWithCoords(entities, coords);
    expect(result).toEqual(expected);
  });

  test("should set x and y to 0 for entities without matching coordinates", () => {
    const entities: ApiEntityData[] = [
      { id: 1, name: "Entity1" },
      { id: 3, name: "Entity3" },
    ];

    const coords: CoordsData[] = [{ id: 1, x: 10, y: 20 }];

    const expected: EntityObject[] = [
      { id: 1, name: "Entity1", x: 10, y: 20, attributes: [] },
      { id: 3, name: "Entity3", x: 0, y: 0, attributes: [] },
    ];

    const result = mergeEntitiesWithCoords(entities, coords);
    expect(result).toEqual(expected);
  });
});
