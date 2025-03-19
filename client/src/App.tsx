
import { LoginCard } from "./components/custom/LoginCard"
import { BrowserRouter,Routes,Route } from "react-router-dom"
import { RegisterCard } from "./components/custom/RegisterCard"
import {useSelector} from "react-redux"
import { RootState } from "@reduxjs/toolkit/query"
import { Toaster } from "@/components/ui/toaster"
import { EmailVerify } from "./components/custom/EmailVerify"
import CodingPage from "../page/CodingPage"
import StudentHome from "./components/custom/StudentHome"
import StudentRoute from "./components/custom/StudentRoute"
import StudentCodeCompiler from "./components/custom/StudentCodeCompiler"
import StudentNavbar from "./components/custom/StudentNavbar"
import StudentRegister from "./components/custom/StudentRegister"
import FacultyRegister from "./components/custom/FacultyRegister"
import FacultyHome from "./components/custom/FacultyHome"
import FacultyNavbar from "./components/custom/FacultyNavbar"
import FacultyRoute from "./components/custom/FacultyRoute"
import CreateQuestions from "../page/CreateQuestions"
import FacultyTest from "../page/FacultyTest"
import StudentTest from "../page/StudentTest"
import TestStartConfirmaition from "./components/custom/TestStartConfirmaition"
import CodingTest from "../page/CodingTest"
import TestRoute from "./components/custom/TestRoute"
import Profile from "./components/custom/Profile"
import StudentDashboard from "./components/custom/StudentDashboard"
import StudentResults from "./components/custom/StudentResults"
import { ForgotPasswordEmail } from "./components/custom/ForgotPasswordEmail"
import { ResetPassword } from "./components/custom/ResetPassword"
import MCQTest from "../page/MCQTest"
import StudentMCQTestStartConfirmaition from "./components/custom/StudentMCQTestStartConfirmation"



export default function Home() {
 
  const isDarkMode = useSelector((state: RootState) => state.DarkLight.isDarkMode);
  console.log("dark",isDarkMode)
  return (<>
  <Toaster/>
    <BrowserRouter>
    <Routes>
      <Route  path="/" Component={LoginCard}/>
      <Route  path="/register" Component={RegisterCard}/>
      <Route  path="/verify/:token" Component={EmailVerify}/> 
      <Route path="/StudentRegister" Component={StudentRegister}/>
      <Route path="/FacultyRegister" Component={FacultyRegister}></Route>
      <Route path="/ForgotPasswordEmail" Component={ForgotPasswordEmail}/>
      <Route path="/ResetPassword/:token" Component={ResetPassword}/>
      
      {/* student private route */} 

      <Route element={<>
        <StudentNavbar/>
        <StudentRoute/>
        </>}>
      <Route path="/StudentHome" Component={StudentHome}/>
      <Route  path="/test/code" element={<CodingPage SetDescription={true}/>}/>
      <Route  path="/CodeCompiler" Component={StudentCodeCompiler}/>
      <Route path="/StudentTests" Component={StudentTest}/>
      <Route path="StudentProfile" Component={Profile}/>
      <Route path="/StudentDashboard" Component={StudentDashboard}/>
      <Route path="/StudentResult" Component={StudentResults}/>
      
      <Route path="/StdeudentMCQTestStartConfirmation/:TestId" Component={StudentMCQTestStartConfirmaition}></Route>
      <Route path="/StudentTestStartConfirmation/:TestId" Component={TestStartConfirmaition}/>
      
      </Route>

      {/* {faculty private routes} */}
      <Route element={<>
        <FacultyNavbar/>
        <FacultyRoute/>
        </>}>
        <Route path="/FacultyHome" Component={FacultyHome}></Route>
        <Route path="/CreateQuestion" Component={CreateQuestions}></Route>
        <Route  path="/FacultyCodeCompiler" Component={StudentCodeCompiler}/>
        <Route path="/FacultyProfile" Component={Profile}/>
        <Route path="/FacultyTest" Component={FacultyTest}/>
      </Route>

      <Route element={<TestRoute/>}>
      <Route path="/StudentMCQTest" Component={MCQTest}/>
      <Route path="/Student/CodeingTest" Component={CodingTest}/>
      </Route>
      
    </Routes>
    </BrowserRouter>
    </>
  )
}
