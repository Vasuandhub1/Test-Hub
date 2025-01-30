const token = require("jsonwebtoken")
require("dotenv").config()

const createToken=async(payload,Expiretime)=>{
        const newToken=token.sign(payload,process.env.SECRET_KEY,{expiresIn:Expiretime})
    return newToken 
   
}

const getTokenData=async(newToken)=>{
    const tokenData=token.decode(newToken)
    return tokenData
}

module.exports={createToken,getTokenData}
