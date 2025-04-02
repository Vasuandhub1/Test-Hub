const mongoose = require("mongoose")
const Faculty = require("./Faculty")
const { type } = require("os")


const CodeTest = new mongoose.Schema({

    TestName:{
        type:String,
        required:true
    },
    TestDescription:{
        type:String,
        required:true
    },
    TestType:{
        type:String,
        required:true,
        default:"Code" 
    },
    TestStartTime:{
        type:Date,
        required:true
    },
    TestExpireTime:{
        type:Date,
        required:true
    },
    AttemptTime:{
        type:Number,
        required:true
    },
    Questions:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"Code",
        required:true
    },
    StudentList:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"Student"
    },
    AttemptedTestStudentList:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"Student"
    },
    HideResult:{
        type:Boolean,
        default:false
    },
    TotalMarks:{
        type:Number,
        required:true
    },
    Faculty:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Faculty"
    },
    Section:{
        type:String,
        default:"All",
    },
    Branch:{
        type:String,
        default:"All"
    },
    Year:{
        type:String,
        default:"All"
    }

})

module.exports = mongoose.model("tests",CodeTest)