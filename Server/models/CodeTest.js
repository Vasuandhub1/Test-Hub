const mongoose = require("mongoose")
const Faculty = require("./Faculty")


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
    Faculty:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Faculty"
    }

})

module.exports = mongoose.model("Test",CodeTest)