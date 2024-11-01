const mongoose= require("mongoose")

const Admin=new mongoose.Schema({
    AdminName:{
        type:String,
        requireed:true
    },

})

module.exports=mongoose.model("Admin",Admin)