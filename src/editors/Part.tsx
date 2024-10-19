import { useContext } from "react";
import { AppContext } from "../AppContext";
import { PanelContext } from "./PanelContext";
import "./Part.css";

export function Part({ name }: Props) {
  const { input } = useContext(AppContext);
  const part = input.parts.find((part) => part.name === name)!;

  const { drag, setDrag } = useContext(PanelContext);

  return (
    <div
      className={`editors-Part ${part.invisible ? "invisible" : ""} ${
        drag.target?.type === "part" && drag.target.name === part.name
          ? "dragging"
          : ""
      } ${drag.target?.type === "boundary" ? "boundary" : ""}`}
      style={{
        left: `${part.left * 100}%`,
        top: `${part.top * 100}%`,
      }}
      onPointerDown={(event) => {
        setDrag({
          target: {
            type: "part",
            name: part.name,
            start: {
              left: part.left,
              top: part.top,
            },
          },
          start: { x: event.clientX, y: event.clientY },
        });
      }}
    >
      <img src={`parts/${part.name}.png`} alt={part.name} draggable={false} />
    </div>
  );
}

interface Props {
  name: string;
}
