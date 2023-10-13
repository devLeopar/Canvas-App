import { createContext } from "react";
import { EntityStore } from "./entitystore";

const entityStore = new EntityStore();
export const EntitiesContext = createContext<EntityStore>(entityStore);
