import React, { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import axios from 'axios'
import { Textarea } from '../ui/textarea'
import { DatePicker } from '../ui/datePicker'
import { toast } from '@/hooks/use-toast'







function FacultyCreateCodingTest() {

  // now create the interface 
  interface Ques{
    _id:string,
    QuesName:string,
    DifficultyLevel:string,
    QuesDescrition:string,
    selected:boolean
  }
  interface datainter{
    TestName:string,
    TestDescription:string,
    AttemptDate:number,
    
    Branch:string,
    Year:string
   
  }
  const [Questions,Setquestions] = useState<Ques[]>([])
  const [Page,SetPage] = useState(0)
  const [SelectedQuestions,SetSelectedQuestions] = useState<Ques[]>([])
  const [Startdate, setStartDate] = React.useState<Date>()
  const [Enddate, setEndDate] = React.useState<Date>()
  const [Data,Setdata] = useState<datainter>({TestName:"",
    TestDescription:"",
    AttemptDate:0,
    
    Branch:"",
    Year:"" 
  }
  )

  const HandleSubmit = async()=>{
    try{
    const payload = {
      TestName:Data.TestName,
      TestDescription:Data.TestDescription,
      AttemptTime:Data.AttemptDate,
      TestExpireTime:Enddate,
      TestStartTime:Startdate,
    
      Branch:Data.Branch,
      Year:Data.Year,
      Questions:[]
    }

    if(!payload.TestName || !payload.TestDescription || !payload.AttemptTime || !payload.TestStartTime || !payload.TestExpireTime || !payload.Questions){
     return  toast({title:"Fill all the detials" ,description:"Please fill all th detils"})
    }

    SelectedQuestions.map((elem)=>payload.Questions.push(elem._id))

    const res = await axios.post("http://localhost:3000/Faculty-test-hub/Faculty/CreateCodeTest",payload,{withCredentials:true})

    console.log(res)
    return  toast({title:"Sucessfully",description:"Sucessfully created the code test"})

  }catch(err){
    console.log(err)
    return toast({title:"Error",description:err.message})
  }
  }

  const HandleDate = (e:React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLTextAreaElement>)=>{
    Setdata({...Data,[e.target.name]:e.target.value})
  }

  const HandleSelect = async(index:number)=>{
    console.log(index)
    const temp = [...Questions]
    temp[index].selected=!temp[index].selected
    if(temp[index].selected){

      SetSelectedQuestions([...SelectedQuestions,temp[index]])

    }else{
      const temp2 = [...SelectedQuestions]

      const filteredQuestions = temp2.filter((elem) => {
        if (elem._id !== temp[index]._id) {
          return true; 
        }
        return false; 
      });
      SetSelectedQuestions(filteredQuestions)
    }
    Setquestions(temp)
  }
  console.log(SelectedQuestions,"selected")

  const GetAllQuestions = async()=>{
    const res = await axios.get(`http://localhost:3000/Faculty-test-hub/Faculty/CodeQuestions/${Page}`,{withCredentials:true})
    console.log(res.data.data)
    if(!SelectedQuestions){
      console.log("hello")
    }else{
      res.data.data.forEach(element => {
        element.selected=false
      });
      Setquestions([...res.data.data])
    }

    
  }

  useEffect(()=>{
    GetAllQuestions()
  },[Page])
  console.log(Data)
 
  return (
    <div>
      <Card className='w-[50rem] border-black dark:border-white'>
  <CardHeader>
    <CardTitle>Crete Coding Test</CardTitle>
    <CardDescription>Create Coding test (please fill all the details ) </CardDescription>
  </CardHeader>

  <CardContent>
    <label>
      Test name*
      <Input onChange={HandleDate} name='TestName' value={Data.TestName} placeholder='Enter the test name'></Input>
    </label>
  </CardContent>

  <CardContent>
    <label>
      Test description*
      <Textarea onChange={HandleDate} name='TestDescription' value={Data.TestDescription} placeholder='Enter the test description'></Textarea>
    </label>
  </CardContent>

  <CardContent>
    <label className=' flex flex-col'>
      Test start date*
      <DatePicker setDate={setStartDate} date={Startdate}/>
    </label>
    
  </CardContent>

  <CardContent>
    <label  className=' flex flex-col'>
      Test end date*
      <DatePicker setDate={setEndDate} date={Enddate}/>
    </label>
  </CardContent>

  <CardContent>
    <label  className=' flex flex-col'>
      Attemp time (Enter time in hours)  *
      <Input type='number' onChange={HandleDate} value={Data.AttemptDate} name="AttemptDate" placeholder='Enter the time in hours number only'/>
    </label>
  </CardContent>

  <CardContent>
    <label>
      Branch 
      <Select onValueChange={(value)=>Setdata({...Data,Branch:value})} >
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Branch" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="All">All</SelectItem>
    <SelectItem value="CSE">CSE</SelectItem>
    <SelectItem value="CIVIL">CIVIL</SelectItem>
    <SelectItem value="ME">ME</SelectItem>
    <SelectItem value="AI & DS">AI & DS</SelectItem>
  </SelectContent>
</Select>
    </label>
  </CardContent>

  <CardContent>
    <label>
      Year 
      <Select onValueChange={(value)=>Setdata({...Data,Year:value})} >
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Year" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="All">All</SelectItem>
    <SelectItem value="1">1</SelectItem>
    <SelectItem value="2">2</SelectItem>
    <SelectItem value="3">3</SelectItem>
    <SelectItem value="4">4</SelectItem>
  </SelectContent>
</Select>
    </label>
  </CardContent>

  <CardContent>
    <label htmlFor=""> Question for Test*
    <Input placeholder='Search with Question Name'></Input>
    </label>
    <Table>
      <TableCaption> Select the question to Pride in the Test</TableCaption>
      
      <TableHeader>
        
        <TableRow>
          <TableHead>Select</TableHead>
          <TableHead>Question Name</TableHead>
          <TableHead>Question Level</TableHead>
          <TableHead>Question Descriptions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Questions.map((elem,index:number)=>{
          return(
            <TableRow   key={index} onClick={()=>HandleSelect(index)}>
              <TableCell ><Checkbox  checked={elem.selected}></Checkbox></TableCell>
            <TableCell>{elem?.QuesName}</TableCell>
            <TableCell>{elem?.DifficultyLevel}</TableCell>
            <TableCell className=' overflow-hidden'>{elem.QuesDescrition}</TableCell>
          </TableRow>
          )
        })}
      </TableBody>
     <div className='flex justify-around gap-1'> <Button onClick={()=>SetPage(Page-1)}>Prev</Button> <Button onClick={()=>SetPage(Page+1)}>Next</Button></div>
    </Table>
  </CardContent>
  <CardFooter>
    <Button onClick={HandleSubmit}>Create Coding Test</Button>
  </CardFooter>
</Card>

    </div>
  )
}

export default FacultyCreateCodingTest
