const mongoose= require("mongoose")

const question=new mongoose.Schema({
    QuesDescrition:{
        type:String,
        required:true
    },
    languages:{
        type:[String],
        required:true
    },
    inputTestCase:{
        type:String,
        required:true,
    },
    outputConstrains:{
        type:String,
        required:true
    },
    QuestionType:{
        type:String,
        default:"Code"
    }
})

module.exports=mongoose.model("code",question)