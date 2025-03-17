const User = require("../models/User")
const codeQuestions = require("../models/codeQuestionBank")
const Student = require("../models/Students")
const { handelErr, handelSucess } = require("../utils/errHandler")
const axios = require("axios")
const { getTokenData, createToken } = require("../utils/createToken")
const CodeTest =  require("../models/CodeTest")
const Students = require("../models/Students")
const codeQuestionBank = require("../models/codeQuestionBank")
const CodeTestResult = require("../models/CodeTestResult")
const MCQtest = require("../models/MCQtest")
const MCQQuestionBank = require("../models/MCQQuestionBank")
const MCQTestResult = require("../models/MCQTestResult")

const CodingTestSubmission = async(req,res,next)=>{
    // temperary api 
    // this controller for testing of the api and frontend
    try{
        // now take codeing details from the front end 
        const {data} = req.body
        
        if(data){
            const token = await axios.post("https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=false&fields=*",{language_id:data.language_id,source_code:data.source_code,stdin:data.stdin,expected_output:data.expected_output},{
            headers:{"Content-Type":"application/json",
                "x-rapidapi-host":"judge0-ce.p.rapidapi.com",
                "x-rapidapi-key":"8c9941baf7msh9d764d6f2734fedp1cf310jsnd105a9436dc5"
            }
        })
      

        // now check if we get the token 
        if(token){
            
            setTimeout(async()=>{
                const result = await axios.get(`https://judge0-ce.p.rapidapi.com/submissions/${token.data.token}?base64_encoded=false&wait=false&fields=*`,{
                    headers:{"Content-Type":"application/json",
                        "x-rapidapi-host":"judge0-ce.p.rapidapi.com",
                        "x-rapidapi-key":"8c9941baf7msh9d764d6f2734fedp1cf310jsnd105a9436dc5"
                    }
                })
                
                return next(handelSucess(res,"compiled sucessful ",result.data,200))
            },1000)
            
        }else{
            return next(handelErr(res,"server err","server err",400))
        }

        }else{
            return next(handelErr(res,"please send the data","err in sending the data",404))
        }
    }catch(err){
        return next(handelErr(res,err.message,err,404))
    }
}

const StartCodingTest  = async (req,res,next)=>{
    try{
        // so we have to update the both student and test list 
        // and we havr to create the tokne of test time size 
        // we have to check if the test is not expired yet
        // test taking time should be greator than start time and less then end time 

      const {Student} = req.cookies
      const {Test_id} = req.params

      if(Test_id){
        const token = await getTokenData(Student)
        const test = await CodeTest.findById(Test_id)

        // now check for the test timing
        if(Date.now() < new Date(test.TestExpireTime) && Date.now() >= new Date(test.TestStartTime) ){

            // now check  if the student is present in the test student array
            if(test.StudentList.includes(token.student_id)){

                // now check if student can attaind the test
                if(test.AttemptedTestStudentList.includes(token.student_id)){
                    return next(handelErr(res,"Already Attempted Test","Can not attempt test multiple time",404))
                }else{
                    // now start the test for the student  
                    // create Test Token 
                    const TestTokenPayload = {
                        _id:test._id,
                        TestName:test.TestName
                    } 
                    const TestToken = await createToken(TestTokenPayload,"24h")

                    // update the test Attainned list 
                    await CodeTest.findByIdAndUpdate(test._id,{$push:{AttemptedTestStudentList:token.student_id}})
                    await Students.findByIdAndUpdate(token.student_id,{$push:{CodingTest:test._id}})

                    // now send the test Start cookie 
                    res.cookie("CodingTest",TestToken,{expiresIn:new Date( Date().now + 1000*60*60*test.AttemptTime)})
                    return next(handelSucess(res,"Start test All the best",test))
                }
            }else{
                
                return next(handelErr(res,"You are not eligeble for the test","Not eliglible ",404))
            }

            
        }else{
            return next(handelErr(res,"date err",Date.now() < new Date(test.TestExpireTime),404))
        }


      }else{
        return next(handelErr(res,"Did not get the test id","please enter the test_id",404))
      }

    }catch(err){
        return next(handelErr(res,err.message,err,404))
    }
}
// now get all the availabe test
const GetAllCodingTest = async(req,res,next)=>{
    try{
        const data = await CodeTest.find().populate("Faculty")
        
        return next(handelSucess(res,"sucessfully fetchted the data",data))
    }catch(err){
        return next(handelErr(res,err.message,err,404))
    }
}

const GetQuestion =  async(req,res,next)=>{
    try{
        const {QuesId} = req.params
        const Question = await codeQuestionBank.findById(QuesId)

        return next(handelSucess(res,"Question Sucessful",Question))
    }catch(err){
        return next(handelErr(res,err.message,err,404))
    }
}

const EndTest = async(req,res,next)=>{
    try{
        const {CodingTest} = req.cookies

        // now expire the cookie 
        return res.cookie("CodingTest","",{})
    }catch(err){
        return next(handelErr(res,err.message,err,404))
    }
}

const handleQuestionCodeSubmitte = async(req,res,next)=>{
    try{
        //  now take the question id ,student id and test id from the req body 

        const {Student,CodingTest}=req.cookies
        const {data,QuestionId}=req.body

        // cehck if we get both the token 
        if(Student,CodingTest){
            // now decode the tokens 
            const StudentToken = await getTokenData(Student)
            const TestToken = await getTokenData(CodingTest)
            if(data && QuestionId){
                console.log(data?.language_id)
                console.log(data?.source_code)
                console.log(data?.stdin)
                console.log(data?.expected_output)
                const Question = await codeQuestionBank.findById(QuestionId)
                console.log(Question)
                // now we have to submitte the code and check if the answer is correct or not
                const token = await axios.post("https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=false&fields=*",{language_id:data.language_id,source_code:data.source_code,stdin:Question.HiddenTestCaseInput,expected_output:Question.HiddenTestCaseOutput},{
                    headers:{"Content-Type":"application/json",
                        "x-rapidapi-host":"judge0-ce.p.rapidapi.com",
                        "x-rapidapi-key":"8c9941baf7msh9d764d6f2734fedp1cf310jsnd105a9436dc5"
                    }
                })

                // so if we get the token
                if(token){
                    // now get the compiled solution 
                    setTimeout(async()=>{
                        const result = await axios.get(`https://judge0-ce.p.rapidapi.com/submissions/${token.data.token}?base64_encoded=false&wait=false&fields=*`,{
                            headers:{"Content-Type":"application/json",
                                "x-rapidapi-host":"judge0-ce.p.rapidapi.com",
                                "x-rapidapi-key":"8c9941baf7msh9d764d6f2734fedp1cf310jsnd105a9436dc5"
                            }
                        })
                        console.log(result.data)
                        if(result){
                            // now check if the solution is correct update the students test marks by checking if the solution is presubmitted or not 
                            // if it is the first submission (check if the codetestResult exist for the student test)
                            if(result?.data?.status?.id === 3){
                            const IsTest = await CodeTestResult.findOne({StudentId:StudentToken.student_id,TestId:TestToken._id})
                            
                            if(IsTest){
                                // check of the student already submitted for the same question 
                                if(!IsTest.QuestionId.includes(QuestionId)){
                                    let marks=0
                                    if(Question.DifficultyLevel==="Easy"){
                                        marks=IsTest.TotalMarksObtained+5
                                    }else if(Question.DifficultyLevel==="Medium"){
                                        marks=IsTest.TotalMarksObtained+10
                                    }else{
                                        marks=IsTest.TotalMarksObtained+15
                                    }
                                    // now update the test
                                    await CodeTestResult.findByIdAndUpdate(
                                        IsTest._id,
                                        {
                                          TotalMarksObtained: marks, 
                                          $push: { QuestionId: QuestionId } // Ensure QuestionId is a valid value
                                        },
                                        { new: true } // To return the updated document
                                      );
                                      
                                    return next(handelSucess(res,"Submitted sucessful",result.data))
                                }else{
                                    return next(handelSucess(res,"Submitted sucessful",result.data))
                                }
                            }else{
                                // now create the first submission and add the merks
                                let marks=0
                                    if(Question.DifficultyLevel==="Easy"){
                                        marks=5
                                    }else if(Question.DifficultyLevel==="Medium"){
                                        marks=10
                                    }else{
                                        marks=15
                                    }
                                    await CodeTestResult.create({TestId:TestToken._id, QuestionId:[QuestionId],TotalMarksObtained:marks,StudentId:StudentToken.student_id})

                                    return next(handelSucess(res,"Submitted sucessful",result.data))
                            }

                        }else{
                            return next(handelSucess(res,"Wrong ans",result.data))
                        }
                    }else{
                        return next(handelErr(res,"Try again","please try agaain",400))
                    }
                    },1000)

                }else{
                    return next(handelErr(res,"Code compiler server err","code server err",404))
                }

            }else{
                return next(handelErr(res,"code data not found","Code data err || questionId",404))
            }
        }else{
            return next(handelErr(res,"did not found cookies","Err",401))
        }
    }catch(err){
        return next(handelErr(res,err.message,err,404))
    }
}

const SubmitTest = async(req,res,next)=>{
    try{
        // we have to check if the 
        const {Student,CodingTest}=req.cookies
        const {data,QuestionId}=req.body

        // cehck if we get both the token 
        if(Student,CodingTest){
            // now decode the tokens 
            const StudentToken = await getTokenData(Student)
            const TestToken = await getTokenData(CodingTest)

            const IsTest = await CodeTestResult.findOne({StudentId:StudentToken.student_id,TestId:TestToken._id})
            if(IsTest){
                return next(handelSucess(res,"Test Saved Sucessful","sucess"))
            }else{
                await CodeTestResult.create({TestId:TestToken._id,TotalMarksObtained:0,StudentId:StudentToken.student_id})
                return next(handelSucess(res,"Test Saved Sucessful ","Test Submitted with out any Submission"))
            }
        }
            else{
                return next(handelErr(res,"student ans test not found","Err",402))
            }
    }catch(err){
        return next(handelErr(res,err.message,err,404))
    }
}

const GetAllMCQTest = async(req,res,next)=>{
    try{
        const data = await MCQtest.find().populate("Faculty")
        
        return next(handelSucess(res,"sucessfully fetchted the data",data))
    }catch(err){
        return next(handelErr(res,err.message,err,404))
    }
}

const StartMCQTest = async(req,res,next)=>{
    try{
        // so we have to update the both student and test list 
        // and we havr to create the tokne of test time size 
        // we have to check if the test is not expired yet
        // test taking time should be greator than start time and less then end time 

      const {Student} = req.cookies
      const {Test_id} = req.params

      if(Test_id){
        const token = await getTokenData(Student)
        const test = await MCQtest.findById(Test_id)

        // now check for the test timing
        if(Date.now() < new Date(test.TestExpireTime) && Date.now() >= new Date(test.TestStartTime) ){

            // now check  if the student is present in the test student array
            if(test.StudentList.includes(token.student_id)){

                // now check if student can attaind the test
                if(test.AttemptedTestStudentList.includes(token.student_id)){
                    return next(handelErr(res,"Already Attempted Test","Can not attempt test multiple time",404))
                }else{
                    // now start the test for the student  
                    // create Test Token 
                    const TestTokenPayload = {
                        _id:test._id,
                        TestName:test.TestName
                    } 
                    const TestToken = await createToken(TestTokenPayload,"24h")

                    // update the test Attainned list 
                    await MCQtest.findByIdAndUpdate(test._id,{$push:{AttemptedTestStudentList:token.student_id}})
                    await Students.findByIdAndUpdate(token.student_id,{$push:{MCQtest:test._id}})

                    // now send the test Start cookie 
                    res.cookie("MCQTest",TestToken,{expiresIn:new Date( Date().now + 1000*60*60*test.AttemptTime)})
                    return next(handelSucess(res,"Start test All the best",test))
                }
            }else{
                
                return next(handelErr(res,"You are not eligeble for the test","Not eliglible ",404))
            }

            
        }else{
            return next(handelErr(res,"Test Expired",Date.now() < new Date(test.TestExpireTime),404))
        }


      }else{
        return next(handelErr(res,"Did not get the test id","please enter the test_id",404))
      }

    }catch(err){
        return next(handelErr(res,err.message,err,404))
    }
}

const GetMCQQuestion =async(req,res,next)=>{
    try{
        const {QuesId} = req.params
        const Question = await MCQQuestionBank.findById(QuesId)
        console.log(Question)
        return next(handelSucess(res,"Question Sucessful",Question))
    }catch(err){
        return next(handelErr(res,err.message,err,404))
    }
}


const SubmitMCQTestQuestion = async(req,res,next)=>{
    try{
        const {Student,MCQTest}=req.cookies
        const {data}=req.body
        if(MCQTest){
            const MCQToken = await getTokenData(MCQTest)
            const StudentToken = await getTokenData(Student)
            console.log(MCQToken)
            console.log(StudentToken)
            console.log(data,"data")

            // now we have to calculate thje merks 
            const Question = MCQQuestionBank.findById(data._id)

            // check if the ans id correct 
            if(data.ans === Question.correctAns){
                // if the ans ic correct
                const IsResult = await MCQTestResult.findOne({StudentId:StudentToken.student_id,TestId:MCQToken._id})
                if(IsResult){
                    const marks=IsResult.TotalMarksObtained+5;
                    await MCQTestResult.findByIdAndUpdate(IsResult._id,{TotalMarksObtained:marks})
                    return next(handelSucess(res,"sucess","Saved sucess"))
                }else{
                    await MCQTestResult.create({TotalMarksObtained:5,StudentId:StudentToken.student_id,MCQTest:MCQToken._id})
                    return next(handelSucess(res,"sucess","Saved sucess"))
                }
            }else{

                const IsResult = await MCQTestResult.findOne({StudentId:StudentToken.student_id,TestId:MCQToken._id})
                if(IsResult){
                    return next(handelSucess(res,"sucess","Saved sucess"))
                }else{
                    await MCQTestResult.create({TotalMarksObtained:5,TestId:MCQToken._id,StudentId:StudentToken.student_id,MCQTest:MCQToken._id})
                    return next(handelSucess(res,"sucess","Saved sucess"))
                }
            }
        }else{
            return next(handelErr(res,"Error not got details","token not found",401))
        }
    }catch(err){
        return next(handelErr(res,err.message,err,404))
    }
}




module.exports = {CodingTestSubmission,SubmitMCQTestQuestion,GetMCQQuestion,StartMCQTest,GetAllMCQTest,SubmitTest,StartCodingTest,handleQuestionCodeSubmitte,GetAllCodingTest,GetQuestion}