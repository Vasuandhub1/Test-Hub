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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import axios from 'axios'
import { Badge } from "@/components/ui/badge"

import { Textarea } from '@/components/ui/textarea'

import { toast } from '@/hooks/use-toast'

//    now handeling the functionb
function CodingPage({SetDescription,Question}) {
  const source_code=useSelector((state:RootState)=>state.code.code)

  const [language,setLanguage]=useState<number>(45)
  const [output,SetOutput]=useState("No submission yet...")
  const [Input,SetInput]=useState("")
  const [Terminal,SetTerminal] = useState("")
  console.log(language)

  const SubmitteSolution = async()=>{
        try{
          SetOutput("Running Hiddin Test Cases...")
          const data={"language_id":language,
            source_code
          }
          const res = await axios.post("http://localhost:3000/student-test-hub/Student/CodeQuestionSubmission",{data,QuestionId:Question._id},{withCredentials:true})
          console.log(res)

          SetOutput(`${res!.data!.data!.status!.description}`)

        }catch(err){
          console.log(err)
          SetOutput(err?.response?.data?.message)
          toast({title:err?.response?.data?.message , description:err?.response?.data?.data})
        }
      }

  // now handel the functio to run the code 
  const handleRunButton = async()=>{
    const data={"language_id":language,
      source_code
    }
    if(Input){
      data.stdin=Input
    }
    
    SetTerminal("compiling...")
     await axios.post("http://localhost:3000/student-test-hub/test",{data}).then((res)=>{
      console.log(res)
      if(res!.data!.data!.status_id === 3){
        SetTerminal("running...")
        setTimeout(()=>{
          console.log(res)
          SetTerminal(res!.data!.data!.stdout)
        },3000)
        }else{
          SetTerminal("running...")
          setTimeout(() => {
            console.log(res)
            SetTerminal(res!.data!.data!.status!.description)
          }, 3000);
        }

    }).catch((err)=>{
      SetTerminal("Err in the server")
      console.log(err)
      toast({title:err?.response?.data?.message , description:err?.response?.data?.data})
    })
    
   
  }
  return (
    <div className=''>
        <CodingNavbar onRun={handleRunButton} SetDescription={SetDescription} onSubmit={SubmitteSolution}/>
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
        {/* navigation menue fo rthe testst */}
        <Tabs defaultValue="Terminal" className="w-[400px]">
  <TabsList>
    <TabsTrigger value="Terminal">Terminal</TabsTrigger>
    <TabsTrigger value="Output">Output</TabsTrigger>
    <TabsTrigger value="Input">Input</TabsTrigger>
  </TabsList>
  <TabsContent value="Terminal" className='p-2'><p className=' text-lg font-mono'> Terminal :{Terminal}</p></TabsContent>
  <TabsContent value="Output"  className='p-2 text-lg'>{output==="No submission yet..."  || output === "Accepted" || output === "Running Hiddin Test Cases..." ?<div>Output : <Badge variant="secondary" className=' text-lg' >{output}</Badge> </div>:<div className=''>Output :<Badge className=' text-lg' variant="destructive" >{output}</Badge></div>}</TabsContent>
  <TabsContent value="Input" className='p-2'>
    <div >
      <label htmlFor="">
        Enter Custom Input (To check your code)
      <Textarea onChange={(e)=>SetInput(e.target.value)} placeholder='The output will be displayed on the Terminal' ></Textarea>
      </label>
    </div>
  </TabsContent>
</Tabs>



      </ResizablePanel>
      </ResizablePanelGroup> 
      </ResizablePanel>     
    </ResizablePanelGroup>:<ResizablePanelGroup direction="horizontal">
    <ResizablePanel><TextEditor setLanguage={setLanguage}/></ResizablePanel>
    <ResizableHandle withHandle />
      <ResizablePanel>
     {Terminal}
      </ResizablePanel>     
    </ResizablePanelGroup>}
      </div>
    </div>
  )
}

export default CodingPage
