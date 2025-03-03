const express =  require("express")
const route  = express.Router()
const {FacultyRegister,CreateCodeTest,GetAllCodingTest,CreateCodingQuestion,GetAllCodeQuestions,CreateSubject,GetAllSubjects,CreateMCQQuestions}  = require("../controllers/faculty")
const {IsCreatedFaculty} = require("../middlewares/authMiddleWare")

route.post("/Faculty",IsCreatedFaculty,FacultyRegister)
route.post("/Faculty/CreateCodingQuestion",CreateCodingQuestion)
route.post("/Faculty/CreateSubject",CreateSubject)
route.get("/Faculty/Subjects",GetAllSubjects)
route.post("/Faculty/CreateMCQQuestions",CreateMCQQuestions)
route.get("/AllTests",GetAllCodingTest)
route.get("/Faculty/CodeQuestions/:page",GetAllCodeQuestions)
route.post("/Faculty/CreateCodetest",CreateCodeTest)


module.exports = route