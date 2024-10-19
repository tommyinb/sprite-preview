import { createContext, Dispatch, SetStateAction } from "react";
import { Input } from "./codes/input";

export const AppContext = createContext<{
  input: Input;
  setInput: Dispatch<SetStateAction<Input>>;
}>({
  input: {
    boundary: { left: 0, right: 0, top: 0, bottom: 0 },
    parts: [],
  },
  setInput: () => {},
});
