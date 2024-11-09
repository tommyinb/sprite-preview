import { useCallback, useContext, useEffect, useState } from "react";
import { AppContext } from "../AppContext";
import { PanelContext } from "./PanelContext";
import "./Part.css";

export function Part({ name }: Props) {
  const { input } = useContext(AppContext);
  const part = input.parts.find((part) => part.name === name)!;

  const { ref, drag, setDrag } = useContext(PanelContext);

  const getScale = useCallback(
    () => 0.3 * ((ref.current?.clientHeight ?? 800) / 800),
    [ref]
  );
  const [scale, setScale] = useState(getScale);

  useEffect(() => {
    if (ref.current) {
      const observer = new ResizeObserver(() => setScale(getScale()));
      observer.observe(ref.current);

      return () => observer.disconnect();
    }
  }, [getScale, ref]);

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
        transform: `scale(${scale})`,
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
