import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react";
import { Entity as EntityData, EntityStore } from "../stores/entitystore";
import { EntitiesContext } from "../index";
import DraggableEntity from "./DraggableEntity";

const entityBaseStyle = {
  position: "absolute" as const,
  width: 100,
  border: "1px solid cornflowerblue",
  borderRadius: 4,
  padding: 20,
};

const canvasBaseStyle: React.CSSProperties = {
  position: "relative",
  width: "800px",
  height: "600px",
  backgroundColor: "#f4f4f4",
  border: "1px solid #ddd",
  borderRadius: "4px",
  // overflow: "hidden", TODO: when finding a way to add entities into canvas this should be re-activated.
  margin: "20px 0",
};

export const EntityCanvas = observer(() => {
  const entityStore = useContext(EntitiesContext);

  useEffect(() => {
    // Fetch data whenever EntityCanvas is mounted or updated
    entityStore.fetchData().catch((error) => {
      console.error(`Failed to fetch entities: ${error.message}`);
    });
  }, [entityStore]);

  const handleDrop = (entityId: number, x: number, y: number) => {
    entityStore.updatePosition(entityId, x, y);
  };

  return (
    <div style={canvasBaseStyle}>
      {entityStore.entities.map((entity) => (
        <DraggableEntity
          key={entity.id}
          entity={entity}
          onDrop={(x, y) => handleDrop(entity.id, x, y)}
        />
      ))}
    </div>
  );
});

type EntityProps = {
  entity: EntityData;
};

const Entity = observer((props: EntityProps) => (
  <div
    style={Object.assign({}, entityBaseStyle, {
      left: props.entity.y,
      top: props.entity.x,
    })}
  >
    {props.entity.name}
  </div>
));
