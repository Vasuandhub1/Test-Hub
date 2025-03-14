const express = require("express")
const route = express.Router()
const {StudentRegister,GetAllResults} = require("../controllers/Student")
const{IsCreateStudent} = require("../middlewares/authMiddleWare")
const {CodingTestSubmission,StartCodingTest, GetQuestion,SubmitTest,handleQuestionCodeSubmitte} = require("../controllers/Tests")
const {GetAllCodingTest,GetAllMCQTest} = require("../controllers/Tests")

// now handle the student routes
route.post("/Student",IsCreateStudent,StudentRegister)
route.post("/test",CodingTestSubmission)
route.get("/Student/CodeTests",GetAllCodingTest)
route.get("/Student/CodeTest/:Test_id",StartCodingTest)
route.get("/Student/CodeQuestion/:QuesId",GetQuestion)
route.post("/Student/CodeQuestionSubmission",handleQuestionCodeSubmitte)
route.post("/Student/TestCodeSubmit",SubmitTest)
route.get("/StudentResult",GetAllCodingTest)
route.get("/Student/MCQTest",GetAllMCQTest)

// now export the route to the 
module.exports = route