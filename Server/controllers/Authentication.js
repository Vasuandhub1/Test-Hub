const User = require("../models/User")
const {handelErr, handelSucess}=require("../utils/errHandler")

const bcrypt=require("bcrypt")
const mailServices=require("../utils/mailServices")
const {createToken, getTokenData}=require("../utils/createToken")
const { param } = require("../routes/authRoutes")
// controller for User Register

const RegisterUser=async(req,res,next)=>{
    try{
        //now take data from the user in the uer body 
        const {userEmail,userPassword,role,url}=req.body

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
               

               
                const newUser=await User.create({userEmail,userPassword:password,role})

                const payload={email:userEmail,_id:newUser._id}
                const token= await createToken(payload,"2h") 

                //  now send email to verify the email 
                const send_mail=await mailServices(userEmail,"Verification",`${url}/:${token}`)
               

                    // send token to verify email_id
                   
                    console.log(token)

                    // send the cookie to the user
                    
                    await User.findByIdAndUpdate(newUser._id,{emailVerificationTokenExpiry:new Date(Date.now()+2*60*60*1000),isVerifid:false})
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
        const {token} = req.params
       
        // now check if the otp is there
        
        if(token){
            let TokenData=await getTokenData(token.substr(1))
            console.log(TokenData)
            
            // now find the user and velidathe the user 
            if(TokenData){
                const ValidateUser = await User.findByIdAndUpdate(TokenData._id,{isVerifid:true})
                console.log(ValidateUser,"hello")

                // now return the response 
                return next(handelSucess(res,"user validated sucessful",ValidateUser))
            }else{
                return next(handelErr(res,"token not found","Err",404))
            }
        }else{
            return next(handelErr(res,"token not found","Err",404))
        }
        
    }catch(err){
        console.log(err)
        return next(handelErr(res,"Err in validating email",err.message,404))
    }
}

// controller for the 

const loginUser= async(req,res,next)=>{
    try{
        // now take the data from the uer 
        const {userEmail,userPassword}=req.body

        // now check all the credentials
        if(userEmail && userPassword){
            // now check if the uer is rejisterres
            const isPresent = await User.findOne({userEmail:userEmail})

            if(isPresent){
                // if the uer is present
                if(isPresent.isVerifid){
                    // if the user is verified check the password and login 
                    await bcrypt.compare(userPassword,isPresent.userPassword).then((data)=>{
                        // now create the token and set to the uer 
                        

                        return next(handelSucess)
                    }).catch((err)=>{
                        return next(handelErr(res,err.message,err,404))
                    })
                }else{

                }
            }else{
                // if the uer is not present 
                return next(handelErr(res,"please register first","user not registerd",404))
            }
        }else{
            return next(handelErr(res,"please provide all  the credentials","provide all the credentials",404))
        }
    }catch(err){
        return next(handelErr(res,err.message,err))
    }
}



// exporting the controllers
module.exports={RegisterUser,EmailValidate}