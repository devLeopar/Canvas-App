import React from "react";
import { render } from "@testing-library/react";
import App from "../components/app";
import { EntitiesContext } from "../stores/EntitiesContext";
import { EntityStore } from "../stores/entitystore";
import { setupFetchMock } from "./__mocks__/fetchMocks";

beforeEach(() => {
  setupFetchMock();
});

afterEach(() => {
  jest.clearAllMocks();
});

test("renders App component without crashing", () => {
  const testEntityStore = new EntityStore();
  render(
    <EntitiesContext.Provider value={testEntityStore}>
      <App />
    </EntitiesContext.Provider>
  );
});
