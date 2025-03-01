const mongoose= require("mongoose")

const question=new mongoose.Schema({
    QuesName:{
        type:String,
        required:true
    },
    QuesDescrition:{
        type:String,
        required:true
    },
    InputTestCase:{
        type:[String],
        required:true,
    },
    DifficultyLevel:{
        type:String,
        required:true
    },
    OutputTestCase:{
        type:[String],
        required:true,
    },
    TimeConstrains:{
        type:String,
        required:true
    },
    SpaceConstrains:{
        type:String,
        required:true
    },
    QuestionType:{
        type:String,
        default:"Code"
    }
})

module.exports=mongoose.model("Code",question)