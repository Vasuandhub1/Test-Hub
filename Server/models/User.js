const mongoose=require("mongoose")

const User= new mongoose.Schema({
    userEmail:{type:String,
        required:true},
    userPassword:{type:String,
        required:true
    },
    role:{
        type:String,
    },
    otp:{
        type:Number
    },
    isVerifid:{
        type:Boolean
    }    

})

module.exports= mongoose.model("user",User)