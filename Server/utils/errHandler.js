const handelSucess=(res,message,data)=>{
    const messages=message||"sucess"
    const datas=data||true
   return res.status(200).json({
        sucess:true,
        message:messages,
        data:datas
    })
}
const handelErr=(res,message,data,code)=>{
    const messages=message||"sucess"
    const datas=data||true
    const codes=code||404
   return res.status(codes).json({
        sucess:true,
        message:messages,
        data:datas
    })
}

module.exports={handelErr,handelSucess}