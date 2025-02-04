import { RootState } from '@reduxjs/toolkit/query';
import { useEffect } from 'react';
import React from 'react'
import { useSelector } from 'react-redux'


function EditorNavbar({languages}) {
    const isDarkMode=useSelector((state:RootState)=>state.DarkLight.isDarkMode)

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
  return (
    <div>
      <nav className=' bg-white text-black dark:bg-inherit dark:text-white dark:from-zinc-900 dark:to-zinc-700'>
        <select name="language" id="java"  className=' bg-white text-black dark:bg-inherit dark:text-white dark:from-zinc-900 dark:to-zinc-700'>
            {languages.map((elem,index)=>{
                return (
                    <option key={index} value={elem.name} className=' bg-white text-black dark:bg-slate-900  dark:text-white dark:from-zinc-900 dark:to-zinc-700' >{elem.name}</option> 
                )
            })}
            
        </select>
      </nav>
    </div>
  )
}

export default EditorNavbar
