const express = require("express")
const route = express.Router()
const {StudentRegister,GetAllResults,GetDashboardData} = require("../controllers/Student")
const{IsCreateStudent} = require("../middlewares/authMiddleWare")
const {CodingTestSubmission,StartCodingTest,StartMCQTest, GetQuestion,SubmitTest,handleQuestionCodeSubmitte, GetMCQQuestion,SubmitMCQTestQuestion} = require("../controllers/Tests")
const {GetAllCodingTest,GetAllMCQTest} = require("../controllers/Tests")

// now handle the student routes
route.post("/Student",IsCreateStudent,StudentRegister)
route.post("/test",CodingTestSubmission)
route.get("/Student/CodeTests",GetAllCodingTest)
route.get("/Student/CodeTest/:Test_id",StartCodingTest)
route.get("/Student/MCQTest/:Test_id",StartMCQTest)
route.get("/Student/CodeQuestion/:QuesId",GetQuestion)
route.get("/Student/MCQQuestion/:QuesId",GetMCQQuestion)
route.post("/Student/CodeQuestionSubmission",handleQuestionCodeSubmitte)
route.post("/Student/MCQQuestionSubmission",SubmitMCQTestQuestion)
route.post("/Student/TestCodeSubmit",SubmitTest)
route.get("/StudentResult",GetAllResults)
route.get("/Student/MCQTest",GetAllMCQTest)
route.get("/StudentDashboard",GetDashboardData)


// now export the route to the 
module.exports = route