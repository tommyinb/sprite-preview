import { JsonEditor } from "json-edit-react";
import { useContext, useMemo } from "react";
import { AppContext } from "../AppContext";
import "./Code.css";
import { Input } from "./input";

export function Code() {
  const { input, setInput } = useContext(AppContext);

  return (
    <div className="codes-Code">
      <JsonEditor
        data={useMemo(
          () => ({
            ...input,
            boundary: {
              ...input.boundary,
              left: parseFloat(input.boundary.left.toFixed(3)),
              right: parseFloat(input.boundary.right.toFixed(3)),
              top: parseFloat(input.boundary.top.toFixed(3)),
              bottom: parseFloat(input.boundary.bottom.toFixed(3)),
            },
            parts: input.parts.map((part) => ({
              ...part,
              left: parseFloat(
                (
                  part.left /
                  (1 - input.boundary.left - input.boundary.right)
                ).toFixed(3)
              ),
              top: parseFloat(
                (
                  part.top /
                  (1 - input.boundary.top - input.boundary.bottom)
                ).toFixed(3)
              ),
            })),
          }),
          [input]
        )}
        setData={(data) => {
          const input = data as Input;

          setInput({
            ...input,
            parts: input.parts.map((part) => ({
              ...part,
              left:
                part.left * (1 - input.boundary.left - input.boundary.right),
              top: part.top * (1 - input.boundary.top - input.boundary.bottom),
            })),
          });
        }}
      />
    </div>
  );
}
