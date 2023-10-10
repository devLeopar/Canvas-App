import React, { useContext } from "react";
import { observer } from "mobx-react";
import { Entity as EntityData, EntityStore } from "../stores/entitystore";
import { EntitiesContext } from "../index";

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
  overflow: "hidden",
  margin: "20px 0",
};

export const EntityCanvas = observer(() => {
  const entityStore = useContext(EntitiesContext);

  return (
    <div style={canvasBaseStyle}>
      {entityStore.entities.map((entity) => (
        <Entity key={entity.id} entity={entity} />
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
