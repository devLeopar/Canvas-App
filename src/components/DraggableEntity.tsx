import React, { useState, useRef } from "react";
import { EntityObject } from "../types";
import { observer } from "mobx-react";

const entityBaseStyle = {
  position: "absolute" as const,
  width: 100,
  border: "1px solid cornflowerblue",
  borderRadius: 4,
  padding: 20,
};

type DraggableEntityProps = {
  entity: EntityObject;
  onDrop: (x: number, y: number) => void; // Callback for when entity is dropped
};

const DraggableEntity = observer(({ entity, onDrop }: DraggableEntityProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const lastMousePosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    lastMousePosition.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    // Update the global position here or call a passed-in callback
    onDrop(entity.x, entity.y);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const dx = e.clientX - lastMousePosition.current.x;
    const dy = e.clientY - lastMousePosition.current.y;

    // Update the local entity's position here
    entity.x += dx;
    entity.y += dy;

    lastMousePosition.current = { x: e.clientX, y: e.clientY };
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      style={Object.assign({}, entityBaseStyle, {
        cursor: isDragging ? "grabbing" : "grab",
        left: entity.x,
        top: entity.y,
      })}
    >
      {entity.name}
    </div>
  );
});

export default DraggableEntity;
