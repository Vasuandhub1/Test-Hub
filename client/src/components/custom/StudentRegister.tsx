import React from 'react'
import { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import {toggleDarkMode} from "../../../Redux/slices/DarkLight"
import { motion } from "framer-motion";
import axios from 'axios';
import { setStudent } from "../../../Redux/slices/Student";


function StudentRegister() {
    const navigate = useNavigate();
    const { toast } = useToast();
    const dispatch =useDispatch()
    const isDarkMode = useSelector((state: RootState) => state.DarkLight.isDarkMode);
    const student = useSelector((state:RootState)=>state.student.name)
    console.log(student)
    const [submitting, setSubmitting] = useState(false);
    const [data, setData] = useState({ Name: "", Enroll: "",Year:"",Section:"",Branch:"",Gender:"Male",DOB:""});

    const handelRegister = async()=>{
        setSubmitting(true)
        const payload = {Sname:data.Name,
            Enroll:data.Enroll,
            Year:data.Year,
            Section:data.Section,
            Branch:data.Branch,
            Gender:data.Gender,
            DOB:data.DOB
        }
     await axios.post("http://localhost:3000/student-test-hub/Student",payload,{withCredentials:true}).then((res)=>{
        toast({title:"sucessful created ", description:"sucessfully created"})
          const payload=res!.data!.data
              dispatch(setStudent(payload))
        setTimeout(()=>{
            toast({ title: "Success", description:`Welcome ${res!.data!.data!.name}`});
            navigate("/StudentHome")
            setSubmitting(false)
        },3000)
     }).catch((err)=>{
        console.log(err)
        toast({title:err?.response?.data?.message , description:err?.response?.data?.data})
        setSubmitting(false)
     })
     console.log("hello")
       
    }
  
    useEffect(() => {
      document.documentElement.classList.toggle("dark", isDarkMode);
      localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    }, [isDarkMode]);
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setData({ ...data, [e.target.name]: e.target.value });
    };
  
   
   console.log(data)
  
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-zinc-400 to-zinc-300 dark:from-zinc-900 dark:to-zinc-700">
        <button onClick={() => dispatch(toggleDarkMode())} className="absolute top-4 right-4 p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600">
          {isDarkMode ? "🌙" : "🌞"}
        </button>
        <div className="bg-zinc-200 dark:bg-zinc-900 w-full sm:w-[28rem] lg:w-[30rem] xl:w-[32rem] p-8 rounded-2xl shadow-xl">
          <div className="text-2xl font-extrabold text-neutral-700 dark:text-white text-center">Test-Hub</div>
          <div className="text-xl font-bold text-neutral-600 dark:text-white text-center">Student Register</div>
          <p className="text-neutral-500 text-sm mt-2 dark:text-neutral-300 text-center">Please fill all our details carefully</p>
          <div className="mt-6">
            <input type="text" name="Name" required onChange={handleChange} value={data.Name} placeholder="Student Name" className="w-full px-4 py-3 mb-3 border rounded-lg dark:bg-black dark:text-white" />
            <input type="text" name="Enroll" required onChange={handleChange} value={data.Enroll} placeholder="Enroll No." className="w-full px-4 py-3 mb-3 border rounded-lg dark:bg-black dark:text-white" />
            <input type="text" name="Year" required onChange={handleChange} value={data.Year} placeholder="Year" className="w-full px-4 py-3 mb-3 border rounded-lg dark:bg-black dark:text-white" />
            <input type="text" name="Section" required onChange={handleChange} value={data.Section} placeholder="Section" className="w-full px-4 py-3 mb-3 border rounded-lg dark:bg-black dark:text-white" />
            <input type="text" name="Branch" required onChange={handleChange} value={data.Branch} placeholder="Branch" className="w-full px-4 py-3 mb-3 border rounded-lg dark:bg-black dark:text-white" />
            <select name='Gender'  required onChange={handleChange}  className="w-full px-4 py-3 mb-3 border rounded-lg dark:bg-black dark:text-white">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
            </select>
            <input type="date" name="DOB" required onChange={handleChange} value={data.DOB} placeholder="Date of birth" className="w-full px-4 py-3 mb-3 border rounded-lg dark:bg-zinc-800 dark:text-white" />
           
            <motion.button type="button" className="w-full px-4 py-3 rounded-xl bg-blue-600 dark:bg-blue-500 text-white" onClick={handelRegister}  disabled={submitting}>
              {submitting ? "creating Student...🚀" : "Register Student"}
            </motion.button>
          </div>
    
        </div>
      </div>
    );
}

export default StudentRegister
