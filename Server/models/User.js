const mongoose=require("mongoose")

const User= new mongoose.Schema({
    userEmail:{type:String,
        required:true},
    userPassword:{type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    }    

})

module.exports= mongoose.model("user",User)