import { useState } from "react";
import MonacoEditor from "@monaco-editor/react";
import EditorNavbar from "./EditorNavbar";

const TextEditor = () => {
  const [code, setCode] = useState("// Write your code here...");

  return (
    <div>
        <nav>
            <EditorNavbar/>
        </nav>
    <MonacoEditor
      height="350px"
      defaultLanguage="javascript"
      defaultValue={code}
      theme="vs-dark"
      onChange={(value) => setCode(value)}
    />
    </div>
  );
};

export default TextEditor;
