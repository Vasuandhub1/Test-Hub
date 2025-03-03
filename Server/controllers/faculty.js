const Faculty = require("../models/Faculty") 
const {handelErr, handelSucess}=require("../utils/errHandler")
const User = require("../models/User")
const {createToken, getTokenData}=require("../utils/createToken")
const Code = require("../models/codeQuestionBank")
const Subject = require("../models/Subject")
const MCQ = require("../models/MCQQuestionBank")
const CodeTest =  require("../models/CodeTest")
const Students = require("../models/Students")


// now carete the function to regaiter the faculty
const FacultyRegister = async (req,res,next)=>{
    try{
        // now take the data from the user 
        const {CreateFaculty} = req.cookies
        const {Fname,Branch,JoiningYear,Gender,FacultyEnroll,DOB} = req.body

         // now if we have the all the data 
         const TokenData = await getTokenData(CreateFaculty)
         console.log(TokenData)
           // check if the Student 
                 const isFacultypresent = await Faculty.findOne({UserId:TokenData._id})
                
                 if(isFacultypresent){
                    res.cookie("CreateFaculty", "", { maxAge: 0, httpOnly: true });
                    return next(handelErr(res,"Faculty is Already present",isFacultypresent,401))
                }
                else{
                //  now check if we get all the required data from the uer 
                if(Fname||Branch||JoiningYear||Gender||FacultyEnroll||DOB){

                    const isPresent = await User.findById(TokenData._id)

                    if(isPresent.role ==="faculty"){

                    // now create the Faculty 
                    const isFaculty = await Faculty.create({Fname,UserId:TokenData._id,Branch,JoiningYear,Gender,FacultyEnroll,DOB})
                    
                    // now create the login page 
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
                    return next(handelSucess(res,"Student created Sucessfully",data))

                }else{
                    return next(handelErr(res,"please fill all the details","Fill all the detila",404))
                }
            }else{
                return next(handelErr(res,"the user is not a faculty","Not a faculty",401))
            }
        }
    }catch(err){
        return next(handelErr(res,err.message,err,404))
    }
}

// now create the controller to create the question and the question to the question bank 

const CreateCodingQuestion = async (req,res,next)=>{
    try{
        // now take the data  from the req body 
        const {QuestionName,QuestionDescription,SpaceConstrains,TimeConstrains,SampleInputs,SampleOutputs,DifficultyLevel} = req.body

        // now check all the parameters
        if(QuestionName && QuestionDescription && SpaceConstrains && TimeConstrains && SampleInputs && SampleOutputs){
            // now store all the data to the data base 
            const question = await Code.create({QuesName:QuestionName,
                QuesDescrition:QuestionDescription,
            InputTestCase:SampleInputs, OutputTestCase:SampleOutputs, TimeConstrains:TimeConstrains,
        SpaceConstrains:SpaceConstrains,DifficultyLevel:DifficultyLevel}) 
        
        return next(handelSucess(res,"Sucessfully created the question ",question))

        }else{
            return next(handelErr(res,"Please enter all the data","Enter all the data",404))
        }
    }catch(err){
        return next(handelErr(res,err.message,err,404))
    }
}

//  now create MCQ question 
const CreateMCQQuestions = async(req,res,next)=>{
    try{
        const {Faculty} = req.cookies
        const {QuestionDescription,Subject,options,CorrectOption} = req.body

        if(QuestionDescription && Subject && options && CorrectOption){
            // now create the question
            const token = await getTokenData(Faculty)
            const create  =  await MCQ.create({QuesDescription:QuestionDescription,subjectCode:Subject,correctAns:CorrectOption,faculty:token._id,options:options})

            return next(handelSucess(res,"sucessfully created question",create))
        }else{
            return next(handelErr(res,"please enter all the details","please enter all the details",404))
        }
    }catch(err){
        return next(handelErr(res,err.message,err,404))
    }
} 

const CreateSubject = async(req,res,next)=>{
    try{
        const{Sname,Scode} = req.body

        if(Sname && Scode){

            const data = await Subject.create({Sname,Scode})
            return next(handelSucess(res,"sucessfully created the Subject",data))

        }else{
            return next(handelErr(res,"please enter all the details","err",404))
        }
    }catch(err){
        return next(handelErr(res,err.message,err,404))
    }
}

const GetAllSubjects = async(req,res,next)=>{
    try{
        const data = await Subject.find()
        return next(handelSucess(res,"sucessfully get the subjects",data))
    }catch(err){
        return next(handelErr(res,err.message,err,404))
    }
}

const GetAllCodeQuestions = async(req,res,next)=>{
try{
    const {page} = req.params 
     const data =  await Code.find().limit(2).skip(page)
    return next(handelSucess(res,"sucessfuly get all the Questions",data))
}catch(err){
    return next(handelErr(res,err.message,err,404))
}
}

const CreateCodeTest = async(req,res,next)=>{
    try{
        const {Faculty} = req.cookies
        const {TestName,TestDescription,TestStartTime,TestExpireTime,AttemptTime,Questions,Branch,Year}=req.body

        // check if all the data are presnt 
        if(TestName && TestDescription && TestStartTime && TestExpireTime && AttemptTime && Questions){
            // now get the token data 
            const token  =  await getTokenData(Faculty)
            // find all the student and addto the list who can attempt the test
            const StudentList = await Students.find()
            if(Year==="All" && Branch === "All" ){
                 const Student = StudentList.map(student => student._id);
               
            const CreatedTest = await CodeTest.create({TestName,TestDescription,TestStartTime,TestExpireTime,AttemptTime,Questions,Faculty:token._id,StudentList:Student})

            // now return the code test
            return next(handelSucess(res,"Sucessfully created the test",CreatedTest,200))
            }else{
                if(Year==="All" && Branch != "All"){
                    
                StudentList.filter((elem)=>{
                    if(elem.Branch === Branch ){
                        return true
                    }else{
                        return false
                    }
                })
                
                const Student = StudentList.map(student => student._id);

                const CreatedTest = await CodeTest.create({TestName,Branch,TestDescription,TestStartTime,TestExpireTime,AttemptTime,Questions,Faculty:token._id,StudentList:Student})
                return next(handelSucess(res,"Sucessfully created the test",CreatedTest,200))    
            }

                if(Branch === "All" && Year != "All"){
                    
                StudentList.filter((elem)=>{
                    if( elem.Year === Year){
                        return true
                    }else{
                        return false
                    }
                })
                const Student = StudentList.map(student => student._id);

                const CreatedTest = await CodeTest.create({TestName,Year,TestDescription,TestStartTime,TestExpireTime,AttemptTime,Questions,Faculty:token._id,StudentList:Student})
                return next(handelSucess(res,"Sucessfully created the test",CreatedTest,200))
                }
                
                StudentList.filter((elem)=>{
                    if(elem.Branch === Branch && elem.Year === Year){
                        return true
                    }else{
                        return false
                    }
                })
                const Student = StudentList.map(student => student._id);

                const CreatedTest = await CodeTest.create({TestName,Year,Branch,TestDescription,TestStartTime,TestExpireTime,AttemptTime,Questions,Faculty:token._id,StudentList:Student})
                return next(handelSucess(res,"Sucessfully created the test",CreatedTest,200))
            }
        }
        else{
            return next(handelErr(res,"Please fill all the details ","Enter all the details",404))
        }
        
    }catch(err){
        return next(handelErr(res,err.message,err,404))
    }
}

// now get all the availabe test
const GetAllCodingTest = async(req,res,next)=>{
    try{
        const data = await CodeTest.find()
        return next(handelSucess(res,"sucessfully fetchted the data",data))
    }catch(err){
        return next(handelErr(res,err.message,err,404))
    }
}

module.exports = {FacultyRegister,GetAllCodingTest,CreateCodeTest,GetAllCodeQuestions,CreateCodingQuestion,CreateSubject,GetAllSubjects,CreateMCQQuestions}