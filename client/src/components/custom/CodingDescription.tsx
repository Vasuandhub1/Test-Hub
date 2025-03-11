import { RootState } from '@reduxjs/toolkit/query';
import React from 'react'
import { useSelector } from 'react-redux'
import { useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


function CodingDescription({Question}) {
    const isDarkMode = useSelector((state:RootState)=>state.DarkLight.isDarkMode)
  useEffect(() => {
    // Apply theme based on darkMode state
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);
  return (
    <div className=' p-5   h-screen overflow-auto bg-white text-black dark:bg-inherit dark:text-white dark:from-zinc-900 dark:to-zinc-700'>
      <h1 className=' my-2 font-semibold text-2xl'>{Question.QuestionName!=null?Question.QuestionName:"loading.."}</h1>
      <p className='my-4' >
        <h4 className='text-lg font-medium'>Description</h4>
        {Question.QuestionDescription!=null?Question.QuestionDescription:"loading..."} </p>
      <h4 className='my-4'>
      <h4 className='text-lg font-medium'>Sample Test Case</h4>
      <Table>
        
  <TableCaption>Sample Test Cases</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="">Sample Input</TableHead>
      
      <TableHead className="">Sample Output</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
  {Question.InputTestCase.map((elem,index)=>{
          return(<>
          
          <TableRow>
      <TableCell className="font-medium overflow-auto">{elem}</TableCell>
      
      <TableCell className=" overflow-auto">{Question.OutputTestCase[index]}</TableCell>
    </TableRow>
          </>)
        })}
  </TableBody>
</Table>
      </h4>
      <h4 className='my-4'>
      <h4 className='text-lg font-medium'>Time Constrains</h4>
      <h4>{}</h4>
      </h4>
      <h4 className='my-4'>
      <h4 className='text-lg font-medium'>Space Constrains</h4>
      <h4>{}</h4>
      </h4>
    </div>
  )
}

export default CodingDescription
