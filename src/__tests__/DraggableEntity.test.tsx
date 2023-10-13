import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import { EntityObject } from "../types";
import DraggableEntity from "../components/DraggableEntity";

describe("<DraggableEntity />", () => {
  const mockEntity: EntityObject = {
    id: 3,
    name: "test4",
    attributes: ["attr1", "attr2"],
    x: 100,
    y: 100,
  };

  // Reset the mockEntity before each test
  beforeEach(() => {
    mockEntity.x = 100;
    mockEntity.y = 100;
  });

  it("renders correctly", () => {
    const { asFragment } = render(<DraggableEntity entity={mockEntity} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders the correct number of attributes", () => {
    const { getAllByRole } = render(<DraggableEntity entity={mockEntity} />);
    const attributes = getAllByRole("listitem");
    expect(attributes).toHaveLength(mockEntity.attributes.length);
  });

  it("can be dragged", async () => {
    const { getByTestId } = render(<DraggableEntity entity={mockEntity} />);
    const draggableEntity = getByTestId("draggable-entity");

    // Start the drag
    fireEvent.mouseDown(draggableEntity);

    // Wait for any effects to run
    await act(async () => {
      // Simulate the mouse move on the window object directly
      fireEvent.mouseMove(window, { clientX: 150, clientY: 150 });
    });

    // Finish the drag
    fireEvent.mouseUp(window);

    // Verify position changes
    expect(mockEntity.x).toEqual(250);
    expect(mockEntity.y).toEqual(250);
  });

  describe("Boundary Constraints", () => {
    // Store the original dimensions to reset after tests
    let originalOffsetWidth: PropertyDescriptor | undefined,
      originalOffsetHeight: PropertyDescriptor | undefined;

    // Before all tests in this describe block, store the original getter methods for the dimensions
    beforeAll(() => {
      originalOffsetWidth = Object.getOwnPropertyDescriptor(
        HTMLElement.prototype,
        "offsetWidth"
      );
      originalOffsetHeight = Object.getOwnPropertyDescriptor(
        HTMLElement.prototype,
        "offsetHeight"
      );
    });

    // After all tests, reset the getters back to their original methods
    afterAll(() => {
      Object.defineProperty(
        HTMLElement.prototype,
        "offsetWidth",
        originalOffsetWidth as PropertyDescriptor //casting it is not undefined
      );
      Object.defineProperty(
        HTMLElement.prototype,
        "offsetHeight",
        originalOffsetHeight as PropertyDescriptor
      );
    });

    it("stays within the right boundary", async () => {
      // Mock the entity dimensions
      Object.defineProperty(HTMLElement.prototype, "offsetWidth", {
        configurable: true,
        get() {
          return 120;
        },
      });
      Object.defineProperty(HTMLElement.prototype, "offsetHeight", {
        configurable: true,
        get() {
          return 70;
        },
      });

      const { getByTestId, rerender } = render(
        <DraggableEntity entity={mockEntity} />
      );

      // Re-render to apply the mocked dimensions
      rerender(<DraggableEntity entity={mockEntity} />);

      const draggableEntity = getByTestId("draggable-entity");

      fireEvent.mouseDown(draggableEntity);

      await act(async () => {
        fireEvent.mouseMove(window, { clientX: 850, clientY: 50 }); // moving to the right beyond canvas width
      });

      fireEvent.mouseUp(window);

      expect(mockEntity.x).toEqual(800 - 120); // Canvas width - entity width
    });

    it("stays within the left boundary", async () => {
      const { getByTestId } = render(<DraggableEntity entity={mockEntity} />);
      const draggableEntity = getByTestId("draggable-entity");

      fireEvent.mouseDown(draggableEntity);

      await act(async () => {
        fireEvent.mouseMove(window, { clientX: -250, clientY: 50 }); // moving to the left
      });

      fireEvent.mouseUp(window);

      expect(mockEntity.x).toEqual(0); // Ensure it doesn't go beyond left edge
    });

    it("stays within the top boundary", async () => {
      const { getByTestId } = render(<DraggableEntity entity={mockEntity} />);
      const draggableEntity = getByTestId("draggable-entity");

      fireEvent.mouseDown(draggableEntity);

      await act(async () => {
        fireEvent.mouseMove(window, { clientX: 50, clientY: -450 }); // moving upwards
      });

      fireEvent.mouseUp(window);

      expect(mockEntity.y).toEqual(0); // Ensure it doesn't go beyond top edge
    });

    it("stays within the bottom boundary", async () => {
      // Mock the entity dimensions to account for height
      Object.defineProperty(HTMLElement.prototype, "offsetHeight", {
        configurable: true,
        get() {
          return 70; // Mock height of the entity
        },
      });

      const { getByTestId, rerender } = render(
        <DraggableEntity entity={mockEntity} />
      );

      // Re-render to apply the mocked dimensions
      rerender(<DraggableEntity entity={mockEntity} />);

      const draggableEntity = getByTestId("draggable-entity");

      fireEvent.mouseDown(draggableEntity);

      await act(async () => {
        fireEvent.mouseMove(window, { clientX: 50, clientY: 650 }); // moving downwards beyond canvas height
      });

      fireEvent.mouseUp(window);

      expect(mockEntity.y).toEqual(600 - 70); // Canvas height - entity height
    });
  });
});
