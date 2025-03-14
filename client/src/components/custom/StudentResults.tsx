import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import axios from "axios";
import { useEffect } from "react";

const testResults = [
  { id: 1, testName: "MCQ Test 1", score: 78, date: "2025-01-15" },
  { id: 2, testName: "Coding Test 1", score: 85, date: "2025-01-20" },
  { id: 3, testName: "MCQ Test 2", score: 80, date: "2025-02-05" },
  { id: 4, testName: "Coding Test 2", score: 90, date: "2025-02-10" },
];

const GetAllResults = async()=>{
  try{
    const res = await axios.get("http://localhost:3000/student-test-hub/StudentResult",{withCredentials:true})
    console.log(res)
  }catch(err){
    console.log(err)
  }
} 



export default function StudentResults() {

  useEffect(()=>{
    GetAllResults()
  },[])
  return (
    <div className="p-6 grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Test Results</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Test Name</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {testResults.map((test) => (
                <TableRow key={test.id}>
                  <TableCell>{test.testName}</TableCell>
                  <TableCell>{test.score}%</TableCell>
                  <TableCell>{test.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
