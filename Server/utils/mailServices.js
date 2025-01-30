const nodemailer=require("nodemailer")
const User=require("../models/User")

const MailService=async(email,mailtype,token)=>{
    const value=token
try{
    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth: {
          user: "cdgi.testhub@gmail.com",
          pass: "tntg gfma eagw qzsb",
        },
      });
    //    now creat the mail opetions
    if(mailtype==="Verification"){
        const mailOpetions={
            from:"cdgi.testhub@gmail.com",
            to:email,
            subject:"Mail for Email Verification",
            html:`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CDGI Test-Hub | Email Verification</title>
    <style>
        @media (max-width: 600px) {
            .card-container {
                padding: 20px;
            }
            .button-link {
                font-size: 16px !important;
                padding: 10px 20px !important;
            }
        }
        .button-link {
            display: inline-block;
            background-color: #4CAF50;
            color: #ffffff;
            text-decoration: none;
            font-size: 18px;
            font-weight: bold;
            padding: 15px 25px;
            border-radius: 10px;
            border: none;
            transition: background-color 0.3s, transform 0.2s;
        }
        .button-link:hover {
            background-color: #388e3c;
            transform: scale(1.05);
            text-decoration: none;
        }
    </style>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f0f4f8; margin: 0; padding: 20px;">
    <div class="card-container" style="max-width: 500px; background-color: #ffffff; margin: auto; padding: 40px 30px; border-radius: 16px; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1); text-align: center;">
        <img src="https://img.icons8.com/ios-filled/100/4CAF50/company.png" alt="CDGI Test-Hub Logo" style="width: 90px; margin-bottom: 15px;">
        <h1 style="color: #4CAF50; margin-bottom: 5px;">CDGI Test-Hub</h1>
        <h2 style="color: #333333; margin-bottom: 15px;">Email Verification</h2>
        <p style="color: #555555; font-size: 15px; margin-bottom: 20px;">Click the button below to visit our website and complete your verification.</p>
        <a href="${value}" class="button-link">Verify Now</a>
        <div style="font-size: 12px; color: #9e9e9e; margin-top: 25px;">
            Didn't request this? Please ignore this email.
        </div>
    </div>
</body>
</html>

` 
        }
        //  now send the email

        const sending=await transporter.sendMail(mailOpetions,(err,info)=>{
            if(err){
                console.log("err in sending the mail"+info)
                return info
            }else{
                console.log(err)
            }
        })

    }
}catch(err){
    console.log("err in sending the email"+email)
}

}
module.exports=MailService