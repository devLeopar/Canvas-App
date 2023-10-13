import React from "react";
import { render, waitFor } from "@testing-library/react";
import App from "../components/app";
import { EntitiesContext } from "../stores/EntitiesContext";
import { EntityStore } from "../stores/entitystore";
import { setupFetchMock } from "./__mocks__/fetchMocks";
import { fireEvent } from "@testing-library/react";

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

test("it adds a new entity when onAddEntity is triggered", async () => {
  // Mock the prompt and alert
  global.prompt = jest.fn(() => "test3");
  global.alert = jest.fn(() => {});

  const { getByText, debug } = render(
    <EntitiesContext.Provider value={new EntityStore()}>
      <App />
    </EntitiesContext.Provider>
  );

  // The button with text "Add Entity" that calls onAddEntity when clicked.
  const addButton = getByText("Add Entity");
  fireEvent.click(addButton);

  // Check for the mocked entity name in the rendered output
  const newEntity = getByText("test3");
  expect(newEntity).toBeInTheDocument();
});
