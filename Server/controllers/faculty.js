const Faculty = require("../models/Faculty") 
const {handelErr, handelSucess}=require("../utils/errHandler")
const User = require("../models/User")
const {createToken, getTokenData}=require("../utils/createToken")


// now carete the function to regaiter the faculty
const FacultyRegister = async (req,res,next)=>{
    try{
        
    }catch(err){
        return next(handelErr(res,err.message,err,404))
    }
}