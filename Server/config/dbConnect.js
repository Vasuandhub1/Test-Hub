const mongoose= require("mongoose")
require("dotenv").config()

const connectDB=async()=>{
    //  handle the data base connctions
    const connect=await mongoose.connect(process.env.URI,{family:4}).then(()=>{
        console.log("connected to the database ")
    }).catch((err)=>{
        console.log("err in the connections ",err)
    })
}

module.exports={connectDB}