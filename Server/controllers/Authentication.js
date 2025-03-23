const User = require("../models/User")
const {handelErr, handelSucess}=require("../utils/errHandler")
const bcrypt=require("bcrypt")
const mailServices=require("../utils/mailServices")
const {createToken, getTokenData}=require("../utils/createToken")
const Faculty = require("../models/Faculty")
const Admin = require("../models/Admin")
const Students = require("../models/Students")
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
            console.log(isPresent)
          
            if(isPresent){
                // if the uer is present
                if(isPresent.isVerifid){
                    // if the user is verified check the password and login 
                    const isCorrect=await bcrypt.compare(userPassword,isPresent.userPassword)
                    console.log(isCorrect,"correct")
                    if(isCorrect){
                         // now check if the uer is student faculty or admin
                         const isStudent = await Students.findOne({UserId:isPresent._id})
                         const isFaculty = await Faculty.findOne({UserId:isPresent._id})
                         const isAdmin = await Admin.findOne({userId:isPresent._id})
                        
                         if(isStudent || isFaculty || isAdmin){
                             if(isStudent){
                                 // if student login as student
                                 const data={email:isPresent.userEmail,
                                     name:isStudent.Sname,
                                     Enroll:isStudent.Enroll,
                                     section:isStudent.Section,
                                     branch:isStudent.Branch,
                                     DOB:isStudent.DOB,
                                     role:isPresent.role,
                                     year:isPresent.Year
                                 }
                                 const payload={
                                     _id:isPresent._id,
                                     email:isPresent.email,
                                     role:isPresent.role,
                                     student_id:isStudent._id,
                                     branch:isStudent.Branch
                                 }
                                 const token = await createToken(payload,"2h")
                                 // now send the res
                                 res.cookie("Student",token,{expiresIn:"2h"})
                                 return next(handelSucess(res,"logined sucessful",data))
                             }else if(isFaculty){
                                 // if faculty login as faculty
                                 const data={email:isPresent.userEmail,
                                     name:isFaculty.Fname,
                                     Enroll:isFaculty.FacultyEnroll,
                                     subject:isFaculty.Subject,
                                     branch:isFaculty.Branch,
                                     DOB:isFaculty.DOB,
                                     role:isPresent.role
                                 }
                                 const payload={
                                     _id:isPresent._id,
                                     email:isPresent.email,
                                     role:isPresent.role,
                                     faculty_id:isFaculty._id
                                 }
                                 const token = await createToken(payload,"2h")
                                 // now send the res
                                 res.cookie("Faculty",token,{expiresIn:"24h"})
                                 return next(handelSucess(res,"logined sucessful",data))
                             }else{
                                 // if admin login as admin 
                                 const data={email:isPresent.userEmail,
                                     name:isAdmin.AdminName,
                                 }
                                 const payload={
                                     _id:isPresent._id,
                                     email:isPresent.email,
                                     role:isPresent.role,
                                     admin:isAdmin._id
                                 }
                                 const token = await createToken(payload,"2h")
                                 // now send the res
                                 res.cookie("Admin",token,{expiresIn:"24h"})
                                 return next(handelSucess(res,"logined sucessful",data))
                             }
                         }else{
                           console.log("in creating")
                             if(isPresent.role === "Admin"){
                                 // register Admin
                                 // now create the token for the Admin creation
                                 const payload={ email:isPresent.userEmail , _id:isPresent._id,role:isPresent.role}
                                 const token = await createToken(payload,"2h")
                                 // now send the cookie and res
                                 res.cookie("createAdmin",token,{expiresIn:"2h"})
 
                                 // now sedn the data
                                 return next(handelSucess(res,"Create Admin","AdminCreate"))
 
                             }else if(isPresent.role === "faculty"){
                                 // register Faculty
                                 // now create the token for the Admin creation
                                 const payload={ email:isPresent.userEmail , _id:isPresent._id, role:isPresent.role}
                                 const token = await createToken(payload,"2h")
                                 // now send the cookie and res
                                 res.cookie("CreateFaculty",token,{expiresIn:"2h"})
 
                                 // now sedn the data
                                 return next(handelSucess(res,"Create Faculty","FacultyCreate"))
                             }else{
                                 // register student
                                 console.log("in student")
                                 // now create the token for the Admin creation
                                 const payload={ email:isPresent.userEmail , _id:isPresent._id, role:isPresent.role}
                                 const token = await createToken(payload,"2h")
                                 
                                 // now send the cookie and res
                                 res.cookie("CreateStudent",token,{expiresIn:"2h"})
 
                                 // now sedn the data
                                 return next(handelSucess(res,"Create Student","StudentCreate"))
 
                             }
                         }
                    }
                    else{
                        return next(handelErr(res,"wrong password","password",404))
                    }
                }else{
                    return next(handelErr(res,"please verify the user","err",404))
                }
            }else{
                // if the uer is not present 
                return next(handelErr(res,"please register first or check credentials","user not registerd or Wrong Credentials",404))
            }
        }else{
            return next(handelErr(res,"please provide all  the credentials","provide all the credentials",404))
        }
    }catch(err){
        return next(handelErr(res,err.message,err,404))
    }
}

const ResetPasswordEmailVerification = async(req,res,next)=>{
    try{
        const {Email,url} = req.body
       
        if(Email && url){
            // so if we get the emil 
            
            const IsEmail = await User.findOne({userEmail:Email})
            
            if(IsEmail){
                const payload = {
                    _id:IsEmail._id,
                    email:IsEmail.userEmail
                }

                // now generate the token
                const token = await createToken(payload,"2h") 

                // now send the emailn
                const send_mail=await mailServices(Email,"PasswordChange",`${url}/:${token}`)

                await User.findByIdAndUpdate(IsEmail._id,{emailVerificationTokenExpiry:new Date(Date.now()+2*60*60*1000)})
                return next(handelSucess(res,"Reset Token send sucessful. Change Password with in 2 hours",payload))
            }
        }else{
            return next(handelErr(res,"please send email","Email not found",401))
        }
    }catch(err){
        return next(handelErr(res,err.message,err,404))
    }
}

const ResetPassword = async(req,res,next)=>{
    try{
        const {password} = req.body
        const{token}=req.params
        
        if(password && token){
            
            const Token = await getTokenData(token.substr(1))


            bcrypt.hash(password,10).then(async(data)=>{
                await User.findByIdAndUpdate(Token._id,{userPassword:data,emailVerificationToken:null,emailVerificationTokenExpiry:null})

                return next(handelSucess(res,"sucessful changed password","Sucessful"))
            }).catch((err)=>{
                return next(handelErr(res,err.message,err,404))
            })
            

            
        }else{
            return next(handelErr(res,"Token not found","Token err",401))
        }
    }catch(err){
        return next(handelErr(res,err.message,err,404))
    }
}



// exporting the controllers
module.exports={RegisterUser,EmailValidate,loginUser,ResetPassword,ResetPasswordEmailVerification}