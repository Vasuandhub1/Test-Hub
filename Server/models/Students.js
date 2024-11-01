const mongoose= require("mongoose")

const Student=new mongoose.Schema({
    Sname:{
        type:String,
        required:true
    },
    Enroll:{
        type:String,
        required:true
    },
    MCQtest:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"MCQ"
    },
    codingTest:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"code"
    },
    year:{
        type:String,
        required:true
    },
    section:{
        type:String,
        required:true
    },
    branch:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    DOB:{
        type:Date,
        required:true
    }
})

module.exports= mongoose.model("students",Student)