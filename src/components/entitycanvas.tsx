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

export const EntityCanvas = observer(() => {
  const entityStore = useContext(EntitiesContext);

  return (
    <div>
      {entityStore.entities.map((entity) => (
        <Entity entity={entity} />
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
