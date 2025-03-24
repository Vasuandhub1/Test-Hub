import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { EndTest,AddAns } from '../../../Redux/slices/MCQTestData';
import { useDispatch } from "react-redux";
import { Button } from "../ui/button";
import axios from "axios";
import { title } from "process";
import { toast } from "@/hooks/use-toast";
 import {Student_Base_URL} from "../../../utils/url.ts"


const question = {
  id: 1,
  question: "What is the time complexity of binary search?",
  options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
  correct: 1,
};

export default function StudentMCQTest({Question,index}) {
  const dispatch = useDispatch()
  const [selectedAnswer, setSelectedAnswer] = useState("");

  console.log(Question,"Ques")

  const handleSelect = (value) => {
    setSelectedAnswer(value);
    // const ans={QuesId:Question._id,ans:value,index:index}
    // dispatch(AddAns(ans))
  };

  const handleSave =  async()=>{
    try{
      const data ={_id:Question._id,ans:selectedAnswer}
      console.log(data,"data")
      const res = await axios.post(`${Student_Base_URL}/Student/MCQQuestionSubmission`,{data},{withCredentials:true})
      toast({title:"sucess saved can not be revert"})
    }catch(err){
      console.log(err)
    }
  }

 

  return (
    <div className="max-w-2xl mx-auto p-2 flex flex-col items-center">
      <Card className="w-[50rem] h-[27rem] shadow-xl border border-gray-200 rounded-lg p-3 bg-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-blue-600">MCQ Test</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4">
          <div className="border-b pb-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">{Question.QuestionDescription}</h2>
            <RadioGroup onValueChange={handleSelect} value={selectedAnswer} className="space-y-3">
              {Question.options.map((option, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-3 p-2 border rounded-lg cursor-pointer transition ${selectedAnswer === String(index) ? "bg-blue-200" : "hover:bg-gray-100"}`}
                  onClick={() => handleSelect(String(index))}
                >
                  <RadioGroupItem value={String(index)} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="text-gray-700 text-lg">{option}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <Button onClick={handleSave}>Save And Continue</Button>
        </CardContent>
      </Card>
    </div>
  );
}
