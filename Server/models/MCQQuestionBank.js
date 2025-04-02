const mongoose= require("mongoose")

const questios=new mongoose.Schema({
    QuesDescription:{
        type:String,
        required:true
    },
    options:{
        type:[String],
        required:true
    },
    correctAns:{
        type:String,
        required:true
    },
    reason:{
        type:String
    },
    faculty:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Faculty"
    },
    questionType:{
        type:String,
        default:"MCQ"
    },
    subjectCode:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"subject"
    }

})

module.exports= mongoose.model("mcqs",questios)