import React, { useEffect, useState } from 'react'
import { Card,CardContent,CardDescription,CardHeader,CardFooter,CardTitle } from '../ui/card'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function StudentMCQTestsList() {
    const [List,SetList] = useState([])
    const navigate = useNavigate()

    const GetCodeTestList = async()=>{
        try{
        const res = await axios.get("http://localhost:3000/Student-test-hub//Student/MCQTest",{withCredentials:true})
        console.log(res.data.data,"data")
        SetList([...res.data.data])
        }
        catch(err){
            console.log(err)
        }
    }

    const StartCodingTest = async(TestId:string)=>{
        console.log(TestId)
        navigate(`/StudentTestStartConfirmation/${TestId}`)
        "const res = await axios.get(`http://localhost:3000/student-test-hub/CodeTest/${TestId}`,{withCredentials:true})"
        
    }

    
    useEffect(()=>{
        GetCodeTestList()
    },[])

    console.log(List)
  return (
   <Card className='w-[70rem] border-black dark:border-white'>
    <CardHeader>
        <CardTitle>
            MCQ Test List
        </CardTitle>
        <CardDescription>
            List of All the Coding Tests Organized
        </CardDescription>
    </CardHeader>
    <CardContent className='flex  justify-evenly flex-wrap gap-[0.45rem]'>
        {List.map((elem,index)=>{
            return(
                <Card onClick={()=>StartCodingTest(elem._id)} className='text-left border-black dark:border-white hover:transition-all hover:translate-y-1 hover:shadow-md dark:hover:shadow-white hover:shadow-black' style={{"width":"22rem","height":"22rem"}}>
            <CardHeader>
                <CardTitle>
                    {elem.TestName}
                </CardTitle>
                <CardDescription>
                            MCQ Test
                        </CardDescription>
                        <CardDescription>
                            Start Time: {new Date(elem.TestStartTime).toLocaleString().split("GMT",1)}
                        </CardDescription>
                        <CardDescription>
                            Expire Time: { new Date(elem.TestExpireTime).toLocaleString().split("GMT",1)}
                        </CardDescription>
            </CardHeader>
            <CardContent>
                <Card className=' border-black dark:border-white overflow-auto scrollbar-hide' style={{"width":"18rem","height":"8rem"}}>
                    <CardHeader>
                        <CardTitle>
                            Description
                        </CardTitle>
                        
                        <CardDescription>
                           {elem.TestDescription}
                        </CardDescription>

                        <CardDescription className='flex justify-end items-center flex-wrap gap-2'>
        
                           <CardTitle className='text-white'>Faculty Name : </CardTitle> {elem?.Faculty?.Fname}
                        </CardDescription>
                        
                        <CardDescription className='flex justify-end items-center flex-wrap gap-2'>
        
                        <CardTitle className='text-white'>Time To attempt : </CardTitle>  {elem?.AttemptTime}hrs
                        </CardDescription>
                        

                    </CardHeader>
                </Card>
            </CardContent>
            <CardFooter className='flex justify-evenly'>
                <CardTitle>Branch : {elem?.Branch} </CardTitle>
                <CardTitle>Year : {elem?.Year} </CardTitle>
            </CardFooter>

        </Card>
        
            )
        })}
    </CardContent>
   </Card>
  )
}

export default StudentMCQTestsList
