import React, { useState, useRef, useEffect } from "react";
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

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const dx = e.clientX - lastMousePosition.current.x;
      const dy = e.clientY - lastMousePosition.current.y;

      entity.x += dx;
      entity.y += dy;

      lastMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleGlobalMouseMove);
    window.addEventListener("mouseup", handleGlobalMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleGlobalMouseMove);
      window.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, [isDragging, entity]);

  return (
    <div
      onMouseDown={handleMouseDown}
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
