import { useContext } from "react";
import { AppContext } from "../AppContext";
import "./Boundary.css";
import { PanelContext } from "./PanelContext";

export function Boundary() {
  const { input } = useContext(AppContext);

  const { drag, setDrag } = useContext(PanelContext);

  return (
    <div className="editors-Boundary">
      <div
        className={`left ${
          drag.target?.type === "boundary" && drag.target.side === "left"
            ? "dragging"
            : ""
        }`}
        style={{ left: `${input.boundary.left * 100}%` }}
        onPointerDown={(event) =>
          setDrag({
            target: {
              type: "boundary",
              side: "left",
              start: input.boundary.left,
            },
            start: { x: event.clientX, y: event.clientY },
          })
        }
      />

      <div
        className={`right ${
          drag.target?.type === "boundary" && drag.target.side === "right"
            ? "dragging"
            : ""
        }`}
        style={{ right: `${input.boundary.right * 100}%` }}
        onPointerDown={(event) =>
          setDrag({
            target: {
              type: "boundary",
              side: "right",
              start: input.boundary.right,
            },
            start: { x: event.clientX, y: event.clientY },
          })
        }
      />

      <div
        className={`top ${
          drag.target?.type === "boundary" && drag.target.side === "top"
            ? "dragging"
            : ""
        }`}
        style={{ top: `${input.boundary.top * 100}%` }}
        onPointerDown={(event) =>
          setDrag({
            target: {
              type: "boundary",
              side: "top",
              start: input.boundary.top,
            },
            start: { x: event.clientX, y: event.clientY },
          })
        }
      />

      <div
        className={`bottom ${
          drag.target?.type === "boundary" && drag.target.side === "bottom"
            ? "dragging"
            : ""
        }`}
        style={{ bottom: `${input.boundary.bottom * 100}%` }}
        onPointerDown={(event) =>
          setDrag({
            target: {
              type: "boundary",
              side: "bottom",
              start: input.boundary.bottom,
            },
            start: { x: event.clientX, y: event.clientY },
          })
        }
      />
    </div>
  );
}
