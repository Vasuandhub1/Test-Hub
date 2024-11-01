 const mailer=require("nodemailer")
const Subject = require("../models/Subject")
 require("dotenv").config()

 const sendEmail=(otp,email)=>{
    const transporter=mailer.createTransport({
        service:"gmail",
        auth:{
            user:"cdgi.testhub@gmail.com",
            pass:process.env.PASSKEY
        }
     })
    
     const mailOptione={
        from:"cdgi.testhub@gmail.com",
        to:`${email}`,
        Subject:"Regarding the email verification",
        text:`you verification code is ${otp}`
     }
     transporter.sendMail(mailOptione,(err,info)=>{
        if(info){
            console.log("send email sucessfull",info)
            return true
        }else{
            console.log(err)
            return false
        }
     })
 }

 module.exports={sendEmail}