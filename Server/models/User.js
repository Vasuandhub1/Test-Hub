const mongoose=require("mongoose")
const bcrypt= require("bcrypt")

const User= new mongoose.Schema({
    userEmail:{
        type:String,
        required:true,
        isEmail:true
    },
    userPassword:{
        type:String,
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
    },
    emailVerificationToken:{
        type:String
    },
    emailVerificationTokenExpiry:{
        type:String
    }  
})

// User.pre("save",async function(next){
//     if(this.isModified){
//         await bcrypt.hash(this.userPassword,10).then((data)=>{
//             this.userPassword=data
//         }).catch((err)=>{
//             console.log("error in password hashing"+err)
//         })
//         next()
//     }
// })
User.methods.verifyPassword=async function(password){
    return await bcrypt.compare(password,this.password
    )
}

module.exports= mongoose.model("User",User)