const express = require("express")
const route = express.Router()
const {StudentRegister} = require("../controllers/Student")
const{IsCreateStudent} = require("../middlewares/authMiddleWare")
const {CodingTestSubmission,StartCodingTest} = require("../controllers/Tests")

// now handle the student routes
route.post("/Student",IsCreateStudent,StudentRegister)
route.post("/test",CodingTestSubmission)
route.get("/CodeTest/:Test_id",StartCodingTest)

// now export the route to the 
module.exports = route