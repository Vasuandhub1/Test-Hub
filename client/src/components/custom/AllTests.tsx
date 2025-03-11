import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import axios from 'axios'

function AllTests() {

    const GetAllTests = async()=>{
         const res =  await axios.get("")
        }
  return (
    
    <Card className='w-[50rem] border-black dark:border-white'>
    <CardHeader className='text-center'>
      <CardTitle>All Coding Test</CardTitle>
      <CardDescription>List of all the coding tests</CardDescription>
    </CardHeader>
    <CardContent className='flex justify-evenly flex-wrap'>
      <Card className='w-full'>
        <CardHeader>
            <CardTitle>hello</CardTitle>
        </CardHeader>
      </Card>
      
    </CardContent>
  </Card>
  )
}

export default AllTests
