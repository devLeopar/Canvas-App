import React, { useContext } from "react";
import { observer } from "mobx-react";
import { EntityCanvas } from "./entitycanvas";
import { EntitiesContext } from "../index";

export const App = observer(() => {
  const entityStore = useContext(EntitiesContext);

  const onAddEntity = () => {
    const entityName = prompt("Name of the new entity", "");

    const canvasWidth = 800;
    const canvasHeight = 600;
    const entityWidth = 140; // approximate width of the entity
    const entityHeight = 50; // approximate height of the entity

    if (entityName) {
      entityStore.addEntity(
        entityName,
        Math.random() * (canvasHeight - entityHeight),
        Math.random() * (canvasWidth - entityWidth)
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
