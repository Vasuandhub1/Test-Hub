const User = require("../models/User")
const {handelErr, handelSucess}=require("../utils/errHandler")
const {createToken, getTokenData}=require("../utils/createToken")

const IsCreateStudent = async(req,res,next)=>{
    try{
        //  now handel the data from the cookies
        const {CreateStudent} = req.cookies
        const data=await getTokenData(CreateStudent)

        if(data==null){
            
            return next(handelErr(res,"Create Student cookie expired","cookie err",404))
        }else{
            next()
        }
        
    }catch(err){
        return next(handelErr(res,err.message,err,404))
    }
}

module.exports = {IsCreateStudent}