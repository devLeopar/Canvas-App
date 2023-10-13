import React, { createContext } from "react";
import * as ReactDOM from "react-dom";
import { EntityStore } from "./stores/entitystore";
import App from "./components/app";
import { EntitiesContext } from "./stores/EntitiesContext";

const entityStore = new EntityStore();

ReactDOM.render(
  <EntitiesContext.Provider value={entityStore}>
    <App />
  </EntitiesContext.Provider>,
  document.getElementById("root")
);