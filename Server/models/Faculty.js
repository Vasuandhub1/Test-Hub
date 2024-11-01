const mongoose= require("mongoose")

const Faculty=new mongoose.Schema({
    Fname:{
        type:String,
        required:true
    },
    Branch:{
        type:String,
        required:true
    },
    Subject:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"Subject"
    },
    joininYear:{
        type:Date,
        required:true
    },
    Gender:{
        type:true,
        required:true
    },
    MCQTest:{
         type:[mongoose.Schema.Types.ObjectId],
        ref:"MCQ"
    },
    codingTest:{
         type:[mongoose.Schema.Types.ObjectId],
        ref:"code"
    },
    facultyEnroll:{
        type:String,
        required:true
    },
    DOB:{
        type:Date,
        required:true
    }
})

module.exports= mongoose.model("Faculty",Faculty)