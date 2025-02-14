const User = require("../models/User")
const codeQuestions = require("../models/codeQuestionBank")
const Student = require("../models/Students")
const { handelErr, handelSucess } = require("../utils/errHandler")
const axios = require("axios")

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
module.exports = {CodingTestSubmission}