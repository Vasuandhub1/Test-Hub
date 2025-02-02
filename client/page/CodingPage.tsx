import React from 'react'
import TextEditor from "../src/components/custom/TextEditor"
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
  } from "@/components/ui/resizable"
  import CodingDescription from '@/components/custom/CodingDescription'
  import CodingNavbar from '@/components/custom/CodingNavbar'

//    now handeling the functionb
function CodingPage() {
  return (
    <div>
        <CodingNavbar/>
      <div className='h-1/2'>
      <ResizablePanelGroup direction="horizontal">
      <ResizablePanel><CodingDescription/></ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel>
      <ResizablePanelGroup direction='vertical'>
      <ResizablePanel>
      <TextEditor/>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel>
        hello
      </ResizablePanel>
      </ResizablePanelGroup> 
      </ResizablePanel>     
    </ResizablePanelGroup>
      </div>
    </div>
  )
}

export default CodingPage
