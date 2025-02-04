import { useEffect, useState } from "react";
import MonacoEditor from "@monaco-editor/react";
import EditorNavbar from "./EditorNavbar";
import axios from "axios";

const TextEditor = () => {
    export interface languageList{
        id:number,
        name:string
    }

  const [code, setCode] = useState("// Write your code here...");
  const [languages,setLanguages] = useState<languageList[]>([])
  
//   now get the all set of languages using api call
const getAllLanguages=async()=>{
    const data = await axios.get("https://ce.judge0.com/languages/")
    console.log(data)
    //  now se t the data to the language
    setLanguages([...data!.data])
}
// now handel the use effect 
useEffect(()=>{
    getAllLanguages()
},[languages])
console.log(languages)
  return (
    <div>
        <nav>
            <EditorNavbar languages={languages}/>
        </nav>
    <MonacoEditor
      height="100rem"
      defaultLanguage="javascript"
      defaultValue={code}
      theme="vs-dark"
      onChange={(value) => setCode(value)}
    />
    </div>
  );
};

export default TextEditor;
