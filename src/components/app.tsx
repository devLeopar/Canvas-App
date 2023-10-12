import React, { useContext } from "react";
import { observer } from "mobx-react";
import { EntityCanvas } from "./entitycanvas";
import { EntitiesContext } from "../index";

const explanatoryTextStyle = {
  marginTop: "10px",
  fontSize: "14px",
};

export const App = observer(() => {
  const entityStore = useContext(EntitiesContext);

  const onAddEntity = () => {
    const entityName = prompt("Name of the new entity", "");

    const canvasWidth = 800; // canvas width without padding,margin
    const canvasHeight = 600; // canvas height without padding,margin
    const entityWidth = 120; // entity width including padding,margin
    const entityHeight = 70; // entity height including padding,margin

    if (entityName && entityName.length <= 10) {
      entityStore.addEntity(
        entityName,
        Math.floor(Math.random() * (canvasWidth - entityWidth)),
        Math.floor(Math.random() * (canvasHeight - entityHeight))
      );
    } else if (entityName && entityName.length > 10) {
      alert("Entity name length should be a maximum of 10 characters.");
    }
  };
  return (
    <div>
      <h1>Domain Model Editor</h1>
      <button onClick={onAddEntity}>Add Entity</button>
      <p style={explanatoryTextStyle}>
        ℹ️ Tip: To add attributes, double-click on an entity. Keep attributes
        short and sweet – no more than 10 characters. You can add up to 5
        attributes for each entity.
      </p>
      <EntityCanvas />
    </div>
  );
});
