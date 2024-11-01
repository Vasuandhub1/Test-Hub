const mongoose=require("mongoose")
const bcrypt= require("bcrypt")

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

},{timeseries:true})

User.pre("save",async function(next){
    if(this.isModified){
        await bcrypt.hash(this.userPassword,10).then((pass)=>{
            this.userPassword=pass
        }).catch((err)=>{
            console.log("Error in password Encryption")
        })
    }
    next()
})

User.methods.comparePassword=async function(password){
    return await bcrypt.compare(password,this.password)
}

module.exports= mongoose.model("user",User)