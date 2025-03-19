import React, { useEffect, useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function AllTests() {

  const navigate = useNavigate()
  const [ CodeList,SetCodeList]= useState([])
  const [MCQList,SetMCQList]= useState([])
  
  

    const GetAllTests = async()=>{
      
         const res =  await axios.get("http://localhost:3000/Faculty-test-hub/FacultyAllTests",{withCredentials:true})
         console.log(res?.data?.data?.CodeTests)
         console.log(res?.data?.data)
         SetCodeList([...res?.data?.data?.CodeTests])
         SetMCQList([...res?.data?.data?.MCQtest])
        
        }

        // get result


        useEffect(()=>{
          GetAllTests()
        },[])
  return (
    
    <Card className='w-[70rem] border-black dark:border-white'>
        <CardHeader>
            <CardTitle>
                All Created  Test List
            </CardTitle>
            <CardDescription>
                List of All the Coding and MCQ Tests Organized
            </CardDescription>
        </CardHeader>
        <CardContent className='flex  justify-evenly flex-wrap gap-[0.45rem]'>
            {CodeList.map((elem,index)=>{
                return(
                    <Card onClick={()=>navigate(`/FacultyResult/${"code"}/${elem._id}`)}  className='text-left border-black dark:border-white hover:transition-all hover:translate-y-1 hover:shadow-md dark:hover:shadow-white hover:shadow-black' style={{"width":"22rem","height":"22rem"}}>
                <CardHeader>
                    <CardTitle>
                        {elem.TestName}
                    </CardTitle>
                    <CardDescription>
                                Code Test
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
        <CardContent className='flex  justify-evenly flex-wrap gap-[0.45rem]'>
                {MCQList.map((elem,index)=>{
                    return(
                        <Card onClick={()=>navigate(`/FacultyResult/${"MCQ"}/${elem._id}`)}  className='text-left border-black dark:border-white hover:transition-all hover:translate-y-1 hover:shadow-md dark:hover:shadow-white hover:shadow-black' style={{"width":"22rem","height":"22rem"}}>
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

export default AllTests
