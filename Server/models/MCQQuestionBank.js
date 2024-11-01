const mongoose= require("mongoose")

const questios=new mongoose.Schema({
    QuesDescription:{
        type:String,
        required:true
    },
    options:{
        type:[string],
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
    }

})

module.exports= mongoose.model("MCQ",questios)