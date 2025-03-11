import React from 'react'
import { useState } from 'react'
import TextEditor from "../src/components/custom/TextEditor"
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
  } from "@/components/ui/resizable"
  import CodingDescription from '@/components/custom/CodingDescription'
  import CodingNavbar from '@/components/custom/CodingNavbar'
  import {useSelector } from 'react-redux'
import { RootState } from '@reduxjs/toolkit/query'
import {debounce} from "../utils/utils"
import axios from 'axios'

//    now handeling the functionb
function CodingPage({SetDescription,Question}) {
  const source_code=useSelector((state:RootState)=>state.code.code)

  const [language,setLanguage]=useState<number>(45)
  const [output,SetOutput]=useState("")
  console.log(language)

  // now handel the functio to run the code 
  const handleRunButton = async()=>{
    const data={"language_id":language,
      source_code
    }
    SetOutput("compiling...")
     await axios.post("http://localhost:3000/student-test-hub/test",{data}).then((res)=>{
      
      if(res!.data!.data!.status_id === 3){
        SetOutput("running...")
        setTimeout(()=>{
          SetOutput(res!.data!.data!.stdout)
        },3000)
        }else{
          SetOutput("running...")
          setTimeout(() => {
            SetOutput(res!.data!.data!.status!.description)
          }, 3000);
        }

    }).catch((err)=>{
      SetOutput("Err in the server")
      alert(err)
    })
    
   
  }
  return (
    <div className=''>
        <CodingNavbar onRun={handleRunButton} onSubmit={handleRunButton}/>
      <div className='h-screen '>
    {SetDescription?<ResizablePanelGroup direction="horizontal">
    <ResizablePanel><CodingDescription Question={Question}/></ResizablePanel>
    <ResizableHandle withHandle />
      <ResizablePanel>
      <ResizablePanelGroup direction='vertical'>
      <ResizablePanel>
      <TextEditor setLanguage={setLanguage}/>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel >
        
          {output}
      </ResizablePanel>
      </ResizablePanelGroup> 
      </ResizablePanel>     
    </ResizablePanelGroup>:<ResizablePanelGroup direction="horizontal">
    <ResizablePanel><TextEditor setLanguage={setLanguage}/></ResizablePanel>
    <ResizableHandle withHandle />
      <ResizablePanel>
     {output}
      </ResizablePanel>     
    </ResizablePanelGroup>}
      </div>
    </div>
  )
}

export default CodingPage
