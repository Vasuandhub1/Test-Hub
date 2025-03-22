const express = require("express")
const app= express()
const {connectDB}=require("./config/dbConnect")
require("dotenv").config()
const cors= require("cors")
const auth_Route=require("./routes/authRoutes")
const StudRoute = require("./routes/studentRoutes")
const FacultyRoute  = require("./routes/FacultyRoutes")
const SeedData = require("./utils/SeedDataUploader")


const cookieParser = require("cookie-parser")

connectDB()

// allowing all the origins
app.use(cors({credentials:true,origin:true}))
// prasing the json 
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())

app.use("/test-hub/",auth_Route)
app.use("/student-test-hub/",StudRoute)
app.use("/Faculty-test-hub/",FacultyRoute)

app.get("/",(req,res)=>{
    res.send("hello from the server")
})

// uploading the seed data to the data base 
SeedData()

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on the port ${process.env.PORT}`)
})
