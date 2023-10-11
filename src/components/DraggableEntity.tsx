import React, { useState, useRef, useEffect } from "react";
import { EntityObject } from "../types";
import { observer } from "mobx-react";
import { runInAction } from "mobx";

const entityBaseStyle = {
  position: "absolute" as const,
  width: 100,
  height: 30,
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

  const handleDoubleClick = () => {
    const newAttribute = prompt(`Add a new attribute to ${entity.name}:`, "");
    if (newAttribute && newAttribute.length <= 10) {
      // Limit the number of the attributes an entity can have
      if (entity.attributes.length >= 5) {
        alert("Maximum number of attributes reached!");
        return;
      }

      runInAction(() => {
        entity.attributes.push(newAttribute);
      });
    } else if (newAttribute && newAttribute.length > 10) {
      alert("Attribute name length should be a maximum of 10 characters.");
    }
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const dx = e.clientX - lastMousePosition.current.x;
      const dy = e.clientY - lastMousePosition.current.y;

      // Calculate new positions
      let newX = entity.x + dx;
      let newY = entity.y + dy;

      // Check boundaries for x
      if (newX < 0) {
        newX = 0;
      } else if (newX + 142 > 800) {
        // 142 is the entity width including padding,border,margin, 800 is canvas width
        newX = 800 - 142;
      }

      // Check boundaries for y
      if (newY < 0) {
        newY = 0;
      } else if (newY + 70 > 600) {
        // 70 is the entity height including padding,border,margin, 600 is canvas height
        newY = 600 - 70;
      }

      runInAction(() => {
        entity.x = newX;
        entity.y = newY;
      });

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
      onDoubleClick={handleDoubleClick}
      onMouseDown={handleMouseDown}
      style={Object.assign({}, entityBaseStyle, {
        cursor: isDragging ? "grabbing" : "grab",
        left: entity.x,
        top: entity.y,
      })}
    >
      {entity.name}
      {entity.attributes.map((attribute) => (
        <div key={attribute}>{attribute}</div>
      ))}
    </div>
  );
});

export default DraggableEntity;
