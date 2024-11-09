import { Panel } from "../editors/Panel";
import "./Preview.css";

export function Preview({ className }: Props) {
  return (
    <div className={`previews-Preview ${className}`}>
      <div className="content">
        <Panel className="panel" />
      </div>

      <div className="title">Fit Preview</div>
    </div>
  );
}

interface Props {
  className: string;
}
