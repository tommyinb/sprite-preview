import { DragBoundary } from "./dragBoundary";
import { DragPart } from "./dragPart";

export interface Drag {
  target: DragPart | DragBoundary | undefined;

  start: {
    x: number;
    y: number;
  };
}
