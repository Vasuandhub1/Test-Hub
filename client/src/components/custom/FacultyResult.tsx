
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";




function FacultyResult() {
    const [Results,SetResults] =  useState([])
    const params = useParams()
    const navigate = useNavigate()

  const GetAllResults = async()=>{
 
    try{
        const data ={
            type:params.type,
            TestId:params.TestId
          }
        
      const res = await axios.post("http://localhost:3000/Faculty-test-hub/FacultyTestResult",{data},{withCredentials:true})
      console.log(res)
      SetResults([...res?.data?.data])
      
    }catch(err){
      console.log(err)
    }
}
useEffect(()=>{
    GetAllResults()
},[])
  return (
    <div className="p-6 grid gap-6">
      <Card className="border-black dark:border-slate-600">
        <CardHeader>
          <CardTitle>Test Results  ({Results[0]?.TestId?.TestName}) ({Results[0]?.TestId?.TestType})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table className="border-black dark:border-slate-600">
            <TableHeader>
              <TableRow className="border-black dark:border-slate-600">
                <TableHead>Student Name</TableHead>
                <TableHead>Test Type</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Total Marks</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Results.map((test) => (
                <TableRow key={test.id} className="border-black dark:border-slate-600">
                  <TableCell>{test.StudentId.Sname}</TableCell>
                  <TableCell>{test.TestId.TestType}</TableCell>
                  <TableCell>{test.TotalMarksObtained}</TableCell>
                  <TableCell>{test.TotalMarks}</TableCell>
                  <TableCell>{new Date(test.TestId.TestStartTime).toString().split("GMT",1)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
        </CardContent>
        <CardFooter>
            <Button onClick={()=>navigate("/FacultyTest")}> {`<- `}Back</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default FacultyResult
