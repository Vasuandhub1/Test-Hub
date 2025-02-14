import { RootState } from '@reduxjs/toolkit/query';
import { useEffect } from 'react';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setEditor } from '../../../Redux/slices/EditorTheme';


function EditorNavbar({languages,setLanguage}) {
  // instacnce fo the dispatch
  const dispatch = useDispatch()
    const isDarkMode=useSelector((state:RootState)=>state.DarkLight.isDarkMode)

    // function to handel the Editor the theme 
    const handleEditorTheme = (e)=>{
      const payload=e.target.value
      dispatch(setEditor(payload))
    }

    // function to set the language
    const handelSelectLanguage = (e)=>{
      setLanguage(e.target.value)
    }

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
        <select name="language" onChange={handelSelectLanguage}   className=' bg-white px-2 text-black dark:bg-inherit dark:text-white dark:from-zinc-900 dark:to-zinc-700'>
            {languages.map((elem,index)=>{
                return (
                    <option key={index} value={elem.id} className=' bg-white text-black dark:bg-slate-900  dark:text-white dark:from-zinc-900 dark:to-zinc-700' >{elem.name}</option> 
                )
            })}
            
        </select>
        <select name="EditorTheme" onChange={handleEditorTheme} className=' bg-white px-2 text-black dark:bg-inherit dark:text-white dark:from-zinc-900 dark:to-zinc-700'>
        <option  value="vs-dark" className=' bg-white text-black dark:bg-slate-900  dark:text-white dark:from-zinc-900 dark:to-zinc-700' >vs-Dark</option>                              
        <option  value="vs-light" className=' bg-white text-black dark:bg-slate-900  dark:text-white dark:from-zinc-900 dark:to-zinc-700' >vs-light</option>                              
        </select>
      </nav>
    </div>
  )
}

export default EditorNavbar
