import { useContext, useMemo, useRef, useState } from "react";
import { AppContext } from "../AppContext";
import { Boundary } from "./Boundary";
import { Drag } from "./drag";
import { PanelContext } from "./PanelContext";
import { Part } from "./Part";
import { useStopTouchMove } from "./useStopTouchMove";

export function Panel({ className }: Props) {
  const { input, setInput } = useContext(AppContext);

  const ref = useRef<HTMLDivElement>(null);

  const [drag, setDrag] = useState<Drag>({
    target: undefined,
    start: { x: 0, y: 0 },
  });

  useStopTouchMove(ref, !!drag.target);

  return (
    <div
      className={className}
      ref={ref}
      onPointerDown={(event) => ref.current!.setPointerCapture(event.pointerId)}
      onPointerMove={(event) => {
        const { target } = drag;

        if (!target) {
          return;
        }

        const movedLeft =
          (event.clientX - drag.start.x) / ref.current!.clientWidth;
        const movedTop =
          (event.clientY - drag.start.y) / ref.current!.clientHeight;

        switch (target.type) {
          case "part":
            {
              setInput((input) => ({
                ...input,
                parts: input.parts.map((part) =>
                  part.name === target.name
                    ? {
                        ...part,
                        left: target.start.left + movedLeft,
                        top: target.start.top + movedTop,
                      }
                    : part
                ),
              }));
            }
            break;

          case "boundary":
            {
              switch (target.side) {
                case "left":
                  setInput((input) => ({
                    ...input,
                    boundary: {
                      ...input.boundary,
                      left: target.start + movedLeft,
                    },
                  }));
                  break;

                case "right":
                  setInput((input) => ({
                    ...input,
                    boundary: {
                      ...input.boundary,
                      right: target.start - movedLeft,
                    },
                  }));
                  break;

                case "top":
                  setInput((input) => ({
                    ...input,
                    boundary: {
                      ...input.boundary,
                      top: target.start + movedTop,
                    },
                  }));
                  break;

                case "bottom":
                  setInput((input) => ({
                    ...input,
                    boundary: {
                      ...input.boundary,
                      bottom: target.start - movedTop,
                    },
                  }));
                  break;
              }
            }
            break;
        }
      }}
      onPointerUp={() => setDrag({ target: undefined, start: { x: 0, y: 0 } })}
      onPointerCancel={() =>
        setDrag({ target: undefined, start: { x: 0, y: 0 } })
      }
    >
      <PanelContext.Provider
        value={useMemo(
          () => ({
            ref,
            drag,
            setDrag,
          }),
          [drag]
        )}
      >
        <Boundary />

        {input.parts.map((part) => (
          <Part key={part.name} name={part.name} />
        ))}
      </PanelContext.Provider>
    </div>
  );
}

interface Props {
  className?: string;
}
