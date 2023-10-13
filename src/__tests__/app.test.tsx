import React from "react";
import { render } from "@testing-library/react";
import App from "../components/app";
import { EntitiesContext } from "../stores/EntitiesContext";
import { EntityStore } from "../stores/entitystore";

const mockJsonResponse = (data: any) => {
  return {
    json: () => Promise.resolve(data),
    headers: new Headers(),
    ok: true,
    redirected: false,
    status: 200,
    statusText: "OK",
    type: "default",
    url: "http://mock.url",
    clone: jest.fn(),
    blob: jest.fn(),
    formData: jest.fn(),
    text: jest.fn(),
    arrayBuffer: jest.fn(),
    body: jest.fn(),
    bodyUsed: false,
  };
};

global.fetch = jest.fn().mockImplementation((url) => {
  switch (url) {
    case "/static/entities.json":
      return mockJsonResponse([
        { id: 1, name: "test1" },
        { id: 2, name: "test2" },
      ]);
    case "/static/coords.json":
      return mockJsonResponse([
        { x: 0, y: 100 },
        { x: 50, y: 150 },
      ]);
    default:
      throw new Error(`Unhandled request: ${url}`);
  }
});

test("renders App component without crashing", () => {
  const testEntityStore = new EntityStore();
  render(
    <EntitiesContext.Provider value={testEntityStore}>
      <App />
    </EntitiesContext.Provider>
  );
});

afterEach(() => {
  jest.clearAllMocks();
});
