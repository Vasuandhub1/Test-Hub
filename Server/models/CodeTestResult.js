const mongoose = require("mongoose")


const CodeTestResult = new mongoose.Schema({
    StudentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Student"
    },
    TotalMarks:{
        type:String,
        required:true
    },
    TotalMarksObtained:{
        type:String,
        required:true
    },
    TestId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"tests",
        required:true
    }
})

module.exports  =  mongoose.model("CodeTestResult",CodeTestResult)