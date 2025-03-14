const express= require("express")
const route=express.Router()
const {RegisterUser, EmailValidate,loginUser,ResetPasswordEmailVerification, ResetPassword}=require("../controllers/Authentication")

//  now create the user Routes
route.post("/User",RegisterUser)
route.get("/User/:token",EmailValidate)
route.post("/User/login",loginUser)
route.post("/ResetPassword",ResetPasswordEmailVerification)
route.post("/ResetPassword/:token",ResetPassword)


// exporting the routes
module.exports=route