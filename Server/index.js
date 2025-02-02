const express = require("express")
const app= express()
const {connectDB}=require("./config/dbConnect")
require("dotenv").config()
const cors= require("cors")
const auth_Route=require("./routes/authRoutes")


const cookieParser = require("cookie-parser")

connectDB()

// allowing all the origins
app.use(cors())
// prasing the json 
app.use(express.urlencoded({ extended: true })); 
app.use(express.json())
app.use(cookieParser())

app.use("/test-hub/",auth_Route)

app.get("/",(req,res)=>{
    res.send("hello from the server")
})

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on the port ${process.env.PORT}`)
})
