const Student = require("../models/Students")
const {handelErr, handelSucess}=require("../utils/errHandler")
const User = require("../models/User")
const {createToken, getTokenData}=require("../utils/createToken")


const StudentRegister = async(req,res,next)=>{
    try{
        // now get the data from the cookie 
        const {CreateStudent} = req.cookies
        const {Sname,Enroll,Year,Section,Branch,Gender,DOB} = req.body

        // now if we have the all the data 
        const TokenData = await getTokenData(CreateStudent)
        
        // check if the Student 
        const isStudent = await Student.findOne({userId:TokenData._id})
        if(isStudent){
            res.cookie("CreateStudent", "", { maxAge: 0, httpOnly: true });
            return next(handelErr(res,"Student is Already present",isStudent,401))
        }

        // now check if we get all the required data from the uer 
        if(Sname||Enroll||Year||Section||Branch||Gender||DOB){
            
           

            // now create the student 
            const isStudent = await Student.create({Sname,Enroll,Gender,Year,Section,Branch,DOB,userId:TokenData._id})
            const isPresent = await User.findById(TokenData._id)
            // now craete the login token
            const data={email:isPresent.userEmail,
                name:isStudent.Sname,
                Enroll:isStudent.Enroll,
                section:isStudent.Section,
                branch:isStudent.Branch,
                DOB:isStudent.DOB
            }
           
            const payload={
                _id:isPresent._id,
                email:isPresent.email,
                role:isPresent.role,
                student_id:isStudent._id
            }
            const token = await createToken(payload,"2h")
            // now send the res
            res.cookie("Student",token,{expiresIn:"2h", httpOnly:true})
            // delete the prev cookie
            res.cookie("CreateStudent", "", { maxAge: 0, httpOnly: true });

            // now send the data to the user
            return next(handelSucess(res,"Student created sucessfully", data))

        } else{
            return next(handelErr(res,"please enter all the details","Fill all the filds",404))
        }
    }catch(err){
        return next(handelErr(res,err.message,err,404))
    }
}

module.exports={StudentRegister}