const User = require("../models/User")
const codeQuestions = require("../models/codeQuestionBank")
const Student = require("../models/Students")
const { handelErr, handelSucess } = require("../utils/errHandler")
const axios = require("axios")
const { getTokenData, createToken } = require("../utils/createToken")
const CodeTest =  require("../models/CodeTest")
const Students = require("../models/Students")

const CodingTestSubmission = async(req,res,next)=>{
    // temperary api 
    // this controller for testing of the api and frontend
    try{
        // now take codeing details from the front end 
        const {data} = req.body
        console.log("data",data.language_id)
        if(data){
            const token = await axios.post("https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=false&fields=*",{language_id:data.language_id,source_code:data.source_code,stdin:data.stdin},{
            headers:{"Content-Type":"application/json",
                "x-rapidapi-host":"judge0-ce.p.rapidapi.com",
                "x-rapidapi-key":"8c9941baf7msh9d764d6f2734fedp1cf310jsnd105a9436dc5"
            }
        })
        console.log(token,"token")

        // now check if we get the token 
        if(token){
            
            setTimeout(async()=>{
                const result = await axios.get(`https://judge0-ce.p.rapidapi.com/submissions/${token.data.token}?base64_encoded=false&wait=false&fields=*`,{
                    headers:{"Content-Type":"application/json",
                        "x-rapidapi-host":"judge0-ce.p.rapidapi.com",
                        "x-rapidapi-key":"8c9941baf7msh9d764d6f2734fedp1cf310jsnd105a9436dc5"
                    }
                })
                console.log(result.data , "result")
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
module.exports = {CodingTestSubmission,StartCodingTest}