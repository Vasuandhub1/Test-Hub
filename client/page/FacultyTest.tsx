import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import FacultyCreateCodingTest from "../src/components/custom/FacultyCreateCodingTest"
import AllTests from '@/components/custom/AllTests'


function FacultyTest() {
  return (
    <div className='flex justify-center '>
      <Tabs defaultValue="All Tests" className="w-[100rem]">
  <TabsList className='w-full'>
    <TabsTrigger className='w-full' value="All Tests">All Tests</TabsTrigger>
    <TabsTrigger className='w-full' value="Create Coding Test">Create Coding Test</TabsTrigger>
    <TabsTrigger className='w-full' value="Create MCQ Test">Create MCQ Test</TabsTrigger>
  </TabsList>
  <TabsContent value="Create Coding Test"><FacultyCreateCodingTest/></TabsContent>
  <TabsContent value="All Tests"><AllTests></AllTests></TabsContent>
  <TabsContent value="Create MCQ Test">Change your password here.</TabsContent>
</Tabs>

    </div>
  )
}

export default FacultyTest
