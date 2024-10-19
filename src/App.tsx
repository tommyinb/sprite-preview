import { useMemo, useState } from "react";
import "./App.css";
import { AppContext } from "./AppContext";
import { Code } from "./codes/Code";
import { firstInput } from "./codes/firstInput";
import { Input } from "./codes/input";
import { Editor } from "./editors/Editor";
import { Preview } from "./previews/Preview";

function App() {
  const [input, setInput] = useState<Input>(firstInput);

  return (
    <div className="App">
      <AppContext.Provider
        value={useMemo(() => ({ input, setInput }), [input])}
      >
        <Preview />

        <Editor />

        <Code />
      </AppContext.Provider>
    </div>
  );
}

export default App;
