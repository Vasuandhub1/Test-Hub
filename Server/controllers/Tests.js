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



const CodingTestSubmission = async (req, res, next) => {
    try {
        const { data } = req.body;
        if (!data) {
            return next(handelErr(res, "Please send the data", "Missing request body", 400));
        }

        // Base64 encoding & decoding helper functions
        const encodeBase64 = (text) => Buffer.from(text || "").toString("base64");
        const decodeBase64 = (text) => (text ? Buffer.from(text, "base64").toString("utf-8") : null);

        // Send submission request with Base64-encoded fields
        const response = await axios.post(
            "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&wait=false&fields=*",
            {
                language_id: data.language_id,
                source_code: encodeBase64(data.source_code),
                stdin: encodeBase64(data.stdin),
                expected_output: data.expected_output ? encodeBase64(data.expected_output) : null,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
                    "x-rapidapi-key": "8c9941baf7msh9d764d6f2734fedp1cf310jsnd105a9436dc5",
                },
            }
        );

        if (!response.data.token) {
            return next(handelErr(res, "Server error", "Failed to get submission token", 500));
        }

        const token = response.data.token;
        let attempts = 0;
        const maxAttempts = 10; // Prevent infinite loops

        const checkResult = async () => {
            try {
                const result = await axios.get(
                    `https://judge0-ce.p.rapidapi.com/submissions/${token}?base64_encoded=true&fields=*`, // Ensure response is Base64 encoded
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
                            "x-rapidapi-key": "8c9941baf7msh9d764d6f2734fedp1cf310jsnd105a9436dc5",
                        },
                    }
                );

                const statusId = result.data.status.id;
                console.log(`Status ID: ${statusId}`);

                if (statusId === 1 || statusId === 2) {
                    if (attempts < maxAttempts) {
                        attempts++;
                        setTimeout(checkResult, 1000);
                    } else {
                        return next(handelErr(res, "Execution timeout", "Execution took too long", 408));
                    }
                } else {
                    // Decode Base64-encoded response fields
                    const decodedResult = {
                        ...result.data,
                        stdout: decodeBase64(result.data.stdout),
                        stderr: decodeBase64(result.data.stderr),
                        compile_output: decodeBase64(result.data.compile_output),
                        message: decodeBase64(result.data.message),
                    };

                    return next(handelSucess(res, "Compiled successfully", decodedResult, 200));
                }
            } catch (error) {
                console.log(error);
                return next(handelErr(res, error.message, error, 500));
            }
        };

        checkResult();
    } catch (err) {
        return next(handelErr(res, err.message, err, 500));
    }
};




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
                        TestName:test.TestName,
                        TotalMarks:test.TotalMarks
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
    const {Student}= req.cookies
    try{
        const token = await getTokenData(Student)
        const data = await CodeTest.find({$or:[{Branch:token.branch },{Branch:"All"}]}).populate("Faculty")
        
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

const handleQuestionCodeSubmitte = async (req, res, next) => {
    try {
        // Extract tokens from cookies
        const { Student, CodingTest } = req.cookies;
        const { data, QuestionId } = req.body;

        // Check if we received both tokens
        if (Student && CodingTest) {
            // Decode the tokens
            const StudentToken = await getTokenData(Student);
            const TestToken = await getTokenData(CodingTest);

            if (data && QuestionId) {
                console.log(data?.language_id);
                console.log(data?.source_code);
                console.log(data?.stdin);
                console.log(data?.expected_output);

                // Fetch the question details
                const Question = await codeQuestionBank.findById(QuestionId);
                console.log(Question);

                // Function to convert input to Base64
                const encodeBase64 = (text) => Buffer.from(text || "").toString("base64");
                const decodeBase64 = (text) => (text ? Buffer.from(text, "base64").toString("utf-8") : null);

                // Submit code for execution
                const tokenResponse = await axios.post(
                    "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&wait=false&fields=*",
                    {
                        language_id: data.language_id,
                        source_code: encodeBase64(data.source_code),
                        stdin: encodeBase64(Question.HiddenTestCaseInput),
                        expected_output: encodeBase64(Question.HiddenTestCaseOutput),
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
                            "x-rapidapi-key": "8c9941baf7msh9d764d6f2734fedp1cf310jsnd105a9436dc5",
                        },
                    }
                );

                // Check if token is received
                if (tokenResponse.data.token) {
                    const token = tokenResponse.data.token;
                    let attempts = 0;
                    const maxAttempts = 10; // Prevent infinite loops

                    const checkResult = async () => {
                        try {
                            const result = await axios.get(
                                `https://judge0-ce.p.rapidapi.com/submissions/${token}?base64_encoded=true&fields=*`,
                                {
                                    headers: {
                                        "Content-Type": "application/json",
                                        "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
                                        "x-rapidapi-key": "8c9941baf7msh9d764d6f2734fedp1cf310jsnd105a9436dc5",
                                    },
                                }
                            );

                            console.log(result.data);

                            const statusId = result.data.status.id;
                            if (statusId === 1 || statusId === 2) {
                                if (attempts < maxAttempts) {
                                    attempts++;
                                    setTimeout(checkResult, 1000);
                                } else {
                                    return next(handelErr(res, "Execution timeout", "Execution took too long", 408));
                                }
                            } else {
                                // Decode response fields
                                const decodedResult = {
                                    ...result.data,
                                    stdout: decodeBase64(result.data.stdout),
                                    stderr: decodeBase64(result.data.stderr),
                                    compile_output: decodeBase64(result.data.compile_output),
                                    message: decodeBase64(result.data.message),
                                };

                                // Check if submission is correct
                                if (decodedResult.status.id === 3) {
                                    const IsTest = await CodeTestResult.findOne({
                                        StudentId: StudentToken.student_id,
                                        TestId: TestToken._id,
                                    });

                                    if (IsTest) {
                                        // Check if student already submitted this question
                                        if (!IsTest.QuestionId.includes(QuestionId)) {
                                            let marks = 0;
                                            if (Question.DifficultyLevel === "Easy") marks = Number(IsTest.TotalMarksObtained) + 5;
                                            else if (Question.DifficultyLevel === "Medium") marks = Number(IsTest.TotalMarksObtained) + 10;
                                            else marks = Number(IsTest.TotalMarksObtained) + 15;

                                            // Update test result
                                            await CodeTestResult.findByIdAndUpdate(
                                                IsTest._id,
                                                {
                                                    TotalMarksObtained: marks,
                                                    $push: { QuestionId: QuestionId },
                                                },
                                                { new: true }
                                            );

                                            return next(handelSucess(res, "Submitted successfully", decodedResult));
                                        } else {
                                            return next(handelSucess(res, "Already submitted this question", decodedResult));
                                        }
                                    } else {
                                        // First submission, create a test record
                                        let marks = 0;
                                        if (Question.DifficultyLevel === "Easy") marks = 5;
                                        else if (Question.DifficultyLevel === "Medium") marks = 10;
                                        else marks = 15;

                                        await CodeTestResult.create({
                                            TestId: TestToken._id,
                                            QuestionId: [QuestionId],
                                            TotalMarksObtained: marks,
                                            StudentId: StudentToken.student_id,
                                            TotalMarks:TestToken.TotalMarks
                                        });

                                        return next(handelSucess(res, "Submitted successfully", decodedResult));
                                    }
                                } else {
                                    return next(handelSucess(res, "Wrong answer", decodedResult));
                                }
                            }
                        } catch (error) {
                            console.log(error);
                            return next(handelErr(res, error.message, error, 500));
                        }
                    };

                    checkResult();
                } else {
                    return next(handelErr(res, "Code compiler server error", "Code execution server error", 500));
                }
            } else {
                return next(handelErr(res, "Code data or QuestionId not found", "Missing required parameters", 400));
            }
        } else {
            return next(handelErr(res, "Authentication tokens not found in cookies", "Unauthorized", 401));
        }
    } catch (err) {
        return next(handelErr(res, err.message, err, 500));
    }
};


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
    const {Student}= req.cookies
    try{
        const token = await getTokenData(Student)
        const data = await MCQtest.find({$or:[{Branch:token.branch},{Branch:"All"}]}).populate("Faculty")
        
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
                        TestName:test.TestName,
                        TotalMarks:test.TotalMarks
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
            

            // now we have to calculate thje merks 
            const Question = await MCQQuestionBank.findById(data._id)
            console.log(1 +Number(data.ans),data._id,Question.correctAns)



            // check if the ans id correct 
            if(Number(data.ans)+1 == Question.correctAns){
                console.log("Correct")
                // if the ans ic correct
                const IsResult = await MCQTestResult.findOne({StudentId:StudentToken.student_id,TestId:MCQToken._id})
                if(IsResult){
                    const marks=IsResult.TotalMarksObtained+2;
                    await MCQTestResult.findByIdAndUpdate(IsResult._id,{TotalMarksObtained:marks})
                    return next(handelSucess(res,"sucess","Saved sucess"))
                }else{
                    console.log(MCQToken,"creating ans")
                    await MCQTestResult.create({TotalMarksObtained:2,StudentId:StudentToken.student_id,MCQTest:MCQToken._id,TotalMarks:MCQToken.TotalMarks})
                    return next(handelSucess(res,"sucess","Saved sucess"))
                }
            }else{
                console.log("Wrong")
                const IsResult = await MCQTestResult.findOne({StudentId:StudentToken.student_id,TestId:MCQToken._id})
                if(IsResult){
                    return next(handelSucess(res,"sucess","Saved sucess"))
                }else{
                    await MCQTestResult.create({TotalMarksObtained:0,TestId:MCQToken._id,StudentId:StudentToken.student_id,MCQTest:MCQToken._id,TotalMarks:MCQToken.TotalMarks})
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


// run code the 
const RunCode = async(data,QuestionId)=>{
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
            const interval = setInterval(async()=>{
                const result = await axios.get(`https://judge0-ce.p.rapidapi.com/submissions/${token.data.token}?base64_encoded=false&wait=false&fields=*`,{
                    headers:{"Content-Type":"application/json",
                        "x-rapidapi-host":"judge0-ce.p.rapidapi.com",
                        "x-rapidapi-key":"8c9941baf7msh9d764d6f2734fedp1cf310jsnd105a9436dc5"
                    }
                }) 
                // check if get the ans 
                if(result.data.status.id != 2){
                    clearInterval(interval)
                }else{
                    return
                }
               
            },1000)

        }else{
            return next(handelErr(res,"Code compiler server err","code server err",404))
        }

    }else{
        return next(handelErr(res,"code data not found","Code data err || questionId",404))
    }
}



module.exports = {CodingTestSubmission,SubmitMCQTestQuestion,GetMCQQuestion,StartMCQTest,GetAllMCQTest,SubmitTest,StartCodingTest,handleQuestionCodeSubmitte,GetAllCodingTest,GetQuestion}