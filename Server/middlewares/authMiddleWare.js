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
const IsCreatedFaculty = async(req,res,next)=>{
    try{
        // now handel the adtaa 
        const {CreateFaculty} = req.cookies
        const data = await getTokenData(CreateFaculty)
        if(data===null){
            return next(handelErr(res,"create Faculty cookie exprireed","cookie err",404))
        }else{
            return next()
        }
    }catch(err){
        return next(handelErr(res,err.message.err,404))
    }
}

const IsStudent =  async(req,res,next)=>{
    try{
        const {Student} = req.cookies
        if(Student){
            const token = await getTokenData(Student)
            const student = await User.findById(token._id)
            
            if(student){
                return next()
            }else{
                return next(handelErr(res,"student not found","Authentication Err",401)) 
            }
        }else{
            return next(handelErr(res,"Token Not found","Authentication Err",401))
        }
    }catch(err){
        return next(handelErr(res,err.message,err,404))
    }
}

const IsFaculty =  async(req,res,next)=>{
    try{
        const {Faculty} = req.cookies
        if(Faculty){
            const token = await getTokenData(Faculty)
            const faculty = await User.findById(token._id)
            
            if(faculty){
                return next()
            }else{
                return next(handelErr(res,"faculty not found","Authentication Err",401)) 
            }
        }else{
            return next(handelErr(res,"Token Not found","Authentication Err",401))
        }
    }catch(err){
        return next(handelErr(res,err.message,err,404))
    }
}

module.exports = {IsCreateStudent,IsCreatedFaculty,IsStudent,IsFaculty}