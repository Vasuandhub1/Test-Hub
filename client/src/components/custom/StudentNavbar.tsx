import { useState, useEffect,useRef } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "@reduxjs/toolkit/query";



export default function StudentNavbar() {
    const [activeTab, setActiveTab] = useState("Home");
    const navRef = useRef(null);
    const selectorRef = useRef(null);
    const name = useSelector((state:RootState)=>state.student.name)
    console.log(name)
  
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
  
    return (
      <nav className="relative bg-zinc-300 text-black dark:bg-zinc-800 dark: p-4 shadow-lg">
        <div className="container mx-auto flex items-center justify-between">
          <div className="text-black dark:text-white text-lg font-bold">Test-Hub</div>
          <ul ref={navRef} className="relative flex space-x-6 dark:text-white text-black">
            <motion.div
              ref={selectorRef}
              className="absolute bottom-0 h-1 derk:bg-white bg-zinc-500 rounded transition-all duration-300"
            />
            {[
              { name: "Home", path: "/StudentHome" },
              { name: "Dashboard", path: "/dashboard" },
              { name: "Tests", path: "/Tests" },
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
          <div className="text-black dark:text-white text-lg font-bold">{name}</div>
        </div>
      </nav>
  );
}
