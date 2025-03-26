import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line, ResponsiveContainer } from "recharts";
import axios from "axios";
import {Student_Base_URL} from "../../../utils/url.ts"

console.log(`${Student_Base_URL},hello`)


export default function StudentDashboard() {
  const [Data,SetData] = useState()
  const [mcqData,SetmcqData] = useState()
  const [performanceTrendCoding,SetperformanceTrendCoding]=useState([])
  const [performanceTrendMCQ,SetperformanceTrendMCQ] = useState([])
  const GetAllResults = async()=>{
 
    try{
      const res = await axios.get(`${Student_Base_URL}/StudentDashboard`,{withCredentials:true})
      console.log(res,"dashboard")
      SetData(res?.data?.data?.code[0])
      SetmcqData(res?.data?.data?.mcq[0])
      const CodeResultTrend = [...res?.data?.data?.codeResult]
      SetperformanceTrendCoding([...res?.data?.data?.codeResult])
      SetperformanceTrendMCQ([...res?.data?.data?.mcqresults])

      

      
    }catch(err){
      console.log(err)
    }
  } 
  console.log(Data)
  console.log(performanceTrendCoding,"code")

  const testPerformanceData = [
    { testType: "MCQ Test", marks: (mcqData?.AverageObtainedMarks/mcqData?.AverageTotalMarks )*100 ?  (mcqData?.AverageObtainedMarks/mcqData?.AverageTotalMarks )*100:mcqData?.MaxMarks},
    { testType: "Coding Test", marks: (Data?.AverageObtainedMarks/Data?.AverageTotalMarks )*100 ?  (Data?.AverageObtainedMarks/Data?.AverageTotalMarks )*100:Data?.MaxMarks },
  ];
  useEffect(()=>{
    GetAllResults()
  },[])
  return (
    <div className="p-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Performance Summary Cards */}
      <Card>
        <CardHeader>
          <CardTitle>Total Tests Taken</CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-bold">{Data?.TotalTest}</CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Average Score</CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-bold">{Math.round((Data?.AverageObtainedMarks/Data?.AverageTotalMarks )*100)}%</CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Best Performance</CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-bold">{Math.round(Data?.MaxMarks/Data?.AverageTotalMarks*100)} (Coding Test Marks)</CardContent>
      </Card>

      {/* Bar Chart: Marks per Test Type */}
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Marks by Test Type</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={testPerformanceData}>
              <XAxis dataKey="testType" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="marks" fill="#8884d8" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Line Chart: MCQ Test Performance Over Time */}
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>MCQ Test Performance Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceTrendMCQ}>
              <XAxis dataKey="total" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="score" stroke="#f39c12" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Line Chart: Coding Test Performance Over Time */}
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Coding Test Performance Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceTrendCoding}>
              <XAxis dataKey="total" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="score" stroke="#82ca9d" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
