const User = require("../models/User")
const {handelErr, handelSucess}=require("../utils/errHandler")
const otp_generate= require("otp-generator")
const bcrypt=require("bcrypt")
const mailServices=require("../utils/mailServices")
const {createToken, getTokenData}=require("../utils/createToken")
const { param } = require("../routes/authRoutes")
// controller for User Register

const RegisterUser=async(req,res,next)=>{
    try{
        //now take data from the user in the uer body 
        const {userEmail,userPassword,role}=req.body

        console.log(userEmail,userPassword)

        // now check if the email is available or not 
        const isUser=await User.findOne({userEmail})

        if(isUser){
            // /if the user is present we can not crete it 
            return next(handelErr(res,"User already exist",userEmail,404))

        }else{
            // /create the user
            await bcrypt.hash(userPassword,10).then(async(password)=>{

                // generate the token and send it to user 
                const payload={email:userEmail,_id:User._id}
                const token= await createToken(payload,"2h") 

                // const otp=otp_generate.generate(6,{upperCaseAlphabets:false,lowerCaseAlphabets:false,digits:true,specialChars:false})
                const newUser=await User.create({userEmail,userPassword:password,role})

                //  now send email to verify the email 
                const send_mail=await mailServices(userEmail,"Verification",token)
               

                    // send token to verify email_id
                   
                    console.log(token)

                    // send the cookie to the user
                    
                    await User.findByIdAndUpdate(newUser._id,{emailVerificationTokenExpiry:new Date(Date.now()+2*60*60*1000)})
                    return next(handelSucess(res,"User created sucessful. verify your email with in 2 hours",payload))

                

            }).catch((err)=>{
                console.log(err)
                return next(handelErr(res,"Err in password hashing",err,404))
            })
            
        }

    }catch(err){
        return next(handelErr(res,err.messsage,err,404))
    }
}

// controller for validate mail 

const EmailValidate=async(req,res,next)=>{
    try{
       
        // take the data from the url parameter
        const {token} = req.param
        console.log(token)
        // now check if the otp is there 
        if(otp&&EmailVerification){

            // decode the token 
            const token=await getTokenData(EmailVerification)
            console.log(token._id)

            // find the user using its id
            const user=await User.findById(token._id)
            
            if(user.emailVerificationTokenExpiry>=Date.now()){

                // now compare the otp from the database 
                if(otp===user.otp){
                    await User.findByIdAndUpdate(user._id,{otp:null,emailVerificationTokenExpiry:null})
                    return next(handelSucess(res,"otp verified sucessful","sucessful"))

                } else{
                    return next(handelErr(res,"please verify the otp","verify otp",404))
                }
                
            }else{
                return next(handelErr(res,"your email token expired","token expires",404))
            }
        }else{
            if(!EmailVerification){
                return next(handelErr(res,"Your token expired","Token Expire",404))
            }else{
                return next(handelErr(res,"err in otp","OTP Error",404))
            }
        }

    }catch(err){
        return next(handelErr(res,"Err in validating email",err.message,404))
    }
}



// exporting the controllers
module.exports={RegisterUser,EmailValidate}