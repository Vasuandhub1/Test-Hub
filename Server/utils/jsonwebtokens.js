const jwt=require("jsonwebtoken")
require("dotenv").config()

const createToken=(payload,age)=>{
    //  now create the jwt token
    const token=jwt.sign(payload,process.env.KEY,{expiresIn:age})
    return token
}
module.exports={createToken}