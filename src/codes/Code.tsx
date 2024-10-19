import { useCallback, useContext, useEffect, useState } from "react";
import { AppContext } from "../AppContext";
import "./Code.css";
import { Input } from "./input";
import { Part } from "./part";

export function Code() {
  const { input, setInput } = useContext(AppContext);

  const [text, setText] = useState(() => JSON.stringify(input, null, 2));
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    const output = {
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
          (part.top / (1 - input.boundary.top - input.boundary.bottom)).toFixed(
            3
          )
        ),
      })),
    };

    const text = JSON.stringify(output, null, 2);
    setText(text);
  }, [input]);

  const applyText = useCallback(() => {
    try {
      const input = JSON.parse(text) as Input;

      setInput({
        ...input,
        parts: input.parts.map((part: Part) => ({
          ...part,
          left: part.left * (1 - input.boundary.left - input.boundary.right),
          top: part.top * (1 - input.boundary.top - input.boundary.bottom),
        })),
      });
    } catch (error) {
      console.error(error);
    }
  }, [setInput, text]);

  return (
    <textarea
      className={`codes-Code ${errored ? "errored" : ""}`}
      value={text}
      onChange={(event) => {
        setText(event.target.value);

        try {
          JSON.parse(event.target.value);
        } catch (error) {
          console.error(error);

          setErrored(true);
        }
      }}
      onBlur={applyText}
      onKeyDown={(event) => {
        if (event.key === "Enter" && event.ctrlKey) {
          applyText();
        }
      }}
    />
  );
}
