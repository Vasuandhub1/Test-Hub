const express = require("express")
const route = express.Router()
const {StudentRegister,GetAllResults,GetDashboardData} = require("../controllers/Student")
const{IsCreateStudent,IsStudent} = require("../middlewares/authMiddleWare")
const {CodingTestSubmission,StartCodingTest,StartMCQTest, GetQuestion,SubmitTest,handleQuestionCodeSubmitte, GetMCQQuestion,SubmitMCQTestQuestion} = require("../controllers/Tests")
const {GetAllCodingTest,GetAllMCQTest} = require("../controllers/Tests")

// now handle the student routes
route.post("/Student",IsCreateStudent,StudentRegister)
route.post("/test",IsStudent,CodingTestSubmission)
route.get("/Student/CodeTests",IsStudent,GetAllCodingTest)
route.get("/Student/CodeTest/:Test_id",IsStudent,StartCodingTest)
route.get("/Student/MCQTest/:Test_id",IsStudent,StartMCQTest)
route.get("/Student/CodeQuestion/:QuesId",IsStudent,GetQuestion)
route.get("/Student/MCQQuestion/:QuesId",IsStudent,GetMCQQuestion)
route.post("/Student/CodeQuestionSubmission",IsStudent,handleQuestionCodeSubmitte)
route.post("/Student/MCQQuestionSubmission",IsStudent,SubmitMCQTestQuestion)
route.post("/Student/TestCodeSubmit",IsStudent,SubmitTest)
route.get("/StudentResult",IsStudent,GetAllResults)
route.get("/Student/MCQTest",IsStudent,GetAllMCQTest)
route.get("/StudentDashboard",IsStudent,GetDashboardData)


// now export the route to the 
module.exports = route