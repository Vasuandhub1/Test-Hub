import React from 'react'
import { useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Input } from '../ui/input'
  import { Textarea } from "@/components/ui/textarea"
import { Button } from '../ui/button'
import axios from 'axios'
import { useToast } from '@/hooks/use-toast'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select" 


  

function FacultyCreateCodingQuestion() {

    const {toast} = useToast()
    // declear the type 
    interface question{
        QuestionName:string,
        QuestionDescription:string,
        DifficultyLevel:string,
        SpaceConstrains:string,
        TimeConstrains:string,
        SampleInput1:string,
        output1:string,
        SampleInput2:string,
        output2:string,
        SmapleInput3:string,
        output3:string,
        SampleInput4:string,
        output4:string,
        SampleInput5:string,
        output5:string,
        HiddenTestCaseInput:string,
        HiddenTestCaseOutput:string
    }
    const[data,Setdata]=useState<question>({QuestionName:"",
        QuestionDescription:"",
        DifficultyLevel:"",
        SpaceConstrains:"",
        TimeConstrains:"",
        SampleInput1:"",
        output1:"",
        SampleInput2:"",
        output2:"",
        SmapleInput3:"",
        output3:"",
        SampleInput4:"",
        output4:"",
        SampleInput5:"",
        output5:"",
        HiddenTestCaseInput:"",
        HiddenTestCaseOutput:""
      })

        const handelChange = (e:React.ChangeEvent<HTMLInputElement>| React.ChangeEvent<HTMLTextAreaElement>)=>{
            Setdata({...data,[e.target.name]:e.target.value})
        }
        

        const handleCreateCodeQuestion = async()=>{
            const payload ={QuestionName:data.QuestionName,
                QuestionDescription:data.QuestionDescription,
                SpaceConstrains:data.SpaceConstrains,
                TimeConstrains:data.TimeConstrains,
                DifficultyLevel:data.DifficultyLevel,
                SampleInputs:[data.SampleInput1,data.SampleInput2,data.SmapleInput3,data.SampleInput4,data.SampleInput5],
                SampleOutputs:[data.output1,data.output2,data.output3,data.output4,data.output5],
                HiddenTestCaseInput:data.HiddenTestCaseInput,
                HiddenTestCaseOutput:data.HiddenTestCaseOutput  
              }
        await axios.post('http://localhost:3000/Faculty-test-hub/Faculty/CreateCodingQuestion',payload,{withCredentials:true}).then(()=>{
            toast({title:"Sucessful",description:"Created the coding question"})
            Setdata({QuestionName:"",
                QuestionDescription:"",
                DifficultyLevel:"",
                SpaceConstrains:"",
                TimeConstrains:"",
                SampleInput1:"",
                output1:"",
                SampleInput2:"",
                output2:"",
                SmapleInput3:"",
                output3:"",
                SampleInput4:"",
                output4:"",
                SampleInput5:"",
                output5:"",
                HiddenTestCaseInput:"",
                HiddenTestCaseOutput:""
              })
        }).catch((err)=>{
          console.log(err)
            toast({title:"Err in Creating dataa ", description:err.message})
        })

        }

  return (
<Card className='w-[70rem] border-black dark:border-white'>
  <CardHeader>
    <CardTitle>Create Coding Question</CardTitle>
    <CardDescription>This Coding question will be added to the Coding Question Back </CardDescription>
  </CardHeader>
  <CardContent>
    {/* internal card */}
   <Card className='border-black dark:border-white'>
   <CardHeader>
    <CardTitle>Coding Question Details</CardTitle>
    <CardDescription>Please fill all the Details </CardDescription>
  </CardHeader>
   <CardContent>
    <label>
        Question name *
    <Input type='text' onChange={handelChange} value={data.QuestionName} name='QuestionName' placeholder='Enter the questiosn name '></Input>
    </label>
   </CardContent>
   <CardContent>
    <label>
        Question description *
        <Textarea onChange={handelChange} value={data.QuestionDescription} name="QuestionDescription" placeholder='Enter question descrption here...'/>
    </label>
   </CardContent>
   <CardContent>
     <label>
        Difficulty Level *
     <Select onValueChange={(val)=>{
        Setdata({...data,DifficultyLevel:val})
     }} name='Sname'>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Difficulty" />
      </SelectTrigger>
      <SelectContent >
        <SelectGroup>
          <SelectLabel>Difficulty Levels</SelectLabel>
          
          <SelectItem value='Easy'>Easy</SelectItem>
          <SelectItem value='Medium'>Medium</SelectItem>
          <SelectItem value='Hard'>Hard</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
     </label>
     </CardContent>
   <CardContent>
    <label>
        Question space constrains *
        <Input type='text' onChange={handelChange} value={data.SpaceConstrains} name='SpaceConstrains' placeholder='Space constrains'></Input>
    </label>
   </CardContent>
   <CardContent>
    <label>
        Question time constrains *
        <Input type='text' onChange={handelChange} value={data.TimeConstrains} name='TimeConstrains' placeholder='Time Constrains' required></Input>
    </label>
   </CardContent>
   <CardContent>
    <label>
        Question sample input 1 *
        <Input type='text' onChange={handelChange} value={data.SampleInput1} name='SampleInput1' placeholder='sample input 1' required></Input>
    </label>
    <label>
         Output 1 *
        <Input type='text' onChange={handelChange} value={data.output1} name='output1' placeholder='output 1' required></Input>
    </label>
   </CardContent>
   <CardContent>
    <label>
    Question sample input 2 *
        <Input type='text' onChange={handelChange} value={data.SampleInput2} name='SampleInput2' placeholder='Time Constrains' required></Input>
    </label>
    <label>
         Output 2 *
        <Input type='text' onChange={handelChange} value={data.output2} name='output2' placeholder='output 2' required></Input>
    </label>
   </CardContent>
   <CardContent>
    <label>
    Question sample input 3 *
        <Input type='text' onChange={handelChange} value={data.SmapleInput3} name='SmapleInput3' placeholder='Time Constrains' required></Input>
    </label>
    <label>
         Output 3 *
        <Input type='text' onChange={handelChange} value={data.output3} name='output3' placeholder='output 3' required></Input>
    </label>
   </CardContent>
   <CardContent>
    <label>
    Question sample input 4 *
        <Input type='text' onChange={handelChange} value={data.SampleInput4} name='SampleInput4' placeholder='Time Constrains' required></Input>
    </label>
    <label>
         Output 4 *
        <Input type='text' onChange={handelChange} value={data.output4} name="output4" placeholder='output 4' required></Input>
    </label>
   </CardContent>
   <CardContent>
    <label>
    Question sample input 5 * 
        <Input type='text' onChange={handelChange} value={data.SampleInput5} name='SampleInput5' placeholder='Time Constrains' required></Input>
    </label>
    <label>
         Output 5 *
        <Input type='text' onChange={handelChange} value={data.output5} name='output5' placeholder='output 5' required></Input>
    </label>
   </CardContent>
   <CardContent>
    <label>
    Hidden test case input*
        <Textarea  onChange={handelChange} value={data.HiddenTestCaseInput} name='HiddenTestCaseInput' placeholder='HiddenTestCaseInput' required></Textarea>
    </label>
    <label>
    Hidden test case output* 
        <Textarea  onChange={handelChange} value={data.HiddenTestCaseOutput} name='HiddenTestCaseOutput' placeholder='HiddenTestCaseOutput' required></Textarea>
    </label>
   </CardContent>
   </Card>
  </CardContent>
  <CardFooter>
    <Button onClick={handleCreateCodeQuestion} >Create</Button>
  </CardFooter>
</Card>

  )
}

export default FacultyCreateCodingQuestion
