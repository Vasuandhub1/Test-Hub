const express = require("express")
const app= express()
const {connectDB}=require("./config/dbConnect")
require("dotenv").config()
const auth_Route=require("./routes/authRoutes")
// const { cookie } = require("express-validator")

const cookieParser = require("cookie-parser")

connectDB()
app.use(express.json())
app.use(cookieParser())

app.use("/test-hub/",auth_Route)

app.get("/",(req,res)=>{
    res.send("hello from the server")
})

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on the port ${process.env.PORT}`)
})
