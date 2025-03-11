const express = require("express")
const route = express.Router()
const {StudentRegister} = require("../controllers/Student")
const{IsCreateStudent} = require("../middlewares/authMiddleWare")
const {CodingTestSubmission,StartCodingTest, GetQuestion} = require("../controllers/Tests")
const {GetAllCodingTest} = require("../controllers/Tests")

// now handle the student routes
route.post("/Student",IsCreateStudent,StudentRegister)
route.post("/test",CodingTestSubmission)
route.get("/Student/CodeTests",GetAllCodingTest)
route.get("/Student/CodeTest/:Test_id",StartCodingTest)
route.get("/Student/CodeQuestion/:QuesId",GetQuestion)

// now export the route to the 
module.exports = route