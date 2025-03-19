import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import StudentCodingTestsList from "../src/components/custom/StudentCodingTestsList"
import StudentMCQTestsList from '@/components/custom/StudentMCQTestList'


function StudentTest() {
  return (
    <div className='flex justify-center '>
        
      <Tabs defaultValue="Coding Tests" className=" text-center  ">
        Tests
  <TabsList className='w-full '>
    
    <TabsTrigger className='w-full' value="Coding Tests"> Coding Test</TabsTrigger>
    <TabsTrigger className='w-full' value="MCQ Tests"> MCQ Test</TabsTrigger>
  </TabsList>
  <TabsContent value="Coding Tests"><StudentCodingTestsList/></TabsContent>
  
  <TabsContent value="MCQ Tests"><StudentMCQTestsList/></TabsContent>
</Tabs>

    </div>
  )
}

export default StudentTest
