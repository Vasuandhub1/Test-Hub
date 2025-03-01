import React from 'react'
import FacultyCreateCodingQuestion from '@/components/custom/FacultyCreateCodingQuestion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import FacultyCreateMCQQuestion from '@/components/custom/FacultyCreateMCQQuestion'

function CreateQuestions() {
  return (
    <div className='flex justify-center '>

      <Tabs defaultValue="MCQ Question" className="w-[400px]">
        <h1 className=' font-bold text-2xl text-center  dark:text-white text-black'>Create Questions</h1>
  <TabsList className=' w-full '>
    <TabsTrigger className='w-full' value="Coding Question">Coding Question</TabsTrigger>
    <TabsTrigger className='w-full' value="MCQ Question">MCQ Question</TabsTrigger>
  </TabsList>
  <TabsContent value="Coding Question"><div className='flex justify-center'><FacultyCreateCodingQuestion/></div></TabsContent>
  <TabsContent value="MCQ Question"><FacultyCreateMCQQuestion/></TabsContent>
</Tabs>
</div>
 
  )
}

export default CreateQuestions
