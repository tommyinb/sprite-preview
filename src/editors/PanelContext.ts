import { createContext, Dispatch, RefObject, SetStateAction } from "react";
import { Drag } from "./drag";

export const PanelContext = createContext<{
  ref: RefObject<HTMLDivElement>;

  drag: Drag;
  setDrag: Dispatch<SetStateAction<Drag>>;
}>({
  ref: { current: null },

  drag: { target: undefined, start: { x: 0, y: 0 } },
  setDrag: () => {},
});
