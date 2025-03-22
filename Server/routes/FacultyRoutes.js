const express =  require("express")
const route  = express.Router()
const {FacultyRegister,GetTestResult,GetAllCreatedTest,CreateCodeTest,CreateCodingQuestion,GetAllMCQQuestions,GetAllCodeQuestions,CreateSubject,GetAllSubjects,CreateMCQQuestions,CreateMCQTest}  = require("../controllers/faculty")
const {IsCreatedFaculty,IsFaculty} = require("../middlewares/authMiddleWare")
const {GetAllCodingTest} = require("../controllers/Tests")

route.post("/Faculty",IsCreatedFaculty,FacultyRegister)
route.post("/Faculty/CreateCodingQuestion",IsFaculty,CreateCodingQuestion)
route.post("/Faculty/CreateSubject",IsFaculty,CreateSubject)
route.get("/Faculty/Subjects",IsFaculty,GetAllSubjects)
route.post("/Faculty/CreateMCQQuestions",IsFaculty,CreateMCQQuestions)
route.get("/Faculty/AllTests",IsFaculty,GetAllCodingTest)
route.get("/Faculty/CodeQuestions/:page",IsFaculty,GetAllCodeQuestions)
route.post("/Faculty/CreateCodeTest",IsFaculty,CreateCodeTest)
route.post("/Faculty/CreateMCQtest",IsFaculty,CreateMCQTest)
route.get("/Faculty/GetMCQquestion/:subject",IsFaculty,GetAllMCQQuestions)
route.get("/FacultyAllTests",IsFaculty,GetAllCreatedTest)
route.post("/FacultyTestResult",IsFaculty,GetTestResult)


module.exports = route