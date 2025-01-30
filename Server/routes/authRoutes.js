const express= require("express")
const route=express.Router()
const {RegisterUser, EmailValidate}=require("../controllers/Authentication")

//  now create the user Routes
route.post("/User",RegisterUser)
route.post("/User/:token",EmailValidate)

// exporting the routes
module.exports=route