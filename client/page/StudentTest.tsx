import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import StudentCodingTestsList from '@/components/custom/StudentCodingTestsList'


function StudentTest() {
  return (
    <div className='flex justify-center '>
        
      <Tabs defaultValue="Coding Tests" className=" text-center  ">
        Tests
  <TabsList className='w-full '>
    
    <TabsTrigger className='w-full' value="Coding Tests">Create Coding Test</TabsTrigger>
    <TabsTrigger className='w-full' value="MCQ Tests">Create MCQ Test</TabsTrigger>
  </TabsList>
  <TabsContent value="Coding Tests"><StudentCodingTestsList/></TabsContent>
  
  <TabsContent value="MCQ Tests">MCQ tests</TabsContent>
</Tabs>

    </div>
  )
}

export default StudentTest
