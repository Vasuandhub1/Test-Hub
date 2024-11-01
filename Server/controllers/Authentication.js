const user=require("../models/User")
const {handelErr,handelSucess}=require("../utils/errHandler")

const createUser=(req,res,next)=>{
    // hanlde the errors
    try{
        // now take the data from the req body
        const {email,password}=req.body
        
    }catch(err){
        return handelErr(res,err.message,err,404)
    }
}