import { useEffect, useState } from "react";
import MonacoEditor from "@monaco-editor/react";
import EditorNavbar from "./EditorNavbar";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@reduxjs/toolkit/query";
import  {setCode} from "../../../Redux/slices/code"
import {debounce} from "../../../utils/utils"

const TextEditor = ({setLanguage}) => {

     interface languageList{
        id:number,
        name:string
    }
    // decler the dispatch 
    const dispatch = useDispatch()

    // now get the values from th redux
  const EditorTheme = useSelector((state:RootState)=>state.EditorTheme.Theme) 
  const code = useSelector((state:RootState)=>state.code.code)
  console.log(code)
 
  
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
},[])



  return (
    <div>
        <nav>
            <EditorNavbar languages={languages} setLanguage={setLanguage}/>
        </nav>  
    <MonacoEditor
      height="100rem"
      defaultLanguage="cpp"
      value={code}
      theme={EditorTheme}
      onChange={debounce((value:string) =>{const payload=value
        dispatch(setCode(payload))
      } ,3000)}
    />
    </div>
  );
};

export default TextEditor;
