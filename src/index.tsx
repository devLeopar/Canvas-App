import React, { createContext } from "react";
import * as ReactDOM from "react-dom";
import { App } from "./components/app";
import { EntityStore } from "./stores/entitystore";

const DEMO_DATA = [
  {
    id: 1,
    name: "Order",
    x: 100,
    y: 100,
  },
  {
    id: 2,
    name: "OrderLine",
    x: 200,
    y: 200,
  },
];

const entityStore = new EntityStore();
entityStore.loadJson(DEMO_DATA);

export const EntitiesContext = createContext<EntityStore>(entityStore);

ReactDOM.render(
  <EntitiesContext.Provider value={entityStore}>
    <App />
  </EntitiesContext.Provider>,
  document.getElementById("root")
);
