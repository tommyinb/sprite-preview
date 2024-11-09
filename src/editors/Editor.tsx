import "./Editor.css";
import { Panel } from "./Panel";

export function Editor({ className }: Props) {
  return (
    <div className={`editors-Editor ${className}`}>
      <div className="content">
        <Panel className="panel" />
      </div>

      <div className="title">Drag Editor</div>
    </div>
  );
}

interface Props {
  className: string;
}
