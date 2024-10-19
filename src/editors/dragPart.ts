export interface DragPart {
  type: "part";

  name: string;

  start: {
    left: number;
    top: number;
  };
}
