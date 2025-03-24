const mongoose = require("mongoose")


const CodeTestResult = new mongoose.Schema({
    StudentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"students"
    },
    TotalMarks:{
        type:Number,
        required:true,

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