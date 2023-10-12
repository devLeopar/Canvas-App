import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { EntityObject } from "../types";
import { observer } from "mobx-react";
import { runInAction } from "mobx";

const entityBaseStyle = {
  position: "absolute" as const,
  display: "flex",
  flexDirection: "column" as const,
  justifyContent: "center",
  alignItems: "center",
  width: 120,
  minWidth: 120,
  minHeight: 70,
  backgroundColor: "#f7f8fa",
  border: "1px solid #cfd7df",
  borderRadius: 4,
  padding: "10px 20px",
  boxSizing: "border-box" as const,
};

const titleStyle = {
  margin: "0 0 10px 0",
  fontSize: "1.2em",
  borderBottom: "1px solid #cfd7df",
  paddingBottom: "5px",
};

const attributeStyle = {
  fontSize: "1em",
  listStyleType: "none",
  padding: 0,
  margin: 0,
};

type DraggableEntityProps = {
  entity: EntityObject;
};

const DraggableEntity = observer(({ entity }: DraggableEntityProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const lastMousePosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const [entitySize, setEntitySize] = useState({ width: 120, height: 70 }); // Initial dimensions
  const entityRef = useRef<HTMLDivElement | null>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    lastMousePosition.current = { x: e.clientX, y: e.clientY };
  };

  useLayoutEffect(() => {
    if (entityRef.current) {
      setEntitySize({
        width: entityRef.current.offsetWidth,
        height: entityRef.current.offsetHeight,
      });
    }
  }, [entity.attributes.length]); // Trigger when the number of attributes changes

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
      } else if (newX + entitySize.width > 800) {
        newX = 800 - entitySize.width;
      }

      // Check boundaries for y
      if (newY < 0) {
        newY = 0;
      } else if (newY + entitySize.height > 600) {
        newY = 600 - entitySize.height;
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
      ref={entityRef}
      onDoubleClick={handleDoubleClick}
      onMouseDown={handleMouseDown}
      style={{
        ...entityBaseStyle,
        left: entity.x,
        top: entity.y,
        cursor: isDragging ? "grabbing" : "grab",
      }}
    >
      <h2 style={titleStyle}>{entity.name}</h2>
      <ul style={attributeStyle}>
        {entity.attributes.map((attribute) => (
          <li key={attribute}>{attribute}</li>
        ))}
      </ul>
    </div>
  );
});

export default DraggableEntity;
