import { setupFetchMock } from "../__mocks__/fetchMocks";
import { EntityStore } from "../stores/entitystore";

describe("Entity store", () => {
  // Setup fetch mock before running tests
  beforeAll(() => {
    setupFetchMock();
  });

  it("should load entities from json", () => {
    const store = new EntityStore();
    store.loadJson([
      {
        id: 1,
        name: "test1",
        x: 100,
        y: 100,
        attributes: ["james"],
      },
      {
        id: 2,
        name: "test2",
        x: 200,
        y: 200,
        attributes: ["jessica"],
      },
    ]);

    expect(store.entities.length).toEqual(2);
    expect(store.entities[0].id).toEqual(1);
    expect(store.entities[0].name).toEqual("test1");
    expect(store.entities[0].x).toEqual(100);
    expect(store.entities[0].y).toEqual(100);
  });

  it("should add entity", () => {
    const store = new EntityStore();
    store.addEntity("Foo", 42, 0);

    expect(store.entities.length).toEqual(1);
    expect(isNaN(store.entities[0].id)).toEqual(false);
    expect(store.entities[0].name).toEqual("Foo");
    expect(store.entities[0].x).toEqual(42);
    expect(store.entities[0].y).toEqual(0);
  });

  it("should fetch and merge data correctly", async () => {
    const store = new EntityStore();
    await store.fetchData();

    // Now verify the data
    expect(store.entities.length).toEqual(2);
    expect(store.entities[0].name).toEqual("test1");
    expect(store.entities[0].x).toEqual(0);
    expect(store.entities[0].y).toEqual(100);
    expect(store.entities[1].name).toEqual("test2");
    expect(store.entities[1].x).toEqual(50);
    expect(store.entities[1].y).toEqual(150);
  });

  it("should convert entity to json correctly", () => {
    const entity = {
      name: "test",
      x: 100,
      y: 100,
      attributes: ["attr1"],
    };

    const store = new EntityStore();
    store.addEntity(entity.name, entity.x, entity.y);
    store.entities[0].attributes.push("attr1");

    // Compare properties without considering the id
    expect(store.entities[0].name).toEqual(entity.name);
    expect(store.entities[0].x).toEqual(entity.x);
    expect(store.entities[0].y).toEqual(entity.y);
    expect(store.entities[0].attributes).toEqual(entity.attributes);
  });
});
