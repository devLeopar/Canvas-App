import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react";
import { Entity as EntityData, EntityStore } from "../stores/entitystore";
import DraggableEntity from "./DraggableEntity";
import { EntitiesContext } from "../stores/EntitiesContext";

const canvasBaseStyle: React.CSSProperties = {
  position: "relative",
  width: "800px",
  height: "600px",
  backgroundColor: "#f4f4f4",
  border: "1px solid #ddd",
  borderRadius: "4px",
  margin: "20px 0",
};

const EntityCanvas = observer(() => {
  const entityStore = useContext(EntitiesContext);

  useEffect(() => {
    // Fetch data whenever EntityCanvas is mounted or updated
    entityStore.fetchData().catch((error) => {
      console.error(`Failed to fetch entities: ${error.message}`);
    });
  }, [entityStore]);

  return (
    <div style={canvasBaseStyle}>
      {entityStore.entities.map((entity) => (
        <DraggableEntity key={entity.id} entity={entity} />
      ))}
    </div>
  );
});

export default EntityCanvas;
