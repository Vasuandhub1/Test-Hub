const mongoose = require("mongoose")

const MCQTestResult = new mongoose.Schema({
    StudentId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Student"
        },
        TotalMarks:{
            type:String,
            required:true,
            
        },
        QuestionList:{
            type:[mongoose.Schema.Types.ObjectId],
            ref:"mcqs"
        },
        TotalMarksObtained:{
            type:String,
            required:true
        },
        TestId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"MCQTest",
            required:true
        }
})

module.exports =  mongoose.model("MCQTestResult",MCQTestResult)