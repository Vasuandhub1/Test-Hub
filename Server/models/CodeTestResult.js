const mongoose = require("mongoose")


const CodeTestResult = new mongoose.Schema({
    StudentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Student"
    },
    TotalMarks:{
        type:Number,
        required:true,
        default:100
    },
    TotalMarksObtained:{
        type:Number,
        required:true
    },
    QuestionId:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"Code"
    },
    TestId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"tests",
        required:true
    }
})

module.exports  =  mongoose.model("CodeTestResult",CodeTestResult)