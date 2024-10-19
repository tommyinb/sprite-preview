export interface DragBoundary {
  type: "boundary";

  side: "left" | "right" | "top" | "bottom";

  start: number;
}
