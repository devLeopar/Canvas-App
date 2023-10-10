import React, { createContext } from "react";
import * as ReactDOM from "react-dom";
import { App } from "./components/app";
import { EntityStore } from "./stores/entitystore";

const entityStore = new EntityStore();
export const EntitiesContext = createContext<EntityStore>(entityStore);

(async () => {
  try {
    await entityStore.fetchData();
    ReactDOM.render(
      <EntitiesContext.Provider value={entityStore}>
        <App />
      </EntitiesContext.Provider>,
      document.getElementById("root")
    );
  } catch (error) {
    console.error(`App encountered an error: ${error}`);
    ReactDOM.render(
      <div>Error loading application. Please try again later.</div>,
      document.getElementById("root")
    );
  }
})();
