import React from "react";
import { render, act } from "@testing-library/react";
import { EntitiesContext } from "../stores/EntitiesContext";
import { EntityStore } from "../stores/entitystore";
import { setupFetchMock } from "../__mocks__/fetchMocks";
import EntityCanvas from "../components/entitycanvas";

describe("<EntityCanvas />", () => {
  let testEntityStore: EntityStore;

  // Setting up fetch mock
  beforeEach(() => {
    testEntityStore = new EntityStore();
    setupFetchMock();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Check if it match the snapshot and make sure its sizes aren't changed
  it("renders correctly", () => {
    const { asFragment } = render(
      <EntitiesContext.Provider value={testEntityStore}>
        <EntityCanvas />
      </EntitiesContext.Provider>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("renders the correct number of entities", async () => {
    let draggableEntities;
    await act(async () => {
      const rendered = render(
        <EntitiesContext.Provider value={testEntityStore}>
          <EntityCanvas />
        </EntitiesContext.Provider>
      );
      draggableEntities = await rendered.findAllByTestId("draggable-entity");
    });
    expect(draggableEntities).toHaveLength(testEntityStore.entities.length);
  });

  it("fetches data on mount", async () => {
    await act(async () => {
      render(
        <EntitiesContext.Provider value={testEntityStore}>
          <EntityCanvas />
        </EntitiesContext.Provider>
      );
    });

    // Ensure that the mocked fetch was called
    expect(global.fetch).toHaveBeenCalledTimes(2); // Assuming fetchData makes two fetch calls, one for entities and another for coords
  });
});
