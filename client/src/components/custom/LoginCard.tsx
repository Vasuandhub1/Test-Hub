import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleDarkMode } from "../../../Redux/slices/DarkLight";

export function LoginCard() {
  const validationSchema = Yup.object({
    email: Yup.string().email("Please enter a valid email").required("Email is required"),
    password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
  });

  const isDarkMode = useSelector((state) => state.DarkLight.isDarkMode);
  const dispatch = useDispatch();

  const [hovered, setHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [data, setData] = useState({ email: "", password: "" });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await validationSchema.validate(data, { abortEarly: false });
      setErrors({ email: "", password: "" });
      setSubmitting(true);
      setTimeout(() => setSubmitting(false), 3000);
    } catch (err) {
      const newErrors = { email: "", password: "" };
      err.inner.forEach((error) => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
    }
  };

  const rotateCard = () => {
    const centerX = 250;
    const centerY = 250;
    const deltaX = (mousePosition.x - centerX) / centerX;
    const deltaY = (mousePosition.y - centerY) / centerY;
    return `perspective(1000px) rotateX(${deltaY * 10}deg) rotateY(${deltaX * -10}deg)`;
  };

  return (
    <div className="inter-var flex justify-center items-center min-h-screen bg-gradient-to-br from-zinc-400 to-zinc-300 dark:from-zinc-900 dark:to-zinc-700">
      <div className="absolute top-4 right-4">
        <button onClick={() => dispatch(toggleDarkMode())} className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600">
          {isDarkMode ? "🌙" : "🌞"}
        </button>
      </div>

      <div className="bg-zinc-200 relative transition-transform duration-300 dark:bg-zinc-900 w-full sm:w-[28rem] lg:w-[30rem] xl:w-[32rem] h-auto rounded-2xl p-8 border shadow-xl"
        onMouseMove={(e) => setMousePosition({ x: e.clientX, y: e.clientY })}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ transform: hovered ? rotateCard() : "none" }}>
        
        <div className="text-2xl font-extrabold text-neutral-700 dark:text-white text-center mb-4">Test-Hub</div>
        <div className="text-xl font-bold text-neutral-600 dark:text-white text-center">Login</div>
        <p className="text-neutral-500 text-sm mt-2 dark:text-neutral-300 text-center">Access your account securely</p>
        
        <form className="mt-6" onSubmit={handleSubmit}>
          <input type="email" name="email" value={data.email} onChange={handleChange} placeholder="Email"
            className="w-full px-4 py-3 mb-1 border rounded-lg dark:bg-black dark:text-white" />
          {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}

          <input type="password" name="password" value={data.password} onChange={handleChange} placeholder="Password"
            className="w-full px-4 py-3 mb-1 border rounded-lg dark:bg-black dark:text-white" />
          {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
          
          <motion.button type="submit" className="w-full px-4 py-3 mt-4 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 flex justify-center items-center gap-2"
            disabled={submitting}>
            <motion.span initial={{ opacity: 1 }} animate={{ opacity: submitting ? 0 : 1 }}>{submitting ? "Logging In...🚀" : "Login"}</motion.span>
            {submitting && <motion.span initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>🚀</motion.span>}
          </motion.button>
        </form>

        <div className="text-center mt-4 text-sm text-neutral-500 dark:text-neutral-300">
          Don't have an account? <NavLink to="/register" className="text-blue-600 font-semibold hover:underline">Sign up</NavLink>
        </div>
      </div>
    </div>
  );
}
