const user=require("../models/User")
const bcrypt=require("bcrypt")
const {createToken}=require("../utils/jsonwebtokens")
const {getRandom}=require("../utils/getRandom")
const {sendEmail}=require("../utils/nodeMailer")
const { handelErr, handelSucess} = require("../utils/errHandler")

const createUser=async(req,res,next)=>{
    // hanlde the errors
    try{
        // now take the data from the req body
        const {email,password}=req.body

        //  now check if user laready registerd
        if(!email||!password){
            return handelErr(res,"please fill all the credentials",false,404)
        }else{
            const isMail=await user.findOne({userEmail:email})

        if(!isMail){
            // now we have to create the user

            const otp=getRandom()
            console.log(otp)

            // now send the otp to the uer

            const isEmail=sendEmail(otp,email)

            const newUser=await user.create({userEmail:email,userPassword:password,otp})


            if(newUser){
                const paylaod={
                    email:email
                }
                const token=createToken(paylaod,60*60*5)

                //  now send the verification cookie
                res.cookie("Email_Verification",token,{maxAge:60*60*60*5})

                next( handelSucess(res,"user created sucessful",user))

            
        }else{
            next (handelErr(res,"err in sending the email",404))
        }
        }else{
            next( handelErr(res,"user already exist",false,401))
        }
        }

    }catch(err){
        next(handelErr(res,err.message,err,404))
    }
}
const VerifyEmail=(req,res,next)=>{
    //  hanlde the err
    try{

    }catch(err){
        next(handelErr(res,err.message,err,404))
    }
}

module.exports={createUser}