import React, { useContext } from "react";
import { observer } from "mobx-react";
import { EntityCanvas } from "./entitycanvas";
import { EntitiesContext } from "../index";

export const App = observer(() => {
  const entityStore = useContext(EntitiesContext);

  const onAddEntity = () => {
    const entityName = prompt("Name of the new entity", "");
    if (entityName) {
      entityStore.addEntity(
        entityName,
        Math.random() * 1000,
        Math.random() * 1000
      );
    }
  };
  return (
    <div>
      <h1>Domain Model Editor</h1>
      <button onClick={onAddEntity}>Add Entity</button>
      <EntityCanvas />
    </div>
  );
});
