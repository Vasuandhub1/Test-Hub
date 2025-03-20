import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@reduxjs/toolkit/query";
import { toggleDarkMode } from "../../../Redux/slices/DarkLight";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  role: yup.string().oneOf(["student", "faculty"], "Invalid role").required("Role is required"),
});

export function RegisterCard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const isDarkMode = useSelector((state: RootState) => state.DarkLight.isDarkMode);
  const dispatch = useDispatch();

  const [hovered, setHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [submitting, setSubmitting] = useState(false);
  const [role, setRole] = useState("student");
  const [data, setData] = useState({ email: "", password: "" });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await validationSchema.validate({ ...data, role }, { abortEarly: false });
      const req = { userEmail: data.email, userPassword: data.password, role, url: "http://localhost:80/verify" };
      await axios.post("http://localhost:3000/test-hub/User", req);
      toast({ title: "Success", description: "Successful register (please verify your accont using your email)" });
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        toast({ title: "Validation Error", description: err.errors.join(", ") });
      } else {
        toast({title:err?.response?.data?.message , description:err?.response?.data?.data})
        
      }
    }
    setSubmitting(false);
  };

  const rotateCard = () => {
    const deltaX = (mousePosition.x - 250) / 250;
    const deltaY = (mousePosition.y - 250) / 250;
    return `perspective(1000px) rotateX(${deltaY * 10}deg) rotateY(${deltaX * -10}deg)`;
  };



  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-zinc-400 to-zinc-300 dark:from-zinc-900 dark:to-zinc-700">
      <button onClick={() => dispatch(toggleDarkMode())} className="absolute top-4 right-4 p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600">
        {isDarkMode ? "🌙" : "🌞"}
      </button>
      <div className="bg-zinc-200 dark:bg-zinc-900 w-full sm:w-[28rem] lg:w-[30rem] xl:w-[32rem] p-8 rounded-2xl shadow-xl"
        onMouseMove={(e) => setMousePosition({ x: e.clientX - e.target.getBoundingClientRect().left, y: e.clientY - e.target.getBoundingClientRect().top })}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ transform: hovered ? rotateCard() : "none" }}>
        <div className="text-2xl font-extrabold text-neutral-700 dark:text-white text-center">Test-Hub</div>
        <div className="text-xl font-bold text-neutral-600 dark:text-white text-center">Sign In</div>
        <p className="text-neutral-500 text-sm mt-2 dark:text-neutral-300 text-center">Access your account securely</p>
        <div className="mt-6">
          <input type="email" name="email" onChange={handleChange} value={data.email} placeholder="Email" className="w-full px-4 py-3 mb-3 border rounded-lg dark:bg-black dark:text-white" />
          <input type="password" name="password" onChange={handleChange} value={data.password} placeholder="Password" className="w-full px-4 py-3 mb-3 border rounded-lg dark:bg-black dark:text-white" />
          <select  onChange={(e) => setRole(e.target.value)} className="w-full px-4 py-3 mb-3 border rounded-lg dark:bg-black dark:text-white">
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
          </select>
          <motion.button type="button" className="w-full px-4 py-3 rounded-xl bg-blue-600 dark:bg-blue-500 text-white" onClick={handleSubmit} disabled={submitting}>
            {submitting ? "Signing In...🚀" : "Sign In"}
          </motion.button>
        </div>
        <div className="text-center mt-4 text-sm text-neutral-500 dark:text-neutral-300">
          Already have an account? <NavLink to="/" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">Log In</NavLink>
        </div>
      </div>
    </div>
  );
}
