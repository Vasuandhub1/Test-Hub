import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line, ResponsiveContainer } from "recharts";

const testPerformanceData = [
  { testType: "MCQ Test", marks: 80 },
  { testType: "Coding Test", marks: 90 },
];

const performanceTrendMCQ = [
  { date: "Jan", score: 70 },
  { date: "Feb", score: 75 },
  { date: "Mar", score: 80 },
  { date: "Apr", score: 85 },
];

const performanceTrendCoding = [
  { date: "Jan", score: 78 },
  { date: "Feb", score: 82 },
  { date: "Mar", score: 88 },
  { date: "Apr", score: 92 },
];

export default function StudentDashboard() {
  return (
    <div className="p-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Performance Summary Cards */}
      <Card>
        <CardHeader>
          <CardTitle>Total Tests Taken</CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-bold">15</CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Average Score</CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-bold">85%</CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Best Performance</CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-bold">90% (Coding Test)</CardContent>
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
              <XAxis dataKey="date" />
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
              <XAxis dataKey="date" />
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
