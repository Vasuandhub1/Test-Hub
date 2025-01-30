
import { LoginCard } from "./components/custom/LoginCard"
import { BrowserRouter,Routes,Route } from "react-router-dom"
import { RegisterCard } from "./components/custom/RegisterCard"
import {useSelector,useDispatch} from "react-redux"
import { RootState } from "@reduxjs/toolkit/query"


export default function Home() {
 
  const isDarkMode = useSelector((state: RootState) => state.DarkLight.isDarkMode);
  console.log("dark",isDarkMode)
  return (
    <BrowserRouter>
    <Routes>
      <Route  path="/" Component={LoginCard}/>
      <Route  path="/register" Component={RegisterCard}/>

    </Routes>
    </BrowserRouter>
  )
}
