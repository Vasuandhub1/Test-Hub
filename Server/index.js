const express = require("express")
const app= express()
const AuthRouter=require("./routes/authRoutes")
const {connectDB}=require("./config/dbConnect")
require("dotenv").config()

connectDB()

app.use(express.json())

app.use("/auth",AuthRouter)

app.get("/",(req,res)=>{
    res.send("hello from the server")
})

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on the port ${process.env.PORT}`)
})
