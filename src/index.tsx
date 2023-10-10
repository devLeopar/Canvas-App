import React, { createContext } from "react";
import * as ReactDOM from "react-dom";
import { App } from "./components/app";
import { EntityStore } from "./stores/entitystore";

const entityStore = new EntityStore();
export const EntitiesContext = createContext<EntityStore>(entityStore);

ReactDOM.render(
  <EntitiesContext.Provider value={entityStore}>
    <App />
  </EntitiesContext.Provider>,
  document.getElementById("root")
);