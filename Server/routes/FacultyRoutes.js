const express =  require("express")
const route  = express.Router()
const {FacultyRegister,GetTestResult,GetAllCreatedTest,CreateCodeTest,CreateCodingQuestion,GetAllMCQQuestions,GetAllCodeQuestions,CreateSubject,GetAllSubjects,CreateMCQQuestions,CreateMCQTest}  = require("../controllers/faculty")
const {IsCreatedFaculty} = require("../middlewares/authMiddleWare")
const {GetAllCodingTest} = require("../controllers/Tests")

route.post("/Faculty",IsCreatedFaculty,FacultyRegister)
route.post("/Faculty/CreateCodingQuestion",CreateCodingQuestion)
route.post("/Faculty/CreateSubject",CreateSubject)
route.get("/Faculty/Subjects",GetAllSubjects)
route.post("/Faculty/CreateMCQQuestions",CreateMCQQuestions)
route.get("/Faculty/AllTests",GetAllCodingTest)
route.get("/Faculty/CodeQuestions/:page",GetAllCodeQuestions)
route.post("/Faculty/CreateCodeTest",CreateCodeTest)
route.post("/Faculty/CreateMCQtest",CreateMCQTest)
route.get("/Faculty/GetMCQquestion/:subject",GetAllMCQQuestions)
route.get("/FacultyAllTests",GetAllCreatedTest)
route.post("/FacultyTestResult",GetTestResult)


module.exports = route