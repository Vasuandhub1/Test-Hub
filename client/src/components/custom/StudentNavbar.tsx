import { useState, useEffect,useRef } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "@reduxjs/toolkit/query";
import { Button } from "../ui/button";
import axios from "axios";
import { toast, useToast } from "@/hooks/use-toast";
import { setStudent } from "../../../Redux/slices/Student";
import { useDispatch } from "react-redux";


import { Sun, Moon } from "lucide-react";

import { toggleDarkMode } from "../../../Redux/slices/DarkLight";



export default function StudentNavbar() {
  const isDarkMode=useSelector((state:RootState)=>state.DarkLight.isDarkMode)
    const [activeTab, setActiveTab] = useState("Home");
    const navRef = useRef(null);
    const selectorRef = useRef(null);
    const name = useSelector((state:RootState)=>state.student.name)
   
    const {toast} = useToast()
    const dispatch = useDispatch()

    const handleLogout = async()=>{
      
      
      toast({title:"sucessfully logout", description:"thanks"})
      const payload={DOB:Date.now(),
        Enroll:0,
        branch:"",
        email:"",
        name:"",
        role:"",
        section:""}
      dispatch(setStudent(payload))
    }
      
  
  
    useEffect(() => {
      if (navRef.current && selectorRef.current && activeTab) {
        const item = document.getElementById(activeTab);
        if (item) {
          const { offsetLeft, offsetWidth } = item;
          selectorRef.current.style.left = `${offsetLeft}px`;
          selectorRef.current.style.width = `${offsetWidth}px`;
        }
      }
    }, [activeTab]);
    useEffect(() => {
      document.documentElement.classList.toggle("dark", isDarkMode);
      localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    }, [isDarkMode]);
    
    return (
      <nav className="relative bg-zinc-300 flex justify-evenly text-black dark:bg-zinc-800 dark: p-4 shadow-lg">
        <div className="container mx-auto flex items-center justify-between">
          <div className="text-black dark:text-white text-lg font-bold">Test-Hub</div>
          <Button  onClick={() => dispatch(toggleDarkMode())}>
          {isDarkMode ? <Sun /> : <Moon />}
        </Button>
          <ul ref={navRef} className="relative flex space-x-6 dark:text-white text-black">
            <motion.div
              ref={selectorRef}
              className="absolute bottom-0 h-1 derk:bg-white bg-zinc-500 rounded transition-all duration-300"
            />
            {[
              { name: "Home", path: "/StudentHome" },
              { name: "Dashboard", path: "/dashboard" },
              { name: "Tests", path: "/StudentTests" },
              { name: "Results", path: "/Results" },
              { name: "Profile", path: "/Profile" },
              { name: "Code Compiler", path: "/CodeCompiler"},
            ].map((item) => (
              <li key={item.name}>
                <NavLink
                  id={item.name}
                  to={item.path}
                  className="p-3 transition hover:text-gray-600 dark:hover:text-gray-400"
                  onMouseEnter={() => setActiveTab(item.name)}
                  onClick={() => setActiveTab(item.name)}
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
         
        </div>
        <div className="text-black dark:text-white flex  justify-evenly gap-3 items-center text-lg font-bold">
            <div>{name}</div>
            <Button className="bg-red-700 text-white hover:bg-white hover:text-black dark:hover:text-white dark:hover:bg-black" onClick={handleLogout}>logout</Button>
          </div>
      </nav>
  );
}
