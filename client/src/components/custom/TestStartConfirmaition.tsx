import React, { useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Checkbox } from '../ui/checkbox'
  import { Button } from '../ui/button'
  import { useParams } from 'react-router-dom'
  import { useNavigate } from 'react-router-dom'
  import { useSelector,useDispatch } from 'react-redux'
  import axios from 'axios'
  import { StartTest } from '../../../Redux/slices/CodeTestData'
import { toast } from '@/hooks/use-toast'


function TestStartConfirmaition() {
  const params=useParams()
  const [Check,SetCheck] = useState(false)
  const navigate = useNavigate()
  console.log(params.TestId)
  const dispatch = useDispatch()

  // now function to start the test
  const StartTests = async()=>{
    try{
     if(Check){
      const res = await axios.get(`http://localhost:3000/student-test-hub/Student/CodeTest/${params.TestId}`,{withCredentials:true})
      console.log(res.data.data)
      const payload ={TestId:res.data.data._id,Questions:res.data.data.Questions}
      dispatch(StartTest(payload))
      navigate("/Student/CodeingTest")
     }else{
      toast({title:"Please read all the instruction before starting the test"})
     }
    }catch(err){
      console.log(err)
    }
  }

  return (
    <div className='flex justify-center p-10'>
    <Card className = 'w-[60rem] border-black  dark:border-white'>
        <CardHeader>
            <CardTitle>
                Start Coding Test
            </CardTitle>
            <CardDescription>
                Please read all the instructions carefully
            </CardDescription>
        </CardHeader>
        <CardContent className='flex justify-center'>
        <Card className="w-[40rem] bg-gray-100 dark:bg-gray-900 shadow-lg rounded-2xl p-6 transition-all mt-4">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-gray-900 dark:text-white">Test Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 text-sm">
              <li>Ensure a stable internet connection before starting the test.</li>
              <li>Do not refresh or leave the test page once started.</li>
              <li>Use only the allowed programming languages for solving problems.</li>
              <li>Plagiarism or copying solutions will result in disqualification.</li>
              <li>All solutions must be submitted before the timer ends.</li>
              <li>Your code will be evaluated based on correctness and efficiency.</li>
              <li>Suspicious activities may lead to termination of the test session.</li>
            </ul>
          </CardContent>
          <CardFooter className='gap-3 flex items-center'>
          <Checkbox onClick={()=>{
            SetCheck((data)=>data=!data)
            console.log(Check)
          }} /> Check if readed all the instruction carefully andwant to start the test right now
          </CardFooter>
        </Card>
        </CardContent>
        <CardFooter className='gap-3'>
            <Button onClick={StartTests}>Start Test</Button>
            <Button onClick={()=>navigate("/StudentTests")}>Cancel</Button>
        </CardFooter>
    </Card>
    </div>
  )
}

export default TestStartConfirmaition
