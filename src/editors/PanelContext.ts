import { createContext, Dispatch, SetStateAction } from "react";
import { Drag } from "./drag";

export const PanelContext = createContext<{
  drag: Drag;
  setDrag: Dispatch<SetStateAction<Drag>>;
}>({
  drag: { target: undefined, start: { x: 0, y: 0 } },
  setDrag: () => {},
});
