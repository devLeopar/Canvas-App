import { observable, action, computed, autorun, makeObservable } from "mobx";
import { EntityObject } from "../types";
import mergeEntitiesWithCoords from "../utils/mergeEntitiesWithCoords";
import { fetchCoords, fetchEntities } from "../services/entityService";

const hasLocalStorage = typeof window !== "undefined" && window.localStorage;

export class Entity {
  id = Math.random();
  name = "Entity";
  x = 0;
  y = 0;

  constructor(json: EntityObject) {
    makeObservable(this, {
      name: observable,
      x: observable,
      y: observable,
      asJson: computed,
    });
    Object.assign(this, json);
  }

  get asJson() {
    const { id, name, x, y } = this;
    return { id, name, x, y };
  }
}

export class EntityStore {
  entities: Entity[] = [];

  constructor() {
    makeObservable(this, {
      entities: observable,
      loadJson: action,
      addEntity: action,
      loadFromLocalStorage: action,
      asJson: computed,
    });
    autorun(this.saveToLocalStorageReaction, { delay: 200 });
  }

  async fetchData() {
    const entities = await fetchEntities();
    const coords = await fetchCoords();

    const mergedData = mergeEntitiesWithCoords(entities, coords);
    this.loadJson(mergedData);
  }

  updatePosition(entityId: number, x: number, y: number) {
    const entity = this.entities.find((e) => e.id === entityId);
    if (entity) {
      entity.x = x;
      entity.y = y;
    }
  }

  loadJson(json: EntityObject[]) {
    this.entities = json.map((entityData) => new Entity(entityData));
  }

  addEntity(name: string, x: number, y: number) {
    this.entities.push(
      new Entity({
        name,
        x,
        y,
      })
    );
  }

  saveToLocalStorageReaction = () => {
    if (hasLocalStorage) {
      window.localStorage.setItem(
        "domain-model-app",
        JSON.stringify(this.asJson)
      );
    }
  };

  loadFromLocalStorage() {
    const data =
      hasLocalStorage && window.localStorage.getItem("domain-model-app");
    if (data) {
      this.loadJson(JSON.parse(data));
    } else {
      this.loadJson([]);
    }
  }

  get asJson() {
    return this.entities.map((e) => e.asJson);
  }
}
