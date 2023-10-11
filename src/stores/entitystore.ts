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
  attributes: string[] = [];

  constructor(json: EntityObject) {
    makeObservable(this, {
      name: observable,
      x: observable,
      y: observable,
      attributes: observable,
      asJson: computed,
    });
    Object.assign(this, json);
  }

  get asJson() {
    const { id, name, x, y, attributes } = this;
    return { id, name, x, y, attributes };
  }
}

export class EntityStore {
  entities: Entity[] = [];
  attributes: string[] = [];

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

  loadJson(json: EntityObject[]) {
    this.entities = json.map((entityData) => new Entity(entityData));
  }

  addEntity(name: string, x: number, y: number) {
    this.entities.push(
      new Entity({
        name,
        x,
        y,
        attributes: [],
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
