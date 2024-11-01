const express = require("express")
const app= express()
const {connectDB}=require("./config/dbConnect")
require("dotenv").config()

connectDB()

app.get("/",(req,res)=>{
    res.send("hello from the server")
})

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on the port ${process.env.PORT}`)
})
