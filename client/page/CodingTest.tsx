import React, { useState } from 'react'
import { useEffect } from 'react';
import { Button } from "../src/components/ui/button";
 
import CodingPage from './CodingPage'
import { useSelector ,useDispatch } from 'react-redux';
import { RootState } from '@reduxjs/toolkit/query';
import axios from 'axios';
import { toast } from '@/hooks/use-toast';
import { EndTest } from '../Redux/slices/CodeTestData';


function CodingTest() {
    const Dispatch = useDispatch()
    const [...Questions]  = useSelector((state:RootState)=>state.CodeTestData.Questions)
    interface QuestionData{
       _id:string,
        QuestionName:string,
        QuestionDescription:string,
        InputTestCase:string[],
        OutputTestCase:string[],
        Difficulty:string,
        SpaceConstrains:string,
        TimeConstrains:string
    }
    const[Question,setQuestion]=useState<QuestionData>({
        _id:"",
        QuestionName:"",
        QuestionDescription:"",
        InputTestCase:[],
        OutputTestCase:[],
        SpaceConstrains:"",
        TimeConstrains:"",
        Difficulty:""
    })
    const ExitTest = async()=>{
        Dispatch(EndTest())
    }

    const SubmitteTest =async()=>{
      try{
        const res = await axios.post("http://localhost:3000/student-test-hub/Student/TestCodeSubmit","",{withCredentials:true})
        toast({title:res?.data?.data?.message,description:res?.data?.data?.data})
        Dispatch(EndTest())
      }catch(err){
        console.log(err)
      }
    }
    console.log(Question,"Question")
    const GetQuestion = async()=>{
        try{
            const res=await axios.get(`http://localhost:3000/student-test-hub/Student/CodeQuestion/${Questions[CurrentQuestion]}`)
            setQuestion({QuestionName:res.data.data.QuesName,
              _id:res.data.data._id,
                QuestionDescription:res.data.data.QuesDescrition,
                InputTestCase:[...res.data.data.InputTestCase],
                OutputTestCase:[...res.data.data.OutputTestCase],
                Difficulty:res.data.data.DifficultyLevel,
                SpaceConstrains:res.data.data.SpaceConstrains,
                TimeConstrains:res.data.data.TimeConstrains
            })
        }catch(err){
            console.log(err)
        }
    }

    

    const [CurrentQuestion,SetCurrentQuestion] = useState(0)

    useEffect(() => {
        GetQuestion()
        document.documentElement.requestFullscreen().catch(() => {});
      }, [CurrentQuestion]);
      console.log(Question,"hell")
  return (
    <div className="flex h-full w-screen space-x-6 box-border ">
    {/* Sidebar */}
    <aside className="w-64   bg-zinc-300  dark:bg-zinc-900   text p-4 ">
      <h2 className="font-bold mb-4">Questions</h2>
      <ul className="space-y-5 p-4">
       {Questions.map((elem,index)=>{
        return(
            <li
            key={index}
            onClick={()=>{SetCurrentQuestion(index) 
                console.log(index)}}
            className={`p-1 bg-white dark:bg-zinc-800  rounded-md  text-center cursor-pointer  hover:bg-zinc-300 dark:hover:bg-zinc-500 ${CurrentQuestion === 1+index?"bg-blue-500 text-white":"bg-white dark:bg-zinc-600 hover:bg-zinc-300 dark:hover:bg-zinc-500"}`}
          >
            Question {index + 1}
            
          </li>
        )
       })}
      </ul>
    </aside>

    {/* Main Content */}
    <div className="flex-1 flex flex-col">
      {/* Navbar with Full Width */}
      <nav className="w-full bg-zinc-300 flex justify-between items-center dark:text-white text-black dark:bg-zinc-800 p-4 shadow-lg">
        <div className="font-bold">Test Name</div>
        <div className="flex gap-2">
          <Button onClick={()=>{
            if(CurrentQuestion>0){
                SetCurrentQuestion((data)=>data-1)
            }else{
                toast({title:"Reached at start Question"})
            }
          }}>Prev</Button>
          <Button onClick={()=>{
            if(CurrentQuestion<Questions.length){
                SetCurrentQuestion((data)=>data+1)
            }else{
                toast({title:"Reached at last question"})
            }
          }}>Next</Button>
        </div>
        <div className='flex gap-4'>
          <Button onClick={SubmitteTest}>Submit Test</Button>
          <Button onClick={ExitTest}>Exit</Button>
        </div>
      </nav>

      {/* Content Area */}
      <div className="flex-1 flex justify-center items-center bg-white dark:bg-zinc-900">
        <CodingPage SetDescription={true} Question={Question}/>
      </div>
    </div>
  </div>

  )
}

export default CodingTest
