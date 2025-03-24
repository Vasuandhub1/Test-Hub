import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import axios from "axios";
import { useEffect, useState } from "react";
 import {Student_Base_URL} from "../../../utils/url.ts"



export default function StudentResults() {

  const [Results,SetResults] =  useState([])

  const GetAllResults = async()=>{
 
    try{
      const res = await axios.get(`${Student_Base_URL}/StudentResult`,{withCredentials:true})
      console.log(res)
      SetResults([...res?.data?.data?.code,...res?.data?.data?.mcq])
      
      
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
          <CardTitle>Test Results</CardTitle>
        </CardHeader>
        <CardContent>
          <Table className="border-black dark:border-slate-600">
            <TableHeader>
              <TableRow className="border-black dark:border-slate-600">
                <TableHead>Test Name</TableHead>
                <TableHead>Test Type</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Total Marks</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Results.map((test) => (
                <TableRow key={test.id} className="border-black dark:border-slate-600">
                  <TableCell>{test.TestId.TestName}</TableCell>
                  <TableCell>{test.TestId.TestType}</TableCell>
                  <TableCell>{test.TotalMarksObtained}</TableCell>
                  <TableCell>{test.TotalMarks}</TableCell>
                  <TableCell>{new Date(test.TestId.TestStartTime).toString().split("GMT",1)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
