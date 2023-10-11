import React, { useContext } from "react";
import { observer } from "mobx-react";
import { EntityCanvas } from "./entitycanvas";
import { EntitiesContext } from "../index";

export const App = observer(() => {
  const entityStore = useContext(EntitiesContext);

  const onAddEntity = () => {
    const entityName = prompt("Name of the new entity", "");

    const canvasWidth = 800; // canvas width without padding,margin
    const canvasHeight = 600; // canvas height without padding,margin
    const entityWidth = 142; // entity width including padding,margin
    const entityHeight = 70; // entity height including padding,margin

    if (entityName) {
      entityStore.addEntity(
        entityName,
        Math.random() * (canvasWidth - entityWidth),
        Math.random() * (canvasHeight - entityHeight)
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
