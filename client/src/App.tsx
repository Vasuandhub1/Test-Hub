
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

      {/* student private route */} 

      <Route element={<>
        <StudentNavbar/>
        <StudentRoute/>
        </>}>
      <Route path="/StudentHome" Component={StudentHome}/>
      <Route  path="/test/code" element={<CodingPage SetDescription={true}/>}/>
      <Route  path="/CodeCompiler" Component={StudentCodeCompiler}/>
      </Route>

    </Routes>
    </BrowserRouter>
    </>
  )
}
