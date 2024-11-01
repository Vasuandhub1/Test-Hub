const mongoose= require("mongoose")

const Admin=new mongoose.Schema({
    AdminName:{
        type:String,
        requireed:true
    },
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }

})

module.exports=mongoose.model("Admin",Admin)