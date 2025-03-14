import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { NavLink, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@reduxjs/toolkit/query";
import { toggleDarkMode } from "../../../Redux/slices/DarkLight";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export function ResetPassword() {
  const navigate = useNavigate();

  const { toast } = useToast();
  const isDarkMode = useSelector((state: RootState) => state.DarkLight.isDarkMode);
  const dispatch = useDispatch();
  const [hovered, setHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [Data,SetData]=useState({Password:"",ConfirmPassword:""})


//   now take the token from the params
const params=useParams()



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

  const handleMouseMove = (e: React.MouseEvent) => {
    const { left, top,  } = e.currentTarget.getBoundingClientRect();
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

  const handleButton = async()=>{
    try{
        if(Data.Password===Data.ConfirmPassword){
            const res = await axios.post(`http://localhost:3000/test-hub/ResetPassword/${params.token}`,{password:Data.Password})

            // now send res
            toast({title:"Sucessful",description:"Password reset sucessful"})
            navigate("/")
        }else{
            toast({title:"Password did not match"})
        }
    }catch(err){
        console.log(err)
        toast({title:"Error",description:err.message})
    }
  }

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    SetData({...Data,[e.target.name]:e.target.value})

  }



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
         Password Reset
        </div>
       
        <div className="mt-6 text-left space-y-4">
            <label htmlFor="">
                Password
                <Input type="password" name="Password" onChange={handleChange} value={Data.Password} className="border-black dark:border-white"></Input>
            </label>
            <label htmlFor="">
                Confirm Password
                <Input type="password" name="ConfirmPassword" onChange={handleChange} value={Data.ConfirmPassword} className="border-black dark:border-white"></Input>
            </label>
            <Button onClick={handleButton}>Reset Password</Button>
          

        </div>

       
      </div>
    </div>
  );
}
