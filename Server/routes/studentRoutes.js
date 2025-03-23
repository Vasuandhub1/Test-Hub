const express = require("express")
const route = express.Router()
const {StudentRegister,GetAllResults,GetDashboardData} = require("../controllers/Student")
const{IsCreateStudent,IsStudent} = require("../middlewares/authMiddleWare")
const {CodingTestSubmission,StartCodingTest,StartMCQTest, GetQuestion,SubmitTest,handleQuestionCodeSubmitte, GetMCQQuestion,SubmitMCQTestQuestion} = require("../controllers/Tests")
const {GetAllCodingTest,GetAllMCQTest} = require("../controllers/Tests")

// now handle the student routes
route.post("/Student",IsCreateStudent,StudentRegister)
route.post("/test",CodingTestSubmission)
route.get("/Student/CodeTests",IsStudent,GetAllCodingTest)
route.get("/Student/CodeTest/:Test_id",IsStudent,StartCodingTest)
route.get("/Student/MCQTest/:Test_id",IsStudent,StartMCQTest)
route.get("/Student/CodeQuestion/:QuesId",GetQuestion)
route.get("/Student/MCQQuestion/:QuesId",GetMCQQuestion)
route.post("/Student/CodeQuestionSubmission",handleQuestionCodeSubmitte)
route.post("/Student/MCQQuestionSubmission",SubmitMCQTestQuestion)
route.post("/Student/TestCodeSubmit",SubmitTest)
route.get("/StudentResult",IsStudent,GetAllResults)
route.get("/Student/MCQTest",IsStudent,GetAllMCQTest)
route.get("/StudentDashboard",IsStudent,GetDashboardData)


// now export the route to the 
module.exports = route