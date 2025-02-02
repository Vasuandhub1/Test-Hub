import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@reduxjs/toolkit/query";
import { toggleDarkMode } from "../../../Redux/slices/DarkLight";
import axios from "axios";
import { useToast } from "@/hooks/use-toast"
import { useNavigate } from "react-router-dom";






export function RegisterCard() {
    const navigate=useNavigate()
    const  emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // instance for the toast 
    const {toast}=useToast()
    // getting the dark mode 
    const isDarkMode = useSelector((state:RootState)=>state.DarkLight.isDarkMode)
    // instacce for the dipatch 
    const dispatch = useDispatch()
    // handel the debounce
    

    interface dataInterface{
        email:string,
        password:string
    }
  const [hovered, setHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [submitting, setSubmitting] = useState(false);
  const[role,setRole]=useState("student")
   const[data,Setdata]=useState<dataInterface>({
      email:"",
      password:""
  }
    )

  

  useEffect(() => {
    // Apply theme based on darkMode state
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);
  console.log("register data",data)

   const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
      if(e.target.name==="email"){
          Setdata({...data,email:e.target.value})
      }if(e.target.name==="password")
          Setdata({...data,password:e.target.value})
    }

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setMousePosition({ x: 0, y: 0 });
  };

  const handleSubmit = async() => {
    setSubmitting(true);
    if(!emailRegex.test(data.email)){
        toast({
            title:"hello",
            description:"please check your email"
        })
        return
    }
    const req={"userEmail":data.email,
        "userPassword":data.password,
        "role":role,
        "url":"http://localhost:5173/verify"
    }
    const res=await axios.post("http://localhost:3000/test-hub/User",{...req}).then(()=>{
        toast({
            title:"hello",
            description:"sucessful login"
        })

    }).catch((err)=>{
        console.log(err)
        toast({
            title:"hello",
            description:` Please check your credentials`
        })
    })  
    
    console.log(res)
    setTimeout(() => {
      setSubmitting(false); // Simulate form submission delay
    }, 3000); // Simulate a 3-second delay
  };

  const rotateCard = () => {
    const centerX = 250; // Approximate center of card
    const centerY = 250; // Approximate center of card
    const deltaX = (mousePosition.x - centerX) / centerX; // X axis tilt
    const deltaY = (mousePosition.y - centerY) / centerY; // Y axis tilt
    return `perspective(1000px) rotateX(${deltaY * 10}deg) rotateY(${deltaX * -10}deg)`;
  };

  return (
    <div className="inter-var flex justify-center items-center min-h-screen bg-gradient-to-br from-zinc-400 to-zinc-300 dark:from-zinc-900 dark:to-zinc-700">
      <div className="absolute top-4 right-4">
        <button
          onClick={() => dispatch(toggleDarkMode())}
          className="p-2 rounded-full bg-blue-500 text-white focus:outline-none hover:bg-blue-600"
        >
          {isDarkMode ? "🌙" : "🌞"}
        </button>
      </div>

      <div
        className="bg-zinc-200 relative group/card transition-transform duration-300 dark:bg-zinc-900 dark:border-white/[0.2] border-black/[0.1] w-full sm:w-[28rem] lg:w-[30rem] xl:w-[32rem] h-auto rounded-2xl p-8 border shadow-xl shadow-gray-500 dark:shadow-black"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: hovered ? rotateCard() : "none",
          transition: "transform 0.2s ease-out",
        }}
      >
        <div className="text-2xl font-extrabold text-neutral-700 dark:text-white text-center mb-4">
          Test-Hub
        </div>
        <div className="text-xl font-bold text-neutral-600 dark:text-white text-center">
          Sign In
        </div>
        <p className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300 text-center">
          Access your account securely
        </p>
        <div className="mt-6" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={data.email}
            placeholder="Email"
            className="w-full px-4 py-3 mb-3 border rounded-lg dark:bg-black dark:text-white focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={data.password}
            placeholder="Password"
            className="w-full px-4 py-3 mb-3 border rounded-lg dark:bg-black dark:text-white focus:ring-2 focus:ring-blue-500"
          />
           <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-4 py-3 mb-3 border rounded-lg dark:bg-black dark:text-white focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>Select Role</option>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
          
          <motion.button
            type="button"
            className="w-full px-4 py-3 rounded-xl bg-blue-600 dark:bg-blue-500 text-white text-sm font-bold hover:bg-blue-700 dark:hover:bg-blue-600 transition-all flex justify-center items-center gap-2 relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleSubmit}
            disabled={submitting} // Disable button when submitting
          >
            {/* Button Text */}
            <motion.span
              initial={{ opacity: 1 }}
              animate={{ opacity: submitting ? 0 : 1 }}
              transition={{ duration: 5 }}
            >
              {submitting ? "Signing In...🚀" : "Sign In"}
            </motion.span>

            {/* Rocket icon that appears when submitting */}
            {submitting && (
              <motion.span
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: submitting ? 1 : 0, x: submitting ? 0 : 10 }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
              >
                🚀
              </motion.span>
            )}
          </motion.button>
        </div>

        <div className="text-center mt-4 text-sm text-neutral-500 dark:text-neutral-300">
          Already have an account?{" "}
          <NavLink
            to={"/"}
            className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Log In
          </NavLink>
        </div>
      </div>
    </div>
  );
}
